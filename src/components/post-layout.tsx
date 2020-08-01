/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"

import Header from "./header"
import "./layout.css"
import useSiteTitle from "../hooks/useSiteTitle"
import SEO from './seo'

type Props = {
  children: React.ReactNode
  pageContext: {
    frontmatter: {
      title: string,
      date: string
    }
  }
}

const Layout: React.FC<Props> = ({ children, pageContext: { frontmatter: { title } } }) => {
  const siteTitle = useSiteTitle()

  return (
    <>
      <SEO title={title} />
      <Header siteTitle={siteTitle} />
      <div
        style={{
          margin: `100px auto 0 auto`,
          maxWidth: 900,
          padding: `0 1.0875rem 1.45rem`,
        }}
      >
        <main>
          <h2>{title}</h2>
          {children}
        </main>
        <footer>
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.org">Gatsby</a>
        </footer>
      </div>
    </>
  )
}

export default Layout
