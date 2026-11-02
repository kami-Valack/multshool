"use client";

import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import styled from "styled-components";
import BottomMenu from "@/components/ui/BottomMenu";
import Header from "@/components/ui/HeaderGeneral";
import CreditCard from "@/components/ui/Cards";
import Button from "@/components/ui/Button";
import { useNavigation } from "@/hooks/navigation";
import { paymentService, PaymentIntent } from "@/services/paymentService";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/contexts/AuthContext";

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

type ExamPreview = {
  name: string;
  exam_fee: number;
  course_name?: string;
};

export default function PagamentoTaxaExame() {
  const { navigateTo } = useNavigation();
  const { user } = useAuth();
  const { admissionExamId } = useParams();
  const searchParams = useSearchParams();
  const examId = String(admissionExamId);
  const courseId = searchParams.get("courseId") || "";

  const [exam, setExam] = useState<ExamPreview | null>(null);
  const [intent, setIntent] = useState<PaymentIntent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      if (!courseId) {
        setError("Curso inválido. Volte e tente novamente.");
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);
      try {
        const intentData = await paymentService.createPaymentIntent({
          admission_exam_id: examId,
          course_id: courseId,
          student_name: user?.name,
        });
        if (cancelled) return;

        setIntent(intentData);
        setExam({
          name: intentData.description || "Taxa de exame de admissão",
          exam_fee: intentData.amount,
        });
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
  }, [examId, courseId, user?.name]);

  const handleContinue = async () => {
    if (!intent) return;
    setSubmitting(true);
    navigateTo(
      `/estudante/cartoes/credito/pagamentos/method?intentId=${intent.id}`
    );
  };

  return (
    <ProtectedRoute>
      <Container>
        <Top>
          <Header variant="withBack" title="Taxa de exame" />
        </Top>
        <CardS>
          <CreditCard />
        </CardS>

        <DetailsP>
          <Title>Confirmar pagamento da taxa</Title>

          {loading && <Paragraph>A carregar...</Paragraph>}
          {error && <Paragraph>{error}</Paragraph>}

          {!loading && exam && !error && (
            <>
              <Paragraph>{exam.name}</Paragraph>
              <Total>
                Total:{" "}
                {Number(exam.exam_fee).toLocaleString("pt-AO", {
                  minimumFractionDigits: 0,
                })}{" "}
                Kz
              </Total>
            </>
          )}
        </DetailsP>

        <ButtonGroup>
          <Button
            bgColor="primary"
            textColor="#FFFFFF"
            text={submitting ? "A processar..." : "Continuar"}
            hasBorder={true}
            onClick={handleContinue}
            disabled={!intent || !!error || loading}
          />
        </ButtonGroup>

        <BottomMenu />
      </Container>
    </ProtectedRoute>
  );
}
