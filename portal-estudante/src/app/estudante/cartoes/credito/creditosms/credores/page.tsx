"use client";

import React, { useState } from "react";
import styled from "styled-components";
import Header from "@/components/ui/HeaderGeneral";
import BottomMenu from "@/components/ui/BottomMenu";
import { useNavigation } from "@/hooks/navigation";
import ListCredit, { Credor } from "@/components/ui/ListCredit";
import Button from "@/components/ui/Button";
import { useAuth } from "@/contexts/AuthContext";

// Styled Components - Step 1
const Container = styled.div`
  width: 100%;
  min-height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: ${(props) => props.theme.fonts.family.poppins};
  margin-bottom: 150px;
`;

const Top = styled.div`
  width: 100%;
`;

const TopTitle = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0;
  margin: 0 0 20px 0;
`;

const Title = styled.p`
  font-size: 14px;
  color: ${(props) => props.theme.colors.foreground};
`;

const SaldoValue = styled.div`
  font-size: 30px;
  color: ${(props) => props.theme.colors.textBlack};
  font-weight: ${(props) => props.theme.fonts.weight.semibold};
`;

// Styled Components - Step 2
const PageContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background: ${(props) => props.theme.colors.background_3};
  font-family: ${(props) => props.theme.fonts.family.poppins};
`;

const Content = styled.div`
  padding: 24px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 150px;
`;

const LogoContainer = styled.div<{ $cor?: string }>`
  width: 80px;
  height: 80px;
  background: ${(props) => props.$cor || "#5b4b7c"};
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
  overflow: hidden;
`;

const LogoImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const LogoText = styled.div`
  color: white;
  font-size: 32px;
  font-weight: 700;
`;

const ServiceTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #333;
  margin: 0 0 32px 0;
  text-align: center;
`;

const InfoCard = styled.div`
  width: 95%;
  background: white;
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const InfoLabel = styled.span`
  font-size: 14px;
  color: #666;
`;

const InfoValue = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: #333;

  &.highlight {
    color: #2e7d32;
    font-size: 16px;
  }
`;

const SectionTitle = styled.h3`
  font-size: 17px;
  font-weight: 600;
  color: #333;
  margin: 10px 0 24px 0;
  width: 100%;
`;

const SectionTitle2 = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin: 0 0 24px 0;
  width: 100%;
  text-align: center;
`;

const SliderContainer = styled.div`
  width: 95%;
  background: white;
  border-radius: 16px;
  padding: 24px 20px;
  margin-bottom: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
`;

const SliderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 14px;
`;

const SliderLabel = styled.span`
  font-size: 14px;
  color: #333;
  font-weight: 500;
`;

const SliderValue = styled.div`
  background: #f5f5f7;
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  color: #333;
`;

const SliderTrack = styled.div`
  position: relative;
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
`;

const SliderRail = styled.div`
  width: 100%;
  height: 6px;
  background: #e0e0e0;
  border-radius: 3px;
  position: relative;
`;

const SliderFill = styled.div<{ percentage: number }>`
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: ${(props) => props.percentage}%;
  background: #5b4b7c;
  border-radius: 3px;
`;

const SliderThumb = styled.div<{ percentage: number }>`
  position: absolute;
  left: ${(props) => props.percentage}%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 24px;
  height: 24px;
  background: #5b4b7c;
  border: 4px solid white;
  border-radius: 50%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  z-index: 1;
`;

const SliderInput = styled.input`
  position: absolute;
  width: 100%;
  height: 40px;
  opacity: 0;
  cursor: pointer;
  z-index: 3;
  margin: 0;
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin: 30px 0 110px 0;
`;

const ConfirmButton = styled.button`
  width: 100%;
  background: #5b4b7c;
  color: white;
  border: none;
  padding: 16px;
  border-radius: 16px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: #4a3a6b;
  }

  &:active {
    transform: scale(0.98);
  }
`;

const EditButton = styled.button`
  width: 100%;
  background: white;
  color: #5b4b7c;
  border: 2px solid #5b4b7c;
  padding: 16px;
  border-radius: 16px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #f5f3f8;
  }

  &:active {
    transform: scale(0.98);
  }
`;

// Step 3 - Confirmação
const ConfirmCard = styled.div`
  width: 90%;
  background: white;
  border: 2px solid #5b4b7c;
  border-radius: 20px;
  padding: 24px;
  margin-bottom: 24px;
`;

const ConfirmHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #f0f0f0;
`;

const ConfirmLogo = styled.div<{ $cor?: string }>`
  width: 30px;
  height: 30px;
  background: ${(props) => props.$cor || "#5b4b7c"};
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  flex-shrink: 0;
`;

const ConfirmInfo = styled.div`
  flex: 1;
`;

const ConfirmTitle = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: #333;
  margin-bottom: 4px;
`;

const ConfirmSubtitle = styled.div`
  font-size: 11px;
  color: #666;
`;

const ConfirmValue = styled.div`
  font-size: 14px;
  font-weight: 700;
  color: #2e7d32;
