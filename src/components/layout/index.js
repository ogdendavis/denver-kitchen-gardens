import React from 'react';
import styled, { ThemeProvider } from 'styled-components';

import 'normalize.css';

import Nav from './nav';
import Header from './header';
import Footer from './footer';

// Consume theme (set below) and set some global styles
const ThemeConsumer = styled.div`
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: ${({ theme }) => theme.colors.heading};
    letter-spacing: 1px;
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

  a {
    text-decoration: none;
    &:hover {
      text-decoration-line: underline;
      text-decoration-thickness: 0.1em;
    }
  }

  background: ${props => props.theme.colors.background};
`;

const Main = styled.main`
  width: ${props => props.theme.content.width};
  max-width: ${props => props.theme.content.maxWith};
  margin: 0 auto;
`;

const Layout = ({ heroImage, heroHeading, heroText, heroPhone, children }) => {
  // Theme for global styles
  const theme = {
    content: {
      width: '1024px',
      minWidth: '345px',
      maxWidth: '95vw',
    },
    colors: {
      background: '#E3DFDC',
      background_dark: '#cec7b7',
      background_light: '#fbfbfb',
      button: '#22526c',
      button_light: '#e3dfdc',
      faq: '#65673b',
      heading: '#903e23',
      text: '#737373',
      text_beige: '#cec7b7',
      text_dark: '#3d3d3d',
      text_light: '#e3dfdc',
      text_white: '#fcfcfc',
    },
  };

  return (
    <ThemeProvider theme={theme}>
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
