import React from 'react';
import styled from 'styled-components';

const SideProcess = styled.div`
  margin-top: 2.75rem;
  position: relative;
  width: 26rem;
  min-width: ${props => props.theme.content.minWidth};

  &::before,
  &::after {
    content: url('/images/sageline.png');
    display: block;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }
  &::before {
    top: -2.75rem;
  }
  &::after {
    bottom: -2.375rem;
  }

  /* Tablet view (just before SideProcess is about to wrap under) */
  @media only screen and (max-width: 980px) {
    width: 45%;
  }

  /* For real tablet view (SideProcess about to wrap again) */
  @media only screen and (max-width: 780px) {
    width: 100%;
    margin: 5rem auto 3rem;
    ${({ hasCall }) => (hasCall ? 'order: 2;' : '')}
  }

  /* Mobile view (sage .png about to overflow) */
  @media only screen and (max-width: 450px) {
    background: #fff;

    &::before,
    &::after {
      overflow: hidden;
      text-align: center;
      width: 100vw;
    }
  }
`;

const WideProcess = styled.div`
  background: #fff;
  box-sizing: border-box;
  margin: 3rem auto;
  padding: 2rem 3rem;
  width: 42.5rem;
  min-width: ${props => props.theme.content.minWidth};
`;

const ProcessInner = styled.div`
  background: #fff;
  box-sizing: border-box;
  margin: 0 auto;
  padding: 3rem 1.5rem;
  width: 95%;

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
    align-items: center;
    display: flex;
    flex-flow: column nowrap;
    padding: 0;
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
  li:last-child {
    margin-bottom: 0.5rem;
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
    max-height: 19rem;
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

    li.process__tomatoes {
      margin-bottom: 0;

      img {
        width: 224px;
      }
    }

    h3 {
      display: inline-block;
      margin-right: 0.25rem;
    }

    span {
      color: ${props => props.theme.colors.text};
    }
  }

  /* Mobile view (same breakpoint as hero) */
  @media only screen and (max-width: 700px) {
    &.wide {
      flex-flow: column nowrap;
      max-height: none;

      li {
        width: 100%;
      }
      li.process__tomatoes {
        text-align: center;
      }
    }
  }
`;

const Line = styled.div`
  background: #b7b7b7;
  height: 2px;
  width: 45rem;
  max-width: 100vw;
`;

const ServicePageProcess = ({ content, hasDetail, hasCall }) => {
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
            <li className="process__tomatoes">
              <img src="/images/tomatoes.png" alt="tomatoes" />
            </li>
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
    <SideProcess hasCall={hasCall}>{processContent}</SideProcess>
  ) : (
    <WideProcess>{processContent}</WideProcess>
  );
};

export default ServicePageProcess;
