"use client";
import { useState } from "react";
import styled from "styled-components";
import UserAvatar from "@/components/ui/Avatar";
import Header from "@/components/ui/HeaderGeneral";
import { useNavigation } from "@/hooks/navigation";
import { SimpleCard } from "@/components/ActivityCard";
import BottomMenu from "@/components/ui/BottomMenu";

// Styled Components
const Container = styled.div`
  width: 100%;
  min-height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: ${(props) => props.theme.fonts.family.poppins};
  margin-bottom: 150px;
  background-color: ${(props) => props.theme.colors.background};
`;

const Top = styled.div`
  width: 100%;
`;

const Content = styled.div`
  width: 95%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const CreditCard = styled.div`
  background: white;
  border-radius: 20px;
  padding: 30px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  position: relative;
`;

const ProfileImage = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const CreditLabel = styled.p`
  font-size: 14px;
  color: #666;
  margin-bottom: 8px;
`;

const CreditAmount = styled.h1`
  font-size: 30px;
  font-weight: 600;
  color: ${(props) => props.theme.colors.textBlack};
  margin: 0 0 5px 0;
`;

const LastCreditInfo = styled.p`
  font-size: 12px;
  color: ${(props) => props.theme.colors.primary};
  text-align: center;
  margin-bottom: 24px;
`;

const Bold = styled.p`
  font-weight: ${(props) => props.theme.fonts.weight.semibold};
`;

const InfoRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
`;

const InfoLabel = styled.span`
  font-size: 14px;
  color: #333;
  font-weight: 500;
`;

const InfoValue = styled.span`
  font-size: 14px;
  color: #666;
`;

const OptionsCard = styled.div`
  background: white;
  border-radius: 20px;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  cursor: pointer;

  &:hover {
    background: #f9f9f9;
  }
`;

const OptionsContent = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const IconWrapper = styled.div`
  background: #f0f0f0;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px;
`;

const OptionsText = styled.div`
  display: flex;
  flex-direction: column;
`;

const OptionsTitle = styled.h3`
  font-size: 15px;
  font-weight: 600;
  color: #000;
  margin: 0 0 4px 0;
`;

const OptionsSubtitle = styled.p`
  font-size: 12px;
  color: #999;
  margin: 0;
`;

const SectionTitle = styled.h2`
  font-size: 16px;
  font-weight: 600;
  color: #000;
  margin: 24px 0 0px 0;
`;

const CreditsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

// Modal Styles
const ModalOverlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: ${(props) => (props.isOpen ? "flex" : "none")};
  align-items: flex-end;
  z-index: 99999999;
  animation: fadeIn 0.3s ease;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const ModalContent = styled.div<{ isOpen: boolean }>`
  background: white;
  width: 100%;
  border-radius: 24px 24px 0 0;
  padding: 24px;
  max-height: 80vh;
  overflow-y: auto;
  animation: slideUp 0.3s ease;

  @keyframes slideUp {
    from {
      transform: translateY(100%);
    }
    to {
      transform: translateY(0);
    }
  }
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const ModalTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #000;
  margin: 0;
`;

const CloseButton = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #f5f5f5;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    background: #e5e5e5;
  }
`;

const ModalInfoSection = styled.div`
  background: #f9f9f9;
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 16px;
`;

const ModalInfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #e5e5e5;

  &:last-child {
    border-bottom: none;
  }
`;

const ModalInfoLabel = styled.span`
  font-size: 14px;
  color: #666;
  font-weight: 500;
`;

const ModalInfoValue = styled.span`
  font-size: 14px;
  color: #000;
  font-weight: 600;
  max-width: 150px; /* ajusta ao layout */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;
  text-align: right;
`;

const StatusBadgeModal = styled.span<{ status: string }>`
  font-size: 12px;
  font-weight: 600;
  padding: 6px 12px;
  border-radius: 8px;
  ${(props) => {
    switch (props.status) {
      case "confirmado":
        return "color: #22c55e; background: #f0fdf4;";
      case "expirado":
        return "color: #f97316; background: #fff7ed;";
      case "inadimplente":
        return "color: #ef4444; background: #fef2f2;";
      case "pendente":
        return "color: #eab308; background: #fefce8;";
      default:
        return "color: #666; background: #f5f5f5;";
    }
  }}
`;

