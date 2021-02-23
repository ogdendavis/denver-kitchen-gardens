import React from 'react';

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
