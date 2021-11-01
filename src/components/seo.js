import React from "react"
import PropTypes from "prop-types"
import { Helmet } from "react-helmet"
import UseSiteMetadata from "../hooks/use-sitemeta"

function SEO({description, lang, meta, title, image, absUrl }) {
  const metadata = UseSiteMetadata();
  const metaDescription = description || metadata.description

  var htmlMetaInfo = [
    {
      name: `description`,
      content: metaDescription,
    },
    {
      property: `og:title`,
      content: title,
    },
    {
      property: `og:description`,
      content: metaDescription,
    },
    {
      property: `og:type`,
      content: `website`,
    },
    {
      property: `fb:app_id`,
      content: metadata.fb_appid
    },
    {
      name: `twitter:creator`,
      content: metadata.author,
    },
    {
      name: `twitter:card`,
      content: `summary_large_image`
    },
    {
      name: `twitter:title`,
      content: title,
    },
    {
      name: `twitter:description`,
      content: metaDescription,
    }
  ];

  if(absUrl) 
  {
    htmlMetaInfo.push({
      property: `og:url`,
      content: absUrl
    });
  }

  //add any image information if we have it.
  if (image) 
  {
    const imageSrc = image.childImageSharp.gatsbyImageData.images.fallback.src;
    const {width, height} = image.childImageSharp.original;

    var siteUrl = metadata.siteUrl;

    htmlMetaInfo.push({
      name: `twitter:image`,
      content: siteUrl + imageSrc
    },
    {
      property: 'og:image',
      content: siteUrl + imageSrc
    },
    {
      property: 'og:image:width',
      content: width
    },
    {
      property: 'og:image:height',
      content: height
    });
  }

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s | ${metadata.title}`}
      meta={htmlMetaInfo.concat(meta)}
    />
  )
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``,
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
}

export default SEO