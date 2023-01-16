import React, { useState } from "react";
import {
  BellOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import type { MenuProps } from "antd";
const { Header, Content, Sider } = Layout;

export default function AppLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout style={{ height: "100vh" }}>
      <Sider
        className="leftSider"
        width={200}
        style={{ background: colorBgContainer }}
        trigger={null}
        collapsible
        collapsed={collapsed}
      >
        {/* {
          <div className="logo" style={{ color: "#fff", cursor: "pointer" }}>
            cms
          </div>
        } */}
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["3"]}
          defaultOpenKeys={["1"]}
          style={{ height: "100%", borderRight: 0 }}
          items={[
            {
              key: "1",
              icon: <UserOutlined />,
              label: "nav 1",
            },
            {
              key: "2",
              icon: <UserOutlined />,
              label: "nav 2",
            },
            {
              key: "3",
              icon: <UserOutlined />,
              label: "nav 3",
            },
          ]}
        />
      </Sider>
      <Layout className="contextLayout">
        <Header
          className="header"
          style={{ padding: 0, background: colorBgContainer }}
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed),
            }
          )}
        </Header>
        <div>AppBreadcrumb</div>
        <div>StyledContent</div>
      </Layout>
    </Layout>
  );
}
