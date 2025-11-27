"use client";

import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    font-family: ${({ theme }) => theme.fonts.family.poppins};
  }

  * {
    box-sizing: border-box;
    
  }
`;

export default GlobalStyle;
