'use client';

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import bgimage from '@/assets/backgrounds/offline.png'

const DesktopWarningContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: url(${bgimage.src}) no-repeat center center;
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 10000;
  text-align: center;
  
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: -1;
  }
`;

const IconContainer = styled.div`
  font-size: 4rem;
  margin-bottom: 2rem;
  animation: bounce 2s infinite;
  
  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-20px);
    }
    60% {
      transform: translateY(-10px);
    }
  }
`;

const Title = styled.h1`
  color: white;
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
  font-size: 2.5rem;
  margin-bottom: 1rem;
  line-height: 1.2;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Message = styled.p`
  color: white;
  font-family: 'Poppins', sans-serif;
  font-weight: 400;
  font-size: 1.2rem;
  margin-bottom: 2rem;
  max-width: 600px;
  line-height: 1.5;
  opacity: 0.9;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const Suggestion = styled.div`
  color: white;
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  font-size: 1rem;
  margin-top: 1rem;
  padding: 1rem 2rem;
  border: 2px solid white;
  border-radius: 50px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

interface DeviceDetectorProps {
  children: React.ReactNode;
  maxMobileWidth?: number;
}

const DeviceDetector: React.FC<DeviceDetectorProps> = ({
  children,
  maxMobileWidth = 768
}) => {
  const [isMobile, setIsMobile] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      const userAgent = navigator.userAgent.toLowerCase();
      const isMobileDevice = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
      const isMobileScreen = width <= maxMobileWidth || isMobileDevice;
      
      setIsMobile(isMobileScreen);
      setIsLoading(false);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    
    return () => {
      window.removeEventListener('resize', checkDevice);
    };
  }, [maxMobileWidth]);

  if (isLoading) {
    return null;
  }

  if (!isMobile) {
    return (
      <DesktopWarningContainer>
        <IconContainer>📱</IconContainer>
        <Title>Versão Mobile Apenas</Title>
        <Message>
          Esta aplicação foi desenvolvida exclusivamente para dispositivos móveis.
          A versão para desktop/tablet ainda não está disponível.
        </Message>
        <Suggestion>
          📲 Acesse pelo seu smartphone para a melhor experiência
        </Suggestion>
      </DesktopWarningContainer>
    );
  }

  return <>{children}</>;
};

export default DeviceDetector;