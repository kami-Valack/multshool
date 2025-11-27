"use client";

import React, { useState } from "react";
import styled from "styled-components";
import { Search, CheckCircle, XCircle, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChartBarMultiple } from "./ui/barchatmult";

const ResultsContainer = styled.div`
  background: transparent;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  border: 1px solid #e5e7eb;
`;

const Header = styled.div`
  margin-bottom: 24px;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: #fff;
  margin-bottom: 16px;
`;

const FiltersRow = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
  flex-wrap: wrap;
`;

const SearchWrapper = styled.div`
  flex: 1;
  min-width: 250px;
  position: relative;

  svg {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    width: 16px;
    height: 16px;
    color: #9ca3af;
  }

  input {
    padding-left: 40px;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
`;

const StatCard = styled.div`
  background: #18181bff;
  border-radius: 8px;
  padding: 16px;
  border: 1px solid #979797ff;
`;

const StatLabel = styled.div`
  font-size: 14px;
  color: #979797ff;
  margin-bottom: 4px;
`;

const StatValue = styled.div`
  font-size: 24px;
  font-weight: 600;
  color: #d1d1d1ff;
`;

const StatusBadge = styled.div<{ status: string }>`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  background: ${(props) => {
    switch (props.status) {
      case "aprovado":
        return "#d1fae5";
      case "reprovado":
        return "#fee2e2";
      case "pendente":
        return "#fef3c7";
      default:
        return "#f3f4f6";
    }
  }};
  color: ${(props) => {
    switch (props.status) {
      case "aprovado":
        return "#065f46";
      case "reprovado":
        return "#991b1b";
      case "pendente":
        return "#92400e";
      default:
        return "#374151";
    }
  }};

  svg {
    width: 14px;
    height: 14px;
  }
`;

interface ExamResult {
  id: string;
  candidatoNome: string;
  candidatoBI: string;
  exame: string;
  nota: number;
  notaMaxima: number;
  status: "aprovado" | "reprovado" | "pendente";
  data: string;
}

export default function ExamResults() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("todos");
  const [examFilter, setExamFilter] = useState("todos");

  const results: ExamResult[] = [
    {
      id: "1",
      candidatoNome: "João Silva",
      candidatoBI: "123456789LA",
      exame: "Exame de Matemática",
      nota: 16.5,
      notaMaxima: 20,
      status: "aprovado",
      data: "2025-11-15",
    },
    {
      id: "2",
      candidatoNome: "Maria Santos",
      candidatoBI: "987654321LA",
      exame: "Exame de Matemática",
      nota: 14.0,
      notaMaxima: 20,
      status: "aprovado",
      data: "2025-11-15",
    },
    {
      id: "3",
      candidatoNome: "Pedro Costa",
      candidatoBI: "456789123LA",
      exame: "Exame de Português",
      nota: 8.5,
      notaMaxima: 20,
      status: "reprovado",
      data: "2025-11-16",
    },
    {
      id: "4",
      candidatoNome: "Ana Oliveira",
      candidatoBI: "321654987LA",
      exame: "Exame de Português",
      nota: 0,
      notaMaxima: 20,
      status: "pendente",
      data: "2025-11-16",
    },
  ];

  const filteredResults = results.filter((result) => {
    const matchesSearch =
      result.candidatoNome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      result.candidatoBI.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "todos" || result.status === statusFilter;
    const matchesExam = examFilter === "todos" || result.exame === examFilter;

    return matchesSearch && matchesStatus && matchesExam;
  });

  const stats = {
    total: results.length,
    aprovados: results.filter((r) => r.status === "aprovado").length,
    reprovados: results.filter((r) => r.status === "reprovado").length,
    pendentes: results.filter((r) => r.status === "pendente").length,
    mediaGeral: (
      results.reduce((acc, r) => acc + r.nota, 0) / results.length
    ).toFixed(1),
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "aprovado":
        return <CheckCircle />;
      case "reprovado":
        return <XCircle />;
      case "pendente":
        return <Clock />;
      default:
        return null;
    }
  };

  return (
    <>
      <ResultsContainer>
        <Header>
          <Title>Resultados dos Exames</Title>

          <StatsGrid>
            <StatCard>
              <StatLabel>Total de Candidatos</StatLabel>
              <StatValue>{stats.total}</StatValue>
            </StatCard>
            <StatCard>
              <StatLabel>Aprovados</StatLabel>
              <StatValue style={{ color: "#059669" }}>
                {stats.aprovados}
              </StatValue>
            </StatCard>
            <StatCard>
              <StatLabel>Reprovados</StatLabel>
              <StatValue style={{ color: "#dc2626" }}>
                {stats.reprovados}
              </StatValue>
            </StatCard>
            <StatCard>
              <StatLabel>Pendentes</StatLabel>
              <StatValue style={{ color: "#d97706" }}>
                {stats.pendentes}
              </StatValue>
            </StatCard>
            <StatCard>
              <StatLabel>Média Geral</StatLabel>
              <StatValue>{stats.mediaGeral}</StatValue>
            </StatCard>
          </StatsGrid>

          <FiltersRow>
            <SearchWrapper>
              <Search />
              <Input
                placeholder="Pesquisar por nome ou BI..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </SearchWrapper>
            <Select value={examFilter} onValueChange={setExamFilter}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Filtrar por exame" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os exames</SelectItem>
                <SelectItem value="Exame de Matemática">Matemática</SelectItem>
                <SelectItem value="Exame de Português">Português</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filtrar por status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos</SelectItem>
                <SelectItem value="aprovado">Aprovados</SelectItem>
                <SelectItem value="reprovado">Reprovados</SelectItem>
                <SelectItem value="pendente">Pendentes</SelectItem>
              </SelectContent>
            </Select>
          </FiltersRow>
        </Header>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Candidato</TableHead>
              <TableHead>BI</TableHead>
              <TableHead>Exame</TableHead>
              <TableHead>Nota</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredResults.map((result) => (
              <TableRow key={result.id}>
                <TableCell className="font-medium">
                  {result.candidatoNome}
                </TableCell>
                <TableCell>{result.candidatoBI}</TableCell>
                <TableCell>{result.exame}</TableCell>
                <TableCell>
                  {result.status === "pendente"
                    ? "-"
                    : `${result.nota} / ${result.notaMaxima}`}
                </TableCell>
                <TableCell>
                  {new Date(result.data).toLocaleDateString("pt-PT")}
                </TableCell>
                <TableCell>
                  <StatusBadge status={result.status}>
                    {getStatusIcon(result.status)}
                    {result.status.charAt(0).toUpperCase() +
                      result.status.slice(1)}
                  </StatusBadge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ResultsContainer>
      <div
        style={{
          width: "600px",
          marginTop: "89px"
        }}
      >
        <ChartBarMultiple />
      </div>
    </>
  );
}
