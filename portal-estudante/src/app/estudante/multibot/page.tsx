"use client";

import { useState, useEffect } from "react";
import styled from "styled-components";
import MultiBot from "@/assets/backgrounds/multibot.png";
import BottomMenu from "@/components/ui/BottomMenu";
import UserAvatar from "@/components/ui/Avatar";
import { useAuth } from "@/contexts/AuthContext";
import { getFirstAndLastName } from "@/utils/cutName";

interface ChatMessage {
  type: "user" | "bot";
  text: string;
  timestamp: Date;
  hasDocument?: boolean;
}

interface ChatHistoryItem {
  id: number;
  title: string;
  date: string;
}

type ScreenType = "onboarding" | "home" | "chat";

export default function MultiBotPage() {
  const { user } = useAuth();
  const [currentScreen, setCurrentScreen] = useState<ScreenType>("onboarding");
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatHistoryItem[]>([
    { id: 1, title: "Declaração de notas - 3º ano", date: "Hoje" },
    { id: 2, title: "Resumo de Álgebra Linear", date: "Ontem" },
    { id: 3, title: "Consulta de pagamentos", date: "2 dias atrás" },
  ]);

  useEffect(() => {
    const seen = localStorage.getItem("multibotOnboardingSeen");
    if (seen) {
      setHasSeenOnboarding(true);
      setCurrentScreen("home");
    }
  }, []);

  const handleStartOnboarding = () => {
    localStorage.setItem("multibotOnboardingSeen", "true");
    setHasSeenOnboarding(true);
    setCurrentScreen("home");
  };

  const handlePromptClick = (promptText: string) => {
    setCurrentScreen("chat");
    const userMessage: ChatMessage = {
      type: "user" as const,
      text: promptText,
      timestamp: new Date(),
    };
    const botMessage: ChatMessage = {
      type: "bot" as const,
      text: "A gerar a sua declaração com notas no formato PDF...",
      timestamp: new Date(),
      hasDocument: promptText.includes("declaração"),
    };
    setChatMessages([userMessage, botMessage]);
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const newMessage: ChatMessage = {
      type: "user" as const,
      text: inputValue,
      timestamp: new Date(),
    };

    setChatMessages([...chatMessages, newMessage]);

    setTimeout(() => {
      const botResponse: ChatMessage = {
        type: "bot" as const,
        text: "Entendi o seu pedido. Como posso ajudar especificamente?",
        timestamp: new Date(),
      };
      setChatMessages((prev) => [...prev, botResponse]);
    }, 1000);

    setInputValue("");
  };

  // Onboarding Screen
  if (currentScreen === "onboarding") {
    return (
      <Wrapper>
        <Header>
          <LogoContainer>
            <IconBot>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 16 16"
              >
                <path
                  fill="#ffffff"
                  d="M8.5 1.5a.5.5 0 0 0-1 0V2h-2A1.5 1.5 0 0 0 4 3.5v3A1.5 1.5 0 0 0 5.5 8h5A1.5 1.5 0 0 0 12 6.5v-3A1.5 1.5 0 0 0 10.5 2h-2zM5 3.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-.5.5h-5a.5.5 0 0 1-.5-.5zM4 11a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v.35c0 .947-.406 1.576-1.077 1.994c-.701.437-1.72.656-2.923.656c-1.195 0-2.214-.218-2.918-.656C4.408 12.925 4 12.295 4 11.35zm.5-1.5A1.5 1.5 0 0 0 3 11v.35c0 1.305.6 2.25 1.554 2.843C5.479 14.768 6.71 15 8 15c1.297 0 2.528-.231 3.452-.807C12.406 13.6 13 12.653 13 11.35V11a1.5 1.5 0 0 0-1.5-1.5zM7.25 5a.75.75 0 1 1-1.5 0a.75.75 0 0 1 1.5 0m2.25.75a.75.75 0 1 0 0-1.5a.75.75 0 0 0 0 1.5"
                />
              </svg>
            </IconBot>
            <Title>MultiBot</Title>
          </LogoContainer>
        </Header>

        <Main>
          <Heading>
            Este é o assistente virtual da Multischool.
            <br />
            Rápido, inteligente e feito para te ajudar!
          </Heading>
          <SubText>
            Vai além da conversa: descobre uma nova forma de interação académica
            e financeira. Tudo num só lugar.
          </SubText>

          <RobotWrapper />

          <StartButton onClick={handleStartOnboarding}>
            Começar
            <Arrow>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#ffffff"
                  d="m18 12l.707-.707l.707.707l-.707.707zM6 13a1 1 0 1 1 0-2zm8.707-5.707l4 4l-1.414 1.414l-4-4zm4 5.414l-4 4l-1.414-1.414l4-4zM18 13H6v-2h12z"
                />
              </svg>
            </Arrow>
          </StartButton>
        </Main>
      </Wrapper>
    );
  }

  // Home Screen
  if (currentScreen === "home") {
    return (
      <Wrapper>
        <Header>
          <LogoContainer>
            <IconBot>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 16 16"
              >
                <path
                  fill="#ffffff"
                  d="M8.5 1.5a.5.5 0 0 0-1 0V2h-2A1.5 1.5 0 0 0 4 3.5v3A1.5 1.5 0 0 0 5.5 8h5A1.5 1.5 0 0 0 12 6.5v-3A1.5 1.5 0 0 0 10.5 2h-2zM5 3.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-.5.5h-5a.5.5 0 0 1-.5-.5zM4 11a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v.35c0 .947-.406 1.576-1.077 1.994c-.701.437-1.72.656-2.923.656c-1.195 0-2.214-.218-2.918-.656C4.408 12.925 4 12.295 4 11.35zm.5-1.5A1.5 1.5 0 0 0 3 11v.35c0 1.305.6 2.25 1.554 2.843C5.479 14.768 6.71 15 8 15c1.297 0 2.528-.231 3.452-.807C12.406 13.6 13 12.653 13 11.35V11a1.5 1.5 0 0 0-1.5-1.5zM7.25 5a.75.75 0 1 1-1.5 0a.75.75 0 0 1 1.5 0m2.25.75a.75.75 0 1 0 0-1.5a.75.75 0 0 0 0 1.5"
                />
              </svg>
            </IconBot>
            <Title>MultiBot</Title>
          </LogoContainer>
          <UserAvatar size={44} />
        </Header>

        <HomeMain>
          <Greeting>👋 Olá, {user ? getFirstAndLastName(user.name) : "Estudante"}</Greeting>
          <GreetingSubtext>Como posso ajudar hoje?</GreetingSubtext>

          <Section>
            <SectionTitle>Atalhos</SectionTitle>
            <PromptsGrid>
              <PromptCard
                color="#B4A5D8"
                onClick={() =>
                  handlePromptClick("Quero uma declaração com notas do 3º ano")
                }
              >
                <PromptIcon>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zm-1 2l5 5h-5zM8 18v-2h8v2zm0-4v-2h8v2z"
                    />
                  </svg>
                </PromptIcon>
                <PromptText>
                  Quero uma declaração com notas do 3º ano
                </PromptText>
                <UsePromptButton>Usar este prompt</UsePromptButton>
              </PromptCard>

              <PromptCard
                color="#4DD4D4"
                onClick={() =>
                  handlePromptClick(
                    "Faça o resumo de toda a matéria deste semestre"
                  )
                }
              >
                <PromptIcon>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M21 5c-1.11-.35-2.33-.5-3.5-.5c-1.95 0-4.05.4-5.5 1.5c-1.45-1.1-3.55-1.5-5.5-1.5S2.45 4.9 1 6v14.65c0 .25.25.5.5.5c.1 0 .15-.05.25-.05C3.1 20.45 5.05 20 6.5 20c1.95 0 4.05.4 5.5 1.5c1.35-.85 3.8-1.5 5.5-1.5c1.65 0 3.35.3 4.75 1.05c.1.05.15.05.25.05c.25 0 .5-.25.5-.5V6c-.6-.45-1.25-.75-2-1zm0 13.5c-1.1-.35-2.3-.5-3.5-.5c-1.7 0-4.15.65-5.5 1.5V8c1.35-.85 3.8-1.5 5.5-1.5c1.2 0 2.4.15 3.5.5z"
                    />
                  </svg>
                </PromptIcon>
                <PromptText>
                  Faça o resumo de toda a matéria deste semestre
                </PromptText>
                <UsePromptButton>Usar este prompt</UsePromptButton>
              </PromptCard>
            </PromptsGrid>
          </Section>

          <Section>
            <SectionTitle>Prompts em alta</SectionTitle>
            <TagsContainer>
              <Tag
                onClick={() => handlePromptClick("Matéria de Álgebra Linear")}
              >
                <TagIcon>📐</TagIcon>
                Matéria de Álgebra Linear
              </Tag>
              <Tag onClick={() => handlePromptClick("Marketing")}>
                <TagIcon>🔥</TagIcon>
                Marketing
              </Tag>
              <Tag onClick={() => handlePromptClick("Economia")}>
                <TagIcon>😊</TagIcon>
                Economia
              </Tag>
              <Tag onClick={() => handlePromptClick("Programação")}>
                <TagIcon>💻</TagIcon>
                Programação
              </Tag>
            </TagsContainer>
          </Section>

          <Section>
            <SectionTitle>Histórico de conversas</SectionTitle>
            <HistoryList>
              {chatHistory.map((item) => (
                <HistoryItem
                  key={item.id}
                  onClick={() => setCurrentScreen("chat")}
                >
                  <HistoryIcon>💬</HistoryIcon>
                  <HistoryContent>
                    <HistoryTitle>{item.title}</HistoryTitle>
                    <HistoryDate>{item.date}</HistoryDate>
                  </HistoryContent>
                </HistoryItem>
              ))}
            </HistoryList>
          </Section>

          <NewChatButton onClick={() => setCurrentScreen("chat")}>
            Novo Chat
          </NewChatButton>
        </HomeMain>

        <BottomMenu />
      </Wrapper>
    );
  }

  // Chat Screen
  return (
    <Wrapper>
      <ChatHeader>
        <BackButton onClick={() => setCurrentScreen("home")}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M15.41 7.41L14 6l-6 6l6 6l1.41-1.41L10.83 12z"
            />
          </svg>
        </BackButton>
        <ChatTitle>MultiBot</ChatTitle>
        <LogoContainer style={{ padding: "12px 12px", borderRadius: "20px" }}>
          <IconBot>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 16 16"
            >
              <path
                fill="#f0f0f0"
                d="M8.5 1.5a.5.5 0 0 0-1 0V2h-2A1.5 1.5 0 0 0 4 3.5v3A1.5 1.5 0 0 0 5.5 8h5A1.5 1.5 0 0 0 12 6.5v-3A1.5 1.5 0 0 0 10.5 2h-2zM5 3.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-.5.5h-5a.5.5 0 0 1-.5-.5zM4 11a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v.35c0 .947-.406 1.576-1.077 1.994c-.701.437-1.72.656-2.923.656c-1.195 0-2.214-.218-2.918-.656C4.408 12.925 4 12.295 4 11.35zm.5-1.5A1.5 1.5 0 0 0 3 11v.35c0 1.305.6 2.25 1.554 2.843C5.479 14.768 6.71 15 8 15c1.297 0 2.528-.231 3.452-.807C12.406 13.6 13 12.653 13 11.35V11a1.5 1.5 0 0 0-1.5-1.5zM7.25 5a.75.75 0 1 1-1.5 0a.75.75 0 0 1 1.5 0m2.25.75a.75.75 0 1 0 0-1.5a.75.75 0 0 0 0 1.5"
              />
            </svg>
          </IconBot>
        </LogoContainer>
      </ChatHeader>

      <ChatMessages>
        {chatMessages.map((msg, idx) => (
          <div key={idx}>
            {msg.type === "user" ? (
              <UserMessage>
                <UserAvatar size={24} />
                <UserBubble>{msg.text}</UserBubble>
              </UserMessage>
            ) : (
              <BotMessage>
                <BotAvatar>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill="#ffffff"
                      d="M8.5 1.5a.5.5 0 0 0-1 0V2h-2A1.5 1.5 0 0 0 4 3.5v3A1.5 1.5 0 0 0 5.5 8h5A1.5 1.5 0 0 0 12 6.5v-3A1.5 1.5 0 0 0 10.5 2h-2z"
                    />
                  </svg>
                </BotAvatar>
                <BotContent>
                  <BotBubble>{msg.text}</BotBubble>
                  {msg.hasDocument && (
                    <DocumentCard>
                      <DownloadIcon>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="#ffffff"
                            d="M5 20h14v-2H5m14-9h-4V3H9v6H5l7 7z"
                          />
                        </svg>
                      </DownloadIcon>
                      <DocumentInfo>
                        <DocumentTitle>
                          {user ? `${user.name} - Declaração do 3º ano.pdf` : "Estudante - Declaração do 3º ano.pdf"}
                        </DocumentTitle>
                      </DocumentInfo>
                      <DownloadButton onClick={() => setShowPaymentModal(true)}>
                        Download
                      </DownloadButton>
                    </DocumentCard>
                  )}
                </BotContent>
              </BotMessage>
            )}
          </div>
        ))}
      </ChatMessages>

      <ChatInputContainer>
        <SearchIcon>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
          >
            <path
              fill="#999"
              d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5A6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5S14 7.01 14 9.5S11.99 14 9.5 14z"
            />
          </svg>
        </SearchIcon>
        <ChatInput
          placeholder="Escreva alguma coisa"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
        />
        <AttachButton>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
          >
            <path
              fill="#999"
              d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"
            />
          </svg>
        </AttachButton>
        <SendButton onClick={handleSendMessage}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
          >
            <path fill="#ffffff" d="M2.01 21L23 12L2.01 3L2 10l15 2l-15 2z" />
          </svg>
        </SendButton>
      </ChatInputContainer>

      {showPaymentModal && (
        <Modal onClick={() => setShowPaymentModal(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalIcon>💳</ModalIcon>
            <ModalTitle>Pagamento Necessário</ModalTitle>
            <ModalText>
              Para baixar este documento, é necessário efectuar o pagamento
              pendente das suas propinas.
            </ModalText>
            <ModalButton onClick={() => setShowPaymentModal(false)}>
              Efectuar pagamento
            </ModalButton>
          </ModalContent>
        </Modal>
      )}
    </Wrapper>
  );
}

// Styled Components
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 430px;
  margin: 0 auto;
  height: 100vh;
  background: #fff;
  font-family: "Poppins", -apple-system, BlinkMacSystemFont, "Segoe UI",
    sans-serif;
  overflow: hidden;
  margin-bottom: 50px;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  background: #2d1b4e;
  padding: 8px 19px;
  border-radius: 25px;
  gap: 8px;
`;

const IconBot = styled.span`
  display: flex;
  align-items: center;
`;

const Title = styled.span`
  color: #fff;
  font-size: 14px;
  font-weight: 600;
`;

const ProfilePic = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
`;

const Main = styled.main`
  flex: 1;
  padding: 0 14px;
  text-align: left;
  display: flex;
  flex-direction: column;
`;

const Heading = styled.h1`
  font-size: 24px;
  font-weight: 700;
  line-height: 1.5;
  margin-bottom: 16px;
  max-width: 89%;
`;

const SubText = styled.p`
  font-size: 14px;
  color: #555;
  margin-bottom: 20px;
  max-width: 300px;
`;

const RobotWrapper = styled.div<{ size?: string }>`
  position: relative;
  width: 100%;
  height: 320px;
  background-image: url(${MultiBot.src});
  background-repeat: no-repeat;
  background-position: center bottom;
  background-size: cover;
`;

const StartButton = styled.button`
  position: fixed;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 80%;
  max-width: 350px;
  padding: 11px 20px;
  font-size: 15px;
  font-weight: 600;
  border-radius: 50px;
  border: 2px solid ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.primary};
  background: #fff;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background: #f5f3ff;
  }
`;

const Arrow = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${(props) => props.theme.colors.primary};
`;

const HomeMain = styled.div`
  flex: 1;
  padding: 14px;
  overflow-y: auto;
  padding-bottom: 80px;
`;

const Greeting = styled.h2`
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 4px;
`;

const GreetingSubtext = styled.p`
  font-size: 14px;
  color: #666;
  margin-bottom: 24px;
`;

const Section = styled.section`
  margin-bottom: 28px;
`;

const SectionTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 12px;
`;

const PromptsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
`;

interface PromptCardProps {
  color: string;
}

const PromptCard = styled.div<PromptCardProps>`
  background: ${(props) => props.color};
  border-radius: 16px;
  padding: 16px;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-2px);
  }
