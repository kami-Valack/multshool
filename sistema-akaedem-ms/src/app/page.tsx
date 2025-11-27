"use client";

import styled, { keyframes } from "styled-components";
import Bg from "@/assets/backgrounds/bg_login.png";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import React from "react";

// Animations
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
`;

const glow = keyframes`
  0%, 100% {
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
  }
  50% {
    box-shadow: 0 0 30px #6C5F8D;
  }
`;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.9), #6c5f8d51),
    url(${Bg.src});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  color: #fff;
  font-family: "Inter", sans-serif;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(
        circle at 20% 80%,
        rgba(0, 0, 0, 0.1) 0%,
        transparent 50%
      ),
      radial-gradient(circle at 80% 20%, rgba(0, 0, 0, 1) 0%, transparent 50%);
    pointer-events: none;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 6rem;
  padding: 2rem;
  position: relative;
  z-index: 2;
  animation: ${fadeIn} 1s ease-out;

  @media (max-width: 968px) {
    flex-direction: column;
    gap: 3rem;
    text-align: center;
  }
`;

const Textos = styled.div`
  width: 45%;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  @media (max-width: 968px) {
    width: 100%;
  }
`;

const Logo = styled.h1`
  font-size: 1.5rem;
  font-weight: 800;
  letter-spacing: -1.5px;
  background: linear-gradient(135deg, #ffffffff, #6c5f8d, #6c5f8d);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-size: 200% 200%;
  animation: gradientShift 3s ease infinite, ${float} 6s ease-in-out infinite;
  margin-bottom: 1rem;

  @keyframes gradientShift {
    0%,
    100% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
  }
`;

const Titulo = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  color: #ffffff;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  line-height: 1.2;
`;

const Subtitulo = styled.p`
  font-size: 1.2rem;
  color: #e3f2fd;
  line-height: 1.7;
  max-width: 500px;
  font-weight: 300;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
`;

const Features = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  margin-top: 1rem;
`;

const Feature = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  font-size: 0.95rem;
  color: #ffffffff;

  &::before {
    content: "✓";
    color: #6c5f8d;
    font-weight: bold;
    font-size: 1.1rem;
  }
`;

const FormContainer = styled.div`
  width: 45%;
  background: rgba(173, 173, 173, 0.15);
  backdrop-filter: blur(20px);
  border-radius: 24px;
  padding: 5rem 2.5rem;
  display: flex;
  flex-direction: column;
  gap: 3.8rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  animation: ${fadeIn} 1s ease-out 0.2s both;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.1),
      transparent
    );
    transition: left 0.5s;
  }

  &:hover::before {
    left: 100%;
  }

  @media (max-width: 968px) {
    width: 100%;
    max-width: 450px;
  }
`;

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const Input = styled.input`
  width: 100%;
  padding: 1.2rem 1rem 1.2rem 3rem;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 15px;
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  font-size: 1rem;
  outline: none;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);

  &::placeholder {
    color: #dfdfdfff;
  }

  &:focus {
    background: rgba(255, 255, 255, 0.2);
    border-color: #6c5f8d;
    box-shadow: 0 0 0 3px rgba(108, 95, 141, 0.2);
    transform: translateY(-2px);
  }

  &:hover {
    background: rgba(255, 255, 255, 0.15);
  }
`;

const InputIcon = styled.span`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #888888ff;
  font-size: 1.2rem;
`;

const CheckboxRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.95rem;
  color: #e3f2fd;

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: #6c5f8d;
  }
`;

// Interface para as props do CustomCheckbox
interface CustomCheckboxProps {
  $checked: boolean;
}

