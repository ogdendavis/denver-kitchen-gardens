import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import Layout from '../components/layout';

const Work = () => {
  const data = useStaticQuery(graphql`
    query workQuery {
      content: markdownRemark(
        fileAbsolutePath: { regex: "//cms/pages/work.md/" }
      ) {
        frontmatter {
          title
          image
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
        alt="image"
      />
      <main dangerouslySetInnerHTML={{ __html: data.content.html }} />
    </Layout>
  );
};

export default Work;
