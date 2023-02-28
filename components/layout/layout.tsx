import React, { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Layout, Menu, Input, Row } from "antd";
import type { MenuProps } from "antd";
import styled from "styled-components";
import storage from "../../lib/services/storage";
import { routers, SideNav } from "./router";
import UserIcon from "./userIcon";
import Link from "next/link";
import AppBreadcrumb from "./breadcrumb";
import { da } from "date-fns/locale";
import { Route } from "react-router-dom";
import { useRouter } from "next/router";

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
const HeaderIcon = styled.span`
  font-size: 18px;
  color: #fff;

  cursor: pointer;
  &:hover {
    color: #1890ff;
  }
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

type MenuItem = Required<MenuProps>["items"][number];
function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return { key, label, icon, children } as MenuItem;
}

function getMenuItems(sideData: any, parentPath = "") {
  return sideData?.map((data: SideNav, index: number) => {
    // const key = `${data.label}_${index}`;
    let path = `/dashboard/${storage.role}/${data.path}`;
    if (data.subNav && !!data.subNav.length) {
      // const path = `${parentPath}/${data.path}`;
      return getItem(
        data.label,
        path,
        data.icon,
        getMenuItems(data.subNav, data.path)
      );
    } else {
      {
        // data.label.toLocaleLowerCase() === "overview" ||
        // data.label.toLocaleLowerCase() === "message" ?
        parentPath === ""
          ? (path = `/dashboard/${storage.role}/${data.path}`)
          : (path = `/dashboard/${storage.role}/${parentPath}/${data.path}`);
      }

      return getItem(data.label, path, data.icon);
    }
  });
}

export default function AppLayout(props: React.PropsWithChildren<any>) {
  const router = useRouter();
  const { children } = props;
  const [collapsed, setCollapsed] = useState(false);
  const userRole = storage.role;
  const sideData = routers.get(userRole);
  const data = getMenuItems(sideData);
  // const { defaultOpenKeys, defaultSelectedKeys } = getMenuConfig(sideData);
  // console.log("menuItem:", data, typeof data);

  const onClick: MenuProps["onClick"] = (e) => {
    router.push(e.key);
  };
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
        onCollapse={(value) => {
          setCollapsed(value);
        }}
      >
        <Logo>
          <div className="logo" style={{ color: "#fff", cursor: "pointer" }}>
            CMS
          </div>
        </Logo>

        <Menu
          theme="dark"
          mode="inline"
          // defaultSelectedKeys={["1"]}
          // defaultOpenKeys={["sub1"]}
          items={data}
          onClick={onClick}
        ></Menu>
      </Sider>

      <Layout style={{ overflow: "scroll", width: "100%" }}>
        <StyledLayoutHeader>
          <HeaderIcon>
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                onClick: () => setCollapsed(!collapsed),
              }
            )}
          </HeaderIcon>
          <Row style={{ color: "#fff" }}>
            <div>message</div>
            <UserIcon />
          </Row>
        </StyledLayoutHeader>

        {/* <AppBreadcrumb></AppBreadcrumb> */}

        <Content
          style={{
            margin: "16px",
            backgroundColor: "#fff",
            padding: "16px",
            minHeight: "auto",
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}
