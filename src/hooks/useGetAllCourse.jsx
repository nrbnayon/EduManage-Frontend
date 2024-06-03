import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useGetAllCourse = () => {
  const axiosPublic = useAxiosPublic();
  const {
    data: courses = [],
    isLoading,
    refetch,
    error,
  } = useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      const res = await axiosPublic.get("/allCourse");
      return res.data;
    },
  });

  return { courses, isLoading, refetch, error };
};

export default useGetAllCourse;
