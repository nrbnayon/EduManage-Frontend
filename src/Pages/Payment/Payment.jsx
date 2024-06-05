import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoaderSpinner from "../Shared/LoaderSpinner/LoaderSpinner";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GETWAY);

const Payment = () => {
  const { courseId } = useParams();
  const axiosSecure = useAxiosSecure();
  const { data: course = {}, isLoading } = useQuery({
    queryKey: ["course", courseId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/courseDetails/${courseId}`);
      return res.data;
    },
    enabled: !!courseId,
  });
  if (isLoading || !course) return <LoaderSpinner />;
  return (
    <Elements stripe={stripePromise}>
      <Helmet>
        <title>EduManage | Payment</title>
      </Helmet>
      <CheckoutForm courseInfo={course} />
    </Elements>
  );
};

export default Payment;
