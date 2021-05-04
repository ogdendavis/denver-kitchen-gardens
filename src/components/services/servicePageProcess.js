import React from 'react';
import styled from 'styled-components';

import Leaves from '../../images/icons/leaves.icon.svg';
import Tomatoes from '../../images/icons/tomatoes.icon.svg';

const SideProcess = styled.div`
  width: 26rem;
  min-width: ${props => props.theme.content.minWidth};
`;

const WideProcess = styled.div`
  background: #fff;
  box-sizing: border-box;
  margin: 3rem auto;
  padding: 2rem 3rem;
  width: 42.5rem;
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

  &.wide {
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    width: auto;

    h2 {
      margin-bottom: 2rem;
    }
  }
`;

const ProcessList = styled.ul`
  color: ${props => props.theme.colors.text_dark};
  line-height: 1.375rem;
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

  &.wide {
    display: flex;
    flex-flow: column wrap;
    max-height: 16rem;
    margin: 2.5rem auto 1rem;
    position: relative;
    text-align: left;
    width: 100%;

    li:not(:last-child):after {
      display: none;
      visibility: hidden;
    }

    li {
      margin-bottom: 1.5rem;
      width: 47%;
    }

    h3 {
      display: inline-block;
      margin-right: 0.25rem;
    }

    span {
      color: ${props => props.theme.colors.text};
    }

    svg {
      position: absolute;
      bottom: 0;
      right: 2rem;
    }
  }
`;

const Line = styled.div`
  background: #b7b7b7;
  height: 2px;
  width: 45rem;
`;

const ServicePageProcess = ({ content, hasDetail }) => {
  // Generate process points
  const processPoints = content.process_points.map((point, index) => (
    <li key={`point-${index}`}>
      {point.point_title && <h3>{point.point_title}</h3>}
      <span>{point.point_text}</span>
    </li>
  ));

  // Render actual process content
  const processContent = (
    <ProcessInner className={hasDetail ? '' : 'wide'}>
      <h2>{content.process_heading}</h2>
      {
        // Render line only if no detail present
        !hasDetail && <Line />
      }
      <ProcessList className={hasDetail ? '' : 'wide'}>
        {processPoints}
        {
          // Add tomatoes if hasDetail is false
          !hasDetail && (
            <ul>
              <Tomatoes />
            </ul>
          )
        }
      </ProcessList>
      {
        // Render line only if no detail present
        !hasDetail && <Line />
      }
    </ProcessInner>
  );

  return hasDetail ? (
    <SideProcess>
      <LeavesContainer>
        <Leaves />
      </LeavesContainer>
      {processContent}
      <LeavesContainer>
        <Leaves />
      </LeavesContainer>
    </SideProcess>
  ) : (
    <WideProcess>{processContent}</WideProcess>
  );
};

export default ServicePageProcess;
