"use client";

import React, { useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import styled from "styled-components";
import Header from "@/components/ui/HeaderGeneral";
import BottomMenu from "@/components/ui/BottomMenu";
import { useNavigation } from "@/hooks/navigation";
import Button from "@/components/ui/Button";
import jsPDF from "jspdf";
import { useAuth } from "@/contexts/AuthContext";

// Interface genérica para itens da lista
interface Credor {
  id: string;
  nome: string;
  valorMaximo: string;
  logo: string;
  cor: string;
}

// Types
type ServiceType = "bolsas" | "creditos" | "estagios";

interface ServiceConfig {
  title: string;
  saldoLabel: string;
  selectLabel: string;
  maxValueLabel: string;
  titlePrefix: string;
  detailsTitle: string;
  buttonText: string;
  confirmTitle: string;
  successTitle: string;
  successMessage: string;
  successEmoji: string;
  infoLabel2: string;
  infoLabel3: string;
}

// Configurações por tipo de serviço
const serviceConfigs: Record<ServiceType, ServiceConfig> = {
  bolsas: {
    title: "Bolsas",
    saldoLabel: "Bolsas de estudo",
    selectLabel: "Selecione uma opção",
    maxValueLabel: "Prazo",
    titlePrefix: "Bolsa de Estudos",
    detailsTitle: "Detalhes da bolsa",
    buttonText: "Candidatar-me",
    confirmTitle: "Confirmar",
    successTitle: "Candidatura enviada!",
    successMessage:
      "A sua candidatura foi enviada com sucesso. Irá receber uma notificação com a resposta dentro de 48H.",
    successEmoji: "🎓",
    infoLabel2: "Vagas",
    infoLabel3: "Nota mínima",
  },
  creditos: {
    title: "Credores",
    saldoLabel: "O seu saldo actual:",
    selectLabel: "Escolha um credor",
    maxValueLabel: "Limite disponível",
    titlePrefix: "Pagamentos",
    detailsTitle: "Detalhes do crédito",
    buttonText: "Continuar",
    confirmTitle: "Confirmar",
    successTitle: "Pedido enviado!",
    successMessage:
      "O seu pedido de crédito foi enviado com sucesso. Irá receber uma notificação com a resposta dentro de 24H.",
    successEmoji: "💳",
    infoLabel2: "Tipo de crédito",
    infoLabel3: "Valor máximo",
  },
  estagios: {
    title: "Estágios",
    saldoLabel: "Estágios profissionais",
    selectLabel: "Selecione uma opção",
    maxValueLabel: "Prazo",
    titlePrefix: "Programa de Estágio",
    detailsTitle: "Detalhes do estágio",
    buttonText: "Candidatar-me",
    confirmTitle: "Confirmar",
    successTitle: "Candidatura enviada!",
    successMessage:
      "A sua candidatura foi enviada com sucesso. Irá receber uma notificação com a resposta dentro de 72H.",
    successEmoji: "💼",
    infoLabel2: "Vagas",
    infoLabel3: "Área",
  },
};

// Dados mockados por tipo
const credoresMockData: Record<ServiceType, Credor[]> = {
  bolsas: [
    {
      id: "1",
      nome: "Kwik invest: Bolsa est...",
      valorMaximo: "10/10/24",
      logo: "https://via.placeholder.com/60/5B4B7C/FFFFFF?text=K",
      cor: "#5B4B7C",
    },
    {
      id: "2",
      nome: "Avança na Vida",
      valorMaximo: "12/09/24",
      logo: "https://via.placeholder.com/60/FF6B35/FFFFFF?text=A",
      cor: "#FF6B35",
    },
    {
      id: "3",
      nome: "Yango investmento",
      valorMaximo: "10/09/24",
      logo: "https://via.placeholder.com/60/E63946/FFFFFF?text=Y",
      cor: "#E63946",
    },
    {
      id: "4",
      nome: "Bolsa de Valor Angola",
      valorMaximo: "10/09/24",
      logo: "https://via.placeholder.com/60/0066CC/FFFFFF?text=BV",
      cor: "#0066CC",
    },
    {
      id: "5",
      nome: "Negócio Fácil",
      valorMaximo: "05/09/24",
      logo: "https://via.placeholder.com/60/FF9900/FFFFFF?text=NF",
      cor: "#FF9900",
    },
  ],
  creditos: [
    {
      id: "1",
      nome: "Banco Sol",
      valorMaximo: "AKZ 20.000",
      logo: "https://www.bancosol.ao/hubfs/Novo%20Projeto%20(21).jpg",
      cor: "#FFE8E8",
    },
    {
      id: "2",
      nome: "BAI",
      valorMaximo: "AKZ 50.000",
      logo: "https://www.scoe.co/wp-content/uploads/2017/02/BAI.png",
      cor: "#E8F0FF",
    },
    {
      id: "3",
      nome: "Atlântico",
      valorMaximo: "AKZ 35.500",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8TFVY9dSJv4PPdu8e81W1YLIcpO4PKvcXnA&s",
      cor: "#E8FFF0",
    },
  ],
  estagios: [
    {
      id: "1",
      nome: "Unitel S.A - Dep. de Inovação",
      valorMaximo: "10/11/24",
      logo: "https://via.placeholder.com/60/00A859/FFFFFF?text=U",
      cor: "#E8FFF0",
    },
    {
      id: "2",
      nome: "Microsoft Angola",
      valorMaximo: "15/10/24",
      logo: "https://via.placeholder.com/60/0078D4/FFFFFF?text=MS",
      cor: "#E8F4FF",
    },
    {
      id: "3",
      nome: "Banco BAI",
      valorMaximo: "20/09/24",
      logo: "https://via.placeholder.com/60/003D7A/FFFFFF?text=BAI",
      cor: "#E8F0FF",
    },
  ],
};

// Dados mockados de detalhes
const getCredorDetails = (serviceType: ServiceType, credorId: string, userName: string = "Estudante", studentId: string = "") => {
  const detailsData: Record<ServiceType, Record<string, any>> = {
    bolsas: {
      "1": {
        entidade: "00040",
        responsavel: "Kwik invest: Bolsa de Estudos",
        dataLimite: "10/10/24",
        info2: "40",
        info3: "14 valores",
        publicoAlvo: "20-25 anos",
        notaMinima: "14 valores",
      },
      "2": {
        entidade: "00041",
        responsavel: "Avança na Vida",
        dataLimite: "12/09/24",
        info2: "25",
        info3: "12 valores",
        publicoAlvo: "18-30 anos",
        notaMinima: "12 valores",
      },
      "3": {
        entidade: "00042",
        responsavel: "Yango investmento",
        dataLimite: "10/09/24",
        info2: "15",
        info3: "13 valores",
        publicoAlvo: "20-28 anos",
        notaMinima: "13 valores",
      },
      "4": {
        entidade: "00043",
        responsavel: "Bolsa de Valor Angola",
        dataLimite: "10/09/24",
        info2: "30",
        info3: "15 valores",
        publicoAlvo: "18-26 anos",
        notaMinima: "15 valores",
      },
      "5": {
        entidade: "00044",
        responsavel: "Negócio Fácil",
        dataLimite: "05/09/24",
        info2: "20",
        info3: "13 valores",
        publicoAlvo: "20-30 anos",
        notaMinima: "13 valores",
      },
    },
    creditos: {
      "1": {
        entidade: "00041",
        info2: "Estudantil",
        info3: "AKZ 20.000",
        conta: `${userName} ${studentId} - ISPTEC, Multischool`,
      },
      "2": {
        entidade: "00042",
        info2: "Pessoal",
        info3: "AKZ 50.000",
        conta: `${userName} ${studentId} - BAI Directo`,
      },
      "3": {
        entidade: "00043",
        info2: "Empresarial",
        info3: "AKZ 35.500",
        conta: `${userName} ${studentId} - Atlântico Business`,
      },
    },
    estagios: {
      "1": {
        entidade: "EST-001",
        responsavel: "Unitel S.A - Departamento de Inovação",
        dataLimite: "10/11/24",
        info2: "5",
        info3: "Tecnologia",
        publicoAlvo: "Estudantes de TI",
      },
      "2": {
        entidade: "EST-002",
        responsavel: "Microsoft Angola",
        dataLimite: "15/10/24",
        info2: "3",
        info3: "Desenvolvimento",
        publicoAlvo: "Finalistas",
      },
      "3": {
        entidade: "EST-003",
        responsavel: "Banco BAI",
        dataLimite: "20/09/24",
        info2: "8",
        info3: "Finanças",
        publicoAlvo: "Estudantes de Economia",
      },
    },
  };
  return (
    detailsData[serviceType]?.[credorId] || detailsData[serviceType]?.["1"]
  );
};

export default function PagamentoDetalhe() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const { navigateTo } = useNavigation();

  // Mapear o ID para o tipo de serviço
  const getServiceType = (id: string): ServiceType => {
    if (id === "bolsas" || id === "creditos" || id === "estagios") {
      return id as ServiceType;
    }
    return "creditos";
  };

  const serviceType = getServiceType((params?.id as string) || "creditos");
  const config = serviceConfigs[serviceType];
  const credoresMock = credoresMockData[serviceType];

  const [currentStep, setCurrentStep] = useState(1);
  const [selectedCredor, setSelectedCredor] = useState<Credor | null>(null);
  const [montante, setMontante] = useState(10000);
  const [prazo, setPrazo] = useState(2);
  const [searchQuery, setSearchQuery] = useState("");

  const credorDetails = selectedCredor
    ? getCredorDetails(serviceType, selectedCredor.id, user?.name || "Estudante", user?.student_id || "")
    : null;

  // Filtrar lista baseado na pesquisa
  const filteredCredores = useMemo(() => {
    if (!searchQuery.trim()) return credoresMock;
    
    return credoresMock.filter((item) =>
      item.nome.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [credoresMock, searchQuery]);

  // Calcular total disponível
  const totalDisponivel = credoresMock.length;

  const maxMontante = selectedCredor
    ? parseInt(selectedCredor.valorMaximo.replace(/[^\d]/g, ""))
    : 30000;
  const maxPrazo = 12;

  const montantePercentage = (montante / maxMontante) * 100;
  const prazoPercentage = (prazo / maxPrazo) * 100;

  const currentDate = new Date().toLocaleDateString("pt-AO", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });

  const handleCredorSelect = (credor: Credor) => {
    setSelectedCredor(credor);
    setCurrentStep(2);
  };

  const handleMontanteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMontante(Number(e.target.value));
  };

  const handlePrazoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrazo(Number(e.target.value));
  };

  const handleContinue = () => {
    if (serviceType === "creditos") {
      setCurrentStep(3);
    } else {
      setCurrentStep(4);
    }
  };

  const handleEdit = () => {
    setCurrentStep(2);
  };

  const handleConfirm = () => {
    setCurrentStep(4);
  };

  const handleFinish = () => {
    router.back();
    setCurrentStep(1);
    setSelectedCredor(null);
    setMontante(10000);
    setPrazo(2);
  };

  const handleDownloadEdital = () => {
    const pdf = new jsPDF();
    
    // Configurações
    const pageWidth = pdf.internal.pageSize.getWidth();
    const margin = 20;
    let yPosition = 20;

    // Título
    pdf.setFontSize(18);
    pdf.setFont("helvetica", "bold");
    pdf.text(config.titlePrefix.toUpperCase(), pageWidth / 2, yPosition, {
      align: "center",
    });
    yPosition += 15;

    // Nome da instituição
    pdf.setFontSize(14);
    pdf.setFont("helvetica", "normal");
    pdf.text(selectedCredor?.nome || "", pageWidth / 2, yPosition, {
      align: "center",
    });
    yPosition += 10;

    pdf.text(`Responsável: ${credorDetails?.responsavel}`, pageWidth / 2, yPosition, {
      align: "center",
    });
    yPosition += 20;

    // Linha separadora
    pdf.setDrawColor(150, 150, 150);
    pdf.line(margin, yPosition, pageWidth - margin, yPosition);
    yPosition += 10;

    // Informações Gerais
    pdf.setFontSize(12);
    pdf.setFont("helvetica", "bold");
    pdf.text("INFORMAÇÕES GERAIS", margin, yPosition);
    yPosition += 8;

    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(10);
    pdf.text(`Entidade nº: ${credorDetails?.entidade}`, margin, yPosition);
    yPosition += 6;
    pdf.text(`${config.infoLabel2}: ${credorDetails?.info2}`, margin, yPosition);
    yPosition += 6;
    pdf.text(`${config.infoLabel3}: ${credorDetails?.info3}`, margin, yPosition);
    yPosition += 6;
    pdf.text(`Público-alvo: ${credorDetails?.publicoAlvo}`, margin, yPosition);
    yPosition += 6;
    pdf.text(`Data de publicação: ${currentDate}`, margin, yPosition);
    yPosition += 15;

    // Linha separadora
    pdf.line(margin, yPosition, pageWidth - margin, yPosition);
    yPosition += 10;

    // Documentação Necessária
    pdf.setFontSize(12);
    pdf.setFont("helvetica", "bold");
    pdf.text("DOCUMENTAÇÃO NECESSÁRIA", margin, yPosition);
    yPosition += 8;

    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(10);
    
    const documentos = serviceType === "bolsas"
      ? [
          "• Certificado de habilitações",
          "• Comprovativo de matrícula actualizado",
          "• Documento de identificação válido",
          "• Comprovativo de rendimentos familiares",
          "• Histórico escolar dos últimos 2 anos",
          "• Carta de motivação (máx. 500 palavras)",
          "• Duas cartas de recomendação",
        ]
      : [
          "• Currículo actualizado",
          "• Documento de identificação",
          "• Certificado de habilitações",
          "• Carta de apresentação",
          "• Declaração da instituição de ensino",
          "• Portfolio de trabalhos (se aplicável)",
          "• Certificados de formações complementares",
        ];

    documentos.forEach((documento) => {
      pdf.text(documento, margin, yPosition);
      yPosition += 6;
    });
    yPosition += 10;

    // Linha separadora
    pdf.line(margin, yPosition, pageWidth - margin, yPosition);
    yPosition += 10;

    // Processo de Candidatura
    pdf.setFontSize(12);
    pdf.setFont("helvetica", "bold");
    pdf.text("PROCESSO DE CANDIDATURA", margin, yPosition);
    yPosition += 8;

    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(10);
    const processos = [
      "1. Preencher o formulário de candidatura online",
      "2. Anexar toda a documentação requerida (formato PDF)",
      "3. Submeter candidatura através da plataforma",
      `4. Aguardar análise do pedido (prazo médio: ${serviceType === "bolsas" ? "48h" : "72h"})`,
      "5. Receber notificação da decisão por email e na app",
    ];

    processos.forEach((processo) => {
      pdf.text(processo, margin, yPosition);
      yPosition += 6;
    });
    yPosition += 10;

    // Linha separadora
    pdf.line(margin, yPosition, pageWidth - margin, yPosition);
    yPosition += 10;

    // Contactos
    pdf.setFontSize(12);
    pdf.setFont("helvetica", "bold");
    pdf.text("CONTACTOS", margin, yPosition);
    yPosition += 8;

    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(10);
    pdf.text(`Responsável: ${credorDetails?.responsavel}`, margin, yPosition);
    yPosition += 8;
    pdf.text(
      "Para mais informações, entre em contacto através da plataforma",
      margin,
      yPosition
    );
    yPosition += 6;
    pdf.text("ou consulte o nosso website.", margin, yPosition);

    // Salvar PDF
    pdf.save(`edital-${serviceType}-${selectedCredor?.nome.replace(/\s+/g, "-")}.pdf`);
  };

  // Step 1 - Lista
  if (currentStep === 1) {
    return (
      <>
        <Container>
          <Top>
            <Header variant="withBack" title={config.title} />
          </Top>

          <TopTitle>
            <Title>{config.saldoLabel}</Title>
            <SaldoValue>{totalDisponivel} disponíveis</SaldoValue>
          </TopTitle>

          {/* Campo de pesquisa */}
          <SearchContainer>
            <SearchIcon>🔍</SearchIcon>
            <SearchInput
              type="text"
              placeholder={`Pesquisar por ${serviceType === "bolsas" ? "bolsa" : serviceType === "estagios" ? "estágio" : "credor"}`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <ClearButton onClick={() => setSearchQuery("")}>✕</ClearButton>
            )}
          </SearchContainer>

          {/* Lista customizada para cada tipo */}
          <ListContainer>
            <ListTitle>{config.selectLabel}</ListTitle>
            {filteredCredores.length > 0 ? (
              filteredCredores.map((item) => (
                <ListItem key={item.id} onClick={() => handleCredorSelect(item)}>
                  <ListItemLogo $cor={item.cor}>
                    <ListItemLogoImage src={item.logo} alt={item.nome} />
                  </ListItemLogo>
                  <ListItemInfo>
                    <ListItemName>{item.nome}</ListItemName>
                    <ListItemMax>
                      {config.maxValueLabel}: <strong>{item.valorMaximo}</strong>
                    </ListItemMax>
                  </ListItemInfo>
                  <ListItemArrow>›</ListItemArrow>
                </ListItem>
              ))
            ) : (
              <NoResults>Nenhum resultado encontrado</NoResults>
            )}
          </ListContainer>

          <BottomMenu />
        </Container>
      </>
    );
  }

  // Step 2 - Detalhes (DIFERENTES PARA CADA TIPO)
  if (currentStep === 2 && selectedCredor) {
    // Para Bolsas e Estágios - Layout simplificado
    if (serviceType === "bolsas" || serviceType === "estagios") {
      return (
        <PageContainer>
          <Top>
            <Header variant="withBack" title={config.title} />
          </Top>

          <Content>
            {/* Logo e título */}
            <LogoContainer $cor={selectedCredor.cor}>
              <LogoImage src={selectedCredor.logo} alt={selectedCredor.nome} />
            </LogoContainer>

            <ServiceTitle>{credorDetails?.responsavel}</ServiceTitle>

            {/* Informações em lista simples */}
            <InfoList>
              <InfoItem>
                <InfoItemLabel>Entidade nº</InfoItemLabel>
                <InfoItemValue>{credorDetails?.entidade}</InfoItemValue>
              </InfoItem>
              <InfoItem>
                <InfoItemLabel>Vagas</InfoItemLabel>
                <InfoItemValue>{credorDetails?.info2}</InfoItemValue>
              </InfoItem>
              <InfoItem>
                <InfoItemLabel>Data limite</InfoItemLabel>
                <InfoItemValueHighlight>
                  {credorDetails?.dataLimite}
                </InfoItemValueHighlight>
              </InfoItem>
              <InfoItem>
                <InfoItemLabel>Público-alvo</InfoItemLabel>
                <InfoItemValue>{credorDetails?.publicoAlvo}</InfoItemValue>
              </InfoItem>
              <InfoItem>
                <InfoItemLabel>Nota mínima</InfoItemLabel>
                <InfoItemValue>
                  {credorDetails?.notaMinima || credorDetails?.info3}
                </InfoItemValue>
              </InfoItem>
            </InfoList>

            <ButtonContainerAlt>
              <Button
                bgColor="primary"
                textColor="#FFFFFF"
                text={config.buttonText}
                hasBorder={true}
                onClick={handleContinue}
              />
              <Button
                bgColor="transparent"
                textColor="#5B4B7C"
                text="Baixar edital"
                hasBorder={true}
                onClick={handleDownloadEdital}
              />
            </ButtonContainerAlt>
          </Content>

          <BottomMenu />
        </PageContainer>
      );
    }

    // Para Créditos - Layout original com sliders
    return (
      <PageContainer>
        <Top>
          <Header variant="withBack" title={config.titlePrefix} />
        </Top>

        <Content>
          <LogoContainer $cor={selectedCredor.cor}>
            <LogoImage src={selectedCredor.logo} alt={selectedCredor.nome} />
          </LogoContainer>

          <ServiceTitle>
            {selectedCredor.nome} - {config.titlePrefix}
          </ServiceTitle>

          <InfoCard>
            <InfoRow>
              <InfoLabel>Entidade nº</InfoLabel>
              <InfoValue>{credorDetails?.entidade}</InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoLabel>{config.infoLabel2}</InfoLabel>
              <InfoValue>{credorDetails?.info2}</InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoLabel>{config.infoLabel3}</InfoLabel>
              <InfoValueHighlight>{credorDetails?.info3}</InfoValueHighlight>
            </InfoRow>
            <InfoRow>
              <InfoLabel>Data do pedido</InfoLabel>
              <InfoValue>{currentDate}</InfoValue>
            </InfoRow>
          </InfoCard>

          <SectionTitle>{config.detailsTitle}</SectionTitle>

          <SliderContainer>
            <SliderHeader>
              <SliderLabel>Montante</SliderLabel>
              <SliderValue>{montante.toLocaleString("pt-AO")} kz</SliderValue>
            </SliderHeader>
            <SliderTrack>
              <SliderRail>
                <SliderFill percentage={montantePercentage} />
              </SliderRail>
              <SliderThumb percentage={montantePercentage} />
              <SliderInput
                type="range"
                min="0"
                max={maxMontante}
                step="1000"
                value={montante}
                onChange={handleMontanteChange}
              />
            </SliderTrack>

            <SliderHeader style={{ marginTop: "32px" }}>
              <SliderLabel>Prazo</SliderLabel>
              <SliderValue>
                {prazo} {prazo === 1 ? "mês" : "meses"}
              </SliderValue>
            </SliderHeader>
            <SliderTrack>
              <SliderRail>
                <SliderFill percentage={prazoPercentage} />
              </SliderRail>
              <SliderThumb percentage={prazoPercentage} />
              <SliderInput
                type="range"
                min="1"
                max={maxPrazo}
                step="1"
                value={prazo}
                onChange={handlePrazoChange}
              />
            </SliderTrack>
          </SliderContainer>

          <ButtonContainer>
            <Button
              bgColor="primary"
              textColor="#FFFFFF"
              text={config.buttonText}
              hasBorder={true}
              onClick={handleContinue}
            />
          </ButtonContainer>
        </Content>

        <BottomMenu />
      </PageContainer>
    );
  }

  // Step 3 - Confirmação (APENAS PARA CRÉDITOS)
  if (currentStep === 3 && selectedCredor && serviceType === "creditos") {
    return (
      <PageContainer>
        <Top>
          <Header variant="withBack" title={config.confirmTitle} />
        </Top>

        <Content>
          <SectionTitle2>{config.detailsTitle}</SectionTitle2>

          <ConfirmCard>
            <ConfirmHeader>
              <ConfirmLogo $cor={selectedCredor.cor}>
                <LogoImage
                  src={selectedCredor.logo}
                  alt={selectedCredor.nome}
                />
              </ConfirmLogo>
              <ConfirmInfo>
                <ConfirmTitle>
                  {selectedCredor.nome} {config.titlePrefix}
                </ConfirmTitle>
                <ConfirmSubtitle>{credorDetails?.entidade}</ConfirmSubtitle>
              </ConfirmInfo>
              <ConfirmValue>
                {montante.toLocaleString("pt-AO")},00 kz
                <ConfirmDate>{currentDate}</ConfirmDate>
              </ConfirmValue>
            </ConfirmHeader>

            <AccountLabel>Conta</AccountLabel>
            <AccountInfo>
              <AccountName>{credorDetails?.conta}</AccountName>
            </AccountInfo>
          </ConfirmCard>
          <ButtonContainer>
            <ConfirmButton onClick={handleConfirm}>Confirmar</ConfirmButton>
            <EditButton onClick={handleEdit}>Editar</EditButton>
          </ButtonContainer>
        </Content>

        <BottomMenu />
      </PageContainer>
    );
  }

  // Step 4 - Sucesso
  if (currentStep === 4 && selectedCredor) {
    return (
      <PageContainer>
        <Top>
          <Header variant="withBack" title="Sucesso!" />
        </Top>

        <SuccessContainer>
          <SuccessIcon>
            <CardIllustration>{config.successEmoji}</CardIllustration>
          </SuccessIcon>

          <SuccessTitle>{config.successTitle}</SuccessTitle>

          <SuccessMessage>{config.successMessage}</SuccessMessage>

          <OkButton onClick={handleFinish}>Boa!</OkButton>
        </SuccessContainer>

        <BottomMenu />
      </PageContainer>
    );
  }

  return null;
}

