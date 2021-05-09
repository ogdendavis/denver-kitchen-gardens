import React, { useState, useEffect } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';

import Layout from '../components/layout';

import { useViewport } from '../components/context/viewport';

const AboutContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  margin: 5rem auto;
  width: ${props => props.theme.content.width};
  max-width: ${props => props.theme.content.maxWidth};

  /* Mobile styles (same breakpoint as hero) */
  @media only screen and (max-width: 700px) {
    margin: 2.75rem auto;
  }
`;

const AboutCopy = styled.article`
  color: ${props => props.theme.colors.text};
  width: 47%;
  min-width: ${props => props.theme.content.minWidth};

  h2 {
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

  /* Mobile styling (breakpoint matches that used below) */
  @media only screen and (max-width: 760px) {
    width: 100%;

    img {
      display: block;
      margin: 0 auto 1.75rem;
      max-width: 25rem;
      width: 100%;
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

const About = ({ location }) => {
  const data = useStaticQuery(graphql`
    query aboutQuery {
      content: markdownRemark(
        fileAbsolutePath: { regex: "//cms/pages/about.md/" }
      ) {
        frontmatter {
          title
          hero
          hero_mobile
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

  // Set breakpoint (in px) at which to switch to mobile layout
  // This is when the pictures are about to stack under the text in desktop view
  const breakpoint = 760;

  // Get width from context
  const { width } = useViewport();

  // State for whether or not to use mobile
  const [useMobile, setUseMobile] = useState(true);

  // When width changes, re-check useMobile
  useEffect(() => {
    setUseMobile(width <= breakpoint);
  }, [width]);

  /*
   * Inject second image into content_copy for
   * mobile view
   */

  // Start by finding the blockquote (indicated by >)
  const bqStartIndex = content.content_copy.search('>');

  // Split content_copy into two parts: before blockquote, then blockquote and all after
  const beforeBq = content.content_copy.slice(0, bqStartIndex);
  const bqAndAfter = content.content_copy.slice(bqStartIndex);

  // Markdown string to display image_2
  // Whitespace at end is intentional
  const imageTwo = `![](${content.image_2})

  `;

  // Put the pieces together to form a valid markdown string with image inserted!
  const mobileMarkdown = beforeBq + imageTwo + bqAndAfter;

  return (
    <Layout
      heroImage={content.hero}
      heroImageMobile={content.hero_mobile}
      heroHeading={content.title}
      heroText={content.hero_text}
      location={location}
    >
      {
        // Display desktop markup at widths above 700px
        !useMobile && (
          <AboutContainer>
            <AboutCopy>
              <h2>{content.content_heading}</h2>
              <ReactMarkdown>{content.content_copy}</ReactMarkdown>
            </AboutCopy>
            <AboutImages>
              <ProfileImage src={content.image_1} />
              <ProfileImage src={content.image_2} />
            </AboutImages>
          </AboutContainer>
        )
      }
      {
        // Display mobile layout at widths at or below 700px
        useMobile && (
          <AboutContainer>
            <AboutCopy>
              <h2>{content.content_heading}</h2>
              <ProfileImage src={content.image_1} />
              <ReactMarkdown>{mobileMarkdown}</ReactMarkdown>
            </AboutCopy>
          </AboutContainer>
        )
      }
    </Layout>
  );
};

export default About;
