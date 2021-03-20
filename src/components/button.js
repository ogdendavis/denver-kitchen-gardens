import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';

const ButtonContainer = styled(Link)`
  ${props =>
    props.isLight
      ? `background: ${props.theme.colors.button_light};
      border: 1px solid ${props.theme.colors.button_light};
      color: ${props.theme.colors.text_dark};
      font-weight: 500;`
      : `background: ${props.theme.colors.button};
      border: 1px solid ${props.theme.colors.button};
      color: ${props.theme.colors.text_white};
      text-transform: uppercase;
      font-weight: 700;`}

  padding: 0.8rem 1.5rem;
  font-family: sans-serif;
  display: inline-block;
  transition: border 0.5s ease;
  border: 1px solid transparent;

  &:hover {
    text-decoration-line: none !important;
    ${props =>
      props.isLight
        ? `border: 1px solid ${props.theme.colors.text_dark};`
        : `border: 1px solid ${props.theme.colors.text_white};`}
  }
`;

const Button = ({ children, to, light = false }) => {
  return (
    <ButtonContainer to={to} isLight={light}>
      {children}
    </ButtonContainer>
  );
};

export default Button;
