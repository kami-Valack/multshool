"use client";

import React from "react";
import styled from "styled-components";

// ============================================================
// 1) ACTIVITY CARD (ORIGINAL)
// ============================================================
interface ActivityCardProps {
  title: string;
  institution: string;
  status: "pendente" | "em_curso" | "concluido" | "vencida" | "publicada";
  date: string;
  avatar?: string;
  onClick: () => void;
}

const CardContainer = styled.div`
  display: flex;
  align-items: center;
  background: white;
  border-radius: 20px;
  padding: 10px 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid ${(props) => props.theme.colors.primary};
`;

const AvatarContainer = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: linear-gradient(135deg, #c5a4db, #8b5cf6);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 16px;
  flex-shrink: 0;
  overflow: hidden;
`;

const AvatarImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
`;

const AvatarFallback = styled.div`
  color: white;
  font-weight: 600;
  font-size: 16px;
  font-family: ${(props) => props.theme.fonts.family.poppins};
`;

const ContentContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
`;

const Title = styled.h3`
  font-size: 13px;
  font-weight: ${(props) => props.theme.fonts.weight.regular};
  color: ${(props) => props.theme.colors.textBlack};
  margin: 0 0 4px 0;
  font-family: ${(props) => props.theme.fonts.family.poppins};
`;

const InstitutionContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Institution = styled.span`
  font-size: 13px;
  color: #666;
  font-family: ${(props) => props.theme.fonts.family.poppins};
`;

const StatusBadge = styled.span<{ status: string }>`
  font-size: 11px;
  font-weight: 500;
  padding: 2px 8px;
  border-radius: 12px;
  font-family: ${(props) => props.theme.fonts.family.poppins};

  ${({ status }) => {
    switch (status) {
      case "pendente":
        return `background: #fef3c7;color: #d97706;`;
      case "em_curso":
        return `background: #dcfce7;color: #16a34a;`;
      case "concluido":
        return `background: #e0e7ff;color: #4f46e5;`;
      case "publicada":
        return `background: #dcfce7;color: #16a34a;`;
      default:
        return `background: #f3f4f6;color: #6b7280;`;
    }
  }}
`;

const DateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-left: 12px;
`;

const DateText = styled.span<{ status: string }>`
  font-size: 12px;
  font-weight: 600;
  font-family: ${(props) => props.theme.fonts.family.poppins};

  ${({ status }) => {
    switch (status) {
      case "em_atraso":
        return `color: #ef4444;`;
      case "pagamento_adiado":
        return `color: #00C3D0;`;
      case "pendente":
        return `color: #f59e0b;`;
      case "inadimplente":
        return `color: #dc2626;`;
      case "publicada":
        return `color: #16a34a;`;
      case "em_revisao":
        return `color: #3b82f6;`;
      default:
        return `color: #6b7280;`;
    }
  }}
`;


const getStatusText = (status: string) => {
  switch (status) {
    case "pendente":
      return "Pendente";
    case "em_curso":
      return "Em curso";
    case "concluido":
      return "Concluído";
    case "publicada":
      return "Publicada";
    default:
      return "Pendente";
  }
};

const getInitials = (title: string) =>
  title
    .split(" ")
    .map((w) => w[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

export const ActivityCard = ({
  title,
  institution,
  status,
  date,
  avatar,
  onClick,
}: ActivityCardProps) => (
  <CardContainer onClick={onClick}>
    <AvatarContainer>
      {avatar ? <AvatarImage src={avatar} /> : <AvatarFallback>{getInitials(title)}</AvatarFallback>}
    </AvatarContainer>
    <ContentContainer>
      <Title>{title}</Title>
      <InstitutionContainer>
        <Institution>{institution}</Institution>
        <span style={{ color: "#d1d5db" }}>-</span>
        <StatusBadge status={status}>{getStatusText(status)}</StatusBadge>
      </InstitutionContainer>
    </ContentContainer>
    <DateContainer>
      <DateText status={status}>{date}</DateText>
    </DateContainer>
  </CardContainer>
);

// ============================================================
// 2) SIMPLE CARD (ATUALIZADO: SUPORTA NOTAS)
// ============================================================
interface SimpleCardProps {
  title: string;
  status: "em_atraso" | "pagamento_adiado" | "pendente" | "inadimplente" | "publicada" | "em_revisao";
  amount?: string;
  avatar?: string;
  onClick: () => void;
}

const SimpleCardContainer = styled.div`
  display: flex;
  align-items: center;
  background: white;
  border-radius: 16px;
  padding: 9px 16px;
  border: 1px solid ${(props) => props.theme.colors.primary};
  cursor: pointer;
  transition: 0.2s;
