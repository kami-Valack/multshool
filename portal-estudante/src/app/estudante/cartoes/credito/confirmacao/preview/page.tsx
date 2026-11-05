"use client";

import styled from "styled-components";
import BottomMenu from "@/components/ui/BottomMenu";
import Header from "@/components/ui/HeaderGeneral";
import BackgroundVectors from "@/components/Bg_vectors";
import { useEffect, useState } from "react";
import { ConfirmacaoCardCompacto } from "@/components/ConfirmacaoCard";
import Button from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { Enrollment, studentService } from "@/services/studentService";

// Styled Components
const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: ${(props) => props.theme.fonts.family.poppins};
  margin: 0 0 120px 0;
`;

const Top = styled.div`
  width: 100%;
`;

const StudentInfo = styled.div`
  width: 90%;
  background: ${(props) => props.theme.colors.background_2};
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5px 0 30px 0;
`;

const Photo = styled.div`
  width: 90px;
  height: 90px;
  position: relative;
  border-radius: 50%;
  margin: 20px 0 0 0;
`;
const Nome = styled.p`
  font-size: 16px;
  color: ${(props) => props.theme.colors.primary};
  margin: 15px 0 0 0;
  font-weight: ${(props) => props.theme.fonts.weight.semibold};
`;

const Class = styled.p`
  font-size: 13px;
  color: ${(props) => props.theme.colors.textBlack};
  margin: 4px 0;
`;

const Card = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 40px 0 0 0;
`;

const ButtonGroup = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 30px;
`;

export default function Preview() {
  const { user } = useAuth();
  const [enrollment, setEnrollment] = useState<Enrollment | null>(null);
  const router = useRouter();
  const displayName = user?.name?.trim() || "Estudante";

  useEffect(() => {
    studentService
      .getEnrollments()
      .then((list) =>
        setEnrollment(list.find((e) => e.status === "approved") || list[0] || null)
      )
      .catch(() => setEnrollment(null));
  }, []);

  const handlePage = () => {
    router.push(`/estudante/cartoes/credito/instituicao`);
  };

  return (
      <>
        <BackgroundVectors>
          <Container>
            <Top>
              <Header variant="withBack" title="Confirmação" />
            </Top>

            <StudentInfo>
              <Nome>{displayName}</Nome>
              <Class>{enrollment?.course?.name || "Sem curso"}</Class>
            </StudentInfo>
            <Card>
              <ConfirmacaoCardCompacto
                info={{
                  studentName: displayName,
                  courseName: enrollment?.course?.name,
                  studentNumber: user?.student_id,
                  year: enrollment?.created_at
                    ? String(new Date(enrollment.created_at).getFullYear())
                    : undefined,
                  status: enrollment?.status || "sem matrícula",
                }}
              />
            </Card>
            <ButtonGroup>
              <Button
                bgColor="primary"
                textColor="#FFFFFF"
                text="Continuar"
                hasBorder={true}
                onClick={handlePage}
              />
              <Button
                bgColor="background"
                textColor="#6C5F8D"
                text="Reportar"
                hasBorder={true}
                onClick={handlePage}
              />
            </ButtonGroup>
          </Container>
          <BottomMenu />
        </BackgroundVectors>
      </>
  );
}
