/* eslint jsx-a11y/no-noninteractive-element-interactions: 0 */
/* eslint jsx-a11y/no-noninteractive-tabindex: 0 */

import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useSwipeable } from 'react-swipeable';

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
  img:focus {
    outline: none;
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

const Arrow = styled.div`
  color: #fff;
  font-size: 4rem;
  font-weight: 700;
  padding: 1rem;
  position: fixed;

  &:hover {
    cursor: pointer;
  }

  /* Position right and left arrows */
  &.right {
    right: 1rem;
  }
  &.left {
    left: 1rem;
  }

  @media only screen and (max-width: 900px) {
    padding: 0.5rem;

    &.right {
      right: 0.5rem;
    }
    &.left {
      left: 0.5rem;
    }
  }

  @media only screen and (max-width: 600px) {
    bottom: 3rem;

    &.right {
      right: 25%;
    }
    &.left {
      left: 25%;
    }
  }
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

  // On load, focus image element so keydown handlers fire
  useEffect(() => {
    document.querySelector('#modal-activeImage').focus();
  }, []);

  // Use package to add swipe functionality
  const swipers = useSwipeable({
    onSwipedLeft: e => {
      incrementIndex();
    },
    onSwipedRight: e => {
      decrementIndex();
    },
    onSwiping: e => {
      // Prevent event propagation
      return false;
    },
    // Stop background scrolling
    preventDefaultTouchmoveEvent: true,
  });

  return (
    <Outer
      onClick={closeFunc}
      {
        /* Put swipe handlers on outer to prevent scroll of page underneath */ ...swipers
      }
    >
      <Inner>
        <Closer>&times;</Closer>
        <img
          id="modal-activeImage"
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
        <Arrow
          className="left"
          onClick={e => {
            e.stopPropagation();
            decrementIndex();
          }}
        >
          &lang;
        </Arrow>
        <Arrow
          className="right"
          onClick={e => {
            e.stopPropagation();
            incrementIndex();
          }}
        >
          &rang;
        </Arrow>
      </Inner>
    </Outer>
  );
};

export default Modal;
