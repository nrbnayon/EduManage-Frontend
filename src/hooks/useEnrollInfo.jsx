import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useEnrollInfo = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: enrollInfo = [],
    isLoading,
    refetch,
    error,
  } = useQuery({
    queryKey: ["enrollInfo", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/enroll-info?studentEmail=${encodeURIComponent(user.email)}`
      );
      return res.data;
    },
    enabled: !!user?.email,
  });

  return { enrollInfo, isLoading, refetch, error };
};

export default useEnrollInfo;
