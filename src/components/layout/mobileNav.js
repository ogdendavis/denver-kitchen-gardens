import React, { useState } from 'react';
import styled from 'styled-components';

const Burger = styled.button`
  position: absolute;
  top: 1.75rem;
  right: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 2.5rem;
  height: 2rem;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 10;

  &:focus {
    outline: none;
  }

  div {
    width: 100%;
    height: 0.25rem;
    background: ${props => props.theme.colors.text};
    border-radius: 5px;
    transition: all 0.3s linear;
    position: relative;
    transform-origin: 1px;

    :first-child {
      margin-left: ${({ open }) => (open ? '0.25rem' : '0')};
      transform: ${({ open }) => (open ? 'rotate(45deg)' : 'rotate(0)')};
      width: ${({ open }) => (open ? '2rem' : '100%')};
    }

    :nth-child(2) {
      opacity: ${({ open }) => (open ? '0' : '1')};
      transform: ${({ open }) => (open ? 'translateX(20px)' : 'translateX(0)')};
    }

    :nth-child(3) {
      margin-left: ${({ open }) => (open ? '0.25rem' : '0')};
      transform: ${({ open }) => (open ? 'rotate(-45deg)' : 'rotate(0)')};
      width: ${({ open }) => (open ? '2rem' : '100%')};
    }
  }
`;

const Menu = styled.div`
  background: red;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  position: fixed;
  width: 100vw;
  padding: 1rem;
  box-sizing: border-box;

  .mobile-link,
  .mobile-button {
    display: block;
    margin: 1.5rem auto;

    &:first-child {
      margin-top: 2rem;
    }
    &:last-child {
      margin-bottom: 2rem;
    }
  }

  .mobile-link {
    font-size: 1.5rem;
    font-weight: 500;
  }
`;

const MobileNav = ({ children }) => {
  // State to open and close mobile menu
  const [open, setOpen] = useState(false);

  return (
    <>
      <Burger onClick={() => setOpen(!open)} open={open}>
        <div />
        <div />
        <div />
      </Burger>
      <Menu open={open}>{children}</Menu>
    </>
  );
};

export default MobileNav;
