"use client";
import React from "react";
import styled from "styled-components";
import UserAvatar from "@/components/ui/Avatar";
import { mockStudents } from "@/mocks/student";
import { mockEnrollments } from "@/mocks/inscricao";
import { mockExamResults } from "@/mocks/exam";
import { formatDate } from "@/utils/formatDate";
import { Header } from "@/components/candidato/Header";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";

// Interfaces
interface DetailValueProps {
  isGrade?: boolean;
}

// Styled Components
const Container = styled.div`
  background-color: ${(props) => props.theme.colors.background};
  min-height: 100vh;
  font-family: ${(props) => props.theme.fonts.family.poppins};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProfileCard = styled.div`
  width: 90%;
  background-color: ${(props) => props.theme.colors.background_2};
  border-radius: 20px;
  padding: 20px 0px;
  text-align: center;
  margin-bottom: 20px;
`;

const ProfileImage = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

const StudentName = styled.h2`
  font-size: 16px;
  font-weight: ${(props) => props.theme.fonts.weight.semibold};
  color: ${(props) => props.theme.colors.primary};
  margin: 0 0 5px 0;
`;

const StatusContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

const StatusLabel = styled.span`
  color: ${(props) => props.theme.colors.textBlack};
  font-size: 14px;
  font-weight: 500;
`;

const StatusValue = styled.span`
  color: ${(props) => props.theme.colors.sucess};
  font-weight: 600;
  font-size: 14px;
`;

const DetailsCard = styled.div`
  width: 90%;
  background-color: ${(props) => props.theme.colors.background_2};
  border-radius: 12px;
  padding: 0;
  margin-bottom: 30px;
  overflow: hidden;
`;

const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px 20px;
  border-bottom: 1px solid #f3f4f6;

  &:last-child {
    border-bottom: none;
  }
`;

const DetailLabel = styled.span`
  color: ${(props) => props.theme.colors.foreground};
  font-size: 14px;
`;

const DetailValue = styled.span<DetailValueProps>`
  color: ${({ isGrade, theme }) =>
    isGrade ? "#10b981" : theme.colors.primary};
  font-size: 14px;
  font-weight: ${(props) => props.theme.fonts.weight.semibold};
`;

const AccessButton = styled.div`
  width: 90%;
  height: 140px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 50px
`;

// Component
const ExamResultScreen: React.FC = () => {
  const student = mockStudents.find((s) => s.id === "stu-1");
  const inscricao = mockEnrollments.find((e) => e.studentId === student?.id);
  const examResult = mockExamResults.find((ex) => ex.studentId === student?.id);
  const router = useRouter();
  const handleBackClick = () => {
    router.back();
  };

  const handleClickDashboard = () => {
    router.push("/estudante/dashboard");
  };

  const handleClickDocuments = () => {
    router.push("documentos");
  };

  if (!student || !inscricao || !examResult) {
    return <p>Dados do estudante não encontrados</p>;
  }
  return (
    <Container>
      <Header variant="with-back" onBack={handleBackClick} />

      <ProfileCard>
        <ProfileImage>
          <UserAvatar size={80} name={student.fullName} />
        </ProfileImage>
        <StudentName>{student.fullName}</StudentName>
        <StatusContainer>
          <StatusLabel>Estado:</StatusLabel>
          <StatusValue
            style={{ color: examResult.approved ? "#10b981" : "#ef4444" }}
          >
            {examResult.approved ? "Aprovado" : "Reprovado"}
          </StatusValue>
        </StatusContainer>
      </ProfileCard>

      <DetailsCard>
        <DetailRow>
          <DetailLabel>Data</DetailLabel>
          <DetailValue>{formatDate(examResult.date)}</DetailValue>
        </DetailRow>
        <DetailRow>
          <DetailLabel>Instituição</DetailLabel>
          <DetailValue>{inscricao.institution}</DetailValue>
        </DetailRow>
        <DetailRow>
          <DetailLabel>Faculdade</DetailLabel>
          <DetailValue>{inscricao.faculdade}</DetailValue>
        </DetailRow>
        <DetailRow>
          <DetailLabel>Curso</DetailLabel>
          <DetailValue>{inscricao.course}</DetailValue>
        </DetailRow>
        <DetailRow>
          <DetailLabel>Período</DetailLabel>
          <DetailValue>{inscricao.period}</DetailValue>
        </DetailRow>
        <DetailRow>
          <DetailLabel>Nota</DetailLabel>
          <DetailValue isGrade>{examResult.notaexame} Valores</DetailValue>
        </DetailRow>
      </DetailsCard>

      <AccessButton>
        <Button
          bgColor="background"
          textColor="#6C5F8D"
          text="Os meus documentos"
          hasBorder={true}
          onClick={handleClickDocuments}
        />
        <Button
          bgColor="#6C5F8D"
          textColor="#FFFFFF"
          text="Aceder ao dashboard"
          hasBorder={true}
          onClick={handleClickDashboard}
        />
      </AccessButton>
    </Container>
  );
};

export default ExamResultScreen;
