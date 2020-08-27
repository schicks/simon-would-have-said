import React from "react";
import { Link } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";
import usePostsList from "../hooks/usePostsList";
import { css } from "@emotion/core";

const IndexPage = () => {
  const posts = usePostsList();

  return (
    <Layout>
      <SEO title="Home" />
      <ul>
        {posts
          .filter(({ status }) => status === "published")
          .sort(
            ({ date: a }, { date: b }) =>
              a.getUTCMilliseconds() - b.getUTCMilliseconds()
          )
          .map(({ title, slug, excerpt }) => (
            <li key={slug} css={css`list-style: none;`}>
              <Link to={slug} css={css`
                color: black;
                text-decoration: none;
                :hover>h2 {
                  text-decoration: underline;
                }
              `}>
                <h2>{title}</h2>
                <p>{excerpt}</p>
              </Link>
            </li>
          ))}
      </ul>
    </Layout>
  );
};

export default IndexPage;
