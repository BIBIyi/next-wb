import React from "react";
import { useEffect } from "react";

import Link from "next/link";
import { Button, Checkbox, Form, Input, Radio } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import classes from "./login.module.css";
import Header from "@/components/layout/header";
import axios from "axios";
import { AES } from "crypto-js";
import { useRouter } from "next/router";

export default function Login() {
  const [form] = Form.useForm();
  const router = useRouter();

  const onfinish = async (values: any) => {
    const { password, ...rest } = values;
    const newData = {
      ...rest,
      password: AES.encrypt(password, "cms").toString(),
    };
    // console.log("new", newData);
    const returnData = axios
      .post("api/login", {
        newData,
      })
      //执行代码后代码处理
      .then((res) => {
        const { token } = res.data;
        console.log("token", token);
        // //store token to local
        // localStorage.setItem("loginToken", token);
      })
      .catch((error) => console.log("catch:", error));
    console.log("data:", returnData);
    // if (!!newData) {
    //   // localStorage.setItem(data);
    //   // router.push("dashboard");
    //   console.log("---------");
    // }
  };
  useEffect(() => {
    if (localStorage.data?.role) {
      console.log("-----", localStorage.data.role);
      // router.push(`/dashboard/${localStorage.role}`);
    }
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
          onFinish={onfinish}
        >
          <Form.Item name="role" required>
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
