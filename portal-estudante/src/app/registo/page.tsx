"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import styled from "styled-components";
import Header from "@/components/ui/HeaderWelcome";
import Icon from "@/components/ui/IconLogo";
import CustomInput from "@/components/ui/InputRegister";
import Button from "@/components/ui/Button";
import BackgroundVectors from "@/components/Bg_vectors";
import { authService } from "@/services/authService";
import { useToast } from "@/hooks/useToast";

// Mapeamento dos slugs para nomes das instituições
const institutionMapping: { [key: string]: string } = {
  impal: "Instituto Médio Politécnico Alda Lara - IMPAL",
  ulan: "Universidade Lueji A Nkonde - ULAN",
  isptec: "Instituto Superior Politécnico de Tecnologias e Ciências - ISPTEC",
};

interface RegistrationFormProps {
  phoneFromPrevious?: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  phoneNumber?: string;
  address?: string;
  password?: string;
  confirmPassword?: string;
  idDocument?: string;
  photo?: string;
  gradesDeclaration?: string;
  verificationCode?: string;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({
  phoneFromPrevious = "+244",
}) => {
  const router = useRouter();
  const params = useParams();
  const { showToast, ToastElement } = useToast();
  const [currentStep, setCurrentStep] = useState(0);
  const [countdown, setCountdown] = useState(119);
  const [isLoading, setIsLoading] = useState(false);
  const [isSendingCode, setIsSendingCode] = useState(false);
  const [smsStatus, setSmsStatus] = useState<"idle" | "sent" | "error">("idle");
  const [verificationMethod, setVerificationMethod] = useState<"sms" | "whatsapp">("sms");
  const [errors, setErrors] = useState<FormErrors>({});

  // Obter o nome da instituição da URL (IN PROGRESS)
  const institutionSlug = params.institution as string;
  const institutionName = institutionMapping[institutionSlug] || "Instituição";

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: phoneFromPrevious,
    address: "",
    password: "",
    confirmPassword: "",
    idDocument: null as File | null,
    photo: null as File | null,
    gradesDeclaration: null as File | null,
    verificationCode: "",
  });

  // Countdown para reenvio do código
useEffect(() => {
  if (currentStep === 3 && countdown > 0 && smsStatus === "sent") { // Adicionar condição smsStatus
    const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    return () => clearTimeout(timer);
  }
}, [countdown, currentStep, smsStatus]); // Adicionar smsStatus como dependência


  const formatCountdown = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Função para enviar SMS