`;

const SimpleTitle = styled.h3`
  font-size: 14px;
  margin: 0 0 4px 0;
  font-family: ${(props) => props.theme.fonts.family.poppins};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: ${(props) => props.theme.fonts.weight.regular};
`;

const NoteText = styled.span<{ grade: number }>`
  font-size: 12px;
  font-weight: 600;
  font-family: ${(props) => props.theme.fonts.family.poppins};
  color: ${({ grade }) => (grade < 10 ? "#ef4444" : "#22c55e")}; // vermelho <10, verde >=10
`;


const SimpleStatus = styled.span<{ status: string }>`
  font-size: 12px;
  font-weight: 400;
  font-family: ${(props) => props.theme.fonts.family.poppins};

  ${({ status }) => {
    switch (status) {
      case "em_atraso":
        return `color: #ef4444;`;
      case "pagamento_adiado":
        return `color: #00C3D0;`;
      case "pendente":
        return `color: #f59e0b;`;
      case "inadimplente":
        return `color: #dc2626;`;
      case "publicada":
        return `color: #16a34a;`; // verde como já estava antes
      case "em_revisao":
        return `color: #3b82f6;`; // azul para revisão
      default:
        return `color: #6b7280;`;
    }
  }}
`;

const getSimpleStatusText = (status: string) => {
  switch (status) {
    case "em_atraso":
      return "Em atraso";
    case "pagamento_adiado":
      return "Pagamento adiado";
    case "pendente":
      return "Pendente";
    case "inadimplente":
      return "Inadimplente";
    case "publicada":
      return "Publicada";
    case "em_revisao":
      return "Em revisão";
    default:
      return "Pendente";
  }
};

export const SimpleCard = ({ title, status, amount, avatar, onClick }: SimpleCardProps) => (
  <SimpleCardContainer onClick={onClick}>
    <AvatarContainer>
      {avatar ? <AvatarImage src={avatar} /> : <AvatarFallback>{getInitials(title)}</AvatarFallback>}
    </AvatarContainer>

    <ContentContainer>
      <SimpleTitle>{title}</SimpleTitle>
      <SimpleStatus status={status}>{getSimpleStatusText(status)}</SimpleStatus>
    </ContentContainer>

    {amount && (
  <DateContainer>
    <NoteText grade={parseFloat(amount.replace(",", "."))}>
      {amount}
    </NoteText>
  </DateContainer>
)}

  </SimpleCardContainer>
);

// ============================================================
// 3) PAYMENT CARD
// ============================================================
// (sem alterações — permanece igual)
// ------------------------------------------------------------


// TERCEIRA VARIANTE - PaymentCard (para confirmação de pagamento)
interface PaymentCardProps {
  title: string;
  date: string;
  amount: string;
  icon?: React.ReactNode;
  onClick?: () => void;
}

const PaymentCardContainer = styled.div`
  display: flex;
  align-items: center;
  border-radius: 16px;
  padding: 16px;
`;

const IconContainer = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 24px;
  background: ${(props) => props.theme.colors.background};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 16px;
  flex-shrink: 0;

  svg {
    width: 22px;
    height: 22px;
    color: ${(props) => props.theme.colors.primary};
  }
`;

const PaymentContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
`;

const PaymentTitle = styled.h3`
  font-size: 14px;
  font-weight: ${(props) => props.theme.fonts.weight.regular};
  color: ${(props) => props.theme.colors.textBlack};
  margin: 0 0 2px 0;
  font-family: ${(props) => props.theme.fonts.family.poppins};
`;

const PaymentDate = styled.span`
  font-size: 12px;
  color: ${(props) => props.theme.colors.foreground};
  font-family: ${(props) => props.theme.fonts.family.poppins};
`;

const PaymentAmount = styled.div`
  font-size: 13px;
  font-weight: ${(props) => props.theme.fonts.weight.semibold};
  color: ${(props) => props.theme.colors.primary};
  font-family: ${(props) => props.theme.fonts.family.poppins};
  margin-left: 12px;
  white-space: nowrap;
`;

export const PaymentCard: React.FC<PaymentCardProps> = ({
  title,
  date,
  amount,
  icon,
  onClick,
}) => {
  const defaultIcon = (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <line x1="2" y1="10" x2="22" y2="10" />
    </svg>
  );

  return (
    <PaymentCardContainer onClick={onClick}>
      <IconContainer>{icon || defaultIcon}</IconContainer>

      <PaymentContent>
        <PaymentTitle>{title}</PaymentTitle>
        <PaymentDate>{date}</PaymentDate>
      </PaymentContent>

      <PaymentAmount>{amount}</PaymentAmount>
    </PaymentCardContainer>
  );
};

// QUARTA VARIANTE - CreditCard (nova variante para tela de créditos)
interface CreditCardProps {
  title: string;
  date: string;
  status: "confirmado" | "expirado" | "inadimplente" | "pendente";
  avatar?: string;
  onClick: () => void;
}

const CreditCardContainer = styled.div`
  display: flex;
  align-items: center;
  background: white;
  border-radius: 16px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
  }

  &:active {
    transform: translateY(1px);
  }
