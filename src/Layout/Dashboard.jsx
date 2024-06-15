import { Link, NavLink, Outlet } from "react-router-dom";
import {
  FaList,
  FaUsers,
  FaChalkboardTeacher,
  FaHome,
  FaUser,
  FaUserGraduate,
} from "react-icons/fa";
import { SiGoogleclassroom } from "react-icons/si";

import { GiProgression } from "react-icons/gi";
import { MdContentPasteSearch } from "react-icons/md";
import { BiSolidPhoneCall } from "react-icons/bi";
import { ToastContainer } from "react-toastify";
import useAdmin from "./../hooks/useAdmin";
import useTeacher from "../hooks/useTeacher";
import Logo from "/logo.png";
import { Helmet } from "react-helmet-async";

const Dashboard = () => {
  const { isAdmin } = useAdmin();
  const { teacher } = useTeacher();

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <Helmet>
        <title>{`EduManage | ${
          isAdmin
            ? "Admin Dashboard"
            : teacher
            ? "Teacher Dashboard"
            : "Student Dashboard"
        }`}</title>
      </Helmet>
      <div className="w-full md:w-64 bg-light-blue-400 font-cinzel font-semibold text-white md:sticky md:top-0">
        <div className="flex items-center p-4 gap-4 bg-white shadow-md rounded-lg">
          <img src={Logo} alt="Logo" className="w-16 h-16 rounded-md" />
          <p className="text-2xl font-semibold text-gray-800">
            Start Learning Today
          </p>
        </div>

        <ul className="menu space-y-3 p-4">
          {isAdmin && (
            <>
              <li>
                <NavLink
                  to="/dashboard/my-profile"
                  className="flex items-center space-x-2"
                >
                  <FaUser />
                  <span>Profile</span>
                </NavLink>
              </li>
              {/* <li>
                <NavLink
                  to="/dashboard/addCourse"
                  className="flex items-center space-x-2"
                >
                  <SiGoogleclassroom />
                  <span>Add Course</span>
                </NavLink>
              </li> */}
              <li>
                <NavLink
                  to="/dashboard/all-courses"
                  className="flex items-center space-x-2"
                >
                  <FaList />
                  <span>All Courses</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/teacher-request"
                  className="flex items-center space-x-2"
                >
                  <FaChalkboardTeacher />
                  <span>Teacher Request</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/all-users"
                  className="flex items-center space-x-2"
                >
                  <FaUsers />
                  <span>Users</span>
                </NavLink>
              </li>
            </>
          )}
          {teacher && (
            <>
              <li>
                <NavLink
                  to="/dashboard/my-profile"
                  className="flex items-center space-x-2"
                >
                  <FaUser />
                  <span>Profile</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/addCourse"
                  className="flex items-center space-x-2"
                >
                  <SiGoogleclassroom />
                  <span>Add Course</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/my-class"
                  className="flex items-center space-x-2"
                >
                  <FaList />
                  <span>My Class</span>
                </NavLink>
              </li>
            </>
          )}
          {!isAdmin && !teacher && (
            <>
              <li>
                <NavLink
                  to="/dashboard/my-profile"
                  className="flex items-center space-x-2"
                >
                  <FaUser />
                  <span>Profile</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/my-enroll"
                  className="flex items-center space-x-2"
                >
                  <FaUserGraduate />
                  <span>My Enroll Class</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/my-progress"
                  className="flex items-center space-x-2"
                >
                  <GiProgression />
                  <span>My Progress</span>
                </NavLink>
              </li>
            </>
          )}

          <div className="divider"></div>
          <li>
            <Link to="/" className="flex items-center space-x-2">
              <FaHome />
              <span>Home</span>
            </Link>
          </li>
          <li>
            <Link to="/allClasses" className="flex items-center space-x-2">
              <MdContentPasteSearch />
              <span>All Courses</span>
            </Link>
          </li>
          <li>
            <Link to="/contact" className="flex items-center space-x-2">
              <BiSolidPhoneCall />
              <span>Contact</span>
            </Link>
          </li>
        </ul>
      </div>
      <div className="flex-1 mt-3 border-t-2 md:border-none md:p-4 lg:p-8 md:overflow-y-auto">
        <Outlet />
      </div>
      <ToastContainer />
    </div>
  );
};

export default Dashboard;
