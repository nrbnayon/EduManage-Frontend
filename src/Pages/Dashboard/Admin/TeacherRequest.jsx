import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { FaBan } from "react-icons/fa";
import { FaUsersGear } from "react-icons/fa6";
import useTeacher from "../../../hooks/useTeacher";

const TeacherRequest = () => {
  const axiosSecure = useAxiosSecure();
  const { isTeacher } = useTeacher();
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
  const handleMakeTeacher = (request) => {
    axiosSecure
      .patch(`/users/teacher-request/${request._id}?email=${request.email}`)
      .then((res) => {
        console.log("Admin", res.data);
        if (res.data.modifiedCount > 0) {
          refetch();

          Swal.fire({
            position: "top-end",
            title: `${request.name} is now a Teacher!`,
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((error) => {
        Swal.fire("Error!", "Failed to make the user a teacher.", error);
      });
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading requests: {error.message}</p>;

  return (
    <div className="my-6 p-8 border rounded-lg shadow-lg bg-white">
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
                  <td className="py-3 px-4">{request.name}</td>
                  <td className="py-3 text-xs px-4">{request.email}</td>
                  <td className="py-3 text-xs px-4">{request.title}</td>
                  <td className="py-3 text-xs px-4">{request.category}</td>
                  <td className="py-3 text-xs px-4">{request.experience}</td>
                  <td className="py-3 px-4 flex justify-center space-x-2">
                    <button
                      onClick={() => handleMakeTeacher(request)}
                      className="text-green-500 hover:text-green-700 transition duration-300"
                      title="Approve Request"
                    >
                      <FaUsersGear size={20} />
                    </button>
                    <button
                      //   onClick={() => handleRejectRequest(request._id)}
                      className="text-red-500 hover:text-red-700 transition duration-300"
                      title="Reject Request"
                    >
                      <FaBan size={20} />
                    </button>
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
