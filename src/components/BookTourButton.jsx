import { loadStripe } from "@stripe/stripe-js";
import api from "../api/axios";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLICKEY);

const BookTourButton = ({ tourId }) => {
  const handleBooking = async () => {
    try {
      const res = await api.get(`/api/v1/bookings/checkout-session/${tourId}`, {
        withCredentials: true,
      });
      if (res?.data?.status === "success") {
        const session = await res.data.session;
        window.location.assign(session.url);
      }
    } catch (err) {
      console.error(`Booking error: `, err);
      alert("Something went wrong. Please try again");
    }
  };
  return (
    <button onClick={handleBooking} className="btn btn--green">
      Book tour now!
    </button>
  );
};

export default BookTourButton;
