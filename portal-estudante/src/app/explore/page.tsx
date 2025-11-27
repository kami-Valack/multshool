"use client";

import styled from "styled-components";
import PageContainer from "@/components/Losangos";
import Header from "@/components/ui/HeaderWelcome";
import Icon from "@/components/ui/IconLogo";
import React, { useState } from "react";
import Check from "@/assets/icons/check.png";
import Check_green from "@/assets/icons/check_green.png";
import Image from "next/image";
import Button from "@/components/ui/Button";
import BgHs from "@/assets/backgrounds/ensino_medio.jpeg";
import BgUni from "@/assets/backgrounds/university.jpeg";
import { useRouter } from "next/navigation";
import Link from "next/link";

// Importar tipos e utils
import { CardOption, ContentSection } from "@/types/institutions";
import { adjustColor } from "@/utils/colorss";

// Styled Components
const Content = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Titulo = styled.h3`
  font-weight: ${(props) => props.theme.fonts.weight.regular};
  font-size: 1.3rem;
  text-align: center;
  margin-bottom: 2rem;
`;

const CardsContainer = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 40px;
  width: 100%;
  max-width: 350px;
`;

const Card = styled.div<{ $isSelected: boolean; $bgColor: string }>`
  flex: 1;
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.3s ease;
  transform: ${(props) => (props.$isSelected ? "scale(1.05)" : "scale(1)")};
  box-shadow: ${(props) =>
    props.$isSelected
      ? "0 8px 24px rgba(0,0,0,0.15)"
      : "0 4px 12px rgba(0,0,0,0.1)"};
  background: linear-gradient(
    135deg,
    ${(props) => props.$bgColor},
    ${(props) => adjustColor(props.$bgColor, -20)}
  );
  min-height: 240px;
  height: 240px;
  cursor: pointer;

  &:focus {
    outline: 2px solid ${(props) => props.theme.colors.primary};
    outline-offset: 2px;
  }

  &:hover {
    transform: ${(props) =>
      props.$isSelected ? "scale(1.05)" : "scale(1.02)"};
  }

  &.loading {
    pointer-events: none;
    opacity: 0.7;
  }
`;

const CardContent = styled.div`
  padding: 20px;
  height: 85%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  z-index: 2;
`;

const CardImage = styled.div<{ $image: string }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(rgba(0, 0, 0, 0.47), rgba(0, 0, 0, 0.49)),
    url(${(props) => props.$image});
  background-size: cover;
  background-position: center;
  z-index: 1;
  border-radius: 16px;
`;

const CardTitle = styled.h3`
  color: white;
  font-size: 18px;
  font-weight: 600;
  margin: 0;
`;

const CardBottomContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const CardSubtitle = styled.p`
  color: ${(props) => props.theme.colors.textWhite};
  font-size: 14px;
  margin: 0;
  line-height: 1.4;
`;

const AvailableCount = styled.div`
  background: ${(props) => props.theme.colors.primary_light};
  color: #333;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: ${(props) => props.theme.fonts.weight.semibold};
  align-self: flex-start;
`;

const CheckIcon = styled.div<{ $isVisible: boolean }>`
  position: absolute;
  top: 15px;
  right: 15px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${(props) => (props.$isVisible ? 1 : 0)};
  transition: all 0.3s ease;
  z-index: 3;
`;

const ContentSectionS = styled.div`
  width: 90%;
  max-width: 350px;
  padding: 12px 0 24px 0;
  background: ${(props) => props.theme.colors.background_2};
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ContentSectionInner = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 24px 0 24px;
`;

const SectionTitle = styled.h2`
  font-size: 16px;
  font-weight: ${(props) => props.theme.fonts.weight.regular};
  color: ${(props) => props.theme.colors.textBlack};
  margin-bottom: 20px;
  text-align: start;
`;

const ItemList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 23px;
  margin-bottom: 24px;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  color: ${(props) => props.theme.colors.foreground};
  font-weight: ${(props) => props.theme.fonts.weight.light};
  font-size: 14px;
`;

const CheckMark = styled.div`
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const Btn = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const PrefetchLinks = styled.div`
  position: absolute;
  visibility: hidden;
  pointer-events: none;
`;

