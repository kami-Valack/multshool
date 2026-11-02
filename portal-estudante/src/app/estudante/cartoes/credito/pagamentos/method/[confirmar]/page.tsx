"use client";

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "@/components/ui/HeaderGeneral";
import Button from "@/components/ui/Button";
import { useNavigation } from "@/hooks/navigation";
import { useParams, useSearchParams } from "next/navigation";
import BottomMenu from "@/components/ui/BottomMenu";
import { paymentService, PaymentIntent } from "@/services/paymentService";

const Container = styled.div`
  width: 100%;
  margin-bottom: 30px;
  font-family: ${(props) => props.theme.fonts.family.poppins};
  background: ${(props) => props.theme.colors.background_3};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PaymentDetails = styled.div`
  width: 85%;
  background: ${(props) => props.theme.colors.background};
  border-radius: 16px;
  padding: 24px 20px;
  margin-bottom: 40px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
`;

const PaymentTitle = styled.h3`
  font-size: 18px;
  font-weight: ${(props) => props.theme.fonts.weight.semibold};
  color: ${(props) => props.theme.colors.primary};
  text-align: center;
  margin: 0 0 30px 0;
`;

const PaymentItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const PaymentLabel = styled.span`
  font-size: 15px;
  color: ${(props) => props.theme.colors.textBlack};
`;

const PaymentValue = styled.span`
  font-size: 15px;
  color: ${(props) => props.theme.colors.primary};
  font-weight: 600;
`;

const TotalSection = styled.div`
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid #e5e7eb;
`;

const TotalValue = styled.div`
  text-align: center;
  font-size: 22px;
  font-weight: ${(props) => props.theme.fonts.weight.semibold};
  color: ${(props) => props.theme.colors.primary};
`;

const ConfirmButton = styled.div`
  width: 100%;
  margin-bottom: 80px;
`;

const Top = styled.div`
  width: 100%;
  background: #f5f7ff;
`;

const Message = styled.p`
  text-align: center;
  padding: 24px;
  color: ${(props) => props.theme.colors.foreground};
`;

export default function PaymentConfirmScreen() {
  const { navigateTo } = useNavigation();
  const searchParams = useSearchParams();
  const intentId = searchParams.get("intentId");
  const receiptCode = searchParams.get("code");

  const [intent, setIntent] = useState<PaymentIntent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!intentId) {
      setLoading(false);
      return;
    }

    paymentService
      .getPaymentIntent(intentId)
      .then(setIntent)
      .catch((e) =>
        setError(e instanceof Error ? e.message : "Erro ao carregar pagamento")
      )
      .finally(() => setLoading(false));
  }, [intentId]);

  if (!intentId) {
    return (
      <>
        <Top>
          <Header variant="receipt" title="Detalhes" />
        </Top>
        <Container>
          <Message>Pagamento não encontrado.</Message>
          <BottomMenu />
        </Container>
      </>
    );
  }

  if (loading) {
    return (
      <>
        <Top>
          <Header variant="receipt" title="Detalhes" />
        </Top>
        <Container>
          <Message>A carregar...</Message>
          <BottomMenu />
        </Container>
      </>
    );
  }

  if (error || !intent) {
    return (
      <>
        <Top>
          <Header variant="receipt" title="Detalhes" />
        </Top>
        <Container>
          <Message>{error || "Pagamento não encontrado."}</Message>
          <BottomMenu />
        </Container>
      </>
    );
  }

  const code =
    receiptCode ||
    intent.receipt_number ||
    intent.reference?.nu_referencia ||
    intent.id;

  return (
    <>
      <Top>
        <Header variant="receipt" title="Detalhes" />
      </Top>

      <Container>
        <PaymentDetails>
          <PaymentTitle>Pagamento confirmado</PaymentTitle>

          <PaymentItem>
            <PaymentLabel>Descrição</PaymentLabel>
            <PaymentValue>{intent.description || "Propina"}</PaymentValue>
          </PaymentItem>

          {intent.reference?.nu_referencia && (
            <PaymentItem>
              <PaymentLabel>Referência</PaymentLabel>
              <PaymentValue>{intent.reference.nu_referencia}</PaymentValue>
            </PaymentItem>
          )}

          <TotalSection>
            <TotalValue>
              {intent.amount.toLocaleString("pt-AO")} {intent.currency || "Kz"}
            </TotalValue>
          </TotalSection>
        </PaymentDetails>

        <ConfirmButton>
          <Button
            bgColor="primary"
            textColor="#FFFFFF"
            text="Ver recibo"
            hasBorder={false}
            onClick={() =>
              navigateTo(
                `/estudante/cartoes/credito/pagamentos/receipt/${encodeURIComponent(code)}?intentId=${intentId}`
              )
            }
          />
        </ConfirmButton>
        <BottomMenu />
      </Container>
    </>
  );
}