const sendVerificationCode = async (
  phoneNumber: string,
  method: "sms" | "whatsapp" = "sms"
): Promise<boolean> => {
  try {
    const response = await fetch("/api/sms/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phoneNumber,
        action: "send",
        method,
      }),
    });

    const data = await response.json();

    if (data.success) {
      setSmsStatus("sent");
      setCountdown(120); // Alterar de 600 para 120 (2 minutos)
      return true;
    } else {
      setErrors((prev) => ({
        ...prev,
        verificationCode: data.error || "Erro ao enviar código",
      }));
      setSmsStatus("error");
      return false;
    }
  } catch (error) {
    console.error("Erro ao enviar código:", error);
    setErrors((prev) => ({
      ...prev,
      verificationCode: "Erro de conexão. Tente novamente.",
    }));
    setSmsStatus("error");
    return false;
  }
};


  // Função para verificar código
  const verifyCode = async (
    phoneNumber: string,
    code: string
  ): Promise<boolean> => {
    try {
      const response = await fetch("/api/sms/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phoneNumber,
          code,
          action: "verify",
        }),
      });

      const data = await response.json();

      if (data.success) {
        return true;
      } else {
        setErrors((prev) => ({
          ...prev,
          verificationCode: data.error || "Código inválido",
        }));
        return false;
      }
    } catch (error) {
      console.error("Erro ao verificar código:", error);
      setErrors((prev) => ({
        ...prev,
        verificationCode: "Erro de conexão. Tente novamente.",
      }));
      return false;
    }
  };

  // Validação por etapa
  const validateStep = (step: number): boolean => {
    const newErrors: FormErrors = {};

    switch (step) {
      case 0:
        if (!formData.fullName.trim()) {
          newErrors.fullName = "Nome completo é obrigatório";
        } else if (formData.fullName.trim().length < 2) {
          newErrors.fullName = "Nome deve ter pelo menos 2 caracteres";
        }

        if (!formData.email.trim()) {
          newErrors.email = "Email é obrigatório";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
          newErrors.email = "Email inválido";
        }

        if (!formData.phoneNumber || formData.phoneNumber === "+244") {
          newErrors.phoneNumber = "Número de telefone é obrigatório";
        } else if (formData.phoneNumber.replace("+244", "").length !== 9) {
          newErrors.phoneNumber = "Número deve ter 9 dígitos";
        }

        if (!formData.address.trim()) {
          newErrors.address = "Morada é obrigatória";
        }

        if (!formData.password) {
          newErrors.password = "Senha é obrigatória";
        } else if (formData.password.length < 8) {
          newErrors.password = "Senha deve ter no mínimo 8 caracteres";
        }

        if (!formData.confirmPassword) {
          newErrors.confirmPassword = "Confirmação da senha é obrigatória";
        } else if (formData.password !== formData.confirmPassword) {
          newErrors.confirmPassword = "Senhas não coincidem";
        }
        break;

      case 1:
        if (!formData.idDocument) {
          newErrors.idDocument = "Documento de identidade é obrigatório";
        }
        if (!formData.photo) {
          newErrors.photo = "Fotografia é obrigatória";
        }
        if (!formData.gradesDeclaration) {
          newErrors.gradesDeclaration = "Declaração de notas é obrigatória";
        }
        break;

      case 2:
        // Nova etapa - validação do método (opcional, pois tem valor padrão)
        break;

      case 3:
        if (
          !formData.verificationCode ||
          formData.verificationCode.length !== 4
        ) {
          newErrors.verificationCode =
            "Código de verificação deve ter 4 dígitos";
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange =
    (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setFormData((prev) => ({ ...prev, [field]: value }));

      // Limpar erro quando usuário começar a digitar
      if (errors[field as keyof FormErrors]) {
        setErrors((prev) => ({ ...prev, [field]: undefined }));
      }
    };

  const handleFileChange =
    (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        setFormData((prev) => ({ ...prev, [field]: file }));

        // Limpar erro quando arquivo for selecionado
        if (errors[field as keyof FormErrors]) {
          setErrors((prev) => ({ ...prev, [field]: undefined }));
        }
      }
    };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const cleanValue = value.replace(/\D/g, "");
    const limitedValue = cleanValue.slice(0, 9);
    const fullNumber = "+244" + limitedValue;

    setFormData((prev) => ({ ...prev, phoneNumber: fullNumber }));

    // Limpar erro
    if (errors.phoneNumber) {
      setErrors((prev) => ({ ...prev, phoneNumber: undefined }));
    }
  };

  // Submeter registro na API
  const submitRegistration = async () => {
    setIsLoading(true);

    try {
      // Chamar API de registro
      const registrationData = {
        name: formData.fullName,
        email: formData.email.toLowerCase().trim(),
        password: formData.password,
      };

      const response = await authService.register(registrationData);

      if (response.status === 'success') {
        showToast("Conta criada com sucesso! Verifique seu email para ativar a conta.", "success");
        
        // Aguardar um pouco antes de redirecionar
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      }
    } catch (error: any) {
      console.error("Erro no registo:", error);
      let errorMessage = "Erro ao processar registo. Tente novamente.";
      
      // Tratar erros específicos da API
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      } else if (typeof error === 'object' && error.status === 'error' && error.message) {
        errorMessage = error.message;
      }
      
      showToast(errorMessage, "error");
      
      // Definir erros nos campos apropriados
      if (errorMessage.toLowerCase().includes("email") || errorMessage.toLowerCase().includes("já está em uso")) {
        setErrors((prev) => ({ ...prev, email: errorMessage }));
      } else if (errorMessage.toLowerCase().includes("senha") || errorMessage.toLowerCase().includes("password")) {
        setErrors((prev) => ({ ...prev, password: errorMessage }));
      } else {
        setErrors((prev) => ({ ...prev, email: errorMessage }));
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleNext = async () => {
    if (!validateStep(currentStep)) {
      return;
    }

    // Etapa 0: Dados pessoais -> Etapa 1: Documentos
    if (currentStep === 0) {
      setCurrentStep(1);
    } 
    // Etapa 1: Documentos -> Submeter registro (pular verificação SMS)
    else if (currentStep === 1) {
      await submitRegistration();
    }
    // Se ainda houver etapas de verificação SMS (opcional)
    else if (currentStep === 2) {
      setIsSendingCode(true);
      const codeSent = await sendVerificationCode(
        formData.phoneNumber,
        verificationMethod
      );
      setIsSendingCode(false);

      if (codeSent) {
        setCurrentStep(currentStep + 1);
      }
    } else if (currentStep === 3) {
      await submitRegistration();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      // Reset SMS status quando voltar da última etapa
      if (currentStep === 3) {
        setSmsStatus("idle");
        setCountdown(0);
      }
    } else {
      router.back();
    }
  };

  const handleResendCode = async () => {
    setIsSendingCode(true);
    await sendVerificationCode(formData.phoneNumber, verificationMethod);
    setIsSendingCode(false);
  };

  const formatPhoneNumber = (phone: string) => {
    const number = phone.replace("+244", "");
    if (number.length <= 3) return `+244 ${number}`;
    if (number.length <= 6)
      return `+244 ${number.slice(0, 3)} ${number.slice(3)}`;
    return `+244 ${number.slice(0, 3)} ${number.slice(3, 6)} ${number.slice(
      6,
      9
    )}`;
  };

  const steps = [
    {
      title: "Dê o primeiro passo, crie a sua conta!",
      subtitle: "Junte-se à nossa comunidade e comece a sua jornada connosco",
    },
    {
      title: "Estás quase lá, precisamos de mais algumas informações!",
      subtitle: "Anexe os documentos correctamente",
    },
    {
      title: "Escolha como receber o código de verificação",
      subtitle: "Selecione o método de sua preferência para receber o código",
    },
    {
      title: "Agora, basta confirmares a tua conta Multischool!",
      subtitle:
        "Com a conta Multischool, vais maximizar o teu potencial académico.",
    },
  ];

  const MethodSelector = () => (
    <MethodSelectorContainer>
      <MethodSelectorLabel>Escolha como receber o código:</MethodSelectorLabel>
      <MethodOptions>
        <MethodOption
          $active={verificationMethod === "sms"}
          onClick={() => setVerificationMethod("sms")}
        >
          <MethodIcon>📱</MethodIcon>
          <MethodText>SMS</MethodText>
        </MethodOption>
        <MethodOption
          $active={verificationMethod === "whatsapp"}
          onClick={() => setVerificationMethod("whatsapp")}
        >
          <MethodIcon>💬</MethodIcon>
          <MethodText>WhatsApp</MethodText>
        </MethodOption>
      </MethodOptions>
    </MethodSelectorContainer>
  );

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <>
            <InstitutionName>{institutionName}</InstitutionName>

            <InfoInputs>
              <CustomInput
                label="Nome completo"
                value={formData.fullName}
                onChange={handleInputChange("fullName")}
                icon={<UserIcon />}
                error={errors.fullName}
              />

              <PhoneInputContainer>
                <PhoneLabel>Número de telefone</PhoneLabel>
                <PhoneInputWrapper $hasError={!!errors.phoneNumber}>
                  <CountrySelector>
                    <FlagIcon>🇦🇴</FlagIcon>
                    <CountryCode>+244</CountryCode>
                  </CountrySelector>
                  <PhoneNumberInput
                    type="tel"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={formData.phoneNumber.replace("+244", "")}
                    onChange={handlePhoneNumberChange}
                    maxLength={9}
                  />
                </PhoneInputWrapper>
                {errors.phoneNumber && (
                  <ErrorText>{errors.phoneNumber}</ErrorText>
                )}
              </PhoneInputContainer>

              <CustomInput
                label="Morada"
                value={formData.address}
                onChange={handleInputChange("address")}
                icon={<LocationIcon />}
                error={errors.address}
              />

              <CustomInput
                label="Email"
                value={formData.email}
                onChange={handleInputChange("email")}
                icon={<EmailIcon />}
                type="email"
                error={errors.email}
              />

              <CustomInput
                label="Senha"
                value={formData.password}
                onChange={handleInputChange("password")}
                icon={<LockIcon />}
                isPassword={true}
                error={errors.password}
              />

              <CustomInput
                label="Confirmar senha"
                value={formData.confirmPassword}
                onChange={handleInputChange("confirmPassword")}
                icon={<LockIcon />}
                isPassword={true}
                error={errors.confirmPassword}
              />
            </InfoInputs>
          </>
        );

      case 1:
        return (
          <>
            <SectionTitle>Documentação</SectionTitle>

            <DocumentsContainer>
              <div>
                <CustomInput
                  fileInputSize="custom"
                  fileInputHeight="80px"
                  fileInputWidth="90%"
                  label="Bilhete de identidade ou passaporte"
                  placeholder="O anexo deve incluir frente e verso"
                  variant="file"
                  accept="image/*,.pdf"
                  onChange={handleFileChange("idDocument")}
                />
                {errors.idDocument && (
                  <ErrorText>{errors.idDocument}</ErrorText>
                )}
              </div>

              <div>
                <CustomInput
                  fileInputSize="custom"
                  fileInputHeight="80px"
                  fileInputWidth="90%"
                  label="Fotografia (tipo: passe)"
                  placeholder="Clique para fazer o upload"
                  variant="file"
                  accept="image/*"
                  onChange={handleFileChange("photo")}
                />
                {errors.photo && <ErrorText>{errors.photo}</ErrorText>}
              </div>

              <div>
                <CustomInput
                  fileInputSize="custom"
                  fileInputHeight="80px"
                  fileInputWidth="90%"
                  label="Declaração com notas"
                  placeholder="O anexo deve incluir frente e verso"
                  variant="file"
                  accept=".pdf,image/*"
                  onChange={handleFileChange("gradesDeclaration")}
                />
                {errors.gradesDeclaration && (
                  <ErrorText>{errors.gradesDeclaration}</ErrorText>
                )}
              </div>
            </DocumentsContainer>
          </>
        );

      case 2:
        return (
          <>
            <SectionTitle>Método de verificação</SectionTitle>
            <VerificationText>
              Escolha como deseja receber o código de confirmação no seu número:{" "}
              <SenderPhone>
                <EditLink onClick={() => setCurrentStep(0)}>
                  {formatPhoneNumber(formData.phoneNumber)}
                </EditLink>
              </SenderPhone>
            </VerificationText>
            <MethodSelector />
          </>
        );

      case 3:
        return (
          <>
            <SectionTitle>Verificação de conta</SectionTitle>

            {smsStatus === "idle" && (
              <>
                <VerificationText>
                  Iremos enviar um código de confirmação para o seu número de
                  telefone.
                </VerificationText>
                <MethodSelector />
              </>
            )}

            {smsStatus === "sent" && (
              <>
                <VerificationText>
                  Enviámos um código de confirmação via{" "}
                  <strong>
                    {verificationMethod === "whatsapp" ? "WhatsApp" : "SMS"}
                  </strong>{" "}
                  para o número:{" "}
                  <SenderPhone>
                    <EditLink onClick={() => setCurrentStep(0)}>
                      {formatPhoneNumber(formData.phoneNumber)}
                    </EditLink>
                  </SenderPhone>
                </VerificationText>

                <VerificationInputContainer>
                  <VerificationLabel>Código de confirmação</VerificationLabel>
                  <VerificationInputs $hasError={!!errors.verificationCode}>
                    {[...Array(4)].map((_, index) => (
                      <VerificationInput
                        key={index}
                        type="text"
                        maxLength={1}
                        value={
                          (formData.verificationCode || "").split("")[index] ||
                          ""
                        }
                        onChange={(e) => {
                          const newValue = e.target.value;
                          if (newValue.length <= 1) {
                            const currentValue = (
                              formData.verificationCode || ""
                            ).split("");
                            currentValue[index] = newValue;
                            const updatedValue = currentValue.join("");

                            setFormData((prev) => ({
                              ...prev,
                              verificationCode: updatedValue,
                            }));

                            // Limpar erro
                            if (errors.verificationCode) {
                              setErrors((prev) => ({
                                ...prev,
                                verificationCode: undefined,
                              }));
                            }

                            // Auto focus next input
                            if (newValue && index < 3) {
                              const nextInput = (
                                e.target.parentNode as HTMLElement
                              )?.children[index + 1] as HTMLInputElement;
                              nextInput?.focus();
                            }
                          }
                        }}
                        onKeyDown={(e) => {
                          if (
                            e.key === "Backspace" &&
                            !(e.target as HTMLInputElement).value &&
                            index > 0
                          ) {
                            const prevInput = (
                              (e.target as HTMLElement)
                                .parentNode as HTMLElement
                            )?.children[index - 1] as HTMLInputElement;
                            prevInput?.focus();
                          }
                        }}
                      />
                    ))}
                  </VerificationInputs>
                  {errors.verificationCode && (
                    <ErrorText>{errors.verificationCode}</ErrorText>
                  )}
                </VerificationInputContainer>

                {countdown > 0 ? (
                  <ResendText>
                    Solicitar novo código de confirmação dentro de{" "}
                    <strong>{formatCountdown(countdown)}</strong>
                  </ResendText>
                ) : (
                  <ResendButton
                    onClick={handleResendCode}
                    disabled={isSendingCode}
                  >
                    {isSendingCode
                      ? "Reenviando..."
                      : `Reenviar código via ${
                          verificationMethod === "whatsapp" ? "WhatsApp" : "SMS"
                        }`}
                  </ResendButton>
                )}
              </>
            )}

            {smsStatus === "error" && (
              <ErrorText style={{ textAlign: "center", marginTop: "16px" }}>
                Erro ao enviar código. Verifique o número e tente novamente.
              </ErrorText>
            )}
          </>
        );
      default:
        return null;
    }
  };

  const getButtonText = () => {
    if (currentStep === 2 && isSendingCode) {
      return "Enviando código...";
    }
    if (currentStep === 3 && isLoading) {
      return "Verificando...";
    }
    if (currentStep === 2 && smsStatus !== "sent") {
      return "Enviar código";
    }
    if (isLoading) {
      return "Processando...";
    }
    return "Continuar";
  };

  const isButtonDisabled = () => {
    if (isSendingCode || isLoading) return true;
    if (currentStep === 2 && smsStatus !== "sent") return false;
    return false;
  };

  return (
    <BackgroundVectors>
      <ProgressIndicator>
        {steps.map((_, index) => (
          <ProgressStep key={index} $active={index <= currentStep} />
        ))}
      </ProgressIndicator>

      <Header
        variant="logo"
        logoComponent={<Icon width={40} height={50} />}
        onBackClick={handleBack}
      />

      <Content>
        <StepTitle>{steps[currentStep].title}</StepTitle>
        <StepSubtitle>{steps[currentStep].subtitle}</StepSubtitle>

        <FormContainer>{renderStepContent()}</FormContainer>

        <ButtonContainer>
          <Button
            bgColor="primary"
            textColor="#FFFFFF"
            text={getButtonText()}
            hasBorder={false}
            onClick={handleNext}
            disabled={isButtonDisabled()}
          />
        </ButtonContainer>
      </Content>
      {ToastElement}
    </BackgroundVectors>
  );
};

