import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FaUsers, FaChalkboardTeacher, FaUserGraduate } from "react-icons/fa";
import Stats from "../../../assets/1.gif";
import LoaderSpinner from "../../Shared/LoaderSpinner/LoaderSpinner";

const fetchStats = async () => {
  try {
    const { data } = await axios.get("http://localhost:8000/state");
    const stats = data[0];
    return {
      totalUsers: stats.totalUsers || 0,
      totalCourses: stats.totalCourses || 0,
      totalEnrollments: stats.totalEnrollments || 0,
    };
  } catch (error) {
    console.error("Error fetching stats:", error);
    throw new Error("Failed to fetch stats");
  }
};

const StatsSection = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["stats"],
    queryFn: fetchStats,
  });

  if (isLoading) return <LoaderSpinner />;
  if (error) return <div>Error loading stats</div>;

  const { totalUsers, totalCourses, totalEnrollments } = data;

  return (
    <div className="bg-gray-100 text-black py-16 flex flex-col md:flex-row justify-between items-center">
      <div className="flex flex-col gap-6 w-full md:w-1/2 px-4">
        <div className="bg-white p-6 rounded-lg shadow-lg flex items-center">
          <FaUsers className="text-3xl text-blue-500 mr-4" />
          <div>
            <h3 className="text-2xl font-bold">Total Users</h3>
            <p className="text-xl">{totalUsers}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg flex items-center">
          <FaChalkboardTeacher className="text-3xl text-green-500 mr-4" />
          <div>
            <h3 className="text-2xl font-bold">Total Classes</h3>
            <p className="text-xl">{totalCourses}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg flex items-center">
          <FaUserGraduate className="text-3xl text-orange-500 mr-4" />
          <div>
            <h3 className="text-2xl font-bold">Total Enrollments</h3>
            <p className="text-xl">{totalEnrollments}</p>
          </div>
        </div>
      </div>
      <div className="w-full md:w-1/2 mt-8 md:mt-0 flex justify-center">
        <img
          src={Stats}
          alt="Stats"
          className="w-full max-w-md rounded-lg shadow-lg"
        />
      </div>
    </div>
  );
};

export default StatsSection;
