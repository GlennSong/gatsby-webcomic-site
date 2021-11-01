import { Link } from 'gatsby';
import React from 'react'
import { htmlstyle } from '../styles/project-details.module.css';

export default function ComicDirEntry({frontmatter, html, pages}) {
    return (
        <div>
            <h2>{frontmatter.title}</h2>
            <div className={htmlstyle} dangerouslySetInnerHTML={{ __html: html}} />
            <hr />
            {pages.map(page => (
                <Link to={"/comics/" + page.parent.relativeDirectory} key={page.id}>
                    <h3>{page.frontmatter.title}</h3>
                </Link>
            ))}
            <br/>
        </div>
    )
}

