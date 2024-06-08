import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useTeacher = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: isTeacher,
    isTeacherLoading,
    isPending,
    error,
  } = useQuery({
    queryKey: [user?.email, "isTeacher"],
    queryFn: async () => {
      if (!user?.email) return false;
      const res = await axiosSecure.get(`/users/teacher/${user.email}`);
      console.log(res.data);
      return res.data?.teacher;
    },
    enabled: !!user?.email,
  });

  return { isTeacher, isTeacherLoading, error, isPending };
};

export default useTeacher;
