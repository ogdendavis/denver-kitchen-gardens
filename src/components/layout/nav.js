import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useStaticQuery, graphql, Link } from 'gatsby';

import Button from '../button';
import MobileNav from './mobileNav';
import { useViewport } from '../context/viewport';

const NavContainer = styled.nav`
  align-items: center;
  background: ${props => props.theme.colors.background};
  box-shadow: 0 3px 6px #0000007b;
  display: flex;
  font-weight: 500;
  justify-content: space-between;
  padding: 1rem 8vw;
  position: sticky;
  top: 0;
  z-index: 999;

  /* Mobile nav styling */
  &.mobile-nav {
    display: block;
    padding: 1rem 0;
  }
`;

const LogoLink = styled(Link)`
  /* Mobile nav styling */
  &.mobile-logoLink {
    display: block;
    margin: 0 auto;
    text-align: center;
  }
`;

const NavLogo = styled.img`
  width: 150px;

  /* Mobile nav styling */
  &.mobile-logo {
    width: 125px;
  }
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

  // Grab width from viewport context
  const { width } = useViewport();

  // Set breakpoint (in px) at which to use mobile/burger nav
  const breakpoint = 800;

  // Flag for whether to display full nav or mobile/burger nav
  // Default to mobile view
  const [useBurger, setUseBurger] = useState(true);

  // When viewport width chagnes, compare to breakpoint to decide which menu to use
  useEffect(() => {
    setUseBurger(width <= breakpoint);
  }, [width]);

  return (
    <NavContainer className={useBurger ? 'mobile-nav' : ''}>
      <LogoLink to="/" className={useBurger ? 'mobile-logoLink' : ''}>
        <NavLogo
          src={logoPath}
          alt="Denver Kitchen Gardens"
          className={useBurger ? 'mobile-logo' : ''}
        />
      </LogoLink>
      {
        // Render normal menu if viewport is wide enough
        !useBurger && (
          <>
            <div>
              <NavLink to="/services">Services</NavLink>
              <NavLink to="/portfolio">Portfolio</NavLink>
              <NavLink to="/faq">FAQ</NavLink>
              <NavLink to="/about">About</NavLink>
            </div>
            <Button to="/contact">Contact</Button>
          </>
        )
      }
      {
        // Render mobile nav if viewport is at or below breakpoint
        // classNames used for styling in mobileNav.js
        useBurger && (
          <MobileNav>
            <NavLink to="/services" className="mobile-link">
              Services
            </NavLink>
            <NavLink to="/portfolio" className="mobile-link">
              Portfolio
            </NavLink>
            <NavLink to="/faq" className="mobile-link">
              FAQ
            </NavLink>
            <NavLink to="/about" className="mobile-link">
              About
            </NavLink>
            <Button to="/contact" className="mobile-button">
              Contact
            </Button>
          </MobileNav>
        )
      }
    </NavContainer>
  );
};

export default Nav;
