import React from 'react';
import { ThemeProvider } from 'styled-components';

import 'normalize.css';

import Nav from './nav';
import Footer from './footer';

const Layout = ({ children }) => {
  // Theme for global styles
  const theme = {
    colors: {
      background: '#efedeb',
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
      <Nav />
      <div>{children}</div>
      <Footer />
    </ThemeProvider>
  );
};

export default Layout;
