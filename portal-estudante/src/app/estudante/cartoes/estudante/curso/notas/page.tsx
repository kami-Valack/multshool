"use client";

import React, { useState } from "react";
import styled from "styled-components";
import Header from "@/components/ui/HeaderGeneral";
import BottomMenu from "@/components/ui/BottomMenu";

// Mock data - simulando dados que viriam da BD
const mockGradesData = [
  {
    id: 1,
    date: "12/09",
    subject: "CDI I - Cálculo Difer. e Int...",
    grades: {
      pp1: "12v",
      pp2: "13v",
      exn: "5v",
      er: "15v",
    },
    status: "APROVADO",
    statusColor: "#4CAF50",
  },
  {
    id: 2,
    date: "11/09",
    subject: "IEF - Introd. à Eng. Inform...",
    grades: {
      pp1: "12v",
      pp2: "13v",
      exn: "5v",
      er: "----",
    },
    status: "EXAME DE RECURSO",
    statusColor: "#FF9800",
  },
  {
    id: 3,
    date: "10/09",
    subject: "Programação I",
    grades: {
      pp1: "12v",
      pp2: "13v",
      exn: "5v",
      er: "5v",
    },
    status: "REPROVADO",
    statusColor: "#F44336",
  },
];

// Styled Components
const Top = styled.div`
  width: 100%;
`;

const Container = styled.div`
  width: 100%;
  max-width: 480px;
  margin: 0 auto;
  font-family: ${(props) => props.theme.fonts.family.poppins};
  background-color: ${(props) => props.theme.colors.background_3};
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const FilterBar = styled.div`
  background-color: white;
  padding: 12px 16px;
  display: flex;
  gap: 12px;
  align-items: center;
  border-bottom: 1px solid #e0e0e0;
`;

const FilterLabel = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: #666;
`;

const FilterButton = styled.button<{ $isActive?: boolean }>`
  background-color: ${(props) => (props.$isActive ? "#7B68A6" : "white")};
  border: 1px solid ${(props) => (props.$isActive ? "#7B68A6" : "#D0D0D0")};
  border-radius: 8px;
  padding: 6px 12px;
  font-size: 13px;
  color: ${(props) => (props.$isActive ? "white" : "#333")};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  font-weight: 500;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${(props) => (props.$isActive ? "#6B5896" : "#F9F9F9")};
  }
`;

const SortButton = styled.button`
  background: none;
  border: none;
  padding: 6px;
  cursor: pointer;
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 13px;
  color: #666;
`;

const Content = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  padding-bottom: 90px;
`;

const GradeCard = styled.div`
  background-color: white;
  border-radius: 16px;
  padding: 16px;
  margin-bottom: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  position: relative;
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
`;

const CardDate = styled.div`
  font-size: 13px;
  color: #888;
  font-weight: 500;
`;

const CardTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 4px 0 0 0;
`;

const MoreButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  color: #999;
`;

const GradesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
  margin-bottom: 12px;
`;

const GradeItem = styled.div`
  background-color: #f8f8f8;
  border-radius: 8px;
  padding: 8px;
  text-align: center;
`;

const GradeLabel = styled.div`
  font-size: 11px;
  color: #888;
  font-weight: 500;
  margin-bottom: 4px;
`;

const GradeValue = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: #1a1a1a;
`;

const StatusBadge = styled.div<{ $color: string }>`
  background-color: ${(props) => props.$color}15;
  color: ${(props) => props.$color};
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  text-align: center;
  letter-spacing: 0.3px;
`;


export default function NotasPage() {
  const [gradesData, setGradesData] = useState(mockGradesData);
  const [sortBy, setSortBy] = useState<"date" | "subject">("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const handleSort = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  const handleFilterChange = (filter: "date" | "subject") => {
    setSortBy(filter);
  };

  const sortedGrades = [...gradesData].sort((a, b) => {
    if (sortBy === "date") {
      const [dayA, monthA] = a.date.split("/").map(Number);
      const [dayB, monthB] = b.date.split("/").map(Number);
      const dateA = new Date(2024, monthA - 1, dayA);
      const dateB = new Date(2024, monthB - 1, dayB);
      return sortOrder === "asc"
        ? dateA.getTime() - dateB.getTime()
        : dateB.getTime() - dateA.getTime();
    } else {
      return sortOrder === "asc"
        ? a.subject.localeCompare(b.subject)
        : b.subject.localeCompare(a.subject);
    }
  });

  return (
    <>
      <Top>
        <Header variant="withBack" title="Curso" />
      </Top>
      <Container>
      
        {/* Content */}
        <Content>
          {gradesData.map((grade) => (
            <GradeCard key={grade.id}>
              <CardHeader>
                <div>
                  <CardDate>{grade.date}</CardDate>
                  <CardTitle>{grade.subject}</CardTitle>
                </div>
                <MoreButton>{/* <MoreVertical size={20} /> */}</MoreButton>
              </CardHeader>

              <GradesGrid>
                <GradeItem>
                  <GradeLabel>PP1</GradeLabel>
                  <GradeValue>{grade.grades.pp1}</GradeValue>
                </GradeItem>
                <GradeItem>
                  <GradeLabel>PP2</GradeLabel>
                  <GradeValue>{grade.grades.pp2}</GradeValue>
                </GradeItem>
                <GradeItem>
                  <GradeLabel>EXN</GradeLabel>
                  <GradeValue>{grade.grades.exn}</GradeValue>
                </GradeItem>
                <GradeItem>
                  <GradeLabel>ER</GradeLabel>
                  <GradeValue>{grade.grades.er}</GradeValue>
                </GradeItem>
              </GradesGrid>

              <StatusBadge $color={grade.statusColor}>
                Situação: {grade.status}
              </StatusBadge>
            </GradeCard>
          ))}
        </Content>

        {/* Bottom Menu */}
       <BottomMenu/>
      </Container>
    </>
  );
}
