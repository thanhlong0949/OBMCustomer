import {fetcher} from "./Fetcher";

const path = {
  category: "/category/get-all-category-and-subcategory",
  get_all_post: "/post/search-post-by-Keyword",
};

function getAllPost(params: {
  keyWord?: string | null;
  sortBy?: string | null;
  filter?: string | null;
}) {
  return fetcher({
    url: `${path.get_all_post}`,
    method: "get",
    params: params,
  });
}

function getKindBook(params: {
  subcategoryId?: number | string;
  sortBy?: string;
  filter?: string;
}) {
  return fetcher({
    url: `/post/get_all_post_by_subcategoryId`,
    method: "get",
    params: params,
  });
}

function getCategory() {
  return fetcher({url: path.category, method: "get"});
}
function getBookDetail(postId: string | number) {
  return fetcher({url: `/book/get-book-by/${postId}`, method: "get"});
}

function searchPost(search: string) {
  return fetcher({
    url: `/post/search-post-by-Keyword/${search}`,
    method: "get",
  });
}

function getCategoryDetail() {
  return fetcher({url: `/category/get-all-category`, method: "get"});
}

function getAllCity(): Promise<any> {
  return fetcher({url: `/address/get_all_city_in_list_post`, method: "get"});
}

function getSubcategoryDeatail(id: number | string) {
  return fetcher({
    url: `/subcategory/get-all-subcategory/${id}`,
    method: "get",
  });
}

export default {
  getAllPost,
  getCategory,
  getKindBook,
  getBookDetail,
  searchPost,
  getCategoryDetail,
  getSubcategoryDeatail,
  getAllCity,
};
