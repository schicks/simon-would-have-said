import { Link } from "gatsby";
import React from "react";
import { css } from "@emotion/core";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const breakpoint = '450px'

const styles = css`
  border-bottom: 8px solid black;
  background: white;
  display: flex;
  align-items: center;
  padding-left: 1.45rem;
  min-height: 90px;
  margin-bottom: 1.45rem;
`;

const desktop = css`
  @media (max-width: ${breakpoint}) {
    display: none;
  }
`;

const mobile = css`
  @media (min-width: ${breakpoint}) {
    display: none;
  }
`;

type Props = {
  siteTitle?: string;
};

const Header: React.FC<Props> = ({ siteTitle }: Props) => (
  <header css={styles}>
    <h1 style={{ margin: 0 }}>
      <Link
        to="/"
        style={{
          color: "black",
          textDecoration: `none`,
        }}
      >
        <span css={desktop}>{siteTitle}</span>
        <FontAwesomeIcon css={mobile} icon={faHome} />
      </Link>
    </h1>
  </header>
);

export default Header;
