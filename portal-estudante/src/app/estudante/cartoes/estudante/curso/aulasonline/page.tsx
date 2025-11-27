"use client";

import { useState, useEffect } from "react";
import styled from "styled-components";
import { useAuth } from "@/contexts/AuthContext";
import { getFirstAndLastName } from "@/utils/cutName";

// ============ DADOS MOCKADOS ============
const mockTeachers = [
  { id: 1, name: "Judson Paiva", avatar: "👨‍🏫", online: true },
  { id: 2, name: "Benvindo Costa", avatar: "👨‍💼", online: true },
  { id: 3, name: "José Manuel", avatar: "👨‍🎓", online: false },
  { id: 4, name: "Adão Silva", avatar: "👨", online: false },
  { id: 5, name: "Bernardo Manuel", avatar: "👨‍🏫", online: true },
];

const mockClasses = [
  {
    id: 1,
    title: "CDI I - Cálculo Diferencial e Integral I",
    subtitle: "Capítulo I: Funções e Limites",
    teacher: mockTeachers[4],
    year: "1º Ano",
    totalClasses: 20,
    views: 1250,
    likes: 890,
    uploadTime: "Há 2 dias",
    duration: "59:32",
    thumbnail: "📐",
    isLive: false,
  },
  {
    id: 2,
    title: "Análise de Algoritmos",
    subtitle: "Complexidade e Notação Big O",
    teacher: mockTeachers[0],
    year: "3º Ano",
    totalClasses: 15,
    views: 850,
    likes: 620,
    uploadTime: "Há 5 dias",
    duration: "45:20",
    thumbnail: "💻",
    isLive: false,
  },
  {
    id: 3,
    title: "Programação Orientada a Objetos",
    subtitle: "Herança e Polimorfismo",
    teacher: mockTeachers[1],
    year: "2º Ano",
    totalClasses: 18,
    views: 2100,
    likes: 1450,
    uploadTime: "Há 1 dia",
    duration: "52:15",
    thumbnail: "🎯",
    isLive: false,
  },
];

const mockLiveClasses = [
  {
    id: 101,
    title: "Física II - Mecânica Quântica",
    subtitle: "Aula ao vivo",
    teacher: mockTeachers[0],
    year: "2º Ano",
    totalClasses: 1,
    views: 145,
    likes: 98,
    uploadTime: "Iniciado às 14:30",
    duration: "AO VIVO",
    thumbnail: "⚛️",
    isLive: true,
  },
  {
    id: 102,
    title: "Programação Web - React Avançado",
    subtitle: "Aula ao vivo",
    teacher: mockTeachers[1],
    year: "3º Ano",
    totalClasses: 1,
    views: 278,
    likes: 189,
    uploadTime: "Iniciado às 15:00",
    duration: "AO VIVO",
    thumbnail: "⚛️",
    isLive: true,
  },
];

// mockComments será inicializado dentro do componente para ter acesso ao user
  {
    id: 3,
    user: "Carlos Santos",
    avatar: "👨",
    text: "Poderia explicar melhor a parte dos limites?",
    time: "10min",
    online: false,
    likes: 3,
    liked: false,
    replies: [],
  },
];

// ============ STYLED COMPONENTS ============
const GlobalWrapper = styled.div`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    margin: 0 !important;
    padding: 0 !important;
    overflow-x: hidden;
  }
`;

const AppContainer = styled.div`
  min-height: 100vh;
  background: #0a0a0f;
  color: #ffffff;
  font-family: ${(props) => props.theme.fonts.family.poppins};
  width: 100.5vw;
  overflow-x: hidden;
  position: relative;
  margin: -10px -10px -10px -10px;
`;

const Header = styled.div`
  padding: 20px;
  background: #12121a;
  border-bottom: 1px solid #1f1f2e;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 100;
  gap: 16px;
`;

const HeaderTitle = styled.h1`
  font-size: 20px;
  font-weight: 700;
  color: #ffffff;
  white-space: nowrap;
`;

const SearchInput = styled.input`
  width: 100%;
  background: #1f1f2e;
  border: 1px solid #2a2a3e;
  border-radius: 25px;
  padding: 12px 16px 12px 48px;
  color: white;
  font-size: 16px;

  &::placeholder {
    color: #666677;
  }

  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const Content = styled.div`
  padding: 20px;
  padding-bottom: 100px;
`;

const Section = styled.div`
  margin-bottom: 32px;
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const SectionTitle = styled.h2`
  font-size: 18px;
  font-weight: 700;
  color: #ffffff;
`;

const LiveBadge = styled.div`
  background: #ff3366;
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 6px;

  &::before {
    content: "";
    width: 6px;
    height: 6px;
    background: white;
    border-radius: 50%;
    animation: pulse 1.5s ease-in-out infinite;
  }

  @keyframes pulse {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }
`;

const TeachersScroll = styled.div`
  display: flex;
  gap: 16px;
  overflow-x: auto;
  padding-bottom: 10px;

  &::-webkit-scrollbar {
    height: 6px;
  }

  &::-webkit-scrollbar-track {
    background: #12121a;
  }

  &::-webkit-scrollbar-thumb {
    background: #1f1f2e;
    border-radius: 3px;
  }
`;

const TeacherCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  min-width: 80px;

  &:hover {
    transform: translateY(-4px);
  }
`;

const TeacherAvatar = styled.div<{ $online?: boolean }>`
  width: 70px;
  height: 70px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  border: 3px solid ${(props) => (props.$online ? "#00ff88" : "#2a2a3e")};
`;

const TeacherName = styled.span`
  font-size: 12px;
  color: #a0a0b0;
  text-align: center;
`;

const HeroCard = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 40px 30px;
  border-radius: 20px;
  margin-bottom: 30px;
`;

const HeroTitle = styled.h2`
  font-size: 28px;
  font-weight: 800;
  margin: 0 0 12px 0;
  line-height: 1.3;
`;

const HeroText = styled.p`
  font-size: 14px;
  margin: 4px 0;
`;

const LiveClassesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const LiveClassCard = styled.div`
  background: #12121a;
  border: 1px solid #ff3366;
  border-radius: 12px;
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(255, 51, 102, 0.3);
  }
`;

const LiveClassInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const LiveClassTitle = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #ffffff;
`;

const LiveClassMeta = styled.div`
  font-size: 12px;
  color: #a0a0b0;
`;

const LiveViewers = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  font-weight: 600;
  color: #ff3366;
`;

const ClassesList = styled.div`
  display: grid;
  gap: 25px;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  margin-top: 30px;
`;

const SearchBar = styled.div`
  position: relative;
  margin-bottom: 20px;
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 18px;
  color: #666677;
  pointer-events: none;
`;

const ViewAllButton = styled.button`
  background: #667eea;
  border: none;
  border-radius: 12px;
  padding: 12px 24px;
  color: white;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  width: 100%;
  margin-top: 16px;

  &:hover {
    background: #764ba2;
    transform: translateY(-2px);
  }
`;

const AllClassesContainer = styled.div`
  padding: 20px;
  padding-bottom: 100px;
`;

const FiltersRow = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
  overflow-x: auto;
  padding-bottom: 8px;

  &::-webkit-scrollbar {
    height: 6px;
  }

  &::-webkit-scrollbar-track {
    background: #12121a;
  }

  &::-webkit-scrollbar-thumb {
    background: #1f1f2e;
    border-radius: 3px;
  }
