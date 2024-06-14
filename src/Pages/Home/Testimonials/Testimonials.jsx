import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import "./styles.css";
import { Navigation, Autoplay } from "swiper/modules";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import SectionTitle from "../../Shared/BgCard/SectionTitle";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const Testimonials = () => {
  const header = {
    title: "---What Our Users Say---",
    desc: "Testimonials",
  };

  const axiosPublic = useAxiosPublic();
  const { data: reviews = [] } = useQuery({
    queryKey: ["feedbacks"],
    queryFn: async () => {
      const res = await axiosPublic.get("/feedbacks");
      return res.data;
    },
  });

  return (
    <div className="bg-gray-100 my-8">
      <SectionTitle header={header} />
      <div className="py-4">
        <Swiper
          navigation={true}
          modules={[Navigation, Autoplay]}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          loop={true}
          className="mySwiper "
        >
          {reviews.map((review) => (
            <SwiperSlide key={review._id}>
              <div className="flex flex-col text-black justify-center items-center bg-white p-6 my-8 rounded-lg shadow-lg ">
                <div className="relative w-24 h-24 rounded-full overflow-hidden shadow-lg mb-4">
                  <img
                    src={review.image}
                    alt={review.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="mt-4 text-2xl text-orange-400 font-bold font-cinzel">
                  {review.name}
                </p>
                <div className="relative md:w-2/3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    fill="currentColor"
                    className="absolute top-0 left-0 w-8 h-8 dark:text-gray-300"
                  >
                    <path d="M232,246.857V16H16V416H54.4ZM48,48H200V233.143L48,377.905Z"></path>
                    <path d="M280,416h38.4L496,246.857V16H280ZM312,48H464V233.143L312,377.905Z"></path>
                  </svg>
                  <p className="text-center text-lg italic p-8">
                    {review.feedbackText}
                  </p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    className="absolute bottom-0 right-0 w-8 h-8 "
                  >
                    <path
                      fill="currentColor"
                      d="M280,185.143V416H496V16H457.6ZM464,384H312V198.857L464,54.1Z"
                    ></path>
                    <path
                      fill="currentColor"
                      d="M232,16H193.6L16,185.143V416H232ZM200,384H48V198.857L200,54.1Z"
                    ></path>
                  </svg>
                </div>

                <div className="md:flex justify-around gap-2 ">
                  <p className="mt-2 ">{review.title}</p>
                  <Rating
                    style={{ maxWidth: 100 }}
                    value={review.rating}
                    readOnly
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Testimonials;