// Styled Components
const Container = styled.div`
  width: 100%;
  min-height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: ${(props) => props.theme.fonts.family.poppins};
  margin-bottom: 150px;
`;

const Top = styled.div`
  width: 100%;
`;

const TopTitle = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0;
  margin: 0 0 20px 0;
`;

const Title = styled.p`
  font-size: 14px;
  color: ${(props) => props.theme.colors.foreground};
`;

const SaldoValue = styled.div`
  font-size: 30px;
  color: ${(props) => props.theme.colors.textBlack};
  font-weight: ${(props) => props.theme.fonts.weight.semibold};
`;

// Campo de pesquisa
const SearchContainer = styled.div`
  width: calc(100% - 40px);
  position: relative;
  margin: 0 20px 20px 20px;
`;

const SearchIcon = styled.span`
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 16px;
  color: #999;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 14px 45px 14px 45px;
  border: none;
  border-radius: 12px;
  background: #f5f5f7;
  font-size: 14px;
  color: #333;
  outline: none;
  transition: all 0.2s ease;

  &::placeholder {
    color: #999;
  }

  &:focus {
    background: #ebebed;
  }
`;

const ClearButton = styled.button`
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #999;
  font-size: 18px;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: #666;
  }
`;

// Estilos da lista customizada
const ListContainer = styled.div`
  width: 100%;
  padding: 0 20px;
  margin-bottom: 20px;
