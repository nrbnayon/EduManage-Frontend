import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useGetPopularCourses = () => {
  const axiosPublic = useAxiosPublic();
  const {
    data: courses = [],
    isLoading,
    refetch,
    error,
  } = useQuery({
    queryKey: ["popularCourses"],
    queryFn: async () => {
      const res = await axiosPublic.get("/popular-courses");
      return res.data;
    },
  });

  return { courses, isLoading, refetch, error };
};

export default useGetPopularCourses;