// Styled Components
const ProgressIndicator = styled.div`
  display: flex;
  justify-content: center;
  gap: 4px;
  padding: 10px;
  background: #fff;
  margin: 30px 0 -10px;
`;

const ProgressStep = styled.div<{ $active: boolean }>`
  width: 25px;
  height: 4px;
  background: ${({ $active }) => ($active ? "#7c74af" : "#e0e0e0")};
  border-radius: 2px;
  transition: background-color 0.3s ease;
`;

const Content = styled.div`
  flex: 1;
  padding: 0 20px 0 20px;
  display: flex;
  flex-direction: column;
`;

const StepTitle = styled.h1`
  font-size: 20px;
  font-weight: ${(props) => props.theme?.fonts?.weight?.semibold || "600"};
  color: ${(props) => props.theme?.colors?.textBlack || "#000000"};
  margin-bottom: 8px;
  line-height: 1.3;
`;

const StepSubtitle = styled.p`
  font-size: 14px;
  color: ${(props) => props.theme?.colors?.foreground || "#666666"};
  line-height: 1.4;
`;

const InstitutionName = styled.div`
  font-size: 14px;
  color: ${(props) => props.theme?.colors?.primary || "#666666"};
  ${(props) => props.theme?.fonts?.weight?.semibold};
  padding-bottom: 15px;
  margin-top: 20px;
`;

