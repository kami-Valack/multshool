"use client";

import React from "react";
import styled from "styled-components";
import { useRouter } from "next/navigation";

interface HeaderProps {
  variant: "logo" | "text";
  title?: string;
  logoComponent?: React.ReactNode;
  onBackClick?: () => void;
}

const HeaderContainer = styled.header`
  width: 100%;
  display: flex;
  justify-content:center;
  align-items: center;
  padding: 36px 0px;
  position: sticky;
  top: 0;
  z-index: 1;
  margin: 0 0 -30px 0;
`;

const Cab = styled.div`
width: 90%;
display: flex;
justify-content; center;
align-items: center;
`;

const LeftSection = styled.div`
  display: flex;
  margin: 0 0 0 -5px;
  padding: 0;
`;

const CenterSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

const RightSection = styled.div`
  display: flex;
  margin: 0;
  padding: 0;
`;

const BackButton = styled.button`
  all: unset;
  display: flex;
  padding: 0; /* elimina espaço interno */
  margin: 0; /* elimina espaço externo */
  background: none;
  border: none;
  cursor: pointer;

  svg {
    width: 24px;
    height: 24px;
    color: #374151;
    display: block; /* remove espaço fantasma */
  }
`;

const Title = styled.h1`
  font-size: 1.1rem;
  font-weight: ${(props) => props.theme.fonts.weight.regular};
  color: ${(props) => props.theme.colors.textBlack};
  margin: 0;
  text-align: center;
`;

const LogoContainer = styled.div`
  display: flex;
`;

// Componente do ícone de seta para esquerda
const ArrowLeftIcon: React.FC = () => (
  <svg
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 19l-7-7 7-7"
    />
  </svg>
);

// Componente Header principal
const Header: React.FC<HeaderProps> = ({
  variant,
  title = "Instituições de Ensino",
  logoComponent,
  onBackClick,
}) => {
  const router = useRouter();

  const handleBackClick = () => {
    if (onBackClick) {
      onBackClick();
    } else {
      router.back();
    }
  };

  const renderContent = () => {
    switch (variant) {
      case "logo":
        return (
          <>
            <Cab>
              <LeftSection>
                <BackButton onClick={handleBackClick} aria-label="Voltar">
                  <ArrowLeftIcon />
                </BackButton>
              </LeftSection>
              <CenterSection />
              <RightSection>
                <LogoContainer>{logoComponent}</LogoContainer>
              </RightSection>
            </Cab>
          </>
        );

      case "text":
        return (
          <>
            <LeftSection>
              <BackButton onClick={handleBackClick} aria-label="Voltar">
                <ArrowLeftIcon />
              </BackButton>
            </LeftSection>
            <CenterSection>
              <Title>{title}</Title>
            </CenterSection>
            <RightSection />
          </>
        );

      default:
        return null;
    }
  };

  return <HeaderContainer>{renderContent()}</HeaderContainer>;
};

export default Header;

// Exemplo de componente de Logo (substitua pelo seu próprio)
export const ExampleLogo: React.FC = () => (
  <svg width="120" height="32" viewBox="0 0 120 32" fill="none">
    <rect width="120" height="32" rx="4" fill="#3b82f6" />
    <text
      x="60"
      y="20"
      textAnchor="middle"
      fill="white"
      fontSize="14"
      fontWeight="bold"
    >
      LOGO
    </text>
  </svg>
);

// Exemplos de uso:

// 1. Variante com logo no lado direito:
// <Header
//   variant="logo"
//   logoComponent={<ExampleLogo />}
//   onBackClick={() => console.log('Voltar clicado')}
// />

// 2. Variante com texto no centro:
// <Header
//   variant="text"
//   title="Instituições de Ensino"
//   onBackClick={() => console.log('Voltar clicado')}
// />

// 3. Variante com texto customizado:
// <Header
//   variant="text"
//   title="Meu Título Personalizado"
// />
