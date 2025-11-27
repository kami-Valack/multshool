'use client'

import React from 'react';
import styled from 'styled-components';
import Icon from '@/components/ui/IconLogo';
import { ImageProps } from '@/types/image';

interface LogoProps extends ImageProps {
  isSplashScreen?: boolean;
}

const LogoWrapper = styled.div.withConfig({
  shouldForwardProp: (prop) => !['isSplashScreen'].includes(prop),
})<LogoProps>`
  animation: ${props => (props.isSplashScreen ? 'fadeInOut 2s ease-in-out' : 'none')};
  @keyframes fadeInOut {
    0% { opacity: 0; }
    20% { opacity: 1; }
    80% { opacity: 1; }
    100% { opacity: 0; }
  }
`;

const Logo1: React.FC<LogoProps> = ({ width, height, alt, className, isSplashScreen }) => (
  <LogoWrapper className={className} isSplashScreen={isSplashScreen}>
    <Icon width={width} height={height} alt={alt} />
  </LogoWrapper>
);

export default Logo1;