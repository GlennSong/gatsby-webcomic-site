import React from 'react';
import { Link } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { FaFacebookSquare, FaTwitterSquare, FaInstagramSquare, FaEnvelope } from 'react-icons/fa'
import { format } from 'date-fns'

export const kNext = "next";
export const kPrevious = "previous";
export const kCurr = "node";

export function SocialIcon({ name }) {
	const lcName = name.toLowerCase();
	if (lcName === 'facebook') {
		return <FaFacebookSquare />;
	}
	else if (lcName === 'twitter') {
		return <FaTwitterSquare />;
	}
	else if (lcName === 'instagram') {
		return <FaInstagramSquare />;
	}
	else if (lcName === 'mail') {
		return <FaEnvelope />;
	}

	return null;
}

export function getBooksByTag(books, tag) {
	var retBooks = [];

	books.forEach(book => {
		const { tags } = book.frontmatter;
		if (tags.contain(tag)) {
			retBooks.push(book);
		}
	});

	return retBooks;
}

export function getComicPages(bookRelDir, pageList) {
	var retPages = [];
	pageList.forEach(page => {
		var dirList = page.parent.relativeDirectory.split("/");
		if (dirList.length > 0 && dirList[0] === bookRelDir) {
			retPages.push(page);
		}
	});

	return retPages;
}

export function FindPageLinks(pageId, edges) {
	for (var i = 0; i < edges.length; ++i) {
		var edge = edges[i];
		if (edge.node.parent.id.localeCompare(pageId) === 0) {
			return edge;
		}
	}

	return null;
}

//https://stackoverflow.com/questions/61936538/graphql-gatsby-query-a-field-that-is-image-or-mp4
//
// Other ways of getting comic media
//
// {/* {GetNextLink(id, edges, 
//   <GatsbyImage alt="" width="1140" image={getImage(comicImage)} />
// )} */}
// {/* <Link to={"/" + nextLink.sourceInstanceName + "/" + nextLink.relativeDirectory} id={nextLink.id}>
//   <GatsbyImage alt="" width="1140" image={getImage(comicImage)} />
// </Link> */}
export function ShowContent({content}) {
	if (content != null) {
		if (content.extension != null && content.extension === 'mp4') {
			return (
				<video loop={true} autoPlay={true} muted={true} playsInline>
					<source type="video/mp4" src={content.publicURL} />
					Your browser does not support the video tag.
				</video>
			)
		}
		else {
			return <GatsbyImage alt="" image={getImage(content)} />
		}
	}
}

/* 
Sample graphql code that we are looking at. 
	edges {
	  (next | previous) {
		parent {
		  ... on File {
			id
			sourceInstanceName
			relativeDirectory
		  }
		}
	  }
*/

export function GetLocalTime(utcDateObj) 
{
	return format(utcDateObj, "PPpp");
}

export function GetLastLink(edges) {
	if (edges != null && edges.length > 0) {
		return edges[edges.length - 1].node.parent;
	}

	return null;
}

export function GetFirstLink(edges) {
	if (edges != null && edges.length > 0) {
		return edges[0].node.parent;
	}

	return null;
}

//build the relative path of a page. Use case: internal Gatsby linking
export function GetCurrPageURL(id, edges, siteUrl) {
	var link = GetLinkRelativeUrl(id, edges, kCurr);
	if (link !== null) {
		return siteUrl + "/" + link.sourceInstanceName + "/" + link.relativeDirectory;
	}

	return null;
}

//get the absolute path of a page. Use case: external linking of a page.
export function GetAbsoluteURL(id, edges, dir, siteUrl) {
	var link = GetLinkRelativeUrl(id, edges, dir);
	if (link !== null) {
		return siteUrl + "/" + link.sourceInstanceName + "/" + link.relativeDirectory;
	}

	return null;
}

export function GetNextAbsoluteURL(id, edges, siteUrl) {
	return GetAbsoluteURL(id, edges, kNext, siteUrl);
}

//get the relative next link.
function GetLinkRelativeUrl(id, edges, dir) {
	var link = null;
	if (edges != null && edges.length > 0) {
		var pageLinks = FindPageLinks(id, edges);
		if (pageLinks != null) {
			if (pageLinks[dir] != null) {
				link = pageLinks[dir].parent;
			}
			//if we don't have a next page link, then grab the first one.
			else {
				link = edges[0][kCurr].parent;
			}
		}
	}

	return link;
}

export function NodeLink({children, className, node}) {
    if(node != null) {
        return (
            <Link className={className} to={"/" + node.sourceInstanceName + "/" + node.relativeDirectory} key={node.id}>
                {children}
            </Link>
        )    
    }
    return (
        <div>
            {children}
        </div>
    );
}

export function LastLink({children, className, id, edges}) {
    var link = GetLastLink(edges);
	if (link != null) {
		return (
			<Link className={className} to={"/" + link.sourceInstanceName + "/" + link.relativeDirectory} key={link.id}>
				{children}
			</Link>
		)
	}
	return null;
}

export function FirstLink({children, className, id, edges}) {
    var link = GetFirstLink(edges);
	if (link != null) {
		return (
			<Link className={className} to={"/" + link.sourceInstanceName + "/" + link.relativeDirectory} key={link.id}>
				{children}
			</Link>
		)
	}
	return null;
}

export function NextLink({children, className, id, edges}) {
	var link = GetLinkRelativeUrl(id, edges, kNext);
	if (link != null) {
		return (
			<Link className={className} to={"/" + link.sourceInstanceName + "/" + link.relativeDirectory} key={link.id}>
				{children}
			</Link>
		)
	}
	return null;
}

export function PrevLink({children, className, id, edges}) {
	var link = GetLinkRelativeUrl(id, edges, kPrevious);
	if (link != null) {
		return (
			<Link className={className} to={"/" + link.sourceInstanceName + "/" + link.relativeDirectory} key={link.id}>
				{children}
			</Link>
		)
	}
}
