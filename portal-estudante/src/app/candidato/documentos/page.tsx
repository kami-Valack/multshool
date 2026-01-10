// components/DocumentosScreen.tsx
"use client";

import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Header } from "@/components/candidato/Header";
import { useRouter } from "next/navigation";
import UserAvatar from "@/components/ui/Avatar";
import { useAuth } from "@/contexts/AuthContext";
import { studentService, Document } from "@/services/studentService";
import { useToast } from "@/hooks/useToast";
import CustomInput from "@/components/ui/InputRegister";

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

const DocumentsContainer = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px 0;
`;

const DocumentUploadSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const DocumentItem = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const DocumentStatus = styled.div<{ $status: string }>`
  font-size: 13px;
  padding: 6px 12px;
  border-radius: 6px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  width: fit-content;
  margin-top: 8px;
  font-weight: ${(props) => props.theme.fonts.weight.medium};
  
  ${({ $status }) => {
    switch ($status) {
      case 'approved':
        return 'background-color: #d4edda; color: #155724; border: 1px solid #c3e6cb;';
      case 'rejected':
        return 'background-color: #f8d7da; color: #721c24; border: 1px solid #f5c6cb;';
      case 'pending':
        return 'background-color: #fff3cd; color: #856404; border: 1px solid #ffeaa7;';
      case 'not_uploaded':
      default:
        return 'background-color: #e9ecef; color: #6c757d; border: 1px solid #dee2e6;';
    }
  }}
`;

const ErrorText = styled.span`
  color: ${(props) => props.theme.colors.error || "#dc3545"};
  font-size: 12px;
  margin-top: 4px;
`;

const LoadingText = styled.span`
  color: ${(props) => props.theme.colors.primary || "#7c74af"};
  font-size: 12px;
  margin-top: 4px;
