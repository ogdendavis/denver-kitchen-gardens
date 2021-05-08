import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';

import Layout from '../components/layout';
import ServicepageServicePreviews from '../components/services/servicepageServicePreviews';

const PreviewsContainer = styled.section`
  background: ${props => props.theme.colors.blue};
  color: ${props => props.theme.colors.text_white};
  padding: 4rem 0;

  h2 {
    color: ${props => props.theme.colors.background_dark};
    font-size: 3.5rem;
    font-weight: 500;
    letter-spacing: 0;
    margin: 0 auto 3.5rem;
    text-align: center;
    text-transform: none;

    &:after {
      background: ${props => props.theme.colors.background};
      content: '';
      display: block;
      height: 1px;
      margin: 2rem auto;
      width: 4rem;
    }
  }

  /* Mobile styles (same breakpoint as hero) */
  @media only screen and (max-width: 700px) {
    padding-bottom: 2rem;
    h2 {
      font-size: 2.75rem;
    }
  }
`;

const NextStepsContainer = styled.section`
  box-sizing: border-box;
  margin: 6.125rem auto 3rem;
  text-align: center;
  width: ${props => props.theme.content.width};
  max-width: ${props => props.theme.content.maxWidth};
  min-width: ${props => props.theme.content.minWidth};

  h2 {
    margin: 0 auto 3rem;
  }

  p {
    box-sizing: border-box;
    color: ${props => props.theme.colors.text};
    margin: 2rem auto;
    max-width: 50rem;
  }

  img {
    margin: 1.25rem auto 3.25rem;
    max-width: 100%;
  }
`;

const Services = ({ location }) => {
  const data = useStaticQuery(graphql`
    query servicesQuery {
      content: markdownRemark(
        fileAbsolutePath: { regex: "//cms/pages/services.md/" }
      ) {
        frontmatter {
          title
          hero
          hero_mobile
          hero_text
          services_heading
          nextsteps_heading
          nextsteps_copy
        }
      }
    }
  `);

  // Easy reference to frontmatter
  const content = data.content.frontmatter;

  return (
    <Layout
      heroImage={content.hero}
      heroImageMobile={content.hero_mobile}
      heroHeading={content.title}
      heroText={content.hero_text}
      location={location}
    >
      <PreviewsContainer>
        <h2>{content.services_heading}</h2>
        <ServicepageServicePreviews />
      </PreviewsContainer>

      <NextStepsContainer>
        <h2>{content.nextsteps_heading}</h2>
        <ReactMarkdown>{content.nextsteps_copy}</ReactMarkdown>
        <img src="/images/garlic.png" alt="" />
      </NextStepsContainer>
    </Layout>
  );
};

export default Services;
