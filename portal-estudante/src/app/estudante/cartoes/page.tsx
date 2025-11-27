"use client";

import BottomMenu from "@/components/ui/BottomMenu";
import CreditCard, { StudentCard, TraineeCard } from "@/components/ui/Cards";
import Header from "@/components/ui/HeaderGeneral";
import { useRouter } from "next/navigation";
import styled from "styled-components";
import { useAuth } from "@/contexts/AuthContext";
import { studentService } from "@/services/studentService";
import { useEffect, useState } from "react";

// Styled components
const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header2 = styled.div`
  width: 100%;
`;

const Cards = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 120px;
`;
const Onclick = styled.div``;

export default function Cartões() {
  const router = useRouter();
  const { user } = useAuth();
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

  // Dados do cartão de estagiário - usando dados do usuário autenticado
  // TODO: Quando houver API de estágios, buscar dados reais
  const traineeCardData = user
    ? {
        traineeName: user.name,
        internshipRole: "Estagiário", // TODO: Buscar da API quando disponível
        traineeNumber: user.student_id ? `TRN-${user.student_id}` : "TRN-000",
        department: "TI", // TODO: Buscar da API quando disponível
        companyName: "TIS", // TODO: Buscar da API quando disponível
        companyFullName: "Emp. de Consul. Tecnológica", // TODO: Buscar da API quando disponível
        companyColor: "linear-gradient(30deg, #4F46E5 0%, #3B82F6 100%)", // TODO: Buscar da API quando disponível
        companyLogo: undefined,
        qrCode: undefined,
      }
    : null;

  const handleClickCredit = () => {
    router.push(`cartoes/credito/`);
  };
  const handleClickStudent = () => {
    router.push(`cartoes/estudante/`);
  };
  const handleClickTrainee = () => {
    router.push(`cartoes/trainee/`);
  };

  return (
    <>
      <Container>
        <Header2>
          <Header variant="withBack" title="Os meus cartões" />
        </Header2>
        <Cards>
          <Onclick onClick={handleClickCredit}>
            <CreditCard />
          </Onclick>
          <Onclick onClick={handleClickStudent}>
            {studentCardData ? (
              <StudentCard studentData={studentCardData} />
            ) : (
              <div style={{ padding: "20px", textAlign: "center" }}>
                <p>A carregar dados do cartão...</p>
              </div>
            )}
          </Onclick>
          <Onclick onClick={handleClickTrainee}>
            {traineeCardData ? (
              <TraineeCard traineeData={traineeCardData} />
            ) : (
              <div style={{ padding: "20px", textAlign: "center" }}>
                <p>A carregar dados do cartão...</p>
              </div>
            )}
          </Onclick>
        </Cards>
        <BottomMenu />
      </Container>
    </>
  );
}
