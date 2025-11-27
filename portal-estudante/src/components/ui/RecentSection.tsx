"use client";

import styled from "styled-components";
import Money from "@/assets/icons/Money.png";
import Pause from "@/assets/icons/pause.png";
import Image from "next/image";
import { theme } from "@/styles/theme";

export type SectionType = "recentes" | "pendencias" | "movimentos";
export type CardType = "credit" | "student";

interface RecentSectionProps {
  variant?: SectionType;
  activeCard?: CardType;
  showHeader?: boolean;
  title?: string;
}

const Section = styled.div`
  background: white;
  border-radius: 20px;
  padding: 0;
  overflow: hidden;
  background-color: ${(props) => props.theme.colors.primary_light_100};
  margin-bottom: 40px;
`;

const SectionHeader = styled.div<{ $isMovimentos?: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${(props) =>
    props.$isMovimentos ? "16px 20px" : "20px 20px 15px"};
  background: transparent;
  border-bottom: ${(props) =>
    props.$isMovimentos ? "1px solid #e9ecef" : "none"};
`;

const SectionTitle = styled.h3<{ $isMovimentos?: boolean }>`
  font-size: 13px;
  font-weight: 500;
  color: ${(props) => (props.$isMovimentos ? theme.colors.primary : "#333")};
  margin: 0;
`;

const ViewMore = styled.button`
  background: none;
  border: none;
  color: ${(props) => props.theme.colors.primary};
  font-size: 14px;
  font-weight: ${(props) => props.theme.fonts.weight.semibold};
  font-family: ${(props) => props.theme.fonts.family.poppins};
`;

const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const TransactionList = styled.div<{ $isMovimentos?: boolean }>`
  padding: 0 20px 20px;
  max-height: ${(props) => (props.$isMovimentos ? "calc(4 * 64px)" : "none")};
  overflow-y: ${(props) => (props.$isMovimentos ? "auto" : "visible")};
`;

const TransactionItem = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 12px 0;
  border-bottom: 1px solid #f0f0f0;

  &:last-child {
    border-bottom: none;
  }
`;

const TransactionIcon = styled.div`
  width: 40px;
  height: 40px;
  background: ${(props) => props.theme.colors.background};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #9a7fb8;
  font-size: 18px;
`;

const TransactionInfo = styled.div`
  flex: 1;
`;

const TransactionTitle = styled.div`
  font-size: 14px;
  font-weight: ${(props) => props.theme.fonts.weight.regular};
  color: #333;
  margin-bottom: 2px;
`;

const TransactionDate = styled.div`
  font-size: 12px;
  color: #999;
`;

const TransactionAmount = styled.div<{ $isPositive?: boolean }>`
  font-size: 14px;
  font-weight: ${(props) => props.theme.fonts.weight.regular};
  color: ${(props) => (props.$isPositive ? "#4CAF50" : "#FF5252")};
`;

const TransactionStatus = styled.div<{ $statusColor?: string }>`
  font-size: 14px;
  font-weight: ${(props) => props.theme.fonts.weight.regular};
  color: ${(props) => {
    switch (props.$statusColor) {
      case "success":
        return "#4CAF50";
      case "warning":
        return "#FF9800";
      case "error":
        return "#FF5252";
      default:
        return "#999";
    }
  }};
`;

// Dados
const creditRecentesData = [
  { title: "Propina Junho", date: "06.06.2024", amount: "-54.600,50 kz", isPositive: false },
  { title: "Propina Julho", date: "05.07.2024", amount: "-54.600,50 kz", isPositive: false },
  { title: "Bônus plataforma", date: "06.06.2024", amount: "+10.900,50 kz", isPositive: true },
  { title: "Pag. Estágio", date: "06.06.2024", amount: "+45.600,50 kz", isPositive: true },
  { title: "Propina Maio", date: "01.05.2024", amount: "-54.600,50 kz", isPositive: false },
];

const creditPendenciasData = [
  { title: "Crédito bancário", date: "Externo", status: "200.000,00 kz", statusColor: "warning" },
  { title: "Declaração C/ Notas", date: "Irregularidade", status: "0 kz", statusColor: "success" },
  { title: "Solicitação de adiamento...", date: "Secretaria", status: "Rejeitada", statusColor: "error" },
  { title: "Declaração C/ Notas", date: "Secretaria", status: "Irregularidade", statusColor: "error" },
  { title: "Candidatura Bolsa", date: "Externo", status: "Em falta", statusColor: "warning" },
];

const movimentosData = [...creditRecentesData, ...creditRecentesData];

const studentRecentesData = [
  { title: "Biblioteca", date: "05.07.2024 às 12:45:50", amount: "há 1h", isPositive: true },
  { title: "Refeitório", date: "05.07.2024 às 10:10:05", amount: "há 2h", isPositive: true },
  { title: "LABPRO P2-01", date: "05.07.2024 às 09:05:07", amount: "há 4h", isPositive: true },
];

const studentPendenciasData = [
  { title: "Recurso - Estrutura de dados", date: "Secretaria", status: "Pendente", statusColor: "warning" },
  { title: "Entrega de TCC", date: "Coordenação", status: "Em atraso", statusColor: "error" },
];

export default function RecentSection({
  variant = "recentes",
  activeCard = "credit",
  showHeader = true,
  title,
}: RecentSectionProps) {
  const isRecentes = variant === "recentes";
  const isMovimentos = variant === "movimentos";
  const isStudentCard = activeCard === "student";

  let data;
  if (isMovimentos) data = movimentosData;
  else if (isRecentes) data = isStudentCard ? studentRecentesData : creditRecentesData;
  else data = isStudentCard ? studentPendenciasData : creditPendenciasData;

  const sectionTitle = title || (isMovimentos ? "Movimentos" : isRecentes ? "Recentes" : "Pendências");
  const icon = isRecentes || isMovimentos ? Money : Pause;

  return (
    <Section>
      {showHeader && (
        <SectionHeader $isMovimentos={isMovimentos}>
          {isMovimentos ? (
            <HeaderRow>
              <SectionTitle $isMovimentos>Descrição</SectionTitle>
              <SectionTitle $isMovimentos>Montante</SectionTitle>
            </HeaderRow>
          ) : (
            <>
              <SectionTitle>{sectionTitle}</SectionTitle>
              <ViewMore>Ver mais</ViewMore>
            </>
          )}
        </SectionHeader>
      )}

      <TransactionList $isMovimentos={isMovimentos}>
        {data.map((item, index) => (
          <TransactionItem key={index}>
            <TransactionIcon>
              <Image src={icon} alt="Icon" width={20} height={20} />
            </TransactionIcon>

            <TransactionInfo>
              <TransactionTitle>{item.title}</TransactionTitle>
              <TransactionDate>{item.date}</TransactionDate>
            </TransactionInfo>

            {isRecentes || isMovimentos ? (
              <TransactionAmount $isPositive={(item as any).isPositive}>
                {(item as any).amount}
              </TransactionAmount>
            ) : (
              <TransactionStatus $statusColor={(item as any).statusColor}>
                {(item as any).status}
              </TransactionStatus>
            )}
          </TransactionItem>
        ))}
      </TransactionList>
    </Section>
  );
}
