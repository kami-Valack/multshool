"use client";

import styled from "styled-components";
import { useState, useEffect } from "react";
import BottomMenu from "@/components/ui/BottomMenu";
import Header from "@/components/ui/HeaderGeneral";
import UserAvatar from "@/components/ui/Avatar";
import Button from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import { SimpleCard } from "@/components/ActivityCard";
import { AlertModal } from "@/components/AlertModal";
import Bg from "@/assets/backgrounds/candidato/bg_6.jpeg";
import { studentService, Fee } from "@/services/studentService";
import { useAuth } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";

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

const ButtonGroup = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 30px;
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
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const handlePage = () => {
    setIsModalOpen(true);
  };

  // Handle modal confirm action
  const handleConfirm = () => {
    router.push(`propinas/adiantamento`);
    setIsModalOpen(false); 
  };

  // Handle modal cancel or close action
  const handleClose = () => {
    setIsModalOpen(false);
  };

  // Converter fees da API para o formato esperado pelo componente
  const propinasData = fees.map((fee) => {
    const dueDate = new Date(fee.due_date);
    const monthName = dueDate.toLocaleDateString('pt-PT', { month: 'long', year: 'numeric' });
    
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
    // Implementar navegação para detalhes da propina se necessário
    console.log("Propina clicada:", propina);
  };

  // Obter informações da instituição do estudante (se houver matrícula)
  // TODO: buscar matrícula ativa se necessário
  const institutionName = "Instituição";
  const institutionLocation = ""; // TODO: buscar localização se necessário

  return (
    <ProtectedRoute>
      <Container>
        <Top>
          <Header variant="withBack" title="Propinas" />
        </Top>

        {user && (
          <Info>
            <Avatar>
              <UserAvatar size={65} name={user.name} />
            </Avatar>
            <Texts>
              <Text1>{user.name}</Text1>
              <Text2>{user.student_id || user.email}</Text2>
            </Texts>
          </Info>
        )}

        <ButtonGroup>
          <Button
            bgColor="background"
            textColor="#6C5F8D"
            text="Solicitação de adiantamento"
            hasBorder={true}
            onClick={handlePage}
          />
        </ButtonGroup>

        <Pendentes>
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
                      ? new Date(propina.fee.due_date).toLocaleDateString('pt-PT', { 
                          day: '2-digit', 
                          month: 'long', 
                          year: 'numeric' 
                        })
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
                      ? new Date(propina.fee.updated_at).toLocaleDateString('pt-PT', { 
                          day: '2-digit', 
                          month: 'long', 
                          year: 'numeric' 
                        })
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
        <AlertModal
          isOpen={isModalOpen}
          title="Não consegue pagar agora?"
          message="Solicite o adiantamento da propina deste mês e mantenha o acesso às aulas."
          imageUrl={Bg.src}
          confirmText="Solicitar adiantamento"
          confirmButtonProps={{
            bgColor: "primary",
            textColor: "#FFFFFF",
            hasBorder: false,
          }}
          variant="image"
          cancelText="Cancelar"
          showCancelButton={true}
          onConfirm={handleConfirm}
          onClose={handleClose}
        />
      </Container>
    </ProtectedRoute>
  );
}
