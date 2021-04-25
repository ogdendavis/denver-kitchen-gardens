import React from 'react';
import styled from 'styled-components';

import Button from '../button';

const CallContainer = styled.section`
  padding: 2.5rem 0;
  text-align: center;
`;

const CallText = styled.div`
  color: ${props => props.theme.colors.green};
  font-family: Lora;
  font-size: 1.5rem;
  font-weight: 600;
  letter-spacing: 1.25px;
  line-height: 2.125rem;
  margin: 0 auto 4rem;
  max-width: 52rem;
`;

const ServicePageCall = ({ content }) => {
  // This comment is to make git acknowledge the capitalization change in this filename
  return (
    <CallContainer>
      <CallText>{content.call_text}</CallText>
      <Button to={content.call_url}>{content.call_button}</Button>
    </CallContainer>
  );
};

export default ServicePageCall;
