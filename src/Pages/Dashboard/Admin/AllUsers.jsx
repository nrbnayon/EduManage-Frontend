import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { FaUsersGear } from "react-icons/fa6";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";
import { Pagination, Stack } from "@mui/material";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageLoading, setPageLoading] = useState(false);

  const itemPerPage = 10;

  const { data: users = [], refetch } = useQuery({
    queryKey: ["users", search],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?search=${search}`);
      return res.data;
    },
  });

  const handleMakeAdmin = (user) => {
    axiosSecure.patch(`/users/admin/${user._id}`).then((res) => {
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          position: "top-end",
          title: `${user.userName} is now an Admin!`,
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  const handlePageChange = (event, value) => {
    setPageLoading(true);
    setCurrentPage(value);
    setTimeout(() => {
      setPageLoading(false);
    }, 500);
  };

  const numberOfPages = Math.ceil(users.length / itemPerPage);
  const displayedUsers = users.slice(
    (currentPage - 1) * itemPerPage,
    currentPage * itemPerPage
  );

  if (pageLoading) return <p>Loading...</p>;

  return (
    <div className="w-full p-6 text-black bg-gray-100 min-h-screen font-cinzel">
      <Helmet>
        <title>EduManage | All Users</title>
      </Helmet>
      <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md mb-6">
        <h3 className="text-2xl font-bold">All Users</h3>
        <input
          type="text"
          placeholder="Search here by name/email"
          className="input border bg-gray-200 input-bordered w-1/3"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">SI</th>
              <th className="py-3 px-6 text-left">Image</th>
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-center">Email</th>
              <th className="py-3 px-6 text-center">Make Admin</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {displayedUsers.map((user, i) => (
              <tr
                key={user._id}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  <p>{i + 1 + (currentPage - 1) * itemPerPage}</p>
                </td>
                <td className="py-3 px-6 text-left">
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={user.userProfileImg} alt={user.userName} />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">Role</div>
                      <div className="font-bold">{user.userRole}</div>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  <div className="font-bold">{user.userName}</div>
                </td>
                <td className="py-3 px-6 text-center whitespace-nowrap">
                  <div className="font-bold">{user.userEmail}</div>
                </td>
                <td className="py-3 px-6 text-center font-semibold">
                  {user.userRole === "admin" ? (
                    "Admin"
                  ) : (
                    <button
                      onClick={() => handleMakeAdmin(user)}
                      className="btn btn-ghost btn-md bg-base-300 bg-opacity-60 text-primary"
                      disabled={user.userRole === "admin"}
                    >
                      <FaUsersGear className="w-6 h-6" />
                    </button>
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
    </div>
  );
};

export default AllUsers;
