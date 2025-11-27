import styled from "styled-components";
import { ReactNode } from "react";
import { Header } from "@/components/candidato/Header";
import Button from "../ui/Button";

interface StepLayoutProps {
  title: string;
  subtitle: string;
  children: ReactNode;
  onContinue: () => void;
  onBack: () => void;
  profileName?: string;
  profileSubtitle?: string;
}

const Container = styled.div`
  width: 100%;
  background: ${(props) => props.theme.colors.background};
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: ${(props) => props.theme.fonts.family.poppins};
`;

const ProfileSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 35px 40px 35px;
  background: #e9e9e9ff;
  border-radius: 20px;
  margin: 0 0 30px 0
`;

const ProfileImage = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: #ddd;
  margin-bottom: 16px;
  background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="40" r="18" fill="%23999"/><path d="M20 85c0-16 13-30 30-30s30 14 30 30" fill="%23999"/></svg>');
  background-size: cover;
  background-position: center;
`;

const ProfileName = styled.h2`
  font-size: 18px;
  font-weight: 600;
  color: ${(props) => props.theme.colors.primary};
  margin: 0 0 4px 0;
  text-align: center;
`;

const ProfileSubtitle = styled.p`
  font-size: 14px;
  color: #666;
  margin: 0;
  text-align: center;
`;

const Content = styled.div`
  width: 90%;
  padding-bottom: 10px;
`;

const StepTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: ${(props) => props.theme.colors.primary};
  margin: 0 0 30px 0;
  text-align: center;
`;

const StepSubtitle = styled.p`
  font-size: 16px;
  color: #333;
  margin: 0 0 30px 0;
  font-weight: 500;
`;

const ContinueButton = styled.div`
  width: 90%;
  margin-bottom: 40px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  justify-content: center;
`;

export const StepLayout: React.FC<StepLayoutProps> = ({
  title,
  subtitle,
  children,
  onContinue,
  profileName,
  profileSubtitle,
}) => {
  return (
    <Container>
      <Header variant="with-back" />

      {profileName && (
        <ProfileSection>
          <ProfileImage />
          <ProfileName>{profileName}</ProfileName>
          <ProfileSubtitle>{profileSubtitle}</ProfileSubtitle>
        </ProfileSection>
      )}

      <Content>
        <StepTitle>{title}</StepTitle>
        <StepSubtitle>{subtitle}</StepSubtitle>
        {children}
      </Content>

      <ContinueButton>
        <Button
          bgColor="primary"
          textColor="#FFFFFF"
          text="Continuar"
          hasBorder={false}
          onClick={onContinue}
        />
      </ContinueButton>
    </Container>
  );
};
