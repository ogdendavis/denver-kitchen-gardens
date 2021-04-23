import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

const PreviewContainer = styled(Link)`
  display: block;
  ${props => (props.variant === 'large' ? 'margin-bottom: 3rem;' : '')}
  text-align: center;
  text-decoration: none !important;
  width: ${props => (props.variant === 'large' ? '28.375rem' : '21rem')};

  img {
    border-radius: 50%;
    height: ${props => (props.variant === 'large' ? '18rem' : '15rem')};
    width: ${props => (props.variant === 'large' ? '18rem' : '15rem')};
  }

  h3 {
    color: ${props => props.theme.colors.background_dark};
    font-family: Montserrat;
    font-size: ${props =>
      props.variant === 'large' ? '1.875rem' : '1.125rem'};
    font-weight: 600;
    letter-spacing: 0;
  }

  p {
    color: ${props => props.theme.colors.background};
    font-size: ${props => (props.variant === 'large' ? '1.3rem' : '1.125rem')};
    margin-bottom: 2.5rem;
  }

  span {
    color ${props => props.theme.colors.background_dark};
    font-size: ${props => (props.variant === 'large' ? '1.25rem' : '1.125rem')};
    font-weight: 600;

    &:after {
      border-right: 0.125rem solid ${props =>
        props.theme.colors.background_dark};
      border-top: 0.125rem solid ${props => props.theme.colors.background_dark};
      content: '';
      display: inline-block;
      height: 1rem;
      margin-left: 0.5rem;
      position: relative;
      top: .125rem;
      transform: rotate(45deg);
      width: 1rem;
    }
  }
`;

// Creates component with preview image, text, and link directly to service sub-page
const ServicePreview = ({ title, heading, text, image, variant }) => {
  // Create link based on title to match slug, as done in servicePageLinks
  const link = `/services/${title.toLowerCase().split(' ').join('-')}`;

  return (
    <PreviewContainer to={link} variant={variant}>
      <img src={image} alt="" />
      <h3>{heading}</h3>
      <p>{text}</p>
      <span>Read More</span>
    </PreviewContainer>
  );
};

export default ServicePreview;
