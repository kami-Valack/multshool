"use client";
import { useState, useEffect } from "react";
import styled from "styled-components";
import Header from "@/components/ui/HeaderGeneral";
import BottomMenu from "@/components/ui/BottomMenu";
import Image from "next/image";
import Logotipo from "@/assets/single-logo.png";
import { useNavigation } from "@/hooks/navigation";
import Button from "@/components/ui/Button";
import { useAuth } from "@/contexts/AuthContext";
import { getFirstAndLastName } from "@/utils/cutName";

// Mock de dados dos bancos
const banksMock = [
  { id: 1, name: "Express", color: "#ff8c42" },
  { id: 2, name: "BAI", color: "#2d5a27" },
  { id: 3, name: "BFA", color: "#1e88e5" },
  { id: 4, name: "Atlântico", color: "#d32f2f" },
];

// Mock de referência ativa (simula dados da base de dados)
// Se hasActiveReference for true, o usuário já tem uma referência ativa
const activeReferenceMock = {
  hasActiveReference: true, // Mude para false para testar sem referência ativa
  entity: "00140",
  reference: "941 767 307 1",
  amount: "15.000",
  expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 horas a partir de agora
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 110vh;
  font-family: ${(props) => props.theme.fonts.family.poppins};
  width: 100%;
  padding-top: 30px;
  background: ${(props) => props.theme.colors.background || "#fff"};
`;

const Top = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
`;

const LogoWrapper = styled.div`
  margin-bottom: 15px;
`;

const UserName = styled.p`
  font-size: 16px;
  color: ${(props) => props.theme.colors.textBlack};
  font-weight: ${(props) => props.theme.fonts.weight.semibold};
`;

const AmountDisplay = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  margin: 10px 0 40px 0;
  gap: 10px;
`;

const Currency = styled.span`
  font-size: 18px;
  color: ${(props) => props.theme.colors.primary};
  font-weight: ${(props) => props.theme.fonts.weight.semibold || 600};
  margin-top: 5px;
`;

const Amount = styled.div`
  font-size: 48px;
  color: ${(props) => props.theme.colors.textBlack};
  font-weight: ${(props) => props.theme.fonts.weight.regular || 400};
  letter-spacing: 2px;
`;

const Keypad = styled.div`
  width: 90%;
  max-width: 400px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  padding: 0;
  margin-top: 10px;
  justify-items: center;
`;

const KeyButton = styled.button`
  width: 100%;
  display: flex;
  aspect-ratio: 1/1;
  height: auto;
  align-items: center;
  justify-content: center;
  max-width: 70px;
  max-height: 70px;

  background: transparent;
  border: none;
  font-size: 22px;
  color: ${(props) => props.theme.colors.textBlack};
  font-weight: ${(props) => props.theme.fonts.weight.semibold};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  border-radius: 50%;

  &:active {
    transform: scale(0.95);
  }
`;

const DeleteButton = styled(KeyButton)`
  color: ${(props) => props.theme.colors.primary};
  border: 1px solid ${(props) => props.theme.colors.primary};
`;

const ConfirmKeyButton = styled(KeyButton)<{ disabled?: boolean }>`
  background: ${(props) =>
    props.disabled ? "#ccc" : props.theme.colors.primary};
  color: white;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  opacity: ${(props) => (props.disabled ? 0.6 : 1)};

  &:active {
    transform: ${(props) => (props.disabled ? "none" : "scale(0.95)")};
  }
`;

// Estilos para a Segunda Etapa
const FormContainer = styled.div`
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SummaryBox = styled.div`
  background: ${(props) => props.theme.colors.background || "#f8f8f8"};
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 24px;
  text-align: center;
`;

const SummaryLabel = styled.div`
  font-size: 14px;
  color: ${(props) => props.theme.colors.textBlack};
  margin-bottom: 8px;
`;

const SummaryAmount = styled.div`
  font-size: 32px;
  color: ${(props) => props.theme.colors.primary};
  font-weight: ${(props) => props.theme.fonts.weight.semibold};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

const ButtonGroup = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 30px 0 -90px 0;
`;

// Estilos para a Terceira Etapa
const PaymentReferenceCard = styled.div`
  background: ${(props) => props.theme.colors.background_2};
  border-radius: 16px;
  padding: 24px 20px;
  margin-bottom: 30px;
  width: 85%;
  max-width: 400px;
`;

const ReferenceField = styled.div`
  margin-bottom: 24px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const ReferenceLabel = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2px;
`;

const FieldLabel = styled.span`
  font-size: 13px;
  color: ${(props) => props.theme.colors.primary};
  font-weight: ${(props) => props.theme.fonts.weight.semibold};
`;

const CopyIcon = styled.button`
  background: none;
  border: none;
  padding: 4px;
  cursor: pointer;
  font-size: 20px;

  &:active {
    transform: scale(0.95);
  }
`;

const ReferenceValue = styled.div`
  font-size: 18px;
  font-weight: ${(props) => props.theme.fonts.weight.semibold};
  color: ${(props) => props.theme.colors.textBlack};
`;

const InstructionText = styled.p`
  font-size: 12px;
  color: ${(props) => props.theme.colors.foreground || "#666"};
  text-align: center;
  line-height: 1.5;
  margin: 20px 0;
  width: 90%;
  max-width: 400px;
`;

const ColorText = styled.span`
  color: ${(props) => props.theme.colors.primary};
  font-weight: ${(props) => props.theme.fonts.weight.semibold};
`;

const CountdownTimer = styled.div`
  text-align: center;
  font-size: 24px;
  font-weight: ${(props) => props.theme.fonts.weight.semibold};
  color: ${(props) => props.theme.colors.primary};
  margin: 10px 0 20px 0;
`;

const BankLogos = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  margin: 30px 0;
  width: 90%;
  max-width: 400px;
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
  font-size: 11px;
  text-align: center;
  cursor: pointer;
  transition: transform 0.2s;
  padding: 5px;

  &:active {
    transform: scale(0.95);
  }
`;

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

const InstitutionCard = styled.div`
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 30px;
  display: flex;
  align-items: center;
  gap: 16px;
  width: 90%;
  max-width: 400px;
`;

const InstitutionImage = styled.div`
  width: 90px;
  height: 80px;
  border-radius: 12px;
  background: ${(props) => props.theme.colors.primary};
  border: 3px solid ${(props) => props.theme.colors.primary};
  overflow: hidden;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
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

const ButtonWrapper = styled.div`
  width: 90%;
  max-width: 400px;
  margin-top: 20px;
  margin-bottom: 90px;
`;

const ErrorMessage = styled.div`
  color: #d32f2f;
  font-size: 14px;
  text-align: center;
  margin-top: 10px;
  font-weight: ${(props) => props.theme.fonts.weight.semibold};
`;

export default function PaymentQRScreen() {
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [amount, setAmount] = useState("0");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [timeRemaining, setTimeRemaining] = useState("");
  const [referenceData, setReferenceData] = useState(activeReferenceMock);
  const { navigateTo } = useNavigation();

  // Verifica se há referência ativa ao carregar o componente
  useEffect(() => {
    if (referenceData.hasActiveReference) {
      setStep(3);
      setAmount(referenceData.amount);
    }
  }, []);

  // Countdown timer
  useEffect(() => {
    if (step === 3 && referenceData.expiresAt) {
      const timer = setInterval(() => {
        const now = new Date().getTime();
        const expiry = new Date(referenceData.expiresAt).getTime();
        const distance = expiry - now;

        if (distance < 0) {
          setTimeRemaining("Expirado");
          clearInterval(timer);
        } else {
          const hours = Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          );
          const minutes = Math.floor(
            (distance % (1000 * 60 * 60)) / (1000 * 60)
          );
          const seconds = Math.floor((distance % (1000 * 60)) / 1000);

          setTimeRemaining(
            `${hours.toString().padStart(2, "0")}:${minutes
              .toString()
              .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
          );
        }
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [step, referenceData.expiresAt]);

  const handleNumberClick = (num: string) => {
    if (amount === "0") {
      setAmount(num);
    } else {
      const cleanAmount = amount.replace(/\./g, "");
      const newAmount = cleanAmount + num;
      setAmount(formatAmount(newAmount));
    }
  };

  const handleDelete = () => {
    if (amount.length <= 1) {
      setAmount("0");
    } else {
      const cleanAmount = amount.replace(/\./g, "");
      const newAmount = cleanAmount.slice(0, -1);
      setAmount(newAmount ? formatAmount(newAmount) : "0");
    }
  };

  const formatAmount = (value: string): string => {
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const getNumericAmount = (value: string): number => {
    return parseInt(value.replace(/\./g, ""), 10);
  };

  const handleGoToStep2 = () => {
    const numericAmount = getNumericAmount(amount);
    if (numericAmount < 200) {
      setToastMessage("Valor mínimo de recarga é 200 kz");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
      return;
    }
    setStep(2);
  };

  const handleGoToStep3 = () => {
    // Aqui você faria uma chamada à API para gerar a referência
    // Por enquanto, vamos simular com dados mockados
    const newReference = {
      hasActiveReference: true,
      entity: "00140",
      reference: `${Math.floor(
        Math.random() * 900000000 + 100000000
      )} ${Math.floor(Math.random() * 9 + 1)}`,
      amount: amount,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    };
    setReferenceData(newReference);
    setStep(3);
  };

  const handleBackToStep1 = () => {
    setStep(1);
  };

  const handleBackToStep2 = () => {
    setStep(2);
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setToastMessage(`${label} copiado!`);
    setShowToast(true);

    setTimeout(() => {
      setShowToast(false);
    }, 2000);
  };

  const handleShareApp = async () => {
    const shareData = {
      title: "Pagamento Multischool",
      text: `Entidade: ${referenceData.entity}\nReferência: ${referenceData.reference}\nValor: ${amount} kz`,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback: copiar para clipboard
        const textToCopy = `Entidade: ${referenceData.entity}\nReferência: ${referenceData.reference}\nValor: ${amount} kz`;
        await navigator.clipboard.writeText(textToCopy);
        setToastMessage("Dados copiados!");
        setShowToast(true);
        setTimeout(() => setShowToast(false), 2000);
      }
    } catch (err) {
      console.log("Erro ao compartilhar:", err);
    }
  };

  const isAmountValid = getNumericAmount(amount) >= 200;

  return (
    <>
      <Header variant="withBack" title="Recarregar Carteira" />
      <Container>
        {step === 1 ? (
          <>
            <Top>
              <LogoWrapper>
                <Image
                  src={Logotipo.src}
                  width={140}
                  height={20}
                  alt="Multischool"
                />
              </LogoWrapper>
              <UserName>{user ? getFirstAndLastName(user.name) : "Estudante"}</UserName>
            </Top>

            <AmountDisplay>
              <Currency>kz</Currency>
              <Amount>{amount}</Amount>
            </AmountDisplay>

            {!isAmountValid && amount !== "0" && (
              <ErrorMessage>Valor mínimo: 200 kz</ErrorMessage>
            )}

            <Keypad>
              <KeyButton onClick={() => handleNumberClick("1")}>1</KeyButton>
              <KeyButton onClick={() => handleNumberClick("2")}>2</KeyButton>
              <KeyButton onClick={() => handleNumberClick("3")}>3</KeyButton>

              <KeyButton onClick={() => handleNumberClick("4")}>4</KeyButton>
              <KeyButton onClick={() => handleNumberClick("5")}>5</KeyButton>
              <KeyButton onClick={() => handleNumberClick("6")}>6</KeyButton>

              <KeyButton onClick={() => handleNumberClick("7")}>7</KeyButton>
              <KeyButton onClick={() => handleNumberClick("8")}>8</KeyButton>
              <KeyButton onClick={() => handleNumberClick("9")}>9</KeyButton>

              <ConfirmKeyButton
                onClick={handleGoToStep2}
                disabled={!isAmountValid}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="#FFFfff"
                    d="M21 7L9 19l-5.5-5.5l1.41-1.41L9 16.17L19.59 5.59L21 7Z"
                  />
                </svg>
              </ConfirmKeyButton>
              <KeyButton onClick={() => handleNumberClick("0")}>0</KeyButton>
              <DeleteButton onClick={handleDelete}>×</DeleteButton>
            </Keypad>
          </>
        ) : step === 2 ? (
          <>
            <Top>
              <LogoWrapper>
                <Image
                  src={Logotipo.src}
                  width={140}
                  height={20}
                  alt="Multischool"
                />
              </LogoWrapper>
              <UserName>{user ? getFirstAndLastName(user.name) : "Estudante"}</UserName>
            </Top>

            <FormContainer>
              <SummaryBox>
                <SummaryLabel>Valor a Recarregar</SummaryLabel>
                <SummaryAmount>
                  <span style={{ fontSize: "20px" }}>kz</span>
                  {amount}
                </SummaryAmount>
              </SummaryBox>
              <ButtonGroup>
                <Button
                  bgColor="primary"
                  textColor="#FFFFFF"
                  text="Continuar"
                  hasBorder={true}
                  onClick={handleGoToStep3}
                />
              </ButtonGroup>
            </FormContainer>
          </>
        ) : (
          <>
            

            <InstitutionCard>
              <InstitutionImage>🎓</InstitutionImage>
              <InstitutionInfo>
                <InstitutionName>Multischool Angola, (SA)</InstitutionName>
                <InstitutionAddress>Kinaxixi, Luanda</InstitutionAddress>
              </InstitutionInfo>
            </InstitutionCard>

            <PaymentReferenceCard>
              <ReferenceField>
                <ReferenceLabel>
                  <FieldLabel>Entidade</FieldLabel>
                  <CopyIcon
                    onClick={() =>
                      copyToClipboard(referenceData.entity, "Entidade")
                    }
                  >
                    <svg
                      width="20"
                      height="20"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="#a8a8a8"
                        d="M19 3h-4.18C14.4 1.84 13.3 1 12 1s-2.4.84-2.82 2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2m-7 0a1 1 0 0 1 1 1a1 1 0 0 1-1 1a1 1 0 0 1-1-1a1 1 0 0 1 1-1M7 7h10V5h2v14H5V5h2z"
                      />
                    </svg>
                  </CopyIcon>
                </ReferenceLabel>
                <ReferenceValue>{referenceData.entity}</ReferenceValue>
              </ReferenceField>

              <ReferenceField>
                <ReferenceLabel>
                  <FieldLabel>Referência</FieldLabel>
                  <CopyIcon
                    onClick={() =>
                      copyToClipboard(referenceData.reference, "Referência")
                    }
                  >
                    <svg
                      width="20"
                      height="20"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="#a8a8a8"
                        d="M19 3h-4.18C14.4 1.84 13.3 1 12 1s-2.4.84-2.82 2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2m-7 0a1 1 0 0 1 1 1a1 1 0 0 1-1 1a1 1 0 0 1-1-1a1 1 0 0 1 1-1M7 7h10V5h2v14H5V5h2z"
                      />
                    </svg>
                  </CopyIcon>
                </ReferenceLabel>
                <ReferenceValue>{referenceData.reference}</ReferenceValue>
              </ReferenceField>

              <ReferenceField>
                <ReferenceLabel>
                  <FieldLabel>Valor</FieldLabel>
                </ReferenceLabel>
                <ReferenceValue>{referenceData.amount},00 kz</ReferenceValue>
              </ReferenceField>
            </PaymentReferenceCard>

            <InstructionText>
              <ColorText>Esta referência é válida por 24 horas. </ColorText>
              Utilize o Multicaixa Express ou outra aplicação de internet
              banking para efectuar o pagamento.
            </InstructionText>

            {timeRemaining && (
              <CountdownTimer>
                {timeRemaining === "Expirado" ? "⏰ Expirado" : timeRemaining}
              </CountdownTimer>
            )}

            <BankLogos>
              {banksMock.map((bank) => (
                <BankLogo key={bank.id} color={bank.color}>
                  {bank.name}
                </BankLogo>
              ))}
            </BankLogos>

            <ButtonWrapper>
              <Button
                bgColor="primary"
                textColor="#FFFFFF"
                text="Escolher aplicativo"
                hasBorder={true}
                onClick={handleShareApp}
              />
            </ButtonWrapper>

            <ToastContainer show={showToast}>{toastMessage}</ToastContainer>
          </>
        )}
      </Container>
      {/* <BottomMenu /> */}
    </>
  );
}
