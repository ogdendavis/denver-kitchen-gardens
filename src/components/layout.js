import React from 'react';

import 'normalize.css';

import Nav from './nav';
import Footer from './footer';

const Layout = ({ children }) => {
  return (
    <>
      <Nav />
      <div>{children}</div>
      <Footer />
    </>
  );
};

export default Layout;
