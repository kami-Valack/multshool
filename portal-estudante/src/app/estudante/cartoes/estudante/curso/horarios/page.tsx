"use client";

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Header from "@/components/ui/HeaderGeneral";
import BottomMenu from "@/components/ui/BottomMenu";
import { studentService } from "@/services/studentService";

// Mapear dia da API para português
const mapDayToPortuguese = (day: string): string => {
  const mapping: Record<string, string> = {
    monday: "Segunda-feira",
    tuesday: "Terça-feira",
    wednesday: "Quarta-feira",
    thursday: "Quinta-feira",
    friday: "Sexta-feira",
    saturday: "Sábado",
    sunday: "Domingo",
  };
  return mapping[day] || day;
};

// Interface para os dados da API
interface ScheduleFromAPI {
  id: string;
  class_name: string;
  subject?: {
    name: string;
    code?: string;
  };
  start_time: string;
  end_time: string;
  day_of_week: string;
  room?: string;
  teacher_id?: string;
  course?: {
    name: string;
  };
}

// Interface para os dados formatados da UI
interface DaySchedule {
  id: string;
  day: string;
  classes: ClassItem[];
}

interface ClassItem {
  id: string;
  time: string;
  endTime: string;
  title: string;
  subtitle: string;
  location: string;
  professor: string;
  isActive: boolean;
}

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
  const [scheduleData, setScheduleData] = useState<DaySchedule[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSchedules = async () => {
      try {
        setLoading(true);
        const schedules = await studentService.getSchedules();
        
        if (schedules.length === 0) {
          // Se não houver horários, retornar array vazio
          setScheduleData([]);
          setLoading(false);
          return;
        }

        // Agrupar horários por dia da semana
        const schedulesByDay: Record<string, ScheduleFromAPI[]> = {};
        schedules.forEach((schedule: ScheduleFromAPI) => {
          const day = schedule.day_of_week;
          if (!schedulesByDay[day]) {
            schedulesByDay[day] = [];
          }
          schedulesByDay[day].push(schedule);
        });

        // Converter para o formato esperado pela UI
        const formattedSchedules: DaySchedule[] = Object.entries(schedulesByDay).map(([day, daySchedules], index) => {
          // Ordenar por hora de início
          daySchedules.sort((a, b) => {
            const timeA = a.start_time || '00:00';
            const timeB = b.start_time || '00:00';
            return timeA.localeCompare(timeB);
          });

          return {
            id: `day-${index}`,
            day: mapDayToPortuguese(day),
            classes: daySchedules.map((schedule: ScheduleFromAPI) => {
              // Determinar se a aula está ativa (pode ser baseado em lógica de horário atual)
              const now = new Date();
              const currentDay = now.getDay(); // 0 = Domingo, 1 = Segunda, etc.
              const dayMap: Record<string, number> = {
                monday: 1,
                tuesday: 2,
                wednesday: 3,
                thursday: 4,
                friday: 5,
                saturday: 6,
                sunday: 0,
              };
              const scheduleDay = dayMap[day] ?? -1;
              
              // Verificar se é o dia atual e se está dentro do horário
              const [startHour, startMin] = (schedule.start_time || '00:00').split(':').map(Number);
              const [endHour, endMin] = (schedule.end_time || '00:00').split(':').map(Number);
              const currentHour = now.getHours();
              const currentMin = now.getMinutes();
              
              const isActive = scheduleDay === currentDay &&
                ((currentHour > startHour || (currentHour === startHour && currentMin >= startMin)) &&
                 (currentHour < endHour || (currentHour === endHour && currentMin <= endMin)));

              return {
                id: schedule.id,
                time: schedule.start_time || '00:00',
                endTime: schedule.end_time || '00:00',
                title: schedule.subject?.name || 'Disciplina não informada',
                subtitle: schedule.subject?.code ? `Código: ${schedule.subject.code}` : schedule.course?.name || '',
                location: schedule.room ? `Sala: ${schedule.room}` : 'Sala não informada',
                professor: schedule.teacher_id ? `Professor ID: ${schedule.teacher_id}` : 'Professor não atribuído',
                isActive,
              };
            }),
          };
        });

        // Ordenar por dia da semana
        const dayOrder: Record<string, number> = {
          'Segunda-feira': 1,
          'Terça-feira': 2,
          'Quarta-feira': 3,
          'Quinta-feira': 4,
          'Sexta-feira': 5,
          'Sábado': 6,
          'Domingo': 7,
        };
        
        formattedSchedules.sort((a, b) => {
          return (dayOrder[a.day] || 99) - (dayOrder[b.day] || 99);
        });

        setScheduleData(formattedSchedules);
      } catch (error) {
        console.error('Erro ao carregar horários:', error);
        // Em caso de erro, retornar array vazio
        setScheduleData([]);
      } finally {
        setLoading(false);
      }
    };

    loadSchedules();
  }, []);

  return (
    <>
      <Top>
        <Header variant="default" title="Curso" />
      </Top>
      <Container>
        {/* Header */}

        {/* Content */}
        <Content>
          {loading ? (
            <div style={{ padding: '20px', textAlign: 'center', color: '#7b7b8e' }}>
              Carregando horários...
            </div>
          ) : scheduleData.length === 0 ? (
            <div style={{ padding: '20px', textAlign: 'center', color: '#7b7b8e' }}>
              Nenhum horário disponível no momento.
            </div>
          ) : (
            scheduleData.map((daySchedule) => (
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
            ))
          )}
        </Content>

        {/* Bottom Menu */}
        <BottomMenu/>
      </Container>
    </>
  );
}
