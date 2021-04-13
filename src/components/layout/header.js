import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  padding-top: 2rem;
  ${props =>
    props.heroImage
      ? `background: linear-gradient(${props.theme.colors.background}bb, ${props.theme.colors.background}bb), url(${props.heroImage}) center/cover no-repeat; height: 80vh;`
      : ''}
`;

const HeaderText = styled.div`
  float: right;
  width: 50%;
  background: linear-gradient(#222b, #222b);
  color: ${props => props.theme.colors.text_white};
  padding: 2rem;

  h1.heroHeading {
    margin-top: 1.25rem;
    margin-bottom: 0;
    color: ${props => props.theme.colors.text_white};
  }

  p {
    font-size: 1rem;
    line-height: 1.75rem;
  }
`;

const Phone = styled.div`
  margin-top: 3rem;
  font-size: 2rem;
  color: ${props => props.theme.colors.heading};
`;

const Header = ({ heroImage, heading, text, phone }) => {
  // Flag to check if heroImage has been passed, for text area styling
  const hasHero = heroImage ? true : false;

  return (
    <HeaderContainer heroImage={heroImage}>
      <HeaderText hasHero={hasHero}>
        <h1 className={hasHero ? 'heroHeading' : ''}>{heading}</h1>
        <p>{text}</p>
        {phone && <Phone>CALL US AT {phone}</Phone>}
      </HeaderText>
    </HeaderContainer>
  );
};

export default Header;
