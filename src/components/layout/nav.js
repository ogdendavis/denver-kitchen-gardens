import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useStaticQuery, graphql, Link } from 'gatsby';

import Button from '../button';
import MobileNav from './mobileNav';

const NavContainer = styled.nav`
  padding: 1rem 8vw;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${props => props.theme.colors.background};
  position: sticky;
  top: 0;
  font-weight: 500;
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

  // Set breakpoint (in px) at which to use mobile/burger nav
  const breakpoint = 800;

  // For SSR to work, we need to check if we're in a browser before using window object
  const inBrowser = typeof window !== 'undefined';

  // Flag for whether to display full nav or mobile/burger nav
  const [useBurger, setUseBurger] = useState(
    inBrowser ? window.innerWidth <= breakpoint : 0
  );

  // Function to pass to resize listener for setting viewportWidth
  const resizeListener = () => {
    // Grab viewport width
    const viewportWidth = window.innerWidth;
    // If we're narrower than breakpoint, use it!
    if (viewportWidth <= breakpoint) {
      setUseBurger(true);
    }
    // If we're wider than breakpoint, stop using!
    else if (viewportWidth > breakpoint) {
      setUseBurger(false);
    }
  };

  // On component mount, listen for window resize
  useEffect(() => {
    // Add listener to window
    window.addEventListener('resize', resizeListener);

    // On unmount, remove listener
    return function cleanup() {
      window.removeEventListener('resize', resizeListener);
    };
  }, []);

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
        useBurger === false && (
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
        useBurger === true && (
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