`;

const PromptIcon = styled.div`
  color: #fff;
  margin-bottom: 8px;
`;

const PromptText = styled.p`
  color: #fff;
  font-size: 13px;
  font-weight: 500;
  margin-bottom: 12px;
  line-height: 1.4;
`;

const UsePromptButton = styled.button`
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 20px;
  padding: 6px 12px;
  font-size: 11px;
  font-weight: 600;
  cursor: pointer;
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const Tag = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  background: #f5f5f5;
  border: none;
  border-radius: 20px;
  padding: 8px 14px;
  font-size: 13px;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #e8e8e8;
  }
`;

const TagIcon = styled.span`
  font-size: 16px;
`;

const HistoryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const HistoryItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: #f9f9f9;
  border-radius: 12px;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #f0f0f0;
  }
`;

const HistoryIcon = styled.span`
  font-size: 20px;
`;

const HistoryContent = styled.div`
  flex: 1;
`;

const HistoryTitle = styled.div`
  font-size: 13px;
  font-weight: 500;
  margin-bottom: 2px;
`;

const HistoryDate = styled.div`
  font-size: 11px;
  color: #999;
`;

const NewChatButton = styled.button`
  width: 100%;
  padding: 14px;
  background: #fff;
  border: 2px solid ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.primary};
  border-radius: 30px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background: #f5f3ff;
  }
`;

const ChatHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px;
  background: #fff;
  border-bottom: 1px solid #e0e0e0;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  color: #333;
`;

const ChatTitle = styled.h2`
  font-size: 16px;
  font-weight: 600;
  flex: 1;
  text-align: center;
`;

const ChatMessages = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px 14px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const UserMessage = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  align-items: flex-start;
`;

const UserBubble = styled.div`
  background: #f5f5f5;
  color: #333;
  padding: 12px 16px;
  border-radius: 18px 18px 4px 18px;
  max-width: 70%;
  font-size: 14px;
  line-height: 1.4;
`;

const BotMessage = styled.div`
  display: flex;
  gap: 8px;
  align-items: flex-start;
`;

const BotAvatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #2d1b4e;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const BotContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 75%;
`;

const BotBubble = styled.div`
  background: #f5f3ff;
  color: #333;
  padding: 12px 16px;
  border-radius: 18px 18px 18px 4px;
  font-size: 14px;
  line-height: 1.4;
`;

const DocumentCard = styled.div`
  background: #0095ff;
  border-radius: 16px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const DownloadIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DocumentInfo = styled.div`
  flex: 1;
`;

const DocumentTitle = styled.div`
  color: #fff;
  font-size: 13px;
  font-weight: 500;
  line-height: 1.4;
`;