`;

const CreditIconWrapper = styled.div`
  width: 40px;
  height: 40px;
  background: #f5f5f5;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
  flex-shrink: 0;

  svg {
    width: 20px;
    height: 20px;
    color: #666;
  }
`;

const CreditContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
`;

const CreditTitle = styled.h4`
  font-size: 14px;
  font-weight: 600;
  color: #000;
  margin: 0 0 4px 0;
  font-family: ${(props) => props.theme.fonts.family.poppins};
`;

const CreditDate = styled.p`
  font-size: 12px;
  color: #999;
  margin: 0;
  font-family: ${(props) => props.theme.fonts.family.poppins};
`;

const CreditStatusBadge = styled.span<{ status: string }>`
  font-size: 12px;
  font-weight: 600;
  padding: 6px 12px;
  border-radius: 8px;
  font-family: ${(props) => props.theme.fonts.family.poppins};
  white-space: nowrap;

  ${({ status }) => {
    switch (status) {
      case "confirmado":
        return `
          background: #f0fdf4;
          color: #22c55e;
        `;
      case "expirado":
        return `
          background: #fff7ed;
          color: #f97316;
        `;
      case "inadimplente":
        return `
          background: #fef2f2;
          color: #ef4444;
        `;
      case "pendente":
        return `
          background: #fefce8;
          color: #eab308;
        `;
      default:
        return `
          background: #f5f5f5;
          color: #666;
        `;
    }
  }}
`;

const getCreditStatusText = (status: string) => {
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
      return "Pendente";
  }
};

export const CreditCard: React.FC<CreditCardProps> = ({
  title,
  date,
  status,
  avatar,
  onClick,
}) => {
  const cardIcon = (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <path d="M2 10h20" stroke="white" strokeWidth="2" />
    </svg>
  );

  return (
    <CreditCardContainer onClick={onClick}>
      <CreditIconWrapper>{cardIcon}</CreditIconWrapper>

      <CreditContent>
        <CreditTitle>{title}</CreditTitle>
        <CreditDate>{date}</CreditDate>
      </CreditContent>

      <CreditStatusBadge status={status}>
        {getCreditStatusText(status)}
      </CreditStatusBadge>
    </CreditCardContainer>
  );
};

// QUINTA VARIANTE - TransferCard (para histórico de entradas e saídas)
interface TransferCardProps {
  name: string;
  date: string;
  amount: string; // ex: "+10.000,00 Kz" ou "-5.000,00 Kz"
  avatar?: string;
  onClick?: () => void;
}

const TransferCardContainer = styled.div`
  display: flex;
  align-items: center;
  background: white;
  border-radius: 16px;
  padding: 10px 16px;
  cursor: pointer;
  transition: all 0.2s ease;
  border-bottom: 1px solid #eee;

  &:active {
    transform: translateY(1px);
  }
`;

const TransferName = styled.h3`
  font-size: 14px;
  margin: 0;
  font-weight: ${(props) => props.theme.fonts.weight.regular};
  color: ${(props) => props.theme.colors.textBlack};
  font-family: ${(props) => props.theme.fonts.family.poppins};
`;

const TransferDate = styled.span`
  font-size: 12px;
  color: #999;
  font-family: ${(props) => props.theme.fonts.family.poppins};
`;

const TransferAmount = styled.span<{ isPositive: boolean }>`
  font-size: 14px;
  font-weight: 600;
  white-space: nowrap;
  margin-left: auto;
  font-family: ${(props) => props.theme.fonts.family.poppins};
  color: ${({ isPositive }) => (isPositive ? "#22c55e" : "#ef4444")};
`;

export const TransferCard: React.FC<TransferCardProps> = ({
  name,
  date,
  amount,
  avatar,
  onClick,
}) => {
  const isPositive = amount.trim().startsWith("+");

  return (
    <TransferCardContainer onClick={onClick}>
      <AvatarContainer>
        {avatar ? (
          <AvatarImage src={avatar} alt={name} />
        ) : (
          <AvatarFallback>{getInitials(name)}</AvatarFallback>
        )}
      </AvatarContainer>

      <ContentContainer>
        <TransferName>{name}</TransferName>
        <TransferDate>{date}</TransferDate>
      </ContentContainer>

      <TransferAmount isPositive={isPositive}>{amount}</TransferAmount>
    </TransferCardContainer>
  );
};

