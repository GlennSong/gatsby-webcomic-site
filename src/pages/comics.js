import { graphql } from "gatsby"
import React from "react"
import Layout from "../components/Layout"
import { getComicPages } from "../utils/utils"
import FullCover from "../components/FullCover"
import StyledDivBox from "../components/DivBox"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import UseSiteMetadata from "../hooks/use-sitemeta"

export default function comics( { data } ) {
	const featuredBooks = data.featuredbook.nodes;
	const longformBooks = data.longformbooks.nodes;
	const shortformBooks = data.shortformbooks.nodes;
	const pages = data.comicpages.nodes;
    const { siteUrl } = UseSiteMetadata();
    const currAbsUrl = siteUrl + '/comics/';
  
	return (
		<Layout
      absUrl={currAbsUrl}
			title="This Mortal Coil Episodes"
			description="A listing of all the available comics to read for This Mortal Coil."
		>
			<div className="my-5">
				<h1>Comic Directory</h1>
			</div>
			{featuredBooks.map(book => (
				<FullCover
					key={'featuredbook_' + book.id}
					bookId={book.id}
					bShowFeaturedText={true}
					bShowButton={true}
					frontmatter={book.frontmatter}
					html={book.html}
					pages={getComicPages(book.parent.relativeDirectory, pages)}
				/>
				// <ComicDirEntry key={book.id} frontmatter={book.frontmatter} html={book.html} pages={getComicPages(book.parent.relativeDirectory, pages)} />
			))}
      <div className="my-5">
  			<h2>Long Form Stories</h2>
      </div>
			{longformBooks.map(book => (
				<FullCover
					key={'longformbook_' + book.id}
					bookId={book.id}
					bShowFeaturedText={true}
					bShowButton={true}
					frontmatter={book.frontmatter}
					html={book.html}
					pages={getComicPages(book.parent.relativeDirectory, pages)}
				/>
			))}
      <div className="my-5">
  			<h2>Short Stories</h2>
      </div>

			<Container fluid>
				<Row>
					{shortformBooks.map(book => (
            <Col md="4" className="mb-4" key={'col_' + book.id}>
              <StyledDivBox
                key={'shortstory_' + book.id}
                bookId={book.id}
                bShowFeaturedText={true}
                bShowButton={true}
                frontmatter={book.frontmatter}
                html={book.html}
                imageData={null}
                link=""
                pages={getComicPages(book.parent.relativeDirectory, pages)}
              />
            </Col>
					))}
				</Row>
			</Container>
		</Layout>
	)
}

export const query = graphql`
  fragment MarkdownFrontmatter on MarkdownRemark {
    frontmatter {
      slug
      title
      date
      posttype
      tags
      firstPage
      featuredText
      categories
      chapterList
      chapter
      featuredImage {
        childImageSharp {
          gatsbyImageData(placeholder: BLURRED, formats: WEBP)
          original {
            height
            width
          }
        }
        relativeDirectory
        sourceInstanceName
      }
      comicImage {
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
  query ComicBooksQuery {
    featuredbook: allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/comics/" }
        frontmatter: { posttype: { eq: "comicbook" }, tags: { eq: "featured" } }
      }
      sort: { fields: frontmatter___date, order: DESC }
    ) {
      nodes {
        ...MarkdownFrontmatter
        id
        html
        parent {
          ... on File {
            relativeDirectory
            sourceInstanceName
          }
        }
      }
    }
    longformbooks: allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/comics/" }
        frontmatter: {
          posttype: { eq: "comicbook" }
          tags: { eq: "long-form", ne: "featured" }
        }
      }
      sort: { fields: frontmatter___date, order: DESC }
    ) {
      nodes {
        ...MarkdownFrontmatter
        id
        html
        parent {
          ... on File {
            relativeDirectory
            sourceInstanceName
          }
        }
      }
    }
    shortformbooks: allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/comics/" }
        frontmatter: {
          posttype: { eq: "comicbook" }
          tags: { eq: "short-form" }
        }
      }
      sort: { fields: frontmatter___date, order: DESC }
    ) {
      nodes {
        ...MarkdownFrontmatter
        id
        html
        parent {
          ... on File {
            relativeDirectory
            sourceInstanceName
          }
        }
      }
    }
    comicpages: allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/comics/" }
        frontmatter: { posttype: { eq: "comicpage" } }
      }
      sort: {
        fields: [frontmatter___comic, frontmatter___date]
        order: [ASC, ASC]
      }
    ) {
      nodes {
        frontmatter {
          slug
          title
          date
          posttype
          comic
          chapter
        }
        id
        parent {
          ... on File {
            relativeDirectory
            sourceInstanceName
          }
        }
      }
    }
  }
`
