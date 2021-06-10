import React from 'react';
import styled from 'styled-components';
import { useStaticQuery, graphql } from 'gatsby';

import Button from '../button';
import InstaIcon from '../../images/icons/instagram.icon.svg';
import ServicePageLinks from '../services/servicePageLinks';

import { useViewport } from '../context/viewport';

const FooterBackground = styled.div`
  background: ${({ theme }) => theme.colors.background_dark};
`;

const FooterContainer = styled.footer`
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  margin: 0 auto;
  padding-top: 3rem;
  width: ${({ theme }) => theme.content.width};
  min-width: ${({ theme }) => theme.content.minWidth};

  @media only screen and (max-width: 900px) {
    padding-top: 0;
  }
`;

const FooterLeft = styled.div`
  padding: 3rem 0 5rem 0;
  text-align: center;
  width: 32rem;

  /* Styles for once elements start to stack */
  @media only screen and (max-width: 1050px) {
    width: auto;
    h2.footerHeading {
      font-size: 1.5rem;
      margin-bottom: 2rem;
    }
  }

  /* Styles for once FooterRight is hidden */
  @media only screen and (max-width: 650px) {
    margin: 0 auto;
    padding: 2rem 0 2.5rem;
  }
`;

const FooterLinks = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: flex-start;
  margin-top: 1.5rem;

  /* Styles for once button and icon stack */
  @media only screen and (max-width: 1200px) {
    display: block;
  }
`;

const IconContainer = styled.div`
  margin-left: 2rem;

  a {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;

    &:hover {
      text-decoration-color: ${props => props.theme.colors.text_dark};
    }
  }

  svg {
    flex-shrink: 0;
    width: 2rem;
  }

  span {
    margin-left: 1rem;
    font-size: 1.125rem;
    text-decoration: none;
    color: ${props => props.theme.colors.text_dark};
  }

  /* Styles for once this wraps below button */
  @media only screen and (max-width: 1200px) {
    margin: 2rem auto 0;
    width: 9rem;

    a {
      justify-content: center;
    }

    span {
      font-size: 0.875rem;
      font-weight: 600;
      text-align: left;
    }
  }
`;

const FooterRight = styled.div`
  display: flex;
  position: relative;
  left: 5rem;

  /* Prevent overflow caused by left offset */
  @media only screen and (max-width: 1050px) {
    left: 2rem;
  }

  /* Element disappears at 650px width */
  @media only screen and (max-width: 650px) {
    display: none;
    visibility: hidden;
  }
`;

const FooterServices = styled.div`
  padding-top: 3rem;

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
  display: flex;
  align-items: flex-end;

  img {
    max-width: 35vw;
    min-width: 300px;
  }
`;

const FooterBottom = styled.div`
  background: ${({ theme }) => theme.colors.blue};
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

  // Grab viewport width from context
  const { width } = useViewport();

  return (
    <FooterBackground>
      <FooterContainer>
        <FooterLeft>
          <h2 className="footerHeading">Denver Kitchen Gardens</h2>
          <FooterLinks>
            <Button
              to="/contact"
              variant={width && width > 500 ? 'light' : 'green'}
            >
              Contact
            </Button>
            <IconContainer>
              <a
                href={data.social.frontmatter.instagram}
                target="_blank"
                rel="noreferrer"
              >
                <InstaIcon />
                <span>Follow me on Instagram</span>
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
            <img src="/images/FooterArtichoke.png" alt="" />
          </FooterchokeContainer>
        </FooterRight>
      </FooterContainer>
      <FooterBottom>
        {`@ ${new Date().getFullYear()} Denver Kitchen Gardens. All rights reserved.`}
      </FooterBottom>
    </FooterBackground>
  );
};

export default Footer;
