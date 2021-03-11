import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';

import InstaIcon from '../images/icons/instagram.icon.svg';

const FooterContainer = styled.footer`
  margin-top: 2rem;
  border-top: 1px solid black;
`;

const TempIconContainer = styled.div`
  svg {
    width: 40px;
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <h2>Denver Kitchen Gardens</h2>
      <p>
        This is filler text for the little paragraph under the heading in the
        footer. It shouldn't be very long.
      </p>
      <TempIconContainer>
        <a
          href="https://www.instagram.com/denver_kitchen_gardens/"
          target="_blank"
          rel="noreferrer"
        >
          <InstaIcon />
        </a>
      </TempIconContainer>
      <Link to="/contact">Contact</Link>
      <p>Sitemap here!</p>
    </FooterContainer>
  );
};

export default Footer;
