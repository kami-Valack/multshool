'use client';

import styled from "styled-components";
import bgVectors from "@/assets/backgrounds/bg_vectors.svg";

const BackgroundVectors = styled.div`
  // position: absolute;
  inset: 0;
  width: 100%;
  min-height: 100%; 
  background: url(${bgVectors.src}) no-repeat center center;
  background-size: cover;
  background-position: center;
  z-index: -1; /* ↓ fica por trás do conteúdo */
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: ${(props) => props.theme.fonts.family.poppins};
  color: ${(props) => props.theme.colors.textBlack};
  overflow-x: hidden;
`;

export default BackgroundVectors;
