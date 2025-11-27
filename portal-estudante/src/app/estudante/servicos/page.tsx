"use client";

import { useState } from "react";
import BottomMenu from "@/components/ui/BottomMenu";
import styled from "styled-components";
import Header from "@/components/ui/HeaderGeneral";
import PaymentCard from "@/components/ui/CardsLista";
import { CandidaturaCard } from "@/components/ActivityCard";
import { useRouter } from "next/navigation";
import jsPDF from "jspdf";

// Tipos
interface CandidaturaData {
  id: string;
  title: string;
  type: "bolsa" | "estagio" | "credito";
  status: "aprovada" | "pendente" | "rejeitada" | "em_analise";
  date: string;
  logo: string;
  informacaoExtra?: string;
  motivacao?: string;
}

// Styled Components
const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: ${(props) => props.theme.colors.background};
  font-family: "Poppins", sans-serif;
  align-items: center;
`;

const Top = styled.div`
  width: 100%;
`;

const ListaP = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 20px 0 0 0;
`;

const Title = styled.p`
  font-size: 15px;
  padding-left: 10px;
`;

const Row = styled.div`
  width: 100%;
  display: flex;
  margin-top: 15px;
  gap: 10px;
  justify-content: center;
`;

const Pendentes = styled.div`
  width: 90%;
  height: auto;
  display: flex;
  flex-direction: column;
  margin: 40px 0 130px 0;
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  text-align: center;
`;

const EmptyIcon = styled.div`
  font-size: 64px;
  margin-bottom: 16px;
  opacity: 0.5;
`;

const EmptyTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 8px 0;
  font-family: "Poppins", sans-serif;
`;

const EmptyMessage = styled.p`
  font-size: 14px;
  color: #6b7280;
  margin: 0;
  font-family: "Poppins", sans-serif;
  max-width: 280px;
`;

// Modal Styles
const ModalOverlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 24px;
  padding: 32px 24px;
  max-width: 400px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  animation: slideUp 0.3s ease;

  @keyframes slideUp {
    from {
      transform: translateY(50px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;

const ModalClose = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background: none;
  border: none;
  font-size: 24px;
  color: #999;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: #666;
  }
`;

const ModalLogoContainer = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 16px;
  overflow: hidden;
  margin: 0 auto 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f5f5;
`;

const ModalLogo = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ModalTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #1f2937;
  text-align: center;
  margin: 0 0 8px 0;
  font-family: "Poppins", sans-serif;
`;

const ModalSubtitle = styled.p`
  font-size: 14px;
  color: #6b7280;
  text-align: center;
  margin: 0 0 24px 0;
  font-family: "Poppins", sans-serif;
`;

const StatusSection = styled.div<{ status: string }>`
  padding: 16px;
  border-radius: 16px;
  margin-bottom: 24px;
  text-align: center;

  ${({ status }) => {
    switch (status) {
      case "aprovada":
        return `background: #dcfce7; border: 2px solid #16a34a;`;
      case "rejeitada":
        return `background: #fee2e2; border: 2px solid #dc2626;`;
      case "pendente":
        return `background: #fef3c7; border: 2px solid #d97706;`;
      case "em_analise":
        return `background: #dbeafe; border: 2px solid #2563eb;`;
      default:
        return `background: #f3f4f6; border: 2px solid #6b7280;`;
    }
  }}
`;

const StatusIcon = styled.div`
  font-size: 48px;
  margin-bottom: 8px;
`;

const StatusText = styled.h3<{ status: string }>`
  font-size: 18px;
  font-weight: 700;
  margin: 0 0 4px 0;
  font-family: "Poppins", sans-serif;

  ${({ status }) => {
    switch (status) {
      case "aprovada":
        return `color: #16a34a;`;
      case "rejeitada":
        return `color: #dc2626;`;
      case "pendente":
        return `color: #d97706;`;
      case "em_analise":
        return `color: #2563eb;`;
      default:
        return `color: #6b7280;`;
    }
  }}
`;

const StatusDate = styled.p`
  font-size: 12px;
  color: #6b7280;
  margin: 0;
  font-family: "Poppins", sans-serif;
`;

const InfoBox = styled.div`
  background: #f9fafb;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 16px;
