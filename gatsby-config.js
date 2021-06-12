module.exports = {
  siteMetadata: {
    title: 'Denver Kitchen Gardens',
  },
  plugins: [
    'gatsby-plugin-netlify-cms',
    'gatsby-plugin-styled-components',
    'gatsby-plugin-image',
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
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `general_info`,
        path: `${__dirname}/src/cms/general`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `projects`,
        path: `${__dirname}/src/cms/projects`,
      },
    },
    // Load svg icons with file format [name].icon.svg
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /\.icon\.svg$/,
        },
      },
    },
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        // Using the Google Analytics 4 measurement ID here
        trackingIds: ['G-XW94DWK5VG'],
        // This object gets passed directly to the gtag config command
        gtagConfig: {
          config: 'G-XW94DWK5VG',
          anonymize_ip: true,
          cookie_expires: 0,
        },
        // Plugin-specific config
        pluginConfig: {
          // Put tracking script in the head instead of the body
          head: true,
          // Respect users' do not track settings
          respectDNT: true,
        },
      },
    },
  ],
};
