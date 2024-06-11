import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AllRequestCourse = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: pendingCourses = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["pendingCourses"],
    queryFn: async () => {
      const res = await axiosSecure.get("/all-pending-courses");
      return res.data;
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Pending Courses</h2>
      {pendingCourses.length > 0 ? (
        <ul>
          {pendingCourses.map((course) => (
            <li
              key={course._id}
              className="mb-2 p-4 border border-gray-200 rounded"
            >
              <h3 className="text-xl font-semibold">{course.title}</h3>
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-auto mb-2"
              />
              <p>{course.description}</p>
              <p>Status: {course.status}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No pending courses found.</p>
      )}
    </div>
  );
};

export default AllRequestCourse;
