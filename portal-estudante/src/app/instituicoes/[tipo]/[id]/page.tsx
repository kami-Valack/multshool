'use client';

import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import styled from "styled-components";
import PageContainer from "@/components/Losangos";
import bgHero from "@/assets/backgrounds/instituicoes/impal_default.png";
import playIcon from "@/assets/icons/play_btn.svg";
import courseIcon from "@/assets/icons/open-book.svg";
import Button from "@/components/ui/Button";
import CourseSelectionModal from "@/components/CourseSelection";
import { studentService } from "@/services/studentService";

interface Course {
  id: string;
  name: string;
}

interface InstitutionDetail {
  id: string;
  name: string;
  fullName: string;
  location: string;
  students: number;
  status: string;
  description: string;
  image: string;
  courses: Course[] | string[]; // Aceita tanto objetos Course quanto strings (para compatibilidade)
}

type InstitutionData = {
  [key: string]: InstitutionDetail;
};

type InstitutionsDatabase = {
  [key: string]: InstitutionData;
};

const institutionDetails: InstitutionsDatabase = {
  "ensino-medio": {
    "1": {
      id: "1",
      name: "IMIL",
      fullName: "Instituto Médio Industrial de Luanda (Makarenko)",
      location: "Município da Ingombota, Luanda",
      students: 4500,
      status: "Actualmente",
      description:
        "O Instituto Médio Industrial de Luanda, é uma escola de ensino médio-técnico angolana localizado no município da Ingombota, na província de Luanda. O instituto é de propriedade do Ministério da Educação de Angola.",
      image: bgHero.src,
      courses: [
        "Electrotecnia",
        "Mecânica",
        "Informática",
        "Construção Civil",
        "Química Industrial",
        "Metalomecânica",
        "Refrigeração",
        "Soldadura",
      ],
    },
    "2": {
      id: "2",
      name: "IMPAL",
      fullName: "Instituto Médio Politécnico Alda Lara - IMPAL",
      location: "Município da Ingombota, Luanda",
      students: 6000,
      status: "Actualmente",
      description:
        "O Instituto Médio Politécnico Alda Lara, é uma escola de ensino médio-técnico angolana localizado no município da Ingombota, na província de Luanda. O instituto é de propriedade do Ministério da Educação de Angola.",
      image: bgHero.src,
      courses: [
        "Informática",
        "Electrotecnia",
        "Contabilidade",
        "Administração",
        "Secretariado",
        "Mecânica",
        "Construção Civil",
        "Química",
        "Enfermagem",
        "Farmácia",
      ],
    },
    "3": {
      id: "3",
      name: "IMPTEL",
      fullName: "Instituto Médio Politécnico de Tecnologias de Luanda",
      location: "Município da Ingombota, Luanda",
      students: 3200,
      status: "Actualmente",
      description:
        "O Instituto Médio Politécnico de Tecnologias de Luanda, é uma escola de ensino médio-técnico angolana especializada em tecnologias, localizado no município da Ingombota, na província de Luanda.",
      image: "/assets/institutions/imptel.jpg",
      courses: [
        "Informática",
        "Telecomunicações",
        "Electrónica",
        "Redes e Sistemas",
        "Programação",
        "Design Gráfico",
        "Multimédia",
      ],
    },
  },
  "ensino-superior": {
    "1": {
      id: "1",
      name: "UAN",
      fullName: "Universidade Agostinho Neto",
      location: "Município da Ingombota, Luanda",
      students: 45000,
      status: "Actualmente",
      description:
        "A Universidade Agostinho Neto é a principal universidade pública de Angola, localizada no município da Ingombota, na província de Luanda. É a maior e mais antiga instituição de ensino superior do país.",
      image: "/assets/institutions/uan.jpg",
      courses: [
        "Medicina",
        "Engenharia",
        "Direito",
        "Economia",
        "Arquitectura",
        "Ciências",
        "Letras",
        "Psicologia",
      ],
    },
    "2": {
      id: "2",
      name: "UKB",
      fullName: "Universidade Kimpa Vita",
      location: "Município de Viana, Luanda",
      students: 12000,
      status: "Actualmente",
      description:
        "A Universidade Kimpa Vita é uma instituição privada de ensino superior localizada em Viana, Luanda. Oferece diversos cursos de graduação e pós-graduação com foco na qualidade e inovação educacional.",
      image: "/assets/institutions/ukb.jpg",
      courses: [
        "Engenharia Informática",
        "Gestão",
        "Marketing",
        "Contabilidade",
        "Arquitectura",
        "Design",
      ],
    },
    "3": {
      id: "3",
      name: "UJE",
      fullName: "Universidade Jean Piaget de Angola",
      location: "Município de Viana, Luanda",
      students: 8500,
      status: "Actualmente",
      description:
        "A Universidade Jean Piaget de Angola é uma instituição privada de ensino superior que oferece formação de qualidade em diversas áreas do conhecimento, com metodologias inovadoras e corpo docente qualificado.",
      image: "/assets/institutions/uje.jpg",
      courses: [
        "Psicologia",
        "Educação",
        "Saúde",
        "Gestão",
        "Informática",
        "Comunicação Social",
      ],
    },
  },
};

