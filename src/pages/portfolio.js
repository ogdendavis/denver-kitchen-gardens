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
          hero_text
          interbutton_text
          interbutton_link
          bottombutton_text
          bottombutton_link
        }
      }
    }
  `);

  return (
    <Layout
      heroHeading={data.content.frontmatter.title}
      heroText={data.content.frontmatter.hero_text}
    >
      <main dangerouslySetInnerHTML={{ __html: data.content.html }} />
    </Layout>
  );
};

export default Portfolio;
