"use client";

import styled from "styled-components";
import Header from "@/components/ui/HeaderGeneral";
import CustomInput from "@/components/ui/InputRegister";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { useState, useEffect } from "react";
import BackgroundVectors from "@/components/Bg_vectors";
import { useRouter, useSearchParams } from "next/navigation";
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

const ErrorText = styled.p`
  color: #dc3545;
  font-size: 0.85rem;
  margin-top: 0.5rem;
  margin-bottom: 0;
`;

export default function ResetPassword() {
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

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const router = useRouter();
  const searchParams = useSearchParams();
  const { showToast, ToastElement } = useToast();

  // Obter token da URL
  const token = searchParams.get('token');

  useEffect(() => {
    // Se não houver token, redirecionar para página de recuperação
    if (!token) {
      showToast("Token inválido ou ausente. Por favor, solicite um novo link de recuperação.", "error");
      setTimeout(() => {
        router.push("/reset");
      }, 2000);
    }
  }, [token, router, showToast]);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!email) {
      newErrors.email = "O e-mail é obrigatório";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "E-mail inválido";
    }

    if (!password) {
      newErrors.password = "A senha é obrigatória";
    } else if (password.length < 8) {
      newErrors.password = "A senha deve ter pelo menos 8 caracteres";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Confirme a senha";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "As senhas não coincidem";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleResetPassword = async () => {
    if (!validateForm()) {
      return;
    }

    if (!token) {
      showToast("Token inválido. Solicite um novo link de recuperação.", "error");
      return;
    }

    setIsLoading(true);
    try {
      await authService.resetPassword(token, email, password, confirmPassword);
      setIsSuccess(true);
      showToast("Senha redefinida com sucesso! Redirecionando para login...", "success");
      
      // Redirecionar para login após 2 segundos
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (error: any) {
      let errorMessage = "Erro ao redefinir senha. Verifique os dados e tente novamente.";
      if (error.message) {
        errorMessage = error.message;
      }
      showToast(errorMessage, "error");
    } finally {
      setIsLoading(false);
    }
  };

  if (!token) {
    return (
      <BackgroundVectors>
        {ToastElement}
        <Content>
          <Header variant="withBack" title="Token inválido" />
          <Text>
            <Title>Token inválido</Title>
            <Description>O token de recuperação não foi encontrado ou é inválido.</Description>
          </Text>
        </Content>
      </BackgroundVectors>
    );
  }

  return (
    <BackgroundVectors>
      {ToastElement}
      <Content>
        <Header variant="withBack" title="Redefinir senha" />
        {!isSuccess ? (
          <>
            <Text>
              <Title>Redefinir senha</Title>
              <Description>Digite seu e-mail e a nova senha para redefinir sua conta</Description>
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
              {errors.email && <ErrorText>{errors.email}</ErrorText>}
              
              <CustomInput
                label="Nova senha"
                icon={<LockIcon />}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mínimo 8 caracteres"
                isPassword={true}
                disabled={isLoading}
              />
              {errors.password && <ErrorText>{errors.password}</ErrorText>}
              
              <CustomInput
                label="Confirmar nova senha"
                icon={<LockIcon />}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Digite a senha novamente"
                isPassword={true}
                disabled={isLoading}
              />
              {errors.confirmPassword && <ErrorText>{errors.confirmPassword}</ErrorText>}
              
              <InfoBox>
                <InfoText>
                  Certifique-se de que a senha tenha pelo menos 8 caracteres e seja segura.
                </InfoText>
              </InfoBox>
            </Inputs>
            <Links>
              <Button
                bgColor="primary"
                textColor="#FFFFFF"
                text={isLoading ? "A redefinir..." : "Redefinir senha"}
                hasBorder={false}
                onClick={handleResetPassword}
                disabled={isLoading}
              />
              <LinkContainer>
                <LinkMerge>
                  <InlineText>Lembrou-se da senha? - </InlineText>
                  <StyledLink href="/login">Fazer login</StyledLink>
                </LinkMerge>
              </LinkContainer>
            </Links>
          </>
        ) : (
          <Text>
            <Title>Senha redefinida!</Title>
            <Description>
              Sua senha foi redefinida com sucesso. Você será redirecionado para a página de login em instantes.
            </Description>
          </Text>
        )}
      </Content>
    </BackgroundVectors>
  );
}
