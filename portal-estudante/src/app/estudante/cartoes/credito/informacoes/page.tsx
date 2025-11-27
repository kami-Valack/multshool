"use client";

import styled from "styled-components";
import Header from "@/components/ui/HeaderGeneral";
import CreditCard from "@/components/ui/Cards";
import BottomMenu from "@/components/ui/BottomMenu";
import { useAuth } from "@/contexts/AuthContext";

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

const InfoSection = styled.div`
  width: 80%;
  background:  ${(props) => props.theme.colors.background_3};
  border-radius: 16px;
  padding: 24px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
`;

const InfoLabel = styled.span`
  font-size: 14px;
  color: #9b9ba5;
  font-weight: 400;
`;

const InfoValue = styled.span<{ $color?: string }>`
  font-size: 14px;
  color:  ${(props) => props.theme.colors.primary};
  font-weight:  ${(props) => props.theme.fonts.weight.semibold};
  text-align: right;
`;

export default function InformacoesCard() {
  const { user } = useAuth();
  
  // Dados do cartão - alguns podem vir da API no futuro
  const cardInfo = {
    tipoConta: "Estudante",
    numeroConta: "043 345 160 219", // TODO: Buscar da API quando disponível
    titular: user?.name || "N/A",
    referencia: "124 839 399 1", // TODO: Buscar da API quando disponível
    resumoConsumo: "450.000,00 kz", // TODO: Buscar da API quando disponível
    estado: "Disponível"
  };

  return (
    <>
      <Header variant="withBack" title="Informações" />

      <Container>
        <CardS>
          <CreditCard />
        </CardS>

        <InfoSection>
          <InfoRow>
            <InfoLabel>Tipo de Conta</InfoLabel>
            <InfoValue>{cardInfo.tipoConta}</InfoValue>
          </InfoRow>

          <InfoRow>
            <InfoLabel>Número de Conta</InfoLabel>
            <InfoValue>{cardInfo.numeroConta}</InfoValue>
          </InfoRow>

          <InfoRow>
            <InfoLabel>Titular</InfoLabel>
            <InfoValue>{cardInfo.titular}</InfoValue>
          </InfoRow>

          <InfoRow>
            <InfoLabel>Referência</InfoLabel>
            <InfoValue>{cardInfo.referencia}</InfoValue>
          </InfoRow>

          <InfoRow>
            <InfoLabel>Resumo Consumo</InfoLabel>
            <InfoValue>{cardInfo.resumoConsumo}</InfoValue>
          </InfoRow>

          <InfoRow>
            <InfoLabel>Estado</InfoLabel>
            <InfoValue $color="#4caf50">{cardInfo.estado}</InfoValue>
          </InfoRow>
        </InfoSection>

        <BottomMenu />
      </Container>
    </>
  );
}
