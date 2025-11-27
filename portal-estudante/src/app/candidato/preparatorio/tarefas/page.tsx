"use client";

import React, { useState, useMemo } from "react";
import styled from "styled-components";
import { Header } from "@/components/candidato/Header";
import { HeroCard } from "@/components/candidato/HeroCard";
import { FileCard } from "@/components/FileCard";
import { AlertModal } from "@/components/AlertModal";
import { useRouter } from "next/navigation";
import Bg from "@/assets/backgrounds/candidato/tarefas.png";
import { Material, MateriaisData } from "@/types/materiais";
import { SortOption, SortOptionData } from "@/types/sort";

const Container = styled.div`
  width: 90vw;
  margin: 0 auto;
  font-family: ${(props) => props.theme.fonts.family.poppins};
  min-height: 100vh;
  padding-bottom: 30px;
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0 15px 0;
`;

const SectionTitle = styled.h2`
  font-size: 15px;
  font-weight: ${(props) => props.theme.fonts.weight.regular};
  color: ${(props) => props.theme.colors.textBlack};
  margin: 0;
`;

const DataLabel = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: ${(props) => props.theme.colors.foreground};
  text-decoration: underline;
  cursor: pointer;
  transition: color 0.2s ease;

  &:hover {
    color: ${(props) => props.theme.colors.primary};
  }
`;

const MaterialsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export default function MateriaisPreparatorioPage() {
  const router = useRouter();
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
    courseName: "Tarefas - Curso Preparatório",
    description: "O teu sucesso no exame de acesso e na tua jornada académica.",
    availableCount: 4,
    materials: [
      {
        id: "1",
        title: "Matemática",
        subject: "Matemática",
        icon: "book",
        fileUrl: "/materials/matematica-1.pdf",
        createdAt: "2025-09-01T10:00:00Z",
      },
      {
        id: "2",
        title: "Física Geral",
        subject: "Física",
        icon: "science",
        fileUrl: "/materials/fisica-geral.pdf",
        createdAt: "2025-09-07T10:00:00Z",
      },
      {
        id: "3",
        title: "Algoritmo",
        subject: "Programação",
        icon: "code",
        fileUrl: "/materials/algoritmo.pdf",
        createdAt: "2025-08-20T10:00:00Z",
      },
      {
        id: "4",
        title: "Matemática Avançada",
        subject: "Matemática",
        icon: "book",
        fileUrl: "/materials/matematica-2.pdf",
        createdAt: "2025-09-01T10:00:00Z",
      },
    ],
  };

  // Função para ordenar materiais
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

  const handleBackClick = () => {
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

  const handleSortClick = () => {
    setIsSortModalOpen(true);
  };

  const handleSortChange = (value: string) => {
    setCurrentSort(value as SortOption);
  };

  const handleSortModalClose = () => {
    setIsSortModalOpen(false);
  };

  return (
    <>
      <Container>
        <Header variant="with-back" onBack={handleBackClick} />

        <HeroCard
          title={mockData.courseName}
          subtitle={mockData.description}
          imageUrl={Bg.src}
          badge={`${mockData.availableCount} disponíveis`}
          badgeVariant="count"
        />

        <SectionHeader>
          <SectionTitle>Selecione a tarefa</SectionTitle>
          <DataLabel onClick={handleSortClick}>Ordenar por</DataLabel>
        </SectionHeader>

        <MaterialsList>
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
        </MaterialsList>
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
}
