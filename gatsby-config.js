/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

module.exports = {
  /* Your site config here */
  plugins: [
    {
      resolve: `gatsby-plugin-manifest`, //needs to be listed before 'gatsby-plugin-offline'
      options: {
        name: `GatsbyJS`,
        short_name: `GatsbyJS`,
        start_url: `/`,
        background_color: `#f7f0eb`,
        theme_color: `#a2466c`,
        display: `standalone`,
        icon: `src/images/icon.png`, // This path is relative to the root of the site.
      },
    },  
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        output: `/sitemap.xml`,
        query: `
          {
            site {
              siteMetadata {
                siteUrl
              }
            }
            allSitePage {
              nodes {
                path
              }
            }
        }`,
        resolveSiteUrl: ({site, allSitePage}) => {
          //Alternatively, you may also pass in an environment variable (or any location) at the beginning of your `gatsby-config.js`.
          return site.siteMetadata.siteUrl;
        },
        serialize: ({ site, allSitePage }) =>
          allSitePage.nodes.map(node => {
            return {
              url: `${site.siteMetadata.siteUrl}${node.path}`,
              changefreq: `daily`,
              priority: 0.7,
            }
          })
        }
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.edges.map(edge => {

                const {posttype, slug, comic, comicImage, comicImageStack, socialMediaImage} = edge.node.frontmatter;

                var url = site.siteMetadata.siteUrl + '/'; 
                if(posttype === 'comicpage') 
                {
                  url += 'comics/' + comic + "/" + slug;                  
                }
                else 
                {
                  url += 'blog/' + slug;
                }

                //get a display image.
                var seoImageUrl = null;
                if(comicImage !== null) 
                {
                  if(comicImage.extension && comicImage.extension === 'mp4' && socialMediaImage !== null) 
                  {
                    //if we do a video use the social media image.
                    seoImageUrl = socialMediaImage.publicURL;
                  }
                  else 
                  {
                    seoImageUrl = comicImage.publicURL;
                  }
                }
                
                //run through the entire image stack and write out some simple html.
                var imgDiv = "<div>";
                if(comicImageStack !== null) {
                  comicImageStack.map((image, index) => (
                    imgDiv += "<img src=\"" + site.siteMetadata.siteUrl + image.publicURL + "\" />" 
                  ))
                  imgDiv += "</div><br>"
                }
                else 
                {
                  imgDiv = "<div><img src=\"" + seoImageUrl + "\" /></div><br>";
                }

                return Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.excerpt,
                  date: edge.node.frontmatter.date,
                  url: url,
                  guid: url,
                  enclosure: {
                    url: seoImageUrl
                  },

                  //replace static with the site metadata url.
                  //https://markshust.com/2020/06/25/fixing-images-in-gatsby-rss-feeds/
                  custom_elements: [{ "content:encoded": imgDiv + edge.node.html.replace(
                    /(?<=\"|\s)\/static\//g,
                    `${site.siteMetadata.siteUrl}\/static\/`
                  )}],
                })
              })
            },
            query: `
              {
                allMarkdownRemark(
                  sort: { order: DESC, fields: [frontmatter___date] }, limit: 10
                ) {
                  edges {
                    node {
                      excerpt
                      html
                      frontmatter {
                        title
                        date
                        slug
                        comic
                        posttype
                        comicImage {
                          publicURL
                        }
                        comicImageStack {
                          publicURL
                        }
                        socialMediaImage {
                          publicURL
                        }
                      }
                    }
                  }
                }
              }
            `,
            output: "/rss.xml",
            title: "<Webcomic Site Name>",
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        // You can add multiple tracking ids and a pageview event will be fired for all of them.
        trackingIds: [
          "<ga_tracking_id>", // Google Analytics
        ],
        // This object gets passed directly to the gtag config command
        // This config will be shared across all trackingIds
        gtagConfig: {
          optimize_id: "OPT_CONTAINER_ID",
          anonymize_ip: true,
          cookie_expires: 0,
        },
        // This object is used for configuration specific to this plugin
        pluginConfig: {
          // Puts tracking script in the head instead of the body
          head: false,
          // Setting this parameter is also optional
          respectDNT: true
        },
      },
    },
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
    `gatsby-plugin-catch-links`,
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-twitter`,
    `gatsby-plugin-instagram-embed`,
    `gatsby-plugin-offline`,  
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`, // Needed for dynamic images
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: "gatsby-remark-embed-video",
            options: {
              width: 800,
              ratio: 1.77, // Optional: Defaults to 16/9 = 1.77
              height: 400, // Optional: Overrides optional.ratio
              related: false, //Optional: Will remove related videos from the end of an embedded YouTube video.
              noIframeBorder: true, //Optional: Disable insertion of <style> border: 0
              loadingStrategy: 'lazy', //Optional: Enable support for lazy-load offscreen iframes. Default is disabled.
              urlOverrides: [
                {
                  id: "youtube",
                  embedURL: videoId =>
                    `https://www.youtube-nocookie.com/embed/${videoId}`,
                },
              ], //Optional: Override URL of a service provider, e.g to enable youtube-nocookie support
              containerClass: "embedVideo-container", //Optional: Custom CSS class for iframe container, for multiple classes separate them by space
              iframeId: false, //Optional: if true, iframe's id will be set to what is provided after 'video:' (YouTube IFrame player API requires iframe id)
            },
          },
          `gatsby-remark-responsive-iframe`,
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: "language-",
              inlineCodeMarker: null,
              showLineNumbers: true
            }
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 1140,
              withWebp: true,
              showCaptions: true,
              markdownCaptions: true
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `comics`,
        path: `${__dirname}/src/content/comics/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `blog`,
        path: `${__dirname}/src/content/blog/`,
      },
    },
  ],
  siteMetadata: {
    title: '<Webcomic Site>',
    siteUrl: 'https://www.site.com',
    description: '<Site Description>',
    dateCreated: '<2021>',
    contact: 'your.name@email-server.com',
    author: '<Author Name>',
    fb_appid: `<fb_app_id>`,
    menuLinks: [
      {
        name: "Comics",
        url: "/comics/",
        type: "internal" // internal or anchor
      },
      {
        name: "Blog",
        url: "/blog/",
        type: "internal" // internal or anchor
      }
    ],
    externalLinks : [
      {
        name: `Google`,
        url: `https://www.google.com`
      },
      {
        name: `Twitter`,
        url: `https://www.twitter.com`
      }
    ],
    // Social links
    socials: [
      {
        name: `Facebook`,
        url: `https://www.facebook.com/`
      },
      {
        name: `Twitter`,
        url: `https://twitter.com/`
      },
      {
        name: `Instagram`,
        url: `https://www.instagram.com/`
      }
    ]
  }
}
