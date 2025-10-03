import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const HomePage = () => {
  const banners = [
    {
      id: 1,
      title: "Bom tấn tháng 10",
      desc: "Trải nghiệm phim chiếu rạp hấp dẫn nhất năm",
      img: "https://picsum.photos/1600/600?random=1",
    },
    {
      id: 2,
      title: "Đặt vé cực nhanh",
      desc: "Chọn phim – Rạp – Ngày – Suất chiếu chỉ trong vài bước",
      img: "https://picsum.photos/1600/600?random=2",
    },
    {
      id: 3,
      title: "Khuyến mãi siêu hot",
      desc: "Giảm giá 50% vé cho học sinh, sinh viên vào thứ 4",
      img: "https://picsum.photos/1600/600?random=3",
    },
  ];

  return (
    <div className="w-full">
      {/* Banner slideshow */}
      <section className="relative">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation={true}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          loop={true}
          pagination={{
            clickable: true,
            renderBullet: (index, className) => {
              return `<span class="${className}" style="
        display:inline-block;
        width:20px;
        height:4px;
        border-radius:2px;
        background:#fff;
        margin:0 4px;
      "></span>`;
            },
          }}
          className="h-[250px] sm:h-[350px] md:h-[500px] lg:h-[600px]" // 👈 responsive chiều cao
        >
          {banners.map((banner) => (
            <SwiperSlide key={banner.id}>
              <div className="relative w-full h-full">
                <img
                  src={banner.img}
                  alt={banner.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center text-white px-4 sm:px-8">
                  <h1 className="text-lg sm:text-2xl md:text-4xl font-bold mb-3 sm:mb-4">
                    {banner.title}
                  </h1>
                  <p className="mb-4 sm:mb-6 text-xs sm:text-sm md:text-lg max-w-2xl">
                    {banner.desc}
                  </p>
                  <button className="px-4 sm:px-6 py-2 sm:py-3 bg-orange-500 hover:bg-orange-600 rounded-full font-semibold shadow-lg text-sm sm:text-base">
                    Đặt vé ngay
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      <section className="relative bg-gray-900 py-8 px-4 sm:px-8">
        <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-6 md:p-8 relative z-10">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6 text-center">
            Đặt vé nhanh
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {/* Chọn phim */}
            <select className="border rounded-lg px-3 py-2 text-sm md:text-base focus:ring-2 focus:ring-orange-500">
              <option>Chọn phim</option>
              <option>Avengers: Endgame</option>
              <option>Spiderman: No Way Home</option>
              <option>Doraemon: Nobita và Vùng Đất Mới</option>
            </select>

            {/* Chọn rạp */}
            <select className="border rounded-lg px-3 py-2 text-sm md:text-base focus:ring-2 focus:ring-orange-500">
              <option>Chọn rạp</option>
              <option>CGV Vincom</option>
              <option>Galaxy Nguyễn Du</option>
              <option>BHD Bitexco</option>
            </select>

            {/* Chọn ngày */}
            <select className="border rounded-lg px-3 py-2 text-sm md:text-base focus:ring-2 focus:ring-orange-500">
              <option>Chọn ngày</option>
              <option>24/09/2025</option>
              <option>25/09/2025</option>
              <option>26/09/2025</option>
            </select>

            {/* Chọn suất chiếu */}
            <select className="border rounded-lg px-3 py-2 text-sm md:text-base focus:ring-2 focus:ring-orange-500">
              <option>Chọn suất chiếu</option>
              <option>09:30</option>
              <option>13:45</option>
              <option>19:00</option>
            </select>

            {/* Nút đặt vé */}
            <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg px-4 py-2 text-sm md:text-base transition">
              Đặt vé ngay
            </button>
          </div>
        </div>
      </section>

      {/* Phim mới */}
      <section className="py-12 px-4 sm:px-8 bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl md:text-2xl font-bold text-orange-500">
              🎬 Phim mới
            </h2>
            <button className="text-orange-500 hover:underline text-sm md:text-base font-medium">
              Hiển thị tất cả
            </button>
          </div>
          <Swiper
            modules={[Navigation, Autoplay]}
            navigation={true}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            spaceBetween={16}
            breakpoints={{
              320: { slidesPerView: 2, spaceBetween: 12 },
              640: { slidesPerView: 3, spaceBetween: 16 },
              1024: { slidesPerView: 5, spaceBetween: 20 },
            }}
          >
            {[1, 2, 3, 4, 5, 6, 7].map((id) => (
              <SwiperSlide key={id}>
                <div className="bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition">
                  <img
                    src={`https://picsum.photos/300/400?random=${id}`}
                    alt="Movie Poster"
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-3 text-center">
                    <h3 className="text-sm font-semibold text-gray-800 truncate">
                      Movie {id}
                    </h3>
                    <button className="mt-2 px-3 py-1 bg-orange-500 hover:bg-orange-600 text-white text-xs rounded-lg">
                      Đặt vé
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Phim đang chiếu */}
      <section className="py-12 px-4 sm:px-8 bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl md:text-2xl font-bold text-orange-500">
              🎬 Phim đang chiếu
            </h2>
            <button className="text-orange-500 hover:underline text-sm md:text-base font-medium">
              Hiển thị tất cả
            </button>
          </div>
          <Swiper
            modules={[Navigation, Autoplay]}
            navigation={true}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            spaceBetween={16}
            breakpoints={{
              320: { slidesPerView: 2, spaceBetween: 12 },
              640: { slidesPerView: 3, spaceBetween: 16 },
              1024: { slidesPerView: 5, spaceBetween: 20 },
            }}
          >
            {[8, 9, 10, 11, 12, 13, 14].map((id) => (
              <SwiperSlide key={id}>
                <div className="rounded-xl overflow-hidden shadow hover:shadow-lg transition">
                  <img
                    src={`https://picsum.photos/300/400?random=${id}`}
                    alt="Movie Poster"
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-3 text-center">
                    <h3 className="text-sm font-semibold text-orange-800 truncate">
                      Movie {id}
                    </h3>
                    <button className="mt-2 px-3 py-1 bg-orange-500 hover:bg-orange-600 text-white text-xs rounded-lg">
                      Đặt vé
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      <section className="container mx-auto px-6 py-10">
        <h2 className="text-2xl font-bold text-orange-500 mb-6">🎁 Ưu đãi</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="p-6 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl shadow"
            >
              <h3 className="font-semibold text-lg mb-2">Khuyến mãi {i}</h3>
              <p className="text-sm mb-4">
                Giảm 50% vé cho học sinh, sinh viên vào thứ 4 hàng tuần.
              </p>
              <button className="px-4 py-2 bg-black/40 rounded-lg hover:bg-black/60 text-sm">
                Xem chi tiết
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
