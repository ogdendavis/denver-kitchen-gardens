import React, { useState, useEffect } from 'react';
import styled, { ThemeProvider } from 'styled-components';

import 'normalize.css';

import BigHat from './helmet';
import Nav from './nav';
import Header from './header';
import Footer from './footer';
import Modal from './modal';
import ViewportProvider from '../context/viewport';

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
    font-weight: 400;
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

const Layout = ({
  heroImage,
  heroImageMobile,
  heroHeading,
  heroText,
  heroPhone,
  children,
  location,
}) => {
  // Theme for global styles
  const theme = {
    content: {
      width: '85vw',
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
      text_dark: '#3d3d3d',
      text_white: '#fcfcfc',
      orange: '#cd8b00',
    },
    modalBg: 'linear-gradient(rgba(61, 61, 61, 0.8), rgba(61, 61, 61, 0.8))', // text_dark with 80% opacity
  };

  /*
   * Control modal display
   */
  // State for modal toggle
  const [modalVal, setModalVal] = useState(false);

  // Only check once, on initial component load
  useEffect(() => {
    // Get query params individually from location
    const queryParams = location.search
      .split('?')
      .slice(1)
      .map(str => {
        // Param strings are in format [key]=[value], so split them...
        const [key, value] = str.split('=');
        // ...and return an object with the param formatted!
        // const retObj = {};
        // retObj[key] = val;
        return {
          key: key,
          value: value,
        };
      });
    // If there's a modal param in the array, find it to pass to Modal
    const modalParam = queryParams.find(x => x.key === 'modal');
    // If a parameter is present, set the modal value!
    if (modalParam) {
      setModalVal(modalParam.value);
    }
  }, [location]);

  return (
    <ThemeProvider theme={theme}>
      <BigHat
        subTitle={heroHeading}
        pageImage={heroImage}
        location={location}
      />
      <ThemeConsumer>
        <ViewportProvider>
          <Nav />
          <Header
            heroImage={heroImage}
            heroImageMobile={heroImageMobile}
            heading={heroHeading}
            text={heroText}
            phone={heroPhone}
          />
          <Main>{children}</Main>
          <Footer />
        </ViewportProvider>
      </ThemeConsumer>
      <Modal
        close={() => {
          setModalVal(false);
        }}
        val={modalVal}
      />
    </ThemeProvider>
  );
};

export default Layout;
