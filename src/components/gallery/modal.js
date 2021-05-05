import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

const Outer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(rgba(20, 20, 20, 0.85), rgba(20, 20, 20, 0.85));
  z-index: 999;
`;

const Inner = styled.div`
  align-items: center;
  display: flex;
  flex-flow: column nowrap;
  height: 85vh;
  justify-content: center;
  position: relative;
  width: 85vw;

  img {
    display: block;
    object-fit: contain;
    max-height: calc(100% - 2rem);
    max-width: 100%;
  }
`;

const Closer = styled.div`
  color: #fff;
  cursor: pointer;
  font-size: 3rem;
  font-weight: 500;
  line-height: 2rem;
  text-align: right;
  width: 100%;
`;

const Modal = ({ closeFunc, images, index, setIndex }) => {
  // Get image to display by index
  const activeImage = images[index];

  // Get number of images in total
  const numImages = images.length;

  // Function to go to next photo
  const incrementIndex = () => {
    // Either go to next photo or back to start
    setIndex(index + 1 === numImages ? 0 : index + 1);
  };

  // Function to go to previous photo
  const decrementIndex = () => {
    // Either go to previous photo or to end
    setIndex(index === 0 ? numImages - 1 : index - 1);
  };

  // Set ref that will point to image
  // Ref is created with ref property on img tag
  const imageRef = useRef(null);

  // On load, focus image element
  useEffect(() => {
    imageRef.current.focus();
  }, []);

  return (
    <Outer onClick={closeFunc}>
      <Inner>
        <Closer>&times;</Closer>
        <img
          ref={imageRef}
          tabIndex="0"
          src={activeImage}
          alt="A Denver Kitchen Gardens project"
          onClick={e => {
            e.stopPropagation();
            incrementIndex();
          }}
          onKeyDown={e => {
            // If right arrow is pressed, go to next image
            if (e.key === 'ArrowRight') {
              incrementIndex();
            }
            // If left arrow is pressed, go to previous image
            else if (e.key === 'ArrowLeft') {
              decrementIndex();
            }
          }}
        />
      </Inner>
    </Outer>
  );
};

export default Modal;
