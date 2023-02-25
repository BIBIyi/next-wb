import React from "react";
import { Breadcrumb } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import { routers, SideNav } from "./router";

export default function AppBreadcrumb() {
  const router = useRouter();
  const path = router.pathname;
  console.log("---", path);
  return (
    <Breadcrumb style={{ margin: "0 16px", padding: 16 }}>{path}</Breadcrumb>
  );
}
