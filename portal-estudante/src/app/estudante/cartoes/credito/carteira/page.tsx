"use client";

import styled from "styled-components";
import Header from "@/components/ui/HeaderGeneral";
import CreditCard from "@/components/ui/Cards";
import BottomMenu from "@/components/ui/BottomMenu";
import { mockCreditCard } from "@/mocks/contaMS";
import { useNavigation } from "@/hooks/navigation";
import Button from "@/components/ui/Button";


// Styled Components
const Container = styled.div`
  width: 100%;
  min-height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: ${(props) => props.theme.fonts.family.poppins};
  margin-bottom: 150px;
`;

const CardS = styled.div`
  width: 95%;
  margin-top: 10px;
`;
const AvSaldo = styled.div`
  width: 85%;
  background: ${(props) => props.theme.colors.background_2};
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  padding: 5px 20px;
`;

const Text1 = styled.p`
  font-size: 12px;
  font-weight: ${(props) => props.theme.fonts.weight.regular};
  color: ${(props) => props.theme.colors.textBlack};
`;

const Saldo = styled.p`
  font-size: 23px;
  font-weight: ${(props) => props.theme.fonts.weight.semibold};
  color: ${(props) => props.theme.colors.primary};
  margin-top: -5px;
`;

const ButtonGroup = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 30px;
`;

export default function InformacoesCard() {
  const { navigateTo } = useNavigation();

  return (
    <>
      <Header variant="withBack" title="Carteira" />

      <Container>
        <CardS>
          <CreditCard />
        </CardS>

        <AvSaldo
          onClick={() => {
            navigateTo(`/estudante/cartoes/credito/carteira`);
          }}
        >
          <Text1>Saldo disponível</Text1>
          <Saldo>{mockCreditCard.balance},00 kz</Saldo>
        </AvSaldo>
        <ButtonGroup>
          <Button
            bgColor="primary"
            textColor="#FFFFFF"
            text="Continuar"
            hasBorder={true}
            onClick={() => {
              navigateTo(
                `/estudante/cartoes/credito/carteira/recarregar`
              );
            }}
          />
        </ButtonGroup>
        <BottomMenu />
      </Container>
    </>
  );
}
