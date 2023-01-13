import React from "react";
import Link from "next/link";
import { Button, Checkbox, Form, Input, Radio } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import classes from "./login.module.css";
import Header from "@/components/layout/header";
export default function login() {
  const [form] = Form.useForm();
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
        >
          <Form.Item name="role" required>
            <Radio.Group style={{ marginTop: 10 }} size="middle">
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
