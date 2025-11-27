import styled from "styled-components";

interface HeroCardProps {
  imageUrl?: string;
  title: string;
  subtitle: string;
  badge?: string; // Nova prop para badge personalizado
  badgeVariant?: 'date' | 'count' | 'custom'; // Tipo de badge
}

const HeroContainer = styled.div<{ imageUrl?: string }>`
  background: ${(props) =>
    props.imageUrl
      ? `linear-gradient(135deg, rgba(0, 0, 0, 0.21), rgba(0, 0, 0, 0.22)), url('${props.imageUrl}')`
      : "linear-gradient(135deg, #4b5563, #6b7280)"};
  background-size: cover;
  background-position: center;
  border-radius: 20px;
  padding: 30px;
  color: white;
  position: relative;
  margin-bottom: 40px;
  min-height: 160px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const Badge = styled.div<{ variant: 'date' | 'count' | 'custom' }>`
  position: absolute;
  top: 20px;
  right: 20px;
  background-color: ${(props) => {
    if (props.variant === 'date') return props.theme.colors.secondary;
    if (props.variant === 'count') return  props.theme.colors.secondary; // Verde para contadores
    return props.theme.colors.secondary; // Default
  }};
  color: ${(props) => {
    return props.theme.colors.textBlack;
  }};
  padding: 8px 18px;
  border-radius: 25px;
  font-size: 12px;
  font-weight: ${(props) => props.theme.fonts.weight.semibold};
  display: flex;
  align-items: center;
  gap: 6px;
  border: ${(props) => {
    return `1px solid ${props.theme.colors.background}`;
  }};

  &::before {
    content: ${(props) => {
      if (props.variant === 'date') return '"📅"';
      if (props.variant === 'count') return '"✓"';
      return '""';
    }};
    font-size: 12px;
    ${(props) => props.variant === 'custom' ? 'display: none;' : ''}
  }
`;

const HeroTitle = styled.h2`
  font-size: 18px;
  font-weight: ${(props) => props.theme.fonts.weight.semibold};
  margin: 0 0 8px 0;
  line-height: 1.2;
`;

const HeroSubtitle = styled.p`
  font-size: 13px;
  margin: 0;
  opacity: 0.9;
  line-height: 1.5;
  font-weight: ${(props) => props.theme.fonts.weight.light};
`;

const getCurrentDate = () => {
  const today = new Date();
  return today.toLocaleDateString("pt-PT", {
    day: "numeric",
    month: "long"
  });
};

export const HeroCard: React.FC<HeroCardProps> = ({
  imageUrl,
  title,
  subtitle,
  badge,
  badgeVariant = 'date'
}) => {
  const getBadgeText = () => {
    if (badge) return badge;
    if (badgeVariant === 'date') return getCurrentDate();
    return '';
  };

  const shouldShowBadge = badge || badgeVariant === 'date';

  return (
    <HeroContainer imageUrl={imageUrl}>
      {shouldShowBadge && (
        <Badge variant={badgeVariant}>
          {getBadgeText()}
        </Badge>
      )}
      <div>
        <HeroTitle>{title}</HeroTitle>
        <HeroSubtitle>{subtitle}</HeroSubtitle>
      </div>
    </HeroContainer>
  );
};