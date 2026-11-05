"use client";

import { useEffect, useState } from "react";
import styled from "styled-components";
import BottomMenu from "@/components/ui/BottomMenu";
import Header from "@/components/ui/HeaderGeneral";
import { studentService } from "@/services/studentService";
import UserAvatar from "@/components/ui/Avatar";
import PaymentCard from "@/components/ui/CardsLista";
import Confirmacao from "@/assets/icons/cardsList/confirmacao.png";
import Propinas  from "@/assets/icons/cardsList/propinas.png";
import Taxas from "@/assets/icons/cardsList/taxas.png";
import Exames from "@/assets/icons/cardsList/exames.png";
import Declaracoes from "@/assets/icons/cardsList/declaracoes.png";


// Styled Components
const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: ${(props) => props.theme.fonts.family.poppins};
  min-height: 100dvh; 
  padding-bottom: 180px; /* dá espaço extra para o BottomMenu */
  box-sizing: border-box;
`;


const Top = styled.div`
  width: 100%;
`;

const Info = styled.div`
  width: 90%;
  display: flex;
  align-items: center;
  gap: 12px; // controla espaço entre avatar e textos
  margin: 10px 0; // reduz separação vertical
`;

const Avatar = styled.div`
  flex-shrink: 0; // evita o avatar esticar
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Texts = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Text1 = styled.p`
  font-size: 14px;
  line-height: 1.2;
  margin: 0;
`;

const Text2 = styled.p`
  font-size: 11px;
  line-height: 1.2;
  margin: 5px 0 0 0;
  color: ${(props) => props.theme.colors.foreground};
`;

const ListaP = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center; /* centraliza verticalmente */
  align-items: flex-start; /* mantém alinhado à esquerda */
  margin: 20px 0;
  flex-grow: 1; /* ocupa o espaço restante do container */
`;

const Title = styled.p`
  font-size: 15px;
`;

const Row = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start; /* garante alinhamento à esquerda */
  align-items: center; /* centraliza verticalmente dentro da row */
  margin-top: 15px;
  gap: 16px;
`;

export default function Instituicao() {
  const [name, setName] = useState("Sem instituição");
  const [detail, setDetail] = useState("");

  useEffect(() => {
    studentService
      .getEnrollments()
      .then(async (enrollments) => {
        const active =
          enrollments.find((e) => e.status === "approved") || enrollments[0];
        const institutionId = active?.course?.institution_id;
        if (!institutionId) return;
        const institution = await studentService.getInstitution(institutionId, false);
        setName(institution?.name || "Sem instituição");
        setDetail(institution?.address || institution?.type || "");
      })
      .catch(() => undefined);
  }, []);

  return (
    <Container>
      <Top>
        <Header variant="withBack" title="Instituição" />
      </Top>

      <Info>
        <Avatar>
          <UserAvatar size={65} name={name} />
        </Avatar>
        <Texts>
          <Text1>{name}</Text1>
          <Text2>{detail || "Ainda não há dados"}</Text2>
        </Texts>
      </Info>
      <ListaP>
        <Title>Lista de Pagamentos</Title>
        <Row>
          <PaymentCard
            icon={Confirmacao.src}
            title="Confirmação"
            link="confirmacao"
          />
          <PaymentCard icon={Propinas.src} title="Propinas" link="propinas" />
          <PaymentCard
            icon={Taxas.src}
            title="Eventos"
            link="pagamentos/method"
          />
        </Row>
        <Row>
          {/* <PaymentCard icon={Exames.src} title="Cursos" link="cursos" /> */}
          {/* <PaymentCard icon={Declaracoes.src} title="Fit-student" link="fit-student" /> */}
        </Row>
      </ListaP>
      <BottomMenu />
    </Container>
  );
}
