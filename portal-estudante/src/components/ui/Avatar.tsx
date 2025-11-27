import React from "react";
import styled from "styled-components";

// Interfaces
interface UserAvatarProps {
  size?: number;
  src?: string;
  alt?: string;
  name?: string;
  className?: string;
}

interface AvatarContainerProps {
  $size: number;
}

// Styled Components
const AvatarContainer = styled.div<AvatarContainerProps>`
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  border-radius: 50%;
  background-color: #d6d8db;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const AvatarImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
`;

const DefaultAvatar = styled.div`
  width: 100%;
  height: 100%;
  background-color: #d6d8db;
  border-radius: 50%;
  background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="35" r="18" fill="%23666"/><path d="M20 85c0-16.5 13.5-30 30-30s30 13.5 30 30" fill="%23666"/></svg>');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const InitialsAvatar = styled.div<AvatarContainerProps>`
  width: 100%;
  height: 100%;
  background-color: #8b7ba8;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: ${(props) => props.theme.fonts.weight.semibold};
  font-size: ${({ $size }) => Math.max(9, $size * 0.33)}px;
  text-transform: uppercase;
`;

// Helper function to get initials from name (BETA)
const getInitials = (name: string): string => {
  return name
    .split(" ")
    .map((word) => word.charAt(0))
    .join("")
    .slice(0, 2);
};

// Component
const UserAvatar: React.FC<UserAvatarProps> = ({
  size = 100,
  src,
  alt = "Avatar do usuário",
  name,
  className,
}) => {
  const [imageError, setImageError] = React.useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  const renderAvatarContent = () => {
    // Se tem imagem e não houve erro, mostra a imagem
    if (src && !imageError) {
      return <AvatarImage src={src} alt={alt} onError={handleImageError} />;
    }

    // Se tem nome, mostra as INCIAIS
    if (name && name.trim()) {
      return (
        <InitialsAvatar $size={size}>{getInitials(name.trim())}</InitialsAvatar>
      );
    }

    // Caso contrário, mostra o avatar padrão
    return <DefaultAvatar />;
  };

  return (
    <AvatarContainer $size={size} className={className}>
      {renderAvatarContent()}
    </AvatarContainer>
  );
};

export default UserAvatar;

// Exemplo de uso:
/*
// Avatar com imagem
<UserAvatar 
  size={100} 
  src="/path/to/image.jpg" 
  alt="Ana Correia" 
  name="Ana de Assis Correia Diogo"
/>

// Avatar com iniciais (quando não há imagem)
<UserAvatar 
  size={80} 
  name="Ana de Assis Correia Diogo"
/>

// Avatar padrão (quando não há imagem nem nome)
<UserAvatar size={60} />

// Tamanhos diferentes
<UserAvatar size={40} name="João Silva" />
<UserAvatar size={120} src="/user.jpg" />
*/
