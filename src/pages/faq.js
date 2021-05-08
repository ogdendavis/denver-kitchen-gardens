import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';

import Layout from '../components/layout';
import Question from '../components/faqQuestion';

const QuestionsContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  margin: 3.75rem auto;
  width: ${props => props.theme.content.width};
  max-width: 57rem;
  min-width: ${props => props.theme.content.minWidth};

  /* Mobile view (point at which questions stack) */
  @media only screen and (max-width: 752px) {
    margin: 1.5rem auto 3rem;
  }
`;

const FAQ = ({ location }) => {
  const data = useStaticQuery(graphql`
    query faqQuery {
      content: markdownRemark(
        fileAbsolutePath: { regex: "//cms/pages/faq.md/" }
      ) {
        frontmatter {
          title
          hero_text
          questions {
            question
            answer
          }
        }
      }
    }
  `);

  // Create question objects
  const questions = data.content.frontmatter.questions.map((q, i) => (
    <Question question={q.question} answer={q.answer} key={`faq${i}`} />
  ));

  return (
    <Layout
      heroHeading={data.content.frontmatter.title}
      heroText={data.content.frontmatter.hero_text}
      location={location}
    >
      <QuestionsContainer>{questions}</QuestionsContainer>
    </Layout>
  );
};

export default FAQ;