`;

const FilterButton = styled.button<{ $active?: boolean }>`
  background: ${(props) => (props.$active ? "#667eea" : "#1f1f2e")};
  border: 1px solid ${(props) => (props.$active ? "#667eea" : "#2a2a3e")};
  border-radius: 20px;
  padding: 8px 16px;
  color: white;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.3s;

  &:hover {
    background: ${(props) => (props.$active ? "#764ba2" : "#2a2a3e")};
  }
`;

const FilterSelect = styled.select`
  background: #1f1f2e;
  border: 1px solid #2a2a3e;
  border-radius: 20px;
  padding: 8px 16px;
  color: white;
  font-size: 15px;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #667eea;
  }

  option {
    background: #1f1f2e;
  }
`;

const ResultsCount = styled.div`
  font-size: 14px;
  color: #a0a0b0;
  margin-bottom: 16px;
`;

// const ClassCard = styled.div`
//   background: #12121a;
//   border-radius: 16px;
//   overflow: hidden;
//   cursor: pointer;
//   border: 1px solid #1f1f2e;
//   transition: all 0.3s;

//   &:hover {
//     transform: translateY(-4px);
//     border-color: #667eea;
//   }
// `;

const ClassCard = styled.div`
  background: #12121a;
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  border: 1px solid #1f1f2e;
  transition: all 0.3s;

  &:hover {
    transform: translateY(-4px);
    border-color: #667eea;
  }
`;

const ClassThumbnail = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  height: 140px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 64px;
`;

const ClassInfo = styled.div`
  padding: 16px;
`;

const ClassTitle = styled.h3`
  font-size: 15px;
  font-weight: 700;
  margin: 0 0 8px 0;
  color: #ffffff;
`;

const ClassSubtitle = styled.p`
  font-size: 13px;
  color: #a0a0b0;
  margin: 0 0 8px 0;
`;

const ClassMeta = styled.div`
  display: flex;
  gap: 12px;
  font-size: 12px;
  color: #666677;
  padding-top: 8px;
  border-top: 1px solid #1f1f2e;
`;

const PlayerContainer = styled.div`
  min-height: 100vh;
  background: #0a0a0f;
  width: 100.5vw;
  margin: -10px -10px -10px -10px;
  font-family: ${(props) => props.theme.fonts.family.poppins};
`;

const PlayerHeader = styled.div`
  padding: 16px 20px;
  background: #12121a;
  display: flex;
  align-items: center;
  gap: 12px;
  border-bottom: 1px solid #1f1f2e;
`;

const BackBtn = styled.button`
  background: none;
  border: none;
  color: #ffffff;
  font-size: 24px;
  cursor: pointer;
`;

const PlayerTeacherInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 10px;

  &:hover {
    background: #1f1f2e;
  }
`;

const PlayerTeacherAvatar = styled.div`
  width: 44px;
  height: 44px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
`;

const PlayerTeacherDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const PlayerTeacherName = styled.div`
  font-size: 15px;
  font-weight: 600;
  color: #ffffff;
  display: flex;
  align-items: center;
  gap: 6px;
`;

const OnlineDot = styled.div`
  width: 8px;
  height: 8px;
  background: #00ff88;
  border-radius: 50%;
`;

const PlayerViewers = styled.div`
  font-size: 12px;
  color: #a0a0b0;
`;

const LikeButton = styled.button<{ $liked?: boolean }>`
  background: #1f1f2e;
  border: none;
  width: 44px;
  height: 44px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 20px;
  transition: all 0.2s;

  &:hover {
    transform: scale(1.1);
  }
`;

const VideoSection = styled.div`
  padding: 20px;
`;

const VideoPlayer = styled.div`
  position: relative;
  background: #000;
  border-radius: 16px;
  overflow: hidden;
  aspect-ratio: 16/9;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FullscreenVideo = styled(VideoPlayer)`
  position: fixed;
  inset: 0;
  z-index: 1000;
  border-radius: 0;
  aspect-ratio: unset;
`;

const VideoOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 80px;
`;

const RecordingBadge = styled.div<{ $isLive?: boolean }>`
  position: absolute;
  top: 16px;
  left: 16px;
  background: ${(props) => (props.$isLive ? "#ff3366" : "#666677")};
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
  z-index: 10;

  &::before {
    content: "";
    width: 8px;
    height: 8px;
    background: white;
    border-radius: 50%;
    animation: ${(props) =>
      props.$isLive ? "pulse 1.5s ease-in-out infinite" : "none"};
  }

  @keyframes pulse {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.3;
    }
  }
`;

const PlayOverlay = styled.button`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 5;
`;

const PlayBtn = styled.div`
  width: 80px;
  height: 80px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  color: #667eea;
`;

const VideoControls = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.9), transparent);
  padding: 20px;
  z-index: 10;
`;

const ProgressBar = styled.div`
  height: 4px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 2px;
  margin-bottom: 12px;
  cursor: pointer;
`;

const Progress = styled.div`
  height: 100%;
  background: #667eea;
  border-radius: 2px;
`;

const ControlsRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ControlsGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const ControlBtn = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 20px;
  cursor: pointer;
`;

const TimeDisplay = styled.span`
  font-size: 13px;
  color: white;
`;

const InfoCard = styled.div`
  background: #12121a;
  border: 1px solid #1f1f2e;
  border-radius: 16px;
  padding: 20px;
  margin: 20px;
`;

const InfoTitle = styled.h2`
  font-size: 18px;
  font-weight: 700;
  margin: 0 0 16px 0;
  color: #ffffff;
`;

const InfoStats = styled.div`
  display: flex;
  gap: 24px;
  font-size: 14px;
  color: #a0a0b0;
`;

const CommentsSection = styled.div`
  background: #12121a;
  border: 1px solid #1f1f2e;
  border-radius: 16px;
  padding: 20px;
  margin: 0 20px 100px;
`;

const CommentsHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 20px;
  font-size: 16px;
  font-weight: 600;
  color: white;
`;

const CommentsList = styled.div`
  max-height: 400px;
  overflow-y: auto;
  margin-bottom: 16px;
`;

const CommentItem = styled.div`
  display: flex;
  gap: 12px;
  padding: 12px;
  margin-bottom: 12px;
  background: #0a0a0f;
  border-radius: 12px;
`;

const CommentAvatar = styled.div`
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  flex-shrink: 0;
  position: relative;
`;

const CommentOnlineDot = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 12px;
  height: 12px;
  background: #00ff88;
  border-radius: 50%;
  border: 2px solid #0a0a0f;
`;

const CommentContent = styled.div`
  flex: 1;
`;

const CommentHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
`;

const CommentUser = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: #ffffff;
`;

const CommentTime = styled.span`
  font-size: 12px;
  color: #666677;
`;

const CommentText = styled.p`
  font-size: 14px;
  color: #a0a0b0;
  margin: 0 0 8px 0;
`;

const CommentActions = styled.div`
  display: flex;
  gap: 16px;
`;

const CommentActionBtn = styled.button<{ $liked?: boolean }>`
  background: none;
  border: none;
  color: ${(props) => (props.$liked ? "#667eea" : "#666677")};
  font-size: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;

  &:hover {
    color: #667eea;
  }
`;

const ReplySection = styled.div`
  margin-top: 12px;
  padding-left: 20px;
  border-left: 2px solid #1f1f2e;
`;

const ReplyInputBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 12px;
`;

const ReplyInput = styled.input`
  flex: 1;
  background: #0a0a0f;
  border: 1px solid #1f1f2e;
  border-radius: 20px;
  padding: 8px 16px;
  color: white;
  font-size: 16px;

  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const ReplyButton = styled.button`
  background: #667eea;
  border: none;
  border-radius: 20px;
  padding: 8px 16px;
  color: white;
  font-size: 15px;
  cursor: pointer;
`;

