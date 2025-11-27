"use client";
import { useState } from "react";
import styled from "styled-components";
import UserAvatar from "@/components/ui/Avatar";
import Header from "@/components/ui/HeaderGeneral";
import { useNavigation } from "@/hooks/navigation";
import { TransferCard } from "@/components/ActivityCard";
import BottomMenu from "@/components/ui/BottomMenu";
import Button from "@/components/ui/Button";
import { useToast } from "@/hooks/useToast";

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
  overflow-x: hidden;
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
  color: ${(props) => props.theme.colors.primary};
  margin: 0 0 5px 0;
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
`;

const ModalContent = styled.div<{ isOpen: boolean }>`
  background: white;
  width: 100%;
  border-radius: 24px 24px 0 0;
  padding: 24px;
  max-height: 80vh;
  overflow-y: auto;
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
  max-width: 150px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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
      case "pendente":
        return "color: #eab308; background: #fefce8;";
      case "falhado":
        return "color: #ef4444; background: #fef2f2;";
      default:
        return "color: #666; background: #f5f5f5;";
    }
  }}
`;

const ButtonGroup = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 30px;
`;

// Tipos
interface TransferData {
  id: string;
  beneficiary: string;
  accountNumber: string;
  date: string;
  status: "confirmado" | "pendente" | "falhado";
  amount: string;
  type: "instantânea" | "normal";
}

// Mock Dados
const transferData: TransferData[] = [
  {
    id: "1",
    beneficiary: "Maria João",
    accountNumber: "AO06 0040 0000 1234 5678 9012",
    date: "2024-10-25T14:22:10",
    status: "confirmado",
    amount: "15.000,00 kz",
    type: "instantânea",
  },
  {
    id: "2",
    beneficiary: "João Pedro",
    accountNumber: "AO06 0030 0000 9876 5432 1010",
    date: "2024-10-22T09:10:54",
    status: "pendente",
    amount: "7.500,00 kz",
    type: "normal",
  },
  {
    id: "3",
    beneficiary: "Empresa XPTO Serviços",
    accountNumber: "AO06 0010 0000 2222 3333 4444",
    date: "2024-10-20T19:05:32",
    status: "falhado",
    amount: "25.000,00 kz",
    type: "instantânea",
  },
];

export default function PagamentoDetalhe() {
  const { navigateTo } = useNavigation();
  const [selectedTransfer, setSelectedTransfer] = useState<TransferData | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { showToast, ToastElement } = useToast();

  const handleTransferClick = (t: TransferData) => {
    setSelectedTransfer(t);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedTransfer(null), 300);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    showToast("IBAN copiado ✅");
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "confirmado":
        return "Confirmada";
      case "pendente":
        return "Pendente";
      case "falhado":
        return "Falhada";
      default:
        return status;
    }
  };

  const formatCardDate = (dateString: string) => {
    const d = new Date(dateString);
    return d.toLocaleDateString("pt-AO").replace(/\//g, ".");
  };

  return (
    <Container>
      <Top>
        <Header variant="withBack" title="Transferências" />
      </Top>

      <Content>
        <CreditCard>
          <ProfileImage>
            <UserAvatar />
          </ProfileImage>

          <CreditLabel>Saldo disponível:</CreditLabel>
          <CreditAmount>50.000,00 kz</CreditAmount>
        </CreditCard>

        <SectionTitle>Últimas transferências</SectionTitle>

        <CreditsList>
          {transferData.map((t) => (
            <TransferCard
              key={t.id}
              name={t.beneficiary}
              date={formatCardDate(t.date)}
              amount={t.status === "falhado" ? `-${t.amount}` : `+${t.amount}`}
              onClick={() => handleTransferClick(t)}
            />
          ))}
        </CreditsList>
      </Content>

      {/* Modal */}
      <ModalOverlay isOpen={isModalOpen} onClick={closeModal}>
        <ModalContent isOpen={isModalOpen} onClick={(e) => e.stopPropagation()}>
          <ModalHeader>
            <ModalTitle>Detalhes da Transferência</ModalTitle>
            <CloseButton onClick={closeModal}>✕</CloseButton>
          </ModalHeader>

          {selectedTransfer && (
            <ModalInfoSection>
              <ModalInfoRow>
                <ModalInfoLabel>Beneficiário</ModalInfoLabel>
                <ModalInfoValue>{selectedTransfer.beneficiary}</ModalInfoValue>
              </ModalInfoRow>

              <ModalInfoRow>
                <ModalInfoLabel>Nº da Conta / IBAN</ModalInfoLabel>
                <ModalInfoValue
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                    copyToClipboard(selectedTransfer.accountNumber)
                  }
                  title="Clique para copiar"
                >
                  {selectedTransfer.accountNumber.slice(0, 10) + " ..."}
                </ModalInfoValue>
              </ModalInfoRow>

              <ModalInfoRow>
                <ModalInfoLabel>Data e Hora</ModalInfoLabel>
                <ModalInfoValue>
                  {formatCardDate(selectedTransfer.date)}
                </ModalInfoValue>
              </ModalInfoRow>

              <ModalInfoRow>
                <ModalInfoLabel>Valor Enviado</ModalInfoLabel>
                <ModalInfoValue>{selectedTransfer.amount}</ModalInfoValue>
              </ModalInfoRow>

              <ModalInfoRow>
                <ModalInfoLabel>Tipo</ModalInfoLabel>
                <ModalInfoValue>{selectedTransfer.type}</ModalInfoValue>
              </ModalInfoRow>

              <ModalInfoRow>
                <ModalInfoLabel>Estado</ModalInfoLabel>
                <StatusBadgeModal status={selectedTransfer.status}>
                  {getStatusLabel(selectedTransfer.status)}
                </StatusBadgeModal>
              </ModalInfoRow>
            </ModalInfoSection>
          )}
          {ToastElement}
        </ModalContent>
      </ModalOverlay>

      <ButtonGroup>
        <Button
          bgColor="primary"
          textColor="#FFFFFF"
          text="Transferência via QR code"
          hasBorder={true}
          onClick={() => {
            navigateTo(`transferencias/qrcode`);
          }}
        />
        <Button
          bgColor="#FFFFFF"
          textColor="#897BB0"
          text="Inserir manualmente"
          hasBorder={true}
          onClick={() => {
            navigateTo(`/estudante/cartoes/credito/pagamentos/method/qrcode`);
          }}
        />
      </ButtonGroup>

      <BottomMenu />
    </Container>
  );
}