`;

const ListTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin: 0 0 16px 0;
`;

const NoResults = styled.div`
  text-align: center;
  padding: 40px 20px;
  color: #999;
  font-size: 14px;
`;

const ListItem = styled.div`
  display: flex;
  align-items: center;
  background: white;
  border-radius: 16px;
  padding: 16px;
  margin-bottom: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }

  &:active {
    transform: scale(0.98);
  }
`;

const ListItemLogo = styled.div<{ $cor?: string }>`
  width: 60px;
  height: 60px;
  background: ${(props) => props.$cor || "#5b4b7c"};
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  flex-shrink: 0;
  margin-right: 16px;
`;

const ListItemLogoImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ListItemInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const ListItemName = styled.div`
  font-size: 15px;
  font-weight: 600;
  color: #333;
  line-height: 1.3;
`;

const ListItemMax = styled.div`
  font-size: 13px;
  color: #666;

  strong {
    color: #5b4b7c;
    font-weight: 600;
  }
`;

const ListItemArrow = styled.div`
  font-size: 24px;
  color: #ccc;
  margin-left: 8px;
`;

const PageContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background: ${(props) => props.theme.colors.background_3};
  font-family: ${(props) => props.theme.fonts.family.poppins};
`;

const Content = styled.div`
  padding: 24px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 150px;
