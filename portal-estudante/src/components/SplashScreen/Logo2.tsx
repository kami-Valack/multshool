'use client'

import React from "react";
import styled from "styled-components";
import Image from 'next/image';
import logotipo from '@/assets/logotipo.png';
import { ImageProps } from '@/types/image';


interface Logo2Props extends ImageProps{
  animateUp: boolean;
}

const LogoContainer = styled.div.withConfig({
  shouldForwardProp: (prop) => !["animateUp"].includes(prop),
})<Logo2Props>`
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${(props) =>
    props.animateUp ? "moveUp 1s ease-out forwards" : "fadeIn 1s ease-in"};

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: scale(0.8);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes moveUp {
    from {
      transform: translateY(0);
    }
    to {
      transform: translateY(2px);
    }
  }
`;

const Logo2: React.FC<Logo2Props> = ({width, height, className, animateUp }) => {
  return (
    <LogoContainer className={className} animateUp={animateUp}>
      <div>
        {" "}
        <Image src={logotipo} alt="Logo 2" width={width} height={height} priority />
      </div>
    </LogoContainer>
  );
};

export default Logo2;
