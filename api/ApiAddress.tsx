import {fetcher} from "./Fetcher";
import store from "@app/redux/store";

const path = {
  update: "/address/update-address",
  create: "/address/create-new-address",
  getAll: "/address/get-all-address-By",
  delete: "/address/update-address-status",
};

function creatAddress(data: any) {
  return fetcher({url: path.create, method: "post", data: data});
}

function updateAddress(data: any) {
  return fetcher({url: path.update, method: "put", data: data});
}

function deleteAddress(id: number | string) {
  return fetcher({url: path.delete + "/" + id, method: "put"});
}

function getAllAddress() {
  return fetcher({
    url: path.getAll + "/" + store.getState()?.user?.id,
    method: "get",
  });
}

export default {
  creatAddress,
  updateAddress,
  getAllAddress,
  deleteAddress,
};
