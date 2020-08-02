/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react";

import Header from "../header";
import "./layout.css";
import useSiteTitle from "../../hooks/useSiteTitle";
import SEO from "../seo";
import "katex/dist/katex.min.css";
import "prismjs/themes/prism-okaidia.css";
import { css } from "@emotion/core";

const styles = css`
  margin: 1.45rem auto 0 auto;
  max-width: 800px;
  padding: 0 1.0875rem 1.45rem;
  code.language-text {
    background: white;
    color: black;
    text-shadow: none;
  }
`;

type Props = {
  children: React.ReactNode;
  pageContext: {
    frontmatter: {
      title: string;
      date: string;
    };
  };
};

const Layout: React.FC<Props> = ({
  children,
  pageContext: {
    frontmatter: { title },
  },
}) => {
  const siteTitle = useSiteTitle();

  return (
    <>
      <SEO title={title} />
      <Header siteTitle={siteTitle} />
      <div css={styles}>
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
  );
};

export default Layout;
