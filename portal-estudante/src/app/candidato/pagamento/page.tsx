"use client";

import React, { useState } from "react";
import styled from "styled-components";
import { Header } from "@/components/candidato/Header";
import BgVectors from "@/components/Bg_vectors";
import Button from "@/components/ui/Button";
import { AlertModal } from "@/components/AlertModal";
import { useRouter } from "next/navigation";

const Container = styled.div`
  min-height: 100vh;
  padding: 0 20px;
  margin-bottom: 170px;
`;

const PageTitle = styled.h2`
  text-align: center;
  margin: 0 0 15px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

const Title = styled.h3`
  font-size: 17px;
  text-transform: uppercase;
  color: ${(props) => props.theme.colors.primary};
  font-weight: ${(props) => props.theme.fonts.weight.semibold};
  margin-bottom: -8px;
`;

const Subtitle = styled.p`
  color: ${(props) => props.theme.colors.textBlack};
  font-size: 15px;
  font-weight: ${(props) => props.theme.fonts.weight.regular};
`;

const InstitutionCard = styled.div`
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 30px;
  display: flex;
  align-items: flex-start;
  gap: 16px;
`;

const InstitutionImage = styled.div`
  width: 90px;
  height: 80px;
  border-radius: 12px;
  background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
  border: 3px solid #f59e0b;
  overflow: hidden;
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const InstitutionImagePlaceholder = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%);
  display: flex;
  align-items: center;
  justify-content: center;

  &::before {
    content: "🏫";
    font-size: 24px;
  }
`;

const InstitutionInfo = styled.div`
  flex: 1;
`;

const InstitutionName = styled.h3`
  font-size: 14px;
  font-weight: ${(props) => props.theme.fonts.weight.semibold};
  color: ${(props) => props.theme.colors.textBlack};
  margin: 0 0 8px 0;
  line-height: 1.3;
`;

const InstitutionAddress = styled.p`
  font-size: 13px;
  color: ${(props) => props.theme.colors.primary};
  margin: 0;
  font-weight: ${(props) => props.theme.fonts.weight.regular};
`;

const PaymentDetails = styled.div`
  background: ${(props) => props.theme.colors.background_2};
  border-radius: 16px;
  padding: 24px 20px;
  margin-bottom: 40px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
`;

const PaymentTitle = styled.h3`
  font-size: 18px;
  font-weight: ${(props) => props.theme.fonts.weight.semibold};
  color: ${(props) => props.theme.colors.primary};
  text-align: center;
  margin: 0 0 30px 0;
`;

const PaymentItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  &:last-of-type {
    margin-bottom: 0;
  }
`;

const PaymentLabel = styled.span`
  font-size: 15px;
  color: ${(props) => props.theme.colors.textBlack};
  font-weight: 400;
`;

const PaymentValue = styled.span`
  font-size: 15px;
  color: ${(props) => props.theme.colors.primary};
  font-weight: 600;
`;

const TotalSection = styled.div`
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid #e5e7eb;
`;

const TotalLabel = styled.div`
  text-align: center;
  font-size: 14px;
  color: ${(props) => props.theme.colors.foreground};
  margin-bottom: 8px;
`;

const TotalValue = styled.div`
  text-align: center;
  font-size: 22px;
  font-weight: ${(props) => props.theme.fonts.weight.semibold};
  color: ${(props) => props.theme.colors.primary};
`;

const ConfirmButton = styled.div`
  width: 100%;
`;

// Estilos para a segunda tela
const PaymentReferenceCard = styled.div`
  background: ${(props) => props.theme.colors.background_2};
  border-radius: 16px;
  padding: 24px 20px;
  margin-bottom: 30px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
`;

const ReferenceField = styled.div`
  margin-bottom: 24px;
`;

const ReferenceLabel = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

const FieldLabel = styled.span`
  font-size: 16px;
  color: ${(props) => props.theme.colors.primary};
  font-weight: ${(props) => props.theme.fonts.weight.semibold};
`;

const CopyIcon = styled.button`
  background: none;
  border: none;
  padding: 4px;
  cursor: pointer;

  &::before {
    content: "📋";
    font-size: 16px;
  }
`;

const ReferenceValue = styled.div`
  font-size: 18px;
  font-weight: ${(props) => props.theme.fonts.weight.semibold};
  color: ${(props) => props.theme.colors.textBlack};
`;

const InstructionText = styled.p`
  font-size: 12px;
  color: ${(props) => props.theme.colors.foreground};
  text-align: center;
  line-height: 1.5;
  margin: 30px 0;
`;

const ColortText = styled.span`
  color: ${(props) => props.theme.colors.primary};
`;

const BankLogos = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 12px;
  margin: 30px 0;
`;

const BankLogo = styled.div<{ color: string }>`
  width: 60px;
  height: 60px;
  border-radius: 12px;
  background: ${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: ${(props) => props.theme.fonts.weight.semibold};
  font-size: 12px;
  text-align: center;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }
`;

// Componente Toast
const ToastContainer = styled.div<{ show: boolean }>`
  position: fixed;
  bottom: 100px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: ${(props) => props.theme.fonts.weight.regular};
  z-index: 1000;
  opacity: ${(props) => (props.show ? 1 : 0)};
  transition: opacity 0.3s ease-in-out;
  pointer-events: none;
