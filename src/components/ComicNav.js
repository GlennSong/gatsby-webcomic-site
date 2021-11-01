import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import React from 'react'
import UseSiteMetadata from '../hooks/use-sitemeta';
import { NodeLink, NextLink, PrevLink } from '../utils/utils';
import { FaBackward, FaForward, FaStepBackward, FaStepForward, FaBookReader } from 'react-icons/fa'


export default function ComicNav({id, edges, firstComic, lastComic}) {
	const { menuLinks } = UseSiteMetadata();
    
    //get the comic archive page.
    var comicsPage = null;
    for(var i=0; i<menuLinks.length; ++i) 
    {
        var item = menuLinks[i];
        if(item.name === 'Comics') {
            comicsPage = item;
            break;
        }
    }

    var firstComicUrl = (firstComic.id !== id) ? firstComic : null;
    var lastComicUrl = (lastComic.id !== id) ? lastComic : null; 

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed="bottom">
            <Container>
                <Nav className="m1-auto">
                    <NodeLink
                        node={firstComicUrl}
                    >
                        <FaStepBackward />
                    </NodeLink>
                </Nav>
                <Nav className="m1-auto">
                    <PrevLink
                        id={id}
                        edges={edges}
                    >
                        <FaBackward />
                    </PrevLink>
                </Nav>
                <Nav className="m1-auto">
                    <Nav.Link key={comicsPage.name} href={comicsPage.url}>
                        <FaBookReader />                    
                    </Nav.Link>
                </Nav>                    
                <Nav className="m1-auto">
                    <NextLink
                        id={id}
                        edges={edges}
                    >
                        <FaForward />
                    </NextLink>
                </Nav>
                <Nav className="m1-auto">
                    <NodeLink
                        node={lastComicUrl}
                    >
                        <FaStepForward />
                    </NodeLink>
                </Nav>                
            </Container>
        </Navbar>
    )
}

