import CustomTable from "@app/components/CustomTable";
import {Checkbox, Col, Row} from "antd";
import {useTranslation} from "react-i18next";
import {ColumnsType} from "antd/es/table";
import {useEffect, useMemo, useRef, useState} from "react";
import {
  getIndexRoles,
  getListRole,
  IGetIndexRolesments,
  IGetIndexRolesParams,
  IGetListRole,
  editGroup,
  deletePermission,
  getDetailPremission,
  IDetailPremissionResponse,
} from "@app/api/ApiManagerPermission";
import {useMutation, useQuery} from "react-query";
import {QUERY_MANAGER_PREMISSION} from "@app/api/keyQuery";
import {IconEdit} from "@app/components/Icon";
import FilterGroupGlobal from "@app/components/FilterGroupGlobal";
import {
  ButtonGlobal,
  ButtonGlobalProps,
  ButtonGroupGlobal,
} from "@app/components/ButtonGlobal";
import {openModalConfirm} from "@app/components/ModalConfirm";
import {ModalRole} from "../ModalRole";
import "./index.scss";
import {ModalPermisssion} from "../ModalPermisssion";

interface IChangePremissionProps {
  idDepart: number;
}

function ChangePremission(props: IChangePremissionProps): JSX.Element {
  const {idDepart} = props;

  const {t} = useTranslation();

  const [paramIndexRoles, setParamIndexRoles] = useState<IGetIndexRolesParams>({
    id_depart: idDepart,
  });
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const [openModalRole, setOpenModalRole] = useState(false);

  const [idDataSelected, setIdDataSelected] = useState<number>(-1);
  const [typeModal, setTypeModal] = useState("");

  // convert data
  const getDataIndexRoles = (): Promise<IGetIndexRolesments> =>
    getIndexRoles(paramIndexRoles);
  const dataIndexRoles = useQuery(
    `${QUERY_MANAGER_PREMISSION.GET_INDEX_ROLES}_${idDepart}`,
    getDataIndexRoles
  );

  useEffect(() => {
    dataIndexRoles.refetch();
  }, [paramIndexRoles]);

  const dataTable = useMemo(() => {
    const dataTableTmp: any[] = [];
    dataIndexRoles.data?.response.data.forEach((item) => {
      const itemTable = {
        id: item.id,
        name: item.txt_name,
      };

      const aggConvert = JSON.parse(item.agg);
      aggConvert?.forEach((itemAgg: number) => {
        Object.assign(itemTable, {[itemAgg]: true});
      });
      dataTableTmp.push(itemTable);
    });

    return dataTableTmp;
  }, [dataIndexRoles.data?.response.data]);

  // get columns
  const getDataListRole = (): Promise<IGetListRole> =>
    getListRole({id_depart: idDepart});
  const dataListRoles = useQuery(
    `${QUERY_MANAGER_PREMISSION.GET_LIST_ROLES}_${idDepart}`,
    getDataListRole
  );

  // add data check
  const dataCheckedRole = useRef<{[key: number]: number[]}>({});
  const dataUncheckedRole = useRef<{[key: number]: number[]}>({});

  const handleCheckRole = (e: boolean, id: number, index: number): void => {
    const menuId = dataTable?.[index]?.id;
    const checkedRoleCurrent = dataCheckedRole.current;
    const uncheckedRoleCurrent = dataUncheckedRole.current;

    if (e) {
      if (!checkedRoleCurrent[menuId]) {
        Object.assign(checkedRoleCurrent, {[menuId]: [id]});
      } else {
        checkedRoleCurrent[menuId].push(id);
      }

      if (uncheckedRoleCurrent[menuId]) {
        const newArrRole = uncheckedRoleCurrent[menuId].filter((i) => i !== id);
        uncheckedRoleCurrent[menuId] = newArrRole;
      }
    } else {
      if (!uncheckedRoleCurrent[menuId]) {
        Object.assign(uncheckedRoleCurrent, {[menuId]: [id]});
      } else {
        uncheckedRoleCurrent[menuId].push(id);
      }

      if (checkedRoleCurrent[menuId]) {
        const newArrRole = checkedRoleCurrent[menuId].filter((i) => i !== id);
        checkedRoleCurrent[menuId] = newArrRole;
      }
    }
  };

  const columns = useMemo(() => {
    const tmpColumns: ColumnsType = [
      {
        title: "STT",
        dataIndex: "id",
        key: "id",
        align: "center",
        width: 80,
        render: (_, record, index): JSX.Element => <span>{index + 1}</span>,
      },
      {
        title: "Tên quyền",
        dataIndex: "name",
        align: "center",
        key: "name",
        width: 350,
      },
    ];

    dataListRoles.data?.response.data?.forEach((item) => {
      tmpColumns.push({
        title: item.label,
        key: `${item.value}`,
        dataIndex: `${item.value}`,
        align: "center",
        width: "100px",
        render: (value: boolean, record: any, index: number) => {
          return (
            <Checkbox
              defaultChecked={value}
              onChange={(e): void =>
                handleCheckRole(e.target.checked, item?.value, index)
              }
            />
          );
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
          onClick={(): void => {
            setIdDataSelected(record.id);
            setTypeModal("edit");
          }}
        />
      ),
    });

    return tmpColumns;
  }, [dataListRoles.data?.response.data]);

  const handleSearch = (valueSearch: string): void => {
    setParamIndexRoles({...paramIndexRoles, search: valueSearch});
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[]): void => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  // delete premission
  const deleteDepartments = useMutation(deletePermission, {
    onSuccess: () => {
      dataIndexRoles.refetch();
      setSelectedRowKeys([]);
    },
  });
  const handleDeletePremission = (): void => {
    deleteDepartments.mutate({ids: selectedRowKeys});
  };

  // create role
  const openModalCreateRole = (): void => {
    setOpenModalRole(true);
  };

  const handleCloseModalRole = (): void => {
    setOpenModalRole(false);
  };

  // create posission
  const handleCreateDepartments = (): void => {
    setTypeModal("create");
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

  const handleCloseModalPermisssion = (): void => {
    setTypeModal("");
  };

  const listSearchText = [
    {
      onSearch: handleSearch,
    },
  ];

  const listButton: ButtonGlobalProps[] = [
    {
      title: "Xoá quyền hạn12121212",
      type: "delete",
      disabled: selectedRowKeys.length === 0,
      loading: deleteDepartments.isLoading,
      onClick: (): void => {
        openModalConfirm({
          title: "Xác nhận xoá quyềsssssn hạn",
          onOK: handleDeletePremission,
        });
      },
    },
    {
      title: "Thêm quyền hạn",
      type: "add",
      onClick: handleCreateDepartments,
    },
    {
      title: "Thêm chức vụ",
      type: "add",
      onClick: openModalCreateRole,
    },
  ];

  const editRolesMutation = useMutation(editGroup);
  const handleSave = (): void => {
    const checkedBody = [];
    const uncheckBody = [];
    for (const [key, value] of Object.entries(dataCheckedRole.current)) {
      checkedBody.push({
        menu_id: Number(key),
        group_id: value,
      });
    }
    for (const [key, value] of Object.entries(dataUncheckedRole.current)) {
      uncheckBody.push({
        menu_id: Number(key),
        group_id: value,
      });
    }

    const body = {
      checked: checkedBody,
      uncheck: uncheckBody,
    };
    editRolesMutation.mutate(body, {
      onSuccess: () => {
        dataCheckedRole.current = [];
        dataUncheckedRole.current = [];
      },
    });
  };

  return (
    <div className="change-premission">
      <Row justify="space-between">
        <Col>
          <FilterGroupGlobal listSearchText={listSearchText} />
        </Col>
        <Col>
          <ButtonGroupGlobal listButton={listButton} />
        </Col>
      </Row>
      <CustomTable
        data={dataTable}
        columns={columns}
        isLoading={
          dataListRoles.isLoading ||
          dataIndexRoles.isLoading ||
          dataIndexRoles.isFetching
        }
        rowSelection={{type: "checkbox", onChange: onSelectChange}}
        pagination={false}
      />
      <div className="button-save">
        <ButtonGlobal
          type="primary-filled"
          title="Lưu"
          onClick={handleSave}
          loading={editRolesMutation.isLoading}
        />
      </div>

      <ModalRole
        onClose={handleCloseModalRole}
        idDepart={idDepart}
        openModal={openModalRole}
        refetch={dataListRoles.refetch}
      />

      <ModalPermisssion
        dataSelected={dataDetailPremission.data}
        onClose={handleCloseModalPermisssion}
        typeModal={typeModal}
        refetch={(): Promise<any> => dataIndexRoles.refetch()}
      />
    </div>
  );
}

export default ChangePremission;
