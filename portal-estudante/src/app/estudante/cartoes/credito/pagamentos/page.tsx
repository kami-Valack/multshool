"use client";

import styled from "styled-components";
import BottomMenu from "@/components/ui/BottomMenu";
import Header from "@/components/ui/HeaderGeneral";
import PaymentCard from "@/components/ui/CardsLista";
import Unicon from "@/assets/icons/cardsList/University.png";
import Meal from "@/assets/icons/cardsList/Meal.png";
import Transporte from "@/assets/icons/cardsList/transporte.png";
import Cursos from "@/assets/icons/cardsList/cursos.png";
import Fit from "@/assets/icons/cardsList/fit.png";
import Transfer from "@/assets/icons/cardsList/transferencias.png";
import { SimpleCard } from "@/components/ActivityCard";
import { useRouter } from "next/navigation";

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

  // ---- Mock de dados para testes ----
  const propinasData = [
    {
      id: "1",
      title: "Propina de julho",
      status: "em_atraso" as const,
      amount: "62.090 kz",
    },
    {
      id: "2",
      title: "Propina de junho",
      status: "pagamento_adiado" as const,
      amount: "54.000 kz",
    },
    {
      id: "3",
      title: "Propina de maio",
      status: "pendente" as const,
      amount: "54.000 kz",
    },
    {
      id: "4",
      title: "Propina de abril",
      status: "pendente" as const,
      amount: "54.000 kz",
    },
    {
      id: "5",
      title: "Propina de março",
      status: "pendente" as const,
      amount: "54.000 kz",
    },
  ];

  // Função de clique nas propinas
  const handlePropinasClick = (propina: (typeof propinasData)[number]) => {
    router.push(`/estudante/cartoes/credito/pagamentos/${propina.id}`);
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
          <PaymentCard icon={Meal.src} title="Alimentação" link="instituicao" />
          <PaymentCard
            icon={Transporte.src}
            title="Transporte"
            link="pagamentos/method"
          />
        </Row>
        <Row>
          <PaymentCard
            icon={Cursos.src}
            title="Cursos"
            link="pagamentos/method"
          />
          <PaymentCard
            icon={Fit.src}
            title="Fit-student"
            link="pagamentos/method"
          />
          <PaymentCard
            icon={Transfer.src}
            title="Transferências"
            link="pagamentos/transferencias"
          />
        </Row>
      </ListaP>
      <Pendentes>
        <Title>Pendentes</Title>

        {propinasData.map((propina) => (
          <div key={propina.id} style={{ marginBottom: "12px" }}>
            <SimpleCard
              title={propina.title}
              status={propina.status}
              amount={propina.amount}
              onClick={() => handlePropinasClick(propina)}
            />
          </div>
        ))}
      </Pendentes>

      <BottomMenu />
    </Container>
  );
}
