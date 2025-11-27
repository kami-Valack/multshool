"use client";

import React from "react";
import styled from "styled-components";
import { Header } from "@/components/candidato/Header";
import { HeroCard } from "@/components/candidato/HeroCard";
import { OptionCard } from "@/components/candidato/OptionCard";
import { useRouter } from "next/navigation";
import Bg from "@/assets/backgrounds/candidato/preparatorio.png";

const Container = styled.div`
  width: 90vw;
  margin: 0 auto;
  font-family: ${(props) => props.theme.fonts.family.poppins};
  min-height: 100vh;
  padding-bottom: 30px;
`;

const DescriptionCard = styled.div`
  background-color: #E8E8F0;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
`;

const DescriptionTitle = styled.h3`
  font-size: 16px;
  font-weight: ${(props) => props.theme.fonts.weight.semibold};
  color: ${(props) => props.theme.colors.textBlack};
  margin: 0 0 12px 0;
`;

const DescriptionText = styled.p`
  font-size: 14px;
  font-weight: 400;
  color: ${(props) => props.theme.colors.foreground};
  line-height: 1.5;
  margin: 0;
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 15px;
  margin-bottom: 30px;
`;

export default function ExameAcessoPage() {
  const router = useRouter();

  const handleBackClick = () => {
    router.back();
  };

  const handleCardClick = (cardType: string) => {
    console.log(`${cardType} clicked`);
    
    switch (cardType) {
      case "fichaExercicios":
        router.push("preparatorio/ficha-exercicios");
        break;
      case "tarefas":
        router.push("preparatorio/tarefas");
        break;
      case "examesPassados":
        router.push("preparatorio/exames-passados");
        break;
      case "topicosExame":
        router.push("preparatorio/topicos-exame");
        break;
      default:
        console.log("Card type not recognized:", cardType);
    }
  };

  return (
    <>
      <Container>
        <Header variant="with-back" onBack={handleBackClick} />

        <HeroCard
          title="Curso Preparatório ISPTEC IV"
          subtitle="O teu sucesso no exame de acesso e na tua jornada académica."
          imageUrl={Bg.src}
        />
        
        <DescriptionCard>
          <DescriptionTitle>Descrição</DescriptionTitle>
          <DescriptionText>
            4a edição do curso preparatório ao exame de acesso às faculdades do ISPTEC para o ano lectivo 2025/2026.
          </DescriptionText>
        </DescriptionCard>

        <CardGrid>
          <OptionCard
            variant="primary"
            status="disponivel"
            title="Ficha de exercícios"
            date="02 - 04 de Agosto"
            subtitle="08h às 10h30"
            onClick={() => handleCardClick("fichaExercicios")}
          />

          <OptionCard
            variant="secondary"
            status="disponivel"
            title="Tarefas"
            subtitle="Última actualização Ontem, às 12h30"
            onClick={() => handleCardClick("tarefas")}
          />

          <OptionCard
            variant="disabled"
            status="disponivel"
            title="Exames passados"
            subtitle="2019 - 2024"
            onClick={() => handleCardClick("examesPassados")}
          />

          <OptionCard
            variant="primary"
            status="disponivel"
            title="Tópicos do exame"
            subtitle="50 tópicos disponíveis"
            onClick={() => handleCardClick("topicosExame")}
          />
        </CardGrid>
      </Container>
    </>
  );
}