"use client";

import React from "react";
import styled from "styled-components";
import { Header } from "@/components/candidato/Header";
import { HeroCard } from "@/components/candidato/HeroCard";
import { OptionCard } from "@/components/candidato/OptionCard";
import { ActivityCard } from "@/components/ActivityCard";
import { useRouter } from "next/navigation";
import Bg from "@/assets/backgrounds/candidato/bg_home.png";


// Interfaces para tipagem dos dados da API
interface Activity {
  id: string;
  title: string;
  institution: string;
  status: "pendente" | "em_curso" | "concluido";
  date: string;
  icon?: string;
  description?: string;
}

interface ExameAcessoData {
  activities: Activity[];
}

const Container = styled.div`
  width: 90vw;
  margin: 0 auto;
  font-family: ${(props) => props.theme.fonts.family.poppins};
  height: 135vh;
`;

const SectionTitle = styled.h2`
  font-size: 17px;
  font-weight: ${(props) => props.theme.fonts.weight.semibold};
  color: ${(props) => props.theme.colors.textBlack};
  margin: 0 0 20px 0;
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 15px;
  grid-row-gap: 15px; 
  height: 240px;
  margin: 0 0 70px 0;

  & > :first-child {
    grid-row: 1 / 3;
  }

  & > :nth-child(2) {
    grid-row: 1;
  }

  & > :last-child {
    grid-column: 2;
    grid-row: 2;
  }
`;

const ActivitiesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  height: 25vh;
  overflow: auto;

`;

const ActivityCardWrapper = styled.div`
  width: 100%;
`;

export default function ExameAcessoPage() {
  const router = useRouter();

  // Dados mock - em produção virão da API
  const mockData: ExameAcessoData = {
    activities: [
      {
        id: "1",
        title: "Exame de Acesso",
        institution: "ISPTEC",
        status: "pendente",
        date: "02/08",
        icon: "exam",
      },
      {
        id: "2",
        title: "Curso Preparatório",
        institution: "ISPTEC",
        status: "em_curso",
        date: "30/07",
        icon: "course",
      },
      {
        id: "3",
        title: "Curso Preparatório",
        institution: "ISPTEC",
        status: "em_curso",
        date: "30/07",
        icon: "course",
      },
    ],
  };

  const handleBackClick = () => {
    console.log("Back clicked");
    // Implementar navegação
  };

  const handleCardClick = (cardName: string, variant: string) => {
    console.log(`${cardName} clicked, variant: ${variant}`);

    // Redirecionamento com base na variante
    switch (variant) {
      case "primary":
        router.push("/candidato/exame_acesso");
        break;
      case "secondary":
        router.push("preparatorio");
        break;
      case "disabled":
        router.push("nota-exame");
        break;
      default:
        console.log("Variante não reconhecida:", variant);
    }
  };

  const handleActivityClick = (activity: Activity) => {
    console.log("Activity clicked:", activity);
    // Implementar navegação baseada no tipo de atividade
    switch (activity.title) {
      case "Exame de Acesso":
        router.push(`/candidato/atividade/exame/${activity.id}`);
        break;
      case "Curso Preparatório":
        router.push(`/candidato/atividade/curso/${activity.id}`);
        break;
      default:
        router.push(`/candidato/atividade/${activity.id}`);
    }
  };

  const getStatusVariant = (status: Activity["status"]) => {
    switch (status) {
      case "pendente":
        return "pending";
      case "em_curso":
        return "active";
      case "concluido":
        return "completed";
      default:
        return "pending";
    }
  };

  return (
    <>
      <Container>
        <Header variant="default" />

        <HeroCard
          title="Preparatório Multischool Online"
          subtitle="Formação à distância para o teu sucesso no exame de acesso."
          imageUrl={Bg.src}
        />

        <SectionTitle>Selecione uma opção</SectionTitle>

        <CardGrid>
          <OptionCard
            variant="primary"
            status="disponivel"
            title="Exame de acesso"
            date="02 - 04 de Agosto"
            subtitle="08h às 10h30"
            size="tall"
            onClick={() => handleCardClick("Exame de acesso", "primary")}
          />

          <OptionCard
            variant="secondary"
            status="disponivel"
            title="Preparatório e Tópicos"
            onClick={() =>
              handleCardClick("Preparatório e Tópicos", "secondary")
            }
          />

          <OptionCard
            variant="disabled"
            status="disponivel"
            title="Nota do Exame de Acesso"
            onClick={() => handleCardClick("Nota do Exame", "disabled")}
          />
        </CardGrid>

        <SectionTitle>Actividades</SectionTitle>

        <ActivitiesContainer>
          {mockData.activities.map((activity) => (
            <ActivityCardWrapper key={activity.id}>
              <ActivityCard
                title={activity.title}
                institution={activity.institution}
                status={activity.status}
                date={activity.date}
                onClick={() => handleActivityClick(activity)}
              />
            </ActivityCardWrapper>
          ))}
        </ActivitiesContainer>
      </Container>
    </>
  );
}