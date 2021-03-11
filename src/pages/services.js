import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import Layout from '../components/layout';

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
    </Layout>
  );
};

export default Services;
