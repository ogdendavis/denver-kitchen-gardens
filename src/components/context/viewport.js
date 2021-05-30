import React, { createContext, useContext, useState, useEffect } from 'react';

// Create context for viewportWidth
const viewportContext = createContext();

// Component to provide viewport context to children
const ViewportProvider = ({ children }) => {
  // For SSR to work, we need to check if we're in a browser before using window object
  const inBrowser = typeof window !== 'undefined';

  // State to hold viewport width
  const [viewportWidth, setViewportWidth] = useState(
    inBrowser ? window.innerWidth : 0
  );

  // State to hold viewport height
  const [viewportHeight, setViewportHeight] = useState(
    inBrowser ? window.innerHeight : 0
  );

  // Function to fire when viewport is resized
  const resizeListener = () => {
    // All we need to do is change the width and height in state
    setViewportWidth(window.innerWidth);
    setViewportHeight(window.innerHeight);
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

  // Wrap children in provider so they can access value
  return (
    <viewportContext.Provider
      value={{ width: viewportWidth, height: viewportHeight }}
    >
      {children}
    </viewportContext.Provider>
  );
};

export default ViewportProvider;

// Function for child components to use to access context
export const useViewport = () => {
  // Grab context to use
  const context = useContext(viewportContext);
  // If no valid context, return false
  if (context === undefined) {
    return false;
  }
  // Otherwise, return context!
  return context;
};