`;

export default function PaymentScreen() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<1 | 2>(1);
  const [toastMessage, setToastMessage] = useState<string>("");
  const [showToast, setShowToast] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleBack = () => {
    if (currentStep === 2) {
      setCurrentStep(1);
    } else {
      // Navegar para tela anterior
      console.log("Voltar para tela anterior");
    }
  };

  const handleConfirm = () => {
    setCurrentStep(2);
  };

  const handleSelectApp = () => {
    setShowAlert(true);
    console.log("Escolher aplicativo de pagamento");
  };

  const handleConfirmNavigation = () => {
    router.push("details");
  };

  const handleCancelAlert = () => {
    setShowAlert(false);
  };

  //   Toast message - copiar entidade e referência
  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setToastMessage(`${label} copiado!`);
    setShowToast(true);

    // Esconder toast após 2 segundos
    setTimeout(() => {
      setShowToast(false);
    }, 2000);
  };

  if (currentStep === 1) {
    return (
      <BgVectors>
        <Container>
          <Header variant="with-back" text="" onBack={handleBack} />

          <PageTitle>
            <Title>Exame de acesso 2025/26</Title>
            <Subtitle>Pagamento</Subtitle>
          </PageTitle>

          <InstitutionCard>
            <InstitutionImage>
              <InstitutionImagePlaceholder />
            </InstitutionImage>
            <InstitutionInfo>
              <InstitutionName>
                ISPTEC - Instituto Superior Politécnico de Tecnologias e
                Ciências
              </InstitutionName>
              <InstitutionAddress>Av. Luanda Sul, Luanda</InstitutionAddress>
            </InstitutionInfo>
          </InstitutionCard>

          <PaymentDetails>
            <PaymentTitle>Detalhes do pagamento</PaymentTitle>

            <PaymentItem>
              <PaymentLabel>Inscrição - exame de acesso</PaymentLabel>
              <PaymentValue>5.000 kz</PaymentValue>
            </PaymentItem>

            <PaymentItem>
              <PaymentLabel>Curso Preparatório</PaymentLabel>
              <PaymentValue>35.000 kz</PaymentValue>
            </PaymentItem>

            <TotalSection>
              <TotalLabel>Total</TotalLabel>
              <TotalValue>40.000 kz</TotalValue>
            </TotalSection>
          </PaymentDetails>

          <ConfirmButton>
            <Button
              bgColor="primary"
              textColor="#FFFFFF"
              text="Continuar"
              hasBorder={false}
              onClick={handleConfirm}
            />
          </ConfirmButton>
        </Container>
      </BgVectors>
    );
  }

  // Segunda tela
  return (
    <BgVectors>
      <Container>
        <Header variant="with-back" text="" onBack={handleBack} />

        <PageTitle>
          <Title>Exame de acesso 2025/26</Title>
          <Subtitle>Pagamento</Subtitle>
        </PageTitle>

        <InstitutionCard>
          <InstitutionImage>
            <InstitutionImagePlaceholder />
          </InstitutionImage>
          <InstitutionInfo>
            <InstitutionName>
              ISPTEC - Instituto Superior Politécnico de Tecnologias e Ciências
            </InstitutionName>
            <InstitutionAddress>Av. Luanda Sul, Luanda</InstitutionAddress>
          </InstitutionInfo>
        </InstitutionCard>

        <PaymentReferenceCard>
          <ReferenceField>
            <ReferenceLabel>
              <FieldLabel>Entidade</FieldLabel>
              <CopyIcon onClick={() => copyToClipboard("00831", "Entidade")} />
            </ReferenceLabel>
            <ReferenceValue>00831</ReferenceValue>
          </ReferenceField>

          <ReferenceField>
            <ReferenceLabel>
              <FieldLabel>Referência</FieldLabel>
              <CopyIcon
                onClick={() => copyToClipboard("941 767 307 1", "Referência")}
              />
            </ReferenceLabel>
            <ReferenceValue>941 767 307 1</ReferenceValue>
          </ReferenceField>
        </PaymentReferenceCard>

        <InstructionText>
          <ColortText>Esta referência é válida por 24 horas. </ColortText>
          Utilize o Multicaixa Express ou outra aplicação de internet banking
          para efectuar o pagamento.
        </InstructionText>

        <BankLogos>
          <BankLogo color="#ff8c42">Express</BankLogo>
          <BankLogo color="#2d5a27">BAI</BankLogo>
          <BankLogo color="#1e88e5">BFA</BankLogo>
          <BankLogo color="#d32f2f">BancAtlântico</BankLogo>
        </BankLogos>

        <ConfirmButton>
          <Button
            bgColor="primary"
            textColor="#FFFFFF"
            text="Escolher aplicativo"
            hasBorder={false}
            onClick={handleSelectApp}
          />
        </ConfirmButton>

        {/* Toast de confirmação */}
        <ToastContainer show={showToast}>{toastMessage}</ToastContainer>
      </Container>

      <AlertModal
        isOpen={showAlert}
        title="Atenção!"
        message={`O seu pagamento através da referência 383 283 932 1 foi validado com sucesso! `}
        confirmText="Confirmar"
        cancelText="Cancelar"
        onConfirm={handleConfirmNavigation}
        onCancel={handleCancelAlert}
        onClose={handleCancelAlert}
      />
    </BgVectors>
  );
}
