import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Layout, Input, Button, Table, Space } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import TextLink from "antd/lib/typography/Link";
import type { TablePaginationConfig } from "antd/es/table";
import { ColumnType } from "antd/lib/table";
import type { FilterValue, SorterResult } from "antd/es/table/interface";
import studentJson from "../../../../mock/student.json";
import AppLayout from "@/components/layout/layout";
import { Student } from "@/components/model/students";
import { CourseShort } from "@/components/model/course";
import { BaseType } from "@/components/model";
import { formatDistanceToNow } from "date-fns";
import { message, Popconfirm } from "antd";
const Search = styled(Input.Search)`
  width: 30%;
  display: block;
`;

const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  background-color: white;
`;

const confirm = (e: React.MouseEvent<HTMLElement>) => {
  console.log(e);
  message.success("Click on Yes");
};

const columns: ColumnType<Student>[] = [
  {
    title: "No.",
    key: "index",
    render: (_1, _2, index) => index + 1,
  },
  {
    title: "Name",
    dataIndex: "name",
    sorter: true,
    sortDirections: ["ascend", "descend"],
  },
  {
    title: "Area",
    dataIndex: "country",
    width: "10%",
    filters: [
      { text: "China", value: "China" },
      { text: "New Zealand", value: "New Zealand" },
      { text: "Canada", value: "Canada" },
      { text: "Australia", value: "Australia" },
    ],
    onFilter: (value: string, record: Student) =>
      record.country.includes(value),
  },
  {
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Selected Curriculum",
    dataIndex: "courses",
    width: "25%",
    render: (courses: CourseShort[]) =>
      courses?.map((item) => item.name).join(","),
  },
  {
    title: "Students Type",
    dataIndex: "typeId",
    filters: [
      { text: "developer", value: "developer" },
      { text: "tester", value: "tester" },
    ],
    // onFilter: (value: string, record: Student) => record.type.name === value,
    // render: (type: BaseType) => type?.name,
  },
  {
    title: "Join Time",
    dataIndex: "ctime",
    render: (value: string) =>
      formatDistanceToNow(new Date(value), { addSuffix: true }),
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <a>Edit</a>
        <Popconfirm
          title="Delete the task"
          description="Are you sure to delete this task?"
          onConfirm={confirm}
          okText="Confirm"
          cancelText="Cancel"
        >
          <a>Delete</a>
        </Popconfirm>
      </Space>
    ),
  },
];

const searchQuery = {};

export default function Students() {
  const displayData = studentJson;
  const [query, setQuery] = useState<string>("");
  // useEffect(() => {
  //   console.log(displayData[0]);
  // }, []);
  return (
    <div>
      <Layout style={{ backgroundColor: "white" }}>
        <FlexContainer>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => console.log("add")}
          >
            Add
          </Button>
          <Search
            placeholder="Search by name"
            onSearch={(values) => setQuery(values)}
            onChange={searchQuery}
          />
        </FlexContainer>
        <Table columns={columns} dataSource={displayData}></Table>
      </Layout>
    </div>
  );
}