`;

const InfoList = styled.div`
  width: 100%;
  background: white;
  border-radius: 16px;
  padding: 4px 0;
  margin-bottom: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
`;

const InfoItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 16px 20px;
  border-bottom: 1px solid #f0f0f0;
  &:last-child {
    border-bottom: none;
  }
`;

const InfoItemLabel = styled.div`
  font-size: 13px;
  color: ${(props) => props.theme.colors.textBlack};
`;

const InfoItemValue = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #333;
`;

const InfoItemValueHighlight = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #10b981;
`;

const ButtonContainerAlt = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin: 8px 0 40px 0;
`;

const LogoContainer = styled.div<{ $cor?: string }>`
  width: 80px;
  height: 80px;
  background: ${(props) => props.$cor || "#5b4b7c"};
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
  overflow: hidden;
`;

const LogoImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ServiceTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #333;
  margin: 0 0 32px 0;
  text-align: center;
`;

const InfoCard = styled.div`
  width: 95%;
  background: white;
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  &:last-child {
    margin-bottom: 0;
  }
`;

const InfoLabel = styled.span`
  font-size: 14px;
  color: #666;
`;

const InfoValue = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: #333;
`;

const InfoValueHighlight = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: #2e7d32;
`;

const SectionTitle = styled.h3`
  font-size: 17px;
  font-weight: 600;
  color: #333;
  margin: 10px 0 24px 0;
  width: 100%;
`;

