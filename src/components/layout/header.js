import React from 'react';
import styled from 'styled-components';

import Nav from './nav';

const HeaderContainer = styled.header`
  ${props =>
    props.hero
      ? `background: linear-gradient(${props.theme.colors.background}bb, ${props.theme.colors.background}bb), url(${props.hero}) center/cover no-repeat; height: 80vh;`
      : ''}
`;

const HeaderText = styled.div`
  width: 50vw;
  min-width: ${props => props.theme.content.minWidth};
  margin: 5rem auto 2.5rem;

  text-align: center;

  h1 {
    font-size: 3.25rem;
  }

  p {
    color: ${props => props.theme.colors.text};
    font-size: 1.25rem;
    line-height: 2rem;
  }
`;

const Phone = styled.div`
  margin-top: 3rem;
  font-size: 2rem;
  color: ${props => props.theme.colors.heading};
`;

const Header = ({ heroImage, heading, text, phone }) => {
  console.log(heroImage);
  return (
    <HeaderContainer hero={heroImage}>
      <Nav />
      <HeaderText>
        <h1>{heading}</h1>
        <p>{text}</p>
        {phone && <Phone>CALL US AT {phone}</Phone>}
      </HeaderText>
    </HeaderContainer>
  );
};

export default Header;
