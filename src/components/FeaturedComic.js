import { graphql, useStaticQuery } from 'gatsby'
import React from 'react'
import FullCover from '../components/FullCover'
import { getComicPages } from '../utils/utils'
import Container from 'react-bootstrap/Container'

export default function FeaturedComic() {
    const { featuredImgData, comicpages } = useStaticQuery(
        graphql`
        {
            featuredImgData: markdownRemark(
                frontmatter: {tags: {eq: "featured"}, posttype: {eq: "comicbook"}}
            ) {
                frontmatter {
                    slug
                    title
                    date
                    posttype
                    tags
                    firstPage
                    featuredText
                    categories
                    featuredImage {
                        childImageSharp {
                        gatsbyImageData(placeholder: BLURRED, formats: WEBP)
                        }
                        relativeDirectory
                        sourceInstanceName
                    }
                }
                id
                html
                parent {
                    ... on File {
                        relativeDirectory
                    }
                }
            }
            comicpages: allMarkdownRemark(
                filter: {fileAbsolutePath: {regex: "/comics/"}, frontmatter: {posttype: {eq: "comicpage"}}}
                sort: {fields: [frontmatter___comic, frontmatter___date], order: [ASC, ASC]}
            ) {
                nodes {
                    frontmatter {
                        slug
                        title
                        date
                        posttype
                    }
                    id
                    parent {
                        ... on File {
                        relativeDirectory
                        }
                    }
                }
            }
        }`
    );

    if(featuredImgData !== null) 
    {
        // console.log("featuredImageData" + JSON.stringify(featuredImgData));
        const { html, id, frontmatter, parent} = featuredImgData;
        const pages = comicpages.nodes;
        return (
            <section className="mt-3">
                <Container>
                    <h3>FEATURED COMIC</h3>
                </Container>
                <FullCover key={id} frontmatter={frontmatter} html={html} pages={getComicPages(parent.relativeDirectory, pages)} />
            </section>
        )    
    }
    else 
    {
        return null;
    }
}

