import React from "react";
import {
  FormGlobal,
  FormItemGlobal,
  InputGlobal,
  InputTextArea,
} from "@app/components/FormGlobal";
import {ModalGlobal} from "@app/components/Modal";
import {Formik} from "formik";
import {useTranslation} from "react-i18next";
import {Col, Row} from "antd";
import {ManagerPermissionValidation} from "@app/validation/manager_permission/ManagerPermissionValidation";
import {
  createPermission,
  editPermission,
  ICreatePermissionBody,
  IDetailPremissionResponse,
} from "@app/api/ApiManagerPermission";
import {useMutation} from "react-query";

interface ModalPermissionProps {
  dataSelected?: IDetailPremissionResponse;
  typeModal: string;
  onClose: () => void;
  refetch?: () => Promise<any>;
}

export function ModalPermisssion(props: ModalPermissionProps): JSX.Element {
  const {typeModal, onClose, dataSelected, refetch} = props;

  const isEdit = typeModal === "edit";

  const {t} = useTranslation();

  const initialValues = isEdit
    ? {
        href: dataSelected?.response?.href,
        txt_vi: dataSelected?.response?.txt_vi,
        txt_ko: dataSelected?.response?.txt_ko,
        description: dataSelected?.response?.description,
      }
    : {href: "", txt_vi: "", txt_ko: "", description: ""};

  const createPermissionMutation = useMutation(createPermission);
  const editPermissionMutation = useMutation(editPermission);

  return (
    <Formik<ICreatePermissionBody>
      enableReinitialize
      initialValues={initialValues}
      validationSchema={ManagerPermissionValidation}
      onSubmit={(values, {resetForm}): void => {
        const dataSend = isEdit
          ? {...values, id: dataSelected?.response?.id}
          : values;
        const onSuccess = (): void => {
          refetch?.();
          resetForm();
          onClose();
        };
        if (!isEdit) {
          createPermissionMutation.mutate(dataSend, {
            onSuccess: onSuccess,
          });
        } else {
          editPermissionMutation.mutate(dataSend, {
            onSuccess: onSuccess,
          });
        }
      }}
    >
      {(formikHelper): JSX.Element => {
        return (
          <ModalGlobal
            width={600}
            open={["create", "edit"].includes(typeModal)}
            title={
              typeModal === "create"
                ? t("manager_permission.create_permission")
                : t("manager_permission.edit_permission")
            }
            onCancel={(): void => {
              formikHelper.resetForm();
              onClose();
            }}
            onOk={formikHelper.handleSubmit}
            isLoadingOK={
              createPermissionMutation.isLoading ||
              editPermissionMutation.isLoading
            }
          >
            <FormGlobal>
              <Row gutter={[16, 0]}>
                <Col span={12}>
                  <FormItemGlobal name="txt_vi" label="Tên quyền hạn" required>
                    <InputGlobal name="txt_vi" placeholder="Tiếng Việt..." />
                  </FormItemGlobal>
                </Col>

                <Col span={12}>
                  <FormItemGlobal name="href" label="URL" required>
                    <InputGlobal name="href" placeholder="URL" />
                  </FormItemGlobal>
                </Col>

                <Col span={12}>
                  <FormItemGlobal name="txt_ko" required>
                    <InputGlobal name="txt_ko" placeholder="Tiếng Hàn..." />
                  </FormItemGlobal>
                </Col>

                <Col span={24}>
                  <FormItemGlobal name="description" label="Mô tả" required>
                    <InputTextArea
                      name="description"
                      placeholder="Nhập mô tả...."
                    />
                  </FormItemGlobal>
                </Col>
              </Row>
            </FormGlobal>
          </ModalGlobal>
        );
      }}
    </Formik>
  );
}
