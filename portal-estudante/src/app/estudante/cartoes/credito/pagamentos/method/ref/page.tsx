"use client";

import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import Header from "@/components/ui/HeaderGeneral";
import BottomMenu from "@/components/ui/BottomMenu";
import Image from "next/image";
import Logotipo from "@/assets/payments-logo.png";
import Button from "@/components/ui/Button";
import { useNavigation } from "@/hooks/navigation";
import { useSearchParams } from "next/navigation";
import {
  paymentService,
  PaymentIntent,
  PaymentReference,
} from "@/services/paymentService";
import {
  MobileChargeField,
  isValidChargeMobile,
} from "@/components/payments/MobileChargeField";
import {
  BILLING_MOBILE_STORAGE_KEY,
  formatAngolaMobileDisplay,
  normalizeAngolaMobile,
} from "@/utils/angolaPhone";
import { useAuth } from "@/contexts/AuthContext";

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
  gap: 10px;
`;

const Message = styled.p`
  width: 90%;
  font-size: 13px;
  text-align: center;
  color: ${(props) => props.theme.colors.foreground};
`;

export default function PaymentReferenceScreen() {
  const { navigateTo } = useNavigation();
  const searchParams = useSearchParams();
  const intentId = searchParams.get("intentId");
  const { user } = useAuth();

  const [entidade, setEntidade] = useState("");
  const [referencia, setReferencia] = useState("");
  const [amount, setAmount] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mobileLocal, setMobileLocal] = useState("");
  const [mobileError, setMobileError] = useState<string | null>(null);
  const [chargeNotice, setChargeNotice] = useState<string | null>(null);
  const [referenceReady, setReferenceReady] = useState(false);

  const applyReference = useCallback(
    (intent: PaymentIntent, ref: PaymentReference) => {
      setEntidade(ref.entidade || "");
      setReferencia(ref.nu_referencia || "");
      setAmount(ref.vl_referencia ?? intent.amount);
      setReferenceReady(true);
    },
    []
  );

  useEffect(() => {
    if (!intentId) return;

    const stored = sessionStorage.getItem(BILLING_MOBILE_STORAGE_KEY(intentId));
    if (stored) {
      const nine = normalizeAngolaMobile(stored);
      if (nine) setMobileLocal(nine);
    }

    let cancelled = false;

    async function loadExisting() {
      setLoading(true);
      setError(null);
      try {
        const intent = await paymentService.getPaymentIntent(intentId);
        if (cancelled) return;

        if (intent.reference?.nu_referencia) {
          applyReference(intent, intent.reference);
          setChargeNotice(
            "Referência já gerada. Se não recebeu a cobrança no telemóvel, pague manualmente com os dados abaixo."
          );
        }
      } catch (e) {
        if (!cancelled) {
          setError(
            e instanceof Error ? e.message : "Erro ao carregar pagamento"
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadExisting();
    return () => {
      cancelled = true;
    };
  }, [intentId, applyReference]);

  const handleGenerateReference = async () => {
    if (!intentId) return;

    const normalized =
      normalizeAngolaMobile(mobileLocal) ||
      sessionStorage.getItem(BILLING_MOBILE_STORAGE_KEY(intentId));

    if (!normalized || !isValidChargeMobile(mobileLocal)) {
      setMobileError(
        "Indique o telemóvel onde quer receber a cobrança GPO (9 dígitos)."
      );
      return;
    }

    setMobileError(null);
    setLoading(true);
    setError(null);

    try {
      sessionStorage.setItem(BILLING_MOBILE_STORAGE_KEY(intentId), normalized);

      const { payment_intent, reference, message, charge_sent } =
        await paymentService.issueReference(intentId, {
          mobile_phone: normalized,
          recipient_name: user?.name,
        });

      applyReference(payment_intent, reference);
      setChargeNotice(
        message ||
          (charge_sent
            ? `Cobrança enviada para ${formatAngolaMobileDisplay(normalized)}.`
            : "Referência gerada. Confirme o pagamento no telemóvel ou no Multicaixa.")
      );
    } catch (e) {
      setError(
        e instanceof Error
          ? e.message
          : "Não foi possível gerar referência. Verifique a sessão FACIPAY."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCheckPayment = async () => {
    if (!intentId) return;
    setChecking(true);
    setError(null);
    try {
      const paidIntent = await paymentService.pollUntilPaid(intentId, {
        maxAttempts: 6,
        intervalMs: 4000,
      });
      const code =
        paidIntent.receipt_number || paidIntent.reference?.nu_referencia || intentId;
      navigateTo(
        `/estudante/cartoes/credito/pagamentos/method/confirmar?intentId=${intentId}&code=${encodeURIComponent(code)}`
      );
    } catch (e) {
      setError(e instanceof Error ? e.message : "Pagamento não confirmado");
    } finally {
      setChecking(false);
    }
  };

  if (!intentId) {
    return (
      <>
        <Header variant="withBack" title="Pagamentos - Ref." />
        <Container>
          <Message>Sessão inválida. Volte ao passo anterior.</Message>
          <BottomMenu />
        </Container>
      </>
    );
  }

  return (
    <>
      <Header variant="withBack" title="Pagamentos - Ref." />
      <Container>
        <Top>
          <Image src={Logotipo.src} width={120} height={75} alt="" />
          <TopP>Pagamento por referência</TopP>
        </Top>

        {loading && !referenceReady && <Message>A processar...</Message>}
        {error && <Message>{error}</Message>}
        {chargeNotice && referenceReady && (
          <Message style={{ color: "#059669" }}>{chargeNotice}</Message>
        )}

        {!referenceReady && (
          <>
            <MobileChargeField
              value={mobileLocal}
              onChange={setMobileLocal}
              error={mobileError}
            />
            <ButtonGroup>
              <Button
                bgColor="primary"
                textColor="#FFFFFF"
                text={loading ? "A enviar..." : "Gerar referência e enviar cobrança"}
                hasBorder={true}
                onClick={handleGenerateReference}
                disabled={loading || !isValidChargeMobile(mobileLocal)}
              />
            </ButtonGroup>
          </>
        )}

        {referenceReady && (
          <>
            <Form>
              <FormInn>
                <Title>Entidade</Title>
                <Input readOnly value={entidade} placeholder="—" />
              </FormInn>
              <FormInn>
                <Title>Referência</Title>
                <Input readOnly value={referencia} placeholder="—" />
              </FormInn>
              {amount != null && (
                <FormInn style={{ marginTop: 12 }}>
                  <Title>Valor</Title>
                  <Input
                    readOnly
                    value={`${amount.toLocaleString("pt-AO")} Kz`}
                  />
                </FormInn>
              )}
            </Form>

            <ButtonGroup>
              <Button
                bgColor="primary"
                textColor="#FFFFFF"
                text={checking ? "A verificar..." : "Já efectuei o pagamento"}
                hasBorder={true}
                onClick={handleCheckPayment}
                disabled={!referencia || loading || checking}
              />
              {process.env.NODE_ENV === "development" && (
                <Button
                  bgColor="#FFFFFF"
                  textColor="#897BB0"
                  text="Simular pagamento (dev)"
                  hasBorder={true}
                  onClick={async () => {
                    try {
                      await paymentService.simulatePaid(intentId);
                      await handleCheckPayment();
                    } catch (e) {
                      setError(
                        e instanceof Error ? e.message : "Erro na simulação"
                      );
                    }
                  }}
                />
              )}
            </ButtonGroup>
          </>
        )}

        <BottomMenu />
      </Container>
    </>
  );
}
