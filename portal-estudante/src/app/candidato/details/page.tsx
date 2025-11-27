"use client";

import React from "react";
import styled from "styled-components";
import { Header } from "@/components/candidato/Header";
import BgVectors from "@/components/Bg_vectors";
import Button from "@/components/ui/Button";

const Container = styled.div`
  min-height: 125vh;
  padding: 0 20px;
  margin-bottom: 90px;
`;

const CandidateCard = styled.div`
  background: ${(props) => props.theme.colors.background_2};
  border-radius: 16px;
  padding: 30px 20px;
  margin-bottom: 30px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
`;

const ProfileImageContainer = styled.div`
  width: 120px;
  height: 120px;
  margin: 0 auto 20px;
  border-radius: 50%;
  overflow: hidden;
  background: #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// const ProfileImage = styled.div`
//   width: 100%;
//   height: 100%;
//   object-fit: cover;
// `;

const ProfileImagePlaceholder = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 35px 40px 35px;
  background: #e9e9e9ff;
  border-radius: 20px;
  margin: 0 0 30px 0;
`;

const ProfileImage = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: #ddd;
  margin-bottom: 16px;
  background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="40" r="18" fill="%23999"/><path d="M20 85c0-16 13-30 30-30s30 14 30 30" fill="%23999"/></svg>');
  background-size: cover;
  background-position: center;
  object-fit: cover;
`;

// const ProfileImagePlaceholder = styled.div`
//   width: 100%;
//   height: 100%;
//   background: linear-gradient(135deg, #9ca3af 0%, #6b7280 100%);
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   font-size: 40px;
//   color: white;

//   &::before {
//     content: "👤";
//   }
// `;

const CandidateName = styled.h2`
  font-size: 20px;
  font-weight: ${(props) => props.theme.fonts.weight.semibold};
  color: ${(props) => props.theme.colors.primary};
  margin: 0 0 8px 0;
  line-height: 1.2;
`;

const CandidateCourse = styled.p`
  font-size: 14px;
  color: ${(props) => props.theme.colors.textBlack};
  margin: 0;
  font-weight: ${(props) => props.theme.fonts.weight.regular};
  line-height: 1.3;
`;

const DetailsSection = styled.div`
  background: ${(props) => props.theme.colors.background_2};
  border-radius: 16px;
  padding: 0;
  margin-bottom: 30px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
`;

const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);

  &:last-child {
    border-bottom: none;
  }
`;

const DetailLabel = styled.span`
  font-size: 14px;
  color: ${(props) => props.theme.colors.foreground};
  font-weight: ${(props) => props.theme.fonts.weight.regular};
`;

const DetailValue = styled.span`
  font-size: 14px;
  color: ${(props) => props.theme.colors.primary};
  font-weight: ${(props) => props.theme.fonts.weight.semibold};
  text-align: right;
`;

const ActionButton = styled.div`
  width: 100%;
`;

const NewCandidatureButton = styled.button`
  width: 100%;
  background: transparent;
  border: 2px solid ${(props) => props.theme.colors.primary};
  border-radius: 16px;
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  font-size: 16px;
  font-weight: ${(props) => props.theme.fonts.weight.regular};
  color: ${(props) => props.theme.colors.primary};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${(props) => props.theme.colors.primary};
    color: white;
  }

  &::before {
    content: "+";
    font-size: 20px;
    font-weight: 300;
  }
`;

interface CandidateData {
  name: string;
  course: string;
  profileImage?: string;
  examDetails: {
    date: string;
    institution: string;
    faculty: string;
    room: string;
    period: string;
    schedule: string;
    phone: string;
  };
}

export default function CandidateDetailsScreen() {
  // Dados mockados - substituir pela chamada da API
  const candidateData: CandidateData = {
    name: "Nome indefinido",
    course: "Curso selecionado | Faculdade Faculdade",
    profileImage: undefined, // Substitua por URL da imagem se disponível
    examDetails: {
      date: "03 de Agosto de 2025",
      institution: "ISPTEC",
      faculty: "Engenharia e Tecnologia",
      room: "BA22",
      period: "Manhã",
      schedule: "08h:00 às 10h:30",
      phone: "999 999 999",
    },
  };

  const handleBack = () => {
    console.log("Voltar para tela anterior");
  };

  const handleNewCandidature = () => {
    console.log("Nova candidatura");
  };

  return (
    <BgVectors>
      <Container>
        <Header variant="with-back" onBack={handleBack} />

        <CandidateCard>
          <ProfileImageContainer>
            {candidateData.profileImage ? (
              <ProfileImage />
            ) : (
              <ProfileImagePlaceholder />
            )}
          </ProfileImageContainer>

          <CandidateName>{candidateData.name}</CandidateName>
          <CandidateCourse>{candidateData.course}</CandidateCourse>
        </CandidateCard>

        <DetailsSection>
          <DetailRow>
            <DetailLabel>Data</DetailLabel>
            <DetailValue>{candidateData.examDetails.date}</DetailValue>
          </DetailRow>

          <DetailRow>
            <DetailLabel>Instituição</DetailLabel>
            <DetailValue>{candidateData.examDetails.institution}</DetailValue>
          </DetailRow>

          <DetailRow>
            <DetailLabel>Faculdade</DetailLabel>
            <DetailValue>{candidateData.examDetails.faculty}</DetailValue>
          </DetailRow>

          <DetailRow>
            <DetailLabel>Sala</DetailLabel>
            <DetailValue>{candidateData.examDetails.room}</DetailValue>
          </DetailRow>

          <DetailRow>
            <DetailLabel>Período</DetailLabel>
            <DetailValue>{candidateData.examDetails.period}</DetailValue>
          </DetailRow>

          <DetailRow>
            <DetailLabel>Horário</DetailLabel>
            <DetailValue>{candidateData.examDetails.schedule}</DetailValue>
          </DetailRow>

          <DetailRow>
            <DetailLabel>Telefone</DetailLabel>
            <DetailValue>{candidateData.examDetails.phone}</DetailValue>
          </DetailRow>
        </DetailsSection>

        <Button
          bgColor="background"
          textColor="#6C5F8D"
          text="+ Nova candidatura"
          hasBorder={true}
          onClick={handleNewCandidature}
        />
      </Container>
    </BgVectors>
  );
}
