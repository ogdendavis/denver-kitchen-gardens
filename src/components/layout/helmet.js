import React from 'react';
import { Helmet } from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';

// Info to add to header
const BigHat = ({ subTitle, pageImage, location }) => {
  // Get header data from back-end
  const data = useStaticQuery(graphql`
    query helmetQuery {
      meta: markdownRemark(
        fileAbsolutePath: { regex: "//cms/general/site.md/" }
      ) {
        frontmatter {
          meta_description
          meta_image
        }
      }
    }
  `);

  console.log(location);

  // Pull out frontmatter for easy reference
  const meta = data.meta.frontmatter;

  // Create page title
  const title = subTitle
    ? `Denver Kitchen Gardens: ${subTitle}`
    : 'Denver Kitchen Gardens';

  // Either use passed-in image, or default
  const image = pageImage ? pageImage : meta.meta_image;

  return (
    <Helmet>
      <title>{title}</title>
      {/* Google Fonts */}
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Lora:wght@300;400;600;700&family=Montserrat:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />
      {/* Favicon */}
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="manifest" href="/site.webmanifest" />
      {/* Let's get meta */}
      <meta name="description" content={meta.meta_description} />
      <meta property="og:title" content={title} />
      <meta property="og:type" content="website" />
      <meta
        property="og:image"
        content={`https://focused-franklin-bcedeb.netlify.app${image}`}
      />
      <meta property="og:image:alt" content="Denver Kitchen Gardens" />
      <meta property="og:url" content={location.href} />
      <meta property="og:description" content={meta.meta_description} />
      <meta property="og:site_name" content="Denver Kitchen Gardens" />
    </Helmet>
  );
};

export default BigHat;