// Tipos
interface CreditData {
  id: string;
  title: string;
  date: string;
  status: "confirmado" | "expirado" | "inadimplente" | "pendente";
  amount: string;
  deadline: string;
  institution: string;
  interestRate: string;
  totalWithInterest: string;
}

// FUNÇÃO PARA ENCURTAR O NOME DO BANCO (UTILS/PROBABLY)
const formatInstitutionName = (name: string) => {
  if (name.length <= 20) return name;

  const ignoreWords = ["de", "da", "do", "das", "dos", "e"];

  const words = name
    .split(" ")
    .filter((word) => !ignoreWords.includes(word.toLowerCase()));

  const initials = words.map((word) => word[0]).join("");

  return initials.toUpperCase();
};

// 1. Converter "15.000,00 kz" para número
const parseAmount = (value: string) => {
  return Number(value.replace(/\./g, "").replace(",", ".").replace(" kz", ""));
};

// 2. Somar todos os créditos mockados
const getTotalCredits = (credits: CreditData[]) => {
  return credits.reduce((acc, credit) => acc + parseAmount(credit.amount), 0);
};

// 3. Formatar número → "15.000,00 kz"
const formatKz = (value: number) => {
  return (
    value.toLocaleString("pt-AO", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }) + " kz"
  );
};