const SectionTitle = styled.h2`
  font-size: 18px;
  font-weight: ${(props) => props.theme?.fonts?.weight?.semibold || "600"};
  color: ${(props) => props.theme?.colors?.primary || "#000000"};
  text-align: center;
`;

const InfoInputs = styled.div`
  width: 100%;
  min-height: 50vh;
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const ErrorText = styled.span`
  color: #dc2626;
  font-size: 12px;
  margin-top: 4px;
  display: block;
`;

// Phone Input Styles
const PhoneInputContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 400px;
`;

const PhoneLabel = styled.label`
  position: absolute;
  top: -8px;
  left: 85px;
  background-color: #fff;
  padding: 0 8px;
  font-size: 14px;
  font-weight: ${(props) => props.theme?.fonts.weight.light};
  color: ${(props) => props.theme?.colors?.foreground || "#666666"};
  z-index: 1;
`;

const PhoneInputWrapper = styled.div<{ $hasError?: boolean }>`
  display: flex;
  height: 44px;
  border: 2px solid ${({ $hasError }) => ($hasError ? "#dc2626" : "#e0e0e0")};
  border-radius: 28px;
  background: #fff;
`;

const CountrySelector = styled.div`
  display: flex;
  align-items: center;
  background: ${(props) => props.theme?.colors?.muted};
  color: ${(props) => props.theme?.colors?.textBlack};
  padding: 0 12px;
  border-radius: 25px 0 0 25px;
  gap: 4px;
  min-width: 30px;
`;

