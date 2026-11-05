"use client";

import styled from "styled-components";
import { useRouter } from "next/navigation";
import { useExamFeeGate } from "@/contexts/ExamFeeGateContext";

const Banner = styled.div`
  width: 100%;
  background: linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%);
  color: #fff;
  padding: 14px 16px;
  border-radius: 12px;
  margin-bottom: 16px;
  box-sizing: border-box;
`;

const Title = styled.p`
  margin: 0 0 6px;
  font-size: 14px;
  font-weight: 600;
`;

const Counts = styled.p`
  margin: 0 0 10px;
  font-size: 13px;
  opacity: 0.95;
`;

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Item = styled.li`
  background: rgba(255, 255, 255, 0.12);
  border-radius: 8px;
  padding: 10px 12px;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const ItemTitle = styled.span`
  font-size: 13px;
  font-weight: 600;
`;

const ItemMeta = styled.span`
  font-size: 12px;
  opacity: 0.9;
`;

const PayBtn = styled.button`
  align-self: flex-start;
  margin-top: 4px;
  border: none;
  border-radius: 8px;
  padding: 8px 12px;
  background: #10b981;
  color: #fff;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
`;

const Hint = styled.p`
  margin: 12px 0 0;
  font-size: 12px;
  opacity: 0.9;
  line-height: 1.4;
`;

const LinkBtn = styled.button`
  background: none;
  border: none;
  color: #fde68a;
  text-decoration: underline;
  font-size: 12px;
  cursor: pointer;
  padding: 0;
`;

export default function ExamFeesBanner() {
  const router = useRouter();
  const { pending, pendingCount, paidCount, hasPendingExamFees, loading } =
    useExamFeeGate();

  if (loading || !hasPendingExamFees) {
    return null;
  }

  return (
    <Banner>
      <Title>Taxas de exame de admissão</Title>
      <Counts>
        {pendingCount > 0
          ? `${pendingCount} exame${pendingCount === 1 ? "" : "s"} por pagar`
          : "Todas as taxas de exame estão pagas"}
        {paidCount > 0 ? ` · ${paidCount} pago${paidCount === 1 ? "" : "s"}` : ""}
      </Counts>

      {pending.length > 0 && (
        <List>
          {pending.map((item) => (
            <Item key={item.admission_exam_id}>
              <ItemTitle>{item.exam_name}</ItemTitle>
              <ItemMeta>
                {item.course_name} ·{" "}
                {Number(item.exam_fee).toLocaleString("pt-AO")} Kz
              </ItemMeta>
              <PayBtn
                type="button"
                onClick={() =>
                  router.push(
                    `/estudante/cartoes/credito/pagamentos/exame/${item.admission_exam_id}?courseId=${item.course_id}`
                  )
                }
              >
                Pagar agora
              </PayBtn>
            </Item>
          ))}
        </List>
      )}

      <Hint>
        Enquanto houver taxas por pagar, a app fica limitada ao pagamento e a
        candidatar-se a mais cursos.{" "}
        <LinkBtn type="button" onClick={() => router.push("/instituicoes/superior")}>
          Ver cursos
        </LinkBtn>
      </Hint>
    </Banner>
  );
}
