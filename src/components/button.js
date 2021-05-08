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
  text-align: center;
  text-transform: uppercase;
  transition: background 0.5s ease, color 0.5s ease;

  &:hover {
    background: ${props => props.theme.colors.green};
    color: ${props => props.theme.colors.text_white};
    cursor: pointer;
    text-decoration-line: none !important;
  }

  ${props => {
    // Styles if only 'light' is passed as variant
    return props.variant === 'light'
      ? `background: ${props.theme.colors.button_light};
      color: ${props.theme.colors.text_dark};
      font-weight: 500;
      text-transform: none;`
      : // Styles if exactly 'light inverted' is passed as variant
      props.variant === 'light inverted'
      ? `background: transparent;
      border: 2px solid ${props.theme.colors.text};
      color: ${props.theme.colors.text_dark};
      font-weight: 500;

      &:hover {
        border: 2px solid ${props.theme.colors.text};
      }`
      : // Styles if exactly 'green' is passed as variant
      props.variant === 'green'
      ? `background: ${props.theme.colors.green};

      &:hover {
        background: ${props.theme.colors.button_light};
        color: ${props.theme.colors.green};
      }`
      : '';
  }}
`;

const Button = ({ children, to, variant, className }) => (
  <ButtonContainer to={to} variant={variant} className={className}>
    {children}
  </ButtonContainer>
);

export default Button;
