"use client";

import { useEffect, useState } from "react";
import styled from "styled-components";
import BottomMenu from "@/components/ui/BottomMenu";
import Header from "@/components/ui/HeaderGeneral";
import PaymentCard from "@/components/ui/CardsLista";
import Unicon from "@/assets/icons/cardsList/University.png";
import Transfer from "@/assets/icons/cardsList/transferencias.png";
import { SimpleCard } from "@/components/ActivityCard";
import { useRouter } from "next/navigation";
import { studentService, Fee, ExamFeeOverviewItem } from "@/services/studentService";
import { useAuth } from "@/contexts/AuthContext";
import { formatLocalDate, parseLocalDate } from "@/utils/dates";

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

const ListaP = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  text-align: left;
  margin: 20px 0 0 0;
`;

const Title = styled.p`
  font-size: 15px;
`;

const Row = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
`;

const Pendentes = styled.div`
  width: 90%;
  height: auto;
  display: flex;
  flex-direction: column;
  margin: 40px 0 130px 0;
  overflow-y: scroll;
`;

export default function Pagamentos() {
  const router = useRouter();
  const { user } = useAuth();
  const [fees, setFees] = useState<Fee[]>([]);
  const [exams, setExams] = useState<ExamFeeOverviewItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    Promise.all([
      studentService.getFees().catch(() => [] as Fee[]),
      studentService.getExamFeesOverview().catch(() => null),
    ])
      .then(([data, overview]) => {
        setFees(
          [...data].sort(
            (a, b) =>
              parseLocalDate(a.due_date).getTime() -
              parseLocalDate(b.due_date).getTime()
          )
        );
        setExams([...(overview?.pending || []), ...(overview?.paid || [])]);
      })
      .finally(() => setLoading(false));
  }, [user]);

  const handlePropinasClick = (fee: Fee) => {
    if (fee.status === "paid") return;
    router.push(`/estudante/cartoes/credito/pagamentos/${fee.id}`);
  };

  return (
    <Container>
      <Top>
        <Header variant="withBack" title="Pagamentos" />
      </Top>
      <ListaP>
        <Title>Lista de Pagamentos</Title>
        <Row>
          <PaymentCard
            icon={Unicon.src}
            title="Instituição"
            link="instituicao"
          />
          <PaymentCard
            icon={Transfer.src}
            title="Histórico"
            link="/estudante/cartoes/credito/pagamentos/historico"
          />
          <PaymentCard
            icon={Unicon.src}
            title="Eventos"
            link="/estudante/cartoes/credito/pagamentos/eventos"
          />
        </Row>
      </ListaP>
      <Pendentes>
        <Title>Propinas</Title>
        {loading && <p>A carregar...</p>}
        {!loading && fees.length === 0 && <p>Ainda não há propinas.</p>}
        {fees.map((fee) => {
          const due = formatLocalDate(fee.due_date);
          const status =
            fee.status === "paid"
              ? ("pagamento_adiado" as const)
              : fee.status === "overdue" ||
                  (fee.status === "pending" && parseLocalDate(fee.due_date) < new Date())
                ? ("em_atraso" as const)
                : ("pendente" as const);
          return (
            <div key={fee.id} style={{ marginBottom: "12px" }}>
              <SimpleCard
                title={`${fee.description || "Propina"}${due ? ` (${due})` : ""}`}
                status={status}
                amount={`${Number(fee.amount).toLocaleString("pt-PT")} kz`}
                onClick={() => handlePropinasClick(fee)}
              />
            </div>
          );
        })}
        <Title style={{ marginTop: 24 }}>Taxas de exame</Title>
        {!loading && exams.length === 0 && <p>Ainda não há taxas de exame.</p>}
        {exams.map((exam) => (
          <div key={exam.admission_exam_id} style={{ marginBottom: "12px" }}>
            <SimpleCard
              title={`${exam.exam_name} · ${exam.course_name}`}
              status={exam.fee_paid ? "pagamento_adiado" : "pendente"}
              amount={`${Number(exam.exam_fee).toLocaleString("pt-PT")} kz`}
              onClick={() => {
                if (exam.fee_paid) return;
                router.push(
                  `/estudante/cartoes/credito/pagamentos/exame/${exam.admission_exam_id}?courseId=${exam.course_id}`
                );
              }}
            />
          </div>
        ))}
      </Pendentes>

      <BottomMenu />
    </Container>
  );
}
