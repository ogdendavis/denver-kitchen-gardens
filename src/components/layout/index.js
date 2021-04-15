import React from 'react';
import styled, { ThemeProvider } from 'styled-components';

import 'normalize.css';

import BigHat from './helmet';
import Nav from './nav';
import Header from './header';
import Footer from './footer';

// Consume theme (set below) and set some global styles
const ThemeConsumer = styled.div`
  background: ${props => props.theme.colors.background};
  font-family: Montserrat;

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: Lora;
    color: ${({ theme }) => theme.colors.heading};
    letter-spacing: 1px;
  }

  h1 {
    font-weight: 500;
    font-size: 3rem;
  }

  h2 {
    font-size: 1.875rem;
    font-weight: 600;
    letter-spacing: 2.25px;
  }

  h3 {
    font-size: 1.5rem;
    font-weight: 600;
    letter-spacing: 1.25px;
  }

  h2,
  h3,
  h4,
  h5,
  h6 {
    text-transform: uppercase;
  }

  h1.reset,
  h2.reset,
  h3.reset,
  h4.reset,
  h5.reset,
  h6.reset {
    color: inherit;
    text-transform: none;
    letter-spacing: normal;
  }

  p {
    font-size: 1.125rem;
    line-height: 2rem;
  }

  a {
    text-decoration: none;
    &:hover {
      text-decoration-line: underline;
      text-decoration-thickness: 0.1em;
    }
  }
`;

const Main = styled.main`
  margin: 0 auto;
`;

const Layout = ({ heroImage, heroHeading, heroText, heroPhone, children }) => {
  // Theme for global styles
  const theme = {
    content: {
      width: '95vw',
      maxWidth: '1100px',
      minWidth: '345px',
    },
    colors: {
      background: '#E3DFDC',
      background_dark: '#cec7b7',
      background_light: '#fbfbfb',
      blue: '#22526c',
      button_light: '#e3dfdc',
      green: '#65673b',
      heading: '#903e23',
      text: '#737373',
      text_beige: '#cec7b7',
      text_dark: '#3d3d3d',
      text_white: '#fcfcfc',
    },
  };

  return (
    <ThemeProvider theme={theme}>
      <BigHat />
      <ThemeConsumer>
        <Nav />
        <Header
          heroImage={heroImage}
          heading={heroHeading}
          text={heroText}
          phone={heroPhone}
        />
        <Main>{children}</Main>
        <Footer />
      </ThemeConsumer>
    </ThemeProvider>
  );
};

export default Layout;
