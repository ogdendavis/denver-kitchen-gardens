import React from 'react';
// import { useStaticQuery, graphql } from 'gatsby';

import Layout from '../components/layout';

const Services = () => {
  // const data = useStaticQuery(graphql`
  //   query workQuery {
  //     content: markdownRemark(
  //       fileAbsolutePath: { regex: "//cms/pages/work.md/" }
  //     ) {
  //       frontmatter {
  //         title
  //         image
  //       }
  //       html
  //     }
  //   }
  // `);
  const data = {
    content: {
      frontmatter: {
        title: 'Temp Services Data',
        image: 'nope.jpg',
        image_alt: 'Test Alt',
      },
      html: '<h2>CONTENT!</h2>',
    },
  };

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

export default Services;