const FlagIcon = styled.span`
  font-size: 16px;
`;

const CountryCode = styled.span`
  font-size: 0.84rem;
  font-weight: 500;
`;

const PhoneNumberInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  padding: 6px 16px;
  color: #333;
  border-radius: 0 25px 25px 0;
  background: transparent;
  font-size: 16px; /* evita o zoom no iOS */

  &:focus {
    outline: none;
  }
`;


// Verification Input Styles
const VerificationInputContainer = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 16px;
`;

const VerificationLabel = styled.label`
  position: absolute;
  top: -8px;
  left: 35%;
  transform: translateX(-50%);
  background-color: #fff;
  padding: 0 8px;
  font-size: 14px;
  color: ${(props) => props.theme?.colors?.foreground || "#666666"};
  z-index: 1;
`;

const VerificationInputs = styled.div<{ $hasError?: boolean }>`
  display: flex;
  gap: 8px; // Reduzir de 12px para 8px
  justify-content: center;
  border: 2px solid ${({ $hasError }) => ($hasError ? "#dc2626" : "#e0e0e0")};
  border-radius: 28px;
  padding: 16px 12px; // Reduzir padding horizontal
  background: ${(props) => props.theme?.colors?.background};
  max-width: 100%; // Adicionar
  overflow: hidden; // Adicionar
`;

