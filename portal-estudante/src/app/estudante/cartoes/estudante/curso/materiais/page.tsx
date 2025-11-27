"use client"

import React, { useState } from 'react';
import styled from 'styled-components';
import Header from '@/components/ui/HeaderGeneral';
import BottomMenu from '@/components/ui/BottomMenu';

// Mock data - simulando dados que viriam da BD
const mockMaterialsData = [
  {
    id: 1,
    subject: "CDI I - Cálculo Difer. e Int...",
    chapter: "Capítulo I : Funções",
    color: "#7B68A6",
    materials: [
      { id: 1, name: "Slides - Introdução às Funções.pdf", type: "pdf", size: "2.5 MB", downloads: 45, date: "12/09" },
      { id: 2, name: "Exercícios Resolvidos.pdf", type: "pdf", size: "1.8 MB", downloads: 32, date: "12/09" },
      { id: 3, name: "Lista de Exercícios 01.docx", type: "doc", size: "456 KB", downloads: 28, date: "10/09" }
    ]
  },
  {
    id: 2,
    subject: "IEF - Introd. à Eng. Inform...",
    chapter: "Capítulo I : Sistema binário",
    color: "#4A90E2",
    materials: [
      { id: 4, name: "Apostila Sistema Binário.pdf", type: "pdf", size: "3.2 MB", downloads: 52, date: "11/09" },
      { id: 5, name: "Exercícios Práticos.pdf", type: "pdf", size: "890 KB", downloads: 41, date: "11/09" }
    ]
  },
  {
    id: 3,
    subject: "Programação I",
    chapter: "Capítulo I : Introd. à ling. C",
    color: "#F5A623",
    materials: [
      { id: 6, name: "Manual C - Básico.pdf", type: "pdf", size: "4.1 MB", downloads: 67, date: "10/09" },
      { id: 7, name: "Códigos de Exemplo.zip", type: "zip", size: "1.2 MB", downloads: 58, date: "10/09" },
      { id: 8, name: "Guia de Instalação IDE.pdf", type: "pdf", size: "2.3 MB", downloads: 49, date: "09/09" }
    ]
  },
  {
    id: 4,
    subject: "Álgebra Linear",
    chapter: "Capítulo II : Matrizes",
    color: "#E74C3C",
    materials: [
      { id: 9, name: "Teoria de Matrizes.pdf", type: "pdf", size: "2.8 MB", downloads: 38, date: "08/09" },
      { id: 10, name: "Exercícios Matrizes.pdf", type: "pdf", size: "1.5 MB", downloads: 35, date: "08/09" }
    ]
  },
  {
    id: 5,
    subject: "Física I",
    chapter: "Capítulo I : Cinemática",
    color: "#27AE60",
    materials: [
      { id: 11, name: "Apostila de Cinemática.pdf", type: "pdf", size: "3.8 MB", downloads: 44, date: "07/09" }
    ]
  }
];

// Styled Components
const Top = styled.div`
  width: 100%;
`;

const Container = styled.div`
  width: 100%;
  max-width: 480px;
  margin: 0 auto;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  background-color: #F5F5F5;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const SearchBar = styled.div`
  background-color: white;
  padding: 12px 16px;
  border-bottom: 1px solid #E0E0E0;
`;

const SearchInput = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  background-color: #F5F5F5;
  border-radius: 10px;
  padding: 10px 14px;
`;

const SearchInputField = styled.input`
  flex: 1;
  border: none;
  background: none;
  outline: none;
  font-size: 14px;
  color: #333;

  &::placeholder {
    color: #999;
  }
`;

const Content = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  padding-bottom: 90px;
`;

const SubjectCard = styled.div`
  background-color: white;
  border-radius: 16px;
  margin-bottom: 16px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
`;

const SubjectHeader = styled.div<{ $color: string }>`
  background: linear-gradient(135deg, ${props => props.$color} 0%, ${props => props.$color}dd 100%);
  padding: 16px;
  color: white;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const SubjectIcon = styled.div`
  width: 40px;
  height: 40px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SubjectInfo = styled.div`
  flex: 1;
`;

const SubjectTitle = styled.h3`
  font-size: 15px;
  font-weight: 600;
  margin: 0 0 4px 0;
`;

const SubjectChapter = styled.p`
  font-size: 13px;
  margin: 0;
  opacity: 0.9;
`;

const MaterialCount = styled.div`
  background-color: rgba(255, 255, 255, 0.2);
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
`;

const MaterialsList = styled.div`
  padding: 8px;
`;

const MaterialItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 8px;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #FAFAFA;
  }
`;

