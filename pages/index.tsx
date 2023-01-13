import Head from "next/head";
import React from "react";
import Header from "../components/layout/header";

export default function Home() {
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
