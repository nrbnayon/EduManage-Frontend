import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useParams } from "react-router-dom";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import Modal from "react-modal";
import ReactStars from "react-rating-stars-component";
import { BsFillSendFill } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";

Modal.setAppElement("#root");

const MyClassDetails = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [err, setError] = useState({ description: "", rating: "" });
  const [description, setDescription] = useState("");

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
  });

  const { data: assignments = [], refetch } = useQuery({
    queryKey: ["assignments", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/all-assignment/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  const handleSubmitAssignment = async (assignmentId) => {
    try {
      console.log("assignmentId", assignmentId);
      const res = await axiosSecure.patch(`/submit-assignment/${assignmentId}`);
      console.log("Response Data:", res.data);

      if (res.status === 200) {
        Swal.fire("Success", "Assignment submitted successfully", "success");
        // Refetch or update the data if needed
        refetch();
      } else {
        Swal.fire(
          "Error",
          res.data.message || "Failed to submit assignment",
          "error"
        );
      }
    } catch (error) {
      console.error("Submit Assignment Error:", error);
      Swal.fire(
        "Error",
        error.response?.data?.message || "Failed to submit assignment",
        "error"
      );
    }
  };

  const handleOpenModal = () => {
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
    setDescription("");
    setRating(0);
    setError({ description: "", rating: "" });
  };

  const ratingChanged = (newRating) => {
    setRating(newRating);
    setError((prevError) => ({ ...prevError, rating: "" }));
  };

  const handleTERSubmit = async (e) => {
    e.preventDefault();
    let valid = true;

    if (!description) {
      setError((prevError) => ({
        ...prevError,
        description: "Description is required.",
      }));
      valid = false;
    } else {
      setError((prevError) => ({ ...prevError, description: "" }));
    }

    if (rating === 0) {
      setError((prevError) => ({
        ...prevError,
        rating: "Rating is required.",
      }));
      valid = false;
    } else {
      setError((prevError) => ({ ...prevError, rating: "" }));
    }

    if (valid) {
      try {
        await axiosSecure.post(`/feedbacks`, {
          feedbackText: description,
          name: user?.displayName,
          image: user?.photoURL,
          title: course.title,
          rating,
        });
        Swal.fire("Success", "Your feedback has been submitted.", "success");
        handleCloseModal();
      } catch (error) {
        Swal.fire("Error", "Failed to create feedback", "error");
      }
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <div className="flex justify-between flex-col-reverse md:flex-row items-center mb-4">
        <h1 className="text-2xl font-bold">{course.title}</h1>
        <button className="btn btn-primary" onClick={handleOpenModal}>
          Create Teaching Evaluation Report (TER)
        </button>
      </div>

      <table className="min-w-full bg-white border overflow-y-auto">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 border">Title</th>
            <th className="py-2 px-4 border">Description</th>
            <th className="py-2 px-4 border">Deadline</th>
            <th className="py-2 px-4 border">Submit</th>
          </tr>
        </thead>
        <tbody>
          {assignments.map((assignment) => (
            <tr key={assignment._id} className="text-center">
              <td className="py-2 px-4 border">{assignment.assignmentTitle}</td>
              <td className="py-2 px-4 border">{assignment.description}</td>
              <td className="py-2 px-4 border">{assignment.deadline}</td>
              <td className="py-2 px-4 border">
                {new Date(assignment.deadline) >= new Date() ? (
                  <button
                    className="btn btn-success"
                    onClick={() => handleSubmitAssignment(assignment._id)}
                  >
                    Submit
                  </button>
                ) : (
                  <span className="text-red-500">Deadline Passed</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={handleCloseModal}
        contentLabel="Teaching Evaluation Report"
        className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto mt-20"
        overlayClassName="overlay bg-black bg-opacity-50 fixed inset-0"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">
            Teaching Evaluation Report (TER)
          </h2>
          <button
            onClick={handleCloseModal}
            className="text-gray-700 hover:text-gray-900"
          >
            <AiOutlineClose size={24} />
          </button>
        </div>
        <form onSubmit={handleTERSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Description:
            </label>
            <textarea
              className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            {err.description && (
              <p className="text-red-500 text-sm mt-1">{err.description}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Rating:
            </label>
            <ReactStars
              count={5}
              onChange={ratingChanged}
              size={24}
              isHalf={true}
              emptyIcon={<FaRegStar />}
              halfIcon={<FaStarHalfAlt />}
              filledIcon={<FaStar />}
              activeColor="#ffd700"
            />
            {err.rating && (
              <p className="text-red-500 text-sm mt-1">{err.rating}</p>
            )}
          </div>
          <button
            type="submit"
            className="btn btn-success flex items-center gap-2"
          >
            <BsFillSendFill size={16} />
            Send
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default MyClassDetails;
