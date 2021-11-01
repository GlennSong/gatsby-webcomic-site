import { graphql, Link } from 'gatsby';
import React from 'react';
import Layout from "../components/Layout";
import { htmlstyle } from '../styles/project-details.module.css';
import Container from 'react-bootstrap/Container'
import FeaturedComic from '../components/FeaturedComic'
import SocialShare from '../components/SocialShare'
import UseSiteMetadata from '../hooks/use-sitemeta'
import { ShowContent, GetLocalTime } from '../utils/utils';
import ComicNav from '../components/ComicNav';

export default function ComicViewer({ data }) {
	const { id } = data.firstComicURL.nodes[0].parent;

	//GSONG_TODO: Where should we get the excerpt from? A dedicated spot or the front matter description?
	const { parent, html, frontmatter } = data.latestComic.nodes[0];
    const { slug, title, date, comicImage, comicImageStack, thumbnailImage, socialMediaImage } = frontmatter;
	const { siteUrl } = UseSiteMetadata();
    const { edges } = data.urlLinks;

	// const nextRelUrl = "/" + sourceInstanceName + "/" + relativeDirectory;
	const currAbsUrl = siteUrl + "/" + parent.sourceInstanceName + "/" + parent.relativeDirectory;

  var seoImage = null;
  if (socialMediaImage !== null) {
    seoImage = socialMediaImage;
  } else if(comicImageStack !== null || (comicImage !== null && comicImage.extension && comicImage.extension === 'mp4')) {
    seoImage = thumbnailImage;    
  } else {
    seoImage = comicImage;
  } 

  var imageStack = null;
  if (comicImageStack !== null) 
  {
      imageStack = comicImageStack;
  }
  else if(comicImage !== null)
  {
      imageStack = [comicImage];
  }
  else 
  {
      console.log("Error: Need to implement either comicImage or comicImageStack.");
  }

	return (
		<Layout
      absUrl={currAbsUrl}
			title="This Mortal Coil Webcomic" 
			description="A webcomic by Glenn Song."
			image={seoImage}
		>
			<article className="tmc-article">
				<section>
					<div className="tmc-center tmc-stack">
						<Link to={"/comics/"} key={id}>
              {imageStack.map((image, index) => (
                  <ShowContent content={image} key={slug + '-' + index} />
              ))}
						</Link>
					</div>
				</section>

				<Container>
                    <ComicNav id={data.latestComic.nodes[0].parent.id} edges={edges} firstComic={data.firstComicURL.nodes[0].parent} lastComic={data.latestComic.nodes[0].parent} />
					<section >
						<br />
						<h1>{title}</h1>
						<p>{GetLocalTime(new Date(date))}</p>
						<hr />
						<div className={htmlstyle} dangerouslySetInnerHTML={{ __html: html }} />
					</section>
					<section className="mt-5 mb-5 tmc-center">
						<SocialShare
							shareUrl={currAbsUrl}
							image={comicImage}
							title={title}
						/>
					</section>
				</Container>
			</article>
			<FeaturedComic />
		</Layout>
	)
}

// How to get a file folder
// https://stackoverflow.com/questions/58016672/gatsby-and-graphql-how-to-filter-allmarkdownremark-by-folder

// How to sort by multiple fields
// https://stephencharlesweiss.com/graphql-multi-field-sorting/

export const query = graphql`
query MyQuery {
  latestComic: allMarkdownRemark(
    sort: {order: DESC, fields: frontmatter___date}
    filter: {fileAbsolutePath: {regex: "/comics/"}, frontmatter: {posttype: {eq: "comicpage"}}}
    limit: 1
  ) {
    nodes {
      html
      excerpt(format: PLAIN)
      parent {
        ... on File {
          id
		      relativeDirectory
          sourceInstanceName
        }
      }

      frontmatter {
        slug
        date
        title
        comicImage {
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
        comicImageStack {
          childImageSharp {
             gatsbyImageData(formats: WEBP, placeholder: BLURRED)
             original {
              height
              width
            }
          }
        } 
      }
    }
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

//query to help build contents for a dropdown: 
//returns all the absolute paths
// query MyQuery {
//   allFile(filter: {ext: {eq: ".md"}, absolutePath: {regex: "/comics/"}}) {
//     edges {
//       node {
//         name
//         absolutePath
//       }
//     }
//   }
// }




// export const query = graphql`
// query MyQuery {
//   markdownRemark(frontmatter: {slug: {eq: "one-of-us-1"}}) {
//     frontmatter {
//       date
//       slug
//       title
//       comicImage {
//         childImageSharp {
//           gatsbyImageData(placeholder: BLURRED, formats: WEBP)
//         }
//       }
//     }
//   }
// }
// `


// import { graphql, Link } from "gatsby"
// import React from "react"
// import Layout from "../components/Layout"
// import {header, btn} from '../styles/home.module.css'
// import {GatsbyImage, getImage} from 'gatsby-plugin-image';

// export default function Home({data}) {
//   const image = getImage(data.file.childImageSharp);

//   return (
//     <Layout>
//       <section className={header}>
//         <div>
//           <h2>Design</h2>
//           <h3>Develop and Deploy</h3>
//           <p>UX Designer & web developer based in pooptown.</p>
//           <Link className={btn} to="/projects">My Portfolio Projects</Link>
//         </div>
//         <GatsbyImage image={image} alt="blah blah" />
//       </section>
//     </Layout>
//   )
// }


// export const query = graphql`
//   query Banner {
//     file(relativePath: {eq: "banner.png"}) {
//       childImageSharp {
//         gatsbyImageData(formats: WEBP, placeholder: BLURRED)
//       }
//     }
//   }

// `