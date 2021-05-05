import React from 'react';
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

  return (
    <Outer onClick={closeFunc}>
      <Inner>
        <Closer>&times;</Closer>
        <img
          src={activeImage}
          alt="A Denver Kitchen Gardens project"
          onClick={e => {
            e.stopPropagation();
            incrementIndex();
          }}
        />
      </Inner>
    </Outer>
  );
};

export default Modal;
