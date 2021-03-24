import React from 'react';
import styled from 'styled-components';

// To parse frontmatter markdown into HTML
import ReactMarkdown from 'react-markdown';

const QuestionContainer = styled.div`
  width: 48%;
  min-width: ${props => props.theme.content.minWidth};

  .faq__question {
    color: ${props => props.theme.colors.faq};
    text-transform: none;
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
