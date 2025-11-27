"use client";

import { useParams } from "next/navigation";
import styled from "styled-components";
import Header from "@/components/ui/HeaderGeneral";
import BottomMenu from "@/components/ui/BottomMenu";
import { useNavigation } from "@/hooks/navigation";
import { useEffect, useState } from "react";

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: ${(props) => props.theme.fonts.family.poppins};
  background: #f5f7ff;
  padding-top: 20px;
  padding-bottom: 100px;
`;

const Top = styled.div`
  width: 100%;
  background: #f5f7ff;
`;

const SuccessCard = styled.div`
  width: 85%;
  max-width: 400px;
  background: white;
  border-radius: 20px;
  padding: 20px 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const CheckIconWrapper = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: #e8e8f5;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 5px;
`;

const CheckIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`;

const SuccessText = styled.p`
  font-size: 14px;
  color: #333;
  margin-bottom: 10px;
  font-weight: 400;
`;

const AmountText = styled.h2`
  font-size: 20px;
  color: ${(props) => props.theme.colors.primary};
  font-weight: 600;
  margin: 0;
`;

const DetailsCard = styled.div`
  width: 85%;
  max-width: 400px;
  background: white;
  border-radius: 20px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  margin-top: 30px;
`;

const DetailsHeader = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const DetailsTitle = styled.h3`
  font-size: 16px;
  color: ${(props) => props.theme.colors.textBlack};
  font-weight: 400;
  margin: 0;
`;

const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #f0f0f0;

  &:last-child {
    border-bottom: none;
  }
`;

const DetailLabel = styled.span`
  font-size: 13px;
  color: #666;
  font-weight: 400;
`;

const DetailValue = styled.span`
  font-size: 13px;
  color: #333;
  font-weight: 500;
  text-align: right;
  max-width: 60%;
`;

const TotalValue = styled.span`
  font-size: 15px;
  color: #00c853;
  font-weight: 600;
`;

const ReportCard = styled.div`
  width: 85%;
  max-width: 400px;
  background: white;
  border-radius: 20px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #fafafa;
  }
`;

const ReportContent = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const IconCircle = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #f5f7ff;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6b7dff;
`;

const ReportText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const ReportTitle = styled.span`
  font-size: 14px;
  color: #333;
  font-weight: 600;
`;

const ReportSubtitle = styled.span`
  font-size: 12px;
  color: #999;
  font-weight: 400;
`;

export default function ReciboPage() {
  const { proof } = useParams();
  const { navigateTo } = useNavigation();
  const [receipt, setReceipt] = useState<any>(null);

  useEffect(() => {
    const stored = localStorage.getItem(`transfer-proof-${proof}`);
    if (stored) setReceipt(JSON.parse(stored));
  }, [proof]);

  if (!receipt) {
    return (
      <Container>
        <Top>
          <Header variant="receipt" title="Comprovativo" />
        </Top>
        <p style={{ marginTop: "50px", color: "#777" }}>
          ⚠️ Comprovativo não encontrado.
        </p>
      </Container>
    );
  }

  return (
    <>
      <Top>
        <Header variant="receipt" title="Comprovativo" />
      </Top>

      <Container>
        <SuccessCard>
          <CheckIconWrapper>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 24 24"
            >
              <path
                fill="#6C5F8D"
                d="m10.6 16.6l7.05-7.05l-1.4-1.4l-5.65 5.65l-2.85-2.85l-1.4 1.4l4.25 4.25ZM12 22q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22Z"
              />
            </svg>
          </CheckIconWrapper>
          <SuccessText>Transferência realizada com sucesso!</SuccessText>
          <AmountText>{receipt.amount} kz</AmountText>
        </SuccessCard>

        <DetailsCard>
          <DetailsHeader>
            <DetailsTitle>Detalhes da transferência</DetailsTitle>
          </DetailsHeader>

          <DetailRow>
            <DetailLabel>Número do cartão</DetailLabel>
            <DetailValue>{receipt.recipientCard}</DetailValue>
          </DetailRow>

          <DetailRow>
            <DetailLabel>Destinatário</DetailLabel>
            <DetailValue>{receipt.recipientName}</DetailValue>
          </DetailRow>

          <DetailRow>
            <DetailLabel>Tipo de operação</DetailLabel>
            <DetailValue>{receipt.transferType}</DetailValue>
          </DetailRow>

          <DetailRow>
            <DetailLabel>Data</DetailLabel>
            <DetailValue>{receipt.date}</DetailValue>
          </DetailRow>

          <DetailRow>
            <DetailLabel>Total</DetailLabel>
            <TotalValue>{receipt.amount} kz</TotalValue>
          </DetailRow>
        </DetailsCard>

        <ReportCard
          onClick={() =>
            navigateTo("/estudante/cartoes/credito/pagamentos/report")
          }
        >
          <ReportContent>
            <IconCircle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#6C5F8D"
                  d="M11.95 18q.525 0 .888-.363t.362-.887q0-.525-.362-.888t-.888-.362q-.525 0-.887.363t-.363.887q0 .525.363.888t.887.362Zm-.9-3.85h1.85q0-.825.188-1.3t1.062-1.3q.65-.65 1.025-1.238T15.55 8.9q0-1.4-1.025-2.15T12.1 6q-1.425 0-2.313.75T8.55 8.55l1.65.65q.125-.45.563-.975T12.1 7.7q.8 0 1.2.438t.4.962q0 .5-.3.938t-.75.812q-1.1.975-1.35 1.475t-.25 1.825ZM12 22q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22Zm0-2q3.35 0 5.675-2.325T20 12q0-3.35-2.325-5.675T12 4Q8.65 4 6.325 6.325T4 12q0 3.35 2.325 5.675T12 20Zm0-8Z"
                />
              </svg>
            </IconCircle>
            <ReportText>
              <ReportTitle>Reportar problema</ReportTitle>
              <ReportSubtitle>Conta-nos o que aconteceu!</ReportSubtitle>
            </ReportText>
          </ReportContent>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="15"
            viewBox="0 0 24 24"
          >
            <path
              fill="#6C5F8D"
              d="m14.475 12l-7.35-7.35q-.375-.375-.363-.888t.388-.887q.375-.375.888-.375t.887.375l7.675 7.7q.3.3.45.675t.15.75q0 .375-.15.75t-.45.675l-7.7 7.7q-.375.375-.875.363T7.15 21.1q-.375-.375-.375-.888t.375-.887L14.475 12Z"
            />
          </svg>
        </ReportCard>

        <BottomMenu />
      </Container>
    </>
  );
}
