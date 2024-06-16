import { Link } from "react-router-dom";
import N404 from "/404.gif";

const NotFound = () => {
  return (
    <div className="relative flex justify-center items-center w-full min-h-screen bg-gray-100 p-4">
      <img
        src={N404}
        alt="404 Not Found"
        className="absolute inset-0 w-full h-full object-cover opacity-50"
      />
      <div className="relative z-10 flex flex-col justify-center items-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Page Not Found
        </h1>
        <p className="text-lg text-gray-600 mb-6 text-center">
          Oops! The page you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link
          to="/"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
