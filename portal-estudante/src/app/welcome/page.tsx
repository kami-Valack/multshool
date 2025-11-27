"use client";
import styled from "styled-components";
import bgImage from "@/assets/backgrounds/bg_welcome.jpeg";
import Button from "@/components/ui/Button";
import Link from "next/link";

const BackgroundImage = styled.div`
  position: absolute; 
  top: 0;
  left: 0;
  width: 100%;
  min-height: 100%; /* deixa crescer com o conteúdo */
  background: url(${bgImage.src}) no-repeat center center;
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  z-index: 10000;
  font-family: ${(props) => props.theme.fonts.family.poppins};
  
  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: rgb(28, 28, 28, 69%);
    z-index: -1;
  }
`;

const Content = styled.div`
  width: 100%;
  max-width: calc(100vw - 2rem);
  min-height: 100vh; /* garante altura mínima da tela */
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 0 1rem 2rem 1rem;
`;

const Title = styled.h1`
  color: ${(props) => props.theme.colors.textWhite};
  font-weight: ${(props) => props.theme.fonts.weight.extrabold};
  font-size: 2.5rem;
  margin-bottom: -0.6rem;
  line-height: 1.4;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Description = styled.p`
  color: ${(props) => props.theme.colors.textWhite};
  font-weight: ${(props) => props.theme.fonts.weight.light};
  font-size: 1.07rem;
  line-height: 1.5;
`;

const Buttons = styled.div`
  width: 100%;
  height: 112px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  
  @media (max-width: 768px) {
    gap: 1.5rem;
    height: auto;
  }
`;

const LinkContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  margin-top: 1rem;
  margin-bottom: 2rem;
`;

const StyledLink = styled(Link)`
  text-decoration: underline;
  color: ${(props) => props.theme.colors.textWhite};
`;

export default function Welcome() {
  return (
    <BackgroundImage>
      <Content>
        <Title>Bem-vindo ao Multischool Angola</Title>
        <Description>
          Facilitamos a gestão da sua vida acadêmica com soluções que quebram o
          convencional!
        </Description>
        <Buttons>
          <Button
            bgColor="primary"
            textColor="#FFFFFF"
            text="Fazer login"
            hasBorder={false}
            href="/login"
            onClick={() => console.log("Botão clicado")}
          />
          <Button
            bgColor="background"
            textColor="#6C5F8D"
            text="Criar conta"
            href="/tips"
            hasBorder={false}
          />
        </Buttons>
        <LinkContainer>
          <StyledLink href="/explore">
            Explorar instituições de ensino
          </StyledLink>
        </LinkContainer>
      </Content>
    </BackgroundImage>
  );
}
