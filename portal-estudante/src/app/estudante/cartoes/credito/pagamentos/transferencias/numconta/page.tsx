"use client";
import { useState } from "react";
import styled from "styled-components";
import Header from "@/components/ui/HeaderGeneral";
import BottomMenu from "@/components/ui/BottomMenu";
import Button from "@/components/ui/Button";
import { useNavigation } from "@/hooks/navigation";
import UserAvatar from "@/components/ui/Avatar";

const Top = styled.div`
  background: ${(props) => props.theme.colors.background_3};
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  font-family: ${(props) => props.theme.fonts.family.poppins};
  width: 100%;
  max-width: 400px;
  background: ${(props) => props.theme.colors.background_3};
`;

const Content = styled.div`
  width: 95%;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 0 90px 0;
`;

const StepTitle = styled.h2`
  font-size: 20px;
  font-weight: ${(props) => props.theme.fonts.weight.semibold};
  color: ${(props) => props.theme.colors.textBlack};
  margin-bottom: 5px;
  text-align: left;
  width: 100%;
`;

const StepSubtitle = styled.p`
  font-size: 14px;
  color: #999;
  margin-bottom: 50px;
  text-align: left;
  width: 100%;
`;

const InputGroup = styled.div`
  width: 100%;
  margin-bottom: 20px;
`;

const Label = styled.label`
  font-size: 14px;
  color: #666;
  margin-bottom: 8px;
  display: block;
  padding-left: 5px;
`;

const Input = styled.input`
  width: 95%;
  height: 55px;
  background: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 30px;
  padding: 0 0 0 17px;
  font-size: 15px;
  color: #333;

  &::placeholder {
    color: #ccc;
  }

  &:focus {
    border-color: ${(props) => props.theme.colors.primary};
    outline: none;
  }
`;

const ButtonGroup = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 30px;
  padding-top: 0px;
`;

const LinkButton = styled.button`
  background: none;
  border: none;
  color: #666;
  font-size: 14px;
  text-decoration: underline;
  cursor: pointer;
  padding: 10px;
  font-family: ${(props) => props.theme.fonts.family.poppins};
`;

const ErrorMessage = styled.p`
  color: #f44336;
  font-size: 13px;
  margin-top: 5px;
  padding-left: 5px;
  width: 100%;
  text-align: left;
`;

const BalanceCard = styled.div`
  width: 85%;
  background: #ffffff;
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
  position: relative;
`;

const BalanceLabel = styled.p`
  font-size: 14px;
  color: #999;
  margin-bottom: 5px;
`;

const BalanceAmount = styled.p<{ negative?: boolean }>`
  font-size: 32px;
  font-weight: ${(props) => props.theme.fonts.weight.semibold};
  color: ${(props) =>
    props.negative ? "#f44336" : props.theme.colors.primary};
  margin-bottom: 30px;
`;

const ConfirmationCard = styled.div`
  width: 90%;
  background: #ffffff;
  border-radius: 20px;
  padding: 5px 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  margin-bottom: 10px;
`;

const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
  border-bottom: 1px solid #f0f0f0;

  &:last-child {
    border-bottom: none;
  }
`;

const DetailLabel = styled.span`
  font-size: 14px;
  color: #999;
`;

const DetailValue = styled.span`
  font-size: 14px;
  color: #333;
  font-weight: ${(props) => props.theme.fonts.weight.semibold};
  text-align: right;

  &.amount {
    color: #4caf50;
    font-size: 16px;
    font-weight: ${(props) => props.theme.fonts.weight.semibold};
  }
`;

const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-bottom: 25px;
`;

const ProfileName = styled.h3`
  margin-top: 10px;
  font-size: 18px;
  color: ${(props) => props.theme.colors.textBlack};
  font-weight: ${(props) => props.theme.fonts.weight.semibold};
