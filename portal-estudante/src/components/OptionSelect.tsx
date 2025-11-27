import styled from 'styled-components';

interface OptionCardProps {
  title: string;
  subtitle?: string;
  selected?: boolean;
  onClick?: () => void;
}

const CardContainer = styled.div<{ selected?: boolean }>`
  background: ${props => props.selected ? '#E8E6F0' : '#F5F5F5'};
  border: 1px solid ${props => props.theme.colors.primary};
  border-radius: 12px;
  padding: 18px;
  margin-bottom: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
`;

const Title = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: ${props => props.theme.colors.primary};
  line-height: 1.3;
`;

const Subtitle = styled.div`
  font-size: 13px;
  color: ${props => props.theme.colors.textBlack};
  margin-top: 4px;
  line-height: 1.2;
`;

export const OptionSelect: React.FC<OptionCardProps> = ({ title, subtitle, selected, onClick }) => {
  return (
    <CardContainer selected={selected} onClick={onClick}>
      <Title>{title}</Title>
      {subtitle && <Subtitle>{subtitle}</Subtitle>}
    </CardContainer>
  );
};
