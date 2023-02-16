import Head from "next/head";
import React from "react";
import Header from "../components/layout/header";
import styled from "styled-components";

export default function Home() {
  console.log(process.env.NODE_ENV);
  console.log("env", process.env.BASE_URL);

  return (
    <>
      <Head>
        <title>Create App</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Header></Header>
      <main>
        <div> homepage-main</div>
      </main>
    </>
  );
}
