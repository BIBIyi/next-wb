import React from "react";
import { useEffect } from "react";

import Link from "next/link";
import { Button, Checkbox, Form, Input, Radio } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import classes from "./login.module.css";
import Header from "@/components/layout/header";
import { AES } from "crypto-js";
import { useRouter } from "next/router";
import { LoginFormValues } from "@/components/model/login";
import apiService from "@/lib/services/api-service";

const LoginData = "Token";
export default function Login() {
  const [form] = Form.useForm();
  const router = useRouter();

  // const onfinish = async (values: any) => {
  //   const { password, ...rest } = values;
  //   const { data } = await axios({
  //     method: "POST",
  //     url: "api/login",
  //     data: {
  //       ...rest,
  //       password: AES.encrypt(password, "cms").toString(),
  //     },
  //   });
  const onfinish = async (loginRequest: LoginFormValues) => {
    // console.log("login-data", loginRequest);
    const data = await apiService.login(loginRequest);
    console.log("data", data);
    console.log(process.env.NODE_ENV);
    console.log("env", process.env.BASE_URL);
  };

  // if (!!data) {
  //   localStorage.setItem(LoginData, JSON.stringify(data.data));
  //   // console.log("local", localStorage.getItem(LoginData));
  //   // router.push("dashboard");
  // }

  useEffect(() => {
    // if (localStorage.getItem(LoginData)) {
    //   const data = JSON.parse(localStorage.getItem(LoginData));
    //   console.log("-----", data["role"]);
    //   router.push(`/dashboard/${data["role"]}`);
    // }
  }, []);

  return (
    <>
      <Header></Header>
      <div className={classes.login}>
        <h1>Course Management Assistant</h1>

        <Form
          form={form}
          layout="vertical"
          className={classes.form}
          name="login"
          initialValues={{
            remember: true,
          }}
          onFinish={(values: LoginFormValues) => onfinish(values)}
        >
          <Form.Item name="role" rules={[{ required: true }]}>
            <Radio.Group>
              <Radio.Button value="student">Student</Radio.Button>
              <Radio.Button value="teacher">Teacher</Radio.Button>
              <Radio.Button value="manager">Manager</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            name="email"
            rules={[{ required: true }, { type: "email" }]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="input email"
              type="email"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true }, { min: 4, max: 16 }]}
          >
            <Input
              prefix={<LockOutlined />}
              placeholder="input password"
              type="password"
            />
          </Form.Item>
          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>remember me?</Checkbox>
          </Form.Item>
          <Form.Item>
            <Button type="primary" className={classes.button} htmlType="submit">
              login
            </Button>
          </Form.Item>
          <Form.Item>
            <span style={{ marginRight: "5px" }}>No account?</span>
            <Link href="/signup">Sign up</Link>
          </Form.Item>
        </Form>
      </div>
    </>
  );
}
function setAuthToken(token: any) {
  throw new Error("Function not implemented.");
}
