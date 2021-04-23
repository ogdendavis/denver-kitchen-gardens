import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import Layout from '../components/layout';

const Services = ({ location }) => {
  const data = useStaticQuery(graphql`
    query servicesQuery {
      content: markdownRemark(
        fileAbsolutePath: { regex: "//cms/pages/services.md/" }
      ) {
        frontmatter {
          title
          hero
          hero_text
          services_heading
          nextsteps_heading
          nextsteps_copy
        }
      }
    }
  `);

  return (
    <Layout
      heroImage={data.content.frontmatter.hero}
      heroHeading={data.content.frontmatter.title}
      heroText={data.content.frontmatter.hero_text}
      location={location}
    >
      <main dangerouslySetInnerHTML={{ __html: data.content.html }} />
    </Layout>
  );
};

export default Services;