// Dados cards atualizados
const cardOptions: CardOption[] = [
  {
    id: "ensino-medio",
    title: "Angola",
    subtitle: "IEM - Instituições de Ensino Médio",
    available: 980,
    image: `${BgHs.src}`,
    bgColor: "#B8860B",
    route: "ensino-medio",
  },
  {
    id: "ensino-superior",
    title: "Angola e Brasil",
    subtitle: "IES - Instituições de Ensino Superior",
    available: 230,
    image: `${BgUni.src}`,
    bgColor: "#2E8B57",
    route: "ensino-superior",
  },
];

const contentData: Record<string, ContentSection> = {
  "ensino-medio": {
    title: "Explore opções de ensino médio!",
    items: [
      "Preparação Acadêmica",
      "Apoio e Orientação",
      "Ambiente de Crescimento",
    ],
  },
  "ensino-superior": {
    title: "Explore opções de ensino superior!",
    items: [
      "Graduação Completa",
      "Programas de Intercâmbio",
      "Pesquisa e Desenvolvimento",
    ],
  },
};

export default function Explore() {
  const [selectedCard, setSelectedCard] = useState<string>("");
  const [isNavigating, setIsNavigating] = useState(false);
  const router = useRouter();

  const handleCardSelect = (cardId: string) => {
    if (!isNavigating) {
      setSelectedCard(cardId);
    }
  };

  const handleExplore = async () => {
    if (selectedCard && !isNavigating) {
      const selectedOption = cardOptions.find(
        (card) => card.id === selectedCard
      );
      if (selectedOption) {
        setIsNavigating(true);

        try {
          await router.push(`/instituicoes/${selectedOption.route}`);
        } catch (error) {
          console.error("Erro ao navegar:", error);
          setIsNavigating(false);
        }
      }
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent, cardId: string) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleCardSelect(cardId);
    }
  };

  const currentContent = selectedCard
    ? contentData[selectedCard]
    : {
        title: "Selecione uma opção para explorar!",
        items: [],
      };

  return (
    <PageContainer>
      <PrefetchLinks>
        {cardOptions.map((card) => (
          <Link
            key={`prefetch-${card.id}`}
            href={`/instituicoes/${card.route}`}
            prefetch={true}
          />
        ))}
      </PrefetchLinks>

      <Header
        variant="logo"
        logoComponent={<Icon width={40} height={50} />}
        onBackClick={() => router.back()}
      />

      <Content>
        <Titulo>Selecione uma opção</Titulo>

        <CardsContainer>
          {cardOptions.map((card) => (
            <Card
              key={card.id}
              $isSelected={selectedCard === card.id}
              $bgColor={card.bgColor}
              onClick={() => handleCardSelect(card.id)}
              onKeyDown={(e) => handleKeyDown(e, card.id)}
              className={isNavigating ? "loading" : ""}
              role="button"
              tabIndex={0}
              aria-label={`Selecionar ${card.title} - ${card.subtitle}`}
              aria-pressed={selectedCard === card.id}
            >
              <CheckIcon $isVisible={selectedCard === card.id}>
                <Image src={Check} alt="Check" width={30} height={30} />
              </CheckIcon>

              <CardImage $image={card.image} />

              <CardContent>
                <CardTitle>{card.title}</CardTitle>

                <CardBottomContent>
                  <CardSubtitle>{card.subtitle}</CardSubtitle>
                  <AvailableCount>{card.available} disponíveis</AvailableCount>
                </CardBottomContent>
              </CardContent>
            </Card>
          ))}
        </CardsContainer>

        <ContentSectionS>
          <ContentSectionInner>
            <SectionTitle>{currentContent.title}</SectionTitle>
            <ItemList>
              {currentContent.items.map((item, index) => (
                <Item key={index}>
                  <CheckMark>
                    <Image
                      src={Check_green}
                      alt="Check"
                      width={40}
                      height={40}
                    />
                  </CheckMark>
                  {item}
                </Item>
              ))}
            </ItemList>
          </ContentSectionInner>
          <Btn>
            {selectedCard && (
              <Button
                bgColor="primary"
                textColor="#FFFFFF"
                text={isNavigating ? "Carregando..." : "Explorar"}
                hasBorder={false}
                onClick={handleExplore}
                disabled={isNavigating}
              />
            )}
          </Btn>
        </ContentSectionS>
      </Content>
    </PageContainer>
  );
}
