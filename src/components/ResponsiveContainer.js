import { graphql, useStaticQuery } from 'gatsby'
import React from 'react'
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { convertToBgImage } from "gbimage-bridge"
import { Link } from 'gatsby';
import styled from 'styled-components'
import BackgroundImage from 'gatsby-background-image'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

const FullScreenDiv = styled.div`
    // display: flex;
    // justify-content: left;
    // align-items: top;   
    // width: 100vh;
    // height: 50vh;
    padding: auto 100vh;
`

// export default function FeaturedComic() {
// export default FeaturedComic;
const ResponsiveContainer = ({className}) => {
    const { featuredImgData } = useStaticQuery(
        graphql`
            query {
                featuredImgData: markdownRemark(
                frontmatter: {tags: {eq: "featured"}, posttype: {eq: "comicbook"}}
                ) {
                    frontmatter {
                        title
                        slug
                        firstPage
                        featuredImage {
                        childImageSharp {
                            gatsbyImageData(
                                formats: WEBP
                                placeholder: BLURRED
                                width: 1920
                            )
                        }
                        relativeDirectory
                        sourceInstanceName
                        }
                        featuredText
                    }
                }
            }   
        `
    );

    const { title, featuredText, firstPage } = featuredImgData.frontmatter;
    const { sourceInstanceName, relativeDirectory } = featuredImgData.frontmatter.featuredImage;
    const image = getImage(featuredImgData.frontmatter.featuredImage);
    const bgImage = convertToBgImage(image);

    return (
        <section>
            <h3>FEATURED COMIC</h3>
            <Link to={"/" + sourceInstanceName + "/" + relativeDirectory + "/" + firstPage}>
                <BackgroundImage
                    Tag="section"
                    className={className}
                    // Spread bgImage into BackgroundImage:
                    {...bgImage}
                    preserveStackingContext
                >
                    <FullScreenDiv />
                </BackgroundImage>            
            </Link>
        </section>

        // <section>
        //     <h3>FEATURED COMIC</h3>
        //     <Link to={"/" + sourceInstanceName + "/" + relativeDirectory + "/" + firstPage}>
        //         <BackgroundImage
        //             Tag="section"
        //             className={className}
        //             // Spread bgImage into BackgroundImage:
        //             {...bgImage}
        //             preserveStackingContext
        //         >
        //             <FullScreenDiv />
        //         </BackgroundImage>            
        //     </Link>
        // </section>
    )
}

const StyledResponsiveContainer = styled(ResponsiveContainer)`
  width: 100%;
  background-position: bottom center;
  background-repeat: repeat-y;
  background-size: cover;
`

export default StyledResponsiveContainer;