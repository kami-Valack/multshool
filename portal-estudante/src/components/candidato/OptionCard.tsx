import styled from 'styled-components';

interface OptionCardProps {
  variant: 'primary' | 'secondary' | 'disabled' | 'orange' | 'light-purple';
  status: 'disponivel' | 'indisponivel';
  title: string;
  subtitle?: string;
  date?: string;
  onClick?: () => void;
  size?: 'normal' | 'large' | 'tall';
}

const CardContainer = styled.div<{
  variant: OptionCardProps['variant'];
  disabled: boolean;
  size: OptionCardProps['size'];
}>`
  background: ${props => {
    if (props.variant === 'primary') return 'linear-gradient(135deg, #9B92C2, #9B92C2)';
    if (props.variant === 'secondary') return 'linear-gradient(135deg, #D9D9EC, #D9D9EC)';
    if (props.variant === 'disabled') return 'linear-gradient(135deg, #DDD6FE, #DDD6FE)';
    if (props.variant === 'orange') return 'linear-gradient(135deg, #E17055, #E17055)';
    if (props.variant === 'light-purple') return 'linear-gradient(135deg, #6C5F8D, #6C5F8D)';
    return '#ffffff';
  }};
  color: ${props => {
    if (props.variant === 'secondary') return '#374151';
    if (props.variant === 'disabled') return '#6B7280';
    return '#ffffff';
  }};
  border-radius: 20px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  position: relative;
  display: flex;
  flex-direction: column;
  height: auto;
  ${props => props.size === 'tall' ? 'min-height: 140px; justify-content: space-between;' : ''}

  &:hover {
    transform: ${props => props.disabled ? 'none' : 'translateY(-1px)'};
    box-shadow: ${props => props.disabled ? '0 2px 8px rgba(0, 0, 0, 0.1)' : '0 4px 12px rgba(0, 0, 0, 0.15)'};
  }
`;

const StatusBadge = styled.div<{ 
  status: OptionCardProps['status'];
  variant: OptionCardProps['variant'];
}>`
  background-color: ${props => {
    if (props.variant === 'secondary' || props.variant === 'disabled') {
      return props.status === 'disponivel' ? '#d1fae5' : '#fecaca';
    }
    // Para variants com fundo colorido, usar badge transparente
    return 'rgba(255, 255, 255, 0.3)';
  }};
  color: ${props => {
    if (props.variant === 'secondary' || props.variant === 'disabled') {
      if (props.status === 'disponivel') return '#065f46';
      if (props.status === 'indisponivel') return '#991b1b';
      return '#374151';
    }
    return '#ffffff';
  }};
  display: inline-block;
  width: fit-content;
  align-self: flex-start;
  margin-bottom: 10px;
  padding: 6px 12px;
  border-radius: 15px;
  font-size: 11px;
  font-weight: 600;
  text-transform: capitalize;
`;

const CardTitle = styled.h3<{
  variant: OptionCardProps['variant']
}>`
  font-size: ${props => {
    if (props.variant === 'primary' || props.variant === 'orange' || props.variant === 'light-purple') return '16px';
    if (props.variant === 'secondary' || props.variant === 'disabled') return '16px';
    return '16px';
  }};
  font-weight: ${(props) => props.theme.fonts.weight.semibold};
  margin: 0 0 8px 0;
  line-height: 1.3;
`;

const CardSubtitle = styled.p`
  font-size: 13px;
  margin: 2px 0 0 0;
  opacity: 0.9;
  line-height: 1.4;
  font-weight: 400;
`;

const CardDate = styled.p`
  font-size: 13px;
  margin: 8px 0 0 0;
  font-weight: 500;
`;

export const OptionCard: React.FC<OptionCardProps> = ({
  variant,
  status,
  title,
  subtitle,
  date,
  onClick,
  size = 'normal'
}) => {
  const isDisabled = status === 'indisponivel';
  
  return (
    <CardContainer
      variant={variant}
      disabled={isDisabled}
      size={size}
      onClick={!isDisabled ? onClick : undefined}
    >
      <StatusBadge status={status} variant={variant}>
        {status === 'disponivel' ? 'Disponível' : 'Indisponível'}
      </StatusBadge>
      <div>
        <CardTitle variant={variant}>{title}</CardTitle>
        {date && <CardDate>{date}</CardDate>}
        {subtitle && <CardSubtitle>{subtitle}</CardSubtitle>}
      </div>
    </CardContainer>
  );
};