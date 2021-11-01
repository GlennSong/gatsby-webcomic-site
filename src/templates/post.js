import React from 'react'
import Layout from '../components/Layout'
import { htmlstyle } from '../styles/project-details.module.css';
import { graphql } from 'gatsby';
import { PrevLink, NextLink, GetLocalTime } from '../utils/utils';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import SocialShare from '../components/SocialShare'
import { GetCurrPageURL } from '../utils/utils'
import FeaturedComic from '../components/FeaturedComic'
import UseSiteMetadata from '../hooks/use-sitemeta';

export default function Post({ data }) {
	const { html, frontmatter, parent, excerpt } = data.pageContent;
	const { id } = parent;
	const { title, date, thumbnailImage, socialMediaImage } = frontmatter;
	const { edges } = data.urlLinks;
	const { siteUrl } = UseSiteMetadata();
    const currAbsUrl = GetCurrPageURL(id, edges, siteUrl);

    var seoImage = null;
    if (socialMediaImage !== null) {
        seoImage = socialMediaImage;
    } else {
        seoImage = thumbnailImage;
    } 

	return (
		<Layout absUrl={currAbsUrl} title={frontmatter.title} description={excerpt} image={seoImage}>
			<article className="tmc-article">
				<Container>
					<section >
						<br />
						<h1>{title}</h1>
						<p>{GetLocalTime(new Date(date))}</p>
						<hr />
						<div className={htmlstyle} dangerouslySetInnerHTML={{ __html: html }} />
					</section>
					<section className="mt-5 tmc-center">
						<SocialShare
							shareUrl={currAbsUrl}
							image={null}
							title={title}
						/>
					</section>
					<br />
					<div className="mb-5 mt-5">
            <h3>POST NAVIGATION</h3>
						<Container>
							<Row>
								<Col md="6">
									<PrevLink
                    className="mb-2 text-btn-gold btn btn-lg btn-block btn-default"
                    id={id}
                    edges={edges}
                  >
                    <span>Previous</span>
                  </PrevLink>							
								</Col>
								<Col md="6">
									<NextLink
                    className="text-btn-gold btn btn-lg btn-block btn-default"
                    id={id}
                    edges={edges}
                  >
                    <span>Next</span>
                  </NextLink>
								</Col>
							</Row>
						</Container>
					</div>
				</Container>
			</article>
      <FeaturedComic />
		</Layout>
	)
}

//get the current comic page's details and an array of previous and next links.
export const query = graphql`
query PostQuery($slug: String) {
  pageContent: markdownRemark(frontmatter: {slug: {eq: $slug}}) {
    frontmatter {
      slug
      date
      title
      thumbnailImage {
        childImageSharp {
          gatsbyImageData(formats: WEBP, placeholder: BLURRED)
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
  urlLinks: allMarkdownRemark(
    sort: {order: ASC, fields: frontmatter___date}
    filter: {fileAbsolutePath: {regex: "/content/blog/"}, frontmatter: {posttype: {eq: "post"}}}
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