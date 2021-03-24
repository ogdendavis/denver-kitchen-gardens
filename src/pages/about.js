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
          hero
          hero_text
        }
        html
      }
    }
  `);

  return (
    <Layout
      heroImage={data.content.frontmatter.hero}
      heroHeading={data.content.frontmatter.title}
      heroText={data.content.frontmatter.hero_text}
    >
      <main dangerouslySetInnerHTML={{ __html: data.content.html }} />
    </Layout>
  );
};

export default About;
