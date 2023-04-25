import {Empty, PaginationProps, SpinProps, Table, TableProps} from "antd";
import "./index.scss";
import {
  ColumnsType,
  TablePaginationConfig,
  TableRowSelection,
} from "antd/lib/table/interface";
import {TableProps as RcTableProps} from "rc-table/lib/Table";
import * as React from "react";
import {
  ColumnType,
  ExpandableConfig,
  GetComponentProps,
} from "rc-table/lib/interface";
import {useWindowDimensions} from "@app/utils/hooks/layout/get-window";

interface CustomTableProps {
  total?: number;
  rowSelection?: TableRowSelection<any>;
  pagination?: TablePaginationConfig | false;
  className?: string;
  data: RcTableProps<any>["data"];
  columns: ColumnsType<any>;
  rowKey?: string;
  isLoading?: boolean | SpinProps;
  tableIndex?: string;
  onRow?: GetComponentProps<any>;
  onChangeTable?: (
    page: number,
    pageSize: number,
    keyColumn?: string,
    type?: number
  ) => void;
  scrollX?: number;
  onHeaderRow?: GetComponentProps<readonly ColumnType<any>[]>;
  expandable?: ExpandableConfig<any>;
}

function CustomTable(props: CustomTableProps): JSX.Element {
  const {
    total,
    isLoading = false,
    rowKey = "id",
    columns,
    data,
    className,
    pagination,
    rowSelection,
    tableIndex = null,
    onRow,
    onChangeTable,
    scrollX = 1000,
    onHeaderRow,
    expandable,
  } = props;

  const {height} = useWindowDimensions();

  const showTotal: PaginationProps["showTotal"] = () =>
    total ? `Total ${total} items` : null;

  const _defaultPagination: TablePaginationConfig = {
    total: total || 0,
    defaultPageSize: 20,
    showSizeChanger: true,
    pageSizeOptions: ["10", "20", "30", "50"],
    showQuickJumper: true,
    showTotal: showTotal,
  };

  const renderPagination = (): TablePaginationConfig | false => {
    if (pagination === false) return false;
    if (pagination) return pagination;
    return _defaultPagination;
  };

  return (
    <Table
      onRow={onRow}
      id={`custom-table${tableIndex}`}
      bordered
      loading={isLoading}
      rowKey={rowKey}
      columns={columns}
      dataSource={data}
      className={`custom-table ${className}`}
      scroll={{scrollToFirstRowOnChange: true, x: scrollX, y: height - 400}}
      pagination={renderPagination()}
      locale={{emptyText: <Empty description="No Data" />}}
      rowSelection={rowSelection}
      onHeaderRow={onHeaderRow}
      expandable={expandable}
      onChange={(
        pagination: TablePaginationConfig,
        filters,
        sorter: any
      ): void => {
        let sortType;
        if (sorter.order === "ascend") {
          sortType = 1;
        } else if (sorter.order === "descend") {
          sortType = 0;
        }
        onChangeTable?.(
          pagination.current ?? 1,
          pagination.pageSize ?? 20,
          sorter.columnKey,
          sortType
        );
      }}
    />
  );
}

function CustomExpandedTable(prop: TableProps<any>): JSX.Element {
  return <Table size="small" bordered pagination={false} {...prop} />;
}

export default CustomTable;
export {CustomExpandedTable};
