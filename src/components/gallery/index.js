import React, { useState } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';

import Button from '../button';
import Modal from './modal';

const GalleryContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  margin: 3rem auto;
  width: ${props => props.theme.content.width};
  max-width: ${props => props.theme.content.maxWidth};
  /*
  @media only screen and (max-width: 850px) {
    flex-flow: column;
    align-items: center;
  }*/
`;

const GalleryImage = styled.img`
  cursor: pointer;
  display: block;
  object-fit: cover;
  height: 24rem;
  margin-bottom: 3rem;
  width: 32.75rem;
  max-width: ${({ theme }) => theme.content.width};

  ${props => (props.side === 'onLeft' ? 'margin-right: 3rem;' : '')}

  /* When width above would cause 1 image per row */
  @media only screen and (max-width: 1290px) {
    height: 21rem;
    margin-bottom: 2rem;
    width: 21rem;
    ${props => (props.side === 'onLeft' ? 'margin-right: 2rem;' : '')}
  }

  /* Tablet styles */
  @media only screen and (max-width: 850px) {
    height: 18rem;
    margin-bottom: 1rem;
    width: 18rem;
    ${props => (props.side === 'onLeft' ? 'margin-right: 1rem;' : '')}
  }

  /* Mobile styles (same breakpoint as hero) */
  @media only screen and (max-width: 700px) {
    height: 14rem;
    margin: 1rem auto;
    width: 21rem;
  }
`;

const ButtonContainer = styled.div`
  margin: ${props => `${props.isBB ? '4.25rem' : '2rem'} auto 4.25rem`};
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

  // We always want an even number of images
  if (allImagePaths.length % 2 !== 0) {
    // If odd length, remove last image
    allImagePaths.splice(allImagePaths.length - 1);
  }

  // Create array of rendered images
  const galleryImages = allImagePaths.map((path, index) => {
    // even-indexed images will appear on left
    // Used for styling
    const side = index % 2 === 0 ? 'onLeft' : 'onRight';
    // Render image, with onClick indicating appropriate index
    return (
      <GalleryImage
        key={path}
        src={path}
        side={side}
        onClick={() => {
          openModal(index);
        }}
      />
    );
  });

  // Insert buttons every 10 images (but not at end)
  // i iterates by 11 to account for newly-inserted button
  for (let i = 10; i < galleryImages.length; i += 11) {
    // Draw button
    const interButton = (
      <ButtonContainer key={`galBut-${i}`}>
        <Button to={ibLink}>{ibText}</Button>
      </ButtonContainer>
    );
    // Insert button in array
    galleryImages.splice(i, 0, interButton);
  }

  // Determine if bottom button is light or not
  const bbVariant = bbLight ? 'light inverted' : 'default';

  // State to manage Modal
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImageIndex, setModalImageIndex] = useState(0);

  // Modal opener
  const openModal = index => {
    // Set index of image to display
    setModalImageIndex(index);
    // Open the modal
    setModalOpen(true);
  };

  // Modal closer
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <GalleryContainer>
      {galleryImages}
      <ButtonContainer isBB>
        <Button to={bbLink} variant={bbVariant}>
          {bbText}
        </Button>
      </ButtonContainer>
      {modalOpen && (
        <Modal
          closeFunc={closeModal}
          images={allImagePaths}
          index={modalImageIndex}
          setIndex={setModalImageIndex}
        />
      )}
    </GalleryContainer>
  );
};

export default Gallery;
