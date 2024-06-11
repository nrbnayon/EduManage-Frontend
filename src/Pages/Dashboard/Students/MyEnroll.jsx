import { FaBookReader, FaUser } from "react-icons/fa";
import useEnrollInfo from "../../../hooks/useEnrollInfo";
import { Link } from "react-router-dom";
import "aos/dist/aos.css";

const MyEnroll = () => {
  const { enrollInfo, isLoading, error } = useEnrollInfo();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const img =
    "https://media.licdn.com/dms/image/D4D12AQEYtfVRssTEPg/article-cover_image-shrink_720_1280/0/1653658036070?e=2147483647&v=beta&t=R8WZgD7z_MPggCAJPsjkNp9qTuJ7QKD5jWUoV7El5x4";
  const title = "My Enroll Courses";
  const desc = "";

  return (
    <div>
      <div className="relative w-full h-[200px] overflow-hidden rounded-lg shadow-lg">
        <img src={img} alt="img" className="w-full h-full " />
        <div className="bg-opacity-50 absolute md:w-[75%] md:h-1/2 my-6 md:my-auto rounded-2xl mx-auto inset-0 flex flex-col justify-center items-center p-6 text-center text-white font-cinzel animated-gradient">
          <h3 className="text-3xl font-bold">{title}</h3>
          <p className="text-xl font-raleway mt-2 md:w-2/3 mx-auto">{desc}</p>
        </div>
      </div>
      <div className="m-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        {enrollInfo.map((course) => (
          <div
            key={course._id}
            className="relative rounded overflow-hidden shadow-lg border flex flex-col justify-between"
          >
            <img
              className="w-full h-64"
              src={course.courseImg}
              alt={course.courseTitle}
            />
            <div className="px-2 py-4 flex-grow">
              <div className="font-bold text-xl mb-2 font-cinzel">
                {course.courseTitle}
              </div>
              <p className="text-gray-700 text-base font-raleway mb-4">
                {course.courseDescription.slice(0, 100)}...
              </p>
              <div className="flex items-center mt-2">
                <FaUser className="mr-2" />
                <span className="text-gray-600">
                  Learn With:{" "}
                  <span className="font-bold">{course.teacherName}</span>
                </span>
              </div>
            </div>
            <div className="font-cinzel flex justify-end p-2">
              <Link
                to={`/dashboard/myEnroll-class/${course.courseId}`}
                className="btn text-white btn-success font-semibold rounded hover:btn-info focus:outline-none focus:shadow-outline"
              >
                <FaBookReader />
                Continue
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyEnroll;
