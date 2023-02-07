import React from "react";

import classes from "./login.module.css";
import Link from "next/link";
import { Button, Form, Input, Radio } from "antd";
import { UserOutlined } from "@ant-design/icons";
import Header from "../components/layout/header";
import { useRouter } from "next/router";
import { AES } from "crypto-js";

import axios from "axios";

export default function Page(props: any) {
  const [form] = Form.useForm();
  const router = useRouter();
  //set time
  const TimeStorageSet = (data: any) => {
    const obj = {
      data,
      expire: new Date().getTime() + 1000 * 60 * 30,
    };
    return obj;
  };

  const onFinish = async (values: any) => {
    const { password, ...rest } = values;
    const newData = {
      ...rest,
      password: AES.encrypt(password, "cms").toString(),
      time: new Date().getTime() + 1000 * 60 * 30,
    };

    console.log("newDate", newData);

    // localStorage.setItem("user", newData);
    const data = await axios
      .post("/api/login", newData)
      .then((res) => res.data)
      .catch((error) => console.log(error));

    if (!!data) {
      router.push("login");
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Header />
      <div className={classes.login}>
        <h1>Sign up your account</h1>

        <Form
          form={form}
          layout="vertical"
          className={classes.form}
          name="signUp"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            name="role"
            label="Role"
            required
            rules={[{ required: true }]}
          >
            <Radio.Group>
              <Radio value="student">Student</Radio>
              <Radio value="teacher">Teacher</Radio>
              <Radio value="manager">Manager</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
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
            label="Password"
            rules={[{ required: true }, { min: 4, max: 16 }]}
          >
            <Input.Password placeholder="input password" type="password" />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            label="Confirm Password"
            dependencies={["password"]}
            // rules={[{ required: true }, { min: 4, max: 16 }]}
            rules={[
              { required: true },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    "The two passwords that you entered do not match!"
                  );
                },
              }),
            ]}
          >
            <Input.Password placeholder="Tap password again" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" className={classes.button} htmlType="submit">
              Sign up
            </Button>
          </Form.Item>
          <Form.Item>
            <span style={{ marginRight: "5px" }}>Already have an account?</span>
            <Link href="/login">Login</Link>
          </Form.Item>
        </Form>
      </div>
    </>
  );
}
