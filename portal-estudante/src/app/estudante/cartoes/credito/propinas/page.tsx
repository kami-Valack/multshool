"use client";

import styled from "styled-components";
import { useState, useEffect } from "react";
import BottomMenu from "@/components/ui/BottomMenu";
import Header from "@/components/ui/HeaderGeneral";
import UserAvatar from "@/components/ui/Avatar";
import { useRouter } from "next/navigation";
import { SimpleCard } from "@/components/ActivityCard";
import { studentService, Fee } from "@/services/studentService";
import { useAuth } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import { formatLocalDate, parseLocalDate } from "@/utils/dates";

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

const Pendentes = styled.div`
  width: 90%;
  height: auto;
  display: flex;
  flex-direction: column;
  margin: 40px 0 130px 0;
  overflow-y: scroll;
`;

const SectionTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: ${(props) => props.theme.colors.textBlack};
  margin: 20px 0 15px 0;
  padding-bottom: 10px;
  border-bottom: 2px solid ${(props) => props.theme.colors.primary};
`;

const SectionContainer = styled.div`
  width: 100%;
  margin-bottom: 30px;
`;

export default function Propinas() {
  const router = useRouter();
  const { user } = useAuth();
  const [fees, setFees] = useState<Fee[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Carregar propinas da API
  useEffect(() => {
    const loadFees = async () => {
      if (user) {
        try {
          const feesData = await studentService.getFees();
          setFees(feesData);
        } catch (error) {
          console.error("Erro ao carregar propinas:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    loadFees();
  }, [user]);

  const propinasData = [...fees]
    .sort(
      (a, b) =>
        parseLocalDate(a.due_date).getTime() - parseLocalDate(b.due_date).getTime()
    )
    .map((fee) => {
    const dueDate = parseLocalDate(fee.due_date);
    const monthName = formatLocalDate(fee.due_date);
    
    // Mapear status da API para o formato do front-end
    let status: "em_atraso" | "pagamento_adiado" | "pendente" = "pendente";
    if (fee.status === 'paid') {
      status = "pagamento_adiado"; // Propina paga
    } else if (fee.status === 'overdue') {
      status = "em_atraso";
    } else {
      // Verificar se está vencida mesmo com status pending
      const now = new Date();
      if (dueDate < now) {
        status = "em_atraso";
      } else {
        status = "pendente";
      }
    }

    return {
      id: fee.id,
      title: fee.description || `Propina de ${monthName}`,
      status,
      amount: `${fee.amount.toLocaleString('pt-PT', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} kz`,
      fee: fee, // Manter referência ao objeto original
      isPaid: fee.status === 'paid',
    };
  });

  // Separar propinas pagas e pendentes
  const propinasPagas = propinasData.filter(p => p.isPaid);
  const propinasPendentes = propinasData.filter(p => !p.isPaid);

  const handlePropinasClick = (propina: (typeof propinasData)[number]) => {
    if (propina.isPaid) return;
    router.push(
      `/estudante/cartoes/credito/pagamentos/${propina.id}`
    );
  };

  return (
    <ProtectedRoute>
      <Container>
        <Top>
          <Header variant="withBack" title="Propinas" />
        </Top>

        {user && (
          <Info>
            <Avatar>
              <UserAvatar size={65} name={user.name || "Estudante"} />
            </Avatar>
            <Texts>
              <Text1>{user.name || "Estudante"}</Text1>
              <Text2>{user.student_id || user.email}</Text2>
            </Texts>
          </Info>
        )}

        <Pendentes>
          <p style={{ fontSize: 13, color: "#666", marginBottom: 8 }}>
            Pode pagar qualquer mês, incluindo os que ainda não venceram.
          </p>
          {isLoading ? (
            <div style={{ padding: "20px", textAlign: "center" }}>
              <p>Carregando propinas...</p>
            </div>
          ) : propinasData.length === 0 ? (
            <div style={{ padding: "20px", textAlign: "center" }}>
              <p>Nenhuma propina encontrada</p>
            </div>
          ) : (
            <>
              {/* Seção de Propinas Pendentes */}
              {propinasPendentes.length > 0 && (
                <SectionContainer>
                  <SectionTitle>Propinas Pendentes ({propinasPendentes.length})</SectionTitle>
                  {propinasPendentes.map((propina) => {
                    // Adicionar data de vencimento
                    const dueDate = propina.fee.due_date
                      ? formatLocalDate(propina.fee.due_date)
                      : null;
                    const titleWithDate = dueDate 
                      ? `${propina.title} (Vence em ${dueDate})`
                      : propina.title;
                    
                    return (
                      <div key={propina.id} style={{ marginBottom: "12px" }}>
                        <SimpleCard
                          title={titleWithDate}
                          status={propina.status}
                          amount={propina.amount}
                          onClick={() => handlePropinasClick(propina)}
                        />
                      </div>
                    );
                  })}
                </SectionContainer>
              )}

              {/* Seção de Propinas Pagas */}
              {propinasPagas.length > 0 && (
                <SectionContainer>
                  <SectionTitle>Propinas Pagas ({propinasPagas.length})</SectionTitle>
                  {propinasPagas.map((propina) => {
                    // Adicionar data de atualização se disponível (pode indicar quando foi paga)
                    const updatedDate = propina.fee.updated_at
                      ? formatLocalDate(propina.fee.updated_at)
                      : null;
                    const titleWithDate = updatedDate && propina.fee.status === 'paid'
                      ? `${propina.title} (Paga)`
                      : propina.title;
                    
                    return (
                      <div key={propina.id} style={{ marginBottom: "12px" }}>
                        <SimpleCard
                          title={titleWithDate}
                          status={propina.status}
                          amount={propina.amount}
                          onClick={() => handlePropinasClick(propina)}
                        />
                      </div>
                    );
                  })}
                </SectionContainer>
              )}
            </>
          )}
        </Pendentes>
        <BottomMenu />
      </Container>
    </ProtectedRoute>
  );
}