const Container = styled.div`
  width: 100vw;
  min-height: 100vh;
  background: white;
  position: relative;
`;

const BackButton = styled.button`
  position: absolute;
  top: 60px;
  left: 20px;
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 999;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 1);
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const PlayIcon = styled.img`
  width: 20px;
  height: 20px;
`;

const BackIcon = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;

  &::before {
    content: "←";
    font-size: 20px;
    font-weight: bold;
    color: #333;
  }
`;

const HeroSection = styled.div`
  position: relative;
  height: 50vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const HeroImage = styled.div<{ $backgroundImage: string }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url(${(props) => props.$backgroundImage}) center/cover;
  z-index: 1;
`;

const HeroContent = styled.div`
  text-align: center;
  z-index: 3;
  color: white;
  position: relative;
`;

const InstitutionTitle = styled.h1`
  font-size: 18px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin: 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  max-width: 300px;
  line-height: 1.2;
`;

const PresentationButton = styled.button`
  background: rgba(124, 116, 175, 0.9);
  border: none;
  border-radius: 12px;
  padding: 15px 30px;
  color: white;
  font-size: 16px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 30px auto 0;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);

  &:hover {
    background: rgba(124, 116, 175, 1);
    transform: translateY(-2px);
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

const CoursesButtonFixed = styled.div`
  position: absolute;
  right: 20px;
  top: calc(50vh - 35px);
  z-index: 10;
`;

const CoursesButton = styled.button`
  width: 70px;
  height: 70px;
  background: ${(props) => props.theme.colors.primary_light_200};
  border: 1px solid ${(props) => props.theme.colors.background};
  border-radius: 50%;
  color: ${(props) => props.theme.colors.primary};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 16px rgba(124, 116, 175, 0.3);
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);

  &:hover {
    background: ${(props) => props.theme.colors.background};
    transform: scale(1.1);
  }

  span {
    font-size: 12px;
    font-weight: 500;
  }
`;

const CourseIcon = styled.img`
  width: 20px;
  height: 20px;
  margin-bottom: 5px;
`;

const ContentSection = styled.div`
  padding: 30px 20px 60px;
  background: ${(props) => props.theme.colors.background};
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const SectionTitle = styled.h2`
  font-size: 14px;
  color: #999;
  font-weight: ${(props) => props.theme.fonts.weight.semibold};
  margin: 0 0 15px 0;
  text-transform: lowercase;
  letter-spacing: 0.5px;
`;

const InstitutionName = styled.h1`
  font-size: 20px;
  font-weight: ${(props) => props.theme.fonts.weight.semibold};
  color: ${(props) => props.theme.colors.textBlack};
  margin: 0 0 15px 0;
  line-height: 1.3;
`;

const InfoRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
  color: ${(props) => props.theme.colors.primary};
  font-size: 15px;

  svg {
    width: 20px;
    height: 20px;
  }
`;

const TextMuted = styled.span`
  color: ${(props) => props.theme.colors.foreground};
