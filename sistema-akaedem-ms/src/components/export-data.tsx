// Arquivo: src/components/export-data.tsx

'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import { Download, FileText, FileSpreadsheet } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const ExportContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const FormatGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
`;

const FormatCard = styled.div<{ selected: boolean }>`
  padding: 20px;
  border-radius: 8px;
  border: 2px solid ${props => props.selected ? '#2563eb' : '#e5e7eb'};
  background: ${props => props.selected ? '#eff6ff' : 'white'};
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;

  &:hover {
    border-color: #2563eb;
    background: #eff6ff;
  }

  svg {
    width: 32px;
    height: 32px;
    color: ${props => props.selected ? '#2563eb' : '#6b7280'};
  }
`;

const FormatName = styled.div`
  font-weight: 500;
  color: #1f2937;
`;

const FormatDescription = styled.div`
  font-size: 12px;
  color: #6b7280;
  text-align: center;
`;

const OptionsSection = styled.div`
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const CheckboxGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const CheckboxItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

type ExportFormat = 'csv' | 'xlsx' | 'pdf' | null;

interface ExportOptions {
  includeCandidatos: boolean;
  includeExames: boolean;
  includeResultados: boolean;
  includeEstatisticas: boolean;
}

export default function ExportData() {
  const [selectedFormat, setSelectedFormat] = useState<ExportFormat>(null);
  const [dataType, setDataType] = useState('todos');
  const [options, setOptions] = useState<ExportOptions>({
    includeCandidatos: true,
    includeExames: true,
    includeResultados: true,
    includeEstatisticas: false,
  });
  const [exporting, setExporting] = useState(false);

  const formats = [
    {
      id: 'csv' as const,
      name: 'CSV',
      description: 'Compatível com Excel e Google Sheets',
      icon: FileSpreadsheet
    },
    {
      id: 'xlsx' as const,
      name: 'Excel',
      description: 'Formato Microsoft Excel',
      icon: FileSpreadsheet
    },
    {
      id: 'pdf' as const,
      name: 'PDF',
      description: 'Documento formatado para impressão',
      icon: FileText
    }
  ];

  const handleExport = () => {
    if (!selectedFormat) {
      alert('Por favor, selecione um formato de exportação.');
      return;
    }

    setExporting(true);
    
    // Simular exportação
    const fileName = `candidaturas_${new Date().toISOString().split('T')[0]}.${selectedFormat}`;
    
    setTimeout(() => {
      alert(`Exportação concluída: ${fileName}`);
      setExporting(false);
    }, 2000);
  };

  const toggleOption = (key: keyof ExportOptions) => {
    setOptions(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <ExportContainer>
      <Card>
        <CardHeader>
          <CardTitle>Exportar Dados</CardTitle>
          <CardDescription>
            Escolha o formato e os dados que deseja exportar
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div>
            <Label className="mb-3 block">Formato de Exportação</Label>
            <FormatGrid>
              {formats.map((format) => (
                <FormatCard
                  key={format.id}
                  selected={selectedFormat === format.id}
                  onClick={() => setSelectedFormat(format.id)}
                >
                  <format.icon />
                  <FormatName>{format.name}</FormatName>
                  <FormatDescription>{format.description}</FormatDescription>
                </FormatCard>
              ))}
            </FormatGrid>
          </div>

          <OptionsSection>
            <div>
              <Label htmlFor="data-type" className="mb-2 block">
                Tipo de Dados
              </Label>
              <Select value={dataType} onValueChange={setDataType}>
                <SelectTrigger id="data-type">
                  <SelectValue placeholder="Selecione o tipo de dados" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos os dados</SelectItem>
                  <SelectItem value="candidatos">Apenas Candidatos</SelectItem>
                  <SelectItem value="exames">Apenas Exames</SelectItem>
                  <SelectItem value="resultados">Apenas Resultados</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {dataType === 'todos' && (
              <div>
                <Label className="mb-3 block">Incluir nas Exportações</Label>
                <CheckboxGroup>
                  <CheckboxItem>
                    <Checkbox
                      id="candidatos"
                      checked={options.includeCandidatos}
                      onCheckedChange={() => toggleOption('includeCandidatos')}
                    />
                    <Label htmlFor="candidatos" className="cursor-pointer">
                      Lista de Candidatos
                    </Label>
                  </CheckboxItem>
                  <CheckboxItem>
                    <Checkbox
                      id="exames"
                      checked={options.includeExames}
                      onCheckedChange={() => toggleOption('includeExames')}
                    />
                    <Label htmlFor="exames" className="cursor-pointer">
                      Dados dos Exames de Acesso
                    </Label>
                  </CheckboxItem>
                  <CheckboxItem>
                    <Checkbox
                      id="resultados"
                      checked={options.includeResultados}
                      onCheckedChange={() => toggleOption('includeResultados')}
                    />
                    <Label htmlFor="resultados" className="cursor-pointer">
                      Resultados dos Exames
                    </Label>
                  </CheckboxItem>
                  <CheckboxItem>
                    <Checkbox
                      id="estatisticas"
                      checked={options.includeEstatisticas}
                      onCheckedChange={() => toggleOption('includeEstatisticas')}
                    />
                    <Label htmlFor="estatisticas" className="cursor-pointer">
                      Estatísticas e Gráficos
                    </Label>
                  </CheckboxItem>
                </CheckboxGroup>
              </div>
            )}

            <Button 
              onClick={handleExport} 
              className="w-full mt-4"
              size="lg"
              disabled={exporting}
            >
              <Download className="mr-2 h-4 w-4" />
              {exporting ? 'Exportando...' : 'Exportar Dados'}
            </Button>
          </OptionsSection>
        </CardContent>
      </Card>
    </ExportContainer>
  );
}