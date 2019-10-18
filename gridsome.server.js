// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = function (api) {
  api.loadSource(({ addCollection }) => {})

  // api.createPages(async ({ createPage, graphql }) => {
  //   const { data } = await graphql(`{
  //     allProject {
  //       edges {
  //         next {
  //           slug
  //           content {
  //             title
  //           }
  //         }
  //         previous {
  //           slug
  //           content {
  //             title
  //           }
  //         }
  //         node {
  //           id
  //           slug
  //         }
  //       }
  //     }
  //   }`)

  //   data.allProject.edges.forEach(({ node, next, previous }) => {
  //     createPage({
  //       path: `/work/${node.slug}`,
  //       component: './src/templates/project.vue',
  //       context: {
  //         id: node.id,
  //         next,
  //         previous
  //       }
  //     })
  //   }
  // )
  // })
}
