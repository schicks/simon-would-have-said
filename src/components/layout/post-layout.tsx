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
import { css, jsx } from "@emotion/core";
import { MDXProvider } from "@mdx-js/react";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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

const MDXHeaderStyles = css`
  display: flex;
  a {
    opacity: 0;
  }
  :hover {
    a {
      opacity: 1;
    }
  }
`;

const slugify = (s: string): string => s.toLowerCase().split(/[^\w]/).join("-");
const MDXHeader = (n: 1 | 2 | 3 | 4 | 5 | 6) => (props: {
  children: string;
}) => {
  const slug = slugify(props.children);
  return jsx(
    `h${n}`,
    { ...props, css: MDXHeaderStyles },
    <a id={slug} href={`#${slug}`} aria-hidden>
      <FontAwesomeIcon
        icon={faLink}
        size={"xs"}
        css={css`
          color: rgba(0, 0, 0, 0.8);
          margin-right: 3px;
          margin-bottom: 2px;
        `}
      />
    </a>,
    props.children
  );
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
          <MDXProvider
            components={{
              h3: MDXHeader(3),
              h4: MDXHeader(4),
              h5: MDXHeader(5),
              h6: MDXHeader(6),
            }}
          >
            {children}
          </MDXProvider>
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
