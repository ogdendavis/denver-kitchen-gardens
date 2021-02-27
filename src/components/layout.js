import React from 'react';

import 'normalize.css';

import Nav from './nav';

const Layout = ({ children }) => {
  return (
    <>
      <Nav />
      <main>{children}</main>
    </>
  );
};

export default Layout;
