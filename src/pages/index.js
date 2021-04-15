import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';

import Layout from '../components/layout';

const HomeContainer = styled.div`
  margin: 0 auto;

  section {
    margin: 5rem auto 0;
  }
`;

const IntroContainer = styled.section`
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
    width: 500px;
    max-width: 50vw;
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
    letter-spacing: 0px;
    margin: 0 auto 3.5rem;
    position: relative;
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
`;

const MissionContainer = styled.section`
  width: ${props => props.theme.width};
  max-width: ${props => props.theme.maxWidth};
  text-align: center;
  color: ${props => props.theme.colors.text};

  p {
    margin: 1em auto;
    max-width: 800px;
  }

  blockquote {
    margin: 4.5rem auto;
    font-family: Lora;
    font-size: 2rem;
    line-spacing: 2.5rem;
    letter-spacing: 0.9px;
    max-width: 900px;
  }
`;

const PortfolioContainer = styled.section`
  background: white;
  color: ${props => props.theme.colors.text};
  padding: 7rem 0;
  text-align: center;

  p {
    margin: 1.875rem auto 4rem;
  }
`;

const Home = () => {
  const data = useStaticQuery(graphql`
    query homeQuery {
      content: markdownRemark(
        fileAbsolutePath: { regex: "//cms/pages/home.md/" }
      ) {
        frontmatter {
          title
          hero
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
  console.log(content);

  return (
    <Layout
      heroImage={content.hero}
      heroHeading={content.title}
      heroText={content.hero_text}
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
          <div>This is where the services previews go!</div>
        </ServicesContainer>
        <MissionContainer>
          <ReactMarkdown>{content.above_pullquote}</ReactMarkdown>
          <blockquote>{content.pullquote}</blockquote>
          <ReactMarkdown>{content.below_pullquote}</ReactMarkdown>
        </MissionContainer>
        <PortfolioContainer>
          <h2>{content.portfolio_heading}</h2>
          <p>{content.portfolio_subheading}</p>
        </PortfolioContainer>
      </HomeContainer>
    </Layout>
  );
};

export default Home;