`;

const StudentsInfo = styled.div`
  color: ${(props) => props.theme.colors.primary};
  font-size: 14px;
  margin-bottom: 25px;
  font-weight: ${(props) => props.theme.fonts.weight.regular};
`;

const Description = styled.p`
  font-size: 14px;
  line-height: 1.6;
  margin: 0;
  text-align: justify;
`;

const ActionButtons = styled.div`
  width: 100%;
  margin: 40px 0 40px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 15px;
  z-index: 10;
`;

const ModalOverlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: ${(props) => (props.$isOpen ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 20px;
  width: 100%;
  max-width: 400px;
  overflow: hidden;
  position: relative;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
`;

const ModalCloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  width: 32px;
  height: 32px;
  background: rgba(0, 0, 0, 0.5);
  border: none;
  border-radius: 50%;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  font-size: 18px;
  font-weight: bold;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(0, 0, 0, 0.7);
  }
`;

const VideoContainer = styled.div<{ $bgImage: string; $isFullscreen: boolean }>`
  position: relative;
  width: 100%;
  height: ${(props) => (props.$isFullscreen ? "100vh" : "250px")};
  background: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  background-size: cover;
  background-position: center;

  ${(props) =>
    props.$isFullscreen
      ? `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9999;
  `
      : ""}

  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const VideoOverlay = styled.div<{ $showControls: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${(props) =>
    props.$showControls ? "rgba(0, 0, 0, 0.3)" : "transparent"};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
`;

const PlayButtonOverlay = styled.button<{ $isPlaying: boolean }>`
  width: 80px;
  height: 80px;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 50%;
  display: ${(props) => (props.$isPlaying ? "none" : "flex")};
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 32px;
  color: #333;
  transition: all 0.3s ease;

  &:hover {
    background: white;
    transform: scale(1.1);
  }

  &::before {
    content: "▶";
    margin-left: 4px;
  }
`;

const VideoControls = styled.div<{ $isVisible: boolean }>`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
  padding: 15px;
  display: flex;
  align-items: center;
  gap: 10px;
  opacity: ${(props) => (props.$isVisible ? 1 : 0)};
  transition: opacity 0.3s ease;
`;

const PlayButton = styled.button<{ $isPlaying: boolean }>`
  width: 32px;
  height: 32px;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &::before {
    content: "${(props) => (props.$isPlaying ? "⏸" : "▶")}";
    font-size: 14px;
    color: #333;
    ${(props) => !props.$isPlaying && "margin-left: 2px;"}
  }
`;

const ProgressBar = styled.div`
  flex: 1;
  height: 6px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 3px;
  overflow: hidden;
  cursor: pointer;
  position: relative;
`;

const ProgressFill = styled.div<{ $progress: number }>`
  height: 100%;
  background: linear-gradient(90deg, #8b7fc7, #a495d3);
  width: ${(props) => props.$progress}%;
  border-radius: 3px;
  transition: width 0.1s ease;
`;

const FullscreenButton = styled.button`
  width: 32px;
  height: 32px;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 4px;
  color: #333;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;

  &::before {
    content: "⛶";
  }
`;

const TimeDisplay = styled.div`
  color: white;
  font-size: 12px;
  font-weight: 500;
  min-width: 40px;
  text-align: center;
`;

const ModalInfo = styled.div`
  padding: 20px;
`;

const ModalTitle = styled.h2`
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin: 0 0 8px 0;
  line-height: 1.3;
`;

const ModalLocation = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #666;
  font-size: 14px;
  margin-bottom: 20px;

  &::before {
    content: "📍";
    font-size: 16px;
  }
`;

const ModalButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const HeartButton = styled.button`
  width: 58px;
  height: 48px;
  background: ${(props) => props.theme.colors.primary};
  border: none;
  border-radius: 50%;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &::before {
    content: "♡";
    font-size: 24px;
  }

  &:hover {
    background: #7a6fb8;
    transform: scale(1.05);
  }
`;

const EnrollButton = styled.button`
  flex: 1;
  background: transparent;
  border: 2px solid #8b7fc7;
  border-radius: 25px;
  padding: 12px 20px;
  color: #8b7fc7;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #8b7fc7;
    color: white;
  }
`;

export default function InstitutionDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [showCourses, setShowCourses] = useState(false);
  const [showCoursesModal, setShowCoursesModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [institution, setInstitution] = useState<InstitutionDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const tipo = params.tipo as string;
  const id = params.id as string;

  // Buscar dados da instituição da API
  useEffect(() => {
    const loadInstitution = async () => {
      if (!id) return;
      
      setIsLoading(true);
      setError(null);
      
      try {
        console.log("Buscando instituição com ID:", id);
        const data = await studentService.getInstitution(id, true);
        
        console.log("Dados recebidos da API:", data);
        
        // Mapear dados da API para o formato esperado pela UI
        const mappedInstitution: InstitutionDetail = {
          id: data.id || id,
          name: data.short_name || data.name?.substring(0, 10).toUpperCase() || "INST",
          fullName: data.name || "Instituição",
          location: data.address || data.location || "Angola",
          students: data.students_count || data.students || 0,
          status: data.status === 'approved' ? "Actualmente" : data.status || "Actualmente",
          description: data.description || data.about || data.address || "Sem descrição disponível.",
          image: data.logo || data.image || bgHero.src,
            courses: data.courses?.map((course: any) => ({
              id: course.id,
              name: course.name || course.title || 'Curso',
            })) || [],
        };
        
        setInstitution(mappedInstitution);
      } catch (err: any) {
        console.error("Erro ao carregar instituição:", err);
        setError(err.message || "Erro ao carregar instituição");
        
        // Fallback para dados mockados se houver erro
        const mockData = institutionDetails[tipo]?.[id];
        if (mockData) {
          setInstitution(mockData);
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadInstitution();
  }, [id, tipo]);

  const handleBackClick = () => {
    console.log("Clicou no botão voltar");
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  };

  const handleEnrollClick = () => {
    console.log("Fazer matrícula");
  };

  const handleRequirementsClick = () => {
    console.log("Ver requisitos");
  };

  const handleCoursesClick = () => {
    console.log("Ver cursos");
    setShowCoursesModal(true);
  };

  const handleCloseCourses = () => {
    setShowCoursesModal(false);
  };

  const handleCourseSelect = (course: string | Course) => {
    console.log("Curso selecionado:", course);
    // A navegação é feita pelo CourseSelectionModal
    // Esta função é apenas para compatibilidade
  };

  const handlePresentationClick = () => {
    console.log("Ver apresentação");
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setIsPlaying(false);
    setCurrentTime(0);
    setIsFullscreen(false);
  };

  const handlePlayPause = () => {
    const video = document.querySelector(
      "#presentationVideo"
    ) as HTMLVideoElement;
    if (video) {
      if (isPlaying) {
        video.pause();
      } else {
        video.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    const video = document.querySelector(
      "#presentationVideo"
    ) as HTMLVideoElement;
    if (video) {
      setCurrentTime(video.currentTime);
      setDuration(video.duration || 0);
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const video = document.querySelector(
      "#presentationVideo"
    ) as HTMLVideoElement;
    const progressBar = e.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = clickX / rect.width;

    if (video && duration) {
      const newTime = percentage * duration;
      video.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const handleFullscreen = async () => {
    const videoContainer = document.querySelector(
      "#videoContainer"
    ) as HTMLElement;

    if (!isFullscreen) {
      if (videoContainer.requestFullscreen) {
        await videoContainer.requestFullscreen();
      }
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        await document.exitFullscreen();
      }
      setIsFullscreen(false);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  // Mostrar loading
  if (isLoading) {
    return (
      <PageContainer>
        <Container>
          <BackButton onClick={handleBackClick}>
            <BackIcon />
          </BackButton>
          <div style={{ padding: "100px 20px", textAlign: "center" }}>
            <p>Carregando instituição...</p>
          </div>
        </Container>
      </PageContainer>
    );
  }

  // Mostrar erro se não houver instituição
  if (!institution || error) {
    return (
      <PageContainer>
        <Container>
          <BackButton onClick={handleBackClick}>
            <BackIcon />
          </BackButton>
          <div style={{ padding: "100px 20px", textAlign: "center" }}>
            <h2>Instituição não encontrada</h2>
            <p>{error || "A instituição solicitada não foi encontrada."}</p>
          </div>
        </Container>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <Container>
        <BackButton onClick={handleBackClick} type="button">
          <BackIcon />
        </BackButton>

        <HeroSection>
          <HeroImage $backgroundImage={institution.image} />
          <HeroContent>
            <PresentationButton onClick={handlePresentationClick}>
              <PlayIcon src={playIcon.src} alt="Play" />
              Apresentação
            </PresentationButton>
          </HeroContent>
        </HeroSection>

        <CoursesButtonFixed>
          <CoursesButton onClick={handleCoursesClick}>
            <CourseIcon src={courseIcon.src} alt="Cursos" />
            <span>Cursos</span>
          </CoursesButton>
        </CoursesButtonFixed>

        <ContentSection>
          <SectionTitle>Informações</SectionTitle>

          <InstitutionName>{institution.fullName}</InstitutionName>

          <InfoRow>
            <TextMuted>{institution.location}</TextMuted>
          </InfoRow>

          <StudentsInfo>
            <strong>{institution.students.toLocaleString()} estudantes</strong>{" "}
            - {institution.status}
          </StudentsInfo>

          <Description>
            <TextMuted>{institution.description}</TextMuted>
          </Description>

          <ActionButtons>
            <Button
              bgColor="primary"
              textColor="#FFFFFF"
              text="Fazer matrícula"
              hasBorder={false}
              onClick={handleCoursesClick}
            />
            <Button
              bgColor="background"
              textColor="#6C5F8D"
              text="Ver requisitos"
              hasBorder={true}
              onClick={handleCoursesClick}
            />
          </ActionButtons>
        </ContentSection>

        <ModalOverlay $isOpen={showModal} onClick={handleCloseModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalCloseButton onClick={handleCloseModal}>×</ModalCloseButton>

            <VideoContainer
              id="videoContainer"
              $bgImage={institution.image}
              $isFullscreen={isFullscreen}
            >
              <video
                id="presentationVideo"
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleTimeUpdate}
                onEnded={() => setIsPlaying(false)}
                style={{ display: "block" }}
              >
                <source
                  src="/assets/videos/apresentacao.mp4"
                  type="video/mp4"
                />
                <source
                  src="/assets/videos/apresentacao.webm"
                  type="video/webm"
                />
                Seu navegador não suporta vídeo HTML5.
              </video>

              <VideoOverlay
                $showControls={!isPlaying}
                onClick={handlePlayPause}
              >
                <PlayButtonOverlay
                  $isPlaying={isPlaying}
                  onClick={handlePlayPause}
                />
              </VideoOverlay>

              <VideoControls $isVisible={true}>
                <PlayButton $isPlaying={isPlaying} onClick={handlePlayPause} />
                <TimeDisplay>{formatTime(currentTime)}</TimeDisplay>
                <ProgressBar onClick={handleProgressClick}>
                  <ProgressFill
                    $progress={(currentTime / duration) * 100 || 0}
                  />
                </ProgressBar>
                <TimeDisplay>{formatTime(duration)}</TimeDisplay>
                <FullscreenButton onClick={handleFullscreen} />
              </VideoControls>
            </VideoContainer>

            {!isFullscreen && (
              <ModalInfo>
                <ModalTitle>{institution.fullName}</ModalTitle>
                <ModalLocation>{institution.location}</ModalLocation>

                <ModalButtons>
                  <HeartButton />
                  <Button
                    bgColor="background"
                    textColor="#6C5F8D"
                    text="+ Fazer matrícula"
                    hasBorder={true}
                    onClick={handleCoursesClick}
                  />
                </ModalButtons>
              </ModalInfo>
            )}
          </ModalContent>
        </ModalOverlay>
      </Container>
      <CourseSelectionModal
        isOpen={showCoursesModal}
        onClose={handleCloseCourses}
        institutionName={institution.name}
        courses={institution.courses}
        onCourseSelect={handleCourseSelect}
      />
    </PageContainer>
  );
}
