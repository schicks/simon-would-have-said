import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import usePostsList from "../hooks/usePostsList"




const IndexPage = () => {
  const posts = usePostsList()

  return <Layout>
    <SEO title="Home" />
    <ul>
      {posts
        .sort(({ date: a }, { date: b }) => a.getUTCMilliseconds() - b.getUTCMilliseconds())
        .map(({ title, slug }) => <li key={slug}>
          <Link to={slug}>{title}</Link>
        </li>)}
    </ul>
  </Layout>
}

export default IndexPage