`;

const InfoLabel = styled.p`
  font-size: 12px;
  font-weight: 600;
  color: #6b7280;
  margin: 0 0 8px 0;
  font-family: "Poppins", sans-serif;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const InfoText = styled.p`
  font-size: 14px;
  color: #1f2937;
  margin: 0;
  line-height: 1.6;
  font-family: "Poppins", sans-serif;
`;

const MotivacaoBox = styled.div`
  background: linear-gradient(135deg, #f3e8ff 0%, #e0d5ff 100%);
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 24px;
  border-left: 4px solid #7c3aed;
`;

const MotivacaoIcon = styled.span`
  font-size: 20px;
  margin-right: 8px;
`;

const MotivacaoText = styled.p`
  font-size: 14px;
  color: #5b21b6;
  margin: 0;
  line-height: 1.6;
  font-family: "Poppins", sans-serif;
  font-style: italic;
`;

const DownloadButton = styled.button`
  width: 100%;
  background: #5b4b7c;
  color: white;
  border: none;
  padding: 14px;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  font-family: "Poppins", sans-serif;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:hover {
    background: #4a3a6b;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(91, 75, 124, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
`;

export default function Servicos() {
  const router = useRouter();
  const [selectedCandidatura, setSelectedCandidatura] =
    useState<CandidaturaData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Mock de dados para candidaturas com logos
  const candidaturasData: CandidaturaData[] = [
    {
      id: "1",
      title: "Kwik invest: Bolsa de Estudos",
      type: "bolsa",
      status: "aprovada",
      date: "15 Out 2024",
      logo: "https://via.placeholder.com/80/5B4B7C/FFFFFF?text=K",
      informacaoExtra:
        "Dirija-se ao escritório da Kwik Invest na Rua Ho Chi Minh, Edifício Premium, 3º andar, para formalizar a sua documentação até 30 de Novembro de 2024.",
      motivacao:
        "Parabéns! O seu esforço e dedicação foram reconhecidos. Continue a perseguir os seus sonhos!",
    },
    {
      id: "2",
      title: "Unitel S.A - Dep. de Inovação",
      type: "estagio",
      status: "em_analise",
      date: "20 Out 2024",
      logo: "https://via.placeholder.com/80/00A859/FFFFFF?text=U",
      informacaoExtra:
        "A sua candidatura está em análise pela equipa de Recursos Humanos. Entraremos em contacto dentro de 5 dias úteis.",
      motivacao:
        "A paciência é uma virtude! Continue confiante no seu potencial.",
    },
    {
      id: "3",
      title: "Banco Sol - Crédito Estudantil",
      type: "credito",
      status: "pendente",
      date: "25 Out 2024",
      logo: "https://www.bancosol.ao/hubfs/Novo%20Projeto%20(21).jpg",
      informacaoExtra:
        "Aguardamos a submissão dos documentos complementares solicitados por email. Prazo: 15 dias.",
      motivacao:
        "Estamos quase lá! Complete a sua documentação para avançarmos.",
    },
    {
      id: "4",
      title: "Avança na Vida",
      type: "bolsa",
      status: "rejeitada",
      date: "10 Out 2024",
      logo: "https://via.placeholder.com/80/FF6B35/FFFFFF?text=A",
      informacaoExtra:
        "Infelizmente, não foi possível aprovar a sua candidatura neste momento devido ao número limitado de vagas. Para mais informações, contacte: info@avancaavida.ao",
      motivacao:
        "Não desista! Esta é apenas uma porta que se fecha para que outras melhores se abram. Continue a tentar!",
    },
  ];

  const handleCandidaturaClick = (candidatura: CandidaturaData) => {
    setSelectedCandidatura(candidatura);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedCandidatura(null), 300);
  };

  const handleDownloadPDF = () => {
    if (!selectedCandidatura) return;

    const pdf = new jsPDF();
    const pageWidth = pdf.internal.pageSize.getWidth();
    const margin = 20;
    let yPosition = 30;

    // Título
    pdf.setFontSize(20);
    pdf.setFont("helvetica", "bold");
    pdf.text("RESULTADO DA CANDIDATURA", pageWidth / 2, yPosition, {
      align: "center",
    });
    yPosition += 20;

    // Nome da instituição
    pdf.setFontSize(16);
    pdf.setFont("helvetica", "normal");
    pdf.text(selectedCandidatura.title, pageWidth / 2, yPosition, {
      align: "center",
    });
    yPosition += 10;

    // Data
    pdf.setFontSize(12);
    pdf.text(`Data: ${selectedCandidatura.date}`, pageWidth / 2, yPosition, {
      align: "center",
    });
    yPosition += 20;

    // Linha separadora
    pdf.setDrawColor(150, 150, 150);
    pdf.line(margin, yPosition, pageWidth - margin, yPosition);
    yPosition += 15;

    // Status
    pdf.setFontSize(14);
    pdf.setFont("helvetica", "bold");
    const statusText = getStatusText(selectedCandidatura.status);
    pdf.text(`STATUS: ${statusText.toUpperCase()}`, margin, yPosition);
    yPosition += 15;

    // Informação Extra
    if (selectedCandidatura.informacaoExtra) {
      pdf.setFontSize(12);
      pdf.setFont("helvetica", "bold");
      pdf.text("INFORMAÇÕES ADICIONAIS:", margin, yPosition);
      yPosition += 8;

      pdf.setFont("helvetica", "normal");
      const infoLines = pdf.splitTextToSize(
        selectedCandidatura.informacaoExtra,
        pageWidth - 2 * margin
      );
      pdf.text(infoLines, margin, yPosition);
      yPosition += infoLines.length * 6 + 10;
    }

    // Mensagem de motivação
    if (selectedCandidatura.motivacao) {
      pdf.setFontSize(12);
      pdf.setFont("helvetica", "bold");
      pdf.text("MENSAGEM:", margin, yPosition);
      yPosition += 8;

      pdf.setFont("helvetica", "italic");
      const motivacaoLines = pdf.splitTextToSize(
        selectedCandidatura.motivacao,
        pageWidth - 2 * margin
      );
      pdf.text(motivacaoLines, margin, yPosition);
      yPosition += motivacaoLines.length * 6 + 15;
    }

    // Linha separadora
    pdf.line(margin, yPosition, pageWidth - margin, yPosition);
    yPosition += 10;

    // Rodapé
    pdf.setFontSize(10);
    pdf.setFont("helvetica", "normal");
    pdf.text(
      "Documento gerado automaticamente pela plataforma Multischool",
      pageWidth / 2,
      yPosition,
      { align: "center" }
    );

    // Salvar PDF
    const fileName = `resultado-${selectedCandidatura.type}-${selectedCandidatura.id}.pdf`;
    pdf.save(fileName);
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "aprovada":
        return "Candidatura Aprovada";
      case "rejeitada":
        return "Candidatura Não Aprovada";
      case "pendente":
        return "Aguardando Documentação";
      case "em_analise":
        return "Em Análise";
      default:
        return "Pendente";
    }
  };

  //   const getStatusIcon = (status: string) => {
  //     switch (status) {
  //       case "aprovada":
  //         return "🎉";
  //       case "rejeitada":
  //         return "😔";
  //       case "pendente":
  //         return "⏳";
  //       case "em_analise":
  //         return "🔍";
  //       default:
  //         return "📋";
  //     }
  //   };

  const handleServiceClick = (serviceType: string) => {
    router.push(`/estudante/servicos/${serviceType}`);
  };

  return (
    <>
      <Container>
        <Top>
          <Header variant="withBack" title="Serviços Multischool" />
        </Top>

        <ListaP>
          <Title>Menu de serviços</Title>
          <Row>
            <PaymentCard
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="23"
                  height="23"
                  viewBox="0 0 48 48"
                  fill="#6C5F8D"
                >
                  <g
                    fill="none"
                    stroke="#6C5F8D"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="4"
                  >
                    <path d="m4 13l20-5l20 5l-20 5l-20-5Z" />
                    <path d="M13 16v9.97S18 29 24 29s11-3.03 11-3.03V16M7 14v22m-3-2h6v6H4z" />
                  </g>
                </svg>
              }
              title="Bolsas"
              onClick={() => handleServiceClick("bolsas")}
            />
            <PaymentCard
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="23"
                  height="23"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="none"
                    stroke="#6C5F8D"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 9V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2m2 4h10a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2Zm7-5a2 2 0 1 1-4 0a2 2 0 0 1 4 0Z"
                  />
                </svg>
              }
              title="Créditos"
              onClick={() => handleServiceClick("creditos")}
            />
            <PaymentCard
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 2048 2048"
                >
                  <path
                    fill="#6C5F8D"
                    d="M1920 0v2048H256v-254H128v-128h128v-257H128v-128h128V769H128V641h128V385H128V257h128V0h1664zm-128 128H384v1792h1408V128zm-128 384h-640V384h640v128zm0 256h-640V640h640v128zm-960 892q-39 0-73-14t-60-40t-40-60t-15-74q0-39 14-73t40-59t60-41t74-15q39 0 73 15t59 40t41 60t15 73q0 39-15 73t-40 60t-60 40t-73 15zm0-256q-29 0-48 19t-20 49q0 29 19 48t49 20q29 0 48-19t20-49q0-29-19-48t-49-20zm0-640q-39 0-73-14t-60-40t-40-60t-15-74q0-39 14-73t40-59t60-41t74-15q39 0 73 15t59 40t41 60t15 73q0 39-15 73t-40 60t-60 40t-73 15zm0-256q-29 0-48 19t-20 49q0 29 19 48t49 20q29 0 48-19t20-49q0-29-19-48t-49-20zm960 900h-640v-128h640v128zm0 256h-640v-128h640v128z"
                  />
                </svg>
              }
              title="Estágios"
              onClick={() => handleServiceClick("estagios")}
            />
          </Row>
        </ListaP>

        <Pendentes>
          <Title>Candidaturas recentes</Title>

          {candidaturasData.length > 0 ? (
            candidaturasData.map((candidatura) => (
              <CandidaturaCard
                key={candidatura.id}
                title={candidatura.title}
                type={candidatura.type}
                status={candidatura.status}
                date={candidatura.date}
                logo={candidatura.logo}
                onClick={() => handleCandidaturaClick(candidatura)}
              />
            ))
          ) : (
            <EmptyState>
              <EmptyIcon>📋</EmptyIcon>
              <EmptyTitle>Nenhuma candidatura realizada</EmptyTitle>
              <EmptyMessage>
                Você ainda não se candidatou a nenhuma bolsa, estágio ou
                crédito. Explore as opções acima para começar!
              </EmptyMessage>
            </EmptyState>
          )}
        </Pendentes>
        <BottomMenu />
      </Container>

      {/* Modal de Resultado */}
      <ModalOverlay isOpen={isModalOpen} onClick={handleCloseModal}>
        <ModalContent onClick={(e) => e.stopPropagation()}>
          <ModalClose onClick={handleCloseModal}>×</ModalClose>

          {selectedCandidatura && (
            <>
              <ModalLogoContainer>
                <ModalLogo
                  src={selectedCandidatura.logo}
                  alt={selectedCandidatura.title}
                />
              </ModalLogoContainer>

              <ModalTitle>{selectedCandidatura.title}</ModalTitle>
              <ModalSubtitle>
                {selectedCandidatura.type === "bolsa"
                  ? "Bolsa de Estudos"
                  : selectedCandidatura.type === "estagio"
                  ? "Estágio Profissional"
                  : "Crédito Estudantil"}
              </ModalSubtitle>

              <StatusSection status={selectedCandidatura.status}>
                {/* <StatusIcon>{getStatusIcon(selectedCandidatura.status)}</StatusIcon> */}
                <StatusText status={selectedCandidatura.status}>
                  {getStatusText(selectedCandidatura.status)}
                </StatusText>
                <StatusDate>
                  Data da candidatura: {selectedCandidatura.date}
                </StatusDate>
              </StatusSection>

              {selectedCandidatura.informacaoExtra && (
                <InfoBox>
                  <InfoLabel>Informações Adicionais</InfoLabel>
                  <InfoText>{selectedCandidatura.informacaoExtra}</InfoText>
                </InfoBox>
              )}

              {selectedCandidatura.motivacao && (
                <MotivacaoBox>
                  <InfoText>
                    <MotivacaoIcon>💪</MotivacaoIcon>
                    <MotivacaoText>
                      {selectedCandidatura.motivacao}
                    </MotivacaoText>
                  </InfoText>
                </MotivacaoBox>
              )}

              <DownloadButton onClick={handleDownloadPDF}>
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 16 16"
                    fill="#ffffff"
                  >
                    <g fill="#ffffff">
                      <path d="M9 7.826V1H7v6.826L4.392 5.59L3.09 7.108L8 11.318l4.91-4.21l-1.302-1.518z" />
                      <path d="M3 13v-3H1v3a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-3h-2v3z" />
                    </g>
                  </svg>
                </span>
                Baixar Resultado em PDF
              </DownloadButton>
            </>
          )}
        </ModalContent>
      </ModalOverlay>
    </>
  );
}
