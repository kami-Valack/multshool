"use client";

import { useState } from "react";
import styled from "styled-components";
import Header from "@/components/ui/HeaderGeneral";
import BottomMenu from "@/components/ui/BottomMenu";
import Image from "next/image";
import Logotipo from "@/assets/payments-logo.png";
import Button from "@/components/ui/Button";
import { useNavigation } from "@/hooks/navigation";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  font-family: ${(props) => props.theme.fonts.family.poppins};
  width: 100%;
  padding-top: 30px;
`;

const Top = styled.div`
  width: 100%;
  height: 105px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const TopP = styled.div`
  font-size: 14px;
`;

const Title = styled.p`
  font-size: 14px;
  color: ${(props) => props.theme.colors.primary};
  font-weight: ${(props) => props.theme.fonts.weight.semibold};
`;

const Form = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 20px 0 0 0;
`;

const Input = styled.input`
  width: 90%;
  height: 45px;
  background: ${(props) => props.theme.colors.background_2};
  border: none;
  border-radius: 30px;
  padding: 0 0 0 30px;

  &:focus {
    border: none;
    outline: none;
  }
`;

const FormInn = styled.div`
  width: 90%;
`;

const ButtonGroup = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  margin-top: 40px;
`;

export default function PaymentQRScreen() {
  const { navigateTo } = useNavigation();
  const [referencia, setReferencia] = useState("");

  return (
    <>
      <Header variant="withBack" title="Pagamentos - Ref." />
      <Container>
        <Top>
          <Image src={Logotipo.src} width={120} height={75} alt="" />
          <TopP>Pagamento por referência</TopP>
        </Top>

        <Form>
          <FormInn>
            <Title>Entidade</Title>
            <Input />
          </FormInn>
          <FormInn>
            <Title>Referência</Title>
            <Input
              value={referencia}
              onChange={(e) => setReferencia(e.target.value)}
            />
          </FormInn>
        </Form>

        <ButtonGroup>
          <Button
            bgColor="primary"
            textColor="#FFFFFF"
            text="Efectuar o pagamento"
            hasBorder={true}
            onClick={() => {
              navigateTo(
                `/estudante/cartoes/credito/pagamentos/method/${referencia}`
              );
            }}
          />
        </ButtonGroup>

        <BottomMenu />
      </Container>
    </>
  );
}