const FileIcon = styled.div<{ $type: string }>`
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background-color: ${props => {
    switch(props.$type) {
      case 'pdf': return '#FF5757';
      case 'doc': return '#4A90E2';
      case 'zip': return '#F5A623';
      default: return '#999';
    }
  }}15;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => {
    switch(props.$type) {
      case 'pdf': return '#FF5757';
      case 'doc': return '#4A90E2';
      case 'zip': return '#F5A623';
      default: return '#999';
    }
  }};
  font-weight: 700;
  font-size: 11px;
`;

const MaterialInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const MaterialName = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #1A1A1A;
  margin-bottom: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const MaterialMeta = styled.div`
  font-size: 12px;
  color: #999;
  display: flex;
  gap: 8px;
  align-items: center;
`;

const ActionButton = styled.button`
  background-color: #7B68A6;
  border: none;
  padding: 10px;
  cursor: pointer;
  color: white;
  border-radius: 10px;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #6B5896;
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: #999;
`;

// Modal Components
const ModalOverlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: ${props => props.$isOpen ? 'flex' : 'none'};
  align-items: center;
  justify-content: center;
  z-index: 9999999999;
  padding: 20px;
  animation: fadeIn 0.2s ease;

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

const ModalContent = styled.div`
  background-color: white;
  border-radius: 20px;
  width: 100%;
  max-width: 420px;
  max-height: 90vh;
  overflow: hidden;
  animation: slideUp 0.3s ease;

  @keyframes slideUp {
    from { 
      opacity: 0;
      transform: translateY(20px);
    }
    to { 
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const ModalHeader = styled.div<{ $color: string }>`
  background: linear-gradient(135deg, ${props => props.$color} 0%, ${props => props.$color}dd 100%);
  padding: 20px;
  color: white;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: white;
  transition: background-color 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`;

const ModalFileIcon = styled.div<{ $type: string }>`
  width: 80px;
  height: 80px;
  border-radius: 16px;
  background-color: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px;
  font-size: 24px;
  font-weight: 700;
`;

const ModalFileName = styled.h2`
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 8px 0;
  text-align: center;
`;

const ModalSubject = styled.p`
  font-size: 14px;
  margin: 0;
  opacity: 0.9;
  text-align: center;
`;

const ModalBody = styled.div`
  padding: 24px;
`;

const PreviewSection = styled.div`
  background-color: #F5F5F5;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
  text-align: center;
`;

const PreviewIcon = styled.div`
  width: 120px;
  height: 120px;
  margin: 0 auto 16px;
  background-color: white;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #7B68A6;
`;

const PreviewText = styled.p`
  font-size: 14px;
  color: #666;
  margin: 0;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin-bottom: 20px;
`;

const InfoItem = styled.div`
  text-align: center;
  padding: 12px;
  background-color: #F8F8F8;
  border-radius: 10px;
`;

const InfoLabel = styled.div`
  font-size: 11px;
  color: #999;
  margin-bottom: 4px;
  font-weight: 500;
`;

const InfoValue = styled.div`
  font-size: 15px;
  color: #1A1A1A;
  font-weight: 600;
`;

const ModalActions = styled.div`
  display: flex;
  gap: 12px;
`;

const ModalButton = styled.button<{ $variant?: 'primary' | 'secondary' }>`
  flex: 1;
  padding: 14px;
  border-radius: 12px;
  border: none;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.2s;

  ${props => props.$variant === 'primary' ? `
    background-color: #7B68A6;
    color: white;
    
    &:hover {
      background-color: #6B5896;
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(123, 104, 166, 0.3);
    }
  ` : `
    background-color: #F0F0F0;
    color: #666;
    
    &:hover {
      background-color: #E5E5E5;
    }
  `}

  &:active {
    transform: scale(0.98);
  }
