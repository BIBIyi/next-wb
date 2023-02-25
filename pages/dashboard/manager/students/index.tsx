import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Layout, Input, Button, Table, Space } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import type { TablePaginationConfig } from "antd/es/table";
import { ColumnType } from "antd/lib/table";
import type { FilterValue, SorterResult } from "antd/es/table/interface";
import studentJson from "../../../../mock/student.json";
import AppLayout from "@/components/layout/layout";
import { Student } from "@/components/model/students";
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

// const columns: ColumnsType<Student>[] = [

//     width: "10%",
//   },
//   {
//     title: "Name",
//     dataIndex: "name",
//     sorter: true,
//   },
//   {
//     title: "Area",
//     dataIndex: "country",
//     filters: [
//       { text: "China", value: "0" },
//       { text: "New Zealand", value: "1" },
//       { text: "Canada", value: "2" },
//       { text: "Australia", value: "3" },
//     ],
//     width: "10%",
//   },
//   {
//     title: "Email",
//     dataIndex: "email",
//     width: "30%",
//   },
//   {
//     title: "Selected Curriculum",
//     dataIndex: "studentCourseIds",
//     width: "30%",
//   },
//   {
//     title: "Students Type",
//     dataIndex: "typeId",
//     filters: [
//       { text: "1", value: "2" },
//       { text: "2", value: "2" },
//     ],
//   },
//   {
//     title: "Join Time",
//     dataIndex: "ctime",
//   },
//   {
//     title: "Action",
//     key: "action",
//     render: (_, record) => (
//       <Space size="middle">
//         <a>Edit</a>
//         <a>Delete</a>
//       </Space>
//     ),
//   },
// ];
const columns: ColumnType<Student>[] = [
  {
    title: "No.",
    key: "index",
    render: (_1, _2, index) => index + 1,
    width: "10%",
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
    <AppLayout>
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
    </AppLayout>
  );
}
