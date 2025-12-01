"use client";

import styled from "styled-components";
import Header from "@/components/ui/HeaderWelcome";
import Icon from "@/components/ui/IconLogo";
import CustomInput from "@/components/ui/InputRegister";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { useState, useEffect } from "react";
import BackgroundVectors from "@/components/Bg_vectors";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter, useSearchParams } from "next/navigation";
import { useToast } from "@/hooks/useToast";

const Content = styled.div`
  width: 90%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  @media (max-height: 600px) {
    height: auto;
    min-height: 100vh;
    justify-content: flex-start;
    gap: 1rem;
  }
`;



const Text = styled.div`
  width: 100%;
  height: auto; /* Removed fixed height to allow flexibility */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 2.8rem;
  background: #000 @media (max-height: 600px) {
    margin-bottom: 1.5rem;
    gap: 1rem;
  }
`;

const Description = styled.p`
  color: ${(props) => props.theme.colors.foreground};
  font-weight: ${(props) => props.theme.fonts.weight.regular};
  font-size: 0.96rem;
  line-height: 1.5;
`;

const Inputs = styled.div`
  width: 100%;
  height: auto; /* Removed fixed height to allow flexibility */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1.5rem; /* Added gap for better spacing */
  background: #000 @media (max-height: 600px) {
    gap: 1.5rem;
  }
`;

const Links = styled.div`
  width: 100%;
  height: auto; /* Removed fixed height to allow flexibility */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 2.5rem;
  gap: 1rem; /* Added gap for better spacing */

  @media (max-height: 600px) {
    margin-top: 2rem;
    gap: 1rem;
  }
`;

const Title = styled.h1`
  font-weight: ${(props) => props.theme.fonts.weight.semibold};
  font-size: 2.5rem;
  margin-bottom: -0.6rem;
  line-height: 1.4;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const LinkContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: center;
  margin-top: 1rem;
  font-size: 15px;
`;

const StyledLink = styled(Link)`
  color: ${(props) => props.theme.colors.primary};
  font-weight: ${(props) => props.theme.fonts.weight.light};
  text-decoration: none;
  margin-bottom: 10px
`;

const LinkMerge = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: baseline;
  font-size: 15px;
`;

const InlineText = styled.span`
  color: ${(props) => props.theme.colors.textBlack};
  font-weight: ${(props) => props.theme.fonts.weight.light};
  line-height: 1;
`;

export default function Welcome() {
  const UserIcon = () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );

  const LockIcon = () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <circle cx="12" cy="16" r="1" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );

  const [studentNumber, setStudentNumber] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login, user } = useAuth();
  const router = useRouter();
  const { showToast, ToastElement } = useToast();

  // Verificar se há um parâmetro de redirecionamento na URL ou sessionStorage
  const getRedirectUrl = () => {
    if (typeof window !== 'undefined') {
      // Primeiro, verificar o parâmetro da URL
      const urlParams = new URLSearchParams(window.location.search);
      const redirectParam = urlParams.get('redirect');
      
      if (redirectParam) {
        // Salvar no sessionStorage também para garantir
        sessionStorage.setItem('redirectAfterLogin', decodeURIComponent(redirectParam));
        return decodeURIComponent(redirectParam);
      }
      
      // Verificar redirectAfterRegister primeiro (usuário acabou de se registrar)
      const storedRegisterRedirect = sessionStorage.getItem('redirectAfterRegister');
      if (storedRegisterRedirect) {
        // Mover para redirectAfterLogin para manter após o login
        sessionStorage.removeItem('redirectAfterRegister');
        sessionStorage.setItem('redirectAfterLogin', storedRegisterRedirect);
        return storedRegisterRedirect;
      }
      
      // Se não houver na URL, verificar no sessionStorage
      const storedRedirect = sessionStorage.getItem('redirectAfterLogin');
      if (storedRedirect) {
        return storedRedirect;
      }
    }
    
    // Padrão: redirecionar para o dashboard
    return "/estudante/dashboard";
  };

  const handleLogin = async () => {
    if (!studentNumber || !password) {
      showToast("Por favor, preencha todos os campos", "error");
      return;
    }

    setIsLoading(true);
    try {
      await login(studentNumber, password);
      showToast("Login realizado com sucesso!", "success");
      
      // Aguardar um pouco para o contexto atualizar o usuário
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // Verificar se precisa completar documentos (primeiro acesso após registro)
      if (typeof window !== 'undefined') {
        const needsDocuments = sessionStorage.getItem('needsDocuments');
        
        // Buscar perfil atualizado para verificar documentos
        try {
          const { studentService } = await import('@/services/studentService');
          const profile = await studentService.getProfile();
          
          // Se precisa de documentos OU se o usuário não tem todos os documentos
          if (needsDocuments === 'true' || !profile.has_all_documents) {
            // Limpar flag
            sessionStorage.removeItem('needsDocuments');
            // Redirecionar para documentos (usar a rota que existe)
            setTimeout(() => {
              router.push("/candidato/documentos");
            }, 500);
            return;
          }
        } catch (error) {
          console.error("Erro ao verificar perfil:", error);
          // Continuar com o fluxo normal se houver erro
        }
      }
      
      // Redirecionar para a URL salva ou dashboard
      const redirectUrl = getRedirectUrl();
      
      // Limpar o sessionStorage após obter a URL
      if (typeof window !== 'undefined') {
        sessionStorage.removeItem('redirectAfterLogin');
        sessionStorage.removeItem('redirectAfterRegister');
      }
      
      // Pequeno delay para garantir que o toast seja exibido
      setTimeout(() => {
        router.push(redirectUrl);
      }, 500);
    } catch (error: any) {
      showToast(
        error.message || "Erro ao fazer login. Verifique suas credenciais.",
        "error"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <BackgroundVectors>
      {ToastElement}
      <Content>
        {/* <Cab> */}
          <Header
            variant="logo"
            logoComponent={<Icon width={40} height={50} />}
            onBackClick={() => console.log("Voltar clicado")}
          />
        {/* </Cab> */}
        <Text>
          <Title>Vamos começar a jornada!</Title>
          <Description>Inicie a sessão na sua conta</Description>
        </Text>
        <Inputs>
          <CustomInput
            label="Número de estudante"
            icon={<UserIcon />}
            value={studentNumber}
            onChange={(e) => setStudentNumber(e.target.value)}
            placeholder="ex: 2032742"
            type="email"
          />
          <CustomInput
            label="Palavra-passe"
            icon={<LockIcon />}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="*************"
            isPassword={true}
          />
        </Inputs>
        <Links>
          <Button
            bgColor="primary"
            textColor="#FFFFFF"
            text={isLoading ? "A fazer login..." : "Fazer login"}
            hasBorder={false}
            onClick={handleLogin}
            disabled={isLoading}
          />
          <LinkContainer>
            <StyledLink href="/reset">Esqueci-me do PIN de acesso</StyledLink>
            <LinkMerge>
              <InlineText> Não possui uma conta? - </InlineText>
              <StyledLink href="/tips">Criar conta</StyledLink>
            </LinkMerge>
          </LinkContainer>
        </Links>
      </Content>
    </BackgroundVectors>
  );
}
