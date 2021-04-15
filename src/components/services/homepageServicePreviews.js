import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';

import ServicePreview from './servicePreview';

// Queries for services that should be listed on homepage, and returns group of rendered previews
const HomepageServicePreviews = () => {
  const data = useStaticQuery(graphql`
    query homepageServicesQuery {
      services: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "//cms/service_pages/" } }
      ) {
        edges {
          node {
            frontmatter {
              published
              preview_on_homepage
              title
              preview_text
              preview_image
            }
          }
        }
      }
    }
  `);

  // Keep only services that are published and marked for homepage, and surface the frontmatter object
  const servicesToPreview = data.services.edges
    .filter(
      edge =>
        edge.node.frontmatter.published &&
        edge.node.frontmatter.preview_on_homepage
    )
    .map(filtered => filtered.node.frontmatter);

  // Loop over filtered services and render the previews
  const servicePreviews = servicesToPreview.map(service => (
    <ServicePreview
      key={`preview-${service.title}`}
      title={service.title}
      text={service.preview_text}
      image={service.preview_image}
    />
  ));

  return <>{servicePreviews}</>;
};

export default HomepageServicePreviews;
