import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import styled from 'styled-components';

import ServicePreview from './servicePreview';

const ServicepagePreviewsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  flex-flow: row wrap;
  margin: 0 auto;
  width: ${props => props.theme.content.width};
  max-width: ${props => props.theme.content.maxWidth};
`;

// Queries for all services, and returns group of rendered previews
const ServicepageServicePreviews = () => {
  const data = useStaticQuery(graphql`
    query servicepageServicesQuery {
      services: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "//cms/service_pages/" } }
      ) {
        edges {
          node {
            frontmatter {
              published
              title
              preview_heading
              preview_text
              preview_image
            }
          }
        }
      }
    }
  `);

  // Surface the frontmatter object
  const services = data.services.edges.map(
    filtered => filtered.node.frontmatter
  );

  // Loop over filtered services and render the previews
  const servicePreviews = services.map(service => (
    <ServicePreview
      key={`preview-sp-${service.title}`}
      title={service.title}
      heading={service.preview_heading}
      text={service.preview_text}
      image={service.preview_image}
      variant="large"
    />
  ));

  // Add general service preview
  servicePreviews.push(
    <ServicePreview
      key="preview-sp-general"
      title="contact"
      heading="Other Services"
      text="Looking for something specific? Please reach out to see if we can help."
      image="/images/uploads/garlic.png"
      variant="large"
    />
  );

  return (
    <ServicepagePreviewsContainer>
      {servicePreviews}
    </ServicepagePreviewsContainer>
  );
};

export default ServicepageServicePreviews;
