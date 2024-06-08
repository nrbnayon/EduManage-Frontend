import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaGoogle, FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";
import LoginImg from "../../assets/reg3.jpeg";
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
  const { signInUser, loginWithGoogle, loginWithGithub } = useAuth();
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

  const handleGithubSignIn = () => {
    loginWithGithub()
      .then((result) => {
        const userInfo = {
          userName: result.user?.displayName,
          userProfileImg: result.user?.photoURL,
          userEmail: result.user?.email,
          userRole: "student",
        };
        axiosPublic.post("/users", userInfo);
        navigate(from, { replace: true });
        toast.success("GitHub Login successfully");
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const handleSocialLogin = () => {
    setError(
      "Please try other options. This is not built yet! Still in progress."
    );
  };

  return (
    <div>
      <Helmet>
        <title>EduManage | Login</title>
      </Helmet>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content w-[95%] mx-auto flex-col lg:flex-row">
          <div className="md:w-1/2 max-w-xl shrink-0 shadow-2xl rounded-md">
            <img src={LoginImg} alt="Login" className="rounded-md" />
          </div>
          <div className="card shrink-0 w-full max-w-xl shadow-2xl bg-base-100">
            <h1 className="text-2xl md:text-5xl mt-4 text-center font-bold">
              Welcome Back!
            </h1>
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="email"
                  className="input input-bordered"
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
                  placeholder="password"
                  className="input input-bordered"
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
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              {error && (
                <div className="text-red-500 text-center my-2">{error}</div>
              )}
              <div className="form-control">
                <button type="submit" className="btn btn-primary">
                  Login
                </button>
              </div>
              <div className="flex justify-center">
                <p className="text-sm">Don&apos;t have an account?</p>
                <Link to="/register" className="ml-1 text-primary font-bold">
                  Register Now
                </Link>
              </div>
              <div className="divider my-0">OR</div>
              <h3 className="text-lg text-center font-semibold">
                Continue with
              </h3>
              <div className="flex items-center flex-wrap justify-evenly w-full">
                <button
                  onClick={handleGoogleSignIn}
                  className="btn btn-circle bg-red-600 text-white"
                >
                  <FaGoogle />
                </button>
                <button
                  onClick={handleSocialLogin}
                  className="btn btn-circle bg-blue-700 text-white"
                >
                  <FaFacebook />
                </button>
                <button
                  onClick={handleGithubSignIn}
                  className="btn btn-circle bg-gray-800 text-white"
                >
                  <FaGithub />
                </button>
                <button
                  onClick={handleSocialLogin}
                  className="btn btn-circle bg-blue-800 text-white"
                >
                  <FaLinkedin />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
