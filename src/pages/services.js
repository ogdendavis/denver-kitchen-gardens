import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';

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
      heroHeading={content.title}
      heroText={content.hero_text}
      location={location}
    >
      <PreviewsContainer>
        <h2>{content.services_heading}</h2>
        <ServicepageServicePreviews />
      </PreviewsContainer>
    </Layout>
  );
};

export default Services;