const VerificationInput = styled.input`
  width: 45px; // Reduzir de 50px para 45px
  height: 45px; // Reduzir de 50px para 45px
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  text-align: center;
  font-size: 18px; // Reduzir de 20px para 18px
  font-weight: 600;
  color: #333;
  outline: none;
  flex-shrink: 0; // Adicionar para evitar que diminua

  &:focus {
    border-color: #7c74af;
  }
`;
const VerificationText = styled.p`
  font-size: 14px;
  color: ${(props) => props.theme?.colors?.textBlack || "#666666"};
  margin: -10px 0 20px;
  text-align: center;
  line-height: 1.4;
`;

const SenderPhone = styled.span`
  color: ${(props) => props.theme?.colors?.primary};
  font-weight: ${(props) => props.theme?.fonts.weight.semibold};
`;

const ResendText = styled.p`
  font-size: 14px;
  color: ${(props) => props.theme?.colors?.foreground || "#666666"};
  text-align: center;
  margin-top: 15px;
`;

const ResendButton = styled.button`
  background: none;
  border: none;
  color: #7c74af;
  font-size: 14px;
  text-decoration: underline;
  cursor: pointer;
  margin: 15px auto;
  display: block;

  &:hover:not(:disabled) {
    color: #6b5f9a;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const EditLink = styled.span`
  color: ${(props) => props.theme?.colors?.primary || "#7c74af"};
  text-decoration: underline;
  cursor: pointer;
