import {fetcher} from "./Fetcher";

const path = {
  post: "/post/create-post",
};

function creatPost(data: any) {
  return fetcher({url: path.post, method: "post", data: data});
}

export default {
  creatPost,
};
