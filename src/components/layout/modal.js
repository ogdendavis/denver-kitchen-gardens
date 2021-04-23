import React from 'react';
import { graphql, useStaticQuery, Link } from 'gatsby';
import styled from 'styled-components';

const ModalBackground = styled.div`
  background: ${props => props.theme.modalBg};
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  z-index: 100;
`;

const ModalInner = styled.div`
  background: ${props => props.theme.colors.background_light};
  padding: 4rem;
  text-align: center;
`;

const ModalButton = styled.div`
  background: ${props => props.theme.colors.blue};
  color: ${props => props.theme.colors.text_white};
  display: inline-block;
  font-weight: 600;
  margin-top: 2rem;
  padding: 1rem 2.5rem;
  text-transform: uppercase;
  transition: background 0.5s ease, color 0.5s ease;

  &:hover {
    background: ${props => props.theme.colors.green};
    color: ${props => props.theme.colors.text_white};
    cursor: pointer;
    text-decoration-line: none !important;
  }
`;

const Modal = ({ close, val }) => {
  const data = useStaticQuery(graphql`
    query ModalQuery {
      content: markdownRemark(
        fileAbsolutePath: { regex: "//cms/general/site.md/" }
      ) {
        frontmatter {
          contact_message
        }
      }
    }
  `);

  // If no modal is present, return no markup!
  if (!val) {
    return null;
  }

  // Library object containing modal content
  const modalContentLib = {
    contactSuccess: (
      <>
        <h2>Message Sent!</h2>
        <p>{data.content.frontmatter.contact_message}</p>
      </>
    ),
    error: (
      <div>
        Oh no, something went wrong! Please{' '}
        <Link to="/">head back to the homepage</Link>.
      </div>
    ),
  };

  // Use val to determine what content to populate modal with
  const modalContent = modalContentLib.hasOwnProperty(val)
    ? modalContentLib[val]
    : modalContentLib.error;

  return (
    <ModalBackground onClick={close}>
      <ModalInner>
        {modalContent}
        <ModalButton to="#">Close</ModalButton>
      </ModalInner>
    </ModalBackground>
  );
};

export default Modal;
