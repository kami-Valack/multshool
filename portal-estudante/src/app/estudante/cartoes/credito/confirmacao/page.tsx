"use client";
import { useState } from "react";
import styled from "styled-components";
import BottomMenu from "@/components/ui/BottomMenu";
import Header from "@/components/ui/HeaderGeneral";
import BackgroundVectors from "@/components/Bg_vectors";
import Image from "next/image";
import { mockStudents } from "@/mocks/student";
import ConfirmacaoCard from "@/components/ConfirmacaoCard";
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
  const [currentStep, setCurrentStep] = useState(1);
  const student = mockStudents.find((s) => s.id === "stu-1");
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const router = useRouter();

  const handleConfirmAlert = () => {
    setIsAlertOpen(true);
  };
  const handleCloseAlert = () => {
    setIsAlertOpen(false);
  };

  // Dados específicos para a confirmação de pagamento (TO REMOVE/USAR MOCKS)
  const confirmacaoData = [
    {
      title: "Folhas de prova",
      date: "05.07.2025",
      amount: "12.600,50 kz",
      isPositive: false,
    },
    {
      title: "Cartão de estudante",
      date: "06.06.2025",
      amount: "54.600,50 kz",
      isPositive: false,
    },
    {
      title: "Propina Outubro",
      date: "06.06.2025",
      amount: "10.900,50 kz",
      isPositive: true,
    },
    {
      title: "Confirmação",
      date: "01.05.2025",
      amount: "54.600,50 kz",
      isPositive: true,
    },
  ];

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
              <Photo>
                {student?.profilePhoto && (
                  <Image
                    src={student.profilePhoto}
                    alt={student.fullName}
                    fill
                    style={{ objectFit: "cover", borderRadius: "5px" }}
                  />
                )}
              </Photo>

              <ConfirmacaoCard />

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
              <Photo>
                {student?.profilePhoto && (
                  <Image
                    src={student.profilePhoto}
                    alt={student.fullName}
                    fill
                    style={{ objectFit: "cover", borderRadius: "5px" }}
                  />
                )}
              </Photo>

              <StudentName>{student?.fullName}</StudentName>
              <StudentInfo>Confirmação Ano Lectivo 2025/26</StudentInfo>

              <RecentSection
                variant="movimentos"
                showHeader={true}
                title="Descrição"
              />

              <Total>
                Total:
                <TotalValue>35.000,00 kz</TotalValue>
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
            message="Bem-vindo ao ano lectivo 2025/26"
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
