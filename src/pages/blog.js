import { graphql } from 'gatsby'
import React from 'react'
import Layout from '../components/Layout'
import StyledDivBox from '../components/DivBox'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import UseSiteMetadata from "../hooks/use-sitemeta"


export default function blog({data}) {
    const posts = data.posts.nodes;
    const { siteUrl, title } = UseSiteMetadata();
    const currAbsUrl = siteUrl + '/blog/';
    
    const blogTitle = "Journal entries about " + title;
    const blogDesc = "A listing of blog posts for " + title + ".";
    return (
        <Layout absUrl={currAbsUrl} title={blogTitle} description={blogDesc}>
          <Container className="my-5">
            <div>
                <h1>Blog Posts</h1>
            </div>
          </Container>
          <Container>
            <Row>
              {posts.map(post => (
                <Col md="6" className="mb-4" key={'col_' + post.id}>
                  <StyledDivBox 
                    key={post.id} 
                    frontmatter={post.frontmatter} 
                    imageData = {post.frontmatter.thumbnailImage}
                    pages = {null}
                    link = {"/" + post.parent.sourceInstanceName + "/" + post.parent.relativeDirectory}
                    html={post.exerpt} />
                </Col>
              ))}
            </Row>
          </Container>
        </Layout>
    )
}

export const BlogPostQuery = graphql`
fragment BlogPostMarkdownFrontmatter on MarkdownRemark {
  frontmatter {
    slug
    title
    date
    posttype
    tags
    firstPage
    featuredText
    categories
    thumbnailImage {
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
  }
}

query BlogPostsQuery {
  posts: allMarkdownRemark(
    filter: {fileAbsolutePath: {regex: "/blog/"}, frontmatter: {posttype: {eq: "post"}}}
    sort: {fields: frontmatter___date, order: DESC}
  ) {
    nodes {
      ...BlogPostMarkdownFrontmatter
      id
      excerpt
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
