"use client";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Header from "@/components/ui/HeaderGeneral";
import { CreditCard, StudentCard } from "@/components/ui/Cards";
import MenuGrid, { MenuSection } from "@/components/ui/menuGrid";
import RecentSection, { CardType } from "@/components/ui/RecentSection";
import { SimpleCard } from "@/components/ActivityCard";
import BottomMenu from "@/components/ui/BottomMenu";
import { ActivityCard } from "@/components/ActivityCard";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { studentService } from "@/services/studentService";
import ProtectedRoute from "@/components/ProtectedRoute";

// Tipos principais usados nas actividades
interface Activity {
  id: string;
  title: string;
  institution: string;
  status: "pendente" | "em_curso" | "concluido" | "vencida" | "publicada";
  date: string;
  icon?: string;
  description?: string;
}

interface ExameAcessoData {
  activities: Activity[];
}

// ---- Styled Components ----
const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background: ${(props) => props.theme.colors.background};
  font-family: ${(props) => props.theme.fonts.family.poppins};
  overflow-x: hidden;
`;

const Content = styled.div`
  padding: 20px;
  padding-bottom: 100px; // espaço para o BottomMenu
`;

const CardSlideContainer = styled.div`
  width: 100%;
  overflow: hidden; // esconde o overflow mas ainda mostra parte do próximo cartão
  position: relative;
  touch-action: pan-y;
  margin-bottom: 20px;
  padding: 0 15px; // padding lateral alinhado com layout
`;

const CardSlideWrapper = styled.div`
  display: flex;
  align-items: stretch;
  height: 100%;
  will-change: transform; // optimização para animação
`;

const CardSlideItem = styled.div`
  flex: 0 0 auto;
  box-sizing: border-box;
  border-radius: 12px;
  overflow: visible;
`;

const ActivitiesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  height: 23vh;
  overflow: auto;
`;

const ActivityCardWrapper = styled.div`
  width: 100%;
`;

