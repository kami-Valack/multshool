"use client";

import styled from "styled-components";
import Header from "@/components/ui/HeaderGeneral";
import Icon from "@/components/ui/IconLogo";
import CustomInput from "@/components/ui/InputRegister";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { useState } from "react";
import BackgroundVectors from "@/components/Bg_vectors";
import { useRouter } from "next/navigation";
import { authService } from "@/services/authService";
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
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 2.8rem;

  @media (max-height: 600px) {
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
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1.5rem;

  @media (max-height: 600px) {
    gap: 1.5rem;
  }
`;

const Links = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 2.5rem;
  gap: 1rem;

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
  margin-bottom: 10px;
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

const InfoBox = styled.div`
  width: 90%;
  background: ${(props) => props.theme.colors.background || 'rgba(255, 255, 255, 0.1)'};
  border-radius: 12px;
  padding: 1rem;
  margin-top: 1rem;
  border: 1px solid ${(props) => props.theme.colors.foreground || 'rgba(255, 255, 255, 0.2)'};
`;

const InfoText = styled.p`
  color: ${(props) => props.theme.colors.foreground};
  font-size: 0.85rem;
  line-height: 1.5;
  margin: 0;
  font-weight: ${(props) => props.theme.fonts.weight.regular};
`;

export default function RecoverAccount() {
  const EmailIcon = () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );

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

  const [email, setEmail] = useState("");
  const [studentNumber, setStudentNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();
  const { showToast, ToastElement } = useToast();

  const handleRecoverAccount = async () => {
    if (!email && !studentNumber) {
      showToast("Por favor, preencha pelo menos o e-mail ou número de estudante", "error");
      return;
    }

    // Se tiver número de estudante mas não email, usar o número de estudante como email
    const emailToUse = email || studentNumber;

    setIsLoading(true);
    try {
      await authService.requestPasswordReset(emailToUse);
      setIsSuccess(true);
      showToast("Se o e-mail existir, um link de recuperação foi enviado. Verifique sua caixa de entrada e spam.", "success");
      
      // Redirecionar para login após 3 segundos
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    } catch (error: any) {
      let errorMessage = "Erro ao solicitar recuperação de senha. Tente novamente.";
      if (error.message) {
        errorMessage = error.message;
      }
      showToast(errorMessage, "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <BackgroundVectors>
      {ToastElement}
      <Content>
        <Header
          variant="withBack"
          title="Recuperar conta"
        />
        {!isSuccess ? (
          <>
            <Text>
              <Title>Recuperar conta</Title>
              <Description>Insira os seus dados para recuperar o acesso à sua conta</Description>
            </Text>
            <Inputs>
              <CustomInput
                label="E-mail institucional"
                icon={<EmailIcon />}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="exemplo@instituicao.ao"
                type="email"
                disabled={isLoading}
              />
              <CustomInput
                label="Número de estudante (opcional)"
                icon={<UserIcon />}
                value={studentNumber}
                onChange={(e) => setStudentNumber(e.target.value)}
                placeholder="ex: 2032742"
                type="text"
                disabled={isLoading}
              />
              <InfoBox>
                <InfoText>
                  Enviaremos um link de recuperação para o seu e-mail institucional. Verifique também a pasta de spam.
                </InfoText>
              </InfoBox>
            </Inputs>
            <Links>
              <Button
                bgColor="primary"
                textColor="#FFFFFF"
                text={isLoading ? "A enviar..." : "Recuperar conta"}
                hasBorder={false}
                onClick={handleRecoverAccount}
                disabled={isLoading}
              />
              <LinkContainer>
                <LinkMerge>
                  <InlineText>Lembrou-se da senha? - </InlineText>
                  <StyledLink href="/login">Fazer login</StyledLink>
                </LinkMerge>
                <LinkMerge>
                  <InlineText>Não possui uma conta? - </InlineText>
                  <StyledLink href="/tips">Criar conta</StyledLink>
                </LinkMerge>
              </LinkContainer>
            </Links>
          </>
        ) : (
          <>
            <Text>
              <Title>E-mail enviado!</Title>
              <Description>
                Se o e-mail existir, um link de recuperação foi enviado. Verifique sua caixa de entrada e pasta de spam.
                Você será redirecionado para a página de login em instantes.
              </Description>
            </Text>
            <Links>
              <LinkContainer>
                <LinkMerge>
                  <InlineText>Lembrou-se da senha? - </InlineText>
                  <StyledLink href="/login">Fazer login</StyledLink>
                </LinkMerge>
              </LinkContainer>
            </Links>
          </>
        )}
      </Content>
    </BackgroundVectors>
  );
}