`;

interface RecipientData {
  name: string;
  cardNumber: string;
  profileImage: string | null;
}

export default function PaymentQRScreen() {
  const { navigateTo } = useNavigation();
  const [step, setStep] = useState(1);
  const [cardNumber, setCardNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [recipientData, setRecipientData] = useState<RecipientData | null>(
    null
  );

  const initialBalance = 50000; // 50.000 Kz

  // ✅ PARSER ROBUSTO - REMOVE TUDO QUE NÃO É DÍGITO
  function parseAmountToNumber(value: string): number {
    const digits = value.replace(/\D/g, "");
    if (!digits) return 0;
    return parseInt(digits, 10) / 100;
  }

  function formatCurrencyInput(value: string) {
    const clean = value.replace(/\D/g, "");
    if (!clean) return "";
    return (parseInt(clean, 10) / 100).toLocaleString("pt-AO", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  const parsedAmount = parseAmountToNumber(amount);
  const currentBalance = initialBalance - parsedAmount;

  const formattedBalance = currentBalance.toLocaleString("pt-AO", {
    minimumFractionDigits: 2,
  });

  const handleContinueStep1 = () => {
    if (!cardNumber.trim()) {
      setErrorMessage("Por favor, insira o número do cartão");
      return;
    }

    setRecipientData({
      name: "Manuel Teodoro de Jesus",
      cardNumber,
      profileImage: null,
    });

    setErrorMessage("");
    setStep(2);
  };

  const handleContinueStep2 = () => {
    if (!amount.trim()) {
      setErrorMessage("Por favor, insira o montante a transferir");
      return;
    }

    if (parsedAmount > initialBalance) {
      setErrorMessage("Saldo insuficiente");
      return;
    }

    setErrorMessage("");
    setStep(3);
  };

  const handleConfirm = () => {
    if (!recipientData) return;

    const transferData = {
      recipientName: recipientData.name,
      recipientCard: recipientData.cardNumber,
      amount,
      date: new Date().toLocaleString("pt-AO", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
      transferType: "Intrabancária",
    };

    const proofId = Date.now().toString();
    localStorage.setItem(
      `transfer-proof-${proofId}`,
      JSON.stringify(transferData)
    );

    navigateTo(
      `/estudante/cartoes/credito/pagamentos/transferencias/${proofId}`
    );
  };

  return (
    <>
      <Top>
        <Header variant="withBack" title="Transferências" />
      </Top>
      <Container>
        <Content>
          {step === 1 && (
            <>
              <StepTitle>
                Insira o número do cartão multischool do destinatário
              </StepTitle>
              <StepSubtitle>Certifica-te de verificar o número</StepSubtitle>

              <InputGroup>
                <Label>Número do cartão</Label>
                <Input
                  type="text"
                  value={cardNumber}
                  placeholder="Insira o número"
                  onChange={(e) => {
                    setCardNumber(e.target.value);
                    setErrorMessage("");
                  }}
                />
                {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
              </InputGroup>

              <ButtonGroup>
                <Button
                  text="Continuar"
                  bgColor="primary"
                  textColor="#fff"
                  onClick={handleContinueStep1}
                />
              </ButtonGroup>
            </>
          )}

          {step === 2 && recipientData && (
            <>
              <BalanceCard>
                <UserAvatar />
                <BalanceLabel>Saldo disponível:</BalanceLabel>
                <BalanceAmount negative={parsedAmount > initialBalance}>
                  {formattedBalance} kz
                </BalanceAmount>
              </BalanceCard>

              <InputGroup style={{ marginBottom: 0 }}>
                <Label>Montante a transferir</Label>
                <Input
                  type="text"
                  value={amount}
                  placeholder="Insira o valor a transferir"
                  onChange={(e) => {
                    const formatted = formatCurrencyInput(e.target.value);
                    setAmount(formatted);

                    if (parseAmountToNumber(formatted) > initialBalance) {
                      setErrorMessage("Saldo insuficiente");
                    } else {
                      setErrorMessage("");
                    }
                  }}
                />
                {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
              </InputGroup>

              <ButtonGroup style={{ marginBottom: 40 }}>
                <Button
                  text="Continuar"
                  bgColor="primary"
                  textColor="#fff"
                  onClick={handleContinueStep2}
                />
              </ButtonGroup>
            </>
          )}

          {step === 3 && recipientData && (
            <>
              <ProfileHeader>
                <UserAvatar />
                <ProfileName>{recipientData.name}</ProfileName>
              </ProfileHeader>

              <ConfirmationCard>
                <DetailRow>
                  <DetailLabel>Número do cartão</DetailLabel>
                  <DetailValue>{recipientData.cardNumber}</DetailValue>
                </DetailRow>

                <DetailRow>
                  <DetailLabel>Tipo de transferência</DetailLabel>
                  <DetailValue>Intrabancária</DetailValue>
                </DetailRow>

                <DetailRow>
                  <DetailLabel>Montante</DetailLabel>
                  <DetailValue className="amount">{amount} kz</DetailValue>
                </DetailRow>

                <DetailRow>
                  <DetailLabel>Saldo após transf.</DetailLabel>
                  <DetailValue>
                    {currentBalance.toLocaleString("pt-AO", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}{" "}
                    kz
                  </DetailValue>
                </DetailRow>

                <DetailRow>
                  <DetailLabel>Data da transferência</DetailLabel>
                  <DetailValue>
                    {new Date().toLocaleString("pt-AO", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                    })}
                  </DetailValue>
                </DetailRow>
              </ConfirmationCard>

              <ButtonGroup style={{ marginBottom: 40 }}>
                <Button
                  bgColor="primary"
                  textColor="#FFFFFF"
                  text="Confirmar"
                  hasBorder={false}
                  onClick={handleConfirm}
                />
              </ButtonGroup>
            </>
          )}
        </Content>
      </Container>
      <BottomMenu />
    </>
  );
}
