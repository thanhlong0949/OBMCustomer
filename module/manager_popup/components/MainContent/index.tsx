import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import CustomTable from "@app/components/CustomTable";
import {Col, Row} from "antd";
import {
  ButtonGlobalProps,
  ButtonGroupGlobal,
} from "@app/components/ButtonGlobal";
import FilterGroupGlobal, {
  ListSelectOptionType,
} from "@app/components/FilterGroupGlobal";
import {ColumnsType} from "antd/es/table";
import {IconEdit} from "@app/components/Icon";
import {openModalConfirm} from "@app/components/ModalConfirm";
import {ModalAddPopup} from "@app/module/manager_page/manager_popup/components/ModalAddPopUp";
import {
  changeStatusPopup,
  deleteListPopup,
  getListPopup,
  getPopupById,
  IGetListPopupParams,
  IListPopupItemResponse,
  IListPopupResponse,
  IPopupByIdItemResponse,
  IPopupByIdResponse,
} from "@app/api/ApiPageManager";
import {useMutation, useQuery} from "react-query";
import {QUERY_PAGE_MANAGER} from "@app/api/keyQuery";
import moment from "moment/moment";
import PreviewGlobal from "@app/components/PreviewGlobal";
import {SwitchCheckGlobal} from "@app/components/SwitchGlobal";

