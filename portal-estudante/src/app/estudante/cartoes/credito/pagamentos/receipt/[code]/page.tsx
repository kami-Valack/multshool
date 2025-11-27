"use client";

import { useParams } from "next/navigation";
import styled from "styled-components";
import Header from "@/components/ui/HeaderGeneral";
import BottomMenu from "@/components/ui/BottomMenu";
import { mockReceipts } from "@/mocks/receipt";
import { useNavigation } from "@/hooks/navigation";

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
  font-weight: ${(props) => props.theme.fonts.weight.regular};
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

const StatusBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 13px;
  color: #00c853;
  font-weight: 500;
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
  const { code } = useParams();
  const { navigateTo } = useNavigation();

  // Buscar o recibo no mock com base na referência
  const receipt = mockReceipts.find((r) => r.reference === code);

  if (!receipt) {
    return (
      <Container>
        <Top>
          <Header variant="receipt" title="Recibo" />
        </Top>
        <p style={{ marginTop: "50px", color: "#777" }}>
          ⚠️ Recibo não encontrado.
        </p>
      </Container>
    );
  }

  return (
    <>
      <Top>
        <Header variant="receipt" title="Recibo" />
      </Top>

      <Container>
        <SuccessCard>
          <CheckIconWrapper>
            <CheckIcon>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#6C5F8D"
                  d="M23 12c0 6.075-4.925 11-11 11S1 18.075 1 12S5.925 1 12 1s11 4.925 11 11M9.305 18.11l9.402-9.403l-1.414-1.414l-7.883 7.883l-2.476-3.01l-1.511 1.31l3.882 4.633z"
                />
              </svg>
            </CheckIcon>
          </CheckIconWrapper>
          <SuccessText>Pagamento efectuado com sucesso!</SuccessText>
          <AmountText>{receipt.amount.toLocaleString()} kz</AmountText>
        </SuccessCard>

        <DetailsCard>
          <DetailsHeader>
            <DetailsTitle>Detalhes do pagamento</DetailsTitle>
          </DetailsHeader>

          <DetailRow>
            <DetailLabel>Referência</DetailLabel>
            <DetailValue>{receipt.reference}</DetailValue>
          </DetailRow>

          <DetailRow>
            <DetailLabel>Estado do pagamento</DetailLabel>
            <StatusBadge>{receipt.status}</StatusBadge>
          </DetailRow>

          <DetailRow>
            <DetailLabel>Data</DetailLabel>
            <DetailValue>{receipt.date}</DetailValue>
          </DetailRow>

          <DetailRow>
            <DetailLabel>Destinatário</DetailLabel>
            <DetailValue>{receipt.recipient}</DetailValue>
          </DetailRow>

          <DetailRow>
            <DetailLabel>Valor Total</DetailLabel>
            <TotalValue>{receipt.total.toLocaleString()} kz</TotalValue>
          </DetailRow>
        </DetailsCard>

        <ReportCard
          onClick={() => navigateTo(`/estudante/cartoes/credito/pagamentos/report`)}
        >
          <ReportContent>
            <IconCircle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#6C5F8D"
                  fillRule="evenodd"
                  d="M21 12a9 9 0 1 1-18 0a9 9 0 0 1 18 0m-9 11c6.075 0 11-4.925 11-11S18.075 1 12 1S1 5.925 1 12s4.925 11 11 11m-.806-9h1.666v-.262q0-.434.245-.854c.245-.42.362-.539.595-.777q.35-.357.7-.735t.595-.896t.245-1.106q0-1.26-.889-1.939q-.89-.68-2.205-.679q-1.526 0-2.436.798T8.8 9.93h1.722q0-.77.42-1.183t1.092-.413q.615 0 .973.308q.357.308.357.91q0 .392-.224.77c-.224.378-.329.485-.539.7q-.315.322-.637.672a3.2 3.2 0 0 0-.546.833q-.225.483-.224 1.029zM12 17.7a1.2 1.2 0 1 0 0-2.4a1.2 1.2 0 0 0 0 2.4"
                  clipRule="evenodd"
                />
              </svg>
            </IconCircle>
            <ReportText>
              <ReportTitle>Reportar algum problema</ReportTitle>
              <ReportSubtitle>Conta-nos o que aconteceu!</ReportSubtitle>
            </ReportText>
          </ReportContent>
          <svg
            width="20"
            height="20"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path
              fill="#6C5F8D"
              d="M8.465 20.485L16.95 12L8.465 3.515L7.05 4.929L14.122 12L7.05 19.071l1.415 1.414Z"
            />
          </svg>
        </ReportCard>

        <BottomMenu />
      </Container>
    </>
  );
}
