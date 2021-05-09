import React from 'react';
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';

import Button from '../button';
import ServicePageProcess from './servicePageProcess';

const DetailsContainer = styled.section`
  display: flex;
  flex-flow: row wrap;
  align-items: flex-start;
  justify-content: space-between;
`;

const DetailsHeading = styled.h2`
  line-height: 3rem;
  margin: 2rem auto 1rem;
  text-align: center;
  width: 100%;

  /* Mobile view */
  @media only screen and (max-width: 450px) {
    width: ${({ theme }) => theme.content.width};
  }
`;

const Detail = styled.div`
  padding-top: 2rem;
  width: 26rem;
  min-width: ${props => props.theme.content.minWidth};

  p {
    margin: 2.5rem 0;
  }

  blockquote {
    margin: 3rem 0;

    p {
      font-size: 2.25rem;
      font-family: Lora;
      font-weight: 300;
      letter-spacing: 0.88px;
      line-height: 2.75rem;
      margin: 0;
    }

    &:first-child {
      margin-top: 0;
    }
  }

  /* Tablet view (just before SideProcess is about to wrap under) */
  @media only screen and (max-width: 980px) {
    width: 45%;
  }

  /* For real tablet view (SideProcess about to wrap again) */
  @media only screen and (max-width: 780px) {
    width: 100%;
    order: 1;
    ${({ hasCall }) => (hasCall ? 'padding-top: 0;' : '')}
  }

  /* Mobile view */
  @media only screen and (max-width: 450px) {
    margin: auto;
    width: ${({ theme }) => theme.content.width};
  }
`;

const ButtonContainer = styled.div`
  max-width: 20.5rem;

  /* Mobile view */
  @media only screen and (max-width: 450px) {
    margin: 0 auto 2rem;
  }
`;

const ServicePageDetails = ({ content, hasDetail, hasCall }) => {
  return (
    <DetailsContainer>
      {content.detail_heading && (
        <DetailsHeading>{content.detail_heading}</DetailsHeading>
      )}
      {
        // Render details only if they have content!
        hasDetail && (
          <Detail hasCall={hasCall}>
            <ReactMarkdown>{content.detail_copy}</ReactMarkdown>
            {
              // Button only goes here if there is no call to action text
              !hasCall && (
                <ButtonContainer>
                  <Button to={content.call_url}>{content.call_button}</Button>
                </ButtonContainer>
              )
            }
          </Detail>
        )
      }
      <ServicePageProcess
        content={content}
        hasDetail={hasDetail}
        hasCall={hasCall}
      />
    </DetailsContainer>
  );
};

export default ServicePageDetails;
