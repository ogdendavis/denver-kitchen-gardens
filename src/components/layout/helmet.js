import React from 'react';

import { Helmet } from 'react-helmet';

// Right now, just imports Google fonts
const BigHat = () => (
  <Helmet>
    <link rel="preconnect" href="https://fonts.gstatic.com" />
    <link
      href="https://fonts.googleapis.com/css2?family=Lora:wght@300;400;600;700&family=Montserrat:wght@400;500;600;700&display=swap"
      rel="stylesheet"
    />
  </Helmet>
);

export default BigHat;
