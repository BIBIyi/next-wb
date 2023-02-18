import Head from "next/head";
import React from "react";
import Header from "../components/layout/header";

// export default function Home() {
//   return (
//     <>
//       <Head>
//         <title>Create App</title>
//         <meta name="viewport" content="initial-scale=1.0, width=device-width" />
//       </Head>
//       <body>
//         <div style={{ backgroundColor: "green" }}>
//           <Header></Header>
//           <div> homepage-main</div>
//         </div>
//       </body>
//     </>
//   );
// }

export default function index() {
  return (
    <div style={{ backgroundColor: "green", padding: 0, margin: 0 }}>
      <Head>
        <title>Create App</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div style={{ padding: 0 }}>
        <Header></Header>
        <div> homepage-main</div>
      </div>
    </div>
  );
}
