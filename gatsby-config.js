module.exports = {
  siteMetadata: {
    title: 'Denver Kitchen Gardens',
  },
  plugins: [
    'gatsby-plugin-netlify-cms',
    'gatsby-plugin-styled-components',
    'gatsby-plugin-sharp',
    'gatsby-plugin-react-helmet',
    'gatsby-transformer-sharp',
    'gatsby-transformer-remark',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: './src/images/',
      },
      __key: 'images',
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: './src/pages/',
      },
      __key: 'pages',
    },
    // Make gatsby aware of CMS content
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `main_pages`,
        path: `${__dirname}/src/cms/pages`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `service_pages`,
        path: `${__dirname}/src/cms/service_pages`,
      },
    },
  ],
};
