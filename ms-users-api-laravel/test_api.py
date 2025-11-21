#!/usr/bin/env python3
"""
Script de Teste para MS Users API
Testa todos os endpoints da API de autenticação
"""

import requests
import json
import sys
from datetime import datetime
from typing import Optional, Dict, Any

# Configuração

BASE_URL = "http://localhost:8000/api"
TEST_EMAIL = "escola.teste.20251110062725@example.com"
TEST_PASSWORD = "senha1234567"
TEST_NAME = "Usuário Teste"

# Variáveis globais para armazenar tokens
access_token: Optional[str] = None
refresh_token: Optional[str] = None
verification_token: Optional[str] = None
user_id: Optional[str] = None
student_id: Optional[str] = None


def print_header(title: str):
    """Imprime um cabeçalho formatado"""
    print("\n" + "=" * 60)
    print(f"  {title}")
    print("=" * 60)


def print_result(test_name: str, success: bool, response: requests.Response, data: Any = None):
    """Imprime o resultado de um teste"""
    status = "[OK] PASSOU" if success else "[ERRO] FALHOU"
    print(f"\n{test_name}")
    print(f"Status: {status}")
    print(f"HTTP Status: {response.status_code}")
    
    if data:
        print(f"Resposta: {json.dumps(data, indent=2, ensure_ascii=False)}")
    else:
        try:
            print(f"Resposta: {response.text[:200]}")
        except:
            print(f"Resposta: {response.text}")
    
    return success


def test_health_check() -> bool:
    """Testa o endpoint de health check"""
    print_header("1. Health Check")
    
    try:
        response = requests.get(f"{BASE_URL}/health", timeout=5)
        
        # Verificar se a resposta é JSON
        try:
            data = response.json()
        except ValueError:
            print(f"[ERRO] Resposta nao e JSON. Status: {response.status_code}")
            print(f"[ERRO] Resposta recebida (primeiros 1000 chars):")
            print(response.text[:1000])
            print(f"\n[ERRO] Content-Type: {response.headers.get('Content-Type', 'N/A')}")
            return False
        
        success = response.status_code == 200 and data.get('status') == 'ok'
        return print_result("GET /health", success, response, data)
    except requests.exceptions.ConnectionError:
        print(f"[ERRO] Nao foi possivel conectar ao servidor em {BASE_URL}")
        print(f"[ERRO] Verifique se o servidor esta rodando: php artisan serve")
        return False
    except requests.exceptions.ConnectionError:
        print(f"[ERRO] Nao foi possivel conectar ao servidor em {BASE_URL}")
        print(f"[ERRO] Verifique se o servidor esta rodando: php artisan serve")
        return False
    except Exception as e:
        print(f"[ERRO] Erro: {e}")
        import traceback
        traceback.print_exc()
        return False


def test_register() -> bool:
    """Testa o registro de usuário"""
    print_header("2. Registrar Usuário")
    
    global user_id
    
    try:
        payload = {
            "name": TEST_NAME,
            "email": TEST_EMAIL,
            "password": TEST_PASSWORD
        }
        
        response = requests.post(
            f"{BASE_URL}/auth/register",
            json=payload,
            headers={"Content-Type": "application/json"},
            timeout=10
        )
        
        # Verificar se a resposta é JSON
        try:
            data = response.json()
        except ValueError:
            print(f"[ERRO] Resposta nao e JSON. Status: {response.status_code}")
            print(f"[ERRO] Resposta recebida (primeiros 1000 chars):")
            print(response.text[:1000])
            print(f"\n[ERRO] Content-Type: {response.headers.get('Content-Type', 'N/A')}")
            return False
        
        success = response.status_code == 201 and data.get('status') == 'success'
        
        if success and 'user' in data:
            user_id = data['user'].get('id')
            student_id = data['user'].get('student_id')
            print(f"\n[INFO] Token de verificacao sera necessario para login")
            print(f"       (Verifique o email ou logs do RabbitMQ)")
            if student_id:
                print(f"[INFO] Student ID gerado: {student_id}")
        
        return print_result("POST /auth/register", success, response, data)
    except requests.exceptions.ConnectionError:
        print(f"[ERRO] Nao foi possivel conectar ao servidor em {BASE_URL}")
        print(f"[ERRO] Verifique se o servidor esta rodando: php artisan serve")
        return False
    except Exception as e:
        print(f"[ERRO] Erro: {e}")
        import traceback
        traceback.print_exc()
        return False