`;

const ConfirmDate = styled.div`
  font-size: 12px;
  color: #999;
  margin-top: 4px;
`;

const AccountInfo = styled.div`
  background: #f8f8f8;
  border-radius: 12px;
  padding: 10px;
`;

const AccountLabel = styled.div`
  font-size: 12px;
  color: #666;
  margin-bottom: 8px;
`;

const AccountName = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #333;
`;

// Step 4 - Sucesso
const SuccessContainer = styled.div`
  padding: 40px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-bottom: 150px;
`;

const SuccessIcon = styled.div`
  width: 120px;
  height: 120px;
  background: linear-gradient(135deg, #e8d5ff 0%, #f0e8ff 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
  position: relative;
`;

const CardIllustration = styled.div`
  transform: rotate(-15deg);
  font-size: 60px;
`;

const SuccessTitle = styled.h2`
  font-size: 28px;
  font-weight: 700;
  color: #333;
  margin: 0 0 16px 0;
`;

const SuccessMessage = styled.p`
  font-size: 16px;
  color: #666;
  line-height: 1.6;
  max-width: 320px;
  margin: 0 0 40px 0;
`;

const OkButton = styled.button`
  width: 100%;
  max-width: 400px;
  background: #5b4b7c;
  color: white;
  border: none;
  padding: 16px;
  border-radius: 16px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s ease;
  margin: 30px;

  &:active {
    transform: scale(0.98);
  }
`;

// Dados mockados
const credoresMock: Credor[] = [
  {
    id: "1",
    nome: "Banco Sol",
    valorMaximo: "AKZ 20.000",
    logo: "https://www.bancosol.ao/hubfs/Novo%20Projeto%20(21).jpg",
    cor: "#FFE8E8",
  },
  {
    id: "2",
    nome: "BAI",
    valorMaximo: "AKZ 50.000",
    logo: "https://www.scoe.co/wp-content/uploads/2017/02/BAI.png",
    cor: "#E8F0FF",
  },
  {
    id: "3",
    nome: "Atlântico",
    valorMaximo: "AKZ 35.500",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8TFVY9dSJv4PPdu8e81W1YLIcpO4PKvcXnA&s",
    cor: "#E8FFF0",
  },
];

// Dados mockados
const getCredorDetails = (credorId: string, userName: string = "Estudante", studentId: string = "") => {
  const details: Record<string, any> = {
    "1": {
      entidade: "00041",
      tipoCredito: "Estudantil",
      conta: `${userName} ${studentId} - ISPTEC, Multischool`,
    },
    "2": {
      entidade: "00042",
      tipoCredito: "Pessoal",
      conta: `${userName} ${studentId} - BAI Directo`,
    },
    "3": {
      entidade: "00043",
      tipoCredito: "Empresarial",
      conta: `${userName} ${studentId} - Atlântico Business`,
    },
  };
  return details[credorId] || details["1"];
};

