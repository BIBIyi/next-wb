import React, { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Layout, Menu, Input, Row } from "antd";
import type { MenuProps } from "antd";
import styled from "styled-components";
import UserIcon from "./userIcon";
import storage from "../../lib/services/storage";
import { routers, SideNav } from "./router";
import Link from "next/link";
import AppBreadcrumb from "./breadcrumb";
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
  width: 100%;
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

function getMenuItems(sideData: any, path = ""): JSX.Element[] {
  // console.log("sideData", sideData);
  return sideData?.map((data: SideNav, index: number) => {
    const key = `${data.label}_${index}`;
    if (data.subNav) {
      return (
        <Menu.SubMenu key={key} title={data.label} icon={data.icon}>
          {getMenuItems(data.subNav, data.path)}
        </Menu.SubMenu>
      );
    } else {
      return (
        <Menu.Item key={key} title={data.label} icon={data.icon}>
          {data.label.toLocaleLowerCase() === "overview" ||
          data.label.toLocaleLowerCase() === "message" ? (
            <Link href={`/dashboard/${storage.role}/${data.path}`}>
              {data.label}
            </Link>
          ) : (
            // data.label
            <Link href={`/dashboard/${storage.role}/${path}/${data.path}`}>
              {data.label}
            </Link>
          )}
        </Menu.Item>
      );
    }
  });
}
export default function AppLayout(props: React.PropsWithChildren<any>) {
  const { children } = props;
  const [collapsed, setCollapsed] = useState(false);
  const userRole = storage.role;
  const sideData = routers.get(userRole);
  const MenuItems = getMenuItems(sideData);
  console.log("==", MenuItems);
  return (
    <div>
      <Layout
        style={{
          height: "100vh",
          // backgroundColor: "pink",
        }}
      >
        <Sider
          className="leftSider"
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => {
            setCollapsed(value);
          }}
        >
          <Logo>
            <div className="logo" style={{ color: "#fff", cursor: "pointer" }}>
              cms
            </div>
          </Logo>

          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            // items={MenuItems}
          >
            {MenuItems}
          </Menu>
        </Sider>

        <Layout style={{ overflow: "scroll", width: "100%" }}>
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
              <UserIcon />
            </Row>
          </StyledLayoutHeader>

          <AppBreadcrumb></AppBreadcrumb>

          <StyledContent>{children}</StyledContent>
        </Layout>
      </Layout>
    </div>
  );
}
