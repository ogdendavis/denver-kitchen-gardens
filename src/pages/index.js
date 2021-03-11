import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import Layout from '../components/layout';

const Home = () => {
  const data = useStaticQuery(graphql`
    query homeQuery {
      content: markdownRemark(
        fileAbsolutePath: { regex: "//cms/pages/home.md/" }
      ) {
        frontmatter {
          title
          hero
          hero_alt
        }
        html
      }
    }
  `);

  return (
    <Layout>
      <h1>{data.content.frontmatter.title}</h1>
      <img
        src={data.content.frontmatter.hero}
        alt={data.content.frontmatter.hero_alt}
      />
      <main dangerouslySetInnerHTML={{ __html: data.content.html }} />
    </Layout>
  );
};

export default Home;
