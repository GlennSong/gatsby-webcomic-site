import React from 'react'
import {
	FacebookIcon,
	EmailIcon,
	PinterestIcon,
	RedditIcon,
	TwitterIcon,
	EmailShareButton,
	FacebookShareButton,
	PinterestShareButton,
	RedditShareButton,
	TwitterShareButton
} from 'react-share'
import UseSiteMetadata from '../hooks/use-sitemeta';

function ShowPinterest({url, description, shareIconSize, siteUrl, image }) {
	if (image === null) {
		return null;
	}

	const pinterestImageUrl = siteUrl + image.publicURL;
	return (
		<PinterestShareButton
			url={url}
			media={pinterestImageUrl}
			description={description}
		>
			<PinterestIcon size={shareIconSize} />
		</PinterestShareButton>
	)
}

export default function SocialShare({ shareUrl, image, title }) {
	const shareIconSize = 80;
	const { siteUrl } = UseSiteMetadata();

	return (
		<div>
			<EmailShareButton
				body={"Hey, check out" + title + "!"}
				subject="Check out this webcomic!"
				url={shareUrl}
			>
				<EmailIcon size={shareIconSize} />
			</EmailShareButton>

			<FacebookShareButton
				url={shareUrl}
				quote={title}
			>
				<FacebookIcon size={shareIconSize} />
			</FacebookShareButton>

			<ShowPinterest 
				url={shareUrl}
				description={title}
				shareIconSize={shareIconSize}
				siteUrl={siteUrl} 
				image={image} 
			/>

			<RedditShareButton
				url={shareUrl}
				title={title}
			>
				<RedditIcon size={shareIconSize} />
			</RedditShareButton>
			<TwitterShareButton
				url={shareUrl}
				title={'Read ' + title}
				hashtags={['webcomics', 'art']}
			>
				<TwitterIcon size={shareIconSize} />
			</TwitterShareButton>
		</div>
	)
}
