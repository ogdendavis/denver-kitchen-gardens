import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  padding-top: 2rem;
  ${props =>
    props.heroImage
      ? `background: url(${props.heroImage}) fixed center/cover no-repeat; height: 65vh;`
      : ''}
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
  // Flag to check if heroImage has been passed, for text area styling
  const hasHero = heroImage ? true : false;

  return (
    <HeaderContainer heroImage={heroImage}>
      <HeaderText className={hasHero ? 'hasHero' : 'noHero'}>
        <h1>{heading}</h1>
        <p>{text}</p>
        {phone && <Phone>{phone}</Phone>}
      </HeaderText>
    </HeaderContainer>
  );
};

export default Header;
