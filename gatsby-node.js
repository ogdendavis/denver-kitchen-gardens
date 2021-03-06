const path = require('path');

/*
 * Programmatically create pages from services CMS objects
 */
exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;
  // Component that will be used to render pages
  const servicePageTemplate = path.resolve(
    `src/components/services/servicePageTemplate.js`
  );

  // Query to get service page files from graphql
  return graphql(`
    query servicePagesQuery {
      allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "//cms/service_pages/" } }
      ) {
        edges {
          node {
            frontmatter {
              published
              title
              preview_heading
              preview_image
              preview_text
              preview_on_homepage
              header_image
              header_image_mobile
              intro_subheading
              intro_copy
              detail_heading
              detail_copy
              process_heading
              process_points {
                point_title
                point_text
              }
              call_text
              call_url
              call_button
            }
          }
        }
      }
    }
  `).then(result => {
    // Check for errors in fetching
    if (result.errors) {
      throw result.errors;
    }

    // Grab relevant data from graphql return
    const data = result.data.allMarkdownRemark.edges;

    // Array to hold filtered pages
    const livePages = [];

    // Filter out unpublished pages
    for (let { node } of data) {
      // If published, add to livePages
      if (node.frontmatter.published === true) {
        livePages.push(node);
      }
    }

    // Sort by aplha
    livePages.sort(
      (a, b) =>
        a.frontmatter.title.toLowerCase() > b.frontmatter.title.toLowerCase()
    );

    // Now livePages is array of only published pages
    // Create the pages!
    livePages.forEach(page => {
      // Generate slug from title
      const slug = page.frontmatter.title.toLowerCase().split(' ').join('-');
      // Publish the page using template
      createPage({
        path: `services/${slug}`,
        component: servicePageTemplate,
        context: {
          content: page,
        },
      });
    });
  });
};
