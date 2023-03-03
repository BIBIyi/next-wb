import {
  CalendarOutlined,
  DashboardOutlined,
  DeploymentUnitOutlined,
  EditOutlined,
  FileAddOutlined,
  MessageOutlined,
  ProfileOutlined,
  ProjectOutlined,
  ReadOutlined,
  SolutionOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import React from "react";
import { Role } from "../../lib/model/role";

export interface SideNav {
  icon?: JSX.Element;
  label: string;
  path: string;
  hideLinkInBreadcrumb?: boolean; // 当前面包屑上的链接是否应该被隐藏
  subNav?: SideNav[];
  // hide?: boolean;
}

const overview: SideNav = {
  path: "",
  label: "Overview",
  icon: <DashboardOutlined />,
};

const students: SideNav = {
  path: "students",
  label: "Student",
  icon: <SolutionOutlined />,
  hideLinkInBreadcrumb: true,
  subNav: [{ path: "", label: "Student List", icon: <TeamOutlined /> }],
};
const teachers: SideNav = {
  path: "teachers",
  label: "Teacher",
  icon: <DeploymentUnitOutlined />,
  hideLinkInBreadcrumb: true,
  subNav: [{ path: "", label: "Teacher List", icon: <TeamOutlined /> }],
};
const courses: SideNav = {
  path: "courses",
  label: "Course",
  icon: <ReadOutlined />,
  hideLinkInBreadcrumb: true,
  subNav: [
    { path: "", label: "All Courses", icon: <ProjectOutlined /> },
    {
      path: "add-course",
      label: "Add Course",
      icon: <FileAddOutlined />,
    },
    {
      path: "edit-course",
      label: "Edit Course",
      icon: <EditOutlined />,
    },
  ],
};

const messages: SideNav = {
  path: "message",
  label: "Message",
  icon: <MessageOutlined />,
};

export const routers: Map<Role, SideNav[]> = new Map([
  ["manager", [overview, students, teachers, courses, messages]],
  ["teacher", [overview, students, courses, messages]],
]);