// ============================================================
// SEXTA VARIANTE - CandidaturaCard (para histórico de candidaturas)
// ============================================================
interface CandidaturaCardProps {
  title: string;
  type: "bolsa" | "estagio" | "credito";
  status: "aprovada" | "pendente" | "rejeitada" | "em_analise";
  date: string;
  logo?: string; // URL do logotipo
  onClick?: () => void;
}

const CandidaturaCardContainer = styled.div`
  display: flex;
  align-items: center;
  background: white;
  border-radius: 16px;
  padding: 12px 16px;
  border: 1px solid #e5e7eb;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-bottom: 12px;

  &:hover {
    border-color: #c5a4db;
    box-shadow: 0 2px 8px rgba(197, 164, 219, 0.15);
  }

  &:active {
    transform: scale(0.98);
  }
`;

const CandidaturaIconContainer = styled.div<{ type: string }>`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
  flex-shrink: 0;
  overflow: hidden;
  
  ${({ type }) => {
    switch (type) {
      case "bolsa":
        return `background: #f3e8ff;`;
      case "estagio":
        return `background: #dbeafe;`;
      case "credito":
        return `background: #dcfce7;`;
      default:
        return `background: #f3f4f6;`;
    }
  }}
`;

const CandidaturaLogo = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const CandidaturaContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
`;

const CandidaturaTitle = styled.h3`
  font-size: 14px;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 4px 0;
  font-family: ${(props) => props.theme.fonts.family.poppins};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const CandidaturaInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: #6b7280;
  font-family: ${(props) => props.theme.fonts.family.poppins};
`;

const CandidaturaType = styled.span<{ type: string }>`
  font-weight: 500;
  
  ${({ type }) => {
    switch (type) {
      case "bolsa":
        return `color: #7c3aed;`;
      case "estagio":
        return `color: #2563eb;`;
      case "credito":
        return `color: #16a34a;`;
      default:
        return `color: #6b7280;`;
    }
  }}
`;

const CandidaturaStatusBadge = styled.span<{ status: string }>`
  font-size: 11px;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 12px;
  font-family: ${(props) => props.theme.fonts.family.poppins};
  white-space: nowrap;

  ${({ status }) => {
    switch (status) {
      case "aprovada":
        return `
          background: #dcfce7;
          color: #16a34a;
        `;
      case "pendente":
        return `
          background: #fef3c7;
          color: #d97706;
        `;
      case "rejeitada":
        return `
          background: #fee2e2;
          color: #dc2626;
        `;
      case "em_analise":
        return `
          background: #dbeafe;
          color: #2563eb;
        `;
      default:
        return `
          background: #f3f4f6;
          color: #6b7280;
        `;
    }
  }}
`;

const getCandidaturaStatusText = (status: string) => {
  switch (status) {
    case "aprovada":
      return "Aprovada";
    case "pendente":
      return "Pendente";
    case "rejeitada":
      return "Rejeitada";
    case "em_analise":
      return "Em análise";
    default:
      return "Pendente";
  }
};

const getCandidaturaTypeText = (type: string) => {
  switch (type) {
    case "bolsa":
      return "Bolsa";
    case "estagio":
      return "Estágio";
    case "credito":
      return "Crédito";
    default:
      return "";
  }
};

const getCandidaturaIcon = (type: string) => {
  switch (type) {
    case "bolsa":
      return "🎓";
    case "estagio":
      return "💼";
    case "credito":
      return "💳";
    default:
      return "📄";
  }
};

export const CandidaturaCard: React.FC<CandidaturaCardProps> = ({
  title,
  type,
  status,
  date,
  logo,
  onClick,
}) => {
  return (
    <CandidaturaCardContainer onClick={onClick}>
      <CandidaturaIconContainer type={type}>
        {logo ? (
          <CandidaturaLogo src={logo} alt={title} />
        ) : (
          <span style={{ fontSize: "24px" }}>{getCandidaturaIcon(type)}</span>
        )}
      </CandidaturaIconContainer>

      <CandidaturaContent>
        <CandidaturaTitle>{title}</CandidaturaTitle>
        <CandidaturaInfo>
          <CandidaturaType type={type}>{getCandidaturaTypeText(type)}</CandidaturaType>
          <span style={{ color: "#d1d5db" }}>•</span>
          <span>{date}</span>
        </CandidaturaInfo>
      </CandidaturaContent>

      <CandidaturaStatusBadge status={status}>
        {getCandidaturaStatusText(status)}
      </CandidaturaStatusBadge>
    </CandidaturaCardContainer>
  );
};