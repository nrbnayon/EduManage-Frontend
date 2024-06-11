import { useForm } from "react-hook-form";
import {
  FaChalkboardTeacher,
  FaEnvelope,
  FaDollarSign,
  FaImage,
  FaInfoCircle,
} from "react-icons/fa";
import useAuth from "./../../../hooks/useAuth";
import useTeacher from "../../../hooks/useTeacher";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const AddCourse = () => {
  const { register, handleSubmit, reset } = useForm();
  const { user } = useAuth();
  const { teacher } = useTeacher();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const courseInfo = {
      ...data,
      teacherEmail: user.email,
      status: "pending",
    };

    try {
      if (teacher) {
        const res = await axiosSecure.post("/new-course", courseInfo);
        console.log("res", res);
        Swal.fire("Success", "New Course Added Successfully", "success");
        navigate("/dashboard/my-class");
        reset();
      }
    } catch (error) {
      Swal.fire("Error", "Failed to add course", "error");
    }
  };

  return (
    <div className="p-6 font-cinzel bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-center">Add New Course</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" w-full grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6"
      >
        <div className="flex col-span-2 md:col-span-1 items-center space-x-2">
          <FaChalkboardTeacher size={24} />
          <div className="flex col-span-2 md:col-span-1 flex-col w-full">
            <label className="block">Title</label>
            <input
              {...register("title", { required: true })}
              className="w-full p-3 border border-gray-300 rounded text-black"
              placeholder="Course Title"
            />
          </div>
        </div>
        <div className="flex col-span-2 md:col-span-1 items-center space-x-2">
          <FaDollarSign size={24} />
          <div className="flex flex-col w-full">
            <label className="block">Price</label>
            <input
              {...register("price", { required: true })}
              type="number"
              min={0}
              className="w-full p-3 border border-gray-300 rounded text-black"
              placeholder="Price"
            />
          </div>
        </div>
        <div className="flex col-span-2 items-center space-x-2">
          <FaImage size={24} />
          <div className="flex flex-col w-full">
            <label className="block">Image URL</label>
            <input
              {...register("image", { required: true })}
              className="w-full p-3 border border-gray-300 rounded text-black"
              placeholder="Image URL"
            />
          </div>
        </div>
        <div className="flex items-center col-span-2 space-x-2">
          <FaInfoCircle size={24} />
          <div className="flex flex-col w-full">
            <label className="block">Short Description</label>
            <textarea
              {...register("shortDescription", { required: true })}
              className="w-full p-3 border border-gray-300 rounded text-black"
              placeholder="Course Description"
            ></textarea>
          </div>
        </div>
        <div className="flex col-span-2 md:col-span-1 items-center space-x-2">
          <FaChalkboardTeacher size={24} />
          <div className="flex flex-col w-full">
            <label className="block">Name</label>
            <input
              {...register("name", { required: true })}
              value={user?.displayName}
              readOnly
              className="w-full p-3 border border-gray-300 rounded bg-gray-100 text-black"
            />
          </div>
        </div>
        <div className="flex col-span-2 md:col-span-1 items-center space-x-2">
          <FaEnvelope size={24} />
          <div className="flex flex-col w-full">
            <label className="block">Email</label>
            <input
              {...register("email", { required: true })}
              value={user?.email}
              readOnly
              className="w-full p-3 border border-gray-300 rounded bg-gray-100 text-black"
            />
          </div>
        </div>

        <div className="flex w-full col-span-2 justify-center">
          <button
            type="submit"
            className="text-center font-bold p-3 bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-lg shadow-md hover:from-green-500 hover:to-blue-600"
          >
            Add Class
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCourse;
