"use client";

import React from "react";
import styled from "styled-components";
import Header from "@/components/ui/HeaderGeneral";
import Button from "@/components/ui/Button";
import { useNavigation } from "@/hooks/navigation";
import { useParams } from "next/navigation";
import { mockPayments } from "@/mocks/confirmarPagamento";
import { calcularTotalPagamentos } from "@/utils/pagamentos";
import BottomMenu from "@/components/ui/BottomMenu";

const Container = styled.div`
  width: 100%;
  margin-bottom: 30px;
  font-family: ${(props) => props.theme.fonts.family.poppins};
  background: ${(props) => props.theme.colors.background_3};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InstitutionCard = styled.div`
  border-radius: 16px;
  padding: 11px;
  margin-bottom: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
`;

const InstitutionImage = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 12px;
  background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
  border: 5px solid #f59e0b;
  overflow: hidden;
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const InstitutionImagePlaceholder = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%);
  display: flex;
  align-items: center;
  justify-content: center;

  &::before {
    content: "🏫";
    font-size: 24px;
  }
`;

const InstitutionInfo = styled.div`
  flex: 1;
`;

const InstitutionName = styled.h3`
  font-size: 14px;
  font-weight: ${(props) => props.theme.fonts.weight.semibold};
  color: ${(props) => props.theme.colors.textBlack};
  margin: 0 0 8px 0;
  line-height: 1.3;
`;

const InstitutionAddress = styled.p`
  font-size: 13px;
  color: ${(props) => props.theme.colors.primary};
  margin: 0;
  font-weight: ${(props) => props.theme.fonts.weight.regular};
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

  &:last-of-type {
    margin-bottom: 0;
  }
`;

const PaymentLabel = styled.span`
  font-size: 15px;
  color: ${(props) => props.theme.colors.textBlack};
  font-weight: 400;
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

const TotalLabel = styled.div`
  text-align: center;
  font-size: 14px;
  color: ${(props) => props.theme.colors.foreground};
  margin-bottom: 8px;
`;

const TotalValue = styled.div`
  text-align: center;
  font-size: 22px;
  font-weight: ${(props) => props.theme.fonts.weight.semibold};
  color: ${(props) => props.theme.colors.primary};
`;

const ConfirmButton = styled.div`
  width: 100%;
  margin-bottom: 80px
`;

const Top = styled.div`
  width: 100%;
  background: #f5f7ff;
`;

export default function PaymentScreen() {
  const { navigateTo } = useNavigation();
  const { confirmar } = useParams();

  const payment = mockPayments.find((item) => item.referencia === confirmar);

  if (!payment) {
    return (
      <>
        <Top>
          <Header variant="receipt" title="Detalhes" />
        </Top>

        <Container>
          <PaymentDetails>
            <PaymentTitle>Confirmar o pagamento</PaymentTitle>

            <PaymentItem style={{ display: "flex", textAlign: "center" }}>
              Pagamento não encontrado!
            </PaymentItem>
          </PaymentDetails>

          <ConfirmButton>
            <Button
              bgColor="primary"
              textColor="#FFFFFF"
              text="Confirmar"
              hasBorder={false}
              onClick={() =>
                navigateTo(
                  `/estudante/cartoes/credito/pagamentos/report/${confirmar}`
                )
              }
            />
          </ConfirmButton>
          <BottomMenu />
        </Container>
      </>
    );
  }

  const total = calcularTotalPagamentos(payment.itens);

  return (
    <>
      <Top>
        <Header variant="receipt" title="Detalhes" />
      </Top>

      <Container>
        <InstitutionCard>
          <InstitutionImage>
            {payment.instituicao.image ? (
              <img
                src={payment.instituicao.image}
                alt={payment.instituicao.nome}
              />
            ) : (
              <InstitutionImagePlaceholder />
            )}
          </InstitutionImage>

          <InstitutionInfo>
            <InstitutionName>{payment.instituicao.nome}</InstitutionName>
            <InstitutionAddress>
              {payment.instituicao.endereco}
            </InstitutionAddress>
          </InstitutionInfo>
        </InstitutionCard>

        <PaymentDetails>
          <PaymentTitle>Confirmar o pagamento</PaymentTitle>

          {payment.itens.map((item, index) => (
            <PaymentItem key={index}>
              <PaymentLabel>{item.descricao}</PaymentLabel>
              <PaymentValue>
                {item.valor.toLocaleString("pt-PT")} kz
              </PaymentValue>
            </PaymentItem>
          ))}

          <TotalSection>
            <TotalLabel>Total</TotalLabel>
            <TotalValue>{total.toLocaleString("pt-PT")} kz</TotalValue>
          </TotalSection>
        </PaymentDetails>

        <ConfirmButton>
          <Button
            bgColor="primary"
            textColor="#FFFFFF"
            text="Confirmar"
            hasBorder={false}
            onClick={() =>
              navigateTo(
                `/estudante/cartoes/credito/pagamentos/receipt/${confirmar}`
              )
            }
          />
        </ConfirmButton>
        <BottomMenu />
      </Container>
    </>
  );
}
