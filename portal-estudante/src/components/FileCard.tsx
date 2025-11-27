import React from "react";
import styled from "styled-components";
import TrainIcon from "@/assets/icons/Training.png";

interface MaterialCardProps {
  id: string;
  title: string;
  icon?: "book" | "calculator" | "code" | "science";
  createdAt?: string;
  onClick?: () => void;
  onDownload?: () => void;
}

const CardContainer = styled.div`
  background: #f3f0f9;
  border-radius: 12px;
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
`;

const IconContainer = styled.div`
  width: 48px;
  height: 48px;
  background: #ffffff;
  border-radius: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const Icon = styled.div`
  width: 24px;
  height: 24px;
  background: url(${TrainIcon.src}) no-repeat center center;
  background-size: cover;
  background-position: center;
  border-radius: 2px;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 2px;
    left: 2px;
    right: 2px;
    bottom: 2px;
    border: 1px solid #ffffff;
    border-radius: 1px;
  }

  &::after {
    content: "";
    position: absolute;
    top: 6px;
    left: 5px;
    right: 5px;
    height: 1px;
    background: #ffffff;
    box-shadow: 0 3px 0 #aeaeae, 0 6px 0 #aeaeae;
  }
`;

const ContentContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const MaterialTitle = styled.h3`
  font-size: 14px;
  font-weight: ${(props) => props.theme.fonts.weight.regular};
  color: ${(props) => props.theme.colors.textBlack};
  margin: 0;
`;

const MaterialDate = styled.span`
  font-size: 12px;
  font-weight: ${(props) => props.theme.fonts.weight.light};
  color: ${(props) => props.theme.colors.foreground};
  opacity: 0.8;
`;

const DownloadButton = styled.button`
  width: 32px;
  height: 32px;
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  transition: background-color 0.2s ease;

  &:hover {
    background: rgba(0, 0, 0, 0.05);
  }

  svg {
    width: 20px;
    height: 20px;
    color: #6b7280;
  }
`;

const DownloadIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7,10 12,15 17,10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

// Função para formatar data
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
  
  if (diffInHours < 24) {
    return "Hoje";
  } else if (diffInHours < 48) {
    return "Ontem";
  } else if (diffInHours < 24 * 7) {
    const days = Math.floor(diffInHours / 24);
    return `Há ${days} dia${days > 1 ? 's' : ''}`;
  } else {
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }
};

export const FileCard: React.FC<MaterialCardProps> = ({
  id,
  title,
  icon = "book",
  createdAt,
  onClick,
  onDownload,
}) => {
  // Debug para verificar se a data está chegando
  console.log(`FileCard ${title}: createdAt =`, createdAt);

  const handleCardClick = () => {
    if (onClick) {
      onClick();
    }
  };

  const handleDownloadClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onDownload) {
      onDownload();
    }
  };

  return (
    <CardContainer onClick={handleCardClick}>
      <IconContainer>
        <Icon />
      </IconContainer>

      <ContentContainer>
        <MaterialTitle>{title}</MaterialTitle>
        {createdAt ? (
          <MaterialDate>{formatDate(createdAt)}</MaterialDate>
        ) : (
          <MaterialDate>Sem data</MaterialDate>
        )}
      </ContentContainer>

      <DownloadButton onClick={handleDownloadClick}>
        <DownloadIcon />
      </DownloadButton>
    </CardContainer>
  );
};