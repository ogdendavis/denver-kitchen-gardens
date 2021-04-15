import React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';

const ServicePageLinks = ({ keyBase = false }) => {
  const data = useStaticQuery(graphql`
    query servicePagesQuery {
      pages: allMarkdownRemark(
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

  // Filter out unpublished pages
  const published = data.pages.edges.filter(
    x => x.node.frontmatter.published === true
  );

  // If no keyBase given, make a random one (3 digits)
  const kb = keyBase ? keyBase : Math.random().toString(16).substr(2, 3);

  // Link path created in same way as slug is created in gatsby-node
  const serviceLinks = published.map(({ node }) => (
    <Link
      key={`${kb}-${node.frontmatter.title}`}
      to={`/services/${node.frontmatter.title
        .toLowerCase()
        .split(' ')
        .join('-')}`}
    >
      {node.frontmatter.title}
    </Link>
  ));

  return <>{serviceLinks}</>;
};

export default ServicePageLinks;