const SectionTitle2 = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin: 0 0 24px 0;
  width: 100%;
  text-align: center;
`;

const SliderContainer = styled.div`
  width: 95%;
  background: white;
  border-radius: 16px;
  padding: 24px 20px;
  margin-bottom: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
`;

const SliderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 14px;
`;

const SliderLabel = styled.span`
  font-size: 14px;
  color: #333;
  font-weight: 500;
`;

const SliderValue = styled.div`
  background: #f5f5f7;
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  color: #333;
`;

const SliderTrack = styled.div`
  position: relative;
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
`;

const SliderRail = styled.div`
  width: 100%;
  height: 6px;
  background: #e0e0e0;
  border-radius: 3px;
  position: relative;
`;

const SliderFill = styled.div<{ percentage: number }>`
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: ${(props) => props.percentage}%;
  background: #5b4b7c;
  border-radius: 3px;
`;

const SliderThumb = styled.div<{ percentage: number }>`
  position: absolute;
  left: ${(props) => props.percentage}%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 24px;
  height: 24px;
  background: #5b4b7c;
  border: 4px solid white;
  border-radius: 50%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  z-index: 1;
`;

const SliderInput = styled.input`
  position: absolute;
  width: 100%;
  height: 40px;
  opacity: 0;
  cursor: pointer;
  z-index: 3;
  margin: 0;
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin: 30px 0 110px 0;
`;

