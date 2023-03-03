import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Layout, Input, Button, Table, Space, Form } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { ColumnType } from "antd/lib/table";
import studentJson from "../../../../mock/student.json";
import AppLayout from "@/components/layout/layout";
import {
  Student,
  StudentsRequest,
  StudentsResponse,
} from "@/lib/model/students";
import { CourseShort } from "@/lib/model/course";
import { formatDistanceToNow } from "date-fns";
import { message, Popconfirm } from "antd";
import apiService from "@/lib/services/api-service";
import useListEffect from "@/components/custom-hooks/list-effect";
import { da } from "date-fns/locale";
import { genCommonTableProps } from "@/lib/util";
import { BaseType } from "@/lib/model";
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

const onConfirm = (e: React.MouseEvent<HTMLElement>) => {
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
    dataIndex: "type",
    filters: [
      { text: "developer", value: "developer" },
      { text: "tester", value: "tester" },
    ],
    onFilter: (value: any, record: Student | null) =>
      record.type.name === value,
    render: (type: BaseType) => type?.name,
  },
  {
    title: "Join Time",
    dataIndex: "updatedAt",
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
          onConfirm={(e) => {
            console.log(e);
            message.success("Click on Yes");
          }}
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
  const [query, setQuery] = useState<string>("");
  const [isModalDisplay, setModalDisplay] = useState(false);
  const { data, loading, paginator, setPaginator, total, setTotal, setData } =
    useListEffect<StudentsRequest, StudentsResponse, Student>(
      apiService.getStudents.bind(apiService),
      "students",
      true,
      { query }
    );

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
            onClick={() => {
              console.log("search");
            }}
          />
        </FlexContainer>
        <Table
          {...genCommonTableProps({
            data,
            paginator,
            loading,
            setPaginator,
            columns,
            total,
          })}
        ></Table>
      </Layout>
      <div>
        <Form></Form>
      </div>
    </div>
  );
}
