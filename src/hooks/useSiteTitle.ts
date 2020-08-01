import { useStaticQuery, graphql } from 'gatsby'

export default (): string => useStaticQuery(graphql`
  query SiteTitleQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`).site.siteMetadata.title