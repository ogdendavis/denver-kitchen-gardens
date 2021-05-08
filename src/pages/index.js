import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';

import Layout from '../components/layout';
import HomepageServicePreviews from '../components/services/homepageServicePreviews';
import Gallery from '../components/gallery';

const HomeContainer = styled.div`
  margin: 0 auto;

  section {
    margin: 5rem auto 0;
  }

  /* Mobile styles (same breakpoint as hero) */
  @media only screen and (max-width: 700px) {
    section {
      margin: 2rem auto 0;
    }
  }
`;

const IntroContainer = styled.section`
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  justify-content: space-between;
  width: ${props => props.theme.content.width};
  max-width: ${props => props.theme.content.maxWidth};

  div {
    width: 50%;
    min-width: ${props => props.theme.minWidth};

    h2 {
      margin-top: 0;
    }
  }

  img {
    display: block;
    width: 45%;
    max-width: 50vw;
    object-fit: cover;
  }

  /* Mobile styles (same mobile breakpoint as hero) */
  @media only screen and (max-width: 700px) {
    display: block;

    div,
    img {
      width: 100%;
      max-width: ${({ theme }) => theme.content.width};
      margin: 0 auto;
    }
  }
`;

const ServicesContainer = styled.section`
  background: ${props => props.theme.colors.blue};
  color: ${props => props.theme.colors.text_white};
  padding: 4rem 0;

  h2 {
    color: ${props => props.theme.colors.background_dark};
    font-size: 3.5rem;
    font-weight: 500;
    letter-spacing: 0;
    margin: 0 auto 3.5rem;
    text-align: center;
    text-transform: none;

    &:after {
      background: ${props => props.theme.colors.background};
      content: '';
      display: block;
      height: 1px;
      margin: 2rem auto;
      width: 4rem;
    }
  }

  /* Mobile styles (same breakpoint as hero) */
  @media only screen and (max-width: 700px) {
    h2 {
      font-size: 2.75rem;
    }
  }
`;

const MissionContainer = styled.section`
  color: ${props => props.theme.colors.text};
  text-align: center;
  width: ${props => props.theme.content.width};
  max-width: ${props => props.theme.content.maxWidth};

  p {
    margin: 1em auto;
    max-width: 50rem;
  }

  blockquote {
    margin: 4.5rem auto;
    font-family: Lora;
    font-size: 2.25rem;
    font-weight: 300;
    line-height: 2.75rem;
    line-spacing: 2.5rem;
    letter-spacing: 0.9px;
    max-width: 52rem;
  }

  /* Mobile styles */
  @media only screen and (max-width: 700px) {
    padding: 2rem 0;
    text-align: left;

    blockquote {
      margin: 3rem auto;
    }
  }
`;

const PortfolioContainer = styled.section`
  background: white;
  color: ${props => props.theme.colors.text};
  padding: 6rem 0 1rem;
  text-align: center;

  p {
    margin: 1.875rem auto 4rem;
  }

  @media only screen and (max-width: 700px) {
    padding: 3rem 0 0.25rem;

    p {
      line-height: 1.375rem;
      margin-bottom: 3rem;
    }
  }
`;

const Home = ({ location }) => {
  const data = useStaticQuery(graphql`
    query homeQuery {
      content: markdownRemark(
        fileAbsolutePath: { regex: "//cms/pages/home.md/" }
      ) {
        frontmatter {
          title
          hero
          hero_mobile
          hero_text
          intro_image
          intro_heading
          intro_copy
          above_pullquote
          pullquote
          below_pullquote
          portfolio_heading
          portfolio_subheading
        }
      }
    }
  `);

  // Avoid typing data.content.frontmatter a million times
  const content = data.content.frontmatter;

  return (
    <Layout
      heroImage={content.hero}
      heroImageMobile={content.hero_mobile}
      heroHeading={content.title}
      heroText={content.hero_text}
      location={location}
    >
      <HomeContainer>
        <IntroContainer>
          <div>
            <h2>{content.intro_heading}</h2>
            <ReactMarkdown>{content.intro_copy}</ReactMarkdown>
          </div>
          <img src={content.intro_image} alt="Denver Kitchen Gardens" />
        </IntroContainer>

        <ServicesContainer>
          <h2>Services</h2>
          <HomepageServicePreviews />
        </ServicesContainer>

        <MissionContainer>
          <ReactMarkdown>{content.above_pullquote}</ReactMarkdown>
          <blockquote>{content.pullquote}</blockquote>
          <ReactMarkdown>{content.below_pullquote}</ReactMarkdown>
        </MissionContainer>

        <PortfolioContainer>
          <h2>{content.portfolio_heading}</h2>
          <p>{content.portfolio_subheading}</p>
          <Gallery
            onHomepage={true}
            limitImages={10}
            bbText="View Full Portfolio"
            bbLink="/portfolio"
            bbLight
          />
        </PortfolioContainer>
      </HomeContainer>
    </Layout>
  );
};

export default Home;
