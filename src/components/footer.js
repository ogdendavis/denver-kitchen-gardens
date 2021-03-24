import React from 'react';
import styled from 'styled-components';
import { useStaticQuery, graphql } from 'gatsby';
import { StaticImage } from 'gatsby-plugin-image';

import Button from './button';
import InstaIcon from '../images/icons/instagram.icon.svg';
import ServicePageLinks from './servicePageLinks';

const FooterContainer = styled.footer`
  margin-top: 2rem;
  background: ${({ theme }) => theme.colors.background_dark};
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  flex-flow: row wrap;
  padding-top: 5rem;
  justify-content: space-between;
`;

const FooterLeft = styled.div`
  padding: 0 2rem 5rem 5rem;
  width: calc(50vw - 7rem);
`;

const FooterText = styled.div`
  max-width: 70%;
`;

const FooterLinks = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  margin-top: 1.5rem;
  padding: 0 1rem;
`;

const IconContainer = styled.div`
  svg {
    width: 40px;
  }
  margin-right: 3rem;
`;

const FooterRight = styled.div`
  color: ${({ theme }) => theme.colors.text_dark};
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;

  a {
    display: block;
    margin: 0.5rem 0;
    color: ${({ theme }) => theme.colors.text_dark};
  }

  .footichoke {
    margin: 0 1rem -0.5rem 2rem;
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
      content: markdownRemark(
        fileAbsolutePath: { regex: "//cms/general/site.md/" }
      ) {
        frontmatter {
          footer_logo
        }
        html
      }
    }
  `);

  return (
    <>
      <FooterContainer>
        <FooterLeft>
          <h2>Denver Kitchen Gardens</h2>
          <FooterText dangerouslySetInnerHTML={{ __html: data.content.html }} />
          <FooterLinks>
            <IconContainer>
              <a
                href={data.social.frontmatter.instagram}
                target="_blank"
                rel="noreferrer"
              >
                <InstaIcon />
              </a>
            </IconContainer>
            <Button light={true} to="/contact">
              Contact
            </Button>
          </FooterLinks>
        </FooterLeft>
        <FooterRight>
          <div>
            <h3 className="reset">Services</h3>
            <ServicePageLinks />
          </div>
          <StaticImage
            src="../images/TEMP_footerchoke.png"
            alt="Artichoke illustration"
            className="footichoke"
          />
        </FooterRight>
      </FooterContainer>
      <FooterBottom>
        {`@ ${new Date().getFullYear()} Denver Kitchen Gardens. All rights reserved.`}
      </FooterBottom>
    </>
  );
};

export default Footer;