const CustomCheckbox = styled.div<CustomCheckboxProps>`
  width: 18px;
  height: 18px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  background: ${(props) => (props.$checked ? "#6c5f8d" : "transparent")};
  border-color: ${(props) =>
    props.$checked ? "#6c5f8d" : "rgba(255, 255, 255, 0.3)"};

  &::after {
    content: "✓";
    color: white;
    font-size: 12px;
    font-weight: bold;
    opacity: ${(props) => (props.$checked ? 1 : 0)};
    transition: opacity 0.3s ease;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 1.2rem;
  background: #6C5F8D;
  border: none;
  border-radius: 15px;
  color: white;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(108, 95, 141, 0.4);
    background: #5a4f75;
  }

  &:active {
    transform: translateY(0);
  }

  &::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    transition: width 0.3s, height 0.3s;
  }

  &:active::after {
    width: 300px;
    height: 300px;
  }
`;

const Link = styled.a`
  color: #C5A4DB;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.3s ease;
  font-weight: 500;

  &:hover {
    color: #C5A4DB;
    text-decoration: underline;
    transform: translateX(2px);
  }
`;

const FooterText = styled.p`
  text-align: center;
  color: #ffffffff;
  font-size: 0.9rem;
  margin-top: 1rem;
  opacity: 0.8;
`;

export default function Home() {
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { login, isAuthenticated } = useAuth();

  // Redireciona se já estiver autenticado
  React.useEffect(() => {
    if (isAuthenticated) {
      router.push("/admin");
    }
  }, [isAuthenticated, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error("Por favor, preencha todos os campos");
      return;
    }

    setLoading(true);
    try {
      await login({ email, password });
      toast.success("Login realizado com sucesso!");
      router.push("/admin");
    } catch (error: any) {
      toast.error(error.message || "Erro ao fazer login. Verifique suas credenciais.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Wrapper>
        {/* COLUNA 1 — TEXTOS E INFORMAÇÕES */}
        <Textos>
          <div>
            <Logo>
              Akaedem <span style={{ fontWeight: 300 }}>Multischool</span>
            </Logo>
            <Titulo>Bem-vindo de volta</Titulo>
          </div>

          <Subtitulo>
            Inicia sessão para aceder à tua conta e gerir as tuas informações
            académicas, financeiras e administrativas de forma simples e segura.
          </Subtitulo>
        </Textos>

        {/* COLUNA 2 — FORMULÁRIO */}
        <FormContainer>
          <form onSubmit={handleLogin}>
          <InputWrapper>
            <InputIcon>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
              >
                <path
                  fill="none"
                  stroke="#ffffff"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17.217 19.332A6.982 6.982 0 0 0 12 17c-2.073 0-3.935.9-5.217 2.332M12 21a9 9 0 1 1 0-18a9 9 0 0 1 0 18Zm0-7a3 3 0 1 1 0-6a3 3 0 0 1 0 6Z"
                />
              </svg>
            </InputIcon>
            <Input 
              type="email" 
              placeholder="Email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
          </InputWrapper>

          <InputWrapper>
            <InputIcon>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#ffffff"
                  d="M17 9V7A5 5 0 0 0 7 7v2a3 3 0 0 0-3 3v7a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-7a3 3 0 0 0-3-3ZM9 7a3 3 0 0 1 6 0v2H9Zm9 12a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1Z"
                />
              </svg>
            </InputIcon>
            <Input 
              type="password" 
              placeholder="Palavra-passe" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />
          </InputWrapper>

          <CheckboxRow>
            <CheckboxLabel onClick={() => setRememberMe(!rememberMe)}>
              <CustomCheckbox $checked={rememberMe} />
              Lembrar-me
            </CheckboxLabel>
            <Link href="#">Esqueceste-te da palavra-passe?</Link>
          </CheckboxRow>

          <Button type="submit" disabled={loading}>
            {loading ? "A iniciar sessão..." : "Iniciar sessão"}
          </Button>

          <FooterText>
            Precisa de ajuda? <Link href="#">Contacte o suporte</Link>
          </FooterText>
          </form>
        </FormContainer>
      </Wrapper>
    </Container>
  );
}