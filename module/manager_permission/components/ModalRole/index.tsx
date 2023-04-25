import React from "react";
import {InputGlobal} from "@app/components/FormGlobal";
import {ModalGlobal} from "@app/components/Modal";
import {Formik} from "formik";
import * as Yup from "yup";
import {createRole} from "@app/api/ApiManagerPermission";
import {useMutation} from "react-query";
import ErrorMessageGlobal from "@app/components/ErrorMessageGlobal";

interface ModalRoleProps {
  openModal: boolean;
  onClose: () => void;
  idDepart: number;
  refetch: () => Promise<any>;
}

export function ModalRole(props: ModalRoleProps): JSX.Element {
  const {openModal, onClose, idDepart, refetch} = props;

  const ManagerRoleValidation = Yup.object().shape({
    name: Yup.string().trim().required("Tên chức vụ không được để trống"),
  });

  const initialValues = {
    name: "",
    id_depart: idDepart,
    is_main: false,
  };

  const handleCancel = (): void => {
    onClose();
  };

  const createRoleMutation = useMutation(createRole);

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={ManagerRoleValidation}
      onSubmit={(values, {resetForm}): void => {
        const handleSuccess = (): void => {
          refetch();
          resetForm();
          onClose();
        };

        const dataSend = {...values, name: [values.name]};
        createRoleMutation.mutate(dataSend, {
          onSuccess: handleSuccess,
        });
      }}
    >
      {(formikHelper): JSX.Element => {
        return (
          <ModalGlobal
            width={395}
            open={openModal}
            title="Thêm chức vụ"
            onCancel={handleCancel}
            onOk={formikHelper.handleSubmit}
          >
            <div>
              <InputGlobal name="name" placeholder="Tên chức vụ" />
              <ErrorMessageGlobal name="name" />
            </div>
          </ModalGlobal>
        );
      }}
    </Formik>
  );
}
