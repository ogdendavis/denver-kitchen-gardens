import React from 'react';
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';

import Layout from '../layout';
import ServicePageDetails from './servicePageDetails';
import ServicePageCall from './servicePageCall';

import { useViewport } from '../context/viewport';

const ServicePageContainer = styled.div`
  color: ${props => props.theme.colors.text};
  margin: 3rem auto;
  width: ${props => props.theme.content.width};
  max-width: ${props => props.theme.content.maxWidth};
  min-width: ${props => props.theme.content.minWidth};

  section {
    margin: 0 auto;
    max-width: 57.25rem;
  }

  /* Mobile view */
  @media only screen and (max-width: 450px) {
    width: 100vw;
  }
`;

const Intro = styled.section`
  h1 {
    font-size: 3.5rem;
    letter-spacing: 0;
    margin-bottom: 2.5rem;
  }

  aside {
    font-size: 1.125rem;
    font-weight: 600;
    margin-bottom: 2.5rem;
  }

  /* Mobile view */
  @media only screen and (max-width: 450px) {
    width: ${({ theme }) => theme.content.width};

    h1 {
      font-size: 2.75rem;
    }
  }
`;

const Cols = styled.div`
  display: flex;
  flex-flow: row nowrap;

  p {
    margin: 0;
    padding: 0 1.5rem;
    width: 100%;

    &:first-child {
      padding-left: 0;
    }
    &: last-child {
      padding-right: 0;
    }
  }

  /* Mobile styling (same breakpoint as hero) */
  @media only screen and (max-width: 700px) {
    display: block;

    p {
      margin: 1rem 0 1.5rem;
      padding: 0;
    }
  }
`;

const Line = styled.div`
  background: ${props => props.theme.colors.text};
  height: 2px;
  margin: 3rem auto 2rem;
  width: 100%;
`;

const ServicePage = props => {
  // Extract CMS info passed from page creation in gatsby-node
  const content = props.pageContext.content.frontmatter;

  // Flag for if detail content is present
  const hasDetail = content.detail_copy ? true : false;
  // Flag for if bottom call to action content is present
  const hasCall = content.call_text ? true : false;

  // Get viewport width from context
  const { width } = useViewport();

  return (
    <Layout
      heroImage={content.header_image}
      heroImageMobile={content.header_image_mobile}
      location={props.location}
    >
      <ServicePageContainer>
        <Intro>
          <h1>{content.title}</h1>
          <aside>{content.intro_subheading}</aside>
          <Cols>
            <ReactMarkdown>{content.intro_copy}</ReactMarkdown>
          </Cols>
        </Intro>
        {width > 780 && <Line />}
        <ServicePageDetails
          content={content}
          hasDetail={hasDetail}
          hasCall={hasCall}
        />
        {
          // render call to action only if provided
          hasCall && (
            <>
              {
                // render line only if detail is present and not on mobile view
                hasDetail && width > 450 && <Line />
              }
              <ServicePageCall content={content} />
            </>
          )
        }
      </ServicePageContainer>
    </Layout>
  );
};

export default ServicePage;
