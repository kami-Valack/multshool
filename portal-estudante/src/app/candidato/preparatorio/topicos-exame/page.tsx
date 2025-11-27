"use client";

import React, { useState } from "react";
import styled from "styled-components";
import { Header } from "@/components/candidato/Header";
import { useRouter } from "next/navigation";
import Image from "next/image";

// Styled Components
const Container = styled.div`
  min-height: 100vh;
  width: 100vw;
  font-family: ${(props) => props.theme.fonts.family.poppins};
  padding: 20px;
  box-sizing: border-box;
`;

// const Header = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 16px;
//   margin-bottom: 24px;
// `;

const BackButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: #666;

  &:hover {
    background: #f0f0f0;
  }
`;

const Title = styled.h1`
  font-size: 20px;
  font-weight: 600;
  color: #666;
  margin: 0;
`;

const SearchContainer = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
  margin-top: 30px;
`;

const SearchInput = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  gap: 12px;
  background: #e8e8e8;
  border-radius: 24px;
  padding: 12px 20px;
`;

const SearchField = styled.input`
  flex: 1;
  background: none;
  border: none;
  outline: none;
  font-size: 14px;
  color: #666;

  &::placeholder {
    color: #999;
  }
`;

const FilterButton = styled.button`
  background: #8b7fb8;
  border: none;
  border-radius: 12px;
  padding: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 16px;
`;

const CourseCardContainer = styled.div`
  width: 100%;
  border-radius: 16px;
  overflow: hidden;
  margin-bottom: 16px;
`;

const CourseCardTop = styled.div<{ gradient: string }>`
  background: ${(props) => props.gradient};
  padding: 8px 13px;
  color: white;
`;

const CourseCardBottom = styled.div`
  background: #e8e8e8;
  padding: 16px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CourseHeader = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  margin-bottom: 16px;
`;

const CourseIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const CourseImage = styled(Image)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  background: ;
`;

const CourseInfo = styled.div`
  flex: 1;
`;

const CourseName = styled.h3`
  font-size: 14px;
  font-weight: ${(props) => props.theme.fonts.weight.regular};
  margin: 0 0 4px 0;
`;

const CourseSubtitle = styled.p`
  font-size: 12px;
  opacity: 0.9;
  margin: 0;
`;

const CourseStats = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
`;

const StatBadge = styled.div`
  background: rgba(255, 255, 255, 0.11);
  border-radius: 20px;
  padding: 8px 16px;
  font-size: 11px;
  display: flex;
  align-items: center;
  gap: 8px;
  border: 1px solid ${(props) => props.theme.colors.background};
`;

const CourseDescription = styled.p`
  font-size: 12.4px;
  line-height: 1.4;
  margin: 0;
  opacity: 0.9;
`;

const TimeInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: ${(props) => props.theme.colors.textBlack};
  font-weight: ${(props) => props.theme.fonts.weight.regular};
`;

// EM FALTA, BORDA COM GRADIENTE
const DownloadButton = styled.button<{ gradient: string }>`
  border: 1px solid ${(props) => props.gradient};
  border-radius: 24px;
  padding: 7px 14px;
  color: ${(props) => props.theme.colors.textBlack};
  cursor: pointer;
  font-size: 12px;
  font-weight: ${(props) => props.theme.fonts.weight.regular};
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s;
`;

const DetailsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const DetailsHeader = styled.div`
  background: linear-gradient(135deg, #4a9eff, #0066cc);
  border-radius: 16px;
  padding: 20px;
  color: white;
  margin-bottom: 20px;
`;

const DetailsHeaderContent = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  margin-bottom: 16px;
`;

const DetailsIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.2);
  overflow: hidden;
`;

const DetailsImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const DetailsInfo = styled.div`
  flex: 1;
`;

const DetailsName = styled.h2`
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 4px 0;
`;

const DetailsSubtitle = styled.p`
  font-size: 14px;
  opacity: 0.9;
  margin: 0;
`;

const DetailsStats = styled.div`
  display: flex;
  gap: 16px;
`;

const DetailsStatBadge = styled.div`
  background: rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  padding: 8px 16px;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const TimeSection = styled.div`
  background: #e8e8e8;
  border-radius: 16px;
  padding: 16px 20px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const TimeText = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #666;
  font-weight: 500;
`;

const TimeDownloadButton = styled.button`
  background: white;
  border: 2px solid #e0e0e0;
  border-radius: 24px;
  padding: 12px 24px;
  color: #666;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s;

  &:hover {
    background: #f5f5f5;
  }
