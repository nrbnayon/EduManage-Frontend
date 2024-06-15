import { Link } from "react-router-dom";
import Teacher from "../../../assets/Teacher.jpg";
const JoinAsTeacherSection = () => {
  return (
    <div className="bg-gray-100 text-black py-10 my-6 flex font-cinzel flex-col md:flex-row justify-between items-center">
      <div className="w-full md:w-1/2 flex justify-center">
        <img
          src={Teacher}
          alt="Join as a teacher"
          className="w-full max-w-md rounded-lg shadow-lg"
        />
      </div>
      <div className="w-full md:w-1/2 px-4 mt-8 md:mt-0">
        <h2 className="text-3xl font-bold mb-4 font-cinzel">
          Join Our Teaching Community
        </h2>
        <p className="text-lg mb-6 font-raleway">
          Become a part of our teaching community and share your knowledge with
          students all around the world. Enjoy the freedom to create your own
          courses and help shape the future of education.
        </p>
        <Link
          to="/applyForTeacher"
          className="bg-blue-500 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-600"
        >
          Teach On Edu Manage
        </Link>
      </div>
    </div>
  );
};

const ExtraSectionOne = () => (
  <div className="bg-gray-100 text-black py-16 flex flex-col md:flex-row justify-between items-center">
    <div className="w-full md:w-1/2 px-4 mt-8 md:mt-0">
      <h2 className="text-3xl font-bold mb-4 font-cinzel">
        Explore Our Courses
      </h2>
      <p className="text-lg mb-6 font-raleway">
        Dive into a wide variety of courses across different subjects and skill
        levels. Whether you are looking to start a new hobby or advance in your
        career, we have something for everyone.
      </p>
      <button className="bg-green-500 text-white px-6 py-2 rounded-full font-semibold hover:bg-green-600">
        Explore Courses
      </button>
    </div>
    <div className="w-full md:w-1/2 flex justify-center">
      <img
        src="https://www.edusoftconsultants.com/img/c-s-d-s.gif"
        alt="Explore Courses"
        className="w-full max-w-md rounded-lg shadow-lg"
      />
    </div>
  </div>
);

const ExtraSectionTwo = () => (
  <div className="bg-gray-100 text-black py-16 flex flex-col md:flex-row justify-between items-center">
    <div className="w-full md:w-1/2 flex justify-center">
      <img
        src="https://via.placeholder.com/400"
        alt="Student Success Stories"
        className="w-full max-w-md rounded-lg shadow-lg"
      />
    </div>
    <div className="w-full md:w-1/2 px-4 mt-8 md:mt-0">
      <h2 className="text-3xl font-bold mb-4">Student Success Stories</h2>
      <p className="text-lg mb-6">
        Hear from our students about how our courses have helped them achieve
        their goals and transform their lives. Be inspired by their success
        stories and join our community today.
      </p>
      <button className="bg-orange-500 text-white px-6 py-2 rounded-full font-semibold hover:bg-orange-600">
        Read Stories
      </button>
    </div>
  </div>
);

const WhyEduManageSection = () => (
  <div className="bg-gray-100 text-black py-10 my-6 flex flex-col md:flex-row justify-between items-center">
    <div className="w-full md:w-1/2 flex justify-center">
      <img
        src="https://www.edusoftconsultants.com/img/cf947b46283c10c47e3d5d945afb7053.gif"
        alt="Why EduManage"
        className="w-full max-w-md rounded-lg shadow-lg"
      />
    </div>
    <div className="w-full md:w-1/2 px-4 mt-8 md:mt-0">
      <h2 className="text-3xl font-bold font-cinzel mb-4">Why Edu Manage?</h2>
      <p className="text-lg mb-6 font-raleway">
        Discover why EduManage is the best platform for both students and
        teachers. With a vast array of courses, a dedicated teaching community,
        and cutting-edge learning tools, EduManage offers a unique and enriching
        educational experience. Join us and take your learning journey to the
        next level.
      </p>
      <button className="bg-orange-500 text-white px-6 py-2 rounded-full font-semibold hover:bg-orange-600">
        Learn More
      </button>
    </div>
  </div>
);
export {
  JoinAsTeacherSection,
  ExtraSectionOne,
  ExtraSectionTwo,
  WhyEduManageSection,
};
