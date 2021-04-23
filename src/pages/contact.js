import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';

import Layout from '../components/layout';

const ContactContainer = styled.div`
  margin: 4rem auto;
  width: calc(${props => props.theme.content.width} * 0.55);
  max-width: ${props => props.theme.content.maxWidth};
  min-width: ${props => props.theme.content.minWidth};

  h2 {
    color: ${props => props.theme.colors.green};
    font-size: 1.5rem;
    margin-top: 0;
    text-transform: none;
  }
`;

const ContactForm = styled.form`
  input,
  textarea {
    box-sizing: border-box;
    border: 0;
    color: #111;
    font-weight: 600;
    margin-bottom: 1rem;
    padding: 1rem;
    width: 100%;

    ::placeholder {
      font-weight: 600;
    }
  }

  input[type='text'] {
    display: inline-block;
    width: calc(50% - 0.5rem);

    &:nth-child(2) {
      margin-right: 1rem;
    }
  }

  textarea {
    min-height: 13rem;
  }

  button {
    border: 0;
    background: ${props => props.theme.colors.blue};
    color: ${props => props.theme.colors.text_white};
    font-weight: 600;
    padding: 1rem 2.5rem;
    text-transform: uppercase;
    transition: background 0.5s ease, color 0.5s ease;
    width: 100%;

    &:hover {
      background: ${props => props.theme.colors.green};
      color: ${props => props.theme.colors.text_white};
      cursor: pointer;
    }
  }
`;

const Contact = ({ location }) => {
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
      location={location}
    >
      <ContactContainer>
        <h2>{data.content.frontmatter.form_heading}</h2>
        <ContactForm
          name="contact"
          method="POST"
          data-netlify="true"
          action="/contact?modal=contactSuccess"
        >
          <input type="hidden" name="form-name" value="contact" />
          <input type="text" name="first_name" placeholder="FIRST NAME" />
          <input type="text" name="last_name" placeholder="LAST NAME" />
          <input type="email" name="email" placeholder="EMAIL ADDRESS" />
          <input type="tel" name="phone" placeholder="PHONE NUMBER" />
          <textarea name="message" placeholder="HOW CAN I HELP?"></textarea>
          <button type="submit">{data.content.frontmatter.form_button}</button>
        </ContactForm>
      </ContactContainer>
    </Layout>
  );
};

export default Contact;