export default function PagamentoDetalhe() {
  const { user } = useAuth();
  const { navigateTo } = useNavigation();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedCredor, setSelectedCredor] = useState<Credor | null>(null);
  const [montante, setMontante] = useState(10000);
  const [prazo, setPrazo] = useState(2);

  const credorDetails = selectedCredor
    ? getCredorDetails(selectedCredor.id, user?.name || "Estudante", user?.student_id || "")
    : null;

  const maxMontante = selectedCredor
    ? parseInt(selectedCredor.valorMaximo.replace(/[^\d]/g, ""))
    : 30000;
  const maxPrazo = 12;

  const montantePercentage = (montante / maxMontante) * 100;
  const prazoPercentage = (prazo / maxPrazo) * 100;

  const currentDate = new Date().toLocaleDateString("pt-AO", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });

  const handleCredorSelect = (credor: Credor) => {
    setSelectedCredor(credor);
    setCurrentStep(2);
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleMontanteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMontante(Number(e.target.value));
  };

  const handlePrazoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrazo(Number(e.target.value));
  };

  const handleContinue = () => {
    setCurrentStep(3);
  };

  const handleEdit = () => {
    setCurrentStep(2);
  };

  const handleConfirm = () => {
    setCurrentStep(4);
  };

  const handleFinish = () => {
    navigateTo(`/estudante/cartoes/credito/`);
    setCurrentStep(1);
    setSelectedCredor(null);
    setMontante(10000);
    setPrazo(2);
  };

  // Step 1 - Lista de Credores
  if (currentStep === 1) {
    return (
      <>
        <Container>
          <Top>
            <Header variant="withBack" title="Credores" />
          </Top>

          <TopTitle>
            <Title>O seu saldo actual:</Title>
            <SaldoValue>50.000 kz</SaldoValue>
          </TopTitle>

          <ListCredit
            credores={credoresMock}
            labelSelecione="Escolha um credor"
            labelValorMaximo="Limite disponível"
            onCredorSelect={handleCredorSelect}
          />
          <BottomMenu />
        </Container>
      </>
    );
  }

  // Step 2 - Detalhes do Crédito
  if (currentStep === 2 && selectedCredor) {
    return (
      <PageContainer>
        <Top>
          <Header variant="withBack" title="Pagamentos" />
        </Top>

        <Content>
          <LogoContainer $cor={selectedCredor.cor}>
            <LogoImage src={selectedCredor.logo} alt={selectedCredor.nome} />
          </LogoContainer>

          <ServiceTitle>
            {selectedCredor.nome} - Pagamentos Instantâneos
          </ServiceTitle>

          <InfoCard>
            <InfoRow>
              <InfoLabel>Entidade nº</InfoLabel>
              <InfoValue>{credorDetails?.entidade}</InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoLabel>Tipo de crédito</InfoLabel>
              <InfoValue>{credorDetails?.tipoCredito}</InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoLabel>Valor máximo</InfoLabel>
              <InfoValue className="highlight">
                {selectedCredor.valorMaximo}
              </InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoLabel>Data do pedido</InfoLabel>
              <InfoValue>{currentDate}</InfoValue>
            </InfoRow>
          </InfoCard>

          <SectionTitle>Detalhes do crédito</SectionTitle>

          <SliderContainer>
            <SliderHeader>
              <SliderLabel>Montante</SliderLabel>
              <SliderValue>{montante.toLocaleString("pt-AO")} kz</SliderValue>
            </SliderHeader>
            <SliderTrack>
              <SliderRail>
                <SliderFill percentage={montantePercentage} />
              </SliderRail>
              <SliderThumb percentage={montantePercentage} />
              <SliderInput
                type="range"
                min="0"
                max={maxMontante}
                step="1000"
                value={montante}
                onChange={handleMontanteChange}
              />
            </SliderTrack>

            <SliderHeader style={{ marginTop: "32px" }}>
              <SliderLabel>Prazo</SliderLabel>
              <SliderValue>
                {prazo} {prazo === 1 ? "mês" : "meses"}
              </SliderValue>
            </SliderHeader>
            <SliderTrack>
              <SliderRail>
                <SliderFill percentage={prazoPercentage} />
              </SliderRail>
              <SliderThumb percentage={prazoPercentage} />
              <SliderInput
                type="range"
                min="1"
                max={maxPrazo}
                step="1"
                value={prazo}
                onChange={handlePrazoChange}
              />
            </SliderTrack>
          </SliderContainer>
          <ButtonContainer>
            <Button
              bgColor="primary"
              textColor="#FFFFFF"
              text="Continuar"
              hasBorder={true}
              onClick={handleContinue}
            />
          </ButtonContainer>
        </Content>

        <BottomMenu />
      </PageContainer>
    );
  }

  // Step 3 - Confirmação
  if (currentStep === 3 && selectedCredor) {
    return (
      <PageContainer>
        <Top>
          <Header variant="withBack" title="Confirmar" />
        </Top>

        <Content>
          <SectionTitle2>Detalhes do crédito</SectionTitle2>

          <ConfirmCard>
            <ConfirmHeader>
              <ConfirmLogo $cor={selectedCredor.cor}>
                <LogoImage
                  src={selectedCredor.logo}
                  alt={selectedCredor.nome}
                />
              </ConfirmLogo>
              <ConfirmInfo>
                <ConfirmTitle>
                  {selectedCredor.nome} Pagamentos instantâneos
                </ConfirmTitle>
                <ConfirmSubtitle>{credorDetails?.entidade}</ConfirmSubtitle>
              </ConfirmInfo>
              <ConfirmValue>
                {montante.toLocaleString("pt-AO")},00 kz
                <ConfirmDate>{currentDate}</ConfirmDate>
              </ConfirmValue>
            </ConfirmHeader>

            <AccountLabel>Conta</AccountLabel>
            <AccountInfo>
              <AccountName>{credorDetails?.conta}</AccountName>
            </AccountInfo>
          </ConfirmCard>
          <ButtonContainer>
            <ConfirmButton onClick={handleConfirm}>Confirmar</ConfirmButton>
            <EditButton onClick={handleEdit}>Editar</EditButton>
          </ButtonContainer>
        </Content>

        <BottomMenu />
      </PageContainer>
    );
  }

  // Step 4 - Sucesso
  if (currentStep === 4 && selectedCredor) {
    return (
      <PageContainer>
        <Top>
          <Header variant="withBack" title="Sucesso!" />
        </Top>

        <SuccessContainer>
          <SuccessIcon>
            <CardIllustration>💳</CardIllustration>
          </SuccessIcon>

          <SuccessTitle>Pedido enviado!!</SuccessTitle>

          <SuccessMessage>
            O seu pedido de crédito foi enviado com sucesso. Irá receber uma
            notificação com a resposta dentro de 24H.
          </SuccessMessage>

          <OkButton onClick={handleFinish}>Boa!</OkButton>
        </SuccessContainer>

        <BottomMenu />
      </PageContainer>
    );
  }

  return null;
}
