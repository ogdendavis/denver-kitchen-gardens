import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';

import Button from './button';

const GalleryContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  margin: 3rem auto;
  width: ${props => props.theme.content.width};
  max-width: ${props => props.theme.content.maxWidth};
`;

const GalleryImage = styled.img`
  display: block;
  object-fit: cover;
  height: 24rem;
  margin-bottom: 3rem;
  width: 31.75rem;

  ${props => (props.side === 'onLeft' ? 'margin-right: 3rem;' : '')}
`;

const ButtonContainer = styled.div`
  margin: 2rem auto 4.25rem;
  text-align: center;
  width: 100%;
`;

// Renders images on Portfolio page and portfolio segment of homepage
// limitImages should be an integer of the number of images to display in the gallery (if not all)
const Gallery = ({
  onHomepage,
  limitImages,
  ibText,
  ibLink,
  bbText,
  bbLink,
  bbLight,
}) => {
  // Grab all images associated with projects
  // Grabs newer projects first (so will be at top)
  const data = useStaticQuery(graphql`
    query galleryQuery {
      allProjects: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "//cms/projects/" } }
        sort: { fields: frontmatter___date, order: DESC }
      ) {
        edges {
          node {
            frontmatter {
              date
              images {
                image
                on_homepage
              }
            }
          }
        }
      }
    }
  `);

  // Flatten all image arrays into one
  const allImagePaths = data.allProjects.edges.reduce((all, { node }) => {
    // Flatten all arrays into one array of only paths
    const paths = node.frontmatter.images
      .filter(imageObj => {
        // If onHomepage is true, filter out images not selected for homepage
        return !onHomepage || (onHomepage && imageObj.on_homepage);
      })
      .map(imageObj => {
        // Extract only the path from the object
        return imageObj.image;
      });
    // Add the paths to the overall list (accumulator)
    return all.concat(paths);
  }, []);

  // Limit images displayed to limitImages arg
  if (allImagePaths.length > limitImages) {
    // Splice modifies array in place
    // With just 1 arg, splice removes that index and after
    allImagePaths.splice(limitImages);
  }

  // Create array of rendered images
  const galleryImages = allImagePaths.map((path, index) => {
    // even-indexed images will appear on left
    // Used for styling
    const side = index % 2 === 0 ? 'onLeft' : 'onRight';
    return <GalleryImage key={path} src={path} side={side} />;
  });

  // Get galleryImages length before insertion starts in loop
  const galleryLength = galleryImages.length;

  // Insert buttons every 10 images (but not at end)
  for (let i = 10; i < galleryLength; i += 10) {
    // Draw button
    const interButton = (
      <ButtonContainer key={`galBut-${i % 10}`}>
        <Button to={ibLink}>{ibText}</Button>
      </ButtonContainer>
    );
    // Insert button in array
    galleryImages.splice(i, 0, interButton);
  }

  // Determine if bottom button is light or not
  const bbVariant = bbLight ? 'light inverted' : 'default';

  return (
    <GalleryContainer>
      {galleryImages}
      <ButtonContainer>
        <Button to={bbLink} variant={bbVariant}>
          {bbText}
        </Button>
      </ButtonContainer>
    </GalleryContainer>
  );
};

export default Gallery;
