import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaDollarSign, FaUser, FaUsers } from "react-icons/fa";
import { Typewriter } from "react-simple-typewriter";
import useGetAllCourse from "../../hooks/useGetAllCourse";
import LoaderSpinner from "../Shared/LoaderSpinner/LoaderSpinner";

const AllCourses = () => {
  const { courses, isLoading, error } = useGetAllCourse();

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  if (isLoading) return <LoaderSpinner />;
  if (error) return <div>Error loading courses</div>;

  return (
    <div className="my-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {courses.map((course) => (
          <div
            key={course._id}
            className="relative rounded overflow-hidden shadow-lg border "
            data-aos="fade-up"
          >
            <img
              className="w-full h-64 object-cover"
              src={course.image}
              alt={course.title}
              data-aos="zoom-in"
            />
            <div className="px-2 py-4" data-aos="fade-right">
              <div className="font-bold text-xl mb-2 font-cinzel">
                {course.title}
              </div>
              <p className="text-gray-700 text-base font-raleway">
                {course.shortDescription.slice(0, 60)}...
              </p>
              <div className="flex items-center mt-2">
                <FaUser className="mr-2" />
                <span className="text-gray-600">
                  Learn With: <span className="font-bold">{course.name}</span>
                </span>
              </div>
              <div className="flex justify-between">
                <div className="flex items-center mt-2">
                  <FaDollarSign className="mr-2" />
                  <span className="text-gray-600">${course.price}</span>
                </div>
                <div className="flex items-center mt-2">
                  <FaUsers className="mr-2" />
                  <span className="text-gray-600">
                    Total Enrollments: {course.totalEnrollment}
                  </span>
                </div>
              </div>
              <div className="flex items-center mt-2">
                <FaMapMarkerAlt className="mr-2" />
                <Typewriter
                  words={[`${course.title}`, "Enroll", "Explore"]}
                  loop={true}
                  cursor
                  cursorStyle="_"
                  typeSpeed={100}
                  deleteSpeed={50}
                  delaySpeed={2000}
                />
              </div>
            </div>
            <button className="btn w-full">
              <Link
                to={`/class/${course._id}`}
                className="btn w-full bg-blue-500 hover:bg-blue-700 text-white font-bold rounded focus:outline-none focus:shadow-outline"
              >
                Enroll Now
              </Link>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllCourses;
