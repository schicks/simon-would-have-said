import { Link } from "gatsby";
import React from "react";

type Props = {
  siteTitle?: string;
};

const Header: React.FC<Props> = ({ siteTitle }: Props) => (
  <header
    style={{
      marginBottom: `1.45rem`,
      borderBottom: "6px solid black",
      position: "fixed",
      top: 0,
      width: "100vw",
      background: "white",
      zIndex: 111,
      height: "90px",
    }}
  >
    <div
      style={{
        margin: `0 auto`,
        maxWidth: 960,
        padding: `1.45rem 1.0875rem`,
      }}
    >
      <h1 style={{ margin: 0 }}>
        <Link
          to="/"
          style={{
            color: "black",
            textDecoration: `none`,
          }}
        >
          {siteTitle}
        </Link>
      </h1>
    </div>
  </header>
);

export default Header;
