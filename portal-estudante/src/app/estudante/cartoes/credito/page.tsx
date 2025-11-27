"use client";

import BottomMenu from "@/components/ui/BottomMenu";
import CreditCard from "@/components/ui/Cards";
import Header from "@/components/ui/HeaderGeneral";
import { useNavigation } from "@/hooks/navigation";
import styled from "styled-components";
import { useState } from "react";
import MenuGrid, { MenuSectionSimple } from "@/components/ui/menuGrid";
import { mockCreditCard } from "@/mocks/contaMS";
import Image from "next/image";
import Wallet from "@/assets/icons/wallet_primary.png";
import BgCard from "@/assets/backgrounds/bg_welcome.jpeg";
import { useRouter } from "next/navigation";

// Styled components
const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Top = styled.div`
  width: 100%;
`;

const Info = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 30px;
  margin-bottom: 120px;
  font-family: ${(props) => props.theme.fonts.family.poppins};
`;

const MenuC = styled.div`
  margin-top: -30px;
`;

const Conta = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;
`;

const AvSaldo = styled.div`
  width: 40%;
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
  font-size: 19px;
  font-weight: ${(props) => props.theme.fonts.weight.semibold};
  color: ${(props) => props.theme.colors.primary};
  margin-top: -5px;
`;

const Creditos = styled.div`
  width: 25%;
  background: ${(props) => props.theme.colors.background_2};
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  padding: 15px 20px;
  align-items: center;
  justify-content: center;
`;

const Icon = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Text2 = styled.p`
  font-size: 12px;
  font-weight: ${(props) => props.theme.fonts.weight.regular};
  color: ${(props) => props.theme.colors.textBlack};
`;

const Card = styled.div`
  width: 100%;
  height: 20vh;
  border-radius: 20px;
  background: #339ed4;
  display: flex;
`;

const Side1 = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  position: relative;
  left: 7%;
  top: 1%;
`;

const Txt_1 = styled.p`
  font-size: 17px;
  font-weight: ${(props) => props.theme.fonts.weight.semibold};
  color: ${(props) => props.theme.colors.textWhite};
`;

const Subtitle = styled.p`
  font-size: 11px;
  font-weight: ${(props) => props.theme.fonts.weight.light};
  color: ${(props) => props.theme.colors.textWhite};
  margin: -10px 0 0 0;
`;

const Subtitle_2 = styled.p`
  font-size: 14px;
  font-weight: ${(props) => props.theme.fonts.weight.regular};
  color: ${(props) => props.theme.colors.textWhite};
`;

const Side2 = styled.div`
  width: 50%;
  height: 100%;
  background: url(${BgCard.src});
  background-size: cover;
  border-radius: 0 20px 20px 0;
`;

export default function Consulta({}) {
  const [activeSection, setActiveSection] =
    useState<MenuSectionSimple>("movimentos");
  const router = useRouter();

  const handleSectionClick = () => {
    router.push(`/cartoes/creditos`);
  };

  const { navigateTo } = useNavigation();


  return (
    <>
      <Container>
        <Top>
          <Header variant="withBack" title="Consulta"></Header>
        </Top>

        <Info>
          <CreditCard />
          <MenuC>
            <MenuGrid
              variant="simple"
              activeSection={activeSection}
              onSectionChange={setActiveSection}
            />
          </MenuC>

          <Conta>
            <AvSaldo
              onClick={() => {
                navigateTo(`/estudante/cartoes/credito/carteira`);
              }}
            >
              <Text1>Saldo disponível</Text1>
              <Saldo>{mockCreditCard.balance},00 kz</Saldo>
            </AvSaldo>

            <Creditos
              onClick={() => {
                navigateTo(`/estudante/cartoes/credito/creditosms`);
              }}
            >
              <Icon>
                <Image
                  src={Wallet}
                  width={25}
                  height={25}
                  alt="Ícone Carteira"
                />
              </Icon>
              <Text2>Créditos</Text2>
            </Creditos>
          </Conta>

          <Card>
            <Side1>
              <Txt_1>Multischool Empreendedor</Txt_1>
              <Subtitle>Cria a tua fonte fonte extra!</Subtitle>
              <Subtitle_2>BREVEMENTE</Subtitle_2>
            </Side1>
            <Side2 />
          </Card>
        </Info>
        <BottomMenu />
      </Container>
    </>
  );
}
