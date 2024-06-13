import { useForm } from "react-hook-form";
import useGetAllCourse from "../../../hooks/useGetAllCourse";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useTeacher from "../../../hooks/useTeacher";
import Swal from "sweetalert2";

const ApplyForTeachingPosition = () => {
  const { user } = useAuth();
  const { courses } = useGetAllCourse();
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { teacher, status, refetch, isLoading } = useTeacher();
  const onSubmit = async (data) => {
    try {
      await axiosSecure.post("/teaching-request", {
        ...data,
        userId: user.uid,
        userRole: "student",
        status: "pending",
      });
      Swal.fire("Success", "Your application has been submitted.", "success");
    } catch (error) {
      Swal.fire("Error", "Failed to submit your application.", "error");
    }
  };

  const handleReapply = async () => {
    try {
      await axiosSecure.patch(`/teaching-request/reapply/${user.email}`);
      refetch();
      Swal.fire("Success", "Your reapplication has been submitted.", "success");
    } catch (error) {
      Swal.fire("Error", "Failed to submit your reapplication.", "error");
    }
  };

  if (isLoading) return <p>Loading...</p>;

  if (teacher) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p>You are already a teacher.</p>
      </div>
    );
  }

  if (status === "pending") {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p>
          You have already applied for this position. Your application is
          pending.
        </p>
      </div>
    );
  }

  if (status === "reject") {
    return (
      <div className="min-h-screen font-cinzel flex justify-center items-center">
        <div className="text-center">
          <p>Your previous application was rejected.</p>
          <button
            onClick={handleReapply}
            className="mt-4 py-2 px-4  bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-700"
          >
            request to another
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="my-6 p-8 border font-raleway rounded-lg shadow-lg bg-white">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Apply for a Teaching Position
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 gap-6 sm:grid-cols-2"
      >
        <div className="sm:col-span-2 text-center">
          <img
            id="image"
            src={user?.photoURL}
            alt={user?.displayName}
            className="w-32 h-32 mx-auto mb-6 rounded-full"
          />
          <input
            type="hidden"
            {...register("image", { required: true })}
            value={user?.photoURL}
          />
        </div>
        <div>
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="name"
          >
            Name
          </label>
          <input
            id="name"
            {...register("name", { required: true })}
            className={`mt-1 block w-full px-3 py-2 border ${
              errors.name ? "border-red-500" : "border-gray-300"
            } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-100`}
            type="text"
            value={user?.displayName}
            readOnly
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">Name is required</p>
          )}
        </div>
        <div>
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="email"
          >
            Email
          </label>
          <input
            id="email"
            {...register("email")}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-100"
            type="email"
            value={user?.email}
            readOnly
          />
        </div>
        <div className="sm:col-span-2">
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="experience"
          >
            Experience
          </label>
          <select
            id="experience"
            {...register("experience", { required: true })}
            className={`mt-1 block w-full px-3 py-2 border ${
              errors.experience ? "border-red-500" : "border-gray-300"
            } bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
          >
            <option value="">Select experience level</option>
            <option value="beginner">Beginner</option>
            <option value="mid-level">Mid-level</option>
            <option value="experienced">Experienced</option>
          </select>
          {errors.experience && (
            <p className="text-red-500 text-xs mt-1">Experience is required</p>
          )}
        </div>
        <div className="sm:col-span-2">
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="title"
          >
            Title
          </label>
          <input
            id="title"
            {...register("title", { required: true })}
            className={`mt-1 block w-full px-3 py-2 border ${
              errors.title ? "border-red-500" : "border-gray-300"
            } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
            type="text"
          />
          {errors.title && (
            <p className="text-red-500 text-xs mt-1">Title is required</p>
          )}
        </div>
        <div className="sm:col-span-2">
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="category"
          >
            Category
          </label>
          <select
            id="category"
            {...register("category", { required: true })}
            className={`mt-1 block w-full px-3 py-2 border ${
              errors.category ? "border-red-500" : "border-gray-300"
            } bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
          >
            <option value="">Select category</option>
            {courses.map((course) => (
              <option key={course._id} value={course.title}>
                {course.title}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="text-red-500 text-xs mt-1">Category is required</p>
          )}
        </div>
        <div className="sm:col-span-2">
          <button
            type="submit"
            className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit for Review
          </button>
        </div>
      </form>
    </div>
  );
};

export default ApplyForTeachingPosition;

// import { useForm } from "react-hook-form";
// import useGetAllCourse from "../../../hooks/useGetAllCourse";
// import useAuth from "../../../hooks/useAuth";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";
// import useTeacher from "../../../hooks/useTeacher";

// const ApplyForTeachingPosition = () => {
//   const { user } = useAuth();
//   const { courses } = useGetAllCourse();
//   const axiosSecure = useAxiosSecure();
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();
//   const { isTeacher } = useTeacher();

//   const onSubmit = async (data) => {
//     try {
//        await axiosSecure.post("/teaching-request", {
//         ...data,
//         userId: user.uid,
//         userRole: "student",
//         status: "pending",
//       });
//       console.log("Teaching request submitted:", response.data);
//     } catch (error) {
//       console.error("Failed to submit teaching request:", error);
//     }
//   };

//   if (isTeacher) {
//     return (
//       <div className="min-h-screen flex justify-center items-center">
//         <p>You are already a teacher.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="my-6 p-8 border rounded-lg shadow-lg bg-white">
//       <h1 className="text-3xl font-bold mb-8 text-center">
//         Apply for a Teaching Position
//       </h1>
//       <form
//         onSubmit={handleSubmit(onSubmit)}
//         className="grid grid-cols-1 gap-6 sm:grid-cols-2"
//       >
//         <div className="sm:col-span-2 text-center">
//           <img
//             id="image"
//             src={user?.photoURL}
//             alt={user?.displayName}
//             className="w-32 h-32 mx-auto mb-6 rounded-full"
//           />
//           <input
//             type="hidden"
//             {...register("image", { required: true })}
//             value={user?.photoURL}
//           />
//         </div>
//         <div>
//           <label
//             className="block text-sm font-medium text-gray-700"
//             htmlFor="name"
//           >
//             Name
//           </label>
//           <input
//             id="name"
//             {...register("name", { required: true })}
//             className={`mt-1 block w-full px-3 py-2 border ${
//               errors.name ? "border-red-500" : "border-gray-300"
//             } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-100`}
//             type="text"
//             value={user?.displayName}
//             readOnly
//           />
//           {errors.name && (
//             <p className="text-red-500 text-xs mt-1">Name is required</p>
//           )}
//         </div>
//         <div>
//           <label
//             className="block text-sm font-medium text-gray-700"
//             htmlFor="email"
//           >
//             Email
//           </label>
//           <input
//             id="email"
//             {...register("email")}
//             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-100"
//             type="email"
//             value={user?.email}
//             readOnly
//           />
//         </div>
//         <div className="sm:col-span-2">
//           <label
//             className="block text-sm font-medium text-gray-700"
//             htmlFor="experience"
//           >
//             Experience
//           </label>
//           <select
//             id="experience"
//             {...register("experience", { required: true })}
//             className={`mt-1 block w-full px-3 py-2 border ${
//               errors.experience ? "border-red-500" : "border-gray-300"
//             } bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
//           >
//             <option value="">Select experience level</option>
//             <option value="beginner">Beginner</option>
//             <option value="mid-level">Mid-level</option>
//             <option value="experienced">Experienced</option>
//           </select>
//           {errors.experience && (
//             <p className="text-red-500 text-xs mt-1">Experience is required</p>
//           )}
//         </div>
//         <div className="sm:col-span-2">
//           <label
//             className="block text-sm font-medium text-gray-700"
//             htmlFor="title"
//           >
//             Title
//           </label>
//           <input
//             id="title"
//             {...register("title", { required: true })}
//             className={`mt-1 block w-full px-3 py-2 border ${
//               errors.title ? "border-red-500" : "border-gray-300"
//             } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
//             type="text"
//           />
//           {errors.title && (
//             <p className="text-red-500 text-xs mt-1">Title is required</p>
//           )}
//         </div>
//         <div className="sm:col-span-2">
//           <label
//             className="block text-sm font-medium text-gray-700"
//             htmlFor="category"
//           >
//             Category
//           </label>
//           <select
//             id="category"
//             {...register("category", { required: true })}
//             className={`mt-1 block w-full px-3 py-2 border ${
//               errors.category ? "border-red-500" : "border-gray-300"
//             } bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
//           >
//             <option value="">Select category</option>
//             {courses.map((course) => (
//               <option key={course._id} value={course.title}>
//                 {course.title}
//               </option>
//             ))}
//           </select>
//           {errors.category && (
//             <p className="text-red-500 text-xs mt-1">Category is required</p>
//           )}
//         </div>
//         <div className="sm:col-span-2">
//           <button
//             type="submit"
//             className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//           >
//             Submit for Review
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default ApplyForTeachingPosition;
