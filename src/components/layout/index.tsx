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
import PostLayout from "./post-layout";
import { css } from "@emotion/core";

type Props = {
  children: React.ReactNode;
};

const styles = css`
  margin: 1.45rem auto 0 auto;
  max-width: 800px;
  padding: 0 1.0875rem 1.45rem;
`;

const Layout: React.FC<Props> = ({ children }) => {
  const siteTitle = useSiteTitle();

  return (
    <>
      <Header siteTitle={siteTitle} />
      <div css={styles}>
        <main>{children}</main>
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
export { PostLayout };
