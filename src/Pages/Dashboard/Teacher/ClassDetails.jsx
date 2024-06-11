import { useForm } from "react-hook-form";
import { FaPlus, FaTimes } from "react-icons/fa";
import { useState } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

// Dashboard Component
const TeacherDashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [totalEnrollment, setTotalEnrollment] = useState(0);
  const [totalAssignments, setTotalAssignments] = useState(0);
  const [perDaySubmissions, setPerDaySubmissions] = useState(0);
  const axiosSecure = useAxiosSecure();

  const { id } = useParams();

  console.log(id);

  const {
    data: singleClass = [],
    isLoading,
    refetch,
    error,
  } = useQuery({
    queryKey: ["singleClass"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/teachers-single-course/${id}`);
      return res.data;
    },
  });
  console.log(singleClass);

  const handleCreateAssignment = (data) => {
    // Assume saving data to the database here
    console.log("Assignment Data:", data);

    // Update total assignments count
    setTotalAssignments(totalAssignments + 1);
    setIsModalOpen(false);
  };

  return (
    <div className="p-4 md:p-6 w-full">
      <h2 className="text-xl md:text-2xl font-bold mb-4 text-center">
        Teacher Dashboard
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-lg p-4">
          <h3 className="text-lg font-semibold mb-2">Total Enrollment</h3>
          <p className="text-gray-700 text-2xl">
            {singleClass?.totalEnrollment}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-4">
          <h3 className="text-lg font-semibold mb-2">Total Assignments</h3>
          <p className="text-gray-700 text-2xl">{totalAssignments}</p>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-4">
          <h3 className="text-lg font-semibold mb-2">Per Day Submissions</h3>
          <p className="text-gray-700 text-2xl">{perDaySubmissions}</p>
        </div>
      </div>
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300"
        >
          <FaPlus className="mr-2" /> Create
        </button>
      </div>
      <CreateAssignmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateAssignment}
      />
    </div>
  );
};

export default TeacherDashboard;

// Modal Component for Creating Assignment
const CreateAssignmentModal = ({ isOpen, onClose, onSubmit }) => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmitForm = (data) => {
    onSubmit(data);
    reset();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">
            Create Assignment
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800"
          >
            <FaTimes />
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmitForm)}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">
              Assignment Title
            </label>
            <input
              {...register("title", { required: true })}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">
              Assignment Deadline
            </label>
            <input
              {...register("deadline", { required: true })}
              type="date"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">
              Assignment Description
            </label>
            <textarea
              {...register("description", { required: true })}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Add Assignment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

CreateAssignmentModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
