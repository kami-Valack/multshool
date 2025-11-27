'use client';
import React from 'react';
import styled, { keyframes, css } from 'styled-components';
import NotFoundImg from "@/assets/backgrounds/not-found.jpg"
// === Animações ===
const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
`;

const subtlePulse = keyframes`
  0%,100% { transform: scale(1); }
  50% { transform: scale(1.02); }
`;

// === Layout principal ===
const PageWrapper = styled.div`
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  z-index: 9999;
  margin: 0;
  padding: 0;
  font-family: ${(props) => props.theme.fonts.family.poppins};


  background-color: #09090b8b;
  background-image: url('${NotFoundImg.src}'); 
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.66);
    backdrop-filter: blur(2px);
    z-index: 1;
  }
`;

// === Conteúdo ===
const Content = styled.main`
  position: relative;
  z-index: 2;
  text-align: center;
  color: #fff;
  max-width: 720px;
  padding: 28px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 18px;

  ${css`
    animation: ${fadeInUp} 0.5s ease forwards;
  `}
`;

const Title404 = styled.h1`
  font-size: clamp(4rem, 12vw, 9rem);
  font-weight: 800;
  margin: 0;
  line-height: 1;
  text-shadow: 0 6px 30px rgba(0, 0, 0, 0.6);
`;

const Subtitle = styled.h2`
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  font-weight: 600;
  margin: 0;
  color: #e4e4e8;
`;

const Description = styled.p`
  max-width: 640px;
  font-size: 1rem;
  line-height: 1.6;
  color: rgba(230, 230, 234, 0.9);
  margin: 0 0 20px;
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 14px;
  flex-wrap: wrap;
  width: 100%;
`;

// === Botão genérico com animação segura ===
const Button = styled.button<{ variant?: 'primary' | 'ghost' }>`
  min-width: 160px;
  padding: 12px 22px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  ${(p) =>
    p.variant === 'ghost'
      ? css`
          background: transparent;
          color: rgba(255, 255, 255, 0.95);
          box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.1) inset;
          &:hover {
            transform: translateY(-3px);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.45);
          }
        `
      : css`
          background: #6c5f8d;
          color: #fff;
          box-shadow: 0 6px 24px rgba(108, 95, 141, 0.18);
          animation: ${subtlePulse} 4s ease-in-out infinite;
          &:hover {
            background-color: #5a4e7a;
            transform: translateY(-3px);
            box-shadow: 0 18px 40px rgba(108, 95, 141, 0.25);
          }
        `}
`;

const Footer = styled.footer`
  position: absolute;
  bottom: 15px;
  left: 0;
  right: 0;
  z-index: 2;
  text-align: center;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.6);
`;

export default function NotFound() {
  const goHome = () => (window.location.href = '/');
  const goBack = () => window.history.back();

  return (
    <PageWrapper>
      <Content>
        <Title404>404</Title404>
        <Subtitle>Página não encontrada</Subtitle>
        <Description>
          Oops — não conseguimos encontrar a página que procuras.  
          Podes voltar ao início ou regressar à página anterior.
        </Description>

        <ButtonRow>
          <Button onClick={goHome}>Voltar ao Início</Button>
          <Button variant="ghost" onClick={goBack}>Página Anterior</Button>
        </ButtonRow>
      </Content>

      <Footer>© {new Date().getFullYear()} Multischool Angola</Footer>
    </PageWrapper>
  );
}
