import { useEffect, useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import PropTypes from "prop-types";
import { FaCreditCard, FaSpinner } from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

const CheckoutForm = ({ courseInfo }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const { user } = useAuth();
  const [error, setError] = useState(null);
  const axiosSecure = useAxiosSecure();

  const { title, name, price } = courseInfo;

  useEffect(() => {
    const createPaymentIntent = async () => {
      if (price) {
        try {
          const res = await axiosSecure.post("/create-payment-intent", {
            price: parseInt(price),
          });
          setClientSecret(res.data.clientSecret);
        } catch (error) {
          console.error("Error creating payment intent:", error);
        }
      }
    };

    createPaymentIntent();
  }, [axiosSecure, price]);
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      console.error("Stripe.js has not yet loaded.");
      return;
    }

    setLoading(true);
    const card = elements.getElement(CardElement);
    if (card === null) {
      console.error("Card Element not found.");
      setLoading(false);
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    //confirm payment

    const { paymentIntent, error: payError } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
            // image: user?.profileURL || "anonymous",
          },
        },
      }
    );
    if (payError) {
      console.log("Confirm Error:", payError);
    } else {
      console.log("Success pay", paymentIntent);
      if (paymentIntent.status === "succeeded") {
        console.log("transaction id: ", paymentIntent.id);
        setTransactionId(paymentIntent.id);
      }
    }
    setLoading(false);
    if (error) {
      console.error("Payment error:", error);
      setError(error.message);
    } else {
      console.log("Payment Method", paymentMethod);
      setError(null);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 p-6 bg-white shadow-md rounded-lg"
    >
      <div className="mb-4 space-y-3">
        <h1 className="text-center text-3xl font-raleway">Make Payment For</h1>
        <h3 className="text-center text-lg font-cinzel font-semibold">
          Course: {title}
        </h3>
        <div className="flex justify-around mt-2">
          <p className="text-sm ">Teacher: {name}</p>
          <p className="text-sm ">Enrollment Price: ${price}</p>
        </div>
      </div>
      <div className="my-4 p-4 border border-gray-300 rounded-md">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
      </div>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      {transactionId && (
        <div className="text-success mb-4">
          Payment Success your Transaction Id: {transactionId}
        </div>
      )}
      <button
        className="w-full py-3 bg-green-500 text-white font-semibold rounded hover:bg-green-600 focus:outline-none focus:shadow-outline flex items-center justify-center"
        type="submit"
        disabled={!stripe || loading || !clientSecret}
      >
        {loading ? (
          <>
            <FaSpinner className="animate-spin mr-2" /> Processing...
          </>
        ) : (
          <>
            <FaCreditCard className="mr-2" /> Pay
          </>
        )}
      </button>
    </form>
  );
};

CheckoutForm.propTypes = {
  courseInfo: PropTypes.object.isRequired,
};

export default CheckoutForm;
