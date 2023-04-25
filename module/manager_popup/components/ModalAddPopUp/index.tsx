import React, {useEffect, useRef, useState} from "react";
import "./index.scss";
import {ModalGlobal} from "@app/components/Modal";
import {Col, Row} from "antd";
import {useTranslation} from "react-i18next";
import {
  FormGlobal,
  FormItemGlobal,
  InputGlobal,
  RangePickerGlobal,
} from "@app/components/FormGlobal";
import {Formik, FormikProps} from "formik";
import UploadFileGlobal from "@app/components/UploadFileGlobal";
import {
  createPopup,
  editPopup,
  IPopupByIdItemResponse,
} from "@app/api/ApiPageManager";
import {ManagerPopupValidation} from "@app/validation/manager_page/ManagerPopupValidation";
import {convertTime} from "@app/utils/convert/ConvertHelper";
import {InputLinkGlobal} from "@app/components/InputGlobal";
import {useMutation} from "react-query";
import moment, {Moment} from "moment";

interface ModalAddPopupProps {
  onClose: () => void;
  isShow: string;
  dataSelect: IPopupByIdItemResponse;
  refetch: any;
}

interface FormValue {
  title?: string;
  time_range?: [Moment, Moment];
  link_embed?: string;
  link_image?: string;
  popupwidth?: number;
  popupheight?: number;
  popupx?: number;
  popupy?: number;
  availablescroll?: number;
  image_file?: Blob;
}

