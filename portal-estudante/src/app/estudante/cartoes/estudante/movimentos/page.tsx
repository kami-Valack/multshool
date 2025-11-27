"use client";

import { useState } from "react";
import styled from "styled-components";
import BottomMenu from "@/components/ui/BottomMenu";
import Header from "@/components/ui/HeaderGeneral";
import UserAvatar from "@/components/ui/Avatar";
import { useAuth } from "@/contexts/AuthContext";
import { Transaction } from "@/services/pdfService";

// ======================
//  DADOS MOCKADOS
// ======================
const movimentosData: Transaction[] = [
  {
    title: "Biblioteca — acesso",
    date: "Há 12 min",
    amount: "",
    isPositive: true,
  },
  {
    title: "Cantina — almoço",
    date: "Hoje às 12:40",
    amount: "-1.250 kz",
    isPositive: false,
  },
  {
    title: "Entrada no Campus",
    date: "Hoje às 07:58",
    amount: "",
    isPositive: true,
  },
  {
    title: "Laboratório de Informática — check-in",
    date: "Ontem às 16:32",
    amount: "",
    isPositive: true,
  },
  {
    title: "Biblioteca — devolução de livro",
    date: "Ontem às 15:12",
    amount: "",
    isPositive: true,
  },
];

// ======================
//  COMPONENTE RECENTSECTION AQUI MESMO
// ======================
interface RecentSectionProps {
  title?: string;
  data?: any[];
}

function RecentSection({
  title = "Histórico de Movimentos",
  data = [],
}: RecentSectionProps) {
  return (
    <Wrapper>
      <HeaderRecent>
        <h3>{title}</h3>
      </HeaderRecent>

      <List>
        {data.map((item, index) => (
          <Item key={index} $positive={item.isPositive}>
            <div>
              <p className="title">{item.title}</p>
              <p className="date">{item.date}</p>
            </div>
            <p className="amount">{item.amount}</p>
          </Item>
        ))}
      </List>
    </Wrapper>
  );
}

// ======================
//  PÁGINA PRINCIPAL
// ======================
export default function Movimentos() {
  const { user } = useAuth();

  if (!user) return <p>Dados do estudante não encontrados</p>;

  return (
    <>
      <Container>
        <Top>
          <Header variant="withBack" title="Movimentos" />
        </Top>

        <Info>
          <Avatar>
            <UserAvatar size={45} name={user?.name || ""} />
          </Avatar>

          <Texts>
            <Text1>{user.name}</Text1>
            <Text2>Conta Multischool</Text2>
          </Texts>
        </Info>

        {/* ✅ AGORA O COMPONENTE ESTÁ AQUI, SEM ERRO, SEM IMPORTAR NADA */}
        <RecentSection data={movimentosData} />

        <BottomMenu />
      </Container>
    </>
  );
}

// ======================
//  STYLES (NÃO TOQUEI)
// ======================
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

const Info = styled.div`
  width: 90%;
  display: flex;
  align-items: center;
  margin: 10px 0 30px 0;
`;

const Avatar = styled.div`
  width: 45px;
  height: 45px;
`;

const Texts = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 0 0 10px
`;

const Text1 = styled.p`
  font-size: 14px;
  margin: 0;
`;

const Text2 = styled.p`
  font-size: 11px;
  color: ${(props) => props.theme.colors.foreground};
  margin: 5px 0 0 0;
`;

const Wrapper = styled.div`
  width: 90%;
  margin-bottom: 80px;
`;

const HeaderRecent = styled.div`
  margin-bottom: 12px;

  h3 {
    font-size: 14px;
    font-weight: 600;
    margin: 0;
  }
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Item = styled.div<{ $positive?: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${(props) => props.theme.colors.background_2};
  padding: 10px 14px;
  border-radius: 10px;

  .title {
    font-size: 13px;
    font-weight: 500;
  }

  .date {
    font-size: 11px;
    color: ${(props) => props.theme.colors.foreground};
  }

  .amount {
    font-size: 13px;
    font-weight: 600;
    color: ${(props) =>
      props.$positive ? props.theme.colors.sucess : props.theme.colors.primary};
  }
`;
