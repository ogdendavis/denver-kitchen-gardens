import React from 'react';
import styled from 'styled-components';
import { useStaticQuery, graphql } from 'gatsby';

import Layout from '../components/layout';
import Header from '../components/header';
import ServicePageLinks from '../components/servicePageLinks';

const ServiceLinksContainer = styled.div`
  a {
    display: inline-block;
    margin: 1rem;
  }
`;

const Services = () => {
  const data = useStaticQuery(graphql`
    query servicesQuery {
      content: markdownRemark(
        fileAbsolutePath: { regex: "//cms/pages/services.md/" }
      ) {
        frontmatter {
          title
          hero
          hero_text
        }
        html
      }
    }
  `);

  return (
    <Layout>
      <Header
        heroImage={data.content.frontmatter.hero}
        heading={data.content.frontmatter.title}
        text={data.content.frontmatter.hero_text}
      />
      <main dangerouslySetInnerHTML={{ __html: data.content.html }} />
      <ServiceLinksContainer>
        <ServicePageLinks />
      </ServiceLinksContainer>
    </Layout>
  );
};

export default Services;