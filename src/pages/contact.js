import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import Layout from '../components/layout';

const Contact = () => {
  const data = useStaticQuery(graphql`
    query contactQuery {
      content: markdownRemark(
        fileAbsolutePath: { regex: "//cms/pages/contact.md/" }
      ) {
        frontmatter {
          title
          hero
          hero_text
          form_heading
          form_button
        }
      }
      address: markdownRemark(
        fileAbsolutePath: { regex: "//cms/general/contact.md/" }
      ) {
        frontmatter {
          phone
        }
      }
    }
  `);

  return (
    <Layout
      heroImage={data.content.frontmatter.hero}
      heroHeading={data.content.frontmatter.title}
      heroText={data.content.frontmatter.hero_text}
      heroPhone={data.address.frontmatter.phone}
    >
      <form name="contact" method="POST" data-netlify="true">
        <input type="hidden" name="form-name" value="contact" />
        <p>
          <label>
            Your Name: <input type="text" name="name" />
          </label>
        </p>
        <p>
          <label>
            Your Email: <input type="email" name="email" />
          </label>
        </p>
        <p>
          <label>
            Message: <textarea name="message"></textarea>
          </label>
        </p>
        <p>
          <button type="submit">Send</button>
        </p>
      </form>
      <img
        src={data.content.frontmatter.image}
        style={{ maxHeight: '20vh' }}
        alt={data.content.frontmatter.image_alt}
      />
      <div dangerouslySetInnerHTML={{ __html: data.content.html }} />
    </Layout>
  );
};

export default Contact;
