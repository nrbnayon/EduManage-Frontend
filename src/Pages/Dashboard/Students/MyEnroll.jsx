import { FaBookReader, FaUser } from "react-icons/fa";
import useEnrollInfo from "../../../hooks/useEnrollInfo";
import { Link } from "react-router-dom";

const MyEnroll = () => {
  const { enrollInfo, isLoading, error } = useEnrollInfo();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="m-4 grid grid-cols-1 md:grid-cols-2 gap-4">
      {enrollInfo.map((course) => (
        <div
          key={course._id}
          className="relative rounded overflow-hidden shadow-lg border "
          data-aos="fade-up"
        >
          <img
            className="w-full h-64"
            src={course.courseImg}
            alt={course.courseTitle}
            data-aos="zoom-in"
          />
          <div className="px-2 py-4" data-aos="fade-right">
            <div className="font-bold text-xl mb-2 font-cinzel">
              {course.courseTitle}
            </div>
            <p className="text-gray-700 text-base font-raleway">
              {course.courseDescription}...
            </p>
            <div className="flex items-center mt-2">
              <FaUser className="mr-2" />
              <span className="text-gray-600">
                Learn With:{" "}
                <span className="font-bold">{course.teacherName}</span>
              </span>
            </div>
          </div>
          <div className="font-cinzel flex justify-end">
            <Link
              to={`/courseDetails/${course._id}`}
              className="btn  text-white btn-success  font-semibold rounded hover:btn-info focus:outline-none focus:shadow-outline"
            >
              <FaBookReader />
              Continue
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyEnroll;