const DownloadButton = styled.button`
  background: #fff;
  color: #0095ff;
  border: none;
  border-radius: 25px;
  padding: 10px 20px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }
`;

const ChatInputContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 14px;
  background: #fff;
  border-top: 1px solid #e0e0e0;
  gap: 8px;
`;

const SearchIcon = styled.div`
  display: flex;
  align-items: center;
  padding-left: 4px;
`;

const ChatInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  font-size: 14px;
  padding: 8px;
  font-family: "Poppins", sans-serif;

  &::placeholder {
    color: #999;
  }
`;

const AttachButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 8px;
`;

const SendButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #2d1b4e;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.1);
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: #fff;
  border-radius: 20px;
  padding: 32px 24px;
  max-width: 320px;
  width: 90%;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

const ModalIcon = styled.div`
  font-size: 48px;
  margin-bottom: 8px;
`;

const ModalTitle = styled.h3`
  font-size: 20px;
  font-weight: 700;
  color: #333;
`;

const ModalText = styled.p`
  font-size: 14px;
  color: #666;
  line-height: 1.5;
`;

const ModalButton = styled.button`
  background: ${(props) => props.theme.colors.primary};
  color: #fff;
  border: none;
  border-radius: 25px;
  padding: 12px 32px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s;
  width: 100%;

  &:hover {
    background: #5a3fa0;
  }
`;
