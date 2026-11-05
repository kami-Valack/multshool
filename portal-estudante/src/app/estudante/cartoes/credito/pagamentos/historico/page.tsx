"use client";

import { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "@/components/ui/HeaderGeneral";
import BottomMenu from "@/components/ui/BottomMenu";
import { paymentService, PaymentIntent } from "@/services/paymentService";
import { formatLocalDate } from "@/utils/dates";

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: ${(props) => props.theme.fonts.family.poppins};
  padding-bottom: 120px;
`;

const List = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 16px;
`;

const Row = styled.div`
  background: ${(props) => props.theme.colors.background_2};
  border-radius: 12px;
  padding: 14px 16px;
  display: flex;
  justify-content: space-between;
  gap: 12px;
`;

const labelFor = (type?: string) => {
  if (type === "exam_fee") return "Taxa de exame";
  if (type === "event") return "Evento";
  return "Propina";
};

export default function HistoricoPagamentosPage() {
  const [items, setItems] = useState<PaymentIntent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    paymentService
      .listPaymentIntents()
      .then((list) => setItems(list.filter((item) => item.status === "paid")))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Container>
      <Header variant="withBack" title="Histórico" />
      <List>
        {loading && <p>A carregar...</p>}
        {!loading && items.length === 0 && <p>Ainda não há dados</p>}
        {items.map((item) => (
          <Row key={item.id}>
            <div>
              <strong>{labelFor(item.payable_type)}</strong>
              <p style={{ margin: "4px 0 0", fontSize: 13 }}>{item.description}</p>
              <p style={{ margin: "4px 0 0", fontSize: 12 }}>
                {formatLocalDate(item.paid_at || item.created_at)}
                {item.receipt_number ? ` · ${item.receipt_number}` : ""}
              </p>
            </div>
            <span>{Number(item.amount).toLocaleString("pt-PT")} kz</span>
          </Row>
        ))}
      </List>
      <BottomMenu />
    </Container>
  );
}