const ConfirmButton = styled.button`
  width: 100%;
  background: #5b4b7c;
  color: white;
  border: none;
  padding: 16px;
  border-radius: 16px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s ease;
  &:hover {
    background: #4a3a6b;
  }
  &:active {
    transform: scale(0.98);
  }
`;

const EditButton = styled.button`
  width: 100%;
  background: white;
  color: #5b4b7c;
  border: 2px solid #5b4b7c;
  padding: 16px;
  border-radius: 16px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    background: #f5f3f8;
  }
  &:active {
    transform: scale(0.98);
  }
`;

const ConfirmCard = styled.div`
  width: 90%;
  background: white;
  border: 2px solid #5b4b7c;
  border-radius: 20px;
  padding: 24px;
  margin-bottom: 24px;
`;

const ConfirmHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #f0f0f0;
`;

const ConfirmLogo = styled.div<{ $cor?: string }>`
  width: 30px;
  height: 30px;
  background: ${(props) => props.$cor || "#5b4b7c"};
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  flex-shrink: 0;
`;

const ConfirmInfo = styled.div`
  flex: 1;
`;

const ConfirmTitle = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: #333;
  margin-bottom: 4px;
`;

const ConfirmSubtitle = styled.div`
  font-size: 11px;
  color: #666;
`;

