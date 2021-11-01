const path = require('path');

//create pages from a template
exports.createPages = ( {graphql, actions, reporter} ) => {
    
  return graphql(`
    query MyQuery {
      comics: allMarkdownRemark(
        filter: {fileAbsolutePath: {regex: "/comics/"}, frontmatter: {posttype: {eq: "comicpage"}}}
      ) {
        nodes {
          fileAbsolutePath
          frontmatter {
            slug
          }
        }
      }
      books: allMarkdownRemark(
        filter: {fileAbsolutePath: {regex: "/comics/"}, frontmatter: {posttype: {eq: "comicbook"}}}
      ) {
        nodes {
          fileAbsolutePath
          frontmatter {
            slug
          }
        }
      }      
      blog: allMarkdownRemark(
        filter: {fileAbsolutePath: {regex: "/blog/"}, frontmatter: {posttype: {eq: "post"}}}
      ) {
        nodes {
          fileAbsolutePath
          frontmatter {
            slug
          }
        }
      }
    }    
  `).then(result => {
    // Handle errors
    if (result.errors) 
    {
      reporter.panicOnBuild(`Error while running GraphQL query. Errors include: ` + result.errors.toString());
      Promise.reject(result.errors);
      return;
    }

    result.data.comics.nodes.forEach(node => {
        const relPath = path.relative(path.resolve("./src/content/"), path.dirname(node.fileAbsolutePath)).replace(/\\/g, "/");
        actions.createPage({
            path: relPath,
            component: path.resolve('./src/templates/comic-page.js'), //requires absolute path
            context: {
                slug: node.frontmatter.slug //query variable
            }
        })
    })

    result.data.books.nodes.forEach(node => {
        const relPath = path.relative(path.resolve("./src/content/"), path.dirname(node.fileAbsolutePath)).replace(/\\/g, "/");
        // reporter.info(relPath);
        actions.createPage({
            path: relPath,
            component: path.resolve('./src/templates/comic-book.js'), //requires absolute path
            context: {
                slug: node.frontmatter.slug //query variable
            }
        })
    })

    result.data.blog.nodes.forEach(node => {
      const relPath = path.relative(path.resolve("./src/content/"), path.dirname(node.fileAbsolutePath)).replace(/\\/g, "/");
      actions.createPage({
          path: relPath,
          component: path.resolve('./src/templates/post.js'), //requires absolute path
          context: {
              slug: node.frontmatter.slug //query variable
          }
      })
    })
  })
}