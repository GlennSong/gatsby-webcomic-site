import { useStaticQuery, graphql } from 'gatsby';

const UseSiteMetadata = () => {
    const { site } = useStaticQuery(
        graphql`
        query {
            site {
                siteMetadata {
                    title
                    siteUrl
                    description
                    dateCreated
                    contact
                    author
                    fb_appid
                    menuLinks {
                        name
                        url
                        type
                    }
                    externalLinks {
                        name
                        url
                    }
                    socials {
                        name
                        url
                    }
                }
            }
        }
        `
    )
    return site.siteMetadata;
};

export default UseSiteMetadata;