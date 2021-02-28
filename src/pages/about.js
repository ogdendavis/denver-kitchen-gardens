import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import Layout from '../components/layout';

const About = () => {
  const data = useStaticQuery(graphql`
    query aboutQuery {
      content: markdownRemark(
        fileAbsolutePath: { regex: "//cms/pages/about.md/" }
      ) {
        frontmatter {
          title
          image
        }
        html
      }
    }
  `);
  console.log(data.content.frontmatter);

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

export default About;
