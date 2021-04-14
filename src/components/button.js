import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';

const ButtonContainer = styled(Link)`
  ${props =>
    props.islight
      ? `background: ${props.theme.colors.button_light};
      color: ${props.theme.colors.text_dark};
      font-weight: 500;`
      : `background: ${props.theme.colors.button};
      color: ${props.theme.colors.text_white};
      text-transform: uppercase;
      font-weight: 600;`}

  padding: 1rem 2.5rem;
  display: inline-block;
  transition: background 0.5s ease, color 0.5s ease;

  &:hover {
    text-decoration-line: none !important;
    background: ${props => props.theme.colors.green};
    color: ${props => props.theme.colors.text_white};
  }
`;

const Button = ({ children, to, light }) => {
  return (
    <ButtonContainer to={to} islight={light}>
      {children}
    </ButtonContainer>
  );
};

export default Button;
