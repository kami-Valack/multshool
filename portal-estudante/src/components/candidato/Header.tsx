import React from "react";
import styled from "styled-components";

interface HeaderProps {
  variant?: "default" | "with-back";
  text?: string;
  onBack?: () => void;
}

const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin-bottom: 30px;
  padding: 20px 0;
  // margin: 30px 0 0 0
`;

const BackButton = styled.button`
  position: absolute;
  // bottom: 0;
  left: 4%;
  background: none;
  border: none;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(props) => props.theme.colors.background_2};
  border-radius: 30px;

  &::before {
    content: "←";
    font-size: 20px;
    color: ${(props) => props.theme.colors.foreground};
    font-weight: 500;
  }
`;

const Title = styled.h1`
  font-size: 15px;
  font-weight: ${(props) => props.theme.fonts.weight.semibold};
  color: ${(props) => props.theme.colors.primary};
  // margin: 20px 0 0 0;
  letter-spacing: 0.2px;
  text-align: center;
`;

export const Header: React.FC<HeaderProps> = ({
  variant = "default",
  text = "EXAME DE ACESSO 2025/26",
  onBack,
}) => {
  return (
    <HeaderContainer>
      {variant === "with-back" && <BackButton onClick={onBack} />}
     {text &&  <Title>{text}</Title>}
    </HeaderContainer>
  );
};
