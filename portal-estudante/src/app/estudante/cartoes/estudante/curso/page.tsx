"use client";

import styled from "styled-components";
import BottomMenu from "@/components/ui/BottomMenu";
import Header from "@/components/ui/HeaderGeneral";
import PaymentCard from "@/components/ui/CardsLista";
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

const Row2 = styled.div`
  width: 100%;
  display: flex;
  //   justify-content: space-evenly;
  gap: 5px;
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

export default function Curso() {
  const router = useRouter();

  // ---- Mock de dados para testes ----
  const propinasData = [
    {
      id: "1",
      title: "Algoritmos e Lógica",
      status: "publicada" as const,
      amount: "7 valores",
    },
    {
      id: "2",
      title: "Matemática Discreta",
      status: "publicada" as const,
      amount: "16 valores",
    },
    {
      id: "3",
      title: "Fundamentos de Programação",
      status: "publicada" as const,
      amount: "18 valores",
    },
  ];

  // Função de clique nas propinas
  const handlePropinasClick = (propina: (typeof propinasData)[number]) => {
    router.push(`curso/notas`);
  };

  return (
    <Container>
      <Top>
        <Header variant="default" title="Curso" />
      </Top>
      <ListaP>
        <Title>Menu curso</Title>
        <Row>
          <PaymentCard
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#6C5F8D"
                  d="M9 18h11v-2.675H9V18ZM4 8.675h3V6H4v2.675Zm0 4.675h3v-2.675H4v2.675ZM4 18h3v-2.675H4V18Zm5-4.65h11v-2.675H9v2.675Zm0-4.675h11V6H9v2.675ZM4 20q-.825 0-1.413-.588T2 18V6q0-.825.588-1.413T4 4h16q.825 0 1.413.588T22 6v12q0 .825-.588 1.413T20 20H4Z"
                />
              </svg>
            }
            title="Horários"
            link="curso/horarios"
          />
          <PaymentCard
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="#6C5F8D"
              >
                <g
                  fill="none"
                  stroke="#6C5F8D"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                >
                  <path d="M22 9L12 5L2 9l10 4l10-4v6" />
                  <path d="M6 10.6V16a6 3 0 0 0 12 0v-5.4" />
                </g>
              </svg>
            }
            title="Notas"
            link="curso/notas"
          />
          <PaymentCard
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="#6C5F8D"
              >
                <g fill="none" stroke="#6C5F8D" stroke-width="1.5">
                  <path d="M4 8c0-2.828 0-4.243.879-5.121C5.757 2 7.172 2 10 2h4c2.828 0 4.243 0 5.121.879C20 3.757 20 5.172 20 8v8c0 2.828 0 4.243-.879 5.121C18.243 22 16.828 22 14 22h-4c-2.828 0-4.243 0-5.121-.879C4 20.243 4 18.828 4 16V8Z" />
                  <path d="M19.898 16h-12c-.93 0-1.395 0-1.777.102A3 3 0 0 0 4 18.224" />
                  <path
                    stroke-linecap="round"
                    d="M8 7h8m-8 3.5h5m0 5.5v3.53c0 .276 0 .414-.095.47c-.095.056-.224-.006-.484-.13l-1.242-.59c-.088-.04-.132-.062-.179-.062c-.047 0-.091.021-.179.063l-1.242.59c-.26.123-.39.185-.484.129C9 19.944 9 19.806 9 19.53v-3.08"
                    opacity=".5"
                  />
                </g>
              </svg>
            }
            title="Materiais"
            link="curso/materiais"
          />
        </Row>
        <Row2>
          <PaymentCard
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#6C5F8D"
                  d="m9.5 15.5l7-4.5l-7-4.5v9ZM8 21v-2H4q-.825 0-1.413-.588T2 17V5q0-.825.588-1.413T4 3h16q.825 0 1.413.588T22 5v12q0 .825-.588 1.413T20 19h-4v2H8Zm-4-4h16V5H4v12Zm0 0V5v12Z"
                />
              </svg>
            }
            title="Aulas online"
            link="curso/aulasonline"
          />
          <PaymentCard
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
              >
                <path
                  fill="#6C5F8D"
                  d="M1 4c0-1.1.9-2 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4zm2 2v12h14V6H3zm2-6h2v2H5V0zm8 0h2v2h-2V0zM5 9h2v2H5V9zm0 4h2v2H5v-2zm4-4h2v2H9V9zm0 4h2v2H9v-2zm4-4h2v2h-2V9zm0 4h2v2h-2v-2z"
                />
              </svg>
            }
            title="Calendários"
            link="curso/calendarios"
          />
        </Row2>
      </ListaP>
      <Pendentes>
        <Title>Recentes</Title>

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
