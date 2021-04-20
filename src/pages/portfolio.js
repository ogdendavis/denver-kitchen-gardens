import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import Layout from '../components/layout';
import Gallery from '../components/gallery';

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
      <Gallery
        limitImages={30}
        ibText={data.content.frontmatter.interbutton_text}
        ibLink={data.content.frontmatter.interbutton_link}
        bbText={data.content.frontmatter.bottombutton_text}
        bbLink={data.content.frontmatter.bottombutton_link}
      />
    </Layout>
  );
};

export default Portfolio;