def test_login_before_verification() -> bool:
    """Testa login antes da verificação (deve falhar)"""
    print_header("3. Login Antes da Verificação (Esperado: Falhar)")
    
    try:
        payload = {
            "email": TEST_EMAIL,
            "password": TEST_PASSWORD
        }
        
        response = requests.post(
            f"{BASE_URL}/auth/login",
            json=payload,
            headers={"Content-Type": "application/json"},
            timeout=10
        )
        
        data = response.json()
        # Esperamos que falhe porque o email não foi verificado
        success = response.status_code == 401
        
        return print_result("POST /auth/login (sem verificação)", success, response, data)
    except requests.exceptions.ConnectionError:
        print(f"[ERRO] Nao foi possivel conectar ao servidor em {BASE_URL}")
        print(f"[ERRO] Verifique se o servidor esta rodando: php artisan serve")
        return False
    except Exception as e:
        print(f"[ERRO] Erro: {e}")
        import traceback
        traceback.print_exc()
        return False


def test_verify_email() -> bool:
    """Testa verificação de email"""
    print_header("4. Verificar Email")
    
    global verification_token
    
    print("\n[NOTA] Para testar a verificacao de email, voce precisa:")
    print("   1. Verificar o token no banco de dados (tabela email_verification_tokens)")
    print("   2. Ou verificar os logs do RabbitMQ")
    print("   3. Ou usar o token recebido no email")
    
    # Para execução não-interativa, pular o teste
    try:
        import sys
        if not sys.stdin.isatty():
            print("[SKIP] Teste de verificacao pulado (execucao nao-interativa)")
            return True
        token = input("\nDigite o token de verificacao (ou pressione Enter para pular): ").strip()
    except (EOFError, KeyboardInterrupt):
        print("[SKIP] Teste de verificacao pulado (execucao nao-interativa)")
        return True
    
    if not token:
        print("[SKIP] Teste de verificacao pulado")
        return True
    
    verification_token = token
    
    try:
        payload = {
            "token": verification_token
        }
        
        response = requests.post(
            f"{BASE_URL}/auth/verify-email",
            json=payload,
            headers={"Content-Type": "application/json"},
            timeout=10
        )
        
        data = response.json()
        success = response.status_code == 200 and data.get('status') == 'success'
        
        return print_result("POST /auth/verify-email", success, response, data)
    except requests.exceptions.ConnectionError:
        print(f"[ERRO] Nao foi possivel conectar ao servidor em {BASE_URL}")
        print(f"[ERRO] Verifique se o servidor esta rodando: php artisan serve")
        return False
    except Exception as e:
        print(f"[ERRO] Erro: {e}")
        import traceback
        traceback.print_exc()
        return False


def test_login() -> bool:
    """Testa login após verificação"""
    print_header("5. Login")
    
    global access_token, refresh_token, user_id
    
    try:
        payload = {
            "email": TEST_EMAIL,
            "password": TEST_PASSWORD
        }
        
        response = requests.post(
            f"{BASE_URL}/auth/login",
            json=payload,
            headers={"Content-Type": "application/json"},
            timeout=10
        )
        
        data = response.json()
        success = response.status_code == 200 and data.get('status') == 'success'
        
        if success and 'accessToken' in data:
            access_token = data['accessToken']
            refresh_token = data.get('refreshToken')
            if 'user' in data:
                user_id = data['user'].get('id')
                student_id = data['user'].get('student_id')
            print(f"\n[TOKEN] Access Token obtido: {access_token[:50]}...")
            print(f"[TOKEN] Refresh Token obtido: {refresh_token[:50] if refresh_token else 'N/A'}...")
        
        return print_result("POST /auth/login", success, response, data)
    except requests.exceptions.ConnectionError:
        print(f"[ERRO] Nao foi possivel conectar ao servidor em {BASE_URL}")
        print(f"[ERRO] Verifique se o servidor esta rodando: php artisan serve")
        return False
    except Exception as e:
        print(f"[ERRO] Erro: {e}")
        import traceback
        traceback.print_exc()
        return False


