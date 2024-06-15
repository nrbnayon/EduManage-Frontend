import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useTeacher = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data, isLoading, refetch, error } = useQuery({
    queryKey: [user?.email, "isTeacher"],
    queryFn: async () => {
      if (!user?.email) return { teacher: false, status: "" };
      const res = await axiosSecure.get(`/users/teacher/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  return { ...data, refetch, isLoading, error };
};

export default useTeacher;
