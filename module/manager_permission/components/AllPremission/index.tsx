import "./index.scss";
import React, {useEffect, useMemo, useState} from "react";
import {IconEdit} from "@app/components/Icon";
import {ModalPermisssion} from "../ModalPermisssion";
import {useTranslation} from "react-i18next";
import CustomTable from "@app/components/CustomTable";
import {
  getIndexDepartments,
  deletePermission,
  IGetIndexDepartments,
  IGetIndexDepartmentsParams,
  IGetListDepartmentItem,
  IDetailPremissionResponse,
  getDetailPremission,
} from "@app/api/ApiManagerPermission";
import {ColumnsType} from "antd/lib/table";
import {useMutation, useQuery} from "react-query";
import {QUERY_MANAGER_PREMISSION} from "@app/api/keyQuery";
import {Col, Row} from "antd";
import FilterGroupGlobal, {
  ListSearchTextType,
} from "@app/components/FilterGroupGlobal";
import {
  ButtonGlobalProps,
  ButtonGroupGlobal,
} from "@app/components/ButtonGlobal";
import {openModalConfirm} from "@app/components/ModalConfirm";

interface AllPremissionProps {
  listDepartments: IGetListDepartmentItem[] | undefined;
  isLoading?: boolean;
  setActiveKeyTab: (value: string) => void;
}

export function AllPremission(props: AllPremissionProps): JSX.Element {
  const {listDepartments, isLoading, setActiveKeyTab} = props;

  const {t} = useTranslation();
  const [typeModal, setTypeModal] = useState("");
  const [idDataSelected, setIdDataSelected] = useState<number>(-1);
  const [paramIndexDepartments, setParamIndexDepartments] =
    useState<IGetIndexDepartmentsParams>({});
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const showModalEdit = (dataRow: any): void => {
    setIdDataSelected(dataRow.id);
    setTypeModal("edit");
  };

  const columns = useMemo(() => {
    const tmpColumns: ColumnsType = [
      {
        title: "STT",
        align: "center",
        width: 80,
        render: (_, __, index) =>
          ((paramIndexDepartments.page || (1 as number)) - 1) *
            (paramIndexDepartments.perpage || (20 as number)) +
          index +
          1,
      },
      {
        title: "Tên quyền",
        dataIndex: "name",
        align: "center",
        key: "name",
      },
    ];

    listDepartments?.forEach((item) => {
      tmpColumns.push({
        title: item.label,
        key: `${item.value}`,
        className: "header-column-click",
        dataIndex: `${item.value}`,
        align: "center",
        onHeaderCell: (column) => {
          return {
            onClick: (): void => {
              if (column.key) {
                setActiveKeyTab(column.key.toString());
              }
            },
          };
        },
        render: (value: string) => {
          return <span>{value || 0}</span>;
        },
      });
    });

    tmpColumns.push({
      title: t("manager_permission.action"),
      key: "action",
      dataIndex: "action",
      fixed: "right",
      align: "center",
      width: "100px",
      render: (_: any, record: any): JSX.Element => (
        <IconEdit
          className="icon-edit"
          isLoading={dataDetailPremission.isLoading}
          onClick={(): void => showModalEdit(record)}
        />
      ),
    });

    return tmpColumns;
  }, [listDepartments, paramIndexDepartments]);

  const handleCloseModal = (): void => {
    setTypeModal("");
  };

  // handle data index departments
  const getDataIndexDepartments = (): Promise<IGetIndexDepartments> =>
    getIndexDepartments(paramIndexDepartments);
  const dataIndexDepartments = useQuery(
    QUERY_MANAGER_PREMISSION.GET_INDEX_DEPARTMENTS,
    getDataIndexDepartments
  );

  useEffect(() => {
    dataIndexDepartments.refetch();
  }, [paramIndexDepartments]);

  const dataTable = useMemo(() => {
    const dataTableTmp: any[] = [];
    dataIndexDepartments.data?.response.data.forEach((item) => {
      const itemTable = {
        id: item.id,
        name: item.txt_name,
      };

      const aggConvert = JSON.parse(item.agg);
      aggConvert.forEach((itemAgg: {id: number; total: number}) => {
        Object.assign(itemTable, {[itemAgg.id]: itemAgg.total});
      });
      dataTableTmp.push(itemTable);
    });

    return dataTableTmp;
  }, [dataIndexDepartments.data?.response.data]);

  // delete departments
  const deleteDepartments = useMutation(deletePermission, {
    onSuccess: () => {
      dataIndexDepartments.refetch();
      setSelectedRowKeys([]);
    },
  });
  const handleDeleteDepartments = (): void => {
    deleteDepartments.mutate({ids: selectedRowKeys});
  };

  // create posission
  const handleCreateDepartments = (): void => {
    setTypeModal("create");
    setIdDataSelected(-1);
  };

  const handleSearch = (valueSearch: string): void => {
    setParamIndexDepartments({...paramIndexDepartments, search: valueSearch});
  };

  const handleOnChangePage = (page: number, pageSize: number): void => {
    setParamIndexDepartments({
      ...paramIndexDepartments,
      page: page,
      perpage: pageSize,
    });
  };

  // get detail permistion
  const getDataDetailPremission = (): Promise<IDetailPremissionResponse> =>
    getDetailPremission({id: idDataSelected});
  const dataDetailPremission = useQuery(
    QUERY_MANAGER_PREMISSION.GET_DETAIL_PERMISSION,
    getDataDetailPremission,
    {
      enabled: false,
      onSuccess: () => {
        setIdDataSelected(-1);
      },
    }
  );

  useEffect(() => {
    if (idDataSelected > -1) {
      dataDetailPremission.refetch();
    }
  }, [idDataSelected]);

  const listButton: ButtonGlobalProps[] = [
    {
      title: "11111Xoá quyền hạn",
      type: "delete",
      disabled: selectedRowKeys.length === 0,
      onClick: (): void => {
        openModalConfirm({
          title: "Xác nhận xoá quyền hạn",
          onOK: handleDeleteDepartments,
        });
      },
    },
    {
      title: "Thêm quyền hạn",
      type: "add",
      onClick: handleCreateDepartments,
    },
  ];

  const listSearchText: ListSearchTextType[] = [
    {
      onSearch: handleSearch,
      maxLength: 255,
      tooltip: "Từ khoá: Tên quyền",
    },
  ];

  const onSelectChange = (newSelectedRowKeys: React.Key[]): void => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  return (
    <div className="all-premission">
      <Row justify="space-between">
        <Col>
          <FilterGroupGlobal listSearchText={listSearchText} />
        </Col>
        <Col>
          <ButtonGroupGlobal listButton={listButton} />
        </Col>
      </Row>
      <CustomTable
        rowSelection={{type: "checkbox", onChange: onSelectChange}}
        columns={columns}
        data={dataTable}
        isLoading={
          isLoading ||
          dataIndexDepartments.isLoading ||
          dataIndexDepartments.isFetching
        }
        total={dataIndexDepartments.data?.response.total}
        onChangeTable={handleOnChangePage}
      />
      <ModalPermisssion
        dataSelected={dataDetailPremission.data}
        onClose={handleCloseModal}
        typeModal={typeModal}
        refetch={(): Promise<any> => dataIndexDepartments.refetch()}
      />
    </div>
  );
}
