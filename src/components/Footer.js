import { Link } from 'gatsby'
import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import { Col } from 'react-bootstrap'
import { SocialIcon } from '../utils/utils'
import UseSiteMetadata from '../hooks/use-sitemeta'

function MenuInternalLinkItem({name, url, comp}) {
	return <li><Link key={name} to={url}>{comp}</Link></li>
}

function MenuExternalLinkItem({url, comp}) {
	return <li><a href={url}>{comp}</a></li>
}

export default function Footer() {
	const { menuLinks, externalLinks, socials, dateCreated, author, contact, title} = UseSiteMetadata();
	const copyright = (<p>©{dateCreated}-{new Date().getFullYear()} <a href={'mailto:' + contact}>{author}</a>. {title}. All rights reserved.</p>)
	return (
		<footer>
			<hr />
			<Container>
				<Row>
					<Col md='4'>
						<h4>Site Links</h4>
						<ul>
							{menuLinks.map(item => (
								<MenuInternalLinkItem 
									key={'menulinkitem_' + item.name} 
									url={item.url} 
									name={item.name}
									comp={item.name}/>
							))}
						</ul>
					</Col>
					<Col md='4'>
						<h4>Other Works</h4>
						<ul>
							{externalLinks.map(item => (
								<MenuExternalLinkItem 
									key={'externallink_' + item.name} 
									url={item.url} 
									comp={item.name}/>
							))}
						</ul>
					</Col>
					<Col md='4' className="socials">
						<h4>Socials</h4>
						<ul>
							{socials.map(item => (
								<MenuExternalLinkItem 
									key={'externalsociallink_' + item.name} 
									url={item.url} 
									comp={<SocialIcon name={item.name} />} 
								/>
							))}
							<MenuExternalLinkItem 
								key={'externalsociallink_mailto'} 
								url={'mailto:' + contact}
								comp={<SocialIcon name={'mail'} />} 
							/>
						</ul>
					</Col>
				</Row>
				<Row>
					<Col>
						{copyright}
                        <br />
					</Col>
				</Row>
			</Container>
		</footer>
	)
}
