'use client'

import styled from "styled-components";
import bgLosango from "@/assets/backgrounds/patterns/losangos_explore.png";

const PageContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: url(${bgLosango.src}) no-repeat left center;
  background-size: 14% 100%; 
  overflow-y: auto;
  overflow-x: hidden;
  font-family: ${(props) => props.theme.fonts.family.poppins};
`;

export default PageContainer;