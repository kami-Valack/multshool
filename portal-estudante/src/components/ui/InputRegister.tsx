"use client";

import React from "react";
import styled from "styled-components";

interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: React.ReactNode;
  isPassword?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  variant?: "default" | "file" | "verification";
  fileName?: string;
  fileInputSize?: "small" | "medium" | "large" | "custom";
  fileInputHeight?: string;
  fileInputWidth?: string;
  error?: string; // Nova propriedade para mensagens de erro
}

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 400px;
`;

const Label = styled.label<{ $hasError?: boolean }>`
  position: absolute;
  top: -8px;
  left: 16px;
  background-color: #fff;
  padding: 0 8px;
  font-size: 14px;
  font-weight: ${(props) => props.theme?.fonts.weight.light};
  color: ${(props) => 
    props.$hasError 
      ? "#dc2626" 
      : props.theme?.colors?.foreground || "#666666"
  };
  z-index: 1;
`;

const InputContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const StyledInput = styled.input<{ $hasError?: boolean }>`
  width: 100%;
  height: 36px;
  padding: 6px 16px 6px 45px;
  border: 2px solid ${(props) => props.$hasError ? "#dc2626" : "#e0e0e0"};
  border-radius: 28px;
  font-size: 16px;
  color: #333;
  background-color: #fff;
  outline: none;
  transition: border-color 0.2s ease;

  &::placeholder {
    color: ${(props) => props.theme?.colors?.muted || "#999"};
    font-size: 14px;
  }

  &:focus {
    border-color: ${(props) => props.$hasError ? "#dc2626" : "#7c74af"};
  }
`;

const IconContainer = styled.div<{ $hasError?: boolean }>`
  width: 5%;
  position: absolute;
  left: 18px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => 
    props.$hasError 
      ? "#dc2626" 
      : props.theme?.colors?.muted || "#999"
  };
  pointer-events: none;
`;

const ToggleIconContainer = styled.div`
  position: absolute;
  right: 18px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
  cursor: pointer;
  padding: 4px;

  &:hover {
    color: #666;
  }
`;

const ErrorText = styled.span`
  color: #dc2626;
  font-size: 12px;
  margin-top: 4px;
  display: block;
  margin-left: 16px;
`;

// File Input Styles
const FileInputContainer = styled.div`
  position: relative;
`;

const FileInput = styled.input`
  display: none;
`;

interface FileInputLabelProps {
  $size: "small" | "medium" | "large" | "custom";
  $customHeight?: string;
  $customWidth?: string;
  $hasError?: boolean;
}

const getFileInputSize = (
  size: "small" | "medium" | "large" | "custom",
  customHeight?: string,
  customWidth?: string
) => {
  switch (size) {
    case "small":
      return { height: "40px", width: "100%" };
    case "medium":
      return { height: "60px", width: "100%" };
    case "large":
      return { height: "80px", width: "100%" };
    case "custom":
      return { height: customHeight || "50px", width: customWidth || "100%" };
    default:
      return { height: "50px", width: "100%" };
  }
};

const FileInputLabel = styled.label<FileInputLabelProps>`
  display: flex;
  align-items: center;
  height: ${(props) =>
    getFileInputSize(props.$size, props.$customHeight, props.$customWidth)
      .height};
  width: ${(props) =>
    getFileInputSize(props.$size, props.$customHeight, props.$customWidth)
      .width};
  padding: 0 16px;
  border: 2px solid ${(props) => props.$hasError ? "#dc2626" : "#e0e0e0"};
  border-radius: 28px;
  cursor: pointer;
  background: ${(props) => props.theme?.colors?.background || "#fff"};
  transition: border-color 0.2s ease;

  &:hover {
    border-color: ${(props) => props.$hasError ? "#dc2626" : "#7c74af"};
  }
`;

const FileIcon = styled.div<{ $hasError?: boolean }>`
  margin-right: 12px;
  font-size: 3px;
  flex-shrink: 0;
  color: ${(props) => 
    props.$hasError 
      ? "#dc2626" 
      : props.theme?.colors?.foreground || "#666"
  };
`;

const FileText = styled.span<{ $hasError?: boolean }>`
  font-size: 12px;
  color: ${(props) => 
    props.$hasError 
      ? "#dc2626" 
      : props.theme?.colors?.muted || "#999"
  };
  font-style: italic;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

// Verification Code Styles
const VerificationContainer = styled.div<{ $hasError?: boolean }>`
  display: flex;
  gap: 12px;
  justify-content: center;
  border: 2px solid ${(props) => props.$hasError ? "#dc2626" : "#e0e0e0"};
  border-radius: 28px;
  padding: 20px;
  background: ${(props) => props.theme?.colors?.background || "#fff"};
`;

