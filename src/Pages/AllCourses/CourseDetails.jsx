import { Link, useParams } from "react-router-dom";
import { FaDollarSign, FaUser, FaUsers } from "react-icons/fa";
import LoaderSpinner from "../Shared/LoaderSpinner/LoaderSpinner";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./../../hooks/useAxiosSecure";
import { Typewriter } from "react-simple-typewriter";
import { IoWalletSharp } from "react-icons/io5";
import { Helmet } from "react-helmet-async";

const CourseDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const {
    data: course = {},
    isLoading,
    error,
  } = useQuery({
    queryKey: ["course", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/courseDetails/${id}`);
      return res.data;
    },
    enabled: !!id,
    dependencies: [id],
  });

  const { _id, image, title, shortDescription, name, price, totalEnrollment } =
    course;
  if (isLoading || !course) return <LoaderSpinner />;
  if (error) return <div>Error loading course details: {error.message}</div>;

  return (
    <div className="rounded container mx-auto  p-4 shadow-lg border">
      <Helmet>
        <title>{`EduManage | ${title}`}</title>
      </Helmet>
      <div className="h-[400px]">
        <img className="w-full h-full rounded-md" src={image} alt={title} />
      </div>
      <div className="px-2 py-4">
        <div className="font-bold text-xl mb-2 font-cinzel">
          <Typewriter
            loop
            cursor
            cursorStyle="_"
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1000}
            words={[
              `${title} 📘`,
              "Start Build Your Technical Skills From Today",
              "Enrollment already Started",
            ]}
          />
        </div>
        <p className="text-gray-900 text-base font-raleway">
          {shortDescription}
        </p>
        <div className="flex items-center justify-center mt-2">
          <FaUser className="mr-2" />
          <span className="">
            Teacher:{" "}
            <span className="text-black font-cinzel font-bold">{name}</span>
          </span>
        </div>
        <div className="flex justify-between">
          <div className="flex items-center mt-2">
            Course Fee: <FaDollarSign />
            <span className="text-black font-cinzel font-bold">{price}</span>
          </div>
          <div className="flex items-center mt-2">
            <FaUsers className="mr-2" />
            <span className="text-black font-cinzel font-bold">
              Total Enrollments: {totalEnrollment}
            </span>
          </div>
        </div>
        <div className="mt-4">
          <Link
            to={`/payment/${_id}`}
            className="btn w-full btn-success text-white font-semibold rounded hover:btn-info focus:outline-none focus:shadow-outline"
          >
            <IoWalletSharp />
            Pay Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
