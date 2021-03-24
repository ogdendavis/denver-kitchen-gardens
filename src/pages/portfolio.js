import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import Layout from '../components/layout';
import Header from '../components/header';

const Portfolio = () => {
  const data = useStaticQuery(graphql`
    query portfolioQuery {
      content: markdownRemark(
        fileAbsolutePath: { regex: "//cms/pages/work.md/" }
      ) {
        frontmatter {
          title
          hero_text
        }
        html
      }
    }
  `);

  return (
    <Layout>
      <Header
        heading={data.content.frontmatter.title}
        text={data.content.frontmatter.hero_text}
      />
      <main dangerouslySetInnerHTML={{ __html: data.content.html }} />
    </Layout>
  );
};

export default Portfolio;
