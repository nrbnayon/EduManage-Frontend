import { useQuery } from "@tanstack/react-query";
import { FaCheck, FaTimes } from "react-icons/fa";
import { FiEye } from "react-icons/fi";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import { Pagination, Stack } from "@mui/material";
import { useState } from "react";

const AllRequestCourse = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageLoading, setPageLoading] = useState(false);

  const itemPerPage = 10;
  const {
    data: pendingCourses = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["pendingCourses"],
    queryFn: async () => {
      const res = await axiosSecure.get("/all-pending-courses");
      return res.data;
    },
  });

  const handleApprove = async (courseId) => {
    try {
      const res = await axiosSecure.patch(
        `/approve-pending-course/${courseId}`
      );
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire("Success", "Course approved successfully", "success");
      }
    } catch (error) {
      Swal.fire("Error", "Failed to approve course", "error");
    }
  };

  const handleReject = async (courseId) => {
    try {
      const res = await axiosSecure.patch(`/reject-pending-course/${courseId}`);
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire("Success", "Course rejected successfully", "success");
      }
    } catch (error) {
      Swal.fire("Error", "Failed to reject course", "error");
    }
  };
  const pendingCoursesCounts = pendingCourses.filter(
    (corse) => corse.status === "pending"
  );
  const pendingCoursesCount = pendingCoursesCounts.length;

  const handlePageChange = (event, value) => {
    setPageLoading(true);
    setCurrentPage(value);
    setTimeout(() => {
      setPageLoading(false);
    }, 500);
  };
  const numberOfPages = Math.ceil(pendingCourses.length / itemPerPage);
  const displayedRequest = pendingCourses.slice(
    (currentPage - 1) * itemPerPage,
    currentPage * itemPerPage
  );

  if (isLoading || pageLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="w-full p-6 bg-gray-100 min-h-screen font-cinzel">
      <Helmet>
        <title>EduManage | Pending Request Courses</title>
      </Helmet>
      <div className="flex justify-center items-center bg-white p-4 rounded-lg shadow-md mb-6">
        <h2 className="text-2xl text-black font-bold">
          Pending Courses ({pendingCoursesCount})
        </h2>
      </div>
      {pendingCourses.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Image</th>
                <th className="py-3 px-6 text-left">Email</th>
                <th className="py-3 px-6 text-left">Title</th>
                <th className="py-3 px-6 text-left">Description</th>
                <th className="py-3 px-6 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {displayedRequest.map((course) => (
                <tr
                  key={course._id}
                  className="border-b border-gray-200 hover:bg-gray-100"
                >
                  <td className="py-3 px-6 text-left border">
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img src={course.image} alt={course.title} />
                        </div>
                      </div>
                      <div>
                        <div className="text-xs">Teacher:</div>
                        <div className="text-xs">{course.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-6 text-left whitespace-nowrap border">
                    <p>{course.teacherEmail}</p>
                  </td>
                  <td className="py-3 px-6 text-left whitespace-nowrap">
                    <div className="font-bold">{course.title}</div>
                  </td>
                  <td className="py-3 px-6 text-left whitespace-nowrap border">
                    <div className="font-bold">
                      {course.shortDescription.slice(0, 40)}...
                    </div>
                  </td>
                  <td className="py-3 px-6 text-center whitespace-nowrap border">
                    {course.status === "pending" && (
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => handleApprove(course._id)}
                          className="btn btn-sm btn-success flex items-center gap-1"
                        >
                          <FaCheck className="w-4 h-4" /> Approve
                        </button>
                        <button
                          onClick={() => handleReject(course._id)}
                          className="btn btn-sm btn-warning flex items-center gap-1"
                        >
                          <FaTimes className="w-4 h-4" /> Reject
                        </button>
                        <button
                          className="btn btn-sm btn-info flex items-center  gap-1"
                          disabled={course.status !== "approved"}
                        >
                          <FiEye className="w-4 h-4" /> See Progress
                        </button>
                      </div>
                    )}
                    {course.status === "approved" && (
                      <div>
                        <p className="text-green-500 font-semibold">Approved</p>
                        <button
                          onClick={() =>
                            navigate(`/dashboard/class/${course._id}`)
                          }
                          className="btn btn-md btn-info"
                          disabled={course.status !== "approved"}
                        >
                          <FiEye className="w-4 h-4" /> See Progress
                        </button>
                      </div>
                    )}
                    {course.status === "rejected" && (
                      <span className="text-red-500 font-semibold">
                        Rejected
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-center bg-gray-100 rounded-md p-4 items-center text-center mt-6">
            <Stack spacing={2}>
              <Pagination
                count={numberOfPages}
                page={currentPage}
                onChange={handlePageChange}
                variant="outlined"
                shape="rounded"
              />
            </Stack>
          </div>
        </div>
      ) : (
        <p>No pending courses found.</p>
      )}
    </div>
  );
};

export default AllRequestCourse;
