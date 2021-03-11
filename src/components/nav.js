import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';

const TempNav = styled.nav`
  width: 100%;
  text-align: center;
  margin-bottom: 2rem;
`;

const TempLink = styled(Link)`
  margin: 0 0.5rem;
`;

const Nav = () => {
  /*
  // Get service page info for nav
  const data = useStaticQuery(graphql`
    query servicePageNavQuery {
      allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "//cms/service_pages/" } }
      ) {
        edges {
          node {
            frontmatter {
              published
              title
            }
          }
        }
      }
    }
  `);
  // Filter out unbpulished service pages
  const servicePages = data.allMarkdownRemark.edges.filter(
    x => x.node.frontmatter.published === true
  );
  // Create Links - this will change drastically once we're styling the menu
  // Link path created in same way as slug is created in gatsby-node
  const serviceLinks = servicePages.map(({ node }) => (
    <TempLink
      key={`nav-${node.frontmatter.title}`}
      to={`/services/${node.frontmatter.title
        .toLowerCase()
        .split(' ')
        .join('-')}`}
    >
      {node.frontmatter.title}
    </TempLink>
  ));
  */

  return (
    <TempNav>
      <TempLink to="/">Home</TempLink>
      <TempLink to="/services">Services</TempLink>
      <TempLink to="/portfolio">Portfolio</TempLink>
      <TempLink to="/about">About</TempLink>
      <TempLink to="/contact">Contact</TempLink>
    </TempNav>
  );
};

export default Nav;
