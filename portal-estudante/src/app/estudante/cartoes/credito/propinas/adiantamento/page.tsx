"use client";

import styled from "styled-components";
import { useState } from "react";
import BottomMenu from "@/components/ui/BottomMenu";
import Header from "@/components/ui/HeaderGeneral";
import BgCard from "@/assets/backgrounds/bg_08.png";
import Button from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import { SimpleCard } from "@/components/ActivityCard";

// Styled Components
const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: ${(props) => props.theme.fonts.family.poppins};
`;

const Top = styled.div`
  width: 100%;
`;

const Card = styled.div`
  width: 95%;
  height: 170px;
  border-radius: 13px;
  background: ${(props) => props.theme.colors.primary};
  display: flex;
`;

const Side1 = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  left: 7%;
  top: -5%;
`;

const Txt_1 = styled.p`
  font-size: 18px;
  font-weight: ${(props) => props.theme.fonts.weight.semibold};
  color: ${(props) => props.theme.colors.textWhite};
`;

const Subtitle = styled.p`
  font-size: 11px;
  font-weight: ${(props) => props.theme.fonts.weight.light};
  color: ${(props) => props.theme.colors.textWhite};
  margin: -10px 0 0 0;
`;

const Side2 = styled.div`
  width: 50%;
  height: 100%;
  background: url(${BgCard.src});
  background-size: cover;
  border-radius: 0 20px 20px 0;
`;

const ButtonGroup = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 30px;
`;

const Pendentes = styled.div`
  width: 90%;
  height: auto;
  display: flex;
  flex-direction: column;
  margin: 10px 0 130px 0;
  overflow-y: scroll;
`;

const Title = styled.p`
  font-size: 15px;
`;

export default function Adiantamento() {
  const router = useRouter();

  const handlePage = () => {
    router.push(`adiantamento/form`);
  };

  // ---- Mock de dados para testes ----
  const propinasData = [
    {
      id: "1",
      title: "Propina de julho",
      status: "em_atraso" as const,
      amount: "62.090 kz",
    },
    {
      id: "2",
      title: "Propina de junho",
      status: "pagamento_adiado" as const,
      amount: "54.000 kz",
    },
    {
      id: "3",
      title: "Propina de maio",
      status: "pendente" as const,
      amount: "54.000 kz",
    },
    {
      id: "4",
      title: "Propina de abril",
      status: "pendente" as const,
      amount: "54.000 kz",
    },
    {
      id: "5",
      title: "Propina de março",
      status: "pendente" as const,
      amount: "54.000 kz",
    },
  ];

  const handleConfirm = () => {
    router.push(`propinas/adiantamento`);
  };

  return (
    <>
      <Container>
        <Top>
          <Header variant="withBack" title="Adiantamento" />
        </Top>

        <Card>
          <Side1>
            <Txt_1>Adie o pagamento, não os seus sonhos!</Txt_1>
            <Subtitle>Faça o pedido de adiantamento agora.</Subtitle>
          </Side1>
          <Side2 />
        </Card>
        <ButtonGroup>
          <Button
            bgColor="background"
            textColor="#6C5F8D"
            text="Solicitar adiantamento"
            hasBorder={true}
            onClick={handlePage}
          />
        </ButtonGroup>

        <Pendentes>
          <Title>Últimas solicitações</Title>

          {propinasData.map((propina) => (
            <div key={propina.id} style={{ marginBottom: "12px" }}>
              <SimpleCard
                title={propina.title}
                status={propina.status}
                amount={propina.amount}
                onClick={() => handleConfirm}
              />
            </div>
          ))}
        </Pendentes>
        <BottomMenu/>
      </Container>
    </>
  );
}
