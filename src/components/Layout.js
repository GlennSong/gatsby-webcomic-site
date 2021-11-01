import React from 'react'
import TMCNavbar from './Navbar'
import '../styles/global.css'
import SEO from "../components/seo"
import Footer from "../components/Footer"

export default function Layout({children, title, description, image, absUrl}) {
    return (
        <div className="layout">
            <SEO title={title} description={description} image={image} absUrl={absUrl} />
            <TMCNavbar />
            {children}
            <Footer />
        </div>
    )
}
