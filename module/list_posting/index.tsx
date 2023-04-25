import React from "react";
import "./index.scss";
import {Button, Image} from "antd";
import {UploadOutlined} from "@ant-design/icons";
import Navbar from "@app/components/Layout/Navbar/Navbar";

export function ListPosting(): JSX.Element {
  const avatar =
    "https://thietkekhainguyen.com/wp-content/uploads/2018/10/sach-anh-du-lich7-788x445.jpg";
  const handleButton = (): void => {
    console.log("handleButton", handleButton);
  };
  const list = [
    {
      title: "Những bài văn điểm 10 chấn động mạng",
      name: "Nguyễn Văn A",
      time: "03/02/2023",
      description:
        "Trong bài văn, Thảo viết: “Máy quay dường như đang chậm lại, từng cảnh từng nét hiện lên rõ ràng. Tôi thấy thầy đang lụi hụi trồng rau, chăm sóc con chó lông trắng đen già khụ, thấy cả chúng tôi ngày đó, trong những ngày vất vả nhưng yên bình. Tôi nghĩ, có lẽ đó là những ngày hạnh phúc và vui vẻ nhất tôi từng có. Sau này, khi bước đi trên đường đời chông gai, có thể sẽ chẳng còn ai chỉ bảo, dạy dỗ tôi tận tình như thầy đã từng, có thể sẽ chẳng có ai lo tôi liệu có ngủ đủ giấc, liệu có stress khi nhồi nhét quá nhiều. Nhưng, cố nhân từng nói, cuộc đời chỉ cần một người khiến ta ngưỡng mộ, để cả đời noi gương, cả đời thương mến. Vậy là quá đủ rồi”.",
    },
    {
      title: "Những bài văn điểm 10 chấn động mạng",
      name: "Nguyễn Văn A",
      time: "03/02/2023",
      description:
        "Trong bài văn, Thảo viết: “Máy quay dường như đang chậm lại, từng cảnh từng nét hiện lên rõ ràng. Tôi thấy thầy đang lụi hụi trồng rau, chăm sóc con chó lông trắng đen già khụ, thấy cả chúng tôi ngày đó, trong những ngày vất vả nhưng yên bình. Tôi nghĩ, có lẽ đó là những ngày hạnh phúc và vui vẻ nhất tôi từng có. Sau này, khi bước đi trên đường đời chông gai, có thể sẽ chẳng còn ai chỉ bảo, dạy dỗ tôi tận tình như thầy đã từng, có thể sẽ chẳng có ai lo tôi liệu có ngủ đủ giấc, liệu có stress khi nhồi nhét quá nhiều. Nhưng, cố nhân từng nói, cuộc đời chỉ cần một người khiến ta ngưỡng mộ, để cả đời noi gương, cả đời thương mến. Vậy là quá đủ rồi”.",
    },
    {
      title: "Những bài văn điểm 10 chấn động mạng",
      name: "Nguyễn Văn A",
      time: "03/02/2023",
      description:
        "Trong bài văn, Thảo viết: “Máy quay dường như đang chậm lại, từng cảnh từng nét hiện lên rõ ràng. Tôi thấy thầy đang lụi hụi trồng rau, chăm sóc con chó lông trắng đen già khụ, thấy cả chúng tôi ngày đó, trong những ngày vất vả nhưng yên bình. Tôi nghĩ, có lẽ đó là những ngày hạnh phúc và vui vẻ nhất tôi từng có. Sau này, khi bước đi trên đường đời chông gai, có thể sẽ chẳng còn ai chỉ bảo, dạy dỗ tôi tận tình như thầy đã từng, có thể sẽ chẳng có ai lo tôi liệu có ngủ đủ giấc, liệu có stress khi nhồi nhét quá nhiều. Nhưng, cố nhân từng nói, cuộc đời chỉ cần một người khiến ta ngưỡng mộ, để cả đời noi gương, cả đời thương mến. Vậy là quá đủ rồi”.",
    },
    {
      title: "Những bài văn điểm 10 chấn động mạng",
      name: "Nguyễn Văn A",
      time: "03/02/2023",
      description:
        "Trong bài văn, Thảo viết: “Máy quay dường như đang chậm lại, từng cảnh từng nét hiện lên rõ ràng. Tôi thấy thầy đang lụi hụi trồng rau, chăm sóc con chó lông trắng đen già khụ, thấy cả chúng tôi ngày đó, trong những ngày vất vả nhưng yên bình. Tôi nghĩ, có lẽ đó là những ngày hạnh phúc và vui vẻ nhất tôi từng có. Sau này, khi bước đi trên đường đời chông gai, có thể sẽ chẳng còn ai chỉ bảo, dạy dỗ tôi tận tình như thầy đã từng, có thể sẽ chẳng có ai lo tôi liệu có ngủ đủ giấc, liệu có stress khi nhồi nhét quá nhiều. Nhưng, cố nhân từng nói, cuộc đời chỉ cần một người khiến ta ngưỡng mộ, để cả đời noi gương, cả đời thương mến. Vậy là quá đủ rồi”.",
    },
    {
      title: "Những bài văn điểm 10 chấn động mạng",
      name: "Nguyễn Văn A",
      time: "03/02/2023",
      description:
        "Trong bài văn, Thảo viết: “Máy quay dường như đang chậm lại, từng cảnh từng nét hiện lên rõ ràng. Tôi thấy thầy đang lụi hụi trồng rau, chăm sóc con chó lông trắng đen già khụ, thấy cả chúng tôi ngày đó, trong những ngày vất vả nhưng yên bình. Tôi nghĩ, có lẽ đó là những ngày hạnh phúc và vui vẻ nhất tôi từng có. Sau này, khi bước đi trên đường đời chông gai, có thể sẽ chẳng còn ai chỉ bảo, dạy dỗ tôi tận tình như thầy đã từng, có thể sẽ chẳng có ai lo tôi liệu có ngủ đủ giấc, liệu có stress khi nhồi nhét quá nhiều. Nhưng, cố nhân từng nói, cuộc đời chỉ cần một người khiến ta ngưỡng mộ, để cả đời noi gương, cả đời thương mến. Vậy là quá đủ rồi”.",
    },
    {
      title: "Những bài văn điểm 10 chấn động mạng",
      name: "Nguyễn Văn A",
      time: "03/02/2023",
      description:
        "Trong bài văn, Thảo viết: “Máy quay dường như đang chậm lại, từng cảnh từng nét hiện lên rõ ràng. Tôi thấy thầy đang lụi hụi trồng rau, chăm sóc con chó lông trắng đen già khụ, thấy cả chúng tôi ngày đó, trong những ngày vất vả nhưng yên bình. Tôi nghĩ, có lẽ đó là những ngày hạnh phúc và vui vẻ nhất tôi từng có. Sau này, khi bước đi trên đường đời chông gai, có thể sẽ chẳng còn ai chỉ bảo, dạy dỗ tôi tận tình như thầy đã từng, có thể sẽ chẳng có ai lo tôi liệu có ngủ đủ giấc, liệu có stress khi nhồi nhét quá nhiều. Nhưng, cố nhân từng nói, cuộc đời chỉ cần một người khiến ta ngưỡng mộ, để cả đời noi gương, cả đời thương mến. Vậy là quá đủ rồi”.",
    },
    {
      title: "Những bài văn điểm 10 chấn động mạng",
      name: "Nguyễn Văn A",
      time: "03/02/2023",
      description:
        "Trong bài văn, Thảo viết: “Máy quay dường như đang chậm lại, từng cảnh từng nét hiện lên rõ ràng. Tôi thấy thầy đang lụi hụi trồng rau, chăm sóc con chó lông trắng đen già khụ, thấy cả chúng tôi ngày đó, trong những ngày vất vả nhưng yên bình. Tôi nghĩ, có lẽ đó là những ngày hạnh phúc và vui vẻ nhất tôi từng có. Sau này, khi bước đi trên đường đời chông gai, có thể sẽ chẳng còn ai chỉ bảo, dạy dỗ tôi tận tình như thầy đã từng, có thể sẽ chẳng có ai lo tôi liệu có ngủ đủ giấc, liệu có stress khi nhồi nhét quá nhiều. Nhưng, cố nhân từng nói, cuộc đời chỉ cần một người khiến ta ngưỡng mộ, để cả đời noi gương, cả đời thương mến. Vậy là quá đủ rồi”.",
    },
  ];
  return (
    <div className="list_posting_container">
      <Navbar />
      <div className="list_posting_detail">
        {list.map((item, index) => (
          <div className="item-posting">
            <div style={{display: "flex"}}>
              <Image width={900} height={200} preview={false} src={avatar} />

              <div className="text-item">
                <div style={{display: "flex", justifyContent: "space-between"}}>
                  <h3>{item.title}</h3>
                  <Button type="primary">Cập nhập</Button>
                </div>
                <div>
                  <Image
                    style={{borderRadius: 50}}
                    width={22}
                    height={22}
                    preview={false}
                    src={avatar}
                  />
                  <span
                    style={{
                      marginLeft: 5,
                      fontSize: 15,
                      color: "rgba(0, 0, 0, 0.85)",
                    }}
                  >
                    {item.name}
                  </span>
                </div>
                <div>
                  <UploadOutlined />
                  <span style={{color: "rgba(0, 0, 0, 0.85)", marginLeft: 12}}>
                    Thời gian: {item.time}
                  </span>
                </div>
                <p>{item.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