const ConfirmValue = styled.div`
  font-size: 14px;
  font-weight: 700;
  color: #2e7d32;
`;

const ConfirmDate = styled.div`
  font-size: 12px;
  color: #999;
  margin-top: 4px;
`;

const AccountInfo = styled.div`
  background: #f8f8f8;
  border-radius: 12px;
  padding: 10px;
`;

const AccountLabel = styled.div`
  font-size: 12px;
  color: #666;
  margin-bottom: 8px;
`;

const AccountName = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #333;
`;

const SuccessContainer = styled.div`
  padding: 40px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-bottom: 150px;
`;

const SuccessIcon = styled.div`
  width: 120px;
  height: 120px;
  background: linear-gradient(135deg, #e8d5ff 0%, #f0e8ff 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
  position: relative;
`;

const CardIllustration = styled.div`
  transform: rotate(-15deg);
  font-size: 60px;
`;

const SuccessTitle = styled.h2`
  font-size: 28px;
  font-weight: 700;
  color: #333;
  margin: 0 0 16px 0;
`;

const SuccessMessage = styled.p`
  font-size: 16px;
  color: #666;
  line-height: 1.6;
  max-width: 320px;
  margin: 0 0 40px 0;
`;

const OkButton = styled.button`
  width: 100%;
  max-width: 400px;
  background: #5b4b7c;
  color: white;
  border: none;
  padding: 16px;
  border-radius: 16px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s ease;
  margin: 30px;
  &:active {
    transform: scale(0.98);
  }
`;