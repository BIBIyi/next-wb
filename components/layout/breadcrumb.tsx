import React from "react";
import { Breadcrumb } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import storage from "@/lib/services/storage";

export default function AppBreadcrumb() {
  const router = useRouter();
  const paths = router.pathname.split("/").slice(1);
  const path = router.pathname.split("/").slice(3);
  const root = "/" + paths.slice(0, 2).join("/");
  const role = storage.role;
  // console.log("---role:", path);

  return (
    <Breadcrumb style={{ margin: "0 16px", padding: 16 }}>
      <Breadcrumb.Item key={root}>
        <Link href={root}>{`CMS ${role} SYSTEM`}</Link>
      </Breadcrumb.Item>
      {path.length === 0 ? (
        <Breadcrumb.Item>Overview</Breadcrumb.Item>
      ) : (
        <Breadcrumb.Item>{path}</Breadcrumb.Item>
      )}
    </Breadcrumb>
  );
}
