import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  padding-top: 2rem;

  &.hasHero {
    background-image: ${props => `url(${props.heroImage})`};
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    height: 65vh;
  }

  &.hasHero.noHeading {
    height: 35vh;
  }
`;

const HeaderText = styled.div`
  &.hasHero {
    float: right;
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
`;

const Phone = styled.div`
  color: ${props => props.theme.colors.orange};
  font-family: Lora;
  font-size: 2rem;
  font-weight: 500;
  letter-spacing: 2.25px;
  margin-top: 1.5rem;
`;

const Header = ({ heroImage, heading, text, phone }) => {
  // Flags to check if heroImage and heading have been passed, for text area styling
  const [hasHero, hasHeroHeading] = [heroImage ? true : false, heading];

  const headerClass =
    hasHero && hasHeroHeading // base case: has both
      ? 'hasHero'
      : hasHero // has only hero
      ? 'hasHero noHeading'
      : 'noHero'; // has neither hero nor heading

  return (
    <HeaderContainer heroImage={heroImage} className={headerClass}>
      <HeaderText className={headerClass}>
        <h1>{heading}</h1>
        <p>{text}</p>
        {phone && <Phone>{phone}</Phone>}
      </HeaderText>
    </HeaderContainer>
  );
};

export default Header;