`;

const UploadButton = styled.button`
  width: 90%;
  padding: 16px;
  background-color: ${(props) => props.theme.colors.primary || "#7c74af"};
  color: white;
  border: none;
  border-radius: 28px;
  font-size: 16px;
  font-weight: ${(props) => props.theme.fonts.weight.semibold || "600"};
  cursor: pointer;
  margin-top: 20px;
  transition: background-color 0.2s ease;
  
  &:hover:not(:disabled) {
    background-color: ${(props) => props.theme.colors.primaryDark || "#6a6388"};
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

// Tipos de documentos necessários
const REQUIRED_DOCUMENTS = [
  { type: 'id_document', label: 'Bilhete de identidade ou passaporte', accept: 'image/*,.pdf', placeholder: 'O anexo deve incluir frente e verso' },
  { type: 'photo', label: 'Fotografia (tipo: passe)', accept: 'image/*', placeholder: 'Clique para fazer o upload' },
  { type: 'grades_declaration', label: 'Declaração com notas do ensino secundário', accept: 'image/*,.pdf', placeholder: 'Clique para fazer o upload' },
];

const DocumentosScreen: React.FC = () => {
  const { user, refreshUser } = useAuth();
  const { showToast, ToastElement } = useToast();
  const router = useRouter();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState<{ [key: string]: boolean }>({});
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({});
  const [pendingFiles, setPendingFiles] = useState<{ [key: string]: File }>({});
  const isRedirectingRef = useRef(false);
  
  const handleBack = () => {
    // Verificar se há redirect pendente antes de voltar
    if (typeof window !== 'undefined') {
      const redirectAfterDocuments = sessionStorage.getItem('redirectAfterDocuments');
      if (redirectAfterDocuments && user?.has_all_documents) {
        // Se documentos estão completos e há redirect, ir para o curso
        sessionStorage.removeItem('redirectAfterDocuments');
        router.push(redirectAfterDocuments);
        return;
      }
    }
    router.back();
  };

  // Função para armazenar arquivo selecionado
  const handleFileSelect = (type: string, file: File | null) => {
    if (!file) return;
    
    // Armazenar arquivo pendente
    setPendingFiles(prev => ({ ...prev, [type]: file }));
    showToast(`Arquivo ${REQUIRED_DOCUMENTS.find(d => d.type === type)?.label} selecionado`, "success");
  };
  
  // Função para fazer upload de todos os documentos
  const handleUploadAll = async () => {
    // Verificar se temos todos os três arquivos
    const allFilesReady = REQUIRED_DOCUMENTS.every(doc => {
      return pendingFiles[doc.type] !== undefined;
    });
    
    if (!allFilesReady) {
      showToast("Por favor, selecione todos os três documentos antes de enviar", "error");
      return;
    }
    
    await uploadAllDocuments();
  };
  
  // Função para fazer upload de todos os documentos de uma vez
  const uploadAllDocuments = async () => {
    // Garantir que temos todos os três arquivos
    const allFiles = REQUIRED_DOCUMENTS.map(doc => {
      const file = pendingFiles[doc.type];
      if (!file) return null;
      return { type: doc.type, file };
    }).filter((item): item is { type: string; file: File } => item !== null);
    
    if (allFiles.length !== 3) {
      showToast("Por favor, selecione todos os três documentos", "error");
      return;
    }
    
    try {
      // Marcar todos como fazendo upload
      REQUIRED_DOCUMENTS.forEach(doc => {
        setUploading(prev => ({ ...prev, [doc.type]: true }));
        setUploadProgress(prev => ({ ...prev, [doc.type]: 0 }));
      });
      
      // Criar FormData com todos os arquivos usando os nomes corretos da API
      const formData = new FormData();
      allFiles.forEach(({ type, file }) => {
        const apiFieldName = type === 'id_document' ? 'bi' : 
                            type === 'photo' ? 'foto_tipo' : 
                            'habilitacao_literaria';
        formData.append(apiFieldName, file);
      });
      
      // Fazer upload usando o cliente da API diretamente
      const { studentApiClient } = await import('@/services/apiClient');
      const response = await studentApiClient.upload<any>('/documents/upload', formData);
      
      if (response.status === 'success') {
        // Recarregar documentos
        const updatedDocs = await studentService.getDocuments();
        setDocuments(updatedDocs);
        setPendingFiles({});
        
        await refreshUser();
        showToast("Todos os documentos foram enviados com sucesso!", "success");
        
        // Verificar redirecionamento
        await checkAndRedirectIfComplete();
      } else {
        throw new Error(response.message || 'Erro ao fazer upload dos documentos');
      }
    } catch (error: any) {
      console.error("Erro ao fazer upload:", error);
      showToast(error.message || "Erro ao fazer upload dos documentos", "error");
    } finally {
      REQUIRED_DOCUMENTS.forEach(doc => {
        setUploading(prev => ({ ...prev, [doc.type]: false }));
        setUploadProgress(prev => {
          const newProgress = { ...prev };
          delete newProgress[doc.type];
          return newProgress;
        });
      });
    }
  };
  
  // Verificar e redirecionar se todos os documentos estiverem completos
  const checkAndRedirectIfComplete = async () => {
    try {
      const profile = await studentService.getProfile();
      if (profile.has_all_documents && typeof window !== 'undefined') {
        const redirectAfterDocuments = sessionStorage.getItem('redirectAfterDocuments');
        if (redirectAfterDocuments && !isRedirectingRef.current) {
          isRedirectingRef.current = true;
          showToast("Todos os documentos foram enviados! Redirecionando...", "success");
          sessionStorage.removeItem('redirectAfterDocuments');
          setTimeout(() => {
            router.push(redirectAfterDocuments);
          }, 2000);
        }
      }
    } catch (error) {
      console.error("Erro ao verificar documentos:", error);
    }
  };
  
  // Obter documento por tipo
  const getDocumentByType = (type: string): Document | undefined => {
    return documents.find(doc => doc.type === type);
  };
  
  // Carregar documentos da API e verificar redirecionamento
  useEffect(() => {
    let mounted = true;
    
    const loadDocuments = async () => {
      if (!user || !mounted) {
        if (mounted) setLoading(false);
        return;
      }
      
      try {
        const docs = await studentService.getDocuments();
        if (mounted) {
          setDocuments(docs);
        }
        
        // Verificar se precisa redirecionar (apenas uma vez ao carregar)
        if (!isRedirectingRef.current && mounted) {
          const profile = await studentService.getProfile();
          
          if (profile.has_all_documents && typeof window !== 'undefined') {
            const redirectAfterDocuments = sessionStorage.getItem('redirectAfterDocuments');
            if (redirectAfterDocuments && !isRedirectingRef.current) {
              isRedirectingRef.current = true;
              await refreshUser();
              showToast("Documentos completos! Redirecionando...", "success");
              sessionStorage.removeItem('redirectAfterDocuments');
              setTimeout(() => {
                if (mounted) {
                  router.push(redirectAfterDocuments);
                }
              }, 1500);
              return;
            }
          }
        }
      } catch (error) {
        console.error("Erro ao carregar documentos:", error);
        if (mounted) {
          showToast("Erro ao carregar documentos", "error");
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };
    
    loadDocuments();
    
    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);


  return (
    <>
      {ToastElement}
      <Container>
        <Header variant="with-back" text="Documentos" onBack={handleBack} />

        <ProfileSection>
          <UserAvatar />
          <ProfileName>{user?.name || "Estudante"}</ProfileName>
          <ProfileSubtitle>Os meus documentos</ProfileSubtitle>
        </ProfileSection>

        <DocumentsSection>
          <SectionHeader>
            <SectionTitle>Envie os seus documentos</SectionTitle>
          </SectionHeader>

          <DocumentsContainer>
            {REQUIRED_DOCUMENTS.map((docType) => {
              const uploadedDoc = getDocumentByType(docType.type);
              const isUploading = uploading[docType.type] || false;
              const progress = uploadProgress[docType.type] || 0;
              const isDisabled = isUploading || (uploadedDoc && uploadedDoc.status === 'approved');
              const currentStatus = uploadedDoc ? uploadedDoc.status : 'not_uploaded';
              
              return (
                <DocumentItem key={docType.type}>
                  <CustomInput
                    fileInputSize="custom"
                    fileInputHeight="80px"
                    fileInputWidth="100%"
                    label={docType.label}
                    placeholder={uploadedDoc ? uploadedDoc.name : docType.placeholder}
                    fileName={uploadedDoc ? uploadedDoc.name : undefined}
                    variant="file"
                    accept={docType.accept}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const file = e.target.files?.[0];
                      if (file && !isDisabled) {
                        handleFileSelect(docType.type, file);
                      }
                    }}
                    disabled={isDisabled}
                  />
                  {isUploading ? (
                    <LoadingText>
                      Enviando... {progress > 0 && `${Math.round(progress)}%`}
                    </LoadingText>
                  ) : (
                    <DocumentStatus $status={currentStatus}>
                      {currentStatus === 'approved' && (
                        <>
                          <span>✓</span>
                          <span>Aprovado</span>
                        </>
                      )}
                      {currentStatus === 'rejected' && (
                        <>
                          <span>✗</span>
                          <span>Rejeitado - Por favor, envie novamente</span>
                        </>
                      )}
                      {currentStatus === 'pending' && (
                        <>
                          <span>⏳</span>
                          <span>Aguardando aprovação</span>
                        </>
                      )}
                      {currentStatus === 'not_uploaded' && (
                        <>
                          <span>○</span>
                          <span>Documento não enviado</span>
                        </>
                      )}
                    </DocumentStatus>
                  )}
                </DocumentItem>
              );
            })}
          </DocumentsContainer>
          
          {/* Botão para enviar todos os documentos */}
          {documents.length === 0 && Object.keys(pendingFiles).length === 3 && (
            <UploadButton
              onClick={handleUploadAll}
              disabled={Object.values(uploading).some(u => u)}
            >
              {Object.values(uploading).some(u => u) ? "Enviando..." : "Enviar Todos os Documentos"}
            </UploadButton>
          )}
        </DocumentsSection>
      </Container>
    </>
  );
};

export default DocumentosScreen;
