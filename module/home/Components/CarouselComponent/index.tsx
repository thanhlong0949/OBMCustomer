import React from "react";
import "./index.scss";
import {Swiper, SwiperSlide} from "swiper/react";
import {Image} from "antd";
// Import Swiper styles
import "swiper/scss";
import "swiper/scss/pagination";

import {Pagination} from "swiper";
import {useRouter} from "next/router";
import {Icon} from "@app/components/Icon";

interface ICarouselComponent {
  title: string;
  isViewAll?: boolean;
  handleViewAll?: () => void;
  listItem: {
    image?: string;
    category?: string;
    title?: string;
    buy?: string;
  }[];
}
export function CaroselComponents(props: ICarouselComponent): JSX.Element {
  const {listItem, title, isViewAll, handleViewAll} = props;
  const router = useRouter();

  const goToDetailBook = (): void => {
    router.push("/detail_book");
  };
  const goToTopCategory = (): void => {
    console.log("goToTopCategory");
  };
  const goToTopUser = (): void => {
    console.log("goToTopUser");
  };

  const handleGoToPage = (): void => {
    switch (title) {
      case "Top thể loại":
        goToTopCategory();
        break;
      case "Top người dùng":
        goToTopUser();
        break;
      case "Top bài đăng":
        goToDetailBook();
        break;
    }
  };
  return (
    <div className="carousel-component">
      <div style={{display: "flex", justifyContent: "space-between"}}>
        <h3>{title}</h3>
        {isViewAll && (
          <div style={{cursor: "pointer"}} onClick={handleViewAll}>
            <span>Xem tất cả</span>
            <Icon icon="ArrowRight_2" size={17} />
          </div>
        )}
      </div>
      <div className="list-slider">
        <div className="slider">
          <Swiper
            slidesPerView={1}
            spaceBetween={10}
            pagination={{
              clickable: true,
            }}
            autoplay={{
              delay: 500,
              disableOnInteraction: false,
            }}
            breakpoints={{
              "@0.00": {
                slidesPerView: 1,
                spaceBetween: 10,
              },
              "@0.75": {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              "@1.00": {
                slidesPerView: 3,
                spaceBetween: 40,
              },
              "@1.50": {
                slidesPerView: 4,
                spaceBetween: 50,
              },
            }}
            modules={[Pagination]}
            className="mySwiper"
          >
            {listItem.map((item, index) => (
              <SwiperSlide onClick={handleGoToPage} className="swiper-slide">
                <div className="item-slide">
                  <Image
                    preview={false}
                    width={160}
                    height={160}
                    src={item.image}
                  />
                  <div className="text-title-category">{item.category}</div>
                  {title === "Top bài đăng" ? (
                    <div className="buy">{item.buy}</div>
                  ) : (
                    <div className="buy">{item.buy} lượt mua</div>
                  )}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      {/* <div */}
      {/*  style={{display: "flex", justifyContent: "center", marginTop: "30px"}} */}
      {/* > */}
      {/*  <Button onClick={handleViewAll} type="primary"> */}
      {/*    Xem tất cả */}
      {/*  </Button> */}
      {/* </div> */}
    </div>
  );
}
