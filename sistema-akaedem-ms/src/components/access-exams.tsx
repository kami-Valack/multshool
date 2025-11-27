"use client"

import React, { useState } from 'react';
import styled from 'styled-components';
import { Calendar, Clock, MapPin, Users, Plus } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";


// COMPONENTE
const ExamCard = styled.div`
  background: #18181bff;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  border: 1px solid #979797ff;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
    transform: translateY(-2px);
  }
`;

const ExamHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
  margin-bottom: 16px;
`;

const ExamTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #ebebebff;
  margin: 0;
`;

const ExamBadge = styled.span<{ status: string }>`
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
  background: ${props => {
    switch (props.status) {
      case 'agendado': return '#dbeafe';
      case 'em-andamento': return '#fef3c7';
      case 'concluido': return '#d1fae5';
      default: return '#f3f4f6';
    }
  }};
  color: ${props => {
    switch (props.status) {
      case 'agendado': return '#1e40af';
      case 'em-andamento': return '#92400e';
      case 'concluido': return '#065f46';
      default: return '#374151';
    }
  }};
`;

const ExamInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const InfoRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #c1c1c1ff;

  svg {
    width: 16px;
    height: 16px;
  }
`;

const ExamsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 20px;
  margin-top: 20px;
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const SectionTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: #fff;
`;

interface Exam {
  id: string;
  nome: string;
  data: string;
  hora: string;
  local: string;
  vagas: number;
  inscritos: number;
  status: 'agendado' | 'em-andamento' | 'concluido';
}

export default function AccessExams() {
  const [exams, setExams] = useState<Exam[]>([
    {
      id: '1',
      nome: 'Exame de Matemática',
      data: '2025-11-15',
      hora: '09:00',
      local: 'Campus Principal - Sala 101',
      vagas: 50,
      inscritos: 42,
      status: 'agendado'
    },
    {
      id: '2',
      nome: 'Exame de Português',
      data: '2025-11-16',
      hora: '14:00',
      local: 'Campus Principal - Sala 102',
      vagas: 50,
      inscritos: 38,
      status: 'agendado'
    }
  ]);

  const [newExam, setNewExam] = useState({
    nome: '',
    data: '',
    hora: '',
    local: '',
    vagas: '',
  });

  const handleCreateExam = () => {
    if (newExam.nome && newExam.data && newExam.hora && newExam.local && newExam.vagas) {
      const exam: Exam = {
        id: Date.now().toString(),
        nome: newExam.nome,
        data: newExam.data,
        hora: newExam.hora,
        local: newExam.local,
        vagas: parseInt(newExam.vagas),
        inscritos: 0,
        status: 'agendado'
      };
      setExams([...exams, exam]);
      setNewExam({ nome: '', data: '', hora: '', local: '', vagas: '' });
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-PT', { day: '2-digit', month: 'long', year: 'numeric' });
  };

  return (
    <div style={{ padding: '20px' }}>
      <SectionHeader>
        <SectionTitle>Exames de Acesso</SectionTitle>
        <Sheet>
          <SheetTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Novo Exame
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Criar Novo Exame</SheetTitle>
              <SheetDescription>
                Preencha os detalhes do exame de acesso
              </SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="nome">Nome do Exame</Label>
                <Input
                  id="nome"
                  value={newExam.nome}
                  onChange={(e) => setNewExam({ ...newExam, nome: e.target.value })}
                  placeholder="Ex: Exame de Matemática"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="data">Data</Label>
                <Input
                  id="data"
                  type="date"
                  value={newExam.data}
                  onChange={(e) => setNewExam({ ...newExam, data: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="hora">Hora</Label>
                <Input
                  id="hora"
                  type="time"
                  value={newExam.hora}
                  onChange={(e) => setNewExam({ ...newExam, hora: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="local">Local</Label>
                <Input
                  id="local"
                  value={newExam.local}
                  onChange={(e) => setNewExam({ ...newExam, local: e.target.value })}
                  placeholder="Ex: Campus Principal - Sala 101"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="vagas">Número de Vagas</Label>
                <Input
                  id="vagas"
                  type="number"
                  value={newExam.vagas}
                  onChange={(e) => setNewExam({ ...newExam, vagas: e.target.value })}
                  placeholder="Ex: 50"
                />
              </div>
              <Button onClick={handleCreateExam} className="w-full">
                Criar Exame
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </SectionHeader>

      <ExamsGrid>
        {exams.map((exam) => (
          <ExamCard key={exam.id}>
            <ExamHeader>
              <ExamTitle>{exam.nome}</ExamTitle>
              <ExamBadge status={exam.status}>
                {exam.status === 'agendado' && 'Agendado'}
                {exam.status === 'em-andamento' && 'Em Andamento'}
                {exam.status === 'concluido' && 'Concluído'}
              </ExamBadge>
            </ExamHeader>
            <ExamInfo>
              <InfoRow>
                <Calendar />
                <span>{formatDate(exam.data)}</span>
              </InfoRow>
              <InfoRow>
                <Clock />
                <span>{exam.hora}</span>
              </InfoRow>
              <InfoRow>
                <MapPin />
                <span>{exam.local}</span>
              </InfoRow>
              <InfoRow>
                <Users />
                <span>{exam.inscritos} / {exam.vagas} inscritos</span>
              </InfoRow>
            </ExamInfo>
          </ExamCard>
        ))}
      </ExamsGrid>
    </div>
  );
}