def test_login_with_student_id() -> bool:
    """Testa login usando student_id"""
    print_header("6. Login com Student ID")
    
    global access_token, refresh_token, student_id
    
    if not student_id:
        print("⏭️  Teste pulado: student_id não disponível (faça registro primeiro)")
        return True
    
    try:
        payload = {
            "email": student_id,  # Usar student_id no campo email
            "password": TEST_PASSWORD
        }
        
        response = requests.post(
            f"{BASE_URL}/auth/login",
            json=payload,
            headers={"Content-Type": "application/json"},
            timeout=10
        )
        
        # Verificar se a resposta é JSON
        try:
            data = response.json()
        except ValueError:
            print(f"[ERRO] Resposta nao e JSON. Status: {response.status_code}")
            print(f"[ERRO] Resposta recebida (primeiros 1000 chars):")
            print(response.text[:1000])
            print(f"\n[ERRO] Content-Type: {response.headers.get('Content-Type', 'N/A')}")
            return False
        
        success = response.status_code == 200 and data.get('status') == 'success'
        
        if success and 'accessToken' in data:
            access_token = data['accessToken']
            refresh_token = data.get('refreshToken')
            print(f"\n[TOKEN] Access Token obtido com Student ID: {access_token[:50]}...")
            print(f"[TOKEN] Refresh Token obtido: {refresh_token[:50] if refresh_token else 'N/A'}...")
            if 'user' in data and data['user'].get('student_id'):
                print(f"[INFO] Login realizado com Student ID: {data['user'].get('student_id')}")
        
        return print_result("POST /auth/login (com Student ID)", success, response, data)
    except requests.exceptions.ConnectionError:
        print(f"[ERRO] Nao foi possivel conectar ao servidor em {BASE_URL}")
        print(f"[ERRO] Verifique se o servidor esta rodando: php artisan serve")
        return False
    except Exception as e:
        print(f"[ERRO] Erro: {e}")
        import traceback
        traceback.print_exc()
        return False


def test_me() -> bool:
    """Testa obter perfil do usuário"""
    print_header("7. Obter Perfil (Me)")
    
    global access_token
    
    if not access_token:
        print("⏭️  Teste pulado: necessário fazer login primeiro")
        return True
    
    try:
        headers = {
            "Authorization": f"Bearer {access_token}",
            "Content-Type": "application/json"
        }
        
        response = requests.get(
            f"{BASE_URL}/auth/me",
            headers=headers,
            timeout=10
        )
        
        data = response.json()
        success = response.status_code == 200 and data.get('status') == 'success'
        
        return print_result("GET /auth/me", success, response, data)
    except requests.exceptions.ConnectionError:
        print(f"[ERRO] Nao foi possivel conectar ao servidor em {BASE_URL}")
        print(f"[ERRO] Verifique se o servidor esta rodando: php artisan serve")
        return False
    except Exception as e:
        print(f"[ERRO] Erro: {e}")
        import traceback
        traceback.print_exc()
        return False


