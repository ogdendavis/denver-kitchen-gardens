import React from 'react';
import styled from 'styled-components';
import { useStaticQuery, graphql } from 'gatsby';

import Layout from '../components/layout';
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
          image
          image_alt
        }
        html
      }
    }
  `);

  return (
    <Layout>
      <h1>{data.content.frontmatter.title}</h1>
      <img
        src={data.content.frontmatter.image}
        style={{ maxHeight: '30vh' }}
        alt={data.content.frontmatter.image_alt}
      />
      <main dangerouslySetInnerHTML={{ __html: data.content.html }} />
      <ServiceLinksContainer>
        <ServicePageLinks />
      </ServiceLinksContainer>
    </Layout>
  );
};

export default Services;
