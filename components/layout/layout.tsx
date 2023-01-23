import React, { useState } from "react";
import {
  BellOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Badge, Breadcrumb, Layout, Menu, theme, Input } from "antd";
import type { MenuProps } from "antd";
import styled from "styled-components";
const { Header, Content, Sider } = Layout;

const Search = styled(Input.Search)`
  width: 30%;
  display: block;
`;

const Logo = styled.div`
  height: 64px;
  display: inline-flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  color: #fff;
  letter-space: 5px;
  text-shadow: 5px 1px 5px;
  transform: rotateX(45deg);
  font-family: monospace;
`;
const StyledLayoutHeader = styled(Header)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 10;
`;
export default function AppLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout
      style={{
        height: "100vh",
      }}
    >
      <Sider
        className="leftSider"
        collapsible
        collapsed={collapsed}
        onCollapse={() => {}}
      >
        {
          <Logo>
            <div className="logo" style={{ color: "#fff", cursor: "pointer" }}>
              cms
            </div>
          </Logo>
        }
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