const VerificationInput = styled.input<{ $hasError?: boolean }>`
  width: 50px;
  height: 50px;
  border: 2px solid ${(props) => props.$hasError ? "#dc2626" : "#e0e0e0"};
  border-radius: 12px;
  text-align: center;
  font-size: 20px;
  font-weight: 600;
  color: #333;
  outline: none;

  &:focus {
    border-color: ${(props) => props.$hasError ? "#dc2626" : "#7c74af"};
  }
`;

const VerificationLabel = styled.label<{ $hasError?: boolean }>`
  position: absolute;
  top: -8px;
  left: 35%;
  transform: translateX(-50%);
  background-color: #fff;
  padding: 0 8px;
  font-size: 14px;
  color: ${(props) => 
    props.$hasError 
      ? "#dc2626" 
      : props.theme?.colors?.foreground || "#666666"
  };
  z-index: 1;
`;

// Componente de ícone de estudante padrão
const StudentIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
    <path d="M6 12v5c3 3 9 3 12 0v-5" />
  </svg>
);

// Ícone de cadeado
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

// Ícone de olho fechado (senha oculta)
const EyeOffIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);

// Ícone de olho aberto (senha visível)
const EyeIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

// Ícone de anexo
const AttachmentIcon = () => (
  <svg
    width="17"
    height="17"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48" />
  </svg>
);

const CustomInput: React.FC<CustomInputProps> = ({
  label = "Número de estudante",
  placeholder = "",
  value = "",
  onChange,
  icon = <StudentIcon />,
  type = "text",
  isPassword = false,
  variant = "default",
  fileName,
  fileInputSize = "medium",
  fileInputHeight,
  fileInputWidth,
  error, 
  ...props
}) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [localFileName, setLocalFileName] = React.useState(fileName || "");

  const hasError = !!error;

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLocalFileName(file.name);
      onChange && onChange(e);
    }
  };

  const handleVerificationChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newValue = e.target.value;
    if (newValue.length <= 1) {
      const currentValue = (value || "").split("");
      currentValue[index] = newValue;
      const updatedValue = currentValue.join("");

      onChange &&
        onChange({
          ...e,
          target: { ...e.target, value: updatedValue },
        } as React.ChangeEvent<HTMLInputElement>);

      // Auto focus next input
      if (newValue && index < 3) {
        const nextInput = (e.target.parentNode as HTMLElement)?.children[
          index + 1
        ] as HTMLInputElement;
        nextInput?.focus();
      }
    }
  };

  const handleVerificationKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (
      e.key === "Backspace" &&
      !(e.target as HTMLInputElement).value &&
      index > 0
    ) {
      const prevInput = ((e.target as HTMLElement).parentNode as HTMLElement)
        ?.children[index - 1] as HTMLInputElement;
      prevInput?.focus();
    }
  };

  if (variant === "file") {
    return (
      <InputWrapper>
        <FileInputContainer>
          <FileInput
            type="file"
            id={`file-${label}`}
            onChange={handleFileChange}
            {...props}
          />
          <FileInputLabel
            htmlFor={`file-${label}`}
            $size={fileInputSize}
            $customHeight={fileInputHeight}
            $customWidth={fileInputWidth}
            $hasError={hasError}
          >
            <FileIcon $hasError={hasError}>
              <AttachmentIcon />
            </FileIcon>
            <FileText $hasError={hasError}>
              {localFileName || placeholder || "Clique para fazer o upload"}
            </FileText>
          </FileInputLabel>
        </FileInputContainer>
        <Label $hasError={hasError}>{label}</Label>
        {error && <ErrorText>{error}</ErrorText>}
      </InputWrapper>
    );
  }

  if (variant === "verification") {
    return (
      <InputWrapper>
        <VerificationContainer $hasError={hasError}>
          {[...Array(4)].map((_, index) => (
            <VerificationInput
              key={index}
              type="text"
              maxLength={1}
              value={(value || "").split("")[index] || ""}
              onChange={(e) => handleVerificationChange(e, index)}
              onKeyDown={(e) => handleVerificationKeyDown(e, index)}
              $hasError={hasError}
            />
          ))}
        </VerificationContainer>
        <VerificationLabel $hasError={hasError}>{label}</VerificationLabel>
        {error && <ErrorText>{error}</ErrorText>}
      </InputWrapper>
    );
  }

  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <InputWrapper>
      <InputContainer>
        <IconContainer $hasError={hasError}>{icon}</IconContainer>
        <StyledInput
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          $hasError={hasError}
          {...props}
        />
        {isPassword && (
          <ToggleIconContainer onClick={togglePasswordVisibility}>
            {showPassword ? <EyeOffIcon /> : <EyeIcon />}
          </ToggleIconContainer>
        )}
      </InputContainer>
      <Label $hasError={hasError}>{label}</Label>
      {error && <ErrorText>{error}</ErrorText>}
    </InputWrapper>
  );
};

export default CustomInput;