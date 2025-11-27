"use client";

import { useState } from "react";
import styled from "styled-components";
import BottomMenu from "@/components/ui/BottomMenu";
import Header from "@/components/ui/HeaderGeneral";
import UserAvatar from "@/components/ui/Avatar";
import RecentSection from "@/components/ui/RecentSection";
import { mockStudents } from "@/mocks/student";
import { usePDFGenerator, Transaction } from "@/services/pdfService";

// Dados dos movimentos - idealmente viriam de uma API ou context
const movimentosData: Transaction[] = [
  {
    title: "Propina Julho",
    date: "05.07.2024",
    amount: "-54.600,50 kz",
    isPositive: false,
  },
  {
    title: "Propina Junho",
    date: "06.06.2024",
    amount: "-54.600,50 kz",
    isPositive: false,
  },
  {
    title: "Bônus plataforma",
    date: "06.06.2024",
    amount: "+10.900,50 kz",
    isPositive: true,
  },
  {
    title: "Pag. Estágio",
    date: "06.06.2024",
    amount: "+45.600,50 kz",
    isPositive: true,
  },
  {
    title: "Propina Maio",
    date: "01.05.2024",
    amount: "-54.600,50 kz",
    isPositive: false,
  },
];

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
  justify-content: space-between;
  align-items: center;
  margin: 10px 0 30px 0;
`;

const Avatar = styled.div`
  width: 45px;
  height: 45px;
`;

const Texts = styled.div`
  width: 60%;
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

const ExtractButton = styled.button<{ $loading?: boolean }>`
  height: 32px;
  color: ${(props) => (props.$loading ? "#666" : props.theme.colors.sucess)};
  background: ${(props) => (props.$loading ? "#f0f0f0" : "#bef3bd")};
  border: none;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
  cursor: ${(props) => (props.$loading ? "wait" : "pointer")};
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 70px;
`;

const LoadingSpinner = styled.div`
  width: 12px;
  height: 12px;
  border: 2px solid #666;
  border-top: 2px solid transparent;
  border-radius: 50%;
  animation: spin 1s linear infinite;
`;

const ErrorMessage = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  background: #fee;
  color: #c33;
  padding: 12px 16px;
  border-radius: 8px;
  border-left: 4px solid #c33;
  font-size: 12px;
  z-index: 1000;
  animation: slideIn 0.3s ease;
  font-family: ${(props) => props.theme.fonts.family.poppins};
`;

const SuccessMessage = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  background: #efe;
  color: #363;
  padding: 12px 16px;
  border-radius: 8px;
  border-left: 4px solid #4a4;
  font-size: 12px;
  z-index: 1000;
  animation: slideIn 0.3s ease;
  font-family: ${(props) => props.theme.fonts.family.poppins};

  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
`;

export default function Movimentos() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const { generateExtract, downloadTextOnly } = usePDFGenerator();
  const student = mockStudents.find((s) => s.id === "stu-1");

  if (!student) {
    return <p>Dados do estudante não encontrados</p>;
  }

  const handleGenerateExtract = async () => {
    if (isGenerating) return;

    setIsGenerating(true);
    setMessage(null);

    try {
      console.log("🚀 Iniciando download do extracto...");

      const result = await generateExtract(
        {
          fullName: student.fullName,
          accountType: "Conta Multischool",
        },
        movimentosData
      );

      if (result.success) {
        setMessage({
          type: "success",
          text: "Download em curso...",
        });
        console.log("✅ Download concluído com sucesso!");
      } else {
        console.log("❌ Erro no download:", result.error);

        // Tentar método alternativo
        const textResult = downloadTextOnly(
          {
            fullName: student.fullName,
            accountType: "Conta Multischool",
          },
          movimentosData
        );

        if (textResult.success) {
          setMessage({
            type: "success",
            text: "📄 Extracto baixado como texto! Verifique Downloads",
          });
        } else {
          setMessage({
            type: "error",
            text: "❌ Erro no download. Tente novamente ou verifique permissões",
          });
        }
      }
    } catch (error) {
      console.error("💥 Erro inesperado:", error);
      setMessage({
        type: "error",
        text: "💥 Erro inesperado. Tente recarregar a página",
      });
    } finally {
      setIsGenerating(false);

      setTimeout(() => {
        setMessage(null);
      }, 6000);
    }
  };

  return (
    <>
      <Container>
        <Top>
          <Header variant="withBack" title="Movimentos" />
        </Top>

        <Info>
          <Avatar>
            <UserAvatar size={45} name={student?.fullName} />
          </Avatar>
          <Texts>
            <Text1>{student.fullName}</Text1>
            <Text2>Conta Multischool</Text2>
          </Texts>
          <ExtractButton
            onClick={handleGenerateExtract}
            disabled={isGenerating}
            $loading={isGenerating}
          >
            {isGenerating && <LoadingSpinner />}
            {isGenerating ? "Gerando..." : "Extracto"}
          </ExtractButton>
        </Info>

        <RecentSection variant="movimentos" />
        <BottomMenu />
      </Container>

      {/* Mensagens de feedback */}
      {message && message.type === "success" && (
        <SuccessMessage>{message.text}</SuccessMessage>
      )}
      {message && message.type === "error" && (
        <ErrorMessage>{message.text}</ErrorMessage>
      )}
    </>
  );
}
