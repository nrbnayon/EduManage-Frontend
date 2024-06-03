import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaDollarSign, FaUser, FaUsers } from "react-icons/fa";
import { Typewriter } from "react-simple-typewriter";
import useGetAllCourse from "../../hooks/useGetAllCourse";

const AllCourses = () => {
  const { courses, isLoading, refetch, error } = useGetAllCourse();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading courses</div>;

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 ">
        {courses.map((course) => (
          <div
            key={course._id}
            className="relative rounded overflow-hidden shadow-lg border hover:border-secondary"
          >
            <img
              className="w-full h-64 object-cover"
              src={course.image}
              alt={course.title}
            />
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">{course.title}</div>
              <p className="text-gray-700 text-base">
                {course.shortDescription}
              </p>
              <div className="flex items-center mt-2">
                <FaUser className="mr-2 text-gray-500" />
                <span className="text-gray-600">{course.name}</span>
              </div>
              <div className="flex items-center mt-2">
                <FaDollarSign className="mr-2 text-gray-500" />
                <span className="text-gray-600">${course.price}</span>
              </div>
              <div className="flex items-center mt-2">
                <FaUsers className="mr-2 text-gray-500" />
                <span className="text-gray-600">
                  Total Enrollments: {course.totalEnrollment}
                </span>
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

            <Link
              to={`/class/${course._id}`}
              className="absolute bottom-4 right-4 inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Enroll
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllCourses;
