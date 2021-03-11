import React from 'react';
import styled from 'styled-components';
import { Link, useStaticQuery, graphql } from 'gatsby';

import Layout from '../components/layout';

const TempLink = styled(Link)`
  display: inline-block;
  margin: 1rem;
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
      subpages: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "//cms/service_pages/" } }
      ) {
        edges {
          node {
            frontmatter {
              published
              title
            }
          }
        }
      }
    }
  `);

  // Filter out unbpulished service pages
  const servicePages = data.subpages.edges.filter(
    x => x.node.frontmatter.published === true
  );
  // Link path created in same way as slug is created in gatsby-node
  const serviceLinks = servicePages.map(({ node }) => (
    <TempLink
      key={`nav-${node.frontmatter.title}`}
      to={`/services/${node.frontmatter.title
        .toLowerCase()
        .split(' ')
        .join('-')}`}
    >
      {node.frontmatter.title}
    </TempLink>
  ));

  return (
    <Layout>
      <h1>{data.content.frontmatter.title}</h1>
      <img
        src={data.content.frontmatter.image}
        style={{ maxHeight: '30vh' }}
        alt={data.content.frontmatter.image_alt}
      />
      <main dangerouslySetInnerHTML={{ __html: data.content.html }} />
      {serviceLinks}
    </Layout>
  );
};

export default Services;
