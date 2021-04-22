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

const AnotherImage = styled.img`
  display: block;
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
          profile_pic
          more_pics {
            image
          }
        }
      }
    }
  `);

  // Point at content object once
  const content = data.content.frontmatter;

  // Loop over more_pics to generate images
  const moreImages = content.more_pics.map(({ image }) => (
    <AnotherImage key={`another-${image}`} src={image} />
  ));

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
          <ProfileImage src={content.profile_pic} />
          {moreImages}
        </AboutImages>
      </AboutContainer>
    </Layout>
  );
};

export default About;
