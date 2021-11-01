import React from 'react'
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { convertToBgImage } from "gbimage-bridge"
import { Link } from 'gatsby';
import styled from 'styled-components'
import BackgroundImage from 'gatsby-background-image'

export const CoverBody = styled.div`
    border-radius: 0;
    box-shadow: 0 20px 40px -14px rgb(0 0 0 / 25%);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    height: 100%;
`

const WhiteBox = styled.div`
	background-color: #00509d;
	display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    padding: 1rem;
`

export const OverlayDiv = styled.div`
    background-color: rgba(0, 0, 0, 0.7);
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 15vh;
    padding: 10px 20px;
`

function MakeComicLinkButton({bShowButton, text, slug, bookId}) 
{
    if(bShowButton !== null && bShowButton) 
    {
        return (
            <div>
                <Link 
                    key={bookId}
                    className="btn text-btn-gold btn-default btn-lg" 
                    to={"/comics/" + slug}>
                        {text}
                </Link>
            </div>
        );
    }

    return null;
}

function H3Title({text}) 
{
    return <h3>{text}</h3>
}

function FeaturedText({bShowFeaturedText, text})
{
    if(bShowFeaturedText !== null && bShowFeaturedText) 
    {
        return <div><p>{text}</p></div>;
    }

    return null;
}

const FullCover = ({bookId, frontmatter, bShowFeaturedText, bShowButton, pages, className}) => {
    const { title, featuredText} = frontmatter;
    const { featuredImage } = frontmatter;

    //we have a featured image.
    if(pages.length > 0 && title != null)
    {
        const page = pages[0];
        const image = convertToBgImage(getImage(featuredImage));
        return (
            <CoverBody>
                <div className="hover-zoom">
                    <Link to={"/comics/" + page.parent.relativeDirectory} key={page.id}>
                        <BackgroundImage
                            Tag="section"
                            className={className}
                            fluid={image.fluid}
                            backgroundColor={`#040e18`}
                            title="Fullscreen Background"
                            id="fullscreenbg"
                            role="img"
                            aria-label="Fullscreen Background"
                            preserveStackingContext={true}
                        >
                        </BackgroundImage>     
                    </Link>
                </div>
                <WhiteBox className="d-flex align-items-start flex-column">
                    <H3Title 
                        key={'title_' + title + '_' + bookId} 
                        text={title}
                    />
                    <FeaturedText 
                        key={'featuredtext_' + title} 
                        bShowFeaturedText={bShowFeaturedText} 
                        text={featuredText} 
                    />
                    <MakeComicLinkButton 
                        key={'comiclink_' + title + '_' + bookId} 
                        bShowButton={bShowButton} 
                        text="View Comic Pages" 
                        slug={frontmatter.slug} 
                        bookId={bookId} 
                    />
                </WhiteBox>
            </CoverBody>
        )
    }
    else 
    {
        return (
            <div>
                <GatsbyImage alt="featured comic image" image={getImage(frontmatter.featuredImage)} />
            </div>
        )
    }
}

const StyledFullCover = styled(FullCover)`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`

export default StyledFullCover
