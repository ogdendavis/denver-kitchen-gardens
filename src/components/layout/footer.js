import React from 'react';
import styled from 'styled-components';
import { useStaticQuery, graphql } from 'gatsby';

import Button from '../button';
import InstaIcon from '../../images/icons/instagram.icon.svg';
import ServicePageLinks from '../services/servicePageLinks';
import Footerchoke from '../../images/icons/footerchoke.icon.svg';

const FooterContainer = styled.footer`
  background: ${({ theme }) => theme.colors.background_dark};
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
`;

const FooterLeft = styled.div`
  padding: 7.75rem 2rem 5rem 8.875rem;
`;

const FooterLinks = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  margin-top: 1.5rem;
`;

const IconContainer = styled.div`
  margin-left: 2rem;

  a {
    display: flex;
    flex-flow: row wrap;
    align-items: center;

    &:hover {
      text-decoration-color: ${props => props.theme.colors.text_dark};
    }
  }

  svg {
    width: 2rem;
  }

  span {
    margin-left: 1rem;
    font-size: 1.125rem;
    text-decoration: none;
    color: ${props => props.theme.colors.text_dark};
  }
`;

const FooterRight = styled.div`
  display: flex;
`;

const FooterServices = styled.div`
  max-width: 10rem;
  padding-top: 7.75rem;

  .footerHeading {
    text-transform: none;
    color: ${props => props.theme.colors.green};
    margin-bottom: 0;
  }

  a {
    display: block;
    margin: 1.5rem 0;
    color: ${({ theme }) => theme.colors.text_dark};
    font-size: 0.95rem;
  }
`;

const FooterchokeContainer = styled.div`
  svg {
    position: relative;
    bottom: -2rem;
    max-width: 500px;
  }
`;

const FooterBottom = styled.div`
  background: ${({ theme }) => theme.colors.button};
  color: ${({ theme }) => theme.colors.text_white};
  font-size: 0.8rem;
  text-align: center;
  padding: 1.5rem;
  position: relative;
  z-index: 10;
`;

const Footer = () => {
  const data = useStaticQuery(graphql`
    query footerQuery {
      social: markdownRemark(
        fileAbsolutePath: { regex: "//cms/general/contact.md/" }
      ) {
        frontmatter {
          instagram
        }
      }
    }
  `);

  return (
    <>
      <FooterContainer>
        <FooterLeft>
          <h2>Denver Kitchen Gardens</h2>
          <FooterLinks>
            <Button light="true" to="/contact">
              Contact
            </Button>
            <IconContainer>
              <a
                href={data.social.frontmatter.instagram}
                target="_blank"
                rel="noreferrer"
              >
                <InstaIcon />
                <span>Follow us on Instagram</span>
              </a>
            </IconContainer>
          </FooterLinks>
        </FooterLeft>
        <FooterRight>
          <FooterServices>
            <div>
              <h3 className="footerHeading">Services</h3>
              <ServicePageLinks />
            </div>
          </FooterServices>
          <FooterchokeContainer>
            <Footerchoke />
          </FooterchokeContainer>
        </FooterRight>
      </FooterContainer>
      <FooterBottom>
        {`@ ${new Date().getFullYear()} Denver Kitchen Gardens. All rights reserved.`}
      </FooterBottom>
    </>
  );
};

export default Footer;