`;

export default function MateriaisPage() {
  const [materialsData] = useState(mockMaterialsData);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMaterial, setSelectedMaterial] = useState<any>(null);

  const filteredSubjects = materialsData.map(subject => ({
    ...subject,
    materials: subject.materials.filter(mat => 
      mat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subject.subject.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(subject => subject.materials.length > 0);

  const handleMaterialClick = (material: any, subject: any) => {
    setSelectedMaterial({ ...material, subject: subject.subject, color: subject.color });
  };

  const handleCloseModal = () => {
    setSelectedMaterial(null);
  };

  const handleDownload = () => {
    alert(`Baixando: ${selectedMaterial.name}`);
    // Aqui você implementaria a lógica real de download
  };

  return (
    <>
          <Top>
            <Header variant="default" title="Curso" />
          </Top>
    <Container>
    

      {/* Search Bar */}
      <SearchBar>
        <SearchInput>
          {/* <Search size={18} color="#999" /> */}
          <SearchInputField 
            type="text" 
            placeholder="Buscar materiais ou cadeiras..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchInput>
      </SearchBar>

      {/* Content */}
      <Content>
        {filteredSubjects.length === 0 ? (
          <EmptyState>
            {/* <FileText size={56} color="#DDD" style={{ marginBottom: '16px' }} /> */}
            <p style={{ fontSize: '16px', fontWeight: '500', marginBottom: '8px' }}>Nenhum material encontrado</p>
            <p style={{ fontSize: '14px' }}>Tente buscar por outro termo</p>
          </EmptyState>
        ) : (
          filteredSubjects.map((subject) => (
            <SubjectCard key={subject.id}>
              <SubjectHeader $color={subject.color}>
                <SubjectIcon>
                  {/* <Book size={22} /> */}
                </SubjectIcon>
                <SubjectInfo>
                  <SubjectTitle>{subject.subject}</SubjectTitle>
                  <SubjectChapter>{subject.chapter}</SubjectChapter>
                </SubjectInfo>
                <MaterialCount>
                  {subject.materials.length} {subject.materials.length === 1 ? 'arquivo' : 'arquivos'}
                </MaterialCount>
              </SubjectHeader>

              <MaterialsList>
                {subject.materials.map((material) => (
                  <MaterialItem key={material.id} onClick={() => handleMaterialClick(material, subject)}>
                    <FileIcon $type={material.type}>
                      {material.type.toUpperCase()}
                    </FileIcon>

                    <MaterialInfo>
                      <MaterialName>{material.name}</MaterialName>
                      <MaterialMeta>
                        <span>{material.size}</span>
                        <span>•</span>
                        <span>{material.downloads} downloads</span>
                        <span>•</span>
                        <span>{material.date}</span>
                      </MaterialMeta>
                    </MaterialInfo>

                    <ActionButton title="Download" onClick={(e) => {
                      e.stopPropagation();
                      handleMaterialClick(material, subject);
                    }}>
                      {/* <Download size={18} /> */}
                    </ActionButton>
                  </MaterialItem>
                ))}
              </MaterialsList>
            </SubjectCard>
          ))
        )}
      </Content>

      {/* Modal de Preview */}
      <ModalOverlay $isOpen={!!selectedMaterial} onClick={handleCloseModal}>
        <ModalContent onClick={(e) => e.stopPropagation()}>
          {selectedMaterial && (
            <>
              <ModalHeader $color={selectedMaterial.color}>
                <CloseButton onClick={handleCloseModal}>
                  {/* <X size={20} /> */}
                </CloseButton>
                <ModalFileIcon $type={selectedMaterial.type}>
                  {selectedMaterial.type.toUpperCase()}
                </ModalFileIcon>
                <ModalFileName>{selectedMaterial.name}</ModalFileName>
                <ModalSubject>{selectedMaterial.subject}</ModalSubject>
              </ModalHeader>

              <ModalBody>
                <PreviewSection>
                  <PreviewIcon>
                    {/* <FileText size={56} /> */}
                  </PreviewIcon>
                  <PreviewText>
                    {selectedMaterial.type === 'pdf' && 'Documento PDF'}
                    {selectedMaterial.type === 'doc' && 'Documento Word'}
                    {selectedMaterial.type === 'zip' && 'Arquivo Compactado'}
                  </PreviewText>
                </PreviewSection>

                <InfoGrid>
                  <InfoItem>
                    <InfoLabel>Tamanho</InfoLabel>
                    <InfoValue>{selectedMaterial.size}</InfoValue>
                  </InfoItem>
                  <InfoItem>
                    <InfoLabel>Downloads</InfoLabel>
                    <InfoValue>{selectedMaterial.downloads}</InfoValue>
                  </InfoItem>
                  <InfoItem>
                    <InfoLabel>Data</InfoLabel>
                    <InfoValue>{selectedMaterial.date}</InfoValue>
                  </InfoItem>
                </InfoGrid>

                <ModalActions>
                  <ModalButton $variant="secondary" onClick={handleCloseModal}>
                    {/* <X size={18} /> */}
                    Fechar
                  </ModalButton>
                  <ModalButton $variant="primary" onClick={handleDownload}>
                    {/* <Download size={18} /> */}
                    Baixar
                  </ModalButton>
                </ModalActions>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </ModalOverlay>

    <BottomMenu/>
    </Container>
   </> 
  );
}
