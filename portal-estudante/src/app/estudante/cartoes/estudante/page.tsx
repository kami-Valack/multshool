"use client";

import styled from "styled-components";
import Header from "@/components/ui/HeaderGeneral";
import BottomMenu from "@/components/ui/BottomMenu";
import { useAuth } from "@/contexts/AuthContext";
import { studentService } from "@/services/studentService";
import { useEffect, useState } from "react";
import { StudentCard } from "@/components/ui/Cards";
import { useNavigation } from "@/hooks/navigation";

// Styled Components
const Container = styled.div`
  width: 100%;
  min-height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: ${(props) => props.theme.fonts.family.poppins};
  margin-bottom: 150px;
`;

const CardS = styled.div`
  width: 95%;
  margin-top: 10px;
`;

const ActionsContainer = styled.div`
  width: 95%;
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
  margin-bottom: 30px;
`;

const ActionButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  background: white;
  border: none;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  transition: all 0.2s ease;
  flex: 1;
  max-width: 100px;
  font-family: ${(props) => props.theme.fonts.family.poppins};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
  }

  &:active {
    transform: translateY(0);
  }
`;

const IconWrapper = styled.div`
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f5f5;
  border-radius: 50%;

  svg {
    width: 24px;
    height: 24px;
    color: #333;
  }
`;

const ActionLabel = styled.span`
  font-size: 12px;
  color: #333;
  font-weight: 500;
  text-align: center;
`;

const ResumoCard = styled.div`
  width: 85%;
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
`;

const ResumoTitle = styled.h2`
  font-size: 14px;
  font-weight: 600;
  color: #333;
  margin: 0 0 20px 0;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
`;

const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const InfoLabel = styled.span`
  font-size: 12px;
  color: #666;
  font-weight: 400;
`;

const InfoValue = styled.span`
  font-size: 14px;
  color: #333;
  font-weight: 600;
`;

const StatusBadge = styled.span`
  display: inline-block;
  background: #e8f5e9;
  color: #2e7d32;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
`;

export default function DashboardCEstudante() {
  const { user } = useAuth();
  const { navigateTo } = useNavigation();
  const [enrollments, setEnrollments] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      if (user) {
        try {
          const enrollmentsData = await studentService.getEnrollments();
          setEnrollments(enrollmentsData);
        } catch (error) {
          console.error("Erro ao carregar matrículas:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };
    loadData();
  }, [user]);

  const activeEnrollment = enrollments.find((e) => e.status === "approved");
  const studentCardData = user
    ? {
        studentName: user.name,
        course: activeEnrollment?.course?.name || "Sem curso",
        studentNumber: user.student_id || "",
        class: activeEnrollment?.course?.name || "",
        institutionName: activeEnrollment?.course?.institution_id || "",
        institutionFullName: activeEnrollment?.course?.name || "",
        institutionColor: "#6C5F8D",
      }
    : null;

  return (
    <>
      <Header variant="withBack" title="Consulta" />
      <Container>
        <CardS>
          {studentCardData ? (
            <StudentCard studentData={studentCardData} />
          ) : (
            <div style={{ padding: "20px", textAlign: "center" }}>
              <p>A carregar dados do cartão...</p>
            </div>
          )}
        </CardS>

        <ActionsContainer>
          <ActionButton
            onClick={() => {
              navigateTo(`estudante/movimentos`);
            }}
          >
            <IconWrapper>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#000000"
                  d="M12.05 20q-3.35 0-5.7-2.325T4 12v-.175l-1.6 1.6l-1.4-1.4l4-4l4 4l-1.4 1.4l-1.6-1.6V12q0 2.5 1.763 4.25T12.05 18q.65 0 1.275-.15t1.225-.45l1.5 1.5q-.95.55-1.95.825T12.05 20ZM19 15.975l-4-4l1.4-1.4l1.6 1.6V12q0-2.5-1.763-4.25T11.95 6q-.65 0-1.275.15T9.45 6.6l-1.5-1.5q.95-.55 1.95-.825T11.95 4q3.35 0 5.7 2.325T20 12v.175l1.6-1.6l1.4 1.4l-4 4Z"
                />
              </svg>
            </IconWrapper>
            <ActionLabel>Movimentos</ActionLabel>
          </ActionButton>

          <ActionButton
            onClick={() => {
              navigateTo(`estudante/curso`);
            }}
          >
            <IconWrapper>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#000000"
                  d="m12 21l-7-3.8v-6L1 9l11-6l11 6v8h-2v-6.9l-2 1.1v6L12 21Zm0-8.3L18.85 9L12 5.3L5.15 9L12 12.7Zm0 6.025l5-2.7V12.25L12 15l-5-2.75v3.775l5 2.7Zm0-6.025Zm0 2.25Zm0 0Z"
                />
              </svg>
            </IconWrapper>
            <ActionLabel>Curso</ActionLabel>
          </ActionButton>

          <ActionButton>
            <IconWrapper>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#000000"
                  d="M6 14q-.825 0-1.413-.588T4 12q0-.825.588-1.413T6 10q.825 0 1.413.588T8 12q0 .825-.588 1.413T6 14Zm6 0q-.825 0-1.413-.588T10 12q0-.825.588-1.413T12 10q.825 0 1.413.588T14 12q0 .825-.588 1.413T12 14Zm6 0q-.825 0-1.413-.588T16 12q0-.825.588-1.413T18 10q.825 0 1.413.588T20 12q0 .825-.588 1.413T18 14Z"
                />
              </svg>
            </IconWrapper>
            <ActionLabel>Informações</ActionLabel>
          </ActionButton>
        </ActionsContainer>

        <ResumoCard>
          <ResumoTitle>Resumo</ResumoTitle>
          <InfoGrid>
            <InfoItem>
              <InfoLabel>Turma</InfoLabel>
              <InfoValue>EINF-M1</InfoValue>
            </InfoItem>

            <InfoItem>
              <InfoLabel>Sala</InfoLabel>
              <InfoValue>BAA3 - 2º andar</InfoValue>
            </InfoItem>

            <InfoItem>
              <InfoLabel>Período</InfoLabel>
              <InfoValue>Manhã</InfoValue>
            </InfoItem>

            <InfoItem>
              <InfoLabel>Estado</InfoLabel>
              <StatusBadge>Activo</StatusBadge>
            </InfoItem>
          </InfoGrid>
        </ResumoCard>
        <BottomMenu />
      </Container>
    </>
  );
}
