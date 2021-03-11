import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import Layout from '../components/layout';

const Portfolio = () => {
  const data = useStaticQuery(graphql`
    query portfolioQuery {
      content: markdownRemark(
        fileAbsolutePath: { regex: "//cms/pages/work.md/" }
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

export default Portfolio;
