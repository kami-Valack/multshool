"use client";

import { useParams } from "next/navigation";
import styled from "styled-components";
import BottomMenu from "@/components/ui/BottomMenu";
import Header from "@/components/ui/HeaderGeneral";
import CreditCard from "@/components/ui/Cards";
import { pagamentosMock } from "@/mocks/pagamentosPendentes";
import { calcularTotalPagamentos } from "@/utils/pagamentos";
import { PaymentCard } from "@/components/ActivityCard";
import Button from "@/components/ui/Button";
import { useNavigation } from "@/hooks/navigation";
import { gerarCodigoRecibo } from "@/utils/receipt";

// Styled Components
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
`;

const ListaPagamentos = styled.div`
  width: 97%;
`;

const Title = styled.p`
  font-size: 14px;
  font-weight: ${(props) => props.theme.fonts.weight.semibold};
`;

const Paragraph = styled.p`
  font-size: 13px;
  padding: 0 30px 30px 30px;
  text-align: center;
  color: ${(props) => props.theme.colors.foreground};
`;

const Total = styled.p`
  font-weight: ${(props) => props.theme.fonts.weight.bold};
  color: ${(props) => props.theme.colors.sucess};
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
  const pagamentosAluno = pagamentosMock.filter((p) => p.alunoId === id);
  const total = calcularTotalPagamentos(pagamentosAluno);

  if (pagamentosAluno.length === 0) {
    return (
      <Container>
        <Top>
          <Header variant="withBack" title="Pagamentos" />
        </Top>
        <CardS>
          <CreditCard />
        </CardS>

        <DetailsP>
          <Title>Confirmar pagamento</Title>
          <Paragraph>Nenhum pagamento encontrado para este aluno.</Paragraph>
        </DetailsP>
        <BottomMenu />
      </Container>
    );
  }

  return (
    <Container>
      <Top>
        <Header variant="withBack" title="Pagamentos" />
      </Top>

      <CardS>
        <CreditCard />
      </CardS>

      <DetailsP>
        <Title>Confirmar o pagamento</Title>

        <ListaPagamentos>
          {pagamentosAluno.map((payment) => (
            <div key={payment.id} style={{ marginBottom: "8px" }}>
              <PaymentCard
                title={payment.nome}
                date={payment.data}
                amount={`${payment.valor.toLocaleString("pt-AO")} kz`}
                onClick={() => console.log("Pagamento clicado")}
              />
            </div>
          ))}
        </ListaPagamentos>

        <Total>Total: {total.toLocaleString()} Kz</Total>
      </DetailsP>

      <ButtonGroup>
        <Button
          bgColor="primary"
          textColor="#FFFFFF"
          text="Continuar"
          hasBorder={true}
          onClick={() => {
            const codigo = gerarCodigoRecibo();
            navigateTo(`/estudante/cartoes/credito/pagamentos/receipt/${codigo}`);
          }}
        />
      </ButtonGroup>

      <BottomMenu />
    </Container>
  );
}
