import { useQuery } from "@tanstack/react-query";
import useAxios from "./useAxios";
import useAuth from "./useAuth";

const useCart = () => {
  const { user } = useAuth();
  const axiosSecure = useAxios();

  const {
    data: cart = [],
    isLoading,
    refetch,
    error,
  } = useQuery({
    queryKey: ["cart", user?.displayName, user?.photoURL],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/carts?userName=${encodeURIComponent(
          user.displayName
        )}&userProfileImg=${encodeURIComponent(user.photoURL)}`
      );
      return res.data;
    },
    enabled: !!user?.displayName && !!user?.photoURL,
  });

  return { cart, isLoading, refetch, error };
};

export default useCart;