const CommentInputBox = styled.div`
  display: flex;
  gap: 12px;
`;

const CommentInput = styled.input`
  flex: 1;
  background: #0a0a0f;
  border: 1px solid #1f1f2e;
  border-radius: 25px;
  padding: 12px 20px;
  color: white;
  font-size: 16px;

  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const SendBtn = styled.button`
  width: 48px;
  height: 48px;
  background: #667eea;
  border: none;
  border-radius: 50%;
  color: white;
  font-size: 20px;
  cursor: pointer;
`;

const BottomNav = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #12121a;
  border-top: 1px solid #1f1f2e;
  padding: 12px 0;
  display: flex;
  justify-content: space-around;
  z-index: 100;
`;

const NavBtn = styled.button<{ $active?: boolean }>`
  background: none;
  border: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  color: ${(props) => (props.$active ? "#667eea" : "#666677")};
  font-size: 11px;
`;

const ChatModal = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.85);
  z-index: 200;
  display: flex;
  align-items: flex-end;
`;

const ChatContainer = styled.div`
  width: 100%;
  max-height: 80vh;
  background: #12121a;
  border-radius: 20px 20px 0 0;
  padding: 24px;
  display: flex;
  flex-direction: column;
`;

const ChatHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid #1f1f2e;
`;

const ChatTitle = styled.h2`
  font-size: 18px;
  font-weight: 700;
  margin: 0;
`;

const CloseBtn = styled.button`
  background: #1f1f2e;
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  color: white;
  font-size: 20px;
  cursor: pointer;
`;

const ChatMessages = styled.div`
  flex: 1;
  overflow-y: auto;
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ChatMessageItem = styled.div<{ $isOwn: boolean }>`
  display: flex;
  gap: 12px;
  align-items: flex-start;
  justify-content: ${(props) => (props.$isOwn ? "flex-end" : "flex-start")};
`;

const ChatBubble = styled.div<{ $isOwn: boolean }>`
  background: ${(props) => (props.$isOwn ? "#667eea" : "#1f1f2e")};
  padding: 12px 16px;
  border-radius: 16px;
  max-width: 70%;
`;

const ChatMessageText = styled.p`
  font-size: 14px;
  margin: 0;
`;

const ChatMessageTime = styled.span`
  font-size: 11px;
  color: rgba(255, 255, 255, 0.6);
  margin-top: 4px;
  display: block;
