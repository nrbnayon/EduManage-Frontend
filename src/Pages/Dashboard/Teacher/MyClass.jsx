import { useQuery, useMutation } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useTeacher from "../../../hooks/useTeacher";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import {
  FaEdit,
  FaTrashAlt,
  FaInfoCircle,
  FaDollarSign,
  FaEnvelope,
  FaFileAlt,
  FaUser,
} from "react-icons/fa";
import { useState } from "react";
import UpdateClassModal from "./UpdateClassModal"; // import the modal component
import { useNavigate } from "react-router-dom";

const MyClass = () => {
  const { teacher } = useTeacher();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    data: myAllClass = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["myAllClass"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/teachers-all-course/${user.email}`);
      return res.data;
    },
  });

  const updateMutation = useMutation((updatedCourse) =>
    axiosSecure.patch(`/courses/${updatedCourse._id}`, updatedCourse)
  );

  const deleteMutation = useMutation((courseId) =>
    axiosSecure.delete(`/courses/${courseId}`)
  );

  const handleUpdate = (course) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
  };

  const handleDelete = (courseId) => {
    if (window.confirm("Are you sure you want to delete this class?")) {
      // deleteMutation.mutate(courseId);
      console.log("delete success", courseId);
    }
  };

  const handleSubmit = (data) => {
    // updateMutation.mutate({ ...selectedCourse, ...data });
    console.log(data);
  };

  if (!teacher || !user) {
    return <p>You must be a teacher to view this page.</p>;
  }

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="p-4 md:p-6 w-full">
      <h2 className="text-xl md:text-2xl font-bold mb-4 text-center">
        My Classes
      </h2>
      {myAllClass.length > 0 ? (
        <div className="w-full gap-4">
          {myAllClass.map((course) => (
            <div
              key={course._id}
              className="bg-white rounded-lg shadow-lg p-4 transform hover:scale-105 transition-transform duration-300"
            >
              <div className="w-full h-48 md:h-64 mb-4">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full rounded-t-lg"
                />
              </div>
              <h3 className="text-lg md:text-xl font-semibold mb-2">
                {course.title}
              </h3>
              <div className="flex flex-wrap justify-around">
                <p className="text-gray-700 mb-2 flex items-center w-full md:w-auto">
                  <FaUser className="mr-2" />{" "}
                  <span className="font-bold">Name:</span> {user.displayName}
                </p>
                <p className="text-gray-700 mb-2 flex items-center w-full md:w-auto">
                  <FaEnvelope className="mr-2" />{" "}
                  <span className="font-bold">Email:</span> {user.email}
                </p>
                <p className="text-gray-700 mb-2 flex items-center w-full md:w-auto">
                  <FaDollarSign className="mr-2" />{" "}
                  <span className="font-bold">Price:</span> {course.price}
                </p>
              </div>
              <div className="flex flex-col md:flex-row justify-evenly">
                <p className="w-full md:w-10/12 mx-auto flex text-gray-700 mb-2">
                  <FaFileAlt className="mr-2" />
                  <span className="font-bold"></span> {course.shortDescription}
                </p>
                <p className="text-gray-700 mb-4 flex items-center">
                  <FaInfoCircle className="mr-2" />{" "}
                  <span className="font-bold">Status:</span> {course.status}
                </p>
              </div>
              <div className="flex flex-col md:flex-row justify-between space-y-2 md:space-y-0 gap-2">
                <button
                  className={`flex items-center justify-center w-full py-2 px-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-lg shadow-md ${
                    course.status === "pending"
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:from-blue-600 hover:to-purple-600 transition duration-300"
                  }`}
                  onClick={() => navigate(`/dashboard/my-class/${course._id}`)}
                  disabled={course.status === "pending"}
                >
                  <FaInfoCircle className="mr-2" /> See Details
                </button>
                <button
                  className={`flex items-center justify-center w-full py-2 px-4 bg-gradient-to-r from-green-500 to-teal-500 text-white font-semibold rounded-lg shadow-md hover:from-green-600 hover:to-teal-600 transition duration-300`}
                  onClick={() => handleUpdate(course)}
                >
                  <FaEdit className="mr-2" /> Update
                </button>
                <button
                  className="flex items-center justify-center w-full py-2 px-4 bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold rounded-lg shadow-md hover:from-red-600 hover:to-pink-600 transition duration-300"
                  onClick={() => handleDelete(course._id)}
                >
                  <FaTrashAlt className="mr-2" /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No courses found.</p>
      )}
      <UpdateClassModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        initialData={selectedCourse}
      />
    </div>
  );
};

export default MyClass;
