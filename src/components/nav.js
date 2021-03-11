import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';

const TempNav = styled.nav`
  width: 100%;
  text-align: center;
  margin-bottom: 2rem;
`;

const TempLink = styled(Link)`
  margin: 0 0.5rem;
`;

const Nav = () => {
  return (
    <TempNav>
      <TempLink to="/">Home</TempLink>
      <TempLink to="/services">Services</TempLink>
      <TempLink to="/portfolio">Portfolio</TempLink>
      <TempLink to="/about">About</TempLink>
      <TempLink to="/contact">Contact</TempLink>
    </TempNav>
  );
};

export default Nav;
