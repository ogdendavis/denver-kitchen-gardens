import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

const PreviewContainer = styled(Link)`
  display: block;
  margin: 0 auto;
  text-align: center;
  text-decoration: none !important;
  width: 328px;

  img {
    border-radius: 50%;
    width: 237px;
  }

  h3 {
    color: ${props => props.theme.colors.background_dark};
    font-family: Montserrat;
    font-size: 1.875rem;
    font-weight: 700;
    letter-spacing: 0px;
  }

  p {
    color: ${props => props.theme.colors.background};
    margin-bottom: 2.5rem;
  }

  span {
    color ${props => props.theme.colors.background_dark};
    font-size: 1.125rem;
    font-weight: 600;

    &:after {
      border-right: 2px solid ${props => props.theme.colors.background_dark};
      border-top: 2px solid ${props => props.theme.colors.background_dark};
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
const ServicePreview = ({ title, text, image }) => {
  // Create link based on title to match slug, as done in servicePageLinks
  const link = `/services/${title.toLowerCase().split(' ').join('-')}`;

  return (
    <PreviewContainer to={link}>
      <img src={image} alt="" />
      <h3>{title}</h3>
      <p>{text}</p>
      <span>Read More</span>
    </PreviewContainer>
  );
};

export default ServicePreview;
