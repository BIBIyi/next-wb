import React, { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Layout, Menu, Input, Row } from "antd";
import type { MenuProps } from "antd";
import styled from "styled-components";
import storage from "../../lib/services/storage";
import Link from "react-router-dom";
import { routers, SideNav } from "./router";
import UserIcon from "./userIcon";
import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import AppBreadcrumb from "./breadcrumb";
import { da } from "date-fns/locale";

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

// const getMenuConfig = (
//   data: SideNav[]
// ): { defaultSelectedKeys: string[]; defaultOpenKeys: string[] } => {
//   const key = "1";
//   const defaultSelectedKeys = [key.split("/").pop()];
//   const defaultOpenKeys = key.split("/").slice(0, -1);

//   return { defaultSelectedKeys, defaultOpenKeys };
// };
type MenuItem = Required<MenuProps>["items"][number];
function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return { key, label, icon, children } as MenuItem;
}

function getMenuItems(sideData: any, path = "") {
  return sideData?.map((data: SideNav, index: number) => {
    const key = `${data.label}_${index}`;
    if (data.subNav) {
      return getItem(
        data.label,
        key,
        data.icon,
        getMenuItems(data.subNav, data.path)
      );
    } else {
      return getItem(data.label, key, data.icon);
    }
  });
}

// console.log("sideData", sideData);
// return sideData?.map((data: SideNav, index: number) => {
//   const key = `${data.label}_${index}`;
//   return getItem(data.label, key, data.icon);
// if (data.subNav) {
//   return (
/* 
        { 
          key:key,
          icon:data.icon,
          children:getMenuItems(data.subNav, data.path),
          label:data.label
          url:path+data.path
        }
        */
// getItem(
//   data.label,
//   key,
//   data.icon,
//   getMenuItems(data.subNav, data.path)
// )
// <Menu.SubMenu key={key} title={data.label} icon={data.icon}>
// getMenuItems(data.subNav, data.path)
// </Menu.SubMenu>
//   );
// } else {
//   return getItem(data.label, key, data.icon);
/*
        {
          key,
          icon:data.icon,
          children:data.label.toLocaleLowerCase() === "overview" ||
          data.label.toLocaleLowerCase() === "message" ? (
            <Link href={`/dashboard/${storage.role}/${data.path}`}>
              {data.label}
            </Link>
          ) : (
            // data.label
            <Link href={`/dashboard/${storage.role}/${path}/${data.path}`}>
              {data.label}
            </Link>
          ),
          label:data.label
        }
        */
// <Menu.Item key={key} title={data.label} icon={data.icon}>
//   {/* {data.label.toLocaleLowerCase() === "overview" ||
//   data.label.toLocaleLowerCase() === "message" ? (
//     <Link href={`/dashboard/${storage.role}/${data.path}`}>
//       {data.label}
//     </Link>
//   ) : (
//     // data.label
//     <Link href={`/dashboard/${storage.role}/${path}/${data.path}`}>
//       {data.label}
//     </Link>
//   )} */}
//   {data.label}
// </Menu.Item>
//   }
// });
const items: MenuItem[] = [
  getItem("Option 1", "1", <PieChartOutlined />),
  getItem("Navigation Two", "sub2", <AppstoreOutlined />, [
    getItem("Option 5", "5"),
    getItem("Option 6", "6"),
    getItem("Submenu", "sub3", null, [
      getItem("Option 7", "7"),
      getItem("Option 8", "8"),
    ]),
  ]),
  getItem("Navigation Three", "sub4", <AppstoreOutlined />, [
    getItem("Option 9", "9"),
    getItem("Option 10", "10"),
    getItem("Option 11", "11"),
    getItem("Option 12", "12"),
  ]),
];
export default function AppLayout(props: React.PropsWithChildren<any>) {
  const { children } = props;
  const [collapsed, setCollapsed] = useState(false);
  const userRole = storage.role;
  const sideData = routers.get(userRole);
  const data = getMenuItems(sideData);
  // const { defaultOpenKeys, defaultSelectedKeys } = getMenuConfig(sideData);
  const getData: MenuItem[] = data;
  console.log("menuItem:", data, typeof data);
  console.log("items", items, typeof items);
  console.log("getData", getData, typeof getData);
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
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          items={getData}
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
