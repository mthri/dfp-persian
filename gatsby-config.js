module.exports = {
  pathPrefix: "/dfp-persian",
  siteMetadata: {
    siteUrl: "https://sajjadkiani.ir",
    title: "mySite",
  },
  plugins: [
    "gatsby-plugin-image",
    "gatsby-plugin-mdx",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    "gatsby-transformer-remark",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
    {
    resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [
          `Markazi Text`,
        ],
        display: 'swap'
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "docs",
        path: "./src/documents/",
      },
      __key: "docs",
    },
  ],
};
