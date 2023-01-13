import Head from "next/head";
import React from "react";
import Header from "../components/layout/header";
import styled from "styled-components";
export default function Home() {
  const Title = styled.h1`
    font-size: 1.5em;
    text-align: center;
    color: palevioletred;
  `;

  // Create a Wrapper component that'll render a <section> tag with some styles
  const Wrapper = styled.section`
    padding: 4em;
    background: papayawhip;
  `;
  return (
    <>
      <Head>
        <title>Create App</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Header></Header>
      <main>
        <div> homepage-main</div>
        <Wrapper>
          <Title>Hello World!</Title>
        </Wrapper>
      </main>
    </>
  );
}
