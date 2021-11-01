import React from 'react'
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { convertToBgImage } from "gbimage-bridge"
import { Link } from 'gatsby';
import styled from 'styled-components'
import BackgroundImage from 'gatsby-background-image'
import Col from 'react-bootstrap/Col';

const DivBoxStyle = styled.div`
    height: 50vh;
    width: 100%;
    background-color: red;
    align-items: center;
    justify-content: center;
    margin: 5px 0px;
`

const WhiteBox = styled.div`
	background-color: #00509d;
	display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    padding: 1rem;
`

const CardBody = styled.div`
    border-radius: 0;
    box-shadow: 0 20px 40px -14px rgb(0 0 0 / 25%);
    display: flex;
    flex-direction: column;
    overflow: hidden;
	height: 100%;
`

function MakeComicLinkButton({ bShowButton, text, slug, bookId }) {
	if (bShowButton !== null && bShowButton) {
		return (
			<div>
				<Link
					key={bookId}
					className="btn text-btn-gold btn-default btn-block"
					to={"/comics/" + slug}>
					{text}
				</Link>
			</div>
		);
	}

	return null;
}

function H3Title({ text }) {
	return <h3>{text}</h3>
}

function FeaturedText({ bShowFeaturedText, text }) {
	if (bShowFeaturedText !== null && bShowFeaturedText) {
		return <div><p>{text}</p></div>;
	}

	return null;
}

// export default function DivBox({frontmatter, html, pages, className}) {
//image - optional if we don't want to use the featuredImage from frontmatter.
const DivBox = ({ bookId, frontmatter, bShowFeaturedText, bShowButton, imageData, link, id, pages, className }) => {
	const { title, featuredText } = frontmatter;

	var { featuredImage } = frontmatter;
	if (imageData !== null) {
		featuredImage = imageData;
	}

	var linkURL = '/';
	var linkId = "";
	if (pages !== null && pages.length > 0) {
		const page = pages[0];
		linkURL = "/" + page.parent.sourceInstanceName + "/" + page.parent.relativeDirectory;
		linkId = page.id;
	}
	else {
		linkURL = link;
	}

	if (id !== null) {
		linkId = id;
	}

	const colSize = 6;

	//we have a featured image.
	if (title != null) {
		const image = convertToBgImage(getImage(featuredImage));
		return (
			<CardBody>
				<div className="hover-zoom">
					<Link to={linkURL} key={linkId}>
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
					<div className="mt-auto w-100">
						<MakeComicLinkButton
							key={'comiclink_' + title + '_' + bookId}
							bShowButton={bShowButton}
							text="View Comic Pages"
							slug={frontmatter.slug}
							bookId={bookId}
						/>
					</div>
				</WhiteBox>
			</CardBody>
		)
	}
	else {
		return (
			<Col md={colSize}>
				<DivBoxStyle>
					<GatsbyImage alt="featured comic image" image={getImage(frontmatter.featuredImage)} />
				</DivBoxStyle>
			</Col>
		)
	}
}


const StyledDivBox = styled(DivBox)`
  width: 100%;
  height: 33vh;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px 0px;
`

export default StyledDivBox
