import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import Layout from '../components/layout';
import Header from '../components/header';

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
    <Layout>
      <Header
        heroImage={data.content.frontmatter.hero}
        heading={data.content.frontmatter.title}
        text={data.content.frontmatter.hero_text}
      />
      <main dangerouslySetInnerHTML={{ __html: data.content.html }} />
    </Layout>
  );
};

export default About;
