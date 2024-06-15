import { FaBook, FaChartLine, FaTrophy } from "react-icons/fa";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import Logo from "/logo.png";

const MyProgress = () => {
  const data = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Progress",
        data: [65, 59, 80, 81, 56, 55],
        fill: false,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="bg-white p-4 rounded-lg shadow-md mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">My Progress In</h1>
        <div className="flex items-center gap-4">
          <img src={Logo} alt="Logo" className="w-12 h-12 rounded-md" />
          <p className="text-xl font-semibold text-gray-800">Edu Manage</p>
        </div>
      </header>

      <main>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
            <FaBook className="text-blue-500 text-3xl mr-4" />
            <div>
              <h3 className="text-xl font-semibold text-gray-800">
                Courses Completed
              </h3>
              <p className="text-2xl font-bold text-gray-700">8</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
            <FaChartLine className="text-green-500 text-3xl mr-4" />
            <div>
              <h3 className="text-xl font-semibold text-gray-800">
                Current GPA
              </h3>
              <p className="text-2xl font-bold text-gray-700">3.8</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
            <FaTrophy className="text-yellow-500 text-3xl mr-4" />
            <div>
              <h3 className="text-xl font-semibold text-gray-800">
                Achievements
              </h3>
              <p className="text-2xl font-bold text-gray-700">5</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Progress Over Time
          </h3>
          <Line data={data} options={options} />
        </div>
      </main>
    </div>
  );
};

export default MyProgress;