def test_refresh_token() -> bool:
    """Testa renovação de token"""
    print_header("8. Refresh Token")
    
    global access_token, refresh_token
    
    if not refresh_token:
        print("⏭️  Teste pulado: necessário fazer login primeiro")
        return True
    
    try:
        payload = {
            "refreshToken": refresh_token
        }
        
        response = requests.post(
            f"{BASE_URL}/auth/refresh-token",
            json=payload,
            headers={"Content-Type": "application/json"},
            timeout=10
        )
        
        data = response.json()
        success = response.status_code == 200 and data.get('status') == 'success'
        
        if success and 'accessToken' in data:
            old_token = access_token
            access_token = data['accessToken']
            refresh_token = data.get('refreshToken', refresh_token)
            print(f"\n[REFRESH] Token renovado!")
            print(f"          Token antigo: {old_token[:30]}...")
            print(f"          Token novo: {access_token[:30]}...")
        
        return print_result("POST /auth/refresh-token", success, response, data)
    except requests.exceptions.ConnectionError:
        print(f"[ERRO] Nao foi possivel conectar ao servidor em {BASE_URL}")
        print(f"[ERRO] Verifique se o servidor esta rodando: php artisan serve")
        return False
    except Exception as e:
        print(f"[ERRO] Erro: {e}")
        import traceback
        traceback.print_exc()
        return False


def test_forgot_password() -> bool:
    """Testa solicitação de reset de senha"""
    print_header("9. Solicitar Reset de Senha")
    
    try:
        payload = {
            "email": TEST_EMAIL
        }
        
        response = requests.post(
            f"{BASE_URL}/auth/password-reset/request",
            json=payload,
            headers={"Content-Type": "application/json"},
            timeout=10
        )
        
        data = response.json()
        success = response.status_code == 200 and data.get('status') == 'success'
        
        print("\n[INFO] Token de reset sera enviado por email")
        print("       (Verifique o email ou logs do RabbitMQ)")
        
        return print_result("POST /auth/password-reset/request", success, response, data)
    except requests.exceptions.ConnectionError:
        print(f"[ERRO] Nao foi possivel conectar ao servidor em {BASE_URL}")
        print(f"[ERRO] Verifique se o servidor esta rodando: php artisan serve")
        return False
    except Exception as e:
        print(f"[ERRO] Erro: {e}")
        import traceback
        traceback.print_exc()
        return False


def test_reset_password() -> bool:
    """Testa reset de senha"""
    print_header("10. Resetar Senha")
    
    print("\n[NOTA] Para testar o reset de senha, voce precisa:")
    print("   1. Verificar o token nos logs do RabbitMQ (o token ORIGINAL, nao o hash do banco)")
    print("   2. Ou verificar o email (se configurado)")
    print("   3. IMPORTANTE: O token no banco esta HASHADO. Use o token ORIGINAL enviado por email!")
    print("   4. O token original e uma string aleatoria de 64 caracteres")
    
    token = input("\nDigite o token de reset ORIGINAL (nao o hash do banco) ou pressione Enter para pular: ").strip()
    
    if not token:
        print("[SKIP] Teste de reset pulado")
        return True
    
    try:
        payload = {
            "email": TEST_EMAIL,
            "token": token,
            "newPassword": "novaSenha123456"
        }
        
        response = requests.post(
            f"{BASE_URL}/auth/password-reset/reset",
            json=payload,
            headers={"Content-Type": "application/json"},
            timeout=10
        )
        
        # Verificar se a resposta é JSON
        try:
            data = response.json()
        except ValueError:
            print(f"\n[ERRO] Resposta nao e JSON. Status: {response.status_code}")
            print(f"[ERRO] Content-Type: {response.headers.get('Content-Type', 'N/A')}")
            print(f"[ERRO] Resposta completa (primeiros 2000 chars):")
            print("-" * 60)
            print(response.text[:2000])
            print("-" * 60)
            return False
        
        success = response.status_code == 200 and data.get('status') == 'success'
        
        if success:
            print("\n[OK] Senha alterada! Use 'novaSenha123456' para fazer login")
        
        return print_result("POST /auth/password-reset/reset", success, response, data)
    except requests.exceptions.ConnectionError:
        print(f"[ERRO] Nao foi possivel conectar ao servidor em {BASE_URL}")
        print(f"[ERRO] Verifique se o servidor esta rodando: php artisan serve")
        return False
    except Exception as e:
        print(f"[ERRO] Erro: {e}")
        import traceback
        traceback.print_exc()
        return False


