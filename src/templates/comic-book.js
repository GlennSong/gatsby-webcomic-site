import React from 'react'
import { Link } from 'gatsby';
import Layout from "../components/Layout"
import { graphql } from 'gatsby'
import { getComicPages } from '../utils/utils'
import StyledDivBox from '../components/DivBox'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import UseSiteMetadata from '../hooks/use-sitemeta';
import SocialShare from '../components/SocialShare'

//assume all of the pages are pre-sorted by date.
function getChapterPages(index, chapterName, pages) 
{
    var chapterObj = {
        title: null,
        slug : chapterName,
        pages: []
    };

    pages.forEach(page => {
        if(page.frontmatter.chapter !== null && page.frontmatter.chapter === chapterName)
        {
            chapterObj.pages.push(page);
        }
    });

    if(chapterObj.pages.length > 0)
    {
        chapterObj.title = (index + 1).toString() + ". " + chapterObj.pages[0].frontmatter.title;
        return chapterObj;
    }
    else 
    {
        console.log(chapterName + " has no pages!");
    }

    return null;
}

function getNonChapterPages(pages) 
{
    var chapterObj = {
        title: "Extras",
        slug : "no-chapter",
        pages: []
    };

    pages.forEach(page => {
        if(page.frontmatter.chapter === null)
        {
            chapterObj.pages.push(page);
        }
    });

    if(chapterObj.pages.length > 0)
    {
        chapterObj.title = "Extras. " + chapterObj.pages[0].frontmatter.title;
        return chapterObj;
    }

    return null;
}

export default function ComicBook( {data} ) {

    //GSONG_TODO: Some of the comics use an mp4 because they're animated. They will produce a null result for the GatsbyImage and need to be resolved in a different way. How?
    // Also mp4s need to be resolved differently for posts that contain them so they can play and be clicked on by the user. Auto play?
    const {book, comicpages} = data;
    const {frontmatter, parent} = book;
    const { relativeDirectory, sourceInstanceName } = parent;
    const pages = comicpages.nodes;
    const { siteUrl } = UseSiteMetadata();
    const currAbsUrl = siteUrl + "/" + sourceInstanceName + "/" + relativeDirectory + "/";

    var chapterPageHierarchy = [];
    if(frontmatter.chapterList !== null) 
    {
        frontmatter.chapterList.forEach((chapter, index) => {
            var chapterObj = getChapterPages(index, chapter, pages);
            if(chapterObj !== null) 
            {
                chapterPageHierarchy.push(chapterObj);
            }
        });

        //get any extra, non-categorized chapter pages.
        var nonChapterPages = getNonChapterPages(pages);
        if(nonChapterPages !== null) 
        {
            chapterPageHierarchy.push(nonChapterPages);
        }
    }
    else
    {
        //push all the pages together as one giant chapter.
        chapterPageHierarchy.push({
            title: "Pages for " + book.frontmatter.title,
            slug : book.frontmatter.slug,
            pages: pages
        });
    }

    return (
        <Layout absUrl={currAbsUrl} title={frontmatter.title} description={frontmatter.featuredText} image={frontmatter.featuredImage}>
            <Container className="my-5">
                <Row>
                    <StyledDivBox 
                        key={book.id} 
                        frontmatter={book.frontmatter} 
                        imageData={null} 
                        bShowFeaturedText={true}
                        html={book.html} 
                        pages={getComicPages(book.parent.relativeDirectory, pages)} 
                    />
                </Row>
            </Container>
            {chapterPageHierarchy.map(chapter => (
                <Container className="py-3" key={'chapter_' + chapter.slug}>
                    <Row>
                        <h2>{chapter.title}</h2>
                    </Row>
                    <Row>
                        {chapter.pages.map(page =>(
                            <div className="pb-2 pr-2" key={'col_' + page.id}>
                                <div className="hover-zoom">
                                    <Link to={"/" + sourceInstanceName + "/" + relativeDirectory + "/" + page.frontmatter.slug} key={page.id}>
                                        <GatsbyImage alt="" image={getImage(getThumbnailImage(page.frontmatter.comicImage, page.frontmatter.comicImageStack, page.frontmatter.thumbnailImage))} />
                                    </Link>                    
                                </div>
                            </div>
                        ))}
                    </Row>
                </Container>
            ))}
            <Container>
                <section className="mt-5 mb-5 tmc-center">
                    <SocialShare
                        shareUrl={currAbsUrl}
                        image={frontmatter.featuredImage}
                        title={frontmatter.title}
                    />
                </section>
            </Container>
        </Layout>  
    )
}

function getThumbnailImage(comicImage, comicImageStack, thumbnailImage)
{
    if (comicImage !== null && comicImage.extension === "mp4" && thumbnailImage !== null) 
    {
        return thumbnailImage;
    }
    if (comicImage !== null && comicImage.extension === "mp4" && thumbnailImage === null)
    {
        console.log("getThumbnailImage(): comicImage(" + comicImage.relativeDirectory + ") needs a thumbnail Image.");
    }

    if(thumbnailImage !== null) 
    {
        return thumbnailImage;
    }

    return comicImage;
}

export const query = graphql`
fragment MarkdownFrontmatterComics on MarkdownRemark {
    frontmatter {
      slug
      title
      date
      posttype
      tags
      firstPage
      featuredText
      categories
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
        extension
      }
      thumbnailImage {
        childImageSharp {
            gatsbyImageData(formats: WEBP, placeholder: BLURRED, width: 256, height: 256)
            original {
                height
                width
            }
        }
        relativeDirectory
        sourceInstanceName
        extension
      }
      comicImage {
        childImageSharp {
            gatsbyImageData(formats: WEBP, placeholder: BLURRED, width: 256, height: 256)
            original {
                height
                width
            }
        }
        relativeDirectory
        sourceInstanceName
        extension
      }
    }
  }
query ComicBookPageQuery($slug: String) {
    comicpages: allMarkdownRemark(
        filter: {fileAbsolutePath: {regex: "/comics/"}, frontmatter: {comic : {eq: $slug} posttype: {eq: "comicpage"}}}
        sort: {fields: [frontmatter___comic, frontmatter___date], order: [ASC, ASC]}
      ) {
        nodes {
            ...MarkdownFrontmatterComics
            id
            parent {
                ... on File {
                    relativeDirectory
                    sourceInstanceName
                }
            }
        }
      }

    book: markdownRemark(frontmatter: {slug: {eq: $slug}, posttype: {eq: "comicbook"}}) {
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
`