interface MainContentProps {
  site: number;
}
export function MainContent(props: MainContentProps): JSX.Element {
  const {site} = props;

  const {t} = useTranslation(["translation"], {
    keyPrefix: "translation:manager_page.manger_popup",
  });
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const onSelectChange = (newSelectedRowKeys: React.Key[]): void => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const [isShowModalPopup, setIsShowModalPopup] = useState("");
  const [dataSelect, setDataSelect] = useState<IPopupByIdItemResponse>({});
  const [paramListPopup, setParamListPopup] = useState<IGetListPopupParams>({
    site: site,
  });
  const [idPopup, setIdPopup] = useState<number>(-1);
  const [arrStatus, setArrStatus] = useState<{id: number; checked: boolean}[]>(
    []
  );
  const [idLoadingStatus, setIdLoadingStatus] = useState<number>();

  const getDataListPopup = (): Promise<IListPopupResponse> =>
    getListPopup(paramListPopup);
  const dataListPopup = useQuery(
    `${QUERY_PAGE_MANAGER.GET_LIST_POPUP}_${site}`,
    getDataListPopup
  );

  // convert status
  useEffect(() => {
    const arrStatusTmp: {id: number; checked: boolean}[] = [];
    dataListPopup.data?.response?.data?.forEach((item) => {
      arrStatusTmp.push({
        id: item.id || 0,
        checked: item.status === 1,
      });
    });
    setArrStatus(arrStatusTmp);
  }, [dataListPopup.data?.response?.data]);

  const getDataPopupById = (): Promise<IPopupByIdResponse> =>
    getPopupById(idPopup);

  const {refetch, isFetching} = useQuery(
    `${QUERY_PAGE_MANAGER.GET_POPUP_BY_ID}_${site}`,
    getDataPopupById,
    {
      enabled: false,
      onSuccess: (response) => {
        setDataSelect(response?.response ?? {});
        setIdPopup(-1);
      },
      onError: () => {
        setIdPopup(-1);
      },
    }
  );

  useEffect(() => {
    if (idPopup > 0) {
      refetch();
    }
  }, [idPopup]);

  useEffect(() => {
    if (!isFetching && dataSelect.id) {
      setIsShowModalPopup("edit");
    }
  }, [isFetching]);

  // delete
  const deletePopup = useMutation(deleteListPopup, {
    onSuccess: (data) => {
      dataListPopup.refetch();
      setSelectedRowKeys([]);
    },
  });
  const handleDeletePopup = (): void => {
    deletePopup.mutate({ids: selectedRowKeys});
  };

  useEffect(() => {
    dataListPopup.refetch();
  }, [paramListPopup]);

  const closeModalPopup = (): void => {
    setIsShowModalPopup("");
    setDataSelect({});
  };

  const handleEditPopup = (record: IListPopupItemResponse): void => {
    if (record.id) {
      setIdPopup(record.id);
    }
  };

  const handleCreatePopup = (): void => {
    setDataSelect({});
    setIsShowModalPopup("create");
  };

  // change status
  const changeStatusPopupMutation = useMutation(changeStatusPopup, {
    onError: (err) => console.log(err),
  });
  const handleChangeStatus = (
    checked: boolean,
    id: number,
    index: number
  ): void => {
    const arrStatusTmp = arrStatus;
    setIdLoadingStatus(id);
    changeStatusPopupMutation.mutate(
      {id: id, status: checked ? 1 : 0},
      {
        onSuccess: () => {
          arrStatusTmp[index] = {...arrStatusTmp[index], checked: checked};
          setArrStatus(arrStatusTmp);
        },
      }
    );
  };

  const columns: ColumnsType<IListPopupItemResponse> = [
    {
      title: "STT",
      align: "center",
      width: 80,
      render: (_, __, index) =>
        ((paramListPopup.page || (1 as number)) - 1) *
          (paramListPopup.perpage || (20 as number)) +
        index +
        1,
    },
    {
      title: t("image"),
      dataIndex: "urlImage",
      key: "urlImage",
      align: "center",
      width: "15%",
      render: (value): JSX.Element => (
        <PreviewGlobal link={value.description} />
      ),
    },
    {
      title: t("title"),
      dataIndex: "title",
      key: "title",
      align: "center",
      width: "15%",
    },
    {
      title: t("author"),
      dataIndex: "author",
      key: "author",
      align: "center",
      width: "15%",
    },
    {
      title: t("datePost"),
      dataIndex: "timedue",
      key: "timedue",
      align: "center",
      width: "15%",
      render: (value): JSX.Element => (
        <div>{value ? moment.unix(value).format("DD/MM/YYYY") : "-"}</div>
      ),
    },
    {
      title: t("dateCreatePost"),
      dataIndex: "timecreated",
      key: "timecreated",
      align: "center",
      width: "10%",
      render: (value): JSX.Element => (
        <div>{value ? moment.unix(value).format("DD/MM/YYYY") : "-"}</div>
      ),
    },
    {
      title: t("state"),
      dataIndex: "status",
      key: "status",
      align: "center",
      width: "10%",
      render: (value, record, index): JSX.Element => (
        <SwitchCheckGlobal
          checked={arrStatus[index]?.checked}
          onChange={(checked): void =>
            handleChangeStatus(checked, record.id || 0, index)
          }
          loading={
            changeStatusPopupMutation.isLoading && idLoadingStatus === record.id
          }
        />
      ),
    },
    {
      title: t("action"),
      key: "action",
      dataIndex: "action",
      align: "center",
      fixed: "right",
      width: "10%",
      render: (_: any, record: IListPopupItemResponse): JSX.Element => (
        <IconEdit
          className="icon-edit"
          onClick={(): void => handleEditPopup(record)}
          isLoading={isFetching && idPopup === record.id}
        />
      ),
    },
  ];
  const handleOnChangePage = (page: number, pageSize: number): void => {
    setParamListPopup({
      ...paramListPopup,
      page: page,
      perpage: pageSize,
    });
  };
  const handleSearch = (valueSearch: string): void => {
    setParamListPopup({...paramListPopup, search: valueSearch});
  };
  const handleSearchRangeDate = (
    start: number | undefined,
    end: number | undefined
  ): void => {
    if (start && end) {
      setParamListPopup({
        ...paramListPopup,
        timestart_filter: start,
        timeend_filter: end,
      });
    } else {
      delete paramListPopup.timestart_filter;
      delete paramListPopup.timeend_filter;
      setParamListPopup({...paramListPopup});
    }
  };

  const handleSearchStatus = (valueIsUsed: number): void => {
    setParamListPopup({...paramListPopup, status_filter: valueIsUsed});
  };

  const listButton: ButtonGlobalProps[] = [
    {
      title: "Đăng ký",
      type: "add",
      onClick: handleCreatePopup,
    },
    {
      title: "Xoá",
      type: "delete",
      disabled: selectedRowKeys.length === 0,
      onClick: (): void => {
        openModalConfirm({
          title: "Xác nhận xoá Popup",
          onOK: handleDeletePopup,
        });
      },
    },
  ];

  const listSearchText = [
    {
      placeHolder: "Tìm kiếm...",
      onSearch: handleSearch,
      maxLength: 255,
      tooltip: "Từ khóa: Tiêu đề",
    },
  ];

  const listDatePicker = [
    {
      onChange: (startTime: number, endTime: number): void => {
        handleSearchRangeDate(startTime, endTime);
      },
      tooltip: "Thời gian đăng",
    },
  ];

  const listSelectOption: ListSelectOptionType[] = [
    {
      optionSelect: [
        {
          value: 1,
          label: "Có sử dụng",
        },
        {
          value: 0,
          label: "Không sử dụng",
        },
      ],
      placeholder: "Trạng thái sử dụng",
      handleChange: (value: any): void => {
        handleSearchStatus(value);
      },
    },
  ];

  return (
    <div>
      <Row justify="space-between">
        <Col>
          <FilterGroupGlobal
            listSearchText={listSearchText}
            listDatePicker={listDatePicker}
            listSelectOption={listSelectOption}
          />
        </Col>
        <Col>
          <ButtonGroupGlobal listButton={listButton} />
        </Col>
      </Row>
      <CustomTable
        total={dataListPopup.data?.response?.total}
        rowSelection={{type: "checkbox", onChange: onSelectChange}}
        columns={columns}
        onChangeTable={handleOnChangePage}
        data={dataListPopup.data?.response?.data}
        isLoading={dataListPopup.isLoading || dataListPopup.isFetching}
      />
      <ModalAddPopup
        onClose={closeModalPopup}
        isShow={isShowModalPopup}
        dataSelect={dataSelect}
        refetch={() => dataListPopup.refetch()}
      />
    </div>
  );
}
