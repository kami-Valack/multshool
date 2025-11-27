'use client '

import React from 'react';
import styled from 'styled-components';

const Text = styled.p`
  color: ${props => props.theme.colors.textWhite};
  font-family: ${props => props.theme.fonts.family.poppins};
  font-weight: ${props => props.theme.fonts.weight.regular};
  font-size: 14px;
  margin-top: 0px;
  animation: fadeIn 1s ease-in;

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const Slogan: React.FC = () => <Text>Educação na palma da sua mão</Text>;

export default Slogan;
