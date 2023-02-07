import React, { useState } from "react";
import {
  BellOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Input, Row } from "antd";
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

const HeaderIcon = styled.span`
  font-size: 18px;
  color: #fff;
  cursor: pointer;
  &:hover {
    color: #1890ff;
  }
`;
const StyledContent = styled(Content)`
  margin: 16px;
  background-color: #fff;
  padding: 16px;
  min-height: auto;
`;

type MenuItem = Required<MenuProps>["items"][number];
function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const items: MenuProps["items"] = [
  getItem("Overview", "sub1", null),
  getItem("Student", "sub2", null, [getItem("Student List", "s1", null)]),
  getItem("Teacher", "sub3", null, [getItem("Teacher List", "t1", null)]),
  getItem("Course", "sub4", null, [
    getItem("All Courses", "c1", null),
    getItem("Add Course", "c2", null),
    getItem("Edit Course", "c3", null),
  ]),
  getItem("Message", "sub5", null),
];

export default function AppLayout(props: React.PropsWithChildren<any>) {
  const { children } = props;
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout
      style={{
        height: "100vh",
      }}
    >
      <Sider
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
        }}
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
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          // style={{ height: "100%", borderRight: 0 }}
          items={items}
        />
      </Sider>

      <Layout id="contextLayout" style={{ marginLeft: 200 }}>
        <StyledLayoutHeader>
          <HeaderIcon>
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                // className: "trigger",
                onClick: () => setCollapsed(!collapsed),
              }
            )}
          </HeaderIcon>
          <Row style={{ color: "#fff" }}>
            <div>message</div>
            <div>user</div>
          </Row>
        </StyledLayoutHeader>

        <div style={{ margin: "0 16px", padding: 16 }}>AppBreadcrumb</div>
        <StyledContent>{children}</StyledContent>
      </Layout>
    </Layout>
  );
}