export function ModalAddPopup(props: ModalAddPopupProps): JSX.Element {
  const {isShow, onClose, dataSelect, refetch} = props;

  const {t} = useTranslation(["translation"], {
    keyPrefix: "translation:manager_page.manger_popup",
  });

  const _formikRef = useRef<FormikProps<FormValue> | null>(null);

  const [linkImage, setLinkImage] = useState(dataSelect.urlImage?.description);
  const [linkImage1, setLinkImage1] = useState(
    dataSelect.urlImage?.description
  );
  const [isDisableInputLinkImage, setIsDisableInputLinkImage] = useState(false);
  const [errFile, setErrorFile] = useState(false);

  useEffect(() => {
    setLinkImage(dataSelect.urlImage?.description);
  }, [dataSelect]);

  const initValue: FormValue = {
    title: dataSelect.title,
    time_range: dataSelect.timedue
      ? [
          moment.unix(dataSelect.timedue || 0),
          moment.unix(dataSelect.timeavailable || 0),
        ]
      : undefined,
    link_embed: dataSelect.urlImage?.link,
    link_image: dataSelect.urlImage?.description,
    popupwidth: dataSelect.popupwidth,
    popupheight: dataSelect.popupheight,
    popupx: dataSelect.popupx,
    popupy: dataSelect.popupy,
    availablescroll: 1,
  };

  const listInput = [
    {
      name: "title",
      lable: "Tiêu đề",
      placeholder: "Tiêu đề",
      require: true,
      type: "input",
    },
    {
      name: "time_range",
      lable: "Thời gian đăng bài",
      placeholder: "Thời gian",
      require: true,
      type: "date",
    },
    {
      name: "link_embed",
      lable: "Link nhúng",
      placeholder: "Link nhúng...",
      require: true,
      type: "input",
    },
    {
      name: "popupwidth",
      lable: "Chiều rộng (px)",
      placeholder: "0",
      require: true,
      type: "input",
    },
    {
      name: "popupheight",
      lable: "Chiều cao (px)",
      require: true,
      placeholder: "0",
      type: "input",
    },
    {
      name: "popupx",
      lable: "Vị trí X (px)",
      require: true,
      placeholder: "0",
      type: "input",
    },
    {
      name: "popupy",
      lable: "Vị trí Y (px)",
      require: true,
      placeholder: "0",
      type: "input",
    },
  ];

  const formData = new FormData();

  const clearFormData = (): void => {
    for (const key of Array.from(formData.keys())) {
      formData.delete(key);
    }
  };

  const handleCancel = (): void => {
    _formikRef.current?.resetForm();
    // setLinkImage("");
    setIsDisableInputLinkImage(false);
    onClose();
    clearFormData();
    setErrorFile(false);
  };

  const handleChangeFile = (data: Blob): void => {
    if (data) {
      _formikRef.current?.setFieldValue("image_file", data);
      setIsDisableInputLinkImage(true);
      setErrorFile(false);
    } else {
      _formikRef.current?.setFieldValue("image_file", "");
      setIsDisableInputLinkImage(false);
      setErrorFile(true);
    }
  };

  const handleSubmitLinkImage = (value: string): void => {
    if (value?.length > 0) {
      setErrorFile(false);
    } else {
      setErrorFile(true);
    }
    setLinkImage(value);
    _formikRef.current?.setFieldValue("link_image", value);
    formData.append("link_image", value);
  };

  const onSuccess = (): void => {
    _formikRef.current?.resetForm();
    clearFormData();
    refetch();
    handleCancel();
  };

  const createPopupMutation = useMutation(createPopup);
  const editPopupMutation = useMutation(editPopup);
  const handleSubmitForm = (values: FormValue): void => {
    if (errFile) return;
    const dataSend = {
      ...values,
      timedue: convertTime(values.time_range?.[0]),
      timeavailable: convertTime(values.time_range?.[1]),
      time_range: undefined,
    };

    for (const [key, value] of Object.entries(dataSend)) {
      if (typeof value === "object") {
        formData.append(key, value);
      } else if (value) {
        formData.append(key, value.toString());
      }
    }

    if (isShow === "edit") {
      formData.append("id", `${dataSelect.id}`);
      editPopupMutation.mutate(formData, {
        onSuccess: onSuccess,
      });
    } else {
      createPopupMutation.mutate(formData, {
        onSuccess: onSuccess,
      });
    }
  };

  return (
    <Formik
      innerRef={_formikRef}
      enableReinitialize
      initialValues={initValue}
      onSubmit={handleSubmitForm}
      validationSchema={ManagerPopupValidation}
    >
      {(formikHelper): JSX.Element => {
        return (
          <ModalGlobal
            textCancel="Hủy bỏ"
            textOK="Xác nhận"
            onOk={(): void => {
              if (
                !formikHelper.values.image_file &&
                !formikHelper.values.link_image
              ) {
                setErrorFile(true);
              } else {
                setErrorFile(false);
              }

              formikHelper.handleSubmit();
            }}
            open={isShow === "create" || isShow === "edit"}
            title={dataSelect.id ? t("edit_popup.title") : t("add_popup.title")}
            isLoadingOK={
              createPopupMutation.isLoading || editPopupMutation.isLoading
            }
            onCancel={handleCancel}
          >
            <FormGlobal
              layout="horizontal"
              labelCol={{span: 8}}
              labelAlign="left"
              wrapperCol={{span: 16}}
              className="modal-popup"
            >
              <Row gutter={[16, 0]} justify="space-between">
                <Col span={16}>
                  {listInput.map((item) => (
                    <FormItemGlobal
                      name={item.name}
                      label={item.lable}
                      required={item.require}
                      key={item.name}
                    >
                      {item.type === "input" && (
                        <InputGlobal
                          name={item.name}
                          placeholder={item.placeholder}
                        />
                      )}
                      {item.type === "date" && (
                        <RangePickerGlobal name={item.name} />
                      )}
                    </FormItemGlobal>
                  ))}
                </Col>
                <Col span={8} push={1}>
                  <UploadFileGlobal
                    label="Hình ảnh"
                    required
                    error={errFile}
                    url={linkImage}
                    handleChange={handleChangeFile}
                    disabled={!!linkImage1}
                  />
                  <InputLinkGlobal
                    onSubmit={handleSubmitLinkImage}
                    required
                    label="Link ảnh đại diện"
                    disabled={isDisableInputLinkImage}
                    defaultValue={linkImage}
                    onChange={(value) => setLinkImage1(value)}
                  />
                </Col>
              </Row>
            </FormGlobal>
          </ModalGlobal>
        );
      }}
    </Formik>
  );
}