`;

const SubjectCard = styled.div`
  background: ${(props) => props.theme.colors.background_2};
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 16px;
`;

const SubjectTitle = styled.h3`
  font-size: 16px;
  font-weight: ${(props) => props.theme.fonts.weight.semibold};
  color: ${(props) => props.theme.colors.textBlack};
  margin: 0 0 16px 0;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const CheckIcon = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.theme.colors.textBlack};
  font-size: 12px;
  border: 1px solid ${(props) => props.theme.colors.textBlack};
`;

const TopicList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 20px 0;
`;

const TopicItem = styled.li`
  color: ${(props) => props.theme.colors.textBlack};
  font-size: 12.5px;
  margin-bottom: 8px;
  position: relative;
  padding-left: 12px;
  font-weight: ${(props) => props.theme.fonts.weight.regular};

  &:before {
    content: "•";
    color: ${(props) => props.theme.colors.textBlack};
    position: absolute;
    left: 0;
  }
`;

// EM FALTA, BORDA COM GRADIENTE
const SubjectDownloadButton = styled.button<{ gradient: string }>`
  border: 1px solid ${(props) => props.gradient};
  border-radius: 24px;
  padding: 7px 14px;
  color: ${(props) => props.theme.colors.textBlack};
  cursor: pointer;
  font-size: 12px;
  font-weight: ${(props) => props.theme.fonts.weight.regular};
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s;
`;

// Types
interface Course {
  id: string;
  name: string;
  subtitle: string;
  topics: number;
  views: number;
  description: string;
  createdAt: string;
  imageUrl: string;
}

interface Subject {
  name: string;
  topics: string[];
}

// Color gradients array
const gradients = [
  "linear-gradient(135deg, #008CC8, #008CC8)",
  "linear-gradient(135deg, #0066cc, #0066cc)",
  "linear-gradient(135deg, #f57c00, #f57c00)",
  "linear-gradient(135deg, #7b1fa2, #7b1fa2)",
  "linear-gradient(135deg, #388e3c, #388e3c)",
  "linear-gradient(135deg, #d32f2f, #d32f2f)",
  "linear-gradient(135deg, #0097a7, #0097a7)",
  "linear-gradient(135deg, #4a9eff, #4a9eff)",
  "linear-gradient(135deg, #2196f3, #2196f3)",
  "linear-gradient(135deg, #ff9800, #ff9800)",
  "linear-gradient(135deg, #9c27b0, #9c27b0)",
  "linear-gradient(135deg, #4caf50, #4caf50)",
  "linear-gradient(135deg, #f44336, #f44336)",
  "linear-gradient(135deg, #00bcd4, #00bcd4)",
];

// Utility function to get time ago
const getTimeAgo = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInDays === 0) return "Hoje";
  if (diffInDays === 1) return "Há 1 dia";
  if (diffInDays < 7) return `Há ${diffInDays} dias`;

  const diffInWeeks = Math.floor(diffInDays / 7);
  if (diffInWeeks === 1) return "Há 1 semana";
  if (diffInWeeks < 4) return `Há ${diffInWeeks} semanas`;

  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths === 1) return "Há 1 mês";
  return `Há ${diffInMonths} meses`;
};

// Data
const courses: Course[] = [
  {
    id: "1",
    name: "Engenharias e Tecnologias",
    subtitle: "ISPTEC - 2025",
    topics: 12,
    views: 50,
    description:
      "Tópicos oficiais para o exame de acesso a Faculdade de Engenharias e Tecnologias do ISPTEC.",
    createdAt: "2024-08-31",
    imageUrl: "/assets/backgrounds/candidato/bg_1.png",
  },
  {
    id: "2",
    name: "Economia",
    subtitle: "ISPTEC - 2025",
    topics: 15,
    views: 150,
    description:
      "Tópicos oficiais para o exame de acesso a Faculdade de Economia do ISPTEC.",
    createdAt: "2024-08-25",
    imageUrl: "/assets/backgrounds/candidato/bg_1.png",
  },
  {
    id: "3",
    name: "Geociências",
    subtitle: "ISPTEC - 2025",
    topics: 10,
    views: 90,
    description:
      "Tópicos oficiais para o exame de acesso a Faculdade de Geociências do ISPTEC.",
    createdAt: "2024-08-20",
    imageUrl: "/assets/backgrounds/candidato/bg_1.png",
  },
];

