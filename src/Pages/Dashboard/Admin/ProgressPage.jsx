import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaStar } from "react-icons/fa";

const gradients = [
  "bg-gradient-to-r from-blue-400 to-blue-600",
  "bg-gradient-to-r from-green-400 to-green-600",
  "bg-gradient-to-r from-purple-400 to-purple-600",
  "bg-gradient-to-r from-pink-400 to-pink-600",
  "bg-gradient-to-r from-yellow-400 to-yellow-600",
];

const ProgressPage = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const {
    data: classFeedbacks = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["classFeedbacks", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/course-all-feedbacks/${id}`);
      return res.data;
    },
  });

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl font-semibold">Loading...</p>
      </div>
    );
  if (error)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl font-semibold text-red-500">
          Error: {error.message}
        </p>
      </div>
    );

  return (
    <div className="w-full p-6 bg-gray-100 min-h-screen">
      <div
        className={`sticky top-2 z-20 flex flex-col justify-center items-center p-8 rounded-lg shadow-lg mb-6 ${
          !classFeedbacks[0]?.courseImg ? "bg-gray-100" : ""
        }`}
        style={{
          backgroundImage: classFeedbacks[0]?.courseImg
            ? `url(${classFeedbacks[0].courseImg})`
            : "",
          height: "200px",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="bg-black bg-opacity-50 p-4 rounded-lg text-center">
          <h2 className="text-3xl font-bold text-white mb-2">Feedbacks of</h2>
          <h3 className="text-xl font-semibold text-gray-300">
            {classFeedbacks[0]?.title}
          </h3>
        </div>
      </div>
      {classFeedbacks.length > 0 ? (
        <div className="grid grid-cols-1 gap-3">
          {classFeedbacks.map((feedback, index) => (
            <div
              key={feedback._id}
              className={`p-6 rounded-lg shadow-lg transform transition-transform hover:scale-105 ${
                gradients[index % gradients.length]
              }`}
            >
              <div className="flex items-center gap-4">
                <img
                  src={feedback.image}
                  alt={feedback.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-gray-300"
                />
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    {feedback.feedbackText}
                  </h3>
                  <p className="mt-2 text-gray-100">by {feedback.name}</p>
                  <div className="flex items-center mt-2">
                    {[...Array(5)].map((star, idx) => (
                      <FaStar
                        key={idx}
                        className={`${
                          idx < feedback.rating
                            ? "text-yellow-300"
                            : "text-gray-400"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-xl font-semibold text-gray-700">
          No feedbacks found for this class.
        </p>
      )}
    </div>
  );
};

export default ProgressPage;