def test_logout() -> bool:
    """Testa logout"""
    print_header("11. Logout")
    
    global refresh_token
    
    if not refresh_token:
        print("⏭️  Teste pulado: necessário fazer login primeiro")
        return True
    
    try:
        payload = {
            "refreshToken": refresh_token
        }
        
        response = requests.post(
            f"{BASE_URL}/auth/logout",
            json=payload,
            headers={"Content-Type": "application/json"},
            timeout=10
        )
        
        data = response.json()
        success = response.status_code == 200 and data.get('status') == 'success'
        
        if success:
            refresh_token = None
            print("\n[OK] Logout realizado com sucesso")
        
        return print_result("POST /auth/logout", success, response, data)
    except requests.exceptions.ConnectionError:
        print(f"[ERRO] Nao foi possivel conectar ao servidor em {BASE_URL}")
        print(f"[ERRO] Verifique se o servidor esta rodando: php artisan serve")
        return False
    except Exception as e:
        print(f"[ERRO] Erro: {e}")
        import traceback
        traceback.print_exc()
        return False


def test_logout_all() -> bool:
    """Testa logout de todos os dispositivos"""
    print_header("12. Logout de Todos os Dispositivos")
    
    global access_token
    
    if not access_token:
        print("⏭️  Teste pulado: necessário fazer login primeiro")
        return True
    
    try:
        headers = {
            "Authorization": f"Bearer {access_token}",
            "Content-Type": "application/json"
        }
        
        response = requests.post(
            f"{BASE_URL}/auth/logout-all",
            headers=headers,
            timeout=10
        )
        
        data = response.json()
        success = response.status_code == 200 and data.get('status') == 'success'
        
        return print_result("POST /auth/logout-all", success, response, data)
    except requests.exceptions.ConnectionError:
        print(f"[ERRO] Nao foi possivel conectar ao servidor em {BASE_URL}")
        print(f"[ERRO] Verifique se o servidor esta rodando: php artisan serve")
        return False
    except Exception as e:
        print(f"[ERRO] Erro: {e}")
        import traceback
        traceback.print_exc()
        return False


def main():
    """Função principal"""
    print("\n" + "=" * 60)
    print("  TESTES DA MS USERS API")
    print("=" * 60)
    print(f"URL Base: {BASE_URL}")
    print(f"Timestamp: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print(f"Email de teste: {TEST_EMAIL}")
    
    results = {}
    
    # Executar testes
    results['health'] = test_health_check()
    results['register'] = test_register()
    results['login_before_verification'] = test_login_before_verification()
    results['verify_email'] = test_verify_email()
    results['login'] = test_login()
    results['login_with_student_id'] = test_login_with_student_id()
    results['me'] = test_me()
    results['refresh_token'] = test_refresh_token()
    results['forgot_password'] = test_forgot_password()
    results['reset_password'] = test_reset_password()
    results['logout'] = test_logout()
    results['logout_all'] = test_logout_all()
    
    # Resumo
    print_header("RESUMO DOS TESTES")
    
    total = len(results)
    passed = sum(1 for v in results.values() if v)
    failed = total - passed
    
    for test_name, result in results.items():
        status = "[OK] PASSOU" if result else "[ERRO] FALHOU"
        print(f"{test_name.upper():30} {status}")
    
    print("\n" + "=" * 60)
    print(f"Total: {total} | Passou: {passed} | Falhou: {failed}")
    print("=" * 60 + "\n")
    
    if failed > 0:
        print("[AVISO] Alguns testes falharam. Verifique:")
        print("   - Se o servidor esta rodando (php artisan serve)")
        print("   - Se o banco de dados esta configurado")
        print("   - Se as migrations foram executadas")
        print("   - Se o RabbitMQ esta configurado (opcional)")
        sys.exit(1)
    else:
        print("[OK] Todos os testes passaram!")
        sys.exit(0)


if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\n\n[AVISO] Testes interrompidos pelo usuario")
        sys.exit(1)
    except Exception as e:
        print(f"\n\n[ERRO] Erro fatal: {e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)