const subjects: Subject[] = [
  {
    name: "Matemática",
    topics: ["Funções", "Derivadas", "Integrais", "Limites e Continuidade"],
  },
  {
    name: "Física Geral",
    topics: [
      "Movimento Rectilíneo Uniforme",
      "Movimento Rectilíneo Uniformemente Variado",
      "Leis de Newton",
      "Lançamentos",
    ],
  },
  {
    name: "Algoritmos",
    topics: ["Estruturas de repetição", "Variáveis", "Matriz"],
  },
];

// Components
const CourseCardComponent: React.FC<{
  course: Course;
  onClick: () => void;
  gradient: string;
  showDescription?: boolean;
}> = ({ course, onClick, gradient, showDescription = true }) => (
  <CourseCardContainer onClick={onClick}>
    <CourseCardTop gradient={gradient}>
      <CourseHeader>
        <CourseIcon>
          <CourseImage
            src={course.imageUrl}
            alt={course.name}
            width={48}
            height={48}
          />
        </CourseIcon>
        <CourseInfo>
          <CourseName>{course.name}</CourseName>
          <CourseSubtitle>{course.subtitle}</CourseSubtitle>
        </CourseInfo>
      </CourseHeader>

      <CourseStats>
        <StatBadge>
          <span>📄</span>
          {course.topics} tópicos
        </StatBadge>
        <StatBadge>
          <span>👁</span>
          {course.views} visualizações
        </StatBadge>
      </CourseStats>

      {showDescription && (
        <CourseDescription>{course.description}</CourseDescription>
      )}
    </CourseCardTop>

    <CourseCardBottom>
      <TimeInfo>
        <span>⏱️</span>
        {getTimeAgo(course.createdAt)}
      </TimeInfo>
      <DownloadButton gradient={gradient}>
        <span>⬇</span>
        Fazer download
      </DownloadButton>
    </CourseCardBottom>
  </CourseCardContainer>
);

const SubjectCardComponent: React.FC<{
  subject: Subject;
  gradient: string;
}> = ({ subject, gradient }) => (
  <SubjectCard>
    <SubjectTitle>
      <CheckIcon>✓</CheckIcon>
      {subject.name}
    </SubjectTitle>
    <TopicList>
      {subject.topics.map((topic, index) => (
        <TopicItem key={index}>{topic}</TopicItem>
      ))}
    </TopicList>
    <div style={{ display: "flex", justifyContent: "flex-end" }}>
      <SubjectDownloadButton gradient={gradient}>
        <span>⬇</span>
        Fazer download
      </SubjectDownloadButton>
    </div>
  </SubjectCard>
);

// Main Component
export default function ExameAcessoForm() {
  const [currentStep, setCurrentStep] = useState<"list" | "details">("list");
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const handleCourseSelect = (course: Course) => {
    setSelectedCourse(course);
    setCurrentStep("details");
  };

  const handleBackClick = () => {
    setCurrentStep("list");
    setSelectedCourse(null);
    router.back();
  };

  //   const handleBack = () => {
  //     setCurrentStep("list");
  //     setSelectedCourse(null);
  //   };

  // Filter courses based on search term
  const filteredCourses = courses.filter(
    (course) =>
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.subtitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <style jsx global>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        html,
        body {
          margin: 0;
          padding: 0;
          overflow-x: hidden;
        }
      `}</style>

      <Container>
        {currentStep === "list" ? (
          // ETAPA 1: Lista de Cursos
          <>
            <Header variant="with-back" onBack={handleBackClick} />
            <SearchContainer>
              <SearchInput>
                <span style={{ fontSize: "16px", color: "#999" }}>🔍</span>
                <SearchField
                  placeholder="Pesquisar por faculdade"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </SearchInput>
              <FilterButton>
                <span>⚙</span>
              </FilterButton>
            </SearchContainer>

            {filteredCourses.map((course, index) => (
              <CourseCardComponent
                key={course.id}
                course={course}
                onClick={() => handleCourseSelect(course)}
                gradient={gradients[index % gradients.length]}
              />
            ))}
          </>
        ) : (
          // ETAPA 2: Detalhes do Curso
          selectedCourse && (
            <DetailsContainer>
              <Header variant="with-back" onBack={handleBackClick} />

              <CourseCardComponent
                course={selectedCourse}
                onClick={() => {}}
                gradient="linear-gradient(135deg, #4a9eff, #0066cc)"
                showDescription={false}
              />

              {subjects.map((subject, index) => (
                <SubjectCardComponent
                  key={index}
                  subject={subject}
                  gradient={gradients[index % gradients.length]}
                />
              ))}
            </DetailsContainer>
          )
        )}
      </Container>
    </>
  );
}
