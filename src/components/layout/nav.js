import React from 'react';
import styled from 'styled-components';
import { useStaticQuery, graphql, Link } from 'gatsby';

import Button from '../button';

const NavContainer = styled.nav`
  padding: 1rem 8vw;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${props => props.theme.colors.background};
  position: sticky;
  top: 0;
  font-size: 0.9rem;
  font-weight: 500;
`;

const NavLogo = styled.img`
  width: 150px;
`;

const NavLink = styled(Link)`
  margin: 0 1rem;
  color: ${props => props.theme.colors.text};
`;

const Nav = () => {
  // Grab nav menu info from CMS
  const data = useStaticQuery(graphql`
    query NavQuery {
      content: markdownRemark(
        fileAbsolutePath: { regex: "//cms/general/site.md/" }
      ) {
        frontmatter {
          header_logo
        }
      }
    }
  `);

  // Pull logo path out of data
  const logoPath = data.content.frontmatter.header_logo;

  return (
    <NavContainer>
      <Link to="/">
        <NavLogo src={logoPath} alt="Denver Kitchen Gardens" />
      </Link>
      <div>
        <NavLink to="/services">Services</NavLink>
        <NavLink to="/portfolio">Portfolio</NavLink>
        <NavLink to="/faq">FAQ</NavLink>
        <NavLink to="/about">About</NavLink>
      </div>
      <Button to="/contact">Contact</Button>
    </NavContainer>
  );
};

export default Nav;
