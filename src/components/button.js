import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';

// Default button styles first, then overrides for variants
const ButtonContainer = styled(Link)`
  background: ${props => props.theme.colors.blue};
  color: ${props => props.theme.colors.text_white};
  display: inline-block;
  font-weight: 600;
  padding: 1rem 2.5rem;
  text-transform: uppercase;
  transition: background 0.5s ease, color 0.5s ease;

  &:hover {
    text-decoration-line: none !important;
    background: ${props => props.theme.colors.green};
    color: ${props => props.theme.colors.text_white};
  }

  ${props => {
    // Styles if only 'light' is passed as variant
    return props.variant === 'light'
      ? `background: ${props.theme.colors.button_light};
      color: ${props.theme.colors.text_dark};
      font-weight: 500;
      text-transform: none;`
      : '';
  }}

  ${props => {
    // Styles if exactly 'light inverted' is passed as variant
    return props.variant === 'light inverted'
      ? `background: transparent;
      border: 2px solid ${props.theme.colors.text};
      color: ${props.theme.colors.text_dark};
      font-weight: 500;

      &:hover {
        border: 2px solid ${props.theme.colors.text};
      }`
      : '';
  }}
`;

const Button = ({ children, to, variant }) => {
  return (
    <ButtonContainer to={to} variant={variant}>
      {children}
    </ButtonContainer>
  );
};

export default Button;
