import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./styles.css";
import {
  Autoplay,
  EffectCoverflow,
  Navigation,
  Pagination,
} from "swiper/modules";
import { Link } from "react-router-dom";
import useGetPopularCourses from "../../../hooks/useGetPopularCourses";
import LoaderSpinner from "../../Shared/LoaderSpinner/LoaderSpinner";
import SectionTitle from "../../Shared/BgCard/SectionTitle";

const PopularCourses = () => {
  const header = {
    title: "---Our---",
    desc: "Highest Students Enrollment Courses",
  };
  const { courses, isLoading, error } = useGetPopularCourses();

  if (isLoading) return <LoaderSpinner />;
  if (error) return <div>Error fetching popular courses</div>;

  return (
    <div className=" my-12 px-4 sm:px-6 lg:px-8">
      <SectionTitle header={header} />
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        navigation={true}
        modules={[EffectCoverflow, Autoplay, Pagination, Navigation]}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        className="mySwiper"
      >
        {courses.map((course) => (
          <SwiperSlide key={course._id} className="swiper-slides p-4">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="relative h-72 w-full">
                <img
                  src={course.image}
                  className="h-full w-full object-cover"
                  alt={course.title}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {course.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {course.shortDescription.slice(0, 70)}...
                </p>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-bold text-indigo-600">
                    {course.price} USD
                  </span>
                  <span className="text-gray-600">
                    Total Enrolled: {course.totalEnrollment}
                  </span>
                </div>
                <Link to={`/courseDetails/${course._id}`}>
                  <button className="w-full py-2 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-300">
                    Enroll Now
                  </button>
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default PopularCourses;
