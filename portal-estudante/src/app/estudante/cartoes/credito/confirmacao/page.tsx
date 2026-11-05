"use client";
import { useEffect, useState } from "react";
import styled from "styled-components";
import BottomMenu from "@/components/ui/BottomMenu";
import Header from "@/components/ui/HeaderGeneral";
import BackgroundVectors from "@/components/Bg_vectors";
import ConfirmacaoCard from "@/components/ConfirmacaoCard";
import { useAuth } from "@/contexts/AuthContext";
import { Enrollment, studentService } from "@/services/studentService";
import RecentSection from "@/components/ui/RecentSection";
import Button from "@/components/ui/Button";
import { AlertModal } from "@/components/AlertModal";
import { useRouter } from "next/navigation";

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

const Photo = styled.div`
  width: 150px;
  height: 190px;
  position: relative;
  border-radius: 120px;
  margin: 20px 0 0 0;
`;

const StepContent = styled.div`
  width: 100%;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 20px;
`;

const StudentName = styled.h2`
  font-size: 20px;
  font-weight: ${(props) => props.theme.fonts.weight.semibold};
  color: ${(props) => props.theme.colors.primary};
  text-align: center;
  margin: 20px 0 5px 0;
`;

const StudentInfo = styled.p`
  font-size: 14px;
  color: #666;
  text-align: center;
  margin: 0 0 30px 0;
`;

const Total = styled.div`
  width: 100%;
  text-align: center;
  font-size: 16px;
  font-weight: ${(props) => props.theme.fonts.weight.semibold};
  color: #333;
  margin: 10px 0;
`;

const TotalValue = styled.div`
  font-size: 24px;
  font-weight: ${(props) => props.theme.fonts.weight.semibold};
  color: #4caf50;
  margin-top: 5px;
`;

const ButtonGroup = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 30px;
`;

export default function Instituicao() {
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [enrollment, setEnrollment] = useState<Enrollment | null>(null);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const displayName = user?.name?.trim() || "Estudante";

  useEffect(() => {
    studentService
      .getEnrollments()
      .then((list) =>
        setEnrollment(list.find((e) => e.status === "approved") || list[0] || null)
      )
      .catch(() => setEnrollment(null));
  }, []);

  const cardInfo = {
    studentName: displayName,
    institutionName: enrollment?.course?.school?.name,
    courseName: enrollment?.course?.name,
    studentNumber: user?.student_id,
    year: enrollment?.created_at
      ? String(new Date(enrollment.created_at).getFullYear())
      : undefined,
    status: enrollment?.status || "sem matrícula",
  };
  const router = useRouter();

  const handleConfirmAlert = () => {
    setIsAlertOpen(true);
  };
  const handleCloseAlert = () => {
    setIsAlertOpen(false);
  };

  const handleContinue = () => {
    if (currentStep === 1) {
      setCurrentStep(2);
    } else {
      // Finalizar processo
      console.log("Processo finalizado");
    }
  };

  const handleBack = () => {
    if (currentStep === 2) {
      setCurrentStep(1);
    } else {
      // Função para voltar completamente se necessário
      console.log("Voltar da primeira etapa");
    }
  };

  return (
    <BackgroundVectors>
      <Container>
        <Top>
          <Header
            variant={currentStep === 2 ? "withBack" : "withBack"}
            title="Confirmação"
          />
        </Top>

        <StepContent>
          {currentStep === 1 ? (
            // Etapa 1: Dados do estudante e seleções
            <>
            {/* CRIAR COMPONENTE - REDUNDANTE!!! */}
              <ConfirmacaoCard info={cardInfo} />

              <ButtonGroup>
                <Button
                  bgColor="primary"
                  textColor="white"
                  text="Continuar"
                  onClick={handleContinue}
                />
              </ButtonGroup>
            </>
          ) : (
            // Etapa 2: Resumo de pagamentos e confirmação final
            <>
              <StudentName>{displayName}</StudentName>
              <StudentInfo>
                {[enrollment?.course?.school?.name, enrollment?.course?.name]
                  .filter(Boolean)
                  .join(" · ") || "Sem curso"}
              </StudentInfo>

              <RecentSection
                variant="movimentos"
                showHeader={true}
                title="Descrição"
              />

              <Total>
                Total:
                <TotalValue>—</TotalValue>
              </Total>

              <ButtonGroup>
                <Button
                  bgColor="primary"
                  textColor="white"
                  text="Confirmar"
                  onClick={handleConfirmAlert}
                />
              </ButtonGroup>
            </>
          )}
        </StepContent>

        <BottomMenu />

        {isAlertOpen && (
          <AlertModal
            isOpen={isAlertOpen}
            title="Confirmação feita com sucesso!"
            message="A confirmação foi registada neste dispositivo."
            onClose={handleCloseAlert}
            onConfirm={() => {
              handleCloseAlert();
              router.push("confirmacao/preview");
            }}
            showCancelButton={false}
          />
        )}
      </Container>
    </BackgroundVectors>
  );
}
