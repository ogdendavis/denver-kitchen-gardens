import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { useViewport } from '../context/viewport';

const HeaderContainer = styled.header`
  &.hasHero {
    background-image: ${props => `url(${props.heroImage})`};
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: 65vh;
  }

  &.hasHero.noHeading {
    height: 35vh;
  }

  /* Mobile styles */
  @media only screen and (max-width: 700px) {
    &.hasHero,
    &.hasHero.noHeading {
      height: 70vh;
    }
  }
`;

const HeaderText = styled.div`
  &.hasHero {
    width: 50%;
    box-sizing: border-box;
    background: linear-gradient(#222b, #222b);
    color: ${props => props.theme.colors.text_white};
    padding: 2rem;

    h1 {
      color: ${props => props.theme.colors.text_white};
      font-size: 3.25rem;
      margin-top: 1.25rem;
      margin-bottom: 0;
    }

    p {
      font-size: 1rem;
      line-height: 1.75rem;
    }
  }

  &.noHero {
    border-bottom: 1px solid ${props => props.theme.colors.text};
    margin: 0 auto;
    text-align: center;
    width: ${props => props.theme.content.width};
    max-width: ${props => props.theme.content.maxWidth};

    h1 {
      font-size: 3.5rem;
      font-weight: 400;
      margin: 2.75rem auto 0;
    }

    p {
      color: ${props => props.theme.colors.text};
      margin: 1.75rem auto 2.75rem;
    }
  }

  &.noHeading {
    display: none;
    visibility: hidden;
  }

  /* Mobile styles */
  @media only screen and (max-width: 700px) {
    &.hasHero {
      background: ${({ theme }) => theme.colors.text_dark};
      width: 100%;

      h1 {
        font-size: 2.75rem;
      }
    }

    &.noHero {
      h1 {
        font-size: 2.75rem;
      }
    }
  }
`;

const Phone = styled.div`
  color: ${props => props.theme.colors.orange};
  font-family: Lora;
  font-size: 2rem;
  font-weight: 500;
  letter-spacing: 2.25px;
  margin-top: 1.5rem;
`;

const Header = ({ heroImage, heroImageMobile, heading, text, phone }) => {
  // Flags to check if heroImage and heading have been passed, for text area styling
  const [hasHero, hasHeroHeading] = [heroImage ? true : false, heading];

  const headerClass =
    hasHero && hasHeroHeading // base case: has both
      ? 'hasHero'
      : hasHero // has only hero
      ? 'hasHero noHeading'
      : 'noHero'; // has neither hero nor heading

  // Breakpoint (in px) at which to start mobile styling
  // Matches media queries above (replace with classes?)
  const breakpoint = 700;

  // Grab width from context
  const { width } = useViewport();

  // State to indicate whether or not viewport is narrow enough that mobile view is needed
  const [isMobile, setIsMobile] = useState(
    width && width <= breakpoint ? true : false
  );

  // When width changes, check and update isMobile
  useEffect(() => {
    setIsMobile(width <= breakpoint);
  }, [width]);

  // Hold all header text in one place
  const renderText = () => (
    <HeaderText className={headerClass}>
      <h1>{heading}</h1>
      <p>{text}</p>
      {phone && <Phone>{phone}</Phone>}
    </HeaderText>
  );

  // On mobile view, text should be rendered BELOW container
  // On desktop view, text should be rendered within container
  return isMobile ? (
    <>
      <HeaderContainer heroImage={heroImageMobile} className={headerClass} />
      {renderText()}
    </>
  ) : (
    <HeaderContainer heroImage={heroImage} className={headerClass}>
      {renderText()}
    </HeaderContainer>
  );
};

export default Header;
