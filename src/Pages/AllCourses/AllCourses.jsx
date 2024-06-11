import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaBookReader } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaDollarSign, FaUser, FaUsers } from "react-icons/fa";
import { Typewriter } from "react-simple-typewriter";
import useGetAllCourse from "../../hooks/useGetAllCourse";
import LoaderSpinner from "../Shared/LoaderSpinner/LoaderSpinner";
import BgCard from "../Shared/BgCard/BgCard";
import { Pagination, Stack } from "@mui/material";
import { SiSkillshare } from "react-icons/si";
import { Helmet } from "react-helmet-async";

const AllCourses = () => {
  const { courses, isLoading, error } = useGetAllCourse();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageLoading, setPageLoading] = useState(false);

  const itemPerPage = 9;

  const handlePageChange = (event, value) => {
    setPageLoading(true);
    setCurrentPage(value);
    setTimeout(() => {
      setPageLoading(false);
    }, 500);
  };

  const numberOfPages = Math.ceil(courses.length / itemPerPage);
  const displayedCourses = courses.slice(
    (currentPage - 1) * itemPerPage,
    currentPage * itemPerPage
  );

  const Card = {
    img: "https://di3xp7dfi3cq.cloudfront.net/media/magefan_blog/s/k/skills.jpg",
    title: "Our all valuable courses",
    desc: "We believe best skills you can learn from here to you career",
  };

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  if (isLoading || pageLoading) return <LoaderSpinner />;
  if (error) return <div>Error loading courses</div>;

  return (
    <div className="my-4">
      <Helmet>
        <title>EduManage | All Courses</title>
      </Helmet>
      <BgCard Card={Card} />
      <div className="m-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {displayedCourses.map((course) => (
          <div
            key={course._id}
            className="shrink-0 rounded overflow-hidden shadow-lg border flex flex-col justify-between"
            data-aos="fade-up"
          >
            <img
              className="w-full h-64"
              src={course.image}
              alt={course.title}
              data-aos="zoom-in"
            />
            <div className="px-2 py-4 flex-grow" data-aos="fade-right">
              <div className="font-bold text-xl mb-2 font-cinzel">
                {course.title}
              </div>
              <p className="text-gray-700 text-base font-raleway mb-4">
                {course.shortDescription.slice(0, 60)}...
              </p>
              <div className="flex items-center mt-2">
                <FaUser className="mr-2" />
                <span className="text-gray-600">
                  Learn With: <span className="font-bold">{course.name}</span>
                </span>
              </div>
              <div className="flex justify-between">
                <div className="flex items-center mt-2">
                  <FaDollarSign className="mr-2" />
                  <span className="text-gray-600">${course.price}</span>
                </div>
                <div className="flex items-center mt-2">
                  <FaUsers className="mr-2" />
                  <span className="text-gray-600">
                    Total Enrollments: {course.totalEnrollment}
                  </span>
                </div>
              </div>
              <div className="flex items-center mt-2">
                <SiSkillshare className="mr-2" />
                <Typewriter
                  words={[`${course.title}`, "Enroll", "Explore"]}
                  loop={true}
                  cursor
                  cursorStyle="_"
                  typeSpeed={100}
                  deleteSpeed={50}
                  delaySpeed={2000}
                />
              </div>
            </div>
            <div className="font-cinzel flex justify-end p-2">
              <Link
                to={`/courseDetails/${course._id}`}
                className="btn text-white btn-success font-semibold rounded hover:btn-info focus:outline-none focus:shadow-outline"
              >
                <FaBookReader />
                Enroll Now
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center items-center text-center mt-6">
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
  );
};

export default AllCourses;
