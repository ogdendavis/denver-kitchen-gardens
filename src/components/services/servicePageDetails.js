import React from 'react';
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';

import Button from '../button';
import Leaves from '../../images/icons/leaves.icon.svg';

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
`;

const ButtonContainer = styled.div`
  max-width: 20.5rem;
`;

const Process = styled.div`
  width: 26rem;
  min-width: ${props => props.theme.content.minWidth};
`;

const LeavesContainer = styled.div`
  margin-bottom: -2rem; /* to crop svg */
  position: relative;
  text-align: center;

  &:last-child {
    margin-top: -1.5rem;
  }

  svg {
    position: relative;
    z-index: 1;
  }

  :after {
    background: ${props => props.theme.colors.text};
    content: '';
    display: block;
    height: 1px;
    position: absolute;
    top: 49%;
    width: 100%;
  }
`;

const ProcessInner = styled.div`
  margin: 0 auto;
  width: 80%;

  h2 {
    color: ${props => props.theme.colors.green};
    font-size: 1.5rem;
    letter-spacing: 1.25px;
    line-height: 1.875rem;
    margin-top: 0;
    text-align: center;
    text-transform: none;
  }
`;

const ProcessList = styled.ul`
  color: ${props => props.theme.colors.text_dark};
  list-style: none;
  margin: 2rem auto 0;
  padding: 0;
  text-align: center;
  width: 85%;

  li:not(:last-child):after {
    content: '';
    background: ${props => props.theme.colors.text_dark};
    display: block;
    height: 1px;
    margin: 1.25rem auto;
    width: 20%;
  }

  h3 {
    color: ${props => props.theme.colors.blue};
    font-size: 1rem;
    font-family: Montserrat;
    letter-spacing: 0;
    margin: 0;
  }
`;

const ServicePageDetails = ({ content }) => {
  // Flag for if detail content is present
  const hasDetail = content.detail_copy ? true : false;
  // Flag for if bottom call to action content is present
  const hasCall = content.call_text ? true : false;

  // Generate process points
  const processPoints = content.process_points.map((point, index) => (
    <li key={`point-${index}`}>
      {point.point_title && <h3>{point.point_title}</h3>}
      <span>{point.point_text}</span>
    </li>
  ));

  return (
    <DetailsContainer>
      {content.detail_heading && (
        <DetailsHeading>{content.detail_heading}</DetailsHeading>
      )}
      <Detail>
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
      <Process>
        <LeavesContainer>
          <Leaves />
        </LeavesContainer>
        <ProcessInner>
          <h2>{content.process_heading}</h2>
          <ProcessList>{processPoints}</ProcessList>
        </ProcessInner>
        <LeavesContainer>
          <Leaves />
        </LeavesContainer>
      </Process>
    </DetailsContainer>
  );
};

export default ServicePageDetails;
