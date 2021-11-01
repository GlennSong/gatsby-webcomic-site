import React from 'react'
// import { header } from '../styles/home.module.css'
import Layout from "../components/Layout"
import { htmlstyle } from '../styles/project-details.module.css';
import { graphql } from 'gatsby';
import { ShowContent, GetCurrPageURL, NextLink, GetNextAbsoluteURL } from '../utils/utils';
import SocialShare from '../components/SocialShare'
import { Helmet } from 'react-helmet';
import Container from 'react-bootstrap/Container'
import UseSiteMetadata from '../hooks/use-sitemeta';
import { GetLocalTime } from '../utils/utils'
import ComicNav from '../components/ComicNav';

export default function ComicPage({ data }) {

	const { html, frontmatter, parent, excerpt } = data.pageContent;
	const { id } = parent;
	const { slug, title, date, comicImage, comicImageStack, thumbnailImage, socialMediaImage } = frontmatter;
	const { edges } = data.urlLinks;
	const { siteUrl } = UseSiteMetadata();

    console.log("imagestack is " + JSON.stringify(comicImageStack));

    var seoImage = null;
    if (socialMediaImage !== null) {
        seoImage = socialMediaImage;
    } else if(comicImageStack !== null || (comicImage !== null && comicImage.extension && comicImage.extension === 'mp4')) {
        seoImage = thumbnailImage;    
    } else {
        seoImage = comicImage;
    } 

    var absUrl = GetCurrPageURL(id, edges, siteUrl);

    var imageStack = null;
    if (comicImageStack !== null) 
    {
        console.log("found comicImageStack");
        imageStack = comicImageStack;
    }
    else if(comicImage !== null)
    {
        console.log("found comicImage");
        imageStack = [comicImage];
    }
    else 
    {
        console.log("Error: Need to implement either comicImage or comicImageStack.");
    }

	return (
		<Layout
      absUrl={absUrl}
			title={frontmatter.title}
			description={excerpt}
      image={seoImage}
		>
			<Helmet>
				<link rel="next" href={GetNextAbsoluteURL(id, edges, siteUrl)} />
			</Helmet>
			<article className="tmc-article">
				<section>
					<div className="tmc-center tmc-stack">
						<NextLink
							id={id}
							edges={edges}
						>
              {imageStack.map((image, index) => (
                  <ShowContent content={image} key={slug + '-' + index}/>
              ))}
						</NextLink>
					</div>
				</section>
				<Container>
                    <ComicNav id={id} edges={edges} firstComic={data.firstComicURL.nodes[0].parent} lastComic={data.lastComicURL.nodes[0].parent} />
					<section >
						<br />
						<h1>{title}</h1>
						<p>{GetLocalTime(new Date(date))}</p>
						<hr />
						<div className={htmlstyle} dangerouslySetInnerHTML={{ __html: html }} />
					</section>
					<section className="mt-5 mb-5 tmc-center">
						<SocialShare
							shareUrl={absUrl}
							image={comicImage}
							title={title}
						/>
					</section>
				</Container>
			</article>
		</Layout>
	)
}

//get the current comic page's details and an array of previous and next links.
export const query = graphql`
query ComicPageQuery($slug: String) {
  pageContent: markdownRemark(frontmatter: {slug: {eq: $slug}}) {
    frontmatter {
      slug
      date
      title
      comicImage {
        childImageSharp {
          gatsbyImageData(placeholder: BLURRED, formats: WEBP)
          original {
            height
            width
          }
        }
        extension
        publicURL
      }
      comicImageStack {
        childImageSharp {
           gatsbyImageData(formats: WEBP, placeholder: BLURRED)
           original {
            height
            width
          }
        }
      } 
      thumbnailImage {
        childImageSharp {
          gatsbyImageData(placeholder: BLURRED, width: 1140, formats: WEBP)
          original {
            height
            width
          }
        }
        extension
        publicURL
      }
      socialMediaImage {
        childImageSharp {
          gatsbyImageData(placeholder: BLURRED, width: 1140, formats: WEBP)
          original {
            height
            width
          }
        }
        extension
        publicURL
      }
    }
    html
    parent {
      ... on File {
        id
      }
    }
    excerpt(format: PLAIN)
  }
  firstComicURL: allMarkdownRemark(
    sort: {order: ASC, fields: frontmatter___date}
    filter: {fileAbsolutePath: {regex: "/comics/"}, frontmatter: {posttype: {eq: "comicpage"}}}
    limit: 1
  ) {
    nodes {
      parent {
        ... on File {
          id
          relativeDirectory
          sourceInstanceName
        }
      }
    }
  }
  lastComicURL: allMarkdownRemark(
    sort: {order: DESC, fields: frontmatter___date}
    filter: {fileAbsolutePath: {regex: "/comics/"}, frontmatter: {posttype: {eq: "comicpage"}}}
    limit: 1
  ) {
    nodes {
      parent {
        ... on File {
          id
          relativeDirectory
          sourceInstanceName
        }
      }
    }
  }  
  urlLinks: allMarkdownRemark(
    sort: {fields: [frontmatter___comic, frontmatter___date], order: [ASC, ASC]}
    filter: {fileAbsolutePath: {regex: "/content/"}, frontmatter: {posttype: {eq: "comicpage"}}}
  ) {
    edges {
      previous {
        parent {
          ... on File {
            id
            sourceInstanceName
            relativeDirectory
          }
        }
      }
      node {
        parent {
          ... on File {
            id
            relativeDirectory
            sourceInstanceName
          }
        }
      }
      next {
        parent {
          ... on File {
            id
            sourceInstanceName
            relativeDirectory
          }
        }
      }
    }
  }
}
`