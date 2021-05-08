import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

const PreviewContainer = styled(Link)`
  display: block;
  ${props => (props.variant === 'large' ? 'margin-bottom: 3rem;' : '')}
  text-align: center;
  text-decoration: none !important;
  width: ${props => (props.variant === 'large' ? '28.375rem' : '21rem')};

  /* For slide-in animation */
  position: relative;
  opacity: 1;
  transition: all .5s ease;
  &.offscreen {
    margin-top: 100px;
    opacity: 0;
  }

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

  /* Mobile styles (at width that homepage previews stack) */
  @media only screen and (max-width: 1185px) {
    &:not(:last-child) {
      margin-bottom: 3.75rem;
    }

    span {
      color: ${({ theme }) => theme.colors.orange};

      &:after {
        border-right: 0.125rem solid ${props => props.theme.colors.orange};
        border-top: 0.125rem solid ${props => props.theme.colors.orange};
      }
    }
  }
`;

// Creates component with preview image, text, and link directly to service sub-page
const ServicePreview = ({ title, heading, text, image, variant }) => {
  // Create link based on title to match slug, as done in servicePageLinks
  const link =
    title === 'contact'
      ? '/contact'
      : `/services/${title.toLowerCase().split(' ').join('-')}`;

  // State to track whether element is in viewport
  const [isVisible, setIsVisible] = useState(false);

  // Ref for containing div
  const containerRef = useRef();

  // On load, create an intersection observer that will check when item is in viewport
  useEffect(() => {
    // Create intersection observer
    const observer = new IntersectionObserver(
      // observer takes callback function to use when item is in view
      entries => {
        // Should only have one entry observed, so grab from array
        const entry = entries[0];
        // If onscreen, note so in state
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      // config object for observer:
      // threshold is % of element visible before observer logs that it's onscreen
      // rootMargin expands observing box by that many pixels on each side
      { threshold: 0.3, rootMargin: '100px' }
    );
    // point ref to observer, so we're observing the element at the ref!
    observer.observe(containerRef.current);
  }, []);

  return (
    <PreviewContainer
      to={link}
      variant={variant}
      ref={containerRef}
      className={isVisible ? '' : 'offscreen'}
    >
      <img src={image} alt="" />
      <h3>{heading}</h3>
      <p>{text}</p>
      <span>{title === 'contact' ? 'Contact Us' : 'Read More'}</span>
    </PreviewContainer>
  );
};

export default ServicePreview;
