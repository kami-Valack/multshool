"use client";

import BottomMenu from "@/components/ui/BottomMenu";
import { useState } from "react";
import styled from "styled-components";
import Header from "@/components/ui/HeaderGeneral";

// Styled Components
const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #f8f9fa;
  font-family: 'Poppins', sans-serif;
`;

const Top = styled.div`
  width: 100%;
`;

const Content = styled.div`
  flex: 1;
  padding: 10px;
  padding-bottom: 110px;
`;

const CourseInfo = styled.div`
  text-align: center;
  margin-bottom: 24px;
`;

const CourseCode = styled.div`
  font-size: 14px;
  color: #666;
  margin-bottom: 4px;
`;

const SemesterBadge = styled.div`
  display: inline-block;
  background: ${(props) => props.theme.colors.primary};
  color: white;
  padding: 8px 24px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  margin-top: 12px;
`;

const CalendarList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 24px;
`;

const CalendarItem = styled.div`
  display: flex;
  gap: 12px;
  background: white;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  transition: transform 0.2s, box-shadow 0.2s;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  }
`;

const DateColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 60px;
  padding-top: 4px;
`;

const DateDay = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: #333;
`;

const DateMonth = styled.div`
  font-size: 12px;
  color: #999;
  text-transform: uppercase;
`;

const ColorBar = styled.div<{ color: string }>`
  width: 4px;
  background: ${props => props.color};
  border-radius: 2px;
  align-self: stretch;
`;

const EventContent = styled.div<{ bgColor: string }>`
  flex: 1;
  background: ${props => props.bgColor};
  padding: 16px;
  border-radius: 8px;
`;

const EventTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
`;

const EventTime = styled.div`
  font-size: 14px;
  color: #666;
`;

const BottomNav = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: white;
  border-top: 1px solid #e5e7eb;
  display: flex;
  justify-content: space-around;
  padding: 12px 0;
  box-shadow: 0 -2px 10px rgba(0,0,0,0.05);
`;

const NavItem = styled.button<{ active?: boolean }>`
  background: none;
  border: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  color: ${props => props.active ? '#6366f1' : '#999'};
  font-size: 12px;
  padding: 8px 16px;
  transition: color 0.2s;
  
  &:hover {
    color: #6366f1;
  }
`;

const NavIcon = styled.div`
  font-size: 24px;
`;

// Dados dos eventos
const events = [
  {
    date: "12/09/24",
    day: "12",
    month: "Set/24",
    title: "CDI I - Cálculo Dif. e Integral I",
    time: "08:00 - 10:30 | 1º Ano",
    color: "#4ade80",
    bgColor: "#dcfce7"
  },
  {
    date: "14/09/24",
    day: "14",
    month: "Set/24",
    title: "Álgebra Linear e Geo. Analít.",
    time: "08:00 - 10:30 | 1º Ano",
    color: "#fb923c",
    bgColor: "#fed7aa"
  },
  {
    date: "16/09/24",
    day: "16",
    month: "Set/24",
    title: "Engenharia de Softwares",
    time: "10:00 - 12:30 | 3º Ano",
    color: "#f87171",
    bgColor: "#fecaca"
  },
  {
    date: "20/09/24",
    day: "20",
    month: "Set/24",
    title: "Análise de Algoritmos",
    time: "10:00 - 12:30 | 3º Ano",
    color: "#c084fc",
    bgColor: "#e9d5ff"
  },
  {
    date: "21/09/24",
    day: "21",
    month: "Set/24",
    title: "Sistemas Operativos",
    time: "10:00 - 12:30 | 3º Ano",
    color: "#60a5fa",
    bgColor: "#dbeafe"
  },
  {
    date: "24/09/24",
    day: "24",
    month: "Set/24",
    title: "Programação III",
    time: "08:00 - 10:30 | 2º Ano",
    color: "#4b5563",
    bgColor: "#d1d5db"
  }
];

export default function Calendarios() {
  const [activeNav, setActiveNav] = useState("calendar");

  return (
    <Container>
     <Top>
            <Header variant="default" title="Curso" />
          </Top>

      <Content>
        <CourseInfo>
          <CourseCode>EINF6-M1 - Engenharia Informática</CourseCode>
          <SemesterBadge>VIº SEMESTRE – 3º ANO</SemesterBadge>
        </CourseInfo>

        <CalendarList>
          {events.map((event, index) => (
            <CalendarItem key={index}>
              <DateColumn>
                <DateDay>{event.day}</DateDay>
                <DateMonth>{event.month}</DateMonth>
              </DateColumn>
              <ColorBar color={event.color} />
              <EventContent bgColor={event.bgColor}>
                <EventTitle>{event.title}</EventTitle>
                <EventTime>{event.time}</EventTime>
              </EventContent>
            </CalendarItem>
          ))}
        </CalendarList>
      </Content>

      <BottomMenu/>
    </Container>
  );
}