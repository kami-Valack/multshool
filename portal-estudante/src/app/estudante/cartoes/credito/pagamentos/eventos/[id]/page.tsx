"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import styled from "styled-components";
import Header from "@/components/ui/HeaderGeneral";
import BottomMenu from "@/components/ui/BottomMenu";
import Button from "@/components/ui/Button";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigation } from "@/hooks/navigation";
import { paymentService, PaymentIntent } from "@/services/paymentService";
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
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: ${(props) => props.theme.fonts.family.poppins};
  padding-bottom: 140px;
`;

const Box = styled.div`
  width: 90%;
  margin-top: 16px;
  text-align: center;
`;

export default function PagarEventoPage() {
  const { id } = useParams();
  const eventId = String(id);
  const { user } = useAuth();
  const { navigateTo } = useNavigation();
  const [intent, setIntent] = useState<PaymentIntent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mobileLocal, setMobileLocal] = useState("");
  const [mobileError, setMobileError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    paymentService
      .createPaymentIntent({ event_id: eventId, student_name: user?.name })
      .then((data) => {
        if (!cancelled) setIntent(data);
      })
      .catch((e) => {
        if (!cancelled) setError(e instanceof Error ? e.message : "Erro ao preparar pagamento");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [eventId, user?.name]);

  const continuar = () => {
    if (!intent) return;
    if (!isValidChargeMobile(mobileLocal)) {
      setMobileError("Indique um telemóvel angolano válido (9 dígitos, começa por 9).");
      return;
    }
    const normalized = normalizeAngolaMobile(mobileLocal);
    if (normalized) {
      sessionStorage.setItem(BILLING_MOBILE_STORAGE_KEY(intent.id), normalized);
    }
    navigateTo(`/estudante/cartoes/credito/pagamentos/method?intentId=${intent.id}`);
  };

  return (
    <ProtectedRoute>
      <Container>
        <Header variant="withBack" title="Pagar evento" />
        <Box>
          {loading && <p>A carregar...</p>}
          {error && <p>{error}</p>}
          {intent && (
            <>
              <p>{intent.description}</p>
              <p>
                <strong>
                  {Number(intent.amount).toLocaleString("pt-PT")} kz
                </strong>
              </p>
            </>
          )}
        </Box>
        {intent && !error && (
          <MobileChargeField
            value={mobileLocal}
            onChange={setMobileLocal}
            error={mobileError}
          />
        )}
        {intent && (
          <div style={{ width: "90%", marginTop: 16 }}>
            <Button
              bgColor="primary"
              textColor="#FFFFFF"
              text="Continuar"
              onClick={continuar}
              disabled={!isValidChargeMobile(mobileLocal)}
            />
          </div>
        )}
        <BottomMenu />
      </Container>
    </ProtectedRoute>
  );
}
