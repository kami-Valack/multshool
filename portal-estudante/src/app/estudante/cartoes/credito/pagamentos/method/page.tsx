"use client";

import styled from "styled-components";
import Header from "@/components/ui/HeaderGeneral";
import BottomMenu from "@/components/ui/BottomMenu";
import { CreditCard } from "@/components/ui/Cards";
import Button from "@/components/ui/Button";
import { useNavigation } from "@/hooks/navigation";
import { useSearchParams } from "next/navigation";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: ${(props) => props.theme.fonts.family.poppins};
`;

const ButtonGroup = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 30px;
`;
const Card = styled.div`
  width: 95%;
  display: flex;
  flex-direction: column;
  margin: 20px auto 0 auto;
`;

export default function EscolherMetodoPagamento() {
  const { navigateTo } = useNavigation();
  const searchParams = useSearchParams();
  const intentId = searchParams.get("intentId");

  const qs = intentId ? `?intentId=${intentId}` : "";

  if (!intentId) {
    return (
      <>
        <Header variant="withBack" title="Pagamentos" />
        <Container>
          <p style={{ padding: 24, textAlign: "center" }}>
            Sessão de pagamento inválida. Volte às propinas e seleccione uma
            cobrança.
          </p>
          <BottomMenu />
        </Container>
      </>
    );
  }

  return (
    <>
      <Header variant="withBack" title="Pagamentos" />

      <Card>
        <CreditCard />
      </Card>

      <Container>
        <ButtonGroup>
          <Button
            bgColor="primary"
            textColor="#FFFFFF"
            text="Pagamento por referência"
            hasBorder={true}
            onClick={() => {
              navigateTo(
                `/estudante/cartoes/credito/pagamentos/method/ref${qs}`
              );
            }}
          />
          <Button
            bgColor="#FFFFFF"
            textColor="#897BB0"
            text="Pagamento via QR code"
            hasBorder={true}
            onClick={() => {
              navigateTo(
                `/estudante/cartoes/credito/pagamentos/method/qrcode${qs}`
              );
            }}
          />
        </ButtonGroup>
        <BottomMenu />
      </Container>
    </>
  );
}
