// mocks/institutions.ts
import { Institution, InstituicaoData, CardOption, ContentSection } from "@/types/institutions";

export const mockInstitutions: Institution[] = [
  {
    id: "1",
    name: "ISPTEC",
    fullName: "Instituto Superior Politécnico de Tecnologias e Ciências",
    courses: 12,
    location: "Luanda, Angola",
    logo: "/logos/nzila.png",
    color: "#4F46E5",
    description: "Instituição de ensino superior focada em inovação tecnológica e formação prática.",
  },
  {
    id: "2",
    name: "Kixicrédito",
    fullName: "Banco Kixicrédito",
    courses: 5,
    location: "Luanda, Angola",
    logo: "/logos/kixicredito.png",
    color: "#F59E0B",
    description: "Banco especializado em microcrédito e apoio ao empreendedorismo.",
  },
  {
    id: "3",
    name: "TIS",
    fullName: "Tecnologias de Informação e Sistemas",
    courses: 8,
    location: "Luanda, Angola",
    logo: "/logos/tis.png",
    color: "#10B981",
    description: "Empresa de consultoria tecnológica líder em soluções digitais e empresariais.",
  },
  {
    id: "4",
    name: "FJE",
    fullName: "Fundação Jovens Empreendedores",
    courses: 4,
    location: "Huambo, Angola",
    logo: "/logos/fje.png",
    color: "#EF4444",
    description: "ONG dedicada ao incentivo do empreendedorismo jovem e desenvolvimento comunitário.",
  },
];

export const mockInstituicaoData: InstituicaoData = {
  title: "Instituições Parceiras",
  totalCount: mockInstitutions.length,
  institutions: mockInstitutions,
};

export const mockCardOptions: CardOption[] = [
  {
    id: "1",
    title: "Tecnologia",
    subtitle: "Cursos de programação e inovação",
    available: 15,
    image: "/cards/tech.png",
    bgColor: "#4F46E5",
    route: "/cursos/tecnologia",
  },
  {
    id: "2",
    title: "Finanças",
    subtitle: "Gestão, contabilidade e investimentos",
    available: 9,
    image: "/cards/finance.png",
    bgColor: "#F59E0B",
    route: "/cursos/financas",
  },
  {
    id: "3",
    title: "Empreendedorismo",
    subtitle: "Criação e gestão de negócios",
    available: 7,
    image: "/cards/startup.png",
    bgColor: "#10B981",
    route: "/cursos/empreendedorismo",
  },
];

export const mockContentSections: ContentSection[] = [
  {
    title: "Benefícios",
    items: [
      "Acesso a cursos exclusivos",
      "Certificados reconhecidos",
      "Rede de mentores especializados",
      "Parcerias com empresas locais",
    ],
  },
  {
    title: "Diferenciais",
    items: [
      "Metodologia prática",
      "Plataforma gamificada",
      "Feedback em tempo real",
      "Integração com oportunidades de estágio",
    ],
  },
];
