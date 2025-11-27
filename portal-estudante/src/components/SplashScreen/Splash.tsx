'use client';

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Logo1 from "./Logo1";
import Logo2 from "./Logo2";
import Slogan from "./Slogan";

interface SplashContainerProps {
  fadeOut: boolean;
  step: 1 | 2 | 3;
}

const SplashContainer = styled.div.withConfig({
  shouldForwardProp: (prop) => !["fadeOut", "step"].includes(prop),
})<SplashContainerProps>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${(props) =>
    props.step === 1
      ? props.theme.colors.background
      : props.theme.colors.primary};
  transition: background-color 0.5s ease-in-out;
  z-index: 9999;
  opacity: 1;
  animation: ${(props) => (props.fadeOut ? "fadeOut 0.5s forwards" : "none")};

  @keyframes fadeOut {
    to {
      opacity: 0;
      visibility: hidden;
    }
  }
`;

interface SplashScreenProps {
  onFinish: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (step === 1) {
      timer = setTimeout(() => setStep(2), 2000);
    } else if (step === 2) {
      timer = setTimeout(() => setStep(3), 2000);
    } else if (step === 3) {
      timer = setTimeout(() => {
        setFadeOut(true);
        setTimeout(onFinish, 500);
      }, 3000);
    }

    return () => clearTimeout(timer);
  }, [step, onFinish]);

  return (
    <SplashContainer step={step} fadeOut={fadeOut}>
      {step === 1 && (
        <Logo1
          isSplashScreen={true}
          width={80}
          height={100}
          alt="Multischool Logo in Footer"
        />
      )}
      {step >= 2 && <Logo2 width={230} height={80} animateUp={step === 3} />}
      {step === 3 && <Slogan />}
    </SplashContainer>
  );
};

export default SplashScreen;
