import React from "react";

import classes from "./login.module.css";
import Link from "next/link";
import { Button, Form, Input, Radio, Space } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import FormItem from "antd/es/form/FormItem";
import Header from "../components/layout/header";
export default function signup() {
  const [form] = Form.useForm();

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
        >
          <Form.Item
            name="role"
            label="Role"
            required
            rules={[{ required: true }]}
          >
            <Radio.Group style={{ marginTop: 10 }} size="middle">
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
            rules={[{ required: true }, { min: 4, max: 16 }]}
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
