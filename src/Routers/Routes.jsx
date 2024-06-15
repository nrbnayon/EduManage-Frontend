import { createBrowserRouter } from "react-router-dom";
import Root from "../Layout/Root";
import NotFound from "../NotFound/NotFound";
import Home from "../Pages/Home/Home";

import GuestRoute from "./GuestRoute";
import Login from "../Pages/Authentication/Login";
import Register from "./../Pages/Authentication/Register";
import Contact from "../Pages/Contact/Contact";
import AllCourses from "../Pages/AllCourses/AllCourses";
import CourseDetails from "../Pages/AllCourses/CourseDetails";
import ProtectedRoute from "./ProtectedRoute";
import Dashboard from "../Layout/Dashboard";
import Payment from "../Pages/Payment/Payment";
import MyEnroll from "../Pages/Dashboard/Students/MyEnroll";
import ApplyForTeachingPosition from "../Pages/Dashboard/Teacher/ApplyForTeachingPosition";
import AdminRoute from "./AdminRoute";
import TeacherRequest from "../Pages/Dashboard/Admin/TeacherRequest";
import StudentEnrollRouter from "./StudentEnrollRouter";
import MyClassDetails from "../Pages/Dashboard/Students/MyClassDetails";
import UserProfile from "../Pages/Dashboard/Users/UserProfile";
import AddCourse from "../Pages/Dashboard/Teacher/AddCourse";
import MyClass from "../Pages/Dashboard/Teacher/MyClass";
import AllRequestCourse from "../Pages/Dashboard/Admin/AllRequestCourse";
import TeacherDashboard from "../Pages/Dashboard/Teacher/ClassDetails";
import AllUsers from "../Pages/Dashboard/Admin/AllUsers";
import ProgressPage from "../Pages/Dashboard/Admin/ProgressPage";
import MyProgress from "../Pages/Dashboard/Students/MyProgress";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: (
          <GuestRoute>
            <Login />
          </GuestRoute>
        ),
      },

      {
        path: "/register",
        element: (
          <GuestRoute>
            <Register />
          </GuestRoute>
        ),
      },
      {
        path: "/allClasses",
        element: <AllCourses />,
      },
      {
        path: "/courseDetails/:id",
        element: (
          <ProtectedRoute>
            <CourseDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "/payment/:courseId",
        element: (
          <ProtectedRoute>
            <Payment />
          </ProtectedRoute>
        ),
      },
      {
        path: "/applyForTeacher",
        element: (
          <ProtectedRoute>
            <ApplyForTeachingPosition />
          </ProtectedRoute>
        ),
      },
      {
        path: "/contact",
        element: <Contact />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
    children: [
      // student enroll  Route
      {
        path: "my-enroll",
        element: (
          <StudentEnrollRouter>
            <MyEnroll />
          </StudentEnrollRouter>
        ),
      },
      {
        path: "myEnroll-class/:id",
        element: (
          <StudentEnrollRouter>
            <MyClassDetails />
          </StudentEnrollRouter>
        ),
      },
      {
        path: "my-progress",
        element: (
          <StudentEnrollRouter>
            <MyProgress />
          </StudentEnrollRouter>
        ),
      },
      {
        path: "teacher-request",
        element: (
          <AdminRoute>
            <TeacherRequest />
          </AdminRoute>
        ),
      },
      {
        path: "all-courses",
        element: (
          <AdminRoute>
            <AllRequestCourse />
          </AdminRoute>
        ),
      },
      {
        path: "class/:id",
        element: (
          <AdminRoute>
            <ProgressPage />
          </AdminRoute>
        ),
      },
      {
        path: "all-users",
        element: (
          <AdminRoute>
            <AllUsers />
          </AdminRoute>
        ),
      },
      {
        path: "my-profile",
        element: (
          <ProtectedRoute>
            <UserProfile />
          </ProtectedRoute>
        ),
      },
      {
        path: "addCourse",
        element: (
          <ProtectedRoute>
            <AddCourse />
          </ProtectedRoute>
        ),
      },
      {
        path: "my-class",
        element: (
          <ProtectedRoute>
            <MyClass />
          </ProtectedRoute>
        ),
      },
      {
        path: "my-class-details/:id",
        element: (
          <ProtectedRoute>
            <TeacherDashboard />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
