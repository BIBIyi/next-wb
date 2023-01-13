import React from "react";
import { Fragment } from "react";
import Link from "next/link";
import { Button } from "antd";

export default function header() {
  return (
    <Fragment>
      <header style={{ backgroundColor: "gray", height: "30px" }}>
        <Link href="/" style={{ marginRight: "10px" }}>
          homePage
        </Link>
        <Link href="/signup" style={{ marginRight: "10px" }}>
          Sign up
        </Link>
        <Link href="/login">Login</Link>
      </header>
    </Fragment>
  );
}
