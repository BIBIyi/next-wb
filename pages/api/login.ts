// eslint-disable-next-line import/no-anonymous-default-export
import axios from "axios";
import { type } from "os";
import React from "react";
import Login from "../login";

import Password from "antd/es/input/Password";

const baseURL = "http://cms.chtoma.com/api";

export type Role = "student" | "teacher" | "manager";

export type LoginFormValues = {
  role: Role;
  email: string;
  password: string;
};
export type LoginUser = {
  code: number;
  msg: string;
  data: {
    token: string;
    role: string;
    userId: number;
  };
};

const login = async (user: LoginFormValues) => {
  console.log("user", user);
  return user;
};

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default (req, res) => {
  const changeData = req.body;
  res.status(200).send(JSON.stringify({ changeData }));
};
