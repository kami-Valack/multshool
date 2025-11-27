import React from 'react';
import styled from 'styled-components';
import Button from './ui/Button';

interface SortOption {
  value: string;
  label: string;
}

interface AlertModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  imageUrl?: string; // agora opcional
  confirmText?: string;
  cancelText?: string;
  showCancelButton?: boolean;
  onConfirm: () => void;
  onCancel?: () => void;
  onClose: () => void;
  confirmButtonProps?: {
    bgColor?: string;
    textColor?: string;
    hasBorder?: boolean;
  };
  cancelButtonProps?: {
    bgColor?: string;
    textColor?: string;
    hasBorder?: boolean;
  };
  variant?: 'default' | 'sort' | 'image'; // variante com imagem opcional
  sortOptions?: SortOption[];
  selectedSort?: string;
  onSortChange?: (value: string) => void;
}

const Overlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  display: ${props => props.isOpen ? 'flex' : 'none'};
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 20px;
`;

const ModalContainer = styled.div`
  background: white;
  border-radius: 20px;
  padding: 24px; /* padding normal para título, mensagem e botões */
  width: 100%;
  max-width: 340px;
  position: relative;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  font-family: ${props => props.theme.fonts.family.poppins};
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
`;

const Image = styled.img`
  width: calc(100% + 48px);        /* ultrapassa o padding lateral da modal (24px de cada lado) */
  height: 270px;                   /* altura maior */
  object-fit: cover;               /* cobre toda a área sem distorcer */
  display: block;     
  margin: -24px -24px 16px -24px;  /* ultrapassa o padding da modal */
  border-top-left-radius: 20px;    /* mantém cantos arredondados do topo */
  border-top-right-radius: 20px;
`;


const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background: none;
  border: none;
  font-size: 24px;
  color: #999;
  cursor: pointer;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s ease;
    background: #f0f0f0;
    color: #666;
  
`;

const Title = styled.h3`
  font-size: 20px;
  font-weight: 600;
  color: ${props => props.theme.colors.primary};
  margin: 16px 0 16px 0;
  text-align: center;
  font-family: ${props => props.theme.fonts.family.poppins};
`;



const Message = styled.p`
  font-size: 16px;
  color: ${props => props.theme.colors.textBlack};
  margin: 0 0 24px 0;
  text-align: center;
  line-height: 1.4;
  font-family: ${props => props.theme.fonts.family.poppins};
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ButtonWrapper = styled.div`
  width: 100%;
`;

const SortOptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin: 16px 0 0 0;
`;

const SortOption = styled.label`
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  padding: 12px;
  border-radius: 8px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #f8f9fa;
  }
`;

const RadioInput = styled.input`
  width: 18px;
  height: 18px;
  accent-color: ${props => props.theme.colors.primary};
  cursor: pointer;
`;

const OptionLabel = styled.span`
  font-size: 16px;
  color: ${props => props.theme.colors.textBlack};
  font-family: ${props => props.theme.fonts.family.poppins};
`;

export const AlertModal: React.FC<AlertModalProps> = ({
  isOpen,
  title,
  message,
  imageUrl,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  showCancelButton = true,
  onConfirm,
  onCancel,
  onClose,
  confirmButtonProps = {
    bgColor: "primary",
    textColor: "#FFFFFF",
    hasBorder: false
  },
  cancelButtonProps = {
    bgColor: "background",
    textColor: "#6C5F8D",
    hasBorder: true
  },
  variant = 'default',
  sortOptions = [],
  selectedSort = '',
  onSortChange
}) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      onClose();
    }
  };

  const handleSortOptionChange = (value: string) => {
    if (onSortChange) {
      onSortChange(value);
      onClose();
    }
  };

  const renderContent = () => {
    if (variant === 'sort') {
      return (
        <SortOptionsContainer>
          {sortOptions.map(option => (
            <SortOption key={option.value}>
              <RadioInput
                type="radio"
                name="sortOption"
                value={option.value}
                checked={selectedSort === option.value}
                onChange={() => handleSortOptionChange(option.value)}
              />
              <OptionLabel>{option.label}</OptionLabel>
            </SortOption>
          ))}
        </SortOptionsContainer>
      );
    }

    return (
      <>
        {/* imagem só se variante for 'image' */}
        {variant === 'image' && imageUrl && <Image src={imageUrl} alt="Alert illustration" />}
        <Title>{title}</Title>
        {message && <Message>{message}</Message>}
        <ButtonContainer>
          <ButtonWrapper>
            <Button
              bgColor={confirmButtonProps.bgColor}
              textColor={confirmButtonProps.textColor}
              text={confirmText}
              hasBorder={confirmButtonProps.hasBorder}
              onClick={onConfirm}
            />
          </ButtonWrapper>
          {showCancelButton && (
            <ButtonWrapper>
              <Button
                bgColor={cancelButtonProps.bgColor}
                textColor={cancelButtonProps.textColor}
                text={cancelText}
                hasBorder={cancelButtonProps.hasBorder}
                onClick={handleCancel}
              />
            </ButtonWrapper>
          )}
        </ButtonContainer>
      </>
    );
  };

  return (
    <Overlay isOpen={isOpen} onClick={handleOverlayClick}>
      <ModalContainer>
        <CloseButton onClick={onClose}>×</CloseButton>
        {renderContent()}
      </ModalContainer>
    </Overlay>
  );
};
