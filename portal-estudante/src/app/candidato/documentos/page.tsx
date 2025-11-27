// components/DocumentosScreen.tsx
"use client";

import React, { useState, useMemo } from "react";
import styled from "styled-components";
import { Header } from "@/components/candidato/Header";
import { useRouter } from "next/navigation";
import UserAvatar from "@/components/ui/Avatar";
import { mockStudents } from "@/mocks/student";
import { FileCard } from "@/components/FileCard";
import { SortOption, SortOptionData } from "@/types/sort";
import { Material, MateriaisData } from "@/types/materiais";
import { AlertModal } from "@/components/AlertModal";

const Container = styled.div`
  width: 100%;
  min-height: 110%;
  background-color: ${(props) => props.theme.colors.background_3};
  padding: 30px 0 0 0;
  margin: 0 0 50px 0;
  font-family: ${(props) => props.theme.fonts.family.poppins};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProfileSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 0 20px 0px;
`;

const ProfileName = styled.h2`
  font-size: 20px;
  font-weight: ${(props) => props.theme.fonts.weight.semibold};
  color: ${(props) => props.theme.colors.primary};
  margin: 20px 0 4px 0;
  text-align: center;
`;

const ProfileSubtitle = styled.p`
  font-size: 14px;
  color: ${(props) => props.theme.colors.foreground};
  margin: 0;
  text-align: center;
`;

const DocumentsSection = styled.div`
  margin-top: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SectionHeader = styled.div`
  width: 90%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`;

const SectionTitle = styled.h3`
  font-size: 15px;
  font-weight: ${(props) => props.theme.fonts.weight.regular};
  color: ${(props) => props.theme.colors.textBlack};
  margin: 0;
`;

const DateLabel = styled.span`
  font-size: 14px;
  color: ${(props) => props.theme.colors.textBlack};
  font-weight: ${(props) => props.theme.fonts.weight.regular};
`;

const DocumentList = styled.div`
  width: 90%;
  height: 42vh;
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

interface Document {
  id: string;
  name: string;
}

const DocumentosScreen: React.FC = () => {
  const estudante = mockStudents.find((s) => s.id === "stu-1");
  const router = useRouter();
  const handleBack = () => {
    router.back();
  };

  const handleMaterialClick = (material: Material) => {
    console.log("Material clicked:", material);
    router.push(`/candidato/material/${material.id}`);
  };

  const handleMaterialDownload = (material: Material) => {
    console.log("Download material:", material);
    if (material.fileUrl) {
      const link = document.createElement("a");
      link.href = material.fileUrl;
      link.download = `${material.title}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleSortChange = (value: string) => {
    setCurrentSort(value as SortOption);
  };

  const handleSortModalClose = () => {
    setIsSortModalOpen(false);
  };

  const [isSortModalOpen, setIsSortModalOpen] = useState(false);
  const [currentSort, setCurrentSort] = useState<SortOption>("date");


  // Opções de ordenação
  const sortOptions: SortOptionData[] = [
    { value: "date", label: "Mais recente" },
    { value: "alphabetical", label: "Ordem alfabética" },
    { value: "subject", label: "Por disciplina" },
  ];

  // Dados mock - em produção virão da API
  const mockData: MateriaisData = {
    courseName: "Materiais - Preparatório",
    description: "O teu sucesso no exame de acesso e na tua jornada académica.",
    availableCount: 5,
    materials: [
      {
        id: "1",
        title: "Bilhete de identidade.pdf",
        subject: "Matemática",
        icon: "book",
        fileUrl: "/materials/matematica-1.pdf",
        createdAt: "2025-09-01T10:00:00Z",
      },
      {
        id: "2",
        title: "Declaração com notas ensino secundário",
        subject: "Física",
        icon: "science",
        fileUrl: "/materials/fisica-geral.pdf",
        createdAt: "2025-09-07T10:00:00Z",
      },
      {
        id: "3",
        title: "Certificado autenticado",
        subject: "Programação",
        icon: "code",
        fileUrl: "/materials/algoritmo.pdf",
        createdAt: "2025-08-20T10:00:00Z",
      },
    ],
  };

  // Função para ordenar documentos
  const sortedMaterials = useMemo(() => {
    const materials = [...mockData.materials];

    switch (currentSort) {
      case "alphabetical":
        return materials.sort((a, b) => a.title.localeCompare(b.title));
      case "subject":
        return materials.sort((a, b) => {
          const subjectComparison = a.subject.localeCompare(b.subject);
          return subjectComparison !== 0
            ? subjectComparison
            : a.title.localeCompare(b.title);
        });
      case "date":
      default:
        return materials.sort((a, b) => {
          const dateA = new Date(a.createdAt ?? "").getTime();
          const dateB = new Date(b.createdAt ?? "").getTime();
          return dateB - dateA; // mais recente primeiro
        });
    }
  }, [mockData.materials, currentSort]);

  return (
    <>
      <Container>
        <Header variant="with-back" text="Documentos" onBack={handleBack} />

        <ProfileSection>
          <UserAvatar />
          <ProfileName>{estudante?.fullName}</ProfileName>
          <ProfileSubtitle>Os meus documentos</ProfileSubtitle>
        </ProfileSection>

        <DocumentsSection>
          <SectionHeader>
            <SectionTitle>Selecione o documento</SectionTitle>
            <DateLabel>Data</DateLabel>
          </SectionHeader>

          <DocumentList>
            {sortedMaterials.map((material) => (
              <FileCard
                key={material.id}
                id={material.id}
                title={material.title}
                icon={material.icon}
                createdAt={material.createdAt}
                onClick={() => handleMaterialClick(material)}
                onDownload={() => handleMaterialDownload(material)}
              />
            ))}
          </DocumentList>
        </DocumentsSection>
      </Container>

      <AlertModal
        isOpen={isSortModalOpen}
        title="Ordenar materiais"
        message=""
        variant="sort"
        sortOptions={sortOptions}
        selectedSort={currentSort}
        onSortChange={handleSortChange}
        onConfirm={() => {}}
        onClose={handleSortModalClose}
      />
    </>
  );
};

export default DocumentosScreen;
