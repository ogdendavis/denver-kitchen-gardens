import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';

import Layout from '../components/layout';

const AboutContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  margin: 5rem auto;
  width: ${props => props.theme.content.width};
  max-width: ${props => props.theme.content.maxWidth};
`;

const AboutCopy = styled.article`
  color: ${props => props.theme.colors.text};
  width: 47%;
  min-width: ${props => props.theme.content.minWidth};

  h1 {
    margin-top: 0;
  }

  blockquote {
    margin: 3rem 0;

    p {
      font-size: 2.25rem;
      font-family: Lora;
      font-weight: 300;
      letter-spacing: 0.88px;
      line-height: 2.75rem;
    }
  }
`;

const AboutImages = styled.div`
  width: 48%;
  min-width: ${props => props.theme.content.minWidth};
`;

const ProfileImage = styled.img`
  display: block;
  margin-bottom: 1.75rem;
  width: 100%;
`;

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
          content_heading
          content_copy
          image_1
          image_2
        }
      }
    }
  `);

  // Point at content object once
  const content = data.content.frontmatter;

  return (
    <Layout
      heroImage={content.hero}
      heroHeading={content.title}
      heroText={content.hero_text}
    >
      <AboutContainer>
        <AboutCopy>
          <h1>{content.content_heading}</h1>
          <ReactMarkdown>{content.content_copy}</ReactMarkdown>
        </AboutCopy>
        <AboutImages>
          <ProfileImage src={content.image_1} />
          <ProfileImage src={content.image_2} />
        </AboutImages>
      </AboutContainer>
    </Layout>
  );
};

export default About;
