import React from 'react';

import Layout from '../layout';

const ServicePage = props => {
  // Extract CMS info passed from page creation in gatsby-node
  const { content } = props.pageContext;

  return (
    <Layout>
      <h1>{content.frontmatter.title}</h1>
      <img
        src={content.frontmatter.image}
        style={{ maxHeight: '30vh' }}
        alt={content.frontmatter.image_alt}
      />
      <main dangerouslySetInnerHTML={{ __html: content.html }} />
    </Layout>
  );
};

export default ServicePage;
