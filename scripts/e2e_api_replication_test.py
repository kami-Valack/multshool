#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Teste E2E de APIs + replicação (RabbitMQ/HTTP) + aprovação.

Fluxo:
  1) Health checks
  2) Registo aluno  → espera réplica no ms-student → GET /me
  3) Registo escola → espera réplica no ms-school (pending)
  4) Admin aprova escola
  5) Escola completa perfil → cria curso
  6) Registo professor → espera réplica no ms-school
  7) Aluno matricula-se → escola aprova matrícula
  8) Smoke das contas demo (seeders)

Uso (na VPS ou Mac com portas publicadas):
  python3 scripts/e2e_api_replication_test.py
  PUBLIC_HOST=54.196.176.24 python3 scripts/e2e_api_replication_test.py
  python3 scripts/e2e_api_replication_test.py --skip-demo
"""

from __future__ import annotations

import argparse
import io
import os
import sys
import time
import uuid
from dataclasses import dataclass, field
from datetime import datetime
from typing import Any, Callable, Optional

try:
    import requests
except ImportError:
    print("Instala requests: pip install requests")
    sys.exit(2)


# Minimal 1x1 PNG
PNG_1X1 = bytes.fromhex(
    "89504e470d0a1a0a0000000d49484452000000010000000108060000001f15c489"
    "0000000a49444154789c63000100000500010d0a2db40000000049454e44ae426082"
)


@dataclass
class StepResult:
    name: str
    ok: bool
    detail: str = ""


@dataclass
class Report:
    steps: list[StepResult] = field(default_factory=list)

    def add(self, name: str, ok: bool, detail: str = "") -> None:
        self.steps.append(StepResult(name, ok, detail))
        mark = "OK" if ok else "FAIL"
        print(f"[{mark}] {name}" + (f" — {detail}" if detail else ""))

    @property
    def failed(self) -> int:
        return sum(1 for s in self.steps if not s.ok)

    def summary(self) -> int:
        total = len(self.steps)
        failed = self.failed
        print("\n" + "=" * 70)
        print(f"Resultado: {total - failed}/{total} passaram, {failed} falharam")
        print("=" * 70)
        return 1 if failed else 0


class ApiClient:
    def __init__(self, base: str, timeout: float = 20.0):
        self.base = base.rstrip("/")
        self.timeout = timeout
        self.session = requests.Session()

    def url(self, path: str) -> str:
        if not path.startswith("/"):
            path = "/" + path
        return f"{self.base}{path}"

    def request(
        self,
        method: str,
        path: str,
        *,
        token: Optional[str] = None,
        api_secret: Optional[str] = None,
        json: Any = None,
        files: Any = None,
        data: Any = None,
        expected: Optional[set[int]] = None,
    ) -> requests.Response:
        headers = {}
        if token:
            headers["Authorization"] = f"Bearer {token}"
        if api_secret:
            headers["X-API-Secret"] = api_secret
        if json is not None and files is None:
            headers["Content-Type"] = "application/json"

        resp = self.session.request(
            method,
            self.url(path),
            headers=headers,
            json=json,
            files=files,
            data=data,
            timeout=self.timeout,
        )
        if expected is not None and resp.status_code not in expected:
            body = resp.text[:500]
            raise AssertionError(
                f"{method} {path} → {resp.status_code}, esperado {expected}. Body: {body}"
            )
        return resp


def wait_until(
    predicate: Callable[[], bool],
    *,
    timeout: float = 45.0,
    interval: float = 1.5,
    label: str = "condition",
) -> bool:
    deadline = time.time() + timeout
    while time.time() < deadline:
        try:
            if predicate():
                return True
        except Exception:
            pass
        time.sleep(interval)
    print(f"  timeout à espera de: {label}")
    return False


def extract_token(payload: dict) -> Optional[str]:
    for key in ("accessToken", "access_token", "token"):
        if key in payload and isinstance(payload[key], str):
            return payload[key]
    data = payload.get("data") or {}
    if isinstance(data, dict):
        for key in ("accessToken", "access_token", "token"):
            if key in data and isinstance(data[key], str):
                return data[key]
    return None


def main() -> int:
    parser = argparse.ArgumentParser(description="E2E API + replication test")
    parser.add_argument(
        "--host",
        default=os.getenv("PUBLIC_HOST", os.getenv("API_HOST", "127.0.0.1")),
        help="Host das APIs (default: PUBLIC_HOST ou 127.0.0.1)",
    )
    parser.add_argument("--skip-demo", action="store_true", help="Saltar smoke das contas seed")
    parser.add_argument("--timeout-repl", type=float, default=60.0, help="Timeout réplica (s)")
    args = parser.parse_args()

    host = args.host
    users = ApiClient(f"http://{host}:8000/api")
    student = ApiClient(f"http://{host}:8001/api")
    admin = ApiClient(f"http://{host}:8002/api")
    school = ApiClient(f"http://{host}:8003/api")

    school_secret = os.getenv("SCHOOL_API_SECRET", "seu-secret-super-seguro-aqui")
    student_secret = os.getenv("STUDENT_API_SECRET", "seu-secret-aqui")
    users_secret = os.getenv("USERS_API_SECRET", "ah6d8jO0UTVXvuHYfoe2rM91lDpAqJ3Q")

    stamp = datetime.now().strftime("%Y%m%d%H%M%S")
    password = "Senha123!"
    report = Report()

    print("=" * 70)
    print(f"E2E Multshool — host={host}")
    print("=" * 70)

    # ------------------------------------------------------------------ health
    for name, client in (
        ("users", users),
        ("student", student),
        ("admin", admin),
        ("school", school),
    ):
        try:
            r = client.request("GET", "/health", expected={200})
            report.add(f"health:{name}", True, r.text[:80])
        except Exception as e:
            report.add(f"health:{name}", False, str(e))

    if report.failed:
        print("APIs unhealthy — abortando.")
        return report.summary()

    # ============================================================ STUDENT FLOW
    student_email = f"e2e.aluno.{stamp}@demo.multshool.ao"
    student_name = f"E2E Aluno {stamp}"
    student_id = None
    student_token = None

    try:
        r = users.request(
            "POST",
            "/auth/register",
            json={"name": student_name, "email": student_email, "password": password},
            expected={201, 200},
        )
        body = r.json()
        student_id = (body.get("user") or {}).get("id")
        report.add("users:register-student", bool(student_id), student_id or r.text[:200])
    except Exception as e:
        report.add("users:register-student", False, str(e))

    if student_id:
        ok = wait_until(
            lambda: student.request(
                "GET",
                f"/student/{student_id}",
                api_secret=student_secret,
            ).status_code
            == 200,
            timeout=args.timeout_repl,
            label="student replica",
        )
        report.add("replica:student→ms-student", ok, f"id={student_id}")

        try:
            r = users.request(
                "POST",
                "/auth/login",
                json={"email": student_email, "password": password},
                expected={200},
            )
            student_token = extract_token(r.json())
            report.add("users:login-student", bool(student_token))
        except Exception as e:
            report.add("users:login-student", False, str(e))

        if student_token:
            try:
                r = student.request("GET", "/me", token=student_token, expected={200})
                me = r.json().get("user") or r.json()
                report.add(
                    "student:me-after-replica",
                    me.get("id") == student_id or me.get("email") == student_email,
                    str(me.get("id")),
                )
            except Exception as e:
                report.add("student:me-after-replica", False, str(e))

    # ============================================================== SCHOOL FLOW
    school_email = f"e2e.escola.{stamp}@demo.multshool.ao"
    school_name = f"E2E Escola Medio {stamp}"
    school_id = None
    school_token = None

    try:
        r = users.request(
            "POST",
            "/auth/register-school",
            json={
                "name": school_name,
                "email": school_email,
                "password": password,
                "institution_type": "medio",
            },
            expected={201, 200},
        )
        body = r.json()
        school_id = (body.get("user") or {}).get("id")
        report.add("users:register-school", bool(school_id), school_id or r.text[:200])
    except Exception as e:
        report.add("users:register-school", False, str(e))

    if school_id:
        def school_pending() -> bool:
            r = school.request(
                "GET",
                f"/admin/schools/{school_id}",
                api_secret=school_secret,
            )
            if r.status_code != 200:
                return False
            data = r.json()
            sch = data.get("school") or data.get("data") or data
            return sch.get("id") == school_id

        ok = wait_until(school_pending, timeout=args.timeout_repl, label="school replica")
        report.add("replica:school→ms-school", ok, f"id={school_id}")

        # status pending
        try:
            r = school.request(
                "GET",
                f"/admin/schools/{school_id}",
                api_secret=school_secret,
                expected={200},
            )
            sch = r.json().get("school") or r.json().get("data") or r.json()
            status = sch.get("status")
            report.add(
                "school:status-pending",
                status in (None, "pending") or status == "pending",
                f"status={status}",
            )
        except Exception as e:
            report.add("school:status-pending", False, str(e))

    # =============================================================== ADMIN FLOW
    admin_token = None
    try:
        r = admin.request(
            "POST",
            "/auth/login",
            json={"email": "admin", "password": "admin"},
            expected={200},
        )
        admin_token = extract_token(r.json())
        report.add("admin:login", bool(admin_token))
    except Exception as e:
        report.add("admin:login", False, str(e))

    if admin_token and school_id:
        try:
            r = admin.request(
                "POST",
                f"/schools/{school_id}/approve",
                token=admin_token,
                expected={200},
            )
            report.add("admin:approve-school", True, r.text[:120])
        except Exception as e:
            report.add("admin:approve-school", False, str(e))

        def school_approved() -> bool:
            r = school.request(
                "GET",
                f"/admin/schools/{school_id}",
                api_secret=school_secret,
            )
            if r.status_code != 200:
                return False
            sch = r.json().get("school") or r.json().get("data") or r.json()
            return sch.get("status") == "approved"

        ok = wait_until(school_approved, timeout=30, label="school approved")
        report.add("school:status-approved", ok)

    # School login + complete profile + create course
    course_id = None
    if school_id:
        try:
            r = users.request(
                "POST",
                "/auth/login",
                json={"email": school_email, "password": password},
                expected={200},
            )
            school_token = extract_token(r.json())
            report.add("users:login-school", bool(school_token))
        except Exception as e:
            report.add("users:login-school", False, str(e))

    if school_token:
        try:
            school.request(
                "PUT",
                "/profile",
                token=school_token,
                json={
                    "name": school_name,
                    "acronym": "E2E",
                    "description": "Instituição criada pelo teste E2E de replicação.",
                    "founded_year": 2001,
                    "location_map_url": "https://maps.google.com/?q=Luanda",
                    "total_students": 100,
                    "phone_number": "+244900111222",
                    "contact_emails": [school_email],
                },
                expected={200},
            )
            report.add("school:update-profile-text", True)
        except Exception as e:
            report.add("school:update-profile-text", False, str(e))

        # media uploads
        try:
            school.request(
                "POST",
                "/profile/upload-logo",
                token=school_token,
                files={"logo": ("logo.png", io.BytesIO(PNG_1X1), "image/png")},
                expected={200},
            )
            report.add("school:upload-logo", True)
        except Exception as e:
            report.add("school:upload-logo", False, str(e))

        try:
            school.request(
                "POST",
                "/profile/upload-photos",
                token=school_token,
                files=[
                    ("photos[0]", ("p1.png", io.BytesIO(PNG_1X1), "image/png")),
                    ("photos[1]", ("p2.png", io.BytesIO(PNG_1X1), "image/png")),
                ],
                expected={200},
            )
            report.add("school:upload-photos", True)
        except Exception as e:
            report.add("school:upload-photos", False, str(e))

        try:
            # Alguns ambientes validam vídeo; se falhar, tinker via docker (opcional)
            tiny_mp4 = (
                b"\x00\x00\x00\x18ftypmp42\x00\x00\x00\x00mp42isom"
                b"\x00\x00\x00\x08free"
            )
            school.request(
                "POST",
                "/profile/upload-video",
                token=school_token,
                files={"video": ("intro.mp4", io.BytesIO(tiny_mp4), "video/mp4")},
                expected={200},
            )
            report.add("school:upload-video", True)
        except Exception as e:
            report.add("school:upload-video", False, str(e))
            # Fallback: marcar path via API secret não existe; tentar docker
            try:
                import subprocess

                cmd = [
                    "docker",
                    "compose",
                    "exec",
                    "-T",
                    "ms-school",
                    "php",
                    "artisan",
                    "tinker",
                    "--execute",
                    (
                        f"\\App\\Models\\User::where('id','{school_id}')"
                        f"->update(['presentation_video_path'=>'demo/e2e.mp4']);"
                    ),
                ]
                subprocess.run(cmd, check=True, cwd=os.path.dirname(os.path.dirname(__file__)))
                report.add("school:video-fallback-tinker", True)
            except Exception as e2:
                report.add("school:video-fallback-tinker", False, str(e2))

        try:
            r = school.request(
                "GET", "/profile/check-completion", token=school_token, expected={200}
            )
            complete = r.json().get("is_complete")
            report.add("school:profile-complete", bool(complete), str(r.json().get("missing_fields")))
        except Exception as e:
            report.add("school:profile-complete", False, str(e))

        try:
            r = school.request(
                "POST",
                "/courses",
                token=school_token,
                json={
                    "name": f"Curso E2E Informatica {stamp}",
                    "description": "Curso criado no teste E2E",
                    "code": f"E2E-{stamp[-6:]}",
                    "education_level": "medio",
                    "class_level": 12,
                    "monthly_tuition": 15000,
                    "is_active": True,
                    "faculty": "Tecnologia",
                },
                expected={201},
            )
            course = r.json().get("course") or {}
            course_id = course.get("id")
            report.add("school:create-course", bool(course_id), course_id or r.text[:200])
        except Exception as e:
            report.add("school:create-course", False, str(e))

    # ============================================================= TEACHER FLOW
    teacher_email = f"e2e.prof.{stamp}@demo.multshool.ao"
    teacher_id = None
    teacher_token = None

    try:
        r = users.request(
            "POST",
            "/auth/register-teacher",
            json={
                "name": f"E2E Professor {stamp}",
                "email": teacher_email,
                "password": password,
            },
            expected={201, 200},
        )
        teacher_id = (r.json().get("user") or {}).get("id")
        report.add("users:register-teacher", bool(teacher_id), teacher_id or "")
    except Exception as e:
        report.add("users:register-teacher", False, str(e))

    if teacher_id:
        def teacher_replicated() -> bool:
            # School local users table — list via JWT school teachers may go to users API;
            # check replicate endpoint existence by GET admin school teachers path is HTTP to users.
            # Direct: try school JWT /teachers after linking — instead use users admin? 
            # Best: docker not required — call school admin teachers replicate already done on register.
            # Verify via school DB isn't exposed; use users login + school teacher/me after token.
            r = users.request(
                "POST",
                "/auth/login",
                json={"email": teacher_email, "password": password},
            )
            if r.status_code != 200:
                return False
            tok = extract_token(r.json())
            if not tok:
                return False
            me = school.request("GET", "/teacher/me", token=tok)
            return me.status_code == 200

        ok = wait_until(teacher_replicated, timeout=args.timeout_repl, label="teacher replica")
        report.add("replica:teacher→ms-school", ok, f"id={teacher_id}")

        try:
            r = users.request(
                "POST",
                "/auth/login",
                json={"email": teacher_email, "password": password},
                expected={200},
            )
            teacher_token = extract_token(r.json())
            report.add("users:login-teacher", bool(teacher_token))
        except Exception as e:
            report.add("users:login-teacher", False, str(e))

    # ========================================================== ENROLLMENT FLOW
    enrollment_id = None
    if student_token and course_id:
        try:
            r = student.request(
                "POST",
                "/enrollments",
                token=student_token,
                json={"course_id": course_id},
                expected={201, 200},
            )
            body = r.json()
            enrollment = body.get("enrollment") or body.get("data") or body
            enrollment_id = enrollment.get("id") if isinstance(enrollment, dict) else None
            report.add(
                "student:enroll-course",
                r.status_code in (200, 201),
                enrollment_id or r.text[:200],
            )
        except Exception as e:
            report.add("student:enroll-course", False, str(e))

        # list via student API (proxies school)
        try:
            r = student.request("GET", "/enrollments", token=student_token, expected={200})
            report.add("student:list-enrollments", True, r.text[:120])
        except Exception as e:
            report.add("student:list-enrollments", False, str(e))

    if school_token and course_id:
        # find pending enrollment if id unknown
        if not enrollment_id:
            try:
                r = school.request(
                    "GET",
                    f"/courses/{course_id}/enrollments",
                    token=school_token,
                    expected={200},
                )
                items = (
                    r.json().get("enrollments")
                    or r.json().get("data")
                    or r.json().get("items")
                    or []
                )
                if isinstance(items, list) and items:
                    enrollment_id = items[0].get("id")
            except Exception:
                pass

        if enrollment_id:
            try:
                r = school.request(
                    "POST",
                    f"/enrollments/{enrollment_id}/approve",
                    token=school_token,
                    expected={200},
                )
                report.add("school:approve-enrollment", True, r.text[:120])
            except Exception as e:
                report.add("school:approve-enrollment", False, str(e))
        else:
            report.add("school:approve-enrollment", False, "enrollment_id não encontrado")

    # Cross-service secret check: school → student lookup
    if student_id:
        try:
            r = student.request(
                "GET",
                f"/student/{student_id}",
                api_secret=student_secret,
                expected={200},
            )
            report.add("secret:school→student-lookup", True, r.text[:80])
        except Exception as e:
            report.add("secret:school→student-lookup", False, str(e))

        # wrong secret must fail
        try:
            r = student.request(
                "GET",
                f"/student/{student_id}",
                api_secret="WRONG_SECRET",
            )
            report.add(
                "secret:student-rejects-bad-secret",
                r.status_code in (401, 403),
                f"status={r.status_code}",
            )
        except Exception as e:
            report.add("secret:student-rejects-bad-secret", False, str(e))

    if school_id:
        try:
            r = school.request(
                "GET",
                f"/admin/schools/{school_id}",
                api_secret=school_secret,
                expected={200},
            )
            report.add("secret:admin→school-lookup", True)
        except Exception as e:
            report.add("secret:admin→school-lookup", False, str(e))

        try:
            r = school.request(
                "GET",
                f"/admin/schools/{school_id}",
                api_secret="WRONG",
            )
            report.add(
                "secret:school-rejects-bad-secret",
                r.status_code in (401, 403),
                f"status={r.status_code}",
            )
        except Exception as e:
            report.add("secret:school-rejects-bad-secret", False, str(e))

    # ============================================================== DEMO SMOKE
    if not args.skip_demo:
        demos = [
            ("demo:login-escola-medio", "escola.medio@demo.multshool.ao", password, users),
            ("demo:login-aluno-carlos", "aluno.carlos@demo.multshool.ao", password, users),
            ("demo:login-prof-antonio", "prof.antonio@demo.multshool.ao", password, users),
        ]
        for label, email, pwd, client in demos:
            try:
                r = client.request(
                    "POST",
                    "/auth/login",
                    json={"email": email, "password": pwd},
                    expected={200},
                )
                tok = extract_token(r.json())
                report.add(label, bool(tok), email)
            except Exception as e:
                report.add(label, False, f"{email}: {e}")

        try:
            r = student.request(
                "GET",
                "/student/33333333-3333-3333-3333-333333333301",
                api_secret=student_secret,
                expected={200},
            )
            report.add("demo:student-replica-carlos", True)
        except Exception as e:
            report.add("demo:student-replica-carlos", False, str(e))

        try:
            r = school.request(
                "GET",
                "/admin/schools/11111111-1111-1111-1111-111111111101",
                api_secret=school_secret,
                expected={200},
            )
            sch = r.json().get("school") or r.json().get("data") or r.json()
            report.add(
                "demo:school-medio-approved",
                sch.get("status") == "approved",
                f"status={sch.get('status')}",
            )
        except Exception as e:
            report.add("demo:school-medio-approved", False, str(e))

    # unused vars silence
    _ = (users_secret, teacher_token, uuid)

    return report.summary()


if __name__ == "__main__":
    sys.exit(main())
