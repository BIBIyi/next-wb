import React from "react";
import { Dropdown, MenuProps, message, Space, Avatar } from "antd";
import {
  LogoutOutlined,
  ProfileOutlined,
  UserOutlined,
} from "@ant-design/icons";
import styled from "styled-components";
import apiService from "@/lib/services/api-service";
import storage from "@/lib/services/storage";
import { useRouter } from "next/router";
const HeaderIcon = styled.span`
  font-size: 18px;
  color: #fff;
  cursor: pointer;
  transition: color 0.3s;
  &:hover {
    color: #1890ff;
  }
`;
export default function UserIcon() {
  const router = useRouter();
  const onClick: MenuProps["onClick"] = async () => {
    const { data } = await apiService.loginOut();
    if (data) {
      storage.deleteUserInfo();
      router.push("/login");
    }
  };
  const items: MenuProps["items"] = [
    { label: "layout", key: "1", icon: <LogoutOutlined /> },
  ];

  return (
    <HeaderIcon style={{ marginLeft: "2em" }}>
      <Dropdown menu={{ items, onClick }}>
        <a onClick={(e) => e.preventDefault()}>
          <Space size={16} wrap>
            <Avatar
              icon={<UserOutlined />}
              style={{ backgroundColor: "#CCCCCC" }}
            />
          </Space>
        </a>
      </Dropdown>
    </HeaderIcon>
  );
}
