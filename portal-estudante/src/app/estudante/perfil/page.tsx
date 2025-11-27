"use client";

import styled from "styled-components";
import BottomMenu from "@/components/ui/BottomMenu";
import Header from "@/components/ui/HeaderGeneral";
import Image from "next/image";
import { ConfirmacaoCardCompacto } from "@/components/ConfirmacaoCard";
import { useRouter } from "next/navigation";
import QRCode from "react-qr-code";
import { useAuth } from "@/contexts/AuthContext";
import { studentService } from "@/services/studentService";
import { useEffect, useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";

// Styled Components
const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: ${(props) => props.theme.fonts.family.poppins};
  background: ${(props) => props.theme.colors.background_3};
  margin: 0 0 120px 0;
`;

const Top = styled.div`
  width: 100%;
`;

const StudentInfo = styled.div`
  width: 90%;
  background: ${(props) => props.theme.colors.background};
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5px 0 30px 0;
`;

const Photo = styled.div`
  width: 90px;
  height: 90px;
  position: relative;
  border-radius: 50%;
  margin: 20px 0 0 0;
`;

const Nome = styled.p`
  font-size: 16px;
  color: ${(props) => props.theme.colors.primary};
  margin: 15px 0 0 0;
  font-weight: ${(props) => props.theme.fonts.weight.semibold};
`;

const Class = styled.p`
  font-size: 13px;
  color: ${(props) => props.theme.colors.textBlack};
  margin: 4px 0;
`;

const Card = styled.div`
  width: 95%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 40px 0 0 0;
`;

const ButtonGroup = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 30px;
`;

const QRContainer = styled.div`
  margin-top: 30px;
  background: #fff;
  padding: 20px;
  border-radius: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Texto = styled.div`
  width: 90%;
  display: flex;
  align-items: center;
  text-align: center;
`;

export default function Preview() {
  const { user, refreshUser } = useAuth();
  const router = useRouter();
  const [enrollments, setEnrollments] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        if (user) {
          const enrollmentsData = await studentService.getEnrollments();
          setEnrollments(enrollmentsData);
        }
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [user]);

  if (isLoading) {
    return (
      <ProtectedRoute>
        <Container>
          <Top>
            <Header variant="withBack" title="O meu perfil" />
          </Top>
          <div style={{ textAlign: "center", padding: "40px" }}>
            <p>A carregar...</p>
          </div>
        </Container>
      </ProtectedRoute>
    );
  }

  if (!user) {
    return null;
  }

  const activeEnrollment = enrollments.find((e) => e.status === "approved");
  const courseName = activeEnrollment?.course?.name || "Sem curso";

  return (
    <ProtectedRoute>
      <Container>
        <Top>
          <Header variant="withBack" title="O meu perfil" />
        </Top>

        <StudentInfo>
          <Photo>
            {/* Placeholder para foto - pode ser implementado depois */}
            <div
              style={{
                width: "100%",
                height: "100%",
                background: "linear-gradient(135deg, #c5a4db 0%, #6c5f8d 100%)",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontSize: "32px",
                fontWeight: "bold",
              }}
            >
              {user.name.charAt(0).toUpperCase()}
            </div>
          </Photo>
          <Nome>{user.name}</Nome>
          <Class>
            {user.student_id && `Nº ${user.student_id}`} - {courseName}
          </Class>
        </StudentInfo>

        <Card>
          <ConfirmacaoCardCompacto variant="white" />
          {/* QR Code abaixo do card */}
          <QRContainer>
            <QRCode
              value={JSON.stringify({
                id: user.id,
                student_id: user.student_id,
                name: user.name,
                email: user.email,
              })}
              size={150}
              bgColor="#ffffff"
              fgColor="#000000"
            />
          </QRContainer>
          <Texto>
            <p>Escaneie o código QR para aceder ao campus</p>
          </Texto>
        </Card>
      </Container>
      <BottomMenu />
    </ProtectedRoute>
  );
}
