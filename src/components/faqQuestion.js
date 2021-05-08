import React from 'react';
import styled from 'styled-components';

// To parse frontmatter markdown into HTML
import ReactMarkdown from 'react-markdown';

const QuestionContainer = styled.div`
  color: ${props => props.theme.colors.text};
  width: 48%;
  min-width: ${props => props.theme.content.minWidth};

  .faq__question {
    color: ${props => props.theme.colors.green};
    font-size: 1.5rem;
    font-weight: 600;
    letter-spacing: 1.25px;
    text-transform: none;
  }

  a {
    color: ${props => props.theme.colors.heading};
    text-decoration: underline;
  }

  /* Mobile view (point at which questions stack) */
  @media only screen and (max-width: 752px) {
    width: 100%;
    margin-bottom: 2rem;
  }
`;

const Question = ({ question, answer }) => {
  return (
    <QuestionContainer>
      <h2 className="faq__question">{question}</h2>
      <ReactMarkdown>{answer}</ReactMarkdown>
    </QuestionContainer>
  );
};

export default Question;
