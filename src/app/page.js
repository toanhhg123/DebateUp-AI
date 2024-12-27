"use client";

// components

// sections
import CarouselFeatures from "./carousel-features.js";
import Hero from "./hero.js";
import TopBookCategories from "./top-book-categories.js";

import Image from "next/image";

export default function Campaign() {
  return (
    <>
      <Hero />
      <TopBookCategories />
      <CarouselFeatures />

      <div className="bg-gray-50 min-h-screen py-12 px-6">
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
            Chào mừng đến với <span className="text-blue-600">DebateUp</span>
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Nơi bạn khám phá và nâng cao kỹ năng hùng biện của mình thông qua
            các khóa học chất lượng.
          </p>
        </div>
        {/* Features Section */}
        <div className="max-w-7xl mx-auto mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Học từ chuyên gia
            </h3>
            <p className="text-gray-600">
              Các giảng viên với nhiều năm kinh nghiệm sẽ hướng dẫn bạn từng
              bước cải thiện kỹ năng.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Cộng đồng hỗ trợ
            </h3>
            <p className="text-gray-600">
              Tham gia cộng đồng những người yêu thích hùng biện để học hỏi và
              chia sẻ kinh nghiệm.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Chứng nhận uy tín
            </h3>
            <p className="text-gray-600">
              Hoàn thành khóa học và nhận chứng nhận giúp bạn nổi bật trong sự
              nghiệp và học tập.
            </p>
          </div>
        </div>
        {/* Course Section */}
        <div className="max-w-7xl mx-auto mt-16">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
            Các khóa học nổi bật
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Course Card */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                Nghệ thuật thuyết phục
              </h3>
              <p className="text-gray-600 mb-4">
                Học cách trình bày ý tưởng một cách thuyết phục và tạo ấn tượng
                mạnh mẽ.
              </p>
            </div>
            {/* Another Course Card */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                Kỹ năng phản biện
              </h3>
              <p className="text-gray-600 mb-4">
                Rèn luyện kỹ năng phân tích, tranh luận và bảo vệ quan điểm của
                bạn.
              </p>
            </div>
            {/* Another Course Card */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                Nói trước công chúng
              </h3>
              <p className="text-gray-600 mb-4">
                Làm chủ sân khấu và tự tin trình bày trước đám đông.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
