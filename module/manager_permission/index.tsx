import "./index.scss";
import {Button, Image, Pagination} from "antd";
import {useContext, useEffect, useState} from "react";
import {useRouter} from "next/router";
import {DollarCircleOutlined} from "@ant-design/icons";
import {Icon} from "@app/components/Icon";
import {BreakCrumGlobal} from "@app/components/BreakCrumGlobal";
import ApiBook from "@app/api/ApiBook";
import {useSelector} from "react-redux";
import FilterGroupGlobal from "@app/components/FilterGroupGlobal";
import {LoadingGlobal} from "@app/components/Loading";
import {useQuery} from "react-query";
import {ContextSearchHome} from "@app/components/Layout/Sidebar/ContextProvider/ContextSearchHome";

export function ManagerPermission(): JSX.Element {
  const router = useRouter();
  const category = useSelector((state: any) => state.category);
  const [listBookInitial, setListBookInitial] = useState<any>([]);
  const [listBook, setListBook] = useState<any>([]);
  const [pageSize, setPageSize] = useState(20);
  const [pageCurent, setPageCurent] = useState(1);
  const [path, setPath] = useState<string[]>(["Trang chủ", "Tất cả sách"]);
  const {searchHomeListBook} = useContext(ContextSearchHome);
  const [paramSubmit, setParamSubmit] = useState({
    sortBy: "null",
    filter: "null",
  });
  const [totalItemBook, setTotalItemBook] = useState(0);
  const listDataCity = [
    {
      value: "null",
      label: "Tất cả",
    },
  ];

  console.log("searchHomeListBook", searchHomeListBook);
  console.log("paramSubmit", paramSubmit);
  // console.log("listBook", listBook);

  const toDetailBook = (item: any): void => {
    router.push({
      pathname: "/detail_book",
      query: {key: item.form, postId: item.id, bookId: item.bookList[0].id},
    });
  };

  const handleChangePage = (page: number, pageSizeNew: number) => {
    if (page !== pageCurent || pageSizeNew !== pageSize) {
      setPageSize(pageSizeNew);
      setPageCurent(page);
      setListBook(
        listBookInitial.slice((page - 1) * pageSizeNew, page * pageSizeNew)
      );
    }
  };
  const handleReset = (): void => {
    setParamSubmit({
      keyWord: "null",
      sortBy: "null",
      filter: "null",
    });
    setListBook([]);
    ApiBook.getAllPost(paramSubmit).then((res: any) => {
      console.log("res", res);
      setListBook(res?.slice(0, pageSize));
      setListBookInitial(res);
    });
  };
  const handleGetPath = () => {
    const temp = ["Trang chủ"];
    const paths = category.find((e: any) => e.id === router.query.kind);
    if (paths) {
      temp.push(paths.name);
      if (paths?.subcategoryList) {
        temp.push(
          paths.subcategoryList.find((e: any) => e.id == router.query.type)
            ?.name
        );
      }
    }
    setPath(temp);
  };

  const handleSelectSort = (value: string): void => {
    console.log("value select", value);
    setParamSubmit({...paramSubmit, sortBy: value});
  };
  const handleSelectCity = (value: any): void => {
    console.log("handleSelectCity");
    setParamSubmit({...paramSubmit, filter: value});
  };

  const listSelectOption = [
    {
      title: "Giá",
      placeholder: "Giá",
      width: 120,
      handleChange: handleSelectSort,
      optionSelect: [
        {
          value: "Tăng dần",
          label: "Tăng dần",
        },
        {
          value: "Giảm dần",
          label: "Giảm dần",
        },
      ],
    },
    {
      title: "Thành phố",
      placeholder: "Chọn thành phố",
      width: 120,
      handleChange: handleSelectCity,
      optionSelect: listDataCity ?? [],
    },
  ];
  const getDataListAllCity = (): Promise<any> => ApiBook.getAllCity();
  const getDataCity = useQuery("GET_DATA_CITY", getDataListAllCity);
  if (getDataCity?.data) {
    getDataCity.data.map((item) =>
      listDataCity.push({
        value: item,
        label: item,
      })
    );
  }

  console.log("getDataCity", getDataCity?.data);
  console.log("listDataCity", listDataCity);

  useEffect(() => {
    if (router.query.search) {
      ApiBook.searchPost(router.query.search as string).then((res: any) => {
        setListBook(res?.slice(0, pageSize));
        setListBookInitial(res);
        setPath(["Trang chủ", "Tìm kiếm"]);
      });
    } else if (router.query.kind) {
      console.log("router.query.kind", router.query.kind);
      ApiBook.getKindBook({
        subcategoryId: router.query.type,
        sortBy: "null",
        filter: "null",
      }).then((res: any) => {
        setListBookInitial(res);
        setListBook(res?.slice(0, pageSize));
        handleGetPath();
      });
    } else {
      if (window.history.state.as === "/") {
        ApiBook.getAllPost({
          keyWord: searchHomeListBook,
          sortBy: paramSubmit.sortBy,
          filter: paramSubmit.filter,
        }).then((res: any) => {
          console.log("res", res);
          setListBook(res?.slice(0, pageSize));
          setListBookInitial(res);
          setTotalItemBook(res.length);
        });
        setPath(["Trang chủ", "Tất cả sách"]);
      }
    }
  }, [router.query, paramSubmit, searchHomeListBook]);

  return (
    // <ContextSearchHome.Provider value={{setParamSubmit, paramSubmit}}>
    <div className="home-container">
      <BreakCrumGlobal listBreakcrum={path} />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingRight: "10%",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <FilterGroupGlobal
            // listSearchText={listSearchText}
            listSelectOption={listSelectOption}
          />
          <Button onClick={handleReset}>Đặt lại</Button>
        </div>
        <span style={{marginLeft: 5}}>Kết quả: {totalItemBook}</span>
      </div>
      <div className="home-list-book">
        {listBook.isLoading ? (
          <LoadingGlobal />
        ) : (
          listBook.map((item: any, index: number) => (
            <div
              onClick={() => toDetailBook(item)}
              className="item-book"
              key={index}
            >
              <Image
                preview={false}
                width={160}
                height={160}
                src={item.imageUrl}
              />
              <div className="text-title">{item.title}</div>
              <div className="row-end">
                <div>
                  <div style={{display: "flex", alignItems: "center"}}>
                    <DollarCircleOutlined />
                    <div className="text-align-center">
                      {item.price ?? "Chưa có giá"}
                    </div>
                  </div>
                  <div>
                    <Icon icon="location" size={18} />
                    <span style={{fontSize: "12px"}}>{item.location}</span>
                  </div>
                </div>
                <div>
                  <Button
                    style={{
                      borderColor: item.form === "bán" ? "red" : "blue",
                      color: item.form === "bán" ? "red" : "blue",
                    }}
                  >
                    {item.form.toLowerCase() === "bán" ? "Bán" : "Trao đổi"}
                  </Button>
                </div>
              </div>
              <div className="author">
                <span>Người đăng:</span>
                {item.userName}
              </div>
            </div>
          ))
        )}
      </div>
      {listBookInitial.length > 0 && (
        <div className="pagination-home">
          <Pagination
            responsive
            current={pageCurent}
            total={listBookInitial.length}
            pageSize={pageSize}
            onChange={(page, PageSizes) => {
              handleChangePage(page, PageSizes);
            }}
          />
        </div>
      )}
    </div>
    // </ContextSearchHome.Provider>
  );
}
