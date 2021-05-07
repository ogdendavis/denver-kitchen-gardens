import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';

import Layout from '../components/layout';

const WrongPlace = styled.div`
  margin: 3rem auto;
  width: ${props => props.theme.content.width};
  max-width: ${props => props.theme.content.maxWidth};
  min-width: ${props => props.theme.content.minWidth};
`;

const FourOhFour = ({ location }) => {
  return (
    <Layout location={location} heroHeading="Oh no!">
      <WrongPlace>
        <p>
          Looks like you're in the wrong place wearing the wrong amount of
          insulating layers, flatlander. No page here.
        </p>
        <p>
          Think there should be a page here?{' '}
          <Link to="/contact">Let us know.</Link> Otherwise, use the menu above
          to navigate to where you want to be!
        </p>
      </WrongPlace>
    </Layout>
  );
};

export default FourOhFour;
