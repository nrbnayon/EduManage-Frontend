import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import BG from "../../assets/LoginImg.gif";
const Register = () => {
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const { createUser, updateProfile } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const onSubmit = async (data) => {
    const { username, photourl, email, password } = data;
    try {
      setError(null);

      if (!username || !photourl || !email || !password) {
        throw new Error("All fields are required.");
      }

      if (!isValidEmail(email)) {
        throw new Error("Invalid email format.");
      }

      if (
        password.length < 6 ||
        !/[A-Z]/.test(password) ||
        !/[a-z]/.test(password)
      ) {
        throw new Error(
          "Password should be at least 6 characters long and contain at least one uppercase and one lowercase letter."
        );
      }

      const result = await createUser(email, password);
      await updateProfile(result.user, {
        displayName: username,
        photoURL: photourl,
      });
      const userInfo = {
        userName: username,
        userProfileImg: photourl,
        userEmail: email,
        userRole: "student",
      };

      axiosPublic
        .post("/users", userInfo)
        .then((res) => {
          if (res.data.insertedId) {
            toast.success("Registration successful!");
            navigate("/");
          } else {
            throw new Error(res.data.message || "Failed to register user.");
          }
        })
        .catch((error) => {
          if (error.response && error.response.status === 409) {
            setError("User already exists. Please use a different email.");
          } else {
            setError(error.message);
          }
        });
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#8EA7E9]/20 p-6 md:p-0">
      <div className="flex h-full w-full overflow-hidden rounded-xl shadow-md  md:h-[90%] md:w-[80%] lg:h-[80%]">
        <div className="relative hidden  min-h-fit items-center justify-center bg-[#8EA7E9] md:flex md:w-[60%] lg:w-[40%]">
          <div className="absolute -top-2 z-10 left-[20%] h-16 w-16 rounded-full bg-gradient-to-br  from-white via-[#9eb6f8] to-[#6585dd]"></div>
          <div className="absolute z-10 bottom-[18%] left-[20%] h-20 w-20 rounded-full bg-gradient-to-br  from-white via-[#9eb6f8] to-[#6585dd]"></div>
          <div className="absolute  -right-7 top-[50%] h-14 w-14 -translate-y-1/2 rounded-full bg-gradient-to-br from-white via-[#9eb6f8] to-[#6585dd] transition-all"></div>
          <div className="absolute  left-[50%] top-[22%] h-24 w-24 -translate-x-1/2 rounded-full  bg-gradient-to-br from-white via-[#9eb6f8] to-[#6585dd]"></div>
          <div className="absolute inset-0 h-full w-full opacity-70">
            <img src={BG} alt="" className="h-full w-full" />
          </div>
          <div className="space-y-2 text-center z-10">
            <h2 className="text-3xl font-raleway text-black font-extrabold  ">
              Welcome
            </h2>
            <p className="animate-pulse text-xl text-black">
              Please Enter Your Information
            </p>
          </div>
        </div>
        <div className="flex w-full flex-col justify-center bg-white py-10 lg:w-[60%]">
          <h2 className="pb-8 text-center text-3xl font-bold text-[#8EA7E9]">
            Register Now
          </h2>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex w-full flex-col items-center justify-center gap-4"
          >
            <input
              className="w-[80%] rounded-lg border border-[#8EA7E9] px-6 py-2 focus:outline-none focus:ring-2 focus:ring-[#8EA7E9]/50 md:w-[60%]"
              type="text"
              placeholder="User Name"
              {...register("username", { required: "User Name is required" })}
            />
            {errors.username && (
              <span className="text-red-500 text-sm">
                {errors.username.message}
              </span>
            )}
            <input
              className="w-[80%] rounded-lg border border-[#8EA7E9] px-6 py-2 focus:outline-none focus:ring-2 focus:ring-[#8EA7E9]/50 md:w-[60%]"
              type="text"
              placeholder="Photo url"
              {...register("photourl", { required: "Photo URL is required" })}
            />
            {errors.photourl && (
              <span className="text-red-500 text-sm">
                {errors.photourl.message}
              </span>
            )}
            <input
              className="w-[80%] rounded-lg border border-[#8EA7E9] px-6 py-2 focus:outline-none focus:ring-2 focus:ring-[#8EA7E9]/50 md:w-[60%]"
              type="email"
              placeholder="Email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email format",
                },
              })}
            />
            {errors.email && (
              <span className="text-red-500 text-sm">
                {errors.email.message}
              </span>
            )}
            <div className="relative flex items-center w-[80%] md:w-[60%]">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                className="w-full rounded-lg border border-[#8EA7E9] px-6 py-2 focus:outline-none focus:ring-2 focus:ring-[#8EA7E9]/50"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters long",
                  },
                  validate: {
                    hasUpperCase: (value) =>
                      /[A-Z]/.test(value) ||
                      "Password must contain at least one uppercase letter",
                    hasLowerCase: (value) =>
                      /[a-z]/.test(value) ||
                      "Password must contain at least one lowercase letter",
                  },
                })}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-0 top-0 h-full flex items-center justify-center p-2"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.password && (
              <span className="text-red-500 text-sm">
                {errors.password.message}
              </span>
            )}
            <div className="text-sm flex text-black justify-between items-center  gap-2 w-[80%] md:w-[60%]">
              <span>Already have an account?</span>
              <Link to="/login" className="text-primary mr-1 font-bold ">
                Login Now
              </Link>
            </div>
            {error && (
              <div className="w-[80%] md:w-[60%] btn-rounded text-red-500 rounded p-2 mt-3">
                {error}
              </div>
            )}
            <input
              className="w-[80%] btn hover:btn-primary rounded-lg bg-[#8EA7E9] px-6 py-2 font-medium text-white md:w-[60%]"
              type="submit"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