`;

const FormContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 0px;
`;

const DocumentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const ButtonContainer = styled.div`
  padding: 16px 0;
  margin-top: auto;
  margin-bottom: 20px;
  width: 100%; // Adicionar
  max-width: 100%; // Adicionar
  overflow: hidden; // Adicionar
`;



// Ícones
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

const LocationIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
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

const MethodSelectorContainer = styled.div`
  margin: 20px 0;
`;

const MethodSelectorLabel = styled.label`
  font-size: 14px;
  color: ${(props) => props.theme?.colors?.textBlack || "#333"};
  margin-bottom: 12px;
  display: block;
  font-weight: ${(props) => props.theme?.fonts?.weight?.semibold || "500"};
`;

const MethodOptions = styled.div`
  display: flex;
  gap: 12px;
  justify-content: center;
`;

const MethodOption = styled.div<{ $active: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px 20px;
  border: 2px solid
    ${({ $active, theme }) =>
      $active ? theme?.colors?.primary || "#7c74af" : "#e0e0e0"};
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  background: ${({ $active }) =>
    $active ? "rgba(124, 116, 175, 0.05)" : "#fff"};
  min-width: 80px;

  &:hover {
    border-color: ${(props) => props.theme?.colors?.primary || "#7c74af"};
  }
`;

const MethodIcon = styled.div`
  font-size: 24px;
  margin-bottom: 8px;
`;

const MethodText = styled.span`
  font-size: 12px;
  font-weight: ${(props) => props.theme?.fonts?.weight?.semibold || "500"};
  color: ${(props) => props.theme?.colors?.textBlack || "#333"};
`;

// Componente de página sem props
const RegistrationPage: React.FC = () => {
  return <RegistrationForm />;
};

export default RegistrationPage;