export default function Home() {
  const { user } = useAuth();
  const [activeSection, setActiveSection] = useState<MenuSection>("recentes");
  const [currentCardSlide, setCurrentCardSlide] = useState(0);
  const [itemWidth, setItemWidth] = useState(0);
  const [enrollments, setEnrollments] = useState<any[]>([]);
  const [examRegistrations, setExamRegistrations] = useState<any[]>([]);
  const [grades, setGrades] = useState<any[]>([]);
  const [fees, setFees] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  // variáveis de controlo do drag
  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartTranslateRef = useRef(0);
  const translateRef = useRef(0);

  // ---- Configurações ajustáveis ----
  const totalCards = 2; // mudar caso aumente número de cartões
  const ITEM_PERCENT = 0.87; // % de largura ocupada por cada cartão (ajusta para mostrar parte do próximo)
  const GAP = 16; // espaço entre cartões em px
  const SIDE_PADDING = 15; // deve coincidir com padding do Container

  const router = useRouter();

  // Determina o tipo de cartão ativo
  const activeCardType: CardType =
    currentCardSlide === 0 ? "credit" : "student";

  // Carregar dados do estudante
  useEffect(() => {
    const loadData = async () => {
      if (user) {
        try {
          // Carregar dados em paralelo
          const [enrollmentsData, examRegsData, gradesData, feesData] = await Promise.allSettled([
            studentService.getEnrollments(),
            studentService.getExamRegistrations(),
            studentService.getGrades(),
            studentService.getFees(),
          ]);

          if (enrollmentsData.status === 'fulfilled') {
            setEnrollments(enrollmentsData.value);
          }

          if (examRegsData.status === 'fulfilled') {
            setExamRegistrations(examRegsData.value);
          }

          if (gradesData.status === 'fulfilled') {
            setGrades(gradesData.value);
          }

          if (feesData.status === 'fulfilled') {
            setFees(feesData.value);
          }
        } catch (error) {
          console.error("Erro ao carregar dados:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    loadData();
  }, [user]);

  // Preparar dados do cartão de estudante
  const activeEnrollment = enrollments.find((e) => e.status === "approved");

  // Converter propinas/fees para o formato esperado
  const propinasData = fees.map((fee) => {
    const dueDate = new Date(fee.due_date);
    const now = new Date();
    const isOverdue = fee.status === 'overdue' || (dueDate < now && fee.status === 'pending');
    
    let status: "em_atraso" | "pagamento_adiado" | "pendente" = "pendente";
    if (isOverdue) {
      status = "em_atraso";
    } else if (fee.status === 'paid') {
      status = "pagamento_adiado"; // Já pago
    }

    return {
      id: fee.id,
      title: fee.description || `Propina - ${new Date(fee.due_date).toLocaleDateString('pt-PT', { month: 'long' })}`,
      status,
      amount: `${fee.amount.toLocaleString('pt-PT')} kz`,
      fee: fee, // Manter referência ao objeto original
    };
  });

  // Converter exames para atividades do cartão de estudante
  const examActivities: Activity[] = examRegistrations
    .slice(0, 5) // Limitar a 5 mais recentes
    .map((examReg) => {
      const examDate = examReg.exam?.date ? new Date(examReg.exam.date) : null;
      const statusMap: Record<string, Activity["status"]> = {
        pending: "pendente",
        approved: "em_curso",
        rejected: "vencida",
      };

      return {
        id: examReg.id,
        title: examReg.exam?.name || "Exame",
        institution: examDate
          ? examDate.toLocaleDateString('pt-PT', { day: 'numeric', month: 'short' })
          : "Data não definida",
        status: statusMap[examReg.status] || "pendente",
        date: examDate
          ? examDate.toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' })
          : "",
        icon: "exam",
      };
    });

  // Converter notas para atividades
  const gradeActivities: Activity[] = grades
    .slice(0, 5) // Limitar a 5 mais recentes
    .map((grade) => {
      const createdDate = new Date(grade.created_at);
      const timeAgo = Math.floor((Date.now() - createdDate.getTime()) / (1000 * 60)); // minutos

      return {
        id: grade.id,
        title: `${grade.subject} - ${grade.grade}/20`,
        institution: timeAgo < 60 ? `${timeAgo} min` : `${Math.floor(timeAgo / 60)} h`,
        status: "publicada" as const,
        date: `${grade.grade}/20`,
        icon: "grade",
      };
    });

  // Atividades do cartão de crédito (propinas pendentes)
  const creditActivitiesData: ExameAcessoData = {
    activities: fees
      .filter((fee) => fee.status === 'pending' || fee.status === 'overdue')
      .slice(0, 5)
      .map((fee) => {
        const dueDate = new Date(fee.due_date);
        const isOverdue = fee.status === 'overdue' || (dueDate < new Date() && fee.status === 'pending');
        
        return {
          id: fee.id,
          title: fee.description || `Propina - ${dueDate.toLocaleDateString('pt-PT', { month: 'long' })}`,
          institution: activeEnrollment?.course?.name || "Instituição",
          status: isOverdue ? ("vencida" as const) : ("pendente" as const),
          date: `-${fee.amount.toLocaleString('pt-PT')} kz`,
          icon: "exam",
        };
      }),
  };

  // Atividades do cartão de estudante (notas e exames)
  const studentActivitiesData: ExameAcessoData = {
    activities: [...gradeActivities, ...examActivities].slice(0, 5),
  };

  // Seleciona os dados de atividade baseado no cartão activo
  const currentActivitiesData =
    activeCardType === "credit" ? creditActivitiesData : studentActivitiesData;

  // ---- Ajusta largura dos cartões dinamicamente e aplica transição ----
  useEffect(() => {
    const compute = () => {
      const c = containerRef.current;
      if (!c) return;
      const containerWidth = c.clientWidth;
      const computedItemWidth = Math.round(containerWidth * ITEM_PERCENT);
      setItemWidth(computedItemWidth);
      const x = -currentCardSlide * (computedItemWidth + GAP);
      translateRef.current = x;
      if (wrapperRef.current && !isDraggingRef.current) {
        wrapperRef.current.style.transition = "transform 0.32s ease-out";
        wrapperRef.current.style.transform = `translateX(${x}px)`;
        // timeout remove transição para não "quebrar"o drag seguinte
        window.setTimeout(() => {
          if (wrapperRef.current) wrapperRef.current.style.transition = "";
        }, 320);
      }
    };
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, [currentCardSlide]);

  // ---- Eventos de drag horizontal ----
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button && e.button !== 0) return; // só botão esquerdo
    isDraggingRef.current = true;
    dragStartXRef.current = e.clientX;
    dragStartTranslateRef.current = translateRef.current;
    if (wrapperRef.current) wrapperRef.current.style.transition = "none";
    (e.currentTarget as Element).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    const delta = e.clientX - dragStartXRef.current;
    const newTranslate = dragStartTranslateRef.current + delta;
    const maxTranslate = 0;
    const minTranslate = -((totalCards - 1) * (itemWidth + GAP));
    // aplica "resistência" quando ultrapassa limites
    let applied = newTranslate;
    if (newTranslate > maxTranslate)
      applied = maxTranslate + (newTranslate - maxTranslate) * 0.28;
    if (newTranslate < minTranslate)
      applied = minTranslate + (newTranslate - minTranslate) * 0.28;
    translateRef.current = applied;
    if (wrapperRef.current)
      wrapperRef.current.style.transform = `translateX(${applied}px)`;
  };

  // ---- Finaliza drag e faz snap para cartão mais próximo ----
  const endDragAndSnap = (
    pointerId?: number,
    releaseTarget?: Element | null
  ) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    const itemPlusGap = itemWidth + GAP;
    if (itemPlusGap === 0) return;
    const rawIndex = Math.round(-translateRef.current / itemPlusGap);
    const clampedIndex = Math.max(0, Math.min(rawIndex, totalCards - 1));
    setCurrentCardSlide(clampedIndex);
    const finalX = -clampedIndex * itemPlusGap;
    translateRef.current = finalX;
    if (wrapperRef.current) {
      wrapperRef.current.style.transition = "transform 0.32s ease-out";
      wrapperRef.current.style.transform = `translateX(${finalX}px)`;
      window.setTimeout(() => {
        if (wrapperRef.current) wrapperRef.current.style.transition = "";
      }, 320);
    }
    try {
      if (releaseTarget && pointerId !== undefined) {
        (releaseTarget as Element).releasePointerCapture(pointerId);
      }
    } catch {}
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    endDragAndSnap(e.pointerId, e.currentTarget);
  };

  const handlePointerCancel = (e: React.PointerEvent<HTMLDivElement>) => {
    endDragAndSnap(e.pointerId, e.currentTarget);
  };

  // ---- Navegação directa para um cartão específico ----
  const goToCardSlide = (index: number) => {
    const clamped = Math.max(0, Math.min(index, totalCards - 1));
    setCurrentCardSlide(clamped);
    const x = -clamped * (itemWidth + GAP);
    translateRef.current = x;
    if (wrapperRef.current) {
      wrapperRef.current.style.transition = "transform 0.32s ease-out";
      wrapperRef.current.style.transform = `translateX(${x}px)`;
      window.setTimeout(() => {
        if (wrapperRef.current) wrapperRef.current.style.transition = "";
      }, 320);
    }
  };

  // ---- Handlers de clique ----
  const handlePropinasClick = (propina: any) => {
    console.log("Propina clicked:", propina);
  };

  const handleActivityClick = (activity: Activity) => {
    router.push(`/candidato/cartoes/credito/${activity.id}`);
  };

  const handleSectionChange = (section: MenuSection) => {
    // Para cartão de estudante, redirecionar para páginas específicas
    if (activeCardType === "student") {
      if (section === "propinas") {
        router.push("/movimentos");
        return;
      }
      if (section === "consulta") {
        router.push("/documentos");
        return;
      }
    }

    setActiveSection(section);
  };

  const studentCardData = user
    ? {
        studentName: user.name,
        course: activeEnrollment?.course?.name || "Sem curso",
        studentNumber: user.student_id || "",
        class: activeEnrollment?.course?.name || "",
        institutionName: activeEnrollment?.course?.institution_id || "",
        institutionFullName: activeEnrollment?.course?.name || "",
        institutionColor: "#6C5F8D",
      }
    : null;

  // ---- Render ----
  return (
    <ProtectedRoute>
      <Container>
        <Header />
        <Content>
        {/* Carrossel de cartões */}
        <CardSlideContainer
          ref={containerRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerCancel}
        >
          <CardSlideWrapper ref={wrapperRef} style={{ gap: `${GAP}px` }}>
            <CardSlideItem
              style={{ width: itemWidth ? `${itemWidth}px` : "78%" }}
            >
              <CreditCard />
            </CardSlideItem>
            {studentCardData ? (
              <CardSlideItem
                style={{ width: itemWidth ? `${itemWidth}px` : "78%" }}
              >
                <StudentCard studentData={studentCardData} />
              </CardSlideItem>
            ) : (
              <CardSlideItem
                style={{ width: itemWidth ? `${itemWidth}px` : "78%" }}
              >
                <div style={{ padding: "20px", textAlign: "center" }}>
                  <p>Carregando dados do estudante...</p>
                </div>
              </CardSlideItem>
            )}
          </CardSlideWrapper>
        </CardSlideContainer>

        {/* Secção de actividades */}
        {activeSection !== "propinas" && (
          <ActivitiesContainer>
            {isLoading ? (
              <div style={{ textAlign: "center", padding: "20px" }}>
                <p>A carregar actividades...</p>
              </div>
            ) : currentActivitiesData.activities.length > 0 ? (
              currentActivitiesData.activities.map((activity) => (
                <ActivityCardWrapper key={activity.id}>
                  <ActivityCard
                    title={activity.title}
                    institution={activity.institution}
                    status={activity.status}
                    date={activity.date}
                    onClick={() => handleActivityClick(activity)}
                  />
                </ActivityCardWrapper>
              ))
            ) : (
              <div style={{ textAlign: "center", padding: "20px", color: "#666" }}>
                <p>Nenhuma actividade recente</p>
              </div>
            )}
          </ActivitiesContainer>
        )}

        {/* Menu principal */}
        <MenuGrid
          activeSection={activeSection}
          onSectionChange={handleSectionChange}
          activeCard={activeCardType}
        />

        {/* Renderiza secções condicionais */}
        {activeSection === "recentes" || activeSection === "pendencias" ? (
          <RecentSection
            variant={activeSection === "pendencias" ? "pendencias" : "recentes"}
            activeCard={activeCardType}
          />
        ) : activeSection === "propinas" ? (
          <div>
            {isLoading ? (
              <div style={{ textAlign: "center", padding: "20px" }}>
                <p>A carregar propinas...</p>
              </div>
            ) : propinasData.length > 0 ? (
              propinasData.map((propina) => (
                <div key={propina.id} style={{ marginBottom: "12px" }}>
                  <SimpleCard
                    title={propina.title}
                    status={propina.status}
                    amount={propina.amount}
                    onClick={() => handlePropinasClick(propina)}
                  />
                </div>
              ))
            ) : (
              <div style={{ textAlign: "center", padding: "20px", color: "#666" }}>
                <p>Nenhuma propina pendente</p>
              </div>
            )}
          </div>
        ) : null}
        </Content>
        <BottomMenu />
      </Container>
    </ProtectedRoute>
  );
}
