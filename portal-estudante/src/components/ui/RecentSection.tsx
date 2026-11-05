"use client";

import styled from "styled-components";
import Money from "@/assets/icons/Money.png";
import Pause from "@/assets/icons/pause.png";
import Image from "next/image";
import { theme } from "@/styles/theme";

export type SectionType = "recentes" | "pendencias" | "movimentos";
export type CardType = "credit" | "student";

interface RecentItem {
  title: string;
  date: string;
  amount?: string;
  isPositive?: boolean;
  status?: string;
  statusColor?: string;
}

interface RecentSectionProps {
  variant?: SectionType;
  activeCard?: CardType;
  showHeader?: boolean;
  title?: string;
  items?: RecentItem[];
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

export default function RecentSection({
  variant = "recentes",
  activeCard: _activeCard = "credit",
  showHeader = true,
  title,
  items,
}: RecentSectionProps) {
  const isRecentes = variant === "recentes";
  const isMovimentos = variant === "movimentos";
  const data = items || [];

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
        {data.length === 0 && (
          <TransactionDate style={{ padding: 16 }}>Ainda não há dados</TransactionDate>
        )}
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
