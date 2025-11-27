'use client'
import React from "react";
import styled from "styled-components";
import { useParams, useRouter } from 'next/navigation';

interface Course {
  id: string;
  name: string;
}

interface CourseSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  institutionName: string;
  courses: Course[] | string[]; // Aceita tanto objetos Course quanto strings (para compatibilidade)
  onCourseSelect?: (course: string | Course) => void;
}

const ModalOverlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: ${(props) => (props.$isOpen ? "flex" : "none")};
  align-items: flex-end;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(4px);
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 20px 20px 0 0;
  width: 100%;
  max-width: 500px;
  max-height: 85vh;
  overflow: hidden;
  position: relative;
  animation: slideUp 0.3s ease-out;

  @keyframes slideUp {
    from {
      transform: translateY(100%);
    }
    to {
      transform: translateY(0);
    }
  }
`;

const ModalHeader = styled.div`
  padding: 20px 20px 10px;
  text-align: center;
  position: relative;
`;

const CloseIndicator = styled.div`
  width: 40px;
  height: 4px;
  background: #e0e0e0;
  border-radius: 2px;
  margin: 0 auto 20px;
`;

const ModalTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #333;
  margin: 0;
`;

const CoursesGrid = styled.div`
  padding: 20px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  max-height: 60vh;
  overflow-y: auto;
`;

const CourseCard = styled.button`
  background: linear-gradient(135deg, rgba(124, 116, 175, 0.8), rgba(164, 149, 211, 0.8));
  border: none;
  border-radius: 16px;
  padding: 20px 16px;
  height: 120px;
  color: white;
  font-size: 16px;
  font-weight: 600;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  line-height: 1.2;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(124, 116, 175, 0.4);
  }

  &:active {
    transform: translateY(0);
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E") repeat;
    opacity: 0.3;
  }

  /* Diferentes gradientes para variação visual */
  &:nth-child(2n) {
    background: linear-gradient(135deg, rgba(103, 126, 234, 0.8), rgba(118, 75, 162, 0.8));
  }

  &:nth-child(3n) {
    background: linear-gradient(135deg, rgba(139, 127, 199, 0.8), rgba(164, 149, 211, 0.8));
  }

  &:nth-child(4n) {
    background: linear-gradient(135deg, rgba(118, 75, 162, 0.8), rgba(103, 126, 234, 0.8));
  }

  &:nth-child(5n) {
    background: linear-gradient(135deg, rgba(164, 149, 211, 0.8), rgba(139, 127, 199, 0.8));
  }
`;

// Mapeamento de cursos para termos mais adequados ao design
const courseDisplayNames: { [key: string]: string } = {
  "Electrotecnia": "Técnico de\nElectrotecnia",
  "Mecânica": "Técnico de\nMecânica Industrial",
  "Informática": "Técnico de\nInformática",
  "Construção Civil": "Técnico de\nConstrução Civil",
  "Química Industrial": "Técnico de\nQuímica Industrial",
  "Metalomecânica": "Técnico de\nMetalomecânica",
  "Refrigeração": "Técnico de\nRefrigeração",
  "Soldadura": "Técnico de\nSoldadura",
  "Contabilidade": "Contabilidade\ne Gestão",
  "Administração": "Técnico de\nAdministração",
  "Secretariado": "Técnico de\nSecretariado",
  "Química": "Técnico de\nQuímica",
  "Enfermagem": "Técnico de\nEnfermagem",
  "Farmácia": "Técnico de\nFarmácia",
  "Telecomunicações": "Técnico de\nTelecomunicações",
  "Electrónica": "Técnico de\nElectronica",
  "Redes e Sistemas": "Técnico de\nRedes e Sistemas",
  "Programação": "Técnico de\nProgramação",
  "Design Gráfico": "Técnico de\nDesign Gráfico",
  "Multimédia": "Técnico de\nMultimédia",
  "Medicina": "Medicina",
  "Engenharia": "Engenharia",
  "Direito": "Direito",
  "Economia": "Técnico de\nEconomia",
  "Arquitectura": "Arquitectura",
  "Ciências": "Ciências",
  "Letras": "Letras",
  "Psicologia": "Psicologia",
  "Engenharia Informática": "Engenharia\nInformática",
  "Gestão": "Gestão\nEmpresarial",
  "Marketing": "Marketing",
  "Design": "Design",
  "Educação": "Educação",
  "Saúde": "Saúde",
  "Comunicação Social": "Comunicação\nSocial"
};

// Mapeamento para URLs (slugs)
const courseToSlugMapping: { [key: string]: string } = {
  "Electrotecnia": "electrotecnia",
  "Mecânica": "mecanica",
  "Informática": "informatica",
  "Construção Civil": "construcao-civil",
  "Química Industrial": "quimica-industrial",
  "Metalomecânica": "metalomecanica",
  "Refrigeração": "refrigeracao",
  "Soldadura": "soldadura",
  "Contabilidade": "contabilidade",
  "Administração": "administracao",
  "Secretariado": "secretariado",
  "Química": "quimica",
  "Enfermagem": "enfermagem",
  "Farmácia": "farmacia",
  "Telecomunicações": "telecomunicacoes",
  "Electrónica": "electronica",
  "Redes e Sistemas": "redes-sistemas",
  "Programação": "programacao",
  "Design Gráfico": "design-grafico",
  "Multimédia": "multimedia",
  "Medicina": "medicina",
  "Engenharia": "engenharia",
  "Direito": "direito",
  "Economia": "economia",
  "Arquitectura": "arquitectura",
  "Ciências": "ciencias",
  "Letras": "letras",
  "Psicologia": "psicologia",
  "Engenharia Informática": "engenharia-informatica",
  "Gestão": "gestao",
  "Marketing": "marketing",
  "Design": "design",
  "Educação": "educacao",
  "Saúde": "saude",
  "Comunicação Social": "comunicacao-social"
};

const CourseSelectionModal: React.FC<CourseSelectionModalProps> = ({
  isOpen,
  onClose,
  institutionName,
  courses,
  onCourseSelect,
}) => {
  const router = useRouter();

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleCourseClick = (course: Course | string) => {
    // Chamar callback se fornecido (para compatibilidade com código existente)
    if (onCourseSelect) {
      onCourseSelect(course);
    }
    
    // Fechar modal
    onClose();
    
    // Se for um objeto Course com ID, usar o ID (UUID)
    // Caso contrário, usar slug (compatibilidade com código antigo)
    if (typeof course === 'object' && course.id) {
      router.push(`/curso/${course.id}`);
    } else {
      // Fallback para slug (compatibilidade)
      const courseName = typeof course === 'string' ? course : course.name;
      const courseSlug = courseToSlugMapping[courseName] || courseName.toLowerCase().replace(/\s+/g, '-');
      router.push(`/curso/${courseSlug}`);
    }
  };

  return (
    <ModalOverlay $isOpen={isOpen} onClick={handleOverlayClick}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <CloseIndicator />
          <ModalTitle>Selecione um curso</ModalTitle>
        </ModalHeader>

        <CoursesGrid>
          {courses.map((course, index) => {
            const courseName = typeof course === 'object' ? course.name : course;
            const courseId = typeof course === 'object' ? course.id : index.toString();
            return (
              <CourseCard
                key={courseId}
                onClick={() => handleCourseClick(course)}
                type="button"
              >
                {courseDisplayNames[courseName] || courseName}
              </CourseCard>
            );
          })}
        </CoursesGrid>
      </ModalContent>
    </ModalOverlay>
  );
};

export default CourseSelectionModal;