export default function PagamentoDetalhe() {
  const { navigateTo } = useNavigation();
  const [selectedCredit, setSelectedCredit] = useState<CreditData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  //Dados mockados
  const creditsData: CreditData[] = [
    {
      id: "1",
      title: "Kwik Pagamentos Instantâneos",
      date: "01.05.2024",
      status: "confirmado",
      amount: "15.000,00 kz",
      deadline: "15 de Junho de 2024",
      institution: "Kwik Pagamentos Instantâneos",
      interestRate: "5%",
      totalWithInterest: "15.750,00 kz",
    },
    {
      id: "2",
      title: "Kwik Pagamentos Instantâneos",
      date: "15.04.2024",
      status: "expirado",
      amount: "10.000,00 kz",
      deadline: "15 de Maio de 2024",
      institution: "Kwik Pagamentos Instantâneos",
      interestRate: "5%",
      totalWithInterest: "10.500,00 kz",
    },
    {
      id: "3",
      title: "Banco BFA",
      date: "20.03.2024",
      status: "inadimplente",
      amount: "25.000,00 kz",
      deadline: "20 de Abril de 2024",
      institution: "Banco de Fomento Angola",
      interestRate: "8%",
      totalWithInterest: "27.000,00 kz",
    },
    {
      id: "4",
      title: "Banco BAI S.A",
      date: "10.03.2024",
      status: "pendente",
      amount: "20.000,00 kz",
      deadline: "10 de Abril de 2024",
      institution: "Banco Angolano de Investimentos",
      interestRate: "6%",
      totalWithInterest: "21.200,00 kz",
    },
  ];

  const totalCredits = getTotalCredits(creditsData);
  
  // Último crédito feito (mock)
  const lastCredit = {
    date: "2024-08-22T10:44:50",
    amount: "20.000,00 kz",
    deadline: "17 de Setembro de 2024",
  };

  const handleCreditClick = (credit: CreditData) => {
    setSelectedCredit(credit);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedCredit(null), 300);
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "confirmado":
        return "Confirmado";
      case "expirado":
        return "Expirado";
      case "inadimplente":
        return "Inadimplente";
      case "pendente":
        return "Pendente";
      default:
        return status;
    }
  };

  // Mapeia o estado para os aceites pelo SimpleCard
  const mapStatusToCardStatus = (status: CreditData["status"]) => {
    const statusMap = {
      confirmado: "pendente" as const,
      expirado: "em_atraso" as const,
      inadimplente: "inadimplente" as const,
      pendente: "pendente" as const,
    };
    return statusMap[status];
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);

    return (
      date.toLocaleDateString("pt-AO", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }) +
      " às " +
      date.toLocaleTimeString("pt-AO", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })
    );
  };

  return (
    <Container>
      <Top>
        <Header variant="withBack" title="Créditos" />
      </Top>

      <Content>
        <CreditCard>
          <ProfileImage>
            <UserAvatar />
          </ProfileImage>

          <CreditLabel>Valor total de créditos:</CreditLabel>
          <CreditAmount>{formatKz(totalCredits)}</CreditAmount>

          <LastCreditInfo>
            Último crédito feito em: <b>{formatDate(lastCredit.date)}</b>
          </LastCreditInfo>

          <InfoRow>
            <InfoLabel>Prazo</InfoLabel>
            <InfoValue>{lastCredit.deadline}</InfoValue>
          </InfoRow>

          <InfoRow>
            <InfoLabel>Valor</InfoLabel>
            <InfoValue>{lastCredit.amount}</InfoValue>
          </InfoRow>

          <InfoRow>
            <InfoLabel>Total de créditos</InfoLabel>
            <InfoValue>{creditsData.length}</InfoValue>
          </InfoRow>
        </CreditCard>

        <OptionsCard>
          <OptionsContent>
            <IconWrapper>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#6C5F8D"
                  d="M20 8H4V6h16m0 12H4v-6h16m0-8H4c-1.11 0-2 .89-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Z"
                />
              </svg>
            </IconWrapper>
            <OptionsText
              onClick={() => {
                navigateTo(`/estudante/cartoes/credito/creditosms/credores`);
              }}
            >
              <OptionsTitle>Ver opções de credores</OptionsTitle>
              <OptionsSubtitle>
                Explore instituições disponíveis para oferecer créditos
              </OptionsSubtitle>
            </OptionsText>
          </OptionsContent>
        </OptionsCard>

        <SectionTitle>Últimos créditos</SectionTitle>

        {/* <TabContainer>
          <Tab active>Créditos recentes</Tab>
          <Tab>Estado</Tab>
        </TabContainer> */}

        <CreditsList>
          {creditsData.map((credit) => (
            <SimpleCard
              key={credit.id}
              title={credit.title}
              status={mapStatusToCardStatus(credit.status)}
              amount={credit.date}
              onClick={() => handleCreditClick(credit)}
            />
          ))}
        </CreditsList>
      </Content>

      {/* Modal de Detalhes */}
      <ModalOverlay isOpen={isModalOpen} onClick={closeModal}>
        <ModalContent isOpen={isModalOpen} onClick={(e) => e.stopPropagation()}>
          <ModalHeader>
            <ModalTitle>Detalhes do Crédito</ModalTitle>
            <CloseButton onClick={closeModal}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M18 6L6 18M6 6l12 12"
                  stroke="#666"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </CloseButton>
          </ModalHeader>

          {selectedCredit && (
            <>
              <ModalInfoSection>
                <ModalInfoRow>
                  <ModalInfoLabel>Instituição</ModalInfoLabel>
                  <ModalInfoValue>
                    {formatInstitutionName(selectedCredit.institution)}
                  </ModalInfoValue>
                </ModalInfoRow>
                <ModalInfoRow>
                  <ModalInfoLabel>Data de Solicitação</ModalInfoLabel>
                  <ModalInfoValue>{selectedCredit.date}</ModalInfoValue>
                </ModalInfoRow>
                <ModalInfoRow>
                  <ModalInfoLabel>Valor do Crédito</ModalInfoLabel>
                  <ModalInfoValue>{selectedCredit.amount}</ModalInfoValue>
                </ModalInfoRow>
                <ModalInfoRow>
                  <ModalInfoLabel>Taxa de Juros</ModalInfoLabel>
                  <ModalInfoValue>{selectedCredit.interestRate}</ModalInfoValue>
                </ModalInfoRow>
                <ModalInfoRow>
                  <ModalInfoLabel>Total com Juros</ModalInfoLabel>
                  <ModalInfoValue>
                    {selectedCredit.totalWithInterest}
                  </ModalInfoValue>
                </ModalInfoRow>
                <ModalInfoRow>
                  <ModalInfoLabel>Prazo de Pagamento</ModalInfoLabel>
                  <ModalInfoValue>{selectedCredit.deadline}</ModalInfoValue>
                </ModalInfoRow>
                <ModalInfoRow>
                  <ModalInfoLabel>Estado</ModalInfoLabel>
                  <StatusBadgeModal status={selectedCredit.status}>
                    {getStatusLabel(selectedCredit.status)}
                  </StatusBadgeModal>
                </ModalInfoRow>
              </ModalInfoSection>
            </>
          )}
        </ModalContent>
      </ModalOverlay>

      <BottomMenu />
    </Container>
  );
}
