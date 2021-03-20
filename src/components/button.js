import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';

const ButtonContainer = styled(Link)`
  ${props =>
    props.isLight
      ? `background: ${props.theme.colors.button_light};
    color: ${props.theme.colors.text_dark};`
      : `background: ${props.theme.colors.button};
    color: ${props.theme.colors.text_white};`}
  text-decoration: none;
  text-transform: uppercase;
  font-weight: 700;
  padding: 1rem 1.5rem;
  font-family: sans-serif;
`;

const Button = ({ children, to, light = false }) => {
  return (
    <ButtonContainer to={to} isLight={light}>
      {children}
    </ButtonContainer>
  );
};

export default Button;
