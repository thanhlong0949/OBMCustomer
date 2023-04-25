import React from "react";
import "./index.scss";
import {Swiper, SwiperSlide} from "swiper/react";
import {Button, Card, Image} from "antd";
// Import Swiper styles
import "swiper/scss";
import "swiper/scss/pagination";

import {Pagination} from "swiper";
import Navbar from "@app/components/Layout/Navbar/Navbar";
import {useRouter} from "next/router";
import {DollarCircleOutlined, StarFilled} from "@ant-design/icons";
import {CaroselComponents} from "@app/module/home/Components/CarouselComponent";

const {Meta} = Card;

export function Home(): JSX.Element {
  const router = useRouter();
  const listLider = [
    {
      image:
        "https://salt.tikicdn.com/cache/280x280/ts/product/05/3f/91/9e0157711ad88490a2497018aaf79bad.png.webp",
      category: "Sách về gia đình",
      title: "Sách về gia đình",
      buy: "555",
    },
    {
      image:
        "https://salt.tikicdn.com/cache/750x750/ts/product/45/80/54/5c5a2c14bde00cc5be525efc1a0e16cc.jpg.webp",
      category: "Truyện trinh thám",
      buy: "106",
    },
    {
      image:
        "https://salt.tikicdn.com/cache/750x750/ts/product/45/80/54/5c5a2c14bde00cc5be525efc1a0e16cc.jpg.webp",
      category: "Truyện trinh thám",
      buy: "106",
    },
    {
      image:
        "https://salt.tikicdn.com/cache/280x280/ts/product/e2/e4/32/595bd4103f4c207b29d46b8ae0e86b3a.jpg.webp",

      category: "Truyện Manga",
      buy: "105",
    },
    {
      image:
        "https://salt.tikicdn.com/cache/280x280/ts/product/14/bd/41/bc96c22e236b9408b2693b80a05bdf25.jpg.webp",
      category: "Truyện ma",
      buy: "159",
    },
    {
      image:
        "https://salt.tikicdn.com/cache/280x280/ts/product/15/28/5d/d086661715806b0cd6053f2a40c5e1a4.jpg.webp",
      category: "Truyện hoạt hình",
      buy: "431",
    },
    {
      image:
        "https://salt.tikicdn.com/cache/280x280/ts/product/05/3f/91/9e0157711ad88490a2497018aaf79bad.png.webp",
      category: "Sách về gia đình",
      title: "Sách về gia đình",
      buy: "516",
    },
    {
      image:
        "https://salt.tikicdn.com/cache/750x750/ts/product/45/80/54/5c5a2c14bde00cc5be525efc1a0e16cc.jpg.webp",
      category: "Truyện trinh thám",
      buy: "1065",
    },
    {
      image:
        "https://salt.tikicdn.com/cache/280x280/ts/product/e2/e4/32/595bd4103f4c207b29d46b8ae0e86b3a.jpg.webp",

      category: "Truyện Manga",
      buy: "24",
    },
    {
      image:
        "https://salt.tikicdn.com/cache/280x280/ts/product/14/bd/41/bc96c22e236b9408b2693b80a05bdf25.jpg.webp",
      category: "Truyện ma",
      buy: "5",
    },
    {
      image:
        "https://salt.tikicdn.com/cache/280x280/ts/product/15/28/5d/d086661715806b0cd6053f2a40c5e1a4.jpg.webp",
      category: "Truyện hoạt hình",
      buy: "90",
    },
  ];

  const listUser = [
    {
      image:
        "http://booking.bhdstar.vn/CDN/media/entity/get/FilmPosterGraphic/HO00002561",
      category: "Avatar",
      buy: "103",
    },
    {
      image:
        "data:image/jpeg;base64,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",
      category: "Thanos",
      buy: "103",
    },
    {
      image: "https://nguoinoitieng.tv/images/nnt/102/0/bgmp.jpg",
      category: "Hulk",
      buy: "103",
    },
    {
      image:
        "https://cms.dmpcdn.com/cdn-cgi/image/fit=cover,quality=85,f=auto/https://cms.dmpcdn.com/article/2021/05/30/cc7430c0-c160-11eb-8020-bb86c50a8d49_original.jpg",
      category: "Loki",
      buy: "103",
    },
    {
      image:
        "https://kenh14cdn.com/thumb_w/660/2018/5/16/photo-4-15264888122402032180945.jpg",
      category: "Ironman",
      buy: "103",
    },
    {
      image: "https://mcdn.coolmate.me/image/July2022/image1_91.png",
      category: "Caption America",
      buy: "103",
    },
    {
      image:
        "https://vtv1.mediacdn.vn/thumb_w/650/2020/8/29/chadwick-boseman-elle-man-feature-1598674387430539628601.jpg",
      category: "Black Panther",
      buy: "103",
    },
    {
      image:
        "https://cms.dmpcdn.com/cdn-cgi/image/fit=cover,quality=85,f=auto/https://cms.dmpcdn.com/article/2021/05/30/cc7430c0-c160-11eb-8020-bb86c50a8d49_original.jpg",
      category: "Loki",
      buy: "103",
    },
    {
      image:
        "https://kenh14cdn.com/thumb_w/660/2018/5/16/photo-4-15264888122402032180945.jpg",
      category: "Ironman",
      buy: "103",
    },
    {
      image: "https://mcdn.coolmate.me/image/July2022/image1_91.png",
      category: "Caption America",
      buy: "103",
    },
  ];

  const listPosting = [
    {
      image:
        "https://salt.tikicdn.com/cache/750x750/ts/product/4f/87/d7/75d5f3884d462d1b23b7376c5300896f.png.webp",
      category: "Ăn Sạch Sống Xanh, Tâm Lành Trí Khoẻ",
      buy: "TPHCM",
    },
    {
      image:
        "https://salt.tikicdn.com/cache/750x750/media/catalog/producttmp/25/4d/52/6e5a9b48c1316dc3ccc55df2c955ec24.jpg.webp",
      category: "Sách Thay Đổi Cuộc Sống Với Nhân Số Học - Lê Đỗ Quỳnh Hương",
      buy: "TPHCM",
    },
    {
      image:
        "https://salt.tikicdn.com/cache/750x750/ts/product/07/3e/ae/26cc99e58483d0030de5e8dc777e3d81.jpg.webp",
      category: "Sách Người trong muôn nghề",
      buy: "TPHCM",
    },
    {
      image:
        "https://salt.tikicdn.com/cache/750x750/ts/product/78/97/9e/09dc123679ecd939271fe9a4ee4cb841.jpg.webp",
      category: "Làm sạch tâm hồn - Các bài tập thiền",
      buy: "TPHCM",
    },
    {
      image:
        "https://salt.tikicdn.com/cache/750x750/ts/product/c9/ae/56/39270337e02960aa4f4938e113e4c5c2.jpg.webp",
      category: "Sách Chữa Lành Nỗi Đau",
      buy: "TPHCM",
    },
    {
      image:
        "https://salt.tikicdn.com/cache/750x750/ts/product/63/8f/cf/555ac6f80db52502513ae753c7d33722.jpg.webp",
      category: "Những đòn tâm lý trong thuyết phục",
      buy: "TPHCM",
    },
    {
      image:
        "https://vtv1.mediacdn.vn/thumb_w/650/2020/8/29/chadwick-boseman-elle-man-feature-1598674387430539628601.jpg",
      category: "Cho Đi Và Nhận Lại",
      buy: "TPHCM",
    },
    {
      image:
        "https://cms.dmpcdn.com/cdn-cgi/image/fit=cover,quality=85,f=auto/https://cms.dmpcdn.com/article/2021/05/30/cc7430c0-c160-11eb-8020-bb86c50a8d49_original.jpg",
      category: "Cho Đi Và Nhận Lại",
      buy: "TPHCM",
    },
    {
      image:
        "https://kenh14cdn.com/thumb_w/660/2018/5/16/photo-4-15264888122402032180945.jpg",
      category: "Cho Đi Và Nhận Lại",
      buy: "TPHCM",
    },
    {
      image: "https://mcdn.coolmate.me/image/July2022/image1_91.png",
      category: "Cho Đi Và Nhận Lại",
      buy: "TPHCM",
    },
  ];

  const handleViewAll = (): void => {
    console.log("handleViewAll");
    router.push("/manager_permission");
  };

  return (
    <div className="home-page-container">
      <Navbar />
      <div className="introduce">
        <div className="background-image-home" />
        <div className="text-introduce-detail">
          <div>
            <h2 className="text-introduce">
              {" "}
              "Một cuốn sách hay thực sự hay dạy tôi nhiều điều hơn là đọc nó,
              Tôi phải nhanh chóng đặt nó xuống, bắt đầu sống theo những điều nó
              chỉ dẫn. Điều tôi bắt đầu bằng cách đọc, tôi phải kết thúc bằng
              hành động"
            </h2>
            <div
              style={{
                color: "white",
                width: "100%",
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <em>-- Henry David Thoreau --</em>
            </div>
          </div>
        </div>
      </div>
      <CaroselComponents title="Top thể loại" listItem={listLider} />
      <CaroselComponents title="Top người dùng" listItem={listUser} />
      <CaroselComponents
        isViewAll
        handleViewAll={handleViewAll}
        title="Top bài đăng"
        listItem={listPosting}
      />

      <div className="row3">
        <div className="title">
          <h2>CHỢ SÁCH CŨ</h2>
        </div>
        <div className="desciption">
          <p>
            “Đằng sau sự thành công công của một người đàn ông, là hình dáng của
            một người phụ nữ. Còn đằng sau sự thành công của bất kì ai là ít
            nhất một cuốn sách, hay cả một giá sách..”
          </p>
          <p>
            “Vào khoảnh khắc mà chúng ta quyết thuyết phục đứa trẻ, bất cứ đứa
            trẻ nào, bước qua bậc thềm ấy, bậc thềm màu nhiệm dẫn vào thư viện,
            ta thay đổi cuộc sống của nó mãi mãi, theo cách tốt đẹp hơn.” -
            Barack Obama
          </p>
          <p>
            “Vào khoảnh khắc mà chúng ta quyết thuyết phục đứa trẻ, bất cứ đứa
            trẻ nào, bước qua bậc thềm ấy, bậc thềm màu nhiệm dẫn vào thư viện,
            ta thay đổi cuộc sống của nó mãi mãi, theo cách tốt đẹp hơn.” -
            Barack Obama
          </p>
          <p>
            "Cuốn sách tốt nhất cho bạn là cuốn sách nói nhiều nhất với bạn vào
            lúc bạn đọc nó. Tôi không nói tới cuốn sách cho bạn nhiều bài học
            nhất mà là cuốn sách nuôi dưỡng tâm hồn bạn. Và điều đó phụ thuộc
            vào tuổi tác, trải nghiệm, nhu cầu về tâm lý và tinh thần.” -
            Robertson Davies
          </p>
        </div>
      </div>
    </div>
  );
}