`;

// ============ COMPONENTE PRINCIPAL ============
export default function AulasOnlineApp() {
  const { user } = useAuth();
  const [view, setView] = useState("explore");
  const [selectedClass, setSelectedClass] = useState<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [progress, setProgress] = useState(28);
  const [classLiked, setClassLiked] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState<any>(null);
  
  // Inicializar comentários com nome do usuário real
  const initialComments = [
    {
      id: 1,
      user: "Natalinel Diogo",
      avatar: "👨‍🎓",
      text: "Amei a aula, Prof. Já não tiro negativas!",
      time: "2min",
      online: true,
      likes: 15,
      liked: false,
      replies: [],
    },
    {
      id: 2,
      user: user ? getFirstAndLastName(user.name) : "Estudante",
      avatar: "👩‍🎓",
      text: "Explicação muito clara! Obrigada!",
      time: "5min",
      online: true,
      likes: 8,
      liked: false,
      replies: [],
    },
    {
      id: 3,
      user: "Carlos Santos",
      avatar: "👨",
      text: "Quando será a próxima aula?",
      time: "10min",
      online: false,
      likes: 3,
      liked: false,
      replies: [],
    },
  ];
  
  const [comments, setComments] = useState<any[]>(initialComments);
  const [newComment, setNewComment] = useState("");
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [replyText, setReplyText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [selectedTeacherFilter, setSelectedTeacherFilter] = useState("all");
  const [chatMessages, setChatMessages] = useState<any[]>([
    {
      id: 1,
      user: "Professor",
      avatar: "👨‍🏫",
      text: "Olá! Como posso ajudar?",
      isOwn: false,
      time: "14:30",
    },
  ]);
  const [newChatMessage, setNewChatMessage] = useState("");

  useEffect(() => {
    if (isPlaying && !selectedClass?.isLive) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 100;
          }
          return prev + 0.3;
        });
      }, 500);
      return () => clearInterval(interval);
    }
  }, [isPlaying, selectedClass]);

  const handlePlayPause = () => setIsPlaying(!isPlaying);
  const handleMute = () => setIsMuted(!isMuted);
  const handleFullscreen = () => setIsFullscreen(!isFullscreen);

  const handleLikeComment = (id: number) => {
    setComments(
      comments.map((comment) =>
        comment.id === id
          ? {
              ...comment,
              liked: !comment.liked,
              likes: comment.liked ? comment.likes - 1 : comment.likes + 1,
            }
          : comment
      )
    );
  };

  const handleSendComment = () => {
    if (newComment.trim()) {
      setComments([
        ...comments,
        {
          id: comments.length + 1,
          user: "Você",
          avatar: "👤",
          text: newComment,
          time: "Agora",
          online: true,
          likes: 0,
          liked: false,
          replies: [],
        },
      ]);
      setNewComment("");
    }
  };

  const handleReply = (commentId: number) => {
    if (replyText.trim()) {
      setComments(
        comments.map((comment) => {
          if (comment.id === commentId) {
            const newReply = {
              id: Date.now(),
              user: "Você",
              avatar: "👤",
              text: replyText,
              time: "Agora",
              online: true,
              likes: 0,
              liked: false,
            };
            return {
              ...comment,
              replies: [...(comment.replies || []), newReply],
            };
          }
          return comment;
        })
      );
      setReplyText("");
      setReplyingTo(null);
    }
  };

  const handleSendChatMessage = () => {
    if (newChatMessage.trim()) {
      const now = new Date();
      const time = `${now.getHours()}:${now
        .getMinutes()
        .toString()
        .padStart(2, "0")}`;

      setChatMessages([
        ...chatMessages,
        {
          id: chatMessages.length + 1,
          user: "Você",
          avatar: "👤",
          text: newChatMessage,
          isOwn: true,
          time,
        },
      ]);
      setNewChatMessage("");

      setTimeout(() => {
        setChatMessages((prev) => [
          ...prev,
          {
            id: prev.length + 1,
            user: selectedTeacher?.name || "Professor",
            avatar: selectedTeacher?.avatar || "👨‍🏫",
            text: "Obrigado pela mensagem! Vou responder em breve.",
            isOwn: false,
            time: `${now.getHours()}:${(now.getMinutes() + 1)
              .toString()
              .padStart(2, "0")}`,
          },
        ]);
      }, 2000);
    }
  };

  const openClass = (classData: any) => {
    setSelectedClass(classData);
    setView("player");
    if (classData.isLive) {
      setIsPlaying(true);
      setProgress(100);
    } else {
      setProgress(28);
    }
  };

  const openChat = (teacher: any) => {
    setSelectedTeacher(teacher);
    setShowChat(true);
  };

  const getCurrentTime = () => {
    if (selectedClass?.isLive) return "AO VIVO";
    const totalSeconds = Math.floor((progress / 100) * 3572);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const subjects = ["all", "Matemática", "Programação", "Física"];
  const teachers = ["all", ...mockTeachers.map((t) => t.name)];

  const getFilteredClasses = () => {
    let filtered = mockClasses;

    if (searchQuery) {
      filtered = filtered.filter(
        (c) =>
          c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.teacher.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedSubject !== "all") {
      filtered = filtered.filter((c) => c.title.includes(selectedSubject));
    }

    if (selectedTeacherFilter !== "all") {
      filtered = filtered.filter(
        (c) => c.teacher.name === selectedTeacherFilter
      );
    }

    return filtered;
  };

  const recentClasses = mockClasses.slice(0, 3);

  // ============ TELA DE EXPLORAÇÃO ============
  if (view === "explore") {
    return (
      <GlobalWrapper>
        <AppContainer>
          <Header>
            <HeaderTitle>Aulas Online</HeaderTitle>
          </Header>

          <Content>
            <HeroCard>
              <HeroTitle>
                Aprenda em
                <br />
                qualquer lugar!
              </HeroTitle>
              <HeroText>Multischool Angola</HeroText>
              <HeroText>+350 aulas gravadas disponíveis</HeroText>
            </HeroCard>

            {/* Lives do Momento */}
            <Section>
              <SectionHeader>
                <SectionTitle>Lives do Momento</SectionTitle>
                <LiveBadge>AO VIVO</LiveBadge>
              </SectionHeader>
              <LiveClassesList>
                {mockLiveClasses.map((live) => (
                  <LiveClassCard key={live.id} onClick={() => openClass(live)}>
                    <LiveClassInfo>
                      <LiveClassTitle>{live.title}</LiveClassTitle>
                      <LiveClassMeta>
                        {live.teacher.name} • {live.uploadTime}
                      </LiveClassMeta>
                    </LiveClassInfo>
                    <LiveViewers>👥 {live.views}</LiveViewers>
                  </LiveClassCard>
                ))}
              </LiveClassesList>
            </Section>

            {/* Professores Online */}
            <Section>
              <SectionTitle>Professores Online</SectionTitle>
              <br></br>
              <TeachersScroll>
                {mockTeachers.map((teacher) => (
                  <TeacherCard
                    key={teacher.id}
                    onClick={() => openChat(teacher)}
                  >
                    <TeacherAvatar $online={teacher.online}>
                      {teacher.avatar}
                    </TeacherAvatar>
                    <TeacherName>{teacher.name.split(" ")[0]}</TeacherName>
                  </TeacherCard>
                ))}
              </TeachersScroll>
            </Section>

            {/* Aulas Recentes */}
            <Section>
              <SectionTitle>Aulas Recentes</SectionTitle>
              <ClassesList>
                {recentClasses.map((classItem) => (
                  <ClassCard
                    key={classItem.id}
                    onClick={() => openClass(classItem)}
                  >
                    <ClassThumbnail>{classItem.thumbnail}</ClassThumbnail>
                    <ClassInfo>
                      <ClassTitle>{classItem.title}</ClassTitle>
                      <ClassSubtitle>{classItem.subtitle}</ClassSubtitle>
                      <ClassSubtitle>
                        {classItem.teacher.name} • {classItem.year}
                      </ClassSubtitle>
                      <ClassMeta>
                        <span
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "4px",
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 472 384"
                          >
                            <path
                              fill="#f0f0f0"
                              d="M235 32q79 0 142.5 44.5T469 192q-28 71-91.5 115.5T235 352T92 307.5T0 192q28-71 92-115.5T235 32zm0 267q44 0 75-31.5t31-75.5t-31-75.5T235 85t-75.5 31.5T128 192t31.5 75.5T235 299zm-.5-171q26.5 0 45.5 18.5t19 45.5t-19 45.5t-45.5 18.5t-45-18.5T171 192t18.5-45.5t45-18.5z"
                            />
                          </svg>{" "}
                          {classItem.views}
                        </span>
                        <span
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "4px",
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 48 48"
                          >
                            <path
                              fill="#F44336"
                              d="M34 9c-4.2 0-7.9 2.1-10 5.4C21.9 11.1 18.2 9 14 9C7.4 9 2 14.4 2 21c0 11.9 22 24 22 24s22-12 22-24c0-6.6-5.4-12-12-12z"
                            />
                          </svg>{" "}
                          {classItem.likes}
                        </span>
                        <span
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "4px",
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="#f0f0f0"
                              d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10s10-4.5 10-10S17.5 2 12 2zm3.5 12c-.3.5-.9.6-1.4.4l-2.6-1.5c-.3-.2-.5-.5-.5-.9V7c0-.6.4-1 1-1s1 .4 1 1v4.4l2.1 1.2c.5.3.6.9.4 1.4z"
                            />
                          </svg>
                          {classItem.duration}
                        </span>
                      </ClassMeta>
                    </ClassInfo>
                  </ClassCard>
                ))}
              </ClassesList>
              <ViewAllButton onClick={() => setView("allClasses")}>
                Ver todas as aulas
              </ViewAllButton>
            </Section>
          </Content>

          <BottomNav>
            <NavBtn $active>
              <div style={{ fontSize: "24px" }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="#d9d9d9"
                    d="M11.336 2.253a1 1 0 0 1 1.328 0l9 8a1 1 0 0 1-1.328 1.494L20 11.45V19a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-7.55l-.336.297a1 1 0 0 1-1.328-1.494l9-8zM6 9.67V19h3v-5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v5h3V9.671l-6-5.333l-6 5.333zM13 19v-4h-2v4h2z"
                  />
                </svg>
              </div>
              <span>Início</span>
            </NavBtn>
            <NavBtn>
              <div style={{ fontSize: "24px" }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 432 384"
                >
                  <path
                    fill="#d9d9d9"
                    d="M384 21q18 0 30.5 12.5T427 64v256q0 18-12.5 30.5T384 363H43q-18 0-30.5-12.5T0 320V64q0-18 12.5-30.5T43 21h341zm0 299V192H43v128h341zm0-213V64H43v43h341z"
                  />
                </svg>
              </div>
              <span>Cartões</span>
            </NavBtn>
            <NavBtn>
              <div style={{ fontSize: "24px" }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill="#d9d9d9"
                    d="M8.5 1.5a.5.5 0 0 0-1 0V2h-2A1.5 1.5 0 0 0 4 3.5v3A1.5 1.5 0 0 0 5.5 8h5A1.5 1.5 0 0 0 12 6.5v-3A1.5 1.5 0 0 0 10.5 2h-2zM5 3.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-.5.5h-5a.5.5 0 0 1-.5-.5zM4 11a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v.35c0 .947-.406 1.576-1.077 1.994c-.701.437-1.72.656-2.923.656c-1.195 0-2.214-.218-2.918-.656C4.408 12.925 4 12.295 4 11.35zm.5-1.5A1.5 1.5 0 0 0 3 11v.35c0 1.305.6 2.25 1.554 2.843C5.479 14.768 6.71 15 8 15c1.297 0 2.528-.231 3.452-.807C12.406 13.6 13 12.653 13 11.35V11a1.5 1.5 0 0 0-1.5-1.5zM7.25 5a.75.75 0 1 1-1.5 0a.75.75 0 0 1 1.5 0m2.25.75a.75.75 0 1 0 0-1.5a.75.75 0 0 0 0 1.5"
                  />
                </svg>
              </div>
              <span>MultiBot</span>
            </NavBtn>
            <NavBtn>
              <div style={{ fontSize: "24px" }}>
                <svg
                  width="20"
                  height="20"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                >
                  <path
                    fill="#d9d9d9"
                    d="M144 128a80 80 0 1 1 160 0a80 80 0 1 1-160 0m208 0a128 128 0 1 0-256 0a128 128 0 1 0 256 0M48 480c0-70.7 57.3-128 128-128h96c70.7 0 128 57.3 128 128v8c0 13.3 10.7 24 24 24s24-10.7 24-24v-8c0-97.2-78.8-176-176-176h-96C78.8 304 0 382.8 0 480v8c0 13.3 10.7 24 24 24s24-10.7 24-24z"
                  />
                </svg>
              </div>
              <span>Perfil</span>
            </NavBtn>
          </BottomNav>

          {showChat && (
            <ChatModal onClick={() => setShowChat(false)}>
              <ChatContainer onClick={(e) => e.stopPropagation()}>
                <ChatHeader>
                  <ChatTitle>Chat com {selectedTeacher?.name}</ChatTitle>
                  <CloseBtn onClick={() => setShowChat(false)}>✕</CloseBtn>
                </ChatHeader>

                <ChatMessages>
                  {chatMessages.map((msg) => (
                    <ChatMessageItem key={msg.id} $isOwn={msg.isOwn}>
                      {!msg.isOwn && (
                        <CommentAvatar
                          style={{
                            width: "36px",
                            height: "36px",
                            fontSize: "18px",
                          }}
                        >
                          {msg.avatar}
                        </CommentAvatar>
                      )}
                      <ChatBubble $isOwn={msg.isOwn}>
                        <ChatMessageText>{msg.text}</ChatMessageText>
                        <ChatMessageTime>{msg.time}</ChatMessageTime>
                      </ChatBubble>
                      {msg.isOwn && (
                        <CommentAvatar
                          style={{
                            width: "36px",
                            height: "36px",
                            fontSize: "18px",
                          }}
                        >
                          {msg.avatar}
                        </CommentAvatar>
                      )}
                    </ChatMessageItem>
                  ))}
                </ChatMessages>

                <CommentInputBox>
                  <CommentInput
                    type="text"
                    value={newChatMessage}
                    onChange={(e) => setNewChatMessage(e.target.value)}
                    onKeyPress={(e) =>
                      e.key === "Enter" && handleSendChatMessage()
                    }
                    placeholder="Qual é a sua dúvida?"
                  />
                  <SendBtn onClick={handleSendChatMessage}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="none"
                        stroke="#ffffff"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M10 14L21 3m0 0l-6.5 18a.55.55 0 0 1-1 0L10 14l-7-3.5a.55.55 0 0 1 0-1L21 3"
                      />
                    </svg>
                  </SendBtn>
                </CommentInputBox>
              </ChatContainer>
            </ChatModal>
          )}
        </AppContainer>
      </GlobalWrapper>
    );
  }

  // ============ TELA DE TODAS AS AULAS ============
  if (view === "allClasses") {
    const filteredClasses = getFilteredClasses();

    return (
      <GlobalWrapper>
        <AppContainer>
          <Header>
            <BackBtn
              onClick={() => setView("explore")}
              style={{ fontSize: "20px", padding: "8px" }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 1024 1024"
              >
                <path
                  fill="#ffffff"
                  d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"
                />
                <path
                  fill="#ffffff"
                  d="m237.248 512l265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"
                />
              </svg>
            </BackBtn>
            <HeaderTitle>Todas as Aulas</HeaderTitle>
          </Header>

          <AllClassesContainer>
            {/* Barra de Pesquisa */}
            <SearchBar>
              <SearchIcon>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 1000 1000"
                >
                  <path
                    fill="#f0f0f0"
                    d="m746 641l254 255l-105 105l-254-254q-106 72-232 72q-169 0-289-120T0 410t120-289T409 1t289 120t120 289q0 127-72 231zm-65-231q0-113-79.5-193T409 137t-193 80t-80 193t80 192.5T409 682t192.5-79.5T681 410z"
                  />
                </svg>
              </SearchIcon>
              <SearchInput
                type="text"
                placeholder="Pesquisar aulas..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </SearchBar>

            {/* Filtros */}
            <FiltersRow>
              <FilterButton
                $active={selectedSubject === "all"}
                onClick={() => setSelectedSubject("all")}
              >
                Todas
              </FilterButton>
              {subjects
                .filter((s) => s !== "all")
                .map((subject) => (
                  <FilterButton
                    key={subject}
                    $active={selectedSubject === subject}
                    onClick={() => setSelectedSubject(subject)}
                  >
                    {subject}
                  </FilterButton>
                ))}

              <FilterSelect
                value={selectedTeacherFilter}
                onChange={(e) => setSelectedTeacherFilter(e.target.value)}
              >
                <option value="all">Todos os professores</option>
                {teachers
                  .filter((t) => t !== "all")
                  .map((teacher) => (
                    <option key={teacher} value={teacher}>
                      {teacher}
                    </option>
                  ))}
              </FilterSelect>
            </FiltersRow>

            {/* Contador de Resultados */}
            <ResultsCount>
              {filteredClasses.length}{" "}
              {filteredClasses.length === 1
                ? "aula encontrada"
                : "aulas encontradas"}
            </ResultsCount>

            {/* Lista de Aulas */}
            {filteredClasses.length === 0 ? (
              <p
                style={{
                  color: "#666677",
                  textAlign: "center",
                  padding: "60px 20px",
                }}
              >
                Nenhuma aula encontrada com os filtros selecionados
              </p>
            ) : (
              <ClassesList>
                {filteredClasses.map((classItem) => (
                  <ClassCard
                    key={classItem.id}
                    onClick={() => openClass(classItem)}
                  >
                    <ClassThumbnail>{classItem.thumbnail}</ClassThumbnail>
                    <ClassInfo>
                      <ClassTitle>{classItem.title}</ClassTitle>
                      <ClassSubtitle>{classItem.subtitle}</ClassSubtitle>
                      <ClassSubtitle>
                        {classItem.teacher.name} • {classItem.year}
                      </ClassSubtitle>
                      <ClassMeta>
                        <span>👁️ {classItem.views}</span>
                        <span>❤️ {classItem.likes}</span>
                        <span>⏱️ {classItem.duration}</span>
                      </ClassMeta>
                    </ClassInfo>
                  </ClassCard>
                ))}
              </ClassesList>
            )}
          </AllClassesContainer>

          <BottomNav>
            <NavBtn $active>
              <div style={{ fontSize: "24px" }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="#d9d9d9"
                    d="M11.336 2.253a1 1 0 0 1 1.328 0l9 8a1 1 0 0 1-1.328 1.494L20 11.45V19a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-7.55l-.336.297a1 1 0 0 1-1.328-1.494l9-8zM6 9.67V19h3v-5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v5h3V9.671l-6-5.333l-6 5.333zM13 19v-4h-2v4h2z"
                  />
                </svg>
              </div>
              <span>Início</span>
            </NavBtn>
            <NavBtn>
              <div style={{ fontSize: "24px" }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 432 384"
                >
                  <path
                    fill="#d9d9d9"
                    d="M384 21q18 0 30.5 12.5T427 64v256q0 18-12.5 30.5T384 363H43q-18 0-30.5-12.5T0 320V64q0-18 12.5-30.5T43 21h341zm0 299V192H43v128h341zm0-213V64H43v43h341z"
                  />
                </svg>
              </div>
              <span>Cartões</span>
            </NavBtn>
            <NavBtn>
              <div style={{ fontSize: "24px" }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill="#d9d9d9"
                    d="M8.5 1.5a.5.5 0 0 0-1 0V2h-2A1.5 1.5 0 0 0 4 3.5v3A1.5 1.5 0 0 0 5.5 8h5A1.5 1.5 0 0 0 12 6.5v-3A1.5 1.5 0 0 0 10.5 2h-2zM5 3.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-.5.5h-5a.5.5 0 0 1-.5-.5zM4 11a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v.35c0 .947-.406 1.576-1.077 1.994c-.701.437-1.72.656-2.923.656c-1.195 0-2.214-.218-2.918-.656C4.408 12.925 4 12.295 4 11.35zm.5-1.5A1.5 1.5 0 0 0 3 11v.35c0 1.305.6 2.25 1.554 2.843C5.479 14.768 6.71 15 8 15c1.297 0 2.528-.231 3.452-.807C12.406 13.6 13 12.653 13 11.35V11a1.5 1.5 0 0 0-1.5-1.5zM7.25 5a.75.75 0 1 1-1.5 0a.75.75 0 0 1 1.5 0m2.25.75a.75.75 0 1 0 0-1.5a.75.75 0 0 0 0 1.5"
                  />
                </svg>
              </div>
              <span>MultiBot</span>
            </NavBtn>
            <NavBtn>
              <div style={{ fontSize: "24px" }}>
                <svg
                  width="20"
                  height="20"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                >
                  <path
                    fill="#d9d9d9"
                    d="M144 128a80 80 0 1 1 160 0a80 80 0 1 1-160 0m208 0a128 128 0 1 0-256 0a128 128 0 1 0 256 0M48 480c0-70.7 57.3-128 128-128h96c70.7 0 128 57.3 128 128v8c0 13.3 10.7 24 24 24s24-10.7 24-24v-8c0-97.2-78.8-176-176-176h-96C78.8 304 0 382.8 0 480v8c0 13.3 10.7 24 24 24s24-10.7 24-24z"
                  />
                </svg>
              </div>
              <span>Perfil</span>
            </NavBtn>
          </BottomNav>
        </AppContainer>
      </GlobalWrapper>
    );
  }

  // ============ TELA DE PLAYER ============
  const VideoContent = () => (
    <>
      <RecordingBadge $isLive={selectedClass?.isLive}>
        {selectedClass?.isLive ? "AO VIVO" : "GRAVADO"}
      </RecordingBadge>
      <VideoOverlay>{selectedClass?.isLive ? "🔴" : "🎓"}</VideoOverlay>

      {!isPlaying && !selectedClass?.isLive && (
        <PlayOverlay onClick={handlePlayPause}>
          <PlayBtn>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 24 24"
            >
              <path
                fill="#876aa4"
                d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm-2 14.5v-9l6 4.5z"
              />
            </svg>
          </PlayBtn>
        </PlayOverlay>
      )}

      <VideoControls>
        <ProgressBar
          onClick={(e) => {
            if (!selectedClass?.isLive) {
              const rect = e.currentTarget.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const newProgress = (x / rect.width) * 100;
              setProgress(newProgress);
            }
          }}
        >
          <Progress
            style={{ width: selectedClass?.isLive ? "100%" : `${progress}%` }}
          />
        </ProgressBar>

        <ControlsRow>
          <ControlsGroup>
            {!selectedClass?.isLive && (
              <>
                <ControlBtn onClick={handlePlayPause}>
                  {isPlaying ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 26 26"
                    >
                      <path
                        fill="#f0f0f0"
                        d="M7 5c-.551 0-1 .449-1 1v14c0 .551.449 1 1 1h3c.551 0 1-.449 1-1V6c0-.551-.449-1-1-1H7zm9 0c-.551 0-1 .449-1 1v14c0 .551.449 1 1 1h3c.551 0 1-.449 1-1V6c0-.551-.449-1-1-1h-3z"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 26 26"
                    >
                      <path
                        fill="#f0f0f0"
                        d="M20.208 11.857L6.902 5.26a1.312 1.312 0 0 0-1.268.052a1.272 1.272 0 0 0-.619 1.09V19.6c0 .443.233.856.619 1.089a1.316 1.316 0 0 0 1.269.052l13.306-6.599c.438-.218.716-.658.716-1.143s-.279-.924-.717-1.142z"
                      />
                    </svg>
                  )}
                </ControlBtn>
                <TimeDisplay>
                  {getCurrentTime()} / {selectedClass?.duration}
                </TimeDisplay>
              </>
            )}
            {selectedClass?.isLive && (
              <TimeDisplay style={{ color: "#ff3366", fontWeight: "bold" }}>
                🔴 AO VIVO
              </TimeDisplay>
            )}
          </ControlsGroup>

          <ControlsGroup>
            <ControlBtn onClick={handleMute}>
              {isMuted ? (
                <svg
                  width="20"
                  height="20"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M8 2.81v10.38c0 .67-.81 1-1.28.53L3 10H1c-.55 0-1-.45-1-1V7c0-.55.45-1 1-1h2l3.72-3.72C7.19 1.81 8 2.14 8 2.81zm7.53 3.22l-1.06-1.06l-1.97 1.97l-1.97-1.97l-1.06 1.06L11.44 8L9.47 9.97l1.06 1.06l1.97-1.97l1.97 1.97l1.06-1.06L13.56 8l1.97-1.97z"
                    fill="#f0f0f0"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="#f0f0f0"
                    d="M426.7 256c0-71-43.4-131.8-105-157.5l-16.4 39.4C351.5 157.2 384 202.8 384 256c0 53.3-32.5 98.8-78.8 118.1l16.4 39.4C383.3 387.8 426.7 327 426.7 256zm-85.4 0c0-35.5-21.7-65.9-52.5-78.7l-16.4 39.4c15.4 6.4 26.2 21.6 26.2 39.4c0 17.7-10.8 32.9-26.2 39.4l16.4 39.4c30.8-13 52.5-43.4 52.5-78.9zm13.2-236.3L338 59.1C415.1 91.2 469.3 167.2 469.3 256c0 88.7-54.2 164.8-131.3 196.9l16.4 39.4C447 453.7 512 362.5 512 256S447 58.3 354.5 19.7zM0 149.3v213.3h85.3L234.7 512V0L85.3 149.3H0z"
                  />
                </svg>
              )}
            </ControlBtn>
            <ControlBtn>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 416 432"
              >
                <path
                  fill="#f0f0f0"
                  d="m366 237l45 35q7 6 3 14l-43 74q-4 8-13 4l-53-21q-18 13-36 21l-8 56q-1 9-11 9h-85q-9 0-11-9l-8-56q-19-8-36-21l-53 21q-9 3-13-4L1 286q-4-8 3-14l45-35q-1-12-1-21t1-21L4 160q-7-6-3-14l43-74q5-8 13-4l53 21q18-13 36-21l8-56q2-9 11-9h85q10 0 11 9l8 56q19 8 36 21l53-21q9-3 13 4l43 74q4 8-3 14l-45 35q2 12 2 21t-2 21zm-158.5 54q30.5 0 52.5-22t22-53t-22-53t-52.5-22t-52.5 22t-22 53t22 53t52.5 22z"
                />
              </svg>
            </ControlBtn>
            <ControlBtn onClick={handleFullscreen}>
              {isFullscreen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="#f0f0f0"
                    d="M20 20v1h1v-1zm-4.293-5.707a1 1 0 0 0-1.414 1.414zM19 14v6h2v-6zm1 5h-6v2h6zm.707.293l-5-5l-1.414 1.414l5 5zM4 20H3v1h1zm5.707-4.293a1 1 0 0 0-1.414-1.414zM3 14v6h2v-6zm1 7h6v-2H4zm.707-.293l5-5l-1.414-1.414l-5 5zM20 4h1V3h-1zm-5.707 4.293a1 1 0 0 0 1.414 1.414zM21 10V4h-2v6zm-1-7h-6v2h6zm-.707.293l-5 5l1.414 1.414l5-5zM4 4V3H3v1zm4.293 5.707a1 1 0 0 0 1.414-1.414zM5 10V4H3v6zM4 5h6V3H4zm-.707-.293l5 5l1.414-1.414l-5-5z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="#f0f0f0"
                    d="M20 20v1h1v-1zm-4.293-5.707a1 1 0 0 0-1.414 1.414zM19 14v6h2v-6zm1 5h-6v2h6zm.707.293l-5-5l-1.414 1.414l5 5zM4 20H3v1h1zm5.707-4.293a1 1 0 0 0-1.414-1.414zM3 14v6h2v-6zm1 7h6v-2H4zm.707-.293l5-5l-1.414-1.414l-5 5zM20 4h1V3h-1zm-5.707 4.293a1 1 0 0 0 1.414 1.414zM21 10V4h-2v6zm-1-7h-6v2h6zm-.707.293l-5 5l1.414 1.414l5-5zM4 4V3H3v1zm4.293 5.707a1 1 0 0 0 1.414-1.414zM5 10V4H3v6zM4 5h6V3H4zm-.707-.293l5 5l1.414-1.414l-5-5z"
                  />
                </svg>
              )}
            </ControlBtn>
          </ControlsGroup>
        </ControlsRow>
      </VideoControls>
    </>
  );

  return (
    <GlobalWrapper>
      <PlayerContainer>
        <PlayerHeader>
          <BackBtn onClick={() => setView("explore")}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 1024 1024"
            >
              <path
                fill="#ffffff"
                d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"
              />
              <path
                fill="#ffffff"
                d="m237.248 512l265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"
              />
            </svg>
          </BackBtn>

          <PlayerTeacherInfo onClick={() => openChat(selectedClass?.teacher)}>
            <PlayerTeacherAvatar>
              {selectedClass?.teacher.avatar}
            </PlayerTeacherAvatar>
            <PlayerTeacherDetails>
              <PlayerTeacherName>
                {selectedClass?.teacher.name}
                {selectedClass?.teacher.online && <OnlineDot />}
              </PlayerTeacherName>
              <PlayerViewers>{selectedClass?.views} a assistir</PlayerViewers>
            </PlayerTeacherDetails>
          </PlayerTeacherInfo>

          <LikeButton
            $liked={classLiked}
            onClick={() => setClassLiked(!classLiked)}
          >
            {classLiked ? "❤️" : "🤍"}
          </LikeButton>
        </PlayerHeader>

        <VideoSection>
          {isFullscreen ? (
            <FullscreenVideo>
              <VideoContent />
            </FullscreenVideo>
          ) : (
            <VideoPlayer>
              <VideoContent />
            </VideoPlayer>
          )}
        </VideoSection>

        {!isFullscreen && (
          <>
            <InfoCard>
              <InfoTitle>{selectedClass?.title}</InfoTitle>
              <ClassSubtitle>{selectedClass?.subtitle}</ClassSubtitle>
              <InfoStats>
                <div style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 472 384"
                  >
                    <path
                      fill="#f0f0f0"
                      d="M235 32q79 0 142.5 44.5T469 192q-28 71-91.5 115.5T235 352T92 307.5T0 192q28-71 92-115.5T235 32zm0 267q44 0 75-31.5t31-75.5t-31-75.5T235 85t-75.5 31.5T128 192t31.5 75.5T235 299zm-.5-171q26.5 0 45.5 18.5t19 45.5t-19 45.5t-45.5 18.5t-45-18.5T171 192t18.5-45.5t45-18.5z"
                    />
                  </svg>{" "}
                  {selectedClass?.views} visualizações
                </div>
                <div style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 48 48"
                  >
                    <path
                      fill="#F44336"
                      d="M34 9c-4.2 0-7.9 2.1-10 5.4C21.9 11.1 18.2 9 14 9C7.4 9 2 14.4 2 21c0 11.9 22 24 22 24s22-12 22-24c0-6.6-5.4-12-12-12z"
                    />
                  </svg>{" "}
                  {classLiked
                    ? (selectedClass?.likes || 0) + 1
                    : selectedClass?.likes}{" "}
                  gostos
                </div>
              </InfoStats>
            </InfoCard>

            <CommentsSection>
              <CommentsHeader>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 1024 1024"
                >
                  <path
                    fill="#f0f0f0"
                    d="M512 896q-66 0-134-16q-34 40-69.5 69.5t-60 43.5t-47.5 21.5t-30.5 8.5t-10.5 1q26-57 30-124.5T176 786Q94 723 47 635T0 448q0-91 40.5-174t109-143T313 35.5T512 0t199 35.5T874.5 131t109 143t40.5 174t-40.5 174t-109 143T711 860.5T512 896z"
                  />
                </svg>
                Comentários ao vivo ({comments.length})
              </CommentsHeader>

              <CommentsList>
                {comments.map((comment) => (
                  <div key={comment.id}>
                    <CommentItem>
                      <CommentAvatar>
                        {comment.avatar}
                        {comment.online && <CommentOnlineDot />}
                      </CommentAvatar>
                      <CommentContent>
                        <CommentHeader>
                          <CommentUser>{comment.user}</CommentUser>
                          <CommentTime>{comment.time}</CommentTime>
                        </CommentHeader>
                        <CommentText>{comment.text}</CommentText>
                        <CommentActions>
                          <CommentActionBtn
                            $liked={comment.liked}
                            onClick={() => handleLikeComment(comment.id)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                            >
                              <g fill="none">
                                <path
                                  fill="#f0f0f0"
                                  d="m15 10l-.986-.164A1 1 0 0 0 15 11v-1ZM4 10V9a1 1 0 0 0-1 1h1Zm16.522 2.392l.98.196l-.98-.196ZM6 21h11.36v-2H6v2ZM18.56 9H15v2h3.56V9Zm-2.573 1.164l.805-4.835L14.82 5l-.806 4.836l1.973.328ZM14.82 3h-.214v2h.214V3Zm-3.543 1.781L8.762 8.555l1.664 1.11l2.516-3.774l-1.665-1.11ZM7.93 9H4v2h3.93V9ZM3 10v8h2v-8H3Zm17.302 8.588l1.2-6l-1.96-.392l-1.2 6l1.96.392ZM8.762 8.555A1 1 0 0 1 7.93 9v2a3 3 0 0 0 2.496-1.336l-1.664-1.11Zm8.03-3.226A2 2 0 0 0 14.82 3v2l1.972.329ZM18.56 11a1 1 0 0 1 .981 1.196l1.961.392A3 3 0 0 0 18.561 9v2Zm-1.2 10a3 3 0 0 0 2.942-2.412l-1.96-.392a1 1 0 0 1-.982.804v2ZM14.606 3a4 4 0 0 0-3.329 1.781l1.665 1.11A2 2 0 0 1 14.606 5V3ZM6 19a1 1 0 0 1-1-1H3a3 3 0 0 0 3 3v-2Z"
                                />
                                <path
                                  stroke="#f0f0f0"
                                  stroke-width="2"
                                  d="M8 10v10"
                                />
                              </g>
                            </svg>
                            {comment.likes}
                          </CommentActionBtn>
                          <CommentActionBtn
                            onClick={() => setReplyingTo(comment.id)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              viewBox="0 0 32 32"
                            >
                              <path
                                fill="none"
                                stroke="#f0f0f0"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="m5.608 12.526l7.04-6.454C13.931 4.896 16 5.806 16 7.546V11c13 0 11 16 11 16s-4-10-11-10v3.453c0 1.74-2.069 2.65-3.351 1.475l-7.04-6.454a2 2 0 0 1 0-2.948Z"
                              />
                            </svg>{" "}
                            Responder
                          </CommentActionBtn>
                        </CommentActions>

                        {replyingTo === comment.id && (
                          <ReplyInputBox>
                            <ReplyInput
                              type="text"
                              value={replyText}
                              onChange={(e) => setReplyText(e.target.value)}
                              onKeyPress={(e) =>
                                e.key === "Enter" && handleReply(comment.id)
                              }
                              placeholder="Escreva sua resposta..."
                              autoFocus
                            />
                            <ReplyButton
                              onClick={() => handleReply(comment.id)}
                            >
                              Enviar
                            </ReplyButton>
                            <ReplyButton
                              onClick={() => {
                                setReplyingTo(null);
                                setReplyText("");
                              }}
                              style={{ background: "#1f1f2e" }}
                            >
                              Cancelar
                            </ReplyButton>
                          </ReplyInputBox>
                        )}

                        {comment.replies && comment.replies.length > 0 && (
                          <ReplySection>
                            {comment.replies.map((reply: any) => (
                              <CommentItem
                                key={reply.id}
                                style={{ marginBottom: "8px" }}
                              >
                                <CommentAvatar
                                  style={{
                                    width: "32px",
                                    height: "32px",
                                    fontSize: "16px",
                                  }}
                                >
                                  {reply.avatar}
                                </CommentAvatar>
                                <CommentContent>
                                  <CommentHeader>
                                    <CommentUser style={{ fontSize: "13px" }}>
                                      {reply.user}
                                    </CommentUser>
                                    <CommentTime>{reply.time}</CommentTime>
                                  </CommentHeader>
                                  <CommentText style={{ fontSize: "13px" }}>
                                    {reply.text}
                                  </CommentText>
                                </CommentContent>
                              </CommentItem>
                            ))}
                          </ReplySection>
                        )}
                      </CommentContent>
                    </CommentItem>
                  </div>
                ))}
              </CommentsList>

              <CommentInputBox>
                <CommentInput
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendComment()}
                  placeholder="Escreva o seu comentário..."
                />
                <SendBtn onClick={handleSendComment}>
                  {" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="none"
                      stroke="#ffffff"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M10 14L21 3m0 0l-6.5 18a.55.55 0 0 1-1 0L10 14l-7-3.5a.55.55 0 0 1 0-1L21 3"
                    />
                  </svg>
                </SendBtn>
              </CommentInputBox>
            </CommentsSection>
          </>
        )}

        <BottomNav>
          <NavBtn $active>
            <div style={{ fontSize: "24px" }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#d9d9d9"
                  d="M11.336 2.253a1 1 0 0 1 1.328 0l9 8a1 1 0 0 1-1.328 1.494L20 11.45V19a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-7.55l-.336.297a1 1 0 0 1-1.328-1.494l9-8zM6 9.67V19h3v-5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v5h3V9.671l-6-5.333l-6 5.333zM13 19v-4h-2v4h2z"
                />
              </svg>
            </div>
            <span>Início</span>
          </NavBtn>
          <NavBtn>
            <div style={{ fontSize: "24px" }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 432 384"
              >
                <path
                  fill="#d9d9d9"
                  d="M384 21q18 0 30.5 12.5T427 64v256q0 18-12.5 30.5T384 363H43q-18 0-30.5-12.5T0 320V64q0-18 12.5-30.5T43 21h341zm0 299V192H43v128h341zm0-213V64H43v43h341z"
                />
              </svg>
            </div>
            <span>Cartões</span>
          </NavBtn>
          <NavBtn>
            <div style={{ fontSize: "24px" }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 16 16"
              >
                <path
                  fill="#d9d9d9"
                  d="M8.5 1.5a.5.5 0 0 0-1 0V2h-2A1.5 1.5 0 0 0 4 3.5v3A1.5 1.5 0 0 0 5.5 8h5A1.5 1.5 0 0 0 12 6.5v-3A1.5 1.5 0 0 0 10.5 2h-2zM5 3.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-.5.5h-5a.5.5 0 0 1-.5-.5zM4 11a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v.35c0 .947-.406 1.576-1.077 1.994c-.701.437-1.72.656-2.923.656c-1.195 0-2.214-.218-2.918-.656C4.408 12.925 4 12.295 4 11.35zm.5-1.5A1.5 1.5 0 0 0 3 11v.35c0 1.305.6 2.25 1.554 2.843C5.479 14.768 6.71 15 8 15c1.297 0 2.528-.231 3.452-.807C12.406 13.6 13 12.653 13 11.35V11a1.5 1.5 0 0 0-1.5-1.5zM7.25 5a.75.75 0 1 1-1.5 0a.75.75 0 0 1 1.5 0m2.25.75a.75.75 0 1 0 0-1.5a.75.75 0 0 0 0 1.5"
                />
              </svg>
            </div>
            <span>MultiBot</span>
          </NavBtn>
          <NavBtn>
            <div style={{ fontSize: "24px" }}>
              <svg
                width="20"
                height="20"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
              >
                <path
                  fill="#d9d9d9"
                  d="M144 128a80 80 0 1 1 160 0a80 80 0 1 1-160 0m208 0a128 128 0 1 0-256 0a128 128 0 1 0 256 0M48 480c0-70.7 57.3-128 128-128h96c70.7 0 128 57.3 128 128v8c0 13.3 10.7 24 24 24s24-10.7 24-24v-8c0-97.2-78.8-176-176-176h-96C78.8 304 0 382.8 0 480v8c0 13.3 10.7 24 24 24s24-10.7 24-24z"
                />
              </svg>
            </div>
            <span>Perfil</span>
          </NavBtn>
        </BottomNav>

        {showChat && (
          <ChatModal onClick={() => setShowChat(false)}>
            <ChatContainer onClick={(e) => e.stopPropagation()}>
              <ChatHeader>
                <ChatTitle
                  style={{
                    color: "#FFF",
                  }}
                >
                  Chat com {selectedTeacher?.name}
                </ChatTitle>
                <CloseBtn onClick={() => setShowChat(false)}>✕</CloseBtn>
              </ChatHeader>

              <ChatMessages
                style={{
                  color: "#FFF",
                }}
              >
                {chatMessages.map((msg) => (
                  <ChatMessageItem key={msg.id} $isOwn={msg.isOwn}>
                    {!msg.isOwn && (
                      <CommentAvatar
                        style={{
                          width: "36px",
                          height: "36px",
                          fontSize: "18px",
                        }}
                      >
                        {msg.avatar}
                      </CommentAvatar>
                    )}
                    <ChatBubble $isOwn={msg.isOwn}>
                      <ChatMessageText>{msg.text}</ChatMessageText>
                      <ChatMessageTime>{msg.time}</ChatMessageTime>
                    </ChatBubble>
                    {msg.isOwn && (
                      <CommentAvatar
                        style={{
                          width: "36px",
                          height: "36px",
                          fontSize: "18px",
                        }}
                      >
                        {msg.avatar}
                      </CommentAvatar>
                    )}
                  </ChatMessageItem>
                ))}
              </ChatMessages>

              <CommentInputBox>
                <CommentInput
                  type="text"
                  value={newChatMessage}
                  onChange={(e) => setNewChatMessage(e.target.value)}
                  onKeyPress={(e) =>
                    e.key === "Enter" && handleSendChatMessage()
                  }
                  placeholder="Qual é a sua dúvida?"
                />
                <SendBtn onClick={handleSendChatMessage}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="none"
                      stroke="#ffffff"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M10 14L21 3m0 0l-6.5 18a.55.55 0 0 1-1 0L10 14l-7-3.5a.55.55 0 0 1 0-1L21 3"
                    />
                  </svg>
                </SendBtn>
              </CommentInputBox>
            </ChatContainer>
          </ChatModal>
        )}
      </PlayerContainer>
    </GlobalWrapper>
  );
}
