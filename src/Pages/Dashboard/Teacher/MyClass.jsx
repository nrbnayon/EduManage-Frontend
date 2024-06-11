import { useQuery } from "@tanstack/react-query";
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
import Swal from "sweetalert2";
import { toast } from "react-toastify";

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
    refetch,
    error,
  } = useQuery({
    queryKey: ["myAllClass"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/teachers-all-course/${user.email}`);
      return res.data;
    },
  });

  const handleSubmit = async (data) => {
    console.log("first", data);
    try {
      await axiosSecure.patch(`/update-course/${selectedCourse._id}`, data);
      refetch();
      Swal.fire("Success", "Course Successfully Updated", "success");
      setIsModalOpen(false);
    } catch (error) {
      Swal.fire("Error", "Failed to update course", "error");
    }
  };

  const handleUpdate = (course) => {
    setSelectedCourse({
      ...course,
      price: Number(course.price),
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });
    if (result.isConfirmed) {
      try {
        const res = await axiosSecure.delete(`/delete-course/${id}`);
        if (res.data.deletedCount > 0) {
          await refetch();
          Swal.fire({
            title: "Deleted!",
            text: "Your course has been deleted.",
            icon: "success",
          });
        } else {
          toast.warn("Course was not deleted.");
        }
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: "There was an issue deleting the course.",
          icon: "error",
        });
      }
    }
  };

  if (!teacher || !user) {
    return <p>You must be a teacher to view this page.</p>;
  }

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="p-2 md:p-6 w-full">
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
                  onClick={() =>
                    navigate(`/dashboard/my-class-details/${course._id}`)
                  }
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
        <p className="min-h-screen flex justify-center items-center">
          No courses found.
        </p>
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
