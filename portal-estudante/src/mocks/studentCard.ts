// Dados mockados para o cartão de estudante

export const mockStudentCardData = {
  studentName: "Ana Correia de Assis Diogo",
  course: "Engenharia Informática",
  studentNumber: "20242190",
  class: "EINF-M1",
  institutionName: "ISPTEC",
  institutionFullName:
    "Instituto Superior Politécnico de Tecnologias e Ciências",
  institutionColor:
    "linear-gradient(30deg, #F9D048 0%, #535353 90%, #535353 100%)", // Cor dourada como na imagem
  institutionLogo: undefined, // Opcional: caminho para o logo da instituição
  qrCode: undefined, // Opcional: dados do QR code
};

// Exemplos de outras instituições com cores diferentes
export const mockStudentCardDataVariants = [
  {
    ...mockStudentCardData,
    institutionName: "UAN",
    institutionFullName: "Universidade Agostinho Neto",
    institutionColor: "linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)", // Azul
  },
  {
    ...mockStudentCardData,
    studentName: "João Silva Santos",
    course: "Medicina",
    studentNumber: "20241234",
    class: "MED-A2",
    institutionName: "FMUAN",
    institutionFullName: "Faculdade de Medicina da Universidade Agostinho Neto",
    institutionColor: "linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)", // Vermelho
  },
  {
    ...mockStudentCardData,
    studentName: "Maria João Fernandes",
    course: "Direito",
    studentNumber: "20240987",
    class: "DIR-B1",
    institutionName: "UCAN",
    institutionFullName: "Universidade Católica de Angola",
    institutionColor: "linear-gradient(135deg, #059669 0%, #047857 100%)", // Verde
  },
];

// Dados mockados para o cartão de estagiário
export const mockTraineeCardData = {
  traineeName: "Ana Correia de Assis Diogo",
  internshipRole: "Frontend Developer",
  traineeNumber: "TRN-2025-001",
  department: "TI",
  companyName: "TIS",
  companyFullName: "Emp. de Consul. Tecnológica",
  companyColor: "linear-gradient(30deg, #4F46E5 0%, #3B82F6 100%)", // Roxo-azulado
  companyLogo: undefined, // Opcional: caminho para o logo da empresa
  qrCode: undefined, // Opcional: dados do QR code
};

// Exemplos de outras empresas/parceiros com cores diferentes
export const mockTraineeCardDataVariants = [
  {
    ...mockTraineeCardData,
    traineeName: "Carla Sofia Mendes",
    internshipRole: "UI/UX Designer",
    traineeNumber: "TRN-2025-002",
    department: "Design e Experiência do Utilizador",
    companyName: "Kixicrédito",
    companyFullName: "Instituição Financeira de Microcrédito",
    companyColor: "linear-gradient(135deg, #F59E0B 0%, #D97706 100%)", // Laranja
  },
  {
    ...mockTraineeCardData,
    traineeName: "Miguel José Carvalho",
    internshipRole: "Analista Financeiro",
    traineeNumber: "TRN-2025-003",
    department: "Departamento Financeiro",
    companyName: "BAI",
    companyFullName: "Banco Angolano de Investimentos",
    companyColor: "linear-gradient(135deg, #2563EB 0%, #1E40AF 100%)", // Azul forte
  },
  {
    ...mockTraineeCardData,
    traineeName: "Rosa Maria Lopes",
    internshipRole: "Gestora de Projetos",
    traineeNumber: "TRN-2025-004",
    department: "Gestão de Projetos",
    companyName: "Unitel",
    companyFullName: "Unitel S.A.",
    companyColor: "linear-gradient(135deg, #10B981 0%, #047857 100%)", // Verde
  },
];
