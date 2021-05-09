import React from 'react';

// import custom context provider
import ViewportProvider from './src/components/context/viewport';

// Wrap gatsby root element in provider so it's available to all pages
export const wrapRootElement = ({ element }) => (
  <ViewportProvider>{element}</ViewportProvider>
);
