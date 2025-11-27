"use client";

import React, { useState } from "react";
import styled from "styled-components";
import Header from "@/components/ui/HeaderGeneral";
import BottomMenu from "@/components/ui/BottomMenu";

// Mock data - simulando dados que viriam da BD
const mockScheduleData = [
  {
    id: 1,
    day: "Segunda-feira",
    classes: [
      {
        id: 1,
        time: "07:30",
        endTime: "09:00",
        title: "CDI I - Cálculo Difer. e Int...",
        subtitle: "Capítulo I : Funções",
        location: "Sala: BAA3",
        professor: "Bernardo Manuel",
        isActive: true,
      },
      {
        id: 2,
        time: "09:10",
        endTime: "10:30",
        title: "IEF - Introd. à Eng. Inform...",
        subtitle: "Capítulo I : Sistema binário",
        location: "LAB - B",
        professor: "Judson Paiva",
        isActive: false,
      },
      {
        id: 3,
        time: "10:45",
        endTime: "12:15",
        title: "Programação I",
        subtitle: "Capítulo I : Introd. à ling. C",
        location: "LAB - C",
        professor: "Aires Veloso",
        isActive: false,
      },
    ],
  },
  {
    id: 2,
    day: "Terça-feira",
    classes: [
      {
        id: 4,
        time: "08:00",
        endTime: "09:30",
        title: "Álgebra Linear",
        subtitle: "Capítulo II : Matrizes",
        location: "Sala: BAA1",
        professor: "Maria Silva",
        isActive: false,
      },
      {
        id: 5,
        time: "10:00",
        endTime: "11:30",
        title: "Física I",
        subtitle: "Capítulo I : Cinemática",
        location: "LAB - A",
        professor: "João Costa",
        isActive: false,
      },
    ],
  },
  {
    id: 3,
    day: "Quarta-feira",
    classes: [
      {
        id: 6,
        time: "07:30",
        endTime: "09:00",
        title: "Estrutura de Dados",
        subtitle: "Capítulo III : Listas Ligadas",
        location: "LAB - C",
        professor: "Pedro Santos",
        isActive: false,
      },
    ],
  },
];

// Styled Components
const Top = styled.div`
  width: 100%;
`;

const Container = styled.div`
  width: 100%;
  max-width: 480px;
  margin: 0 auto;
  font-family: ${(props) => props.theme.fonts.family.poppins};
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Content = styled.div`
  flex: 1;
  overflow-y: auto;
  padding-bottom: 80px;
`;

const DaySection = styled.div``;

const DayHeader = styled.div`
  padding: 16px 20px;
  text-align: center;
`;

const DayTitle = styled.h2`
  font-size: 16px;
  font-weight: 500;
  color: #7b7b8e;
  margin: 0;
`;

const ClassesContainer = styled.div`
  padding: 0 16px;
`;

const ClassRow = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
`;

const TimeColumn = styled.div`
  min-width: 60px;
  padding-top: 16px;
`;

const TimeMain = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 4px;
`;

const TimeEnd = styled.div`
  font-size: 14px;
  color: #b0b0b0;
`;

const ClassCard = styled.div<{ $isActive: boolean }>`
  flex: 1;
  background-color: ${(props) => (props.$isActive ? "#7B68A6" : "#E8E4F0")};
  border-radius: 16px;
  padding: 16px;
  color: ${(props) => (props.$isActive ? "white" : "#1A1A1A")};
  position: relative;
`;

const MoreButton = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
`;

const ClassTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 8px 0;
  padding-right: 24px;
`;

const ClassSubtitle = styled.p<{ $isActive: boolean }>`
  font-size: 13px;
  margin: 0 0 16px 0;
  opacity: ${(props) => (props.$isActive ? 0.9 : 1)};
`;

const LocationRow = styled.div<{ $isActive: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  margin-bottom: 12px;
  opacity: ${(props) => (props.$isActive ? 0.9 : 1)};
`;

const ProfessorRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
`;

const ProfessorAvatar = styled.div<{ $isActive: boolean }>`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: ${(props) =>
    props.$isActive ? "rgba(255,255,255,0.3)" : "#C4B8D8"};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 600;
  color: ${(props) => (props.$isActive ? "white" : "#7B68A6")};
`;




const LocationIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path
      d="M8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14Z"
      stroke="currentColor"
      strokeWidth="1.5"
      fill="none"
    />
    <path
      d="M8 4V8L10.5 10.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

export default function HorariosPage() {
  const [scheduleData] = useState(mockScheduleData);

  return (
    <>
      <Top>
        <Header variant="default" title="Curso" />
      </Top>
      <Container>
        {/* Header */}

        {/* Content */}
        <Content>
          {scheduleData.map((daySchedule) => (
            <DaySection key={daySchedule.id}>
              <DayHeader>
                <DayTitle>{daySchedule.day}</DayTitle>
              </DayHeader>

              <ClassesContainer>
                {daySchedule.classes.map((cls) => (
                  <ClassRow key={cls.id}>
                    <TimeColumn>
                      <TimeMain>{cls.time}</TimeMain>
                      <TimeEnd>{cls.endTime}</TimeEnd>
                    </TimeColumn>

                    <ClassCard $isActive={cls.isActive}>
                      <MoreButton>
                        {/* <MoreVertical size={20} color={cls.isActive ? 'white' : '#666'} /> */}
                      </MoreButton>

                      <ClassTitle>{cls.title}</ClassTitle>
                      <ClassSubtitle $isActive={cls.isActive}>
                        {cls.subtitle}
                      </ClassSubtitle>

                      <LocationRow $isActive={cls.isActive}>
                        <LocationIcon />
                        <span>{cls.location}</span>
                      </LocationRow>

                      <ProfessorRow>
                        <ProfessorAvatar $isActive={cls.isActive}>
                          {cls.professor
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </ProfessorAvatar>
                        <span>{cls.professor}</span>
                      </ProfessorRow>
                    </ClassCard>
                  </ClassRow>
                ))}
              </ClassesContainer>
            </DaySection>
          ))}
        </Content>

        {/* Bottom Menu */}
        <BottomMenu/>
      </Container>
    </>
  );
}
