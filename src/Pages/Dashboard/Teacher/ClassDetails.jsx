import { useForm } from "react-hook-form";
import {
  FaChartLine,
  FaClipboardList,
  FaPlus,
  FaTimes,
  FaUsers,
} from "react-icons/fa";
import { useState } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

// Dashboard Component
const TeacherDashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const axiosSecure = useAxiosSecure();

  const { id } = useParams();

  const { data: singleClass = [] } = useQuery({
    queryKey: ["singleClass"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/teachers-single-course/${id}`);
      return res.data;
    },
  });
  const { data: totalAssignments = [], refetch } = useQuery({
    queryKey: ["totalAssignments"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/all-assignment/${id}`);
      return res.data;
    },
  });
  const handleCreateAssignment = async (data) => {
    // eslint-disable-next-line no-unused-vars
    const { _id, ...singleClassInfo } = singleClass;
    const currentDate = new Date().toISOString().split("T")[0];
    const assignmentData = {
      courseId: singleClass._id,
      ...singleClassInfo,
      ...data,
      perDaySubmissions: 0,
      submissionDate: currentDate,
    };
    try {
      await axiosSecure.post("/create-assignment", assignmentData);
      refetch();
      Swal.fire("Success", "New Assignment Created Successfully", "success");
      setIsModalOpen(false);
    } catch (error) {
      Swal.fire("Error", "Failed to create assignment", "error");
    }
  };

  const { data: submissions = [0] } = useQuery({
    queryKey: ["submissions"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/per-day-submit/${id}`);
      return res.data;
    },
  });
  return (
    <div className="p-4 w-full font-raleway">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
        Teacher Dashboard
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-8">
        <div className="bg-gradient-to-r from-green-400 to-blue-500 rounded-lg shadow-lg p-6">
          <h3 className="text-lg  font-semibold mb-2 text-white">
            Total Enrollment
          </h3>
          <p className="text-2xl text-center md:text-3xl text-white">
            {singleClass?.totalEnrollment}
          </p>
          <FaUsers className="text-4xl text-white mt-4 mx-auto" />
        </div>
        <div className="bg-gradient-to-r from-purple-400 to-deep-purple-300 rounded-lg shadow-lg p-6">
          <h3 className="text-lg  font-semibold mb-2 text-white">
            Total Assignments
          </h3>
          <p className="text-2xl text-center md:text-3xl text-white">
            {totalAssignments.length}
          </p>
          <FaClipboardList className="text-4xl text-white mt-4 mx-auto" />
        </div>
        <div className="bg-gradient-to-r from-yellow-400 to-blue-gray-500 rounded-lg shadow-lg p-6">
          <h3 className="text-lg  font-semibold mb-2 text-white">
            PerDay Submissions
          </h3>
          <p className="text-2xl md:text-3xl text-center text-white">
            {submissions?.assignments?.perDaySubmissions}
          </p>
          <FaChartLine className="text-4xl text-white mt-4 mx-auto" />
        </div>
      </div>
      <div className="flex justify-end mb-8">
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center px-6 py-3 bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-lg hover:bg-green-600 transition duration-300"
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
              {...register("assignmentTitle", { required: true })}
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
