"use client";
import React from "react";
import Image, { StaticImageData } from "next/image";
import styled, { keyframes } from "styled-components";
import Button from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import Bg1 from "@/assets/backgrounds/candidato/bg_1.png";
import Bg2 from "@/assets/backgrounds/candidato/bg_2.jpeg";
import Bg3 from "@/assets/backgrounds/candidato/bg_3.jpeg";
import Bg4 from "@/assets/backgrounds/candidato/bg_4.jpeg";
import Bg5 from "@/assets/backgrounds/candidato/bg_5.png";
import Bg6 from "@/assets/backgrounds/candidato/bg_6.jpeg";

// Animações de entrada personalizadas
const fadeInLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-30px) scale(0.9);
  }
  to {
    opacity: 1;
    transform: translateX(0) scale(1);
  }
`;

const fadeInRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(30px) scale(0.9);
  }
  to {
    opacity: 1;
    transform: translateX(0) scale(1);
  }
`;

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px) scale(0.9);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`;

const fadeInScale = keyframes`
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

// Container principal da tela
const WelcomeContainer = styled.div`
  min-height: 100vh;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
`;

// Grid das imagens
const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 12px;
  width: 94vw;
`;

// Componente de card de estudante
interface StudentCardProps {
  imageSrc: string | StaticImageData;
  alt: string;
  height?: string;
  index: number;
}

const ImageCard = styled.div<{ $height?: string; $index: number }>`
  height: ${({ $height }) => $height || "160px"};
  border-radius: 20px;
  overflow: hidden;
  position: relative;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  opacity: 0;
  animation: ${({ $index }) =>
      $index % 3 === 0
        ? fadeInLeft
        : $index % 3 === 2
        ? fadeInRight
        : fadeInUp}
    0.8s ease-out forwards;
  animation-delay: ${({ $index }) => $index * 0.15}s;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  }
`;

const StudentImage = styled(Image)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: filter 0.3s ease;

  ${ImageCard}:hover & {
    filter: brightness(1.1);
  }
`;

const StudentCard: React.FC<StudentCardProps & { marginTop?: string }> = ({
  imageSrc,
  alt,
  height,
  marginTop,
  index,
}) => (
  <ImageCard $height={height} style={{ marginTop }} $index={index}>
    <StudentImage
      src={imageSrc}
      alt={alt}
      fill
      sizes="(max-width: 480px) 100vw, 33vw"
      priority={false}
    />
  </ImageCard>
);

// Título
const Title = styled.h1`
  font-size: 36px;
  font-weight: 700;
  color: ${(props) => props.theme?.colors?.primary};
  margin-bottom: 4px;
  line-height: 1.3;
  max-width: 400px;
  padding: 0 0 0 1rem;
  opacity: 0;
  animation: ${fadeInUp} 0.6s ease-out forwards;
  animation-delay: 1s; /* Começa após as imagens */

  @media (max-width: 480px) {
    font-size: 32px;
  }
`;

// Descrição
const Description = styled.p`
  font-size: 16px;
  color: ${(props) => props.theme.colors.foreground};
  line-height: 1.6;
  max-width: 350px;
  margin-bottom: 32px;
  padding: 0 0 0 1rem;
  opacity: 0;
  animation: ${fadeInUp} 0.6s ease-out forwards;
  animation-delay: 1.2s; /* Começa após o título */
`;

// Container do botão
const ButtonContainer = styled.div`
  width: 90vw;
  margin-bottom: 32px;
  opacity: 0;
  animation: ${fadeInScale} 0.6s ease-out forwards;
  animation-delay: 1.4s; /* Começa após a descrição */
`;

// Lista de imagens
const images: (StudentCardProps & { marginTop?: string })[] = [
  { imageSrc: Bg1, alt: "Estudante com livros", height: "220px", index: 0 },
  { imageSrc: Bg2, alt: "Estudante graduada", height: "180px", index: 1 },
  { imageSrc: Bg3, alt: "Estudante sorrindo", height: "220px", index: 2 },
  { imageSrc: Bg4, alt: "Estudante graduado", height: "200px", index: 3 },
  {
    imageSrc: Bg5,
    alt: "Estudante confiante",
    height: "220px",
    marginTop: "-35%",
    index: 4,
  },
  { imageSrc: Bg6, alt: "Estudante com documentos", height: "200px", index: 5 },
];

// Componente principal da tela de boas-vindas
const WelcomeScreen: React.FC = () => {
  const router = useRouter();
  const handleButtonClick = () => {
    router.push("/candidato/home");
  };

  return (
    <WelcomeContainer>
      <ImageGrid>
        {images.map((image, index) => (
          <StudentCard
            key={
              typeof image.imageSrc === "string"
                ? image.imageSrc
                : image.imageSrc.src
            }
            imageSrc={image.imageSrc}
            alt={image.alt}
            height={image.height}
            marginTop={image.marginTop}
            index={index}
          />
        ))}
      </ImageGrid>

      <Title>Bem-vindo, Futuro Universitário!</Title>

      <Description>
        A partir de agora, podes marcar o exame de acesso, inscrever-te no
        preparatório e acompanhar todo o teu percurso académico num único lugar
      </Description>

      <ButtonContainer>
        <Button
          text="Começar"
          bgColor="primary"
          textColor="#ffffff"
          variant="rounded"
          icon="→"
          iconPosition="right"
          onClick={handleButtonClick}
        />
      </ButtonContainer>
    </WelcomeContainer>
  );
};

export default WelcomeScreen;