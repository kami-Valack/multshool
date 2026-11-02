"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import styled from "styled-components";
import BottomMenu from "@/components/ui/BottomMenu";
import Header from "@/components/ui/HeaderGeneral";
import CreditCard from "@/components/ui/Cards";
import Button from "@/components/ui/Button";
import { useNavigation } from "@/hooks/navigation";
import { studentService, Fee } from "@/services/studentService";
import { paymentService, PaymentIntent } from "@/services/paymentService";
import ProtectedRoute from "@/components/ProtectedRoute";
import {
  MobileChargeField,
  isValidChargeMobile,
} from "@/components/payments/MobileChargeField";
import {
  BILLING_MOBILE_STORAGE_KEY,
  normalizeAngolaMobile,
} from "@/utils/angolaPhone";

const Container = styled.div`
  width: 100%;
  min-height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: ${(props) => props.theme.fonts.family.poppins};
  margin-bottom: 150px;
`;

const Top = styled.div`
  width: 100%;
`;

const CardS = styled.div`
  width: 95%;
  margin-top: 10px;
`;

const DetailsP = styled.div`
  width: 95%;
  background: ${(props) => props.theme.colors.background_2};
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
  border-radius: 10px;
  padding: 16px 0 24px;
`;

const Title = styled.p`
  font-size: 14px;
  font-weight: ${(props) => props.theme.fonts.weight.semibold};
`;

const Paragraph = styled.p`
  font-size: 13px;
  padding: 0 30px;
  text-align: center;
  color: ${(props) => props.theme.colors.foreground};
`;

const Total = styled.p`
  font-weight: ${(props) => props.theme.fonts.weight.bold};
  color: ${(props) => props.theme.colors.sucess};
  margin-top: 12px;
`;

const ButtonGroup = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 30px;
`;

export default function PagamentoDetalhe() {
  const { navigateTo } = useNavigation();
  const { id } = useParams();
  const feeId = String(id);

  const [fee, setFee] = useState<Fee | null>(null);
  const [intent, setIntent] = useState<PaymentIntent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [mobileLocal, setMobileLocal] = useState("");
  const [mobileError, setMobileError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const feeData = await studentService.getFee(feeId);
        if (cancelled) return;

        if (!feeData) {
          setError("Propina não encontrada.");
          return;
        }

        if (feeData.status === "paid") {
          setError("Esta propina já está paga.");
          setFee(feeData);
          return;
        }

        setFee(feeData);
        const intentData = await paymentService.createPaymentIntent({ fee_id: feeId });
        if (!cancelled) {
          setIntent(intentData);
        }
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : "Erro ao preparar pagamento");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [feeId]);

  const handleContinue = async () => {
    if (!intent) return;
    if (!isValidChargeMobile(mobileLocal)) {
      setMobileError("Indique um telemóvel angolano válido (9 dígitos, começa por 9).");
      return;
    }
    setMobileError(null);
    const normalized = normalizeAngolaMobile(mobileLocal);
    if (normalized) {
      sessionStorage.setItem(BILLING_MOBILE_STORAGE_KEY(intent.id), normalized);
    }
    setSubmitting(true);
    navigateTo(
      `/estudante/cartoes/credito/pagamentos/method?intentId=${intent.id}`
    );
  };

  return (
    <ProtectedRoute>
      <Container>
        <Top>
          <Header variant="withBack" title="Pagamentos" />
        </Top>
        <CardS>
          <CreditCard />
        </CardS>

        <DetailsP>
          <Title>Confirmar o pagamento</Title>

          {loading && <Paragraph>A carregar...</Paragraph>}
          {error && <Paragraph>{error}</Paragraph>}

          {!loading && fee && !error && (
            <>
              <Paragraph>{fee.description || "Propina"}</Paragraph>
              <Paragraph>
                Vencimento:{" "}
                {fee.due_date
                  ? new Date(fee.due_date).toLocaleDateString("pt-PT")
                  : "-"}
              </Paragraph>
              <Total>
                Total:{" "}
                {Number(fee.amount).toLocaleString("pt-AO", {
                  minimumFractionDigits: 0,
                })}{" "}
                Kz
              </Total>
            </>
          )}
        </DetailsP>

        {!loading && !error && intent && (
          <MobileChargeField
            value={mobileLocal}
            onChange={setMobileLocal}
            error={mobileError}
          />
        )}

        <ButtonGroup>
          <Button
            bgColor="primary"
            textColor="#FFFFFF"
            text={submitting ? "A processar..." : "Continuar"}
            hasBorder={true}
            onClick={handleContinue}
            disabled={
              !intent || !!error || loading || !isValidChargeMobile(mobileLocal)
            }
          />
        </ButtonGroup>

        <BottomMenu />
      </Container>
    </ProtectedRoute>
  );
}
