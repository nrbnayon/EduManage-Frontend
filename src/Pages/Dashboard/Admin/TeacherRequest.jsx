import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { FaBan } from "react-icons/fa";
import { FaUsersGear } from "react-icons/fa6";

const TeacherRequest = () => {
  const axiosSecure = useAxiosSecure();
  const {
    data: requests = [],
    isLoading,
    refetch,
    error,
  } = useQuery({
    queryKey: ["teaching-requests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/teaching-request");
      return res.data;
    },
  });

  const handleMakeTeacher = async (request) => {
    try {
      const res = await axiosSecure.patch(
        `/users/teacher-request/${request._id}?email=${request.email}`
      );
      if (res.data.success) {
        const approveRes = await axiosSecure.post(
          `/users/teacher-approve/${request._id}`
        );
        if (approveRes.data.success) {
          refetch();
          Swal.fire({
            position: "top-end",
            title: `${request.name} is now a Teacher!`,
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          Swal.fire("Error!", approveRes.data.message, "error");
        }
      } else {
        Swal.fire("Error!", res.data.message, "error");
      }
    } catch (error) {
      Swal.fire("Error!", "Failed to make the user a teacher.", "error");
    }
  };

  const handleRejectRequest = async (id) => {
    try {
      const res = await axiosSecure.patch(`/users/teacher-reject/${id}`);
      refetch();
      Swal.fire({
        position: "top-end",
        title: "Request Rejected!",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      });
      console.log(res);
    } catch (error) {
      Swal.fire("Error!", "Failed to reject the request.", "error");
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading requests: {error.message}</p>;

  return (
    <div className="my-6 px-2 py-8 border rounded-lg shadow-lg bg-white">
      <h1 className="text-3xl font-bold mb-8 text-center">Teaching Requests</h1>
      {requests.length === 0 ? (
        <p>No requests found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead>
              <tr className="w-full bg-gray-100 border-b-2 border-gray-200">
                <th className="text-left py-3 px-4">Photo</th>
                <th className="text-left py-3 px-4">Name</th>
                <th className="text-left py-3 px-4">Email</th>
                <th className="text-left py-3 px-4">Title</th>
                <th className="text-left py-3 px-4">Category</th>
                <th className="text-left py-3 px-4">Experience</th>
                <th className="text-center py-3 px-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((request) => (
                <tr key={request._id} className="border-b">
                  <td className="py-3 px-4">
                    <img
                      src={request.image}
                      alt={request.name}
                      className="w-12 h-12 rounded-full"
                    />
                  </td>
                  <td className="py-3 text-xs px-4">{request.name}</td>
                  <td className="py-3 text-xs px-4">{request.email}</td>
                  <td className="py-3 text-xs px-4">{request.title}</td>
                  <td className="py-3 text-xs px-4">{request.category}</td>
                  <td className="py-3 text-xs px-4">{request.experience}</td>
                  <td className="py-3 px-4 flex justify-center mt-3 space-x-2">
                    {request.status === "pending" ? (
                      <>
                        <button
                          onClick={() => handleMakeTeacher(request)}
                          className="text-green-500 text-xs gap-1 flex items-center hover:text-green-700 transition duration-300"
                          title="Approve Request"
                        >
                          <FaUsersGear size={16} /> Approve
                        </button>
                        <button
                          onClick={() => handleRejectRequest(request._id)}
                          className="text-red-500 text-xs gap-1 flex items-center hover:text-red-700 transition duration-300"
                          title="Reject Request"
                        >
                          <FaBan size={16} /> Reject
                        </button>
                      </>
                    ) : request.status === "reject" ? (
                      <p className="text-red-500 text-xs">Rejected</p>
                    ) : (
                      <p className="text-green-500 text-xs">Approved</p>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TeacherRequest;
