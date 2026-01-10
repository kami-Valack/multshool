"use client";

import BottomMenu from "@/components/ui/BottomMenu";
import { useState, useEffect, useMemo } from "react";
import styled from "styled-components";
import Header from "@/components/ui/HeaderGeneral";
import { studentService, CalendarEvent } from "@/services/studentService";
import { useAuth } from "@/contexts/AuthContext";

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

const LoadingMessage = styled.div`
  text-align: center;
  padding: 40px 20px;
  color: #666;
  font-size: 14px;
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: 40px 20px;
  color: #e74c3c;
  font-size: 14px;
`;

const EmptyMessage = styled.div`
  text-align: center;
  padding: 40px 20px;
  color: #999;
  font-size: 14px;
`;

// Cores para diferentes tipos de exame
const getExamColor = (examType?: string): { color: string; bgColor: string } => {
  const colors: Record<string, { color: string; bgColor: string }> = {
    test: { color: "#4ade80", bgColor: "#dcfce7" },
    final_exam: { color: "#f87171", bgColor: "#fecaca" },
    recovery_exam: { color: "#fb923c", bgColor: "#fed7aa" },
    practical_exam: { color: "#60a5fa", bgColor: "#dbeafe" },
    oral_exam: { color: "#c084fc", bgColor: "#e9d5ff" },
  };
  
  return colors[examType || 'test'] || { color: "#4b5563", bgColor: "#d1d5db" };
};

// Formatar data para exibição
const formatDate = (dateString: string): { day: string; month: string; date: string } => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const monthNames = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear().toString().slice(-2);
  
  return {
    day,
    month: `${month}/${year}`,
    date: `${day}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${year}`,
  };
};

export default function Calendarios() {
  const { user, isLoading: authLoading } = useAuth();
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [enrollments, setEnrollments] = useState<any[]>([]);
  
  // Buscar eventos do calendário (exames)
  useEffect(() => {
    const loadCalendarEvents = async () => {
      if (authLoading || !user) return;
      
      setLoading(true);
      setError(null);
      
      try {
        // Buscar matrículas aprovadas para obter informações do curso
        const enrollmentsData = await studentService.getEnrollments('approved');
        setEnrollments(enrollmentsData);
        
        // Buscar exames/eventos do calendário
        const calendarEvents = await studentService.getCalendarEvents();
        
        // Filtrar eventos (mostrar todos os exames, não apenas futuros)
        // Pode ajustar para mostrar apenas futuros se necessário
        const filteredEvents = calendarEvents.filter(event => {
          if (!event.exam_date) {
            console.warn('Evento sem exam_date:', event);
            return false;
          }
          // Mostrar todos os exames (pode ajustar para apenas futuros se necessário)
          const eventDate = new Date(event.exam_date);
          const now = new Date();
          // Mostrar exames do último mês até 1 ano no futuro
          const oneMonthAgo = new Date(now.getFullYear(), now.getMonth() - 1, 1);
          const oneYearAhead = new Date(now.getFullYear() + 1, now.getMonth(), 31);
          return eventDate >= oneMonthAgo && eventDate <= oneYearAhead;
        });
        
        console.log('Eventos do calendário:', {
          total: calendarEvents.length,
          filtrados: filteredEvents.length,
          eventos: filteredEvents,
        });
        
        // Ordenar por data
        filteredEvents.sort((a, b) => {
          const dateA = new Date(a.exam_date).getTime();
          const dateB = new Date(b.exam_date).getTime();
          return dateA - dateB;
        });
        
        setEvents(filteredEvents);
      } catch (err: any) {
        console.error('Erro ao carregar eventos do calendário:', err);
        setError('Erro ao carregar eventos do calendário. Tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    };
    
    loadCalendarEvents();
  }, [user, authLoading]);
  
  // Obter informações do curso atual (primeira matrícula aprovada)
  const currentEnrollment = useMemo(() => {
    return enrollments.length > 0 ? enrollments[0] : null;
  }, [enrollments]);
  
  const courseName = currentEnrollment?.course?.name || 'Curso';
  const courseCode = currentEnrollment?.course?.code || '';
  const semester = currentEnrollment?.course?.year_level || currentEnrollment?.course?.class_level || '';
  
  // Formatar eventos para exibição
  const formattedEvents = useMemo(() => {
    return events.map(event => {
      const dateInfo = formatDate(event.exam_date);
      const colors = getExamColor(event.exam_type);
      const examTypeLabel = event.exam_type_portuguese || event.exam_type || 'Exame';
      const timeInfo = event.start_time && event.end_time 
        ? `${event.start_time} - ${event.end_time}` 
        : '';
      const semesterInfo = event.semester ? `${event.semester}º Semestre` : '';
      const timeDisplay = [timeInfo, semesterInfo].filter(Boolean).join(' | ') || examTypeLabel;
      
      return {
        id: event.id,
        date: dateInfo.date,
        day: dateInfo.day,
        month: dateInfo.month,
        title: event.subject_name || event.course_name || 'Exame',
        time: timeDisplay,
        color: colors.color,
        bgColor: colors.bgColor,
      };
    });
  }, [events]);

  return (
    <Container>
     <Top>
            <Header variant="default" title="Curso" />
          </Top>

      <Content>
        {loading ? (
          <LoadingMessage>Carregando eventos do calendário...</LoadingMessage>
        ) : error ? (
          <ErrorMessage>{error}</ErrorMessage>
        ) : (
          <>
            <CourseInfo>
              <CourseCode>
                {courseCode ? `${courseCode} - ` : ''}{courseName}
              </CourseCode>
              {semester && (
                <SemesterBadge>
                  {typeof semester === 'number' ? `${semester}º ANO` : semester}
                </SemesterBadge>
              )}
            </CourseInfo>

            {formattedEvents.length === 0 ? (
              <EmptyMessage>
                Nenhum evento agendado no momento.
              </EmptyMessage>
            ) : (
              <CalendarList>
                {formattedEvents.map((event) => (
                  <CalendarItem key={event.id}>
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
            )}
          </>
        )}
      </Content>

      <BottomMenu/>
    </Container>
  );
}