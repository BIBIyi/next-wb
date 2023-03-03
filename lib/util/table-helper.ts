import { TableProps } from "antd/lib/table";
import React from "react";
import { Paginator } from "../model";

export const genCommonTableProps: (
  props: TableProps<any> & {
    total: number;
    paginator: Paginator;
    setPaginator: (paginator: Paginator) => void;
    data: any[];
  }
) => TableProps<any> = ({
  columns,
  data,
  paginator,
  total,
  loading,
  setPaginator,
  rowKey = "id",
}) => {
  const props: TableProps<any> = {
    dataSource: data,
    columns,
    onChange: ({ current, pageSize }) => {
      setPaginator({ ...paginator, page: current, limit: pageSize });
    },
    pagination: {
      current: paginator.page,
      pageSize: paginator.limit,
      total,
      showSizeChanger: true,
    },
    loading,
    rowKey,
  };
  // console.log(data[0]);
  return props;
};
