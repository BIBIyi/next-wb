import axios from "axios";
import { type } from "os";
import React, { useRef } from "react";

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// eslint-disable-next-line import/no-anonymous-default-export
// export default (req: any, res: any) => {
//   var jwt = require("jsonwebtoken");
//   const data = req.body;
//   const newToken = jwt.sign(data, "secret", {
//     algorithm: "HS256",
//     expiresIn: "1d",
//   });
//   const returnData = {
//     code: 0,
//     msg: "success",
//     data: {
//       token: newToken,
//       userId: 1,
//       role: data.role,
//     },
//   };
//   res.status(200).send(JSON.stringify(returnData));
//   // res.statusCode = 200;
//   // res.json({ name: "John Doe" });
// };

export default (req, res) => {
  res.statusCode = 200;
  res.json({ name: "John Doe" });
};

// const envConfig = async (req: any, res: any) => {
//   const { ORIGIN, NEXT_PUBLIC_ORIGIN } = process.env;

//   res.json({
//     ORIGIN,
//     NEXT_PUBLIC_ORIGIN,
//   });

// };

// export default envConfig;
