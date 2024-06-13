import { useState } from "react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";

import LoginImg from "/login2.jpeg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import { Helmet } from "react-helmet-async";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const { signInUser, loginWithGoogle } = useAuth();
  const axiosPublic = useAxiosPublic();

  const onSubmit = async (data) => {
    const { email, password } = data;
    setError("");

    try {
      const userCredential = await signInUser(email, password);
      const user = userCredential.user;

      if (user) {
        toast.success("Login Successfully");
        navigate(from, { replace: true });
      }
    } catch (error) {
      if (
        error.code === "auth/wrong-password" ||
        error.code === "auth/user-not-found"
      ) {
        setError("Invalid email or password");
      } else {
        setError("Invalid email or password. Try again");
      }
    }
  };

  const handleGoogleSignIn = () => {
    loginWithGoogle()
      .then((result) => {
        const userInfo = {
          userName: result.user?.displayName,
          userProfileImg: result.user?.photoURL,
          userEmail: result.user?.email,
          userRole: "student",
          status: "pending",
        };
        axiosPublic.post("/users", userInfo);
        navigate(from, { replace: true });
        toast.success("Google Login Successfully");
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <div>
      <Helmet>
        <title>EduManage | Login</title>
      </Helmet>
      <div className="hero min-h-fit bg-gradient-to-r from-blue-500 to-teal-400">
        <div className="hero-content w-[95%] mx-auto flex flex-col-reverse lg:flex-row items-center justify-center space-y-6 lg:space-y-0 lg:space-x-8">
          <div className="w-full  max-w-xl  shadow-2xl rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
            <img src={LoginImg} alt="Login" className="w-full h-auto" />
          </div>
          <div className="w-full max-w-xl shadow-2xl bg-white rounded-lg p-6 transform hover:scale-105 transition-transform duration-300">
            <h1 className="text-2xl md:text-4xl mt-4 text-center font-bold text-gray-800">
              Welcome Back!
            </h1>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="card-body space-y-1"
            >
              <div className="flex items-center justify-center w-full mb-2">
                <button
                  onClick={handleGoogleSignIn}
                  className="btn flex items-center justify-center space-x-2 bg-white text-gray-700 border border-gray-300 rounded-lg px-4 py-2 shadow-md hover:bg-gray-100 transition duration-300"
                >
                  <FcGoogle size={24} />
                  <span className="hidden md:inline-block font-medium">
                    Continue with Google
                  </span>
                </button>
              </div>

              <div className="divider">OR</div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="input input-bordered w-full"
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
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="input input-bordered w-full"
                  {...register("password", {
                    required: "Password is required",
                  })}
                />
                {errors.password && (
                  <span className="text-red-500 text-sm">
                    {errors.password.message}
                  </span>
                )}
                <label className="label">
                  <a
                    href="#"
                    className="label-text-alt link link-hover text-primary"
                  >
                    Forgot password?
                  </a>
                </label>
              </div>
              {error && (
                <div className="text-red-500 text-center my-2">{error}</div>
              )}
              <div className="form-control">
                <button type="submit" className="btn btn-primary w-full">
                  Login
                </button>
              </div>
              <div className="flex justify-center mt-4">
                <p className="text-sm">Don&apos;t have an account?</p>
                <Link to="/register" className="ml-1 text-primary font-bold">
                  Register Now
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
