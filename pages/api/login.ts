import axios from "axios";
import { type } from "os";
import React, { useRef } from "react";
import Login from "../login";

import Password from "antd/es/input/Password";
import { ItemRender } from "antd/es/upload/interface";

const baseURL = "http://cms.chtoma.com/api";

// export type Role = "student" | "teacher" | "manager";

// export type LoginFormValues = {
//   role: Role;
//   email: string;
//   password: string;
//   remember: string;
// };
// export type LoginUser = {
//   code: number;
//   msg: string;
//   data: {
//     token: string;
//     role: string;
//     userId: number;
//   };
// };

// const login = (user: LoginFormValues) => {};

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// eslint-disable-next-line import/no-anonymous-default-export
export default (req: any, res: any) => {
  var jwt = require("jsonwebtoken");
  const data = req.body;
  const newToken = jwt.sign(data, "secret", {
    algorithm: "HS256",
    expiresIn: "1d",
  });
  const returnData = {
    code: 0,
    msg: "success",
    data: {
      token: newToken,
      userId: 1,
      role: data.role,
    },
  };
  res.status(200).send(JSON.stringify(returnData));
  // res.statusCode = 200;
  // res.json({ name: "John Doe" });
};
