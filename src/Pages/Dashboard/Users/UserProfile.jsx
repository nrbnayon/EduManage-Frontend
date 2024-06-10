import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FiGithub, FiTwitter, FiLinkedin, FiFacebook } from "react-icons/fi";

const UserProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    data: profile = {},
    isLoading,
    error,
  } = useQuery({
    queryKey: ["profile", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/teacher/${user.email}`);
      return res.data;
    },
    enabled: !!user.email,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="flex flex-col justify-center font-cinzel w-full p-6 shadow-md rounded-xl sm:px-12 dark:bg-gray-50 dark:text-gray-800">
      <img
        src={profile.user.userProfileImg}
        alt="Profile"
        className="w-32 h-32 mx-auto rounded-full dark:bg-gray-500 aspect-square"
      />
      <div className="space-y-4  text-center divide-y dark:divide-gray-300">
        <div className="my-2 space-y-1">
          <h2 className="text-xl font-semibold sm:text-2xl">
            {user.displayName}
          </h2>
          <p className="px-5 text-xs sm:text-base dark:text-gray-600">
            {profile.user.userRole}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 my-4">
          <div>
            <p className="text-gray-600 font-semibold">Email:</p>
            <p className="text-gray-600">{user.email}</p>
          </div>
          <div>
            <p className="text-gray-600 font-semibold">Phone:</p>
            <p className="text-gray-600">
              {profile?.user?.phone || "+880100000000"}
            </p>
          </div>
        </div>
        <div className="flex justify-center pt-2 space-x-4 align-center">
          <a
            rel="noopener noreferrer"
            href="#"
            aria-label="GitHub"
            className="p-2 rounded-md dark:text-gray-800 hover:dark:text-violet-600"
          >
            <FiGithub className="w-4 h-4 fill-current" />
          </a>
          <a
            rel="noopener noreferrer"
            href="#"
            aria-label="Dribble"
            className="p-2 rounded-md dark:text-gray-800 hover:dark:text-violet-600"
          >
            <FiLinkedin className="w-4 h-4 fill-current" />
          </a>
          <a
            rel="noopener noreferrer"
            href="#"
            aria-label="Twitter"
            className="p-2 rounded-md dark:text-gray-800 hover:dark:text-violet-600"
          >
            <FiTwitter className="w-4 h-4 fill-current" />
          </a>
          <a
            rel="noopener noreferrer"
            href="#"
            aria-label="Email"
            className="p-2 rounded-md dark:text-gray-800 hover:dark:text-violet-600"
          >
            <FiFacebook className="w-4 h-4 fill-current" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
