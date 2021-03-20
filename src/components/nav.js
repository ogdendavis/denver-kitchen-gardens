import React from 'react';
import styled from 'styled-components';
import { useStaticQuery, graphql, Link } from 'gatsby';

const NavContainer = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding: 1rem 8vw;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const NavLogo = styled.img`
  width: 150px;
`;

const NavLink = styled(Link)`
  margin: 0 0.5rem;
  color: ${props => props.theme.colors.text};
  text-decoration: none;

  &:hover {
    text-decoration-line: underline;
    text-decoration-thickness: 0.1em;
  }
`;

const Nav = () => {
  // Grab header info from CMS
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
        <NavLogo src={logoPath} alt="DKG logo" />
      </Link>
      <div>
        <NavLink to="/services">Services</NavLink>
        <NavLink to="/portfolio">Portfolio</NavLink>
        <NavLink to="/about">About</NavLink>
      </div>
      <NavLink to="/contact">Contact</NavLink>
    </NavContainer>
  );
};

export default Nav;
