import { useQuery } from "@tanstack/react-query";
import { getAllBookedTours } from "../api/tours";
import Card from "../Card";

const MyTours = () => {
  const {
    data: myTours,
    isLoading,
    error,
  } = useQuery({ queryKey: ["myTours"], queryFn: getAllBookedTours });

  if (isLoading) return <p>Loading booked tours...</p>;
  if (error) return <p>Failed to load booked tours</p>;

  return (
    <div>
      <>
        <main className="main">
          <div className="card-container">
            {myTours.map((tour) => (
              <Card data={tour} />
            ))}
          </div>
        </main>
      </>
    </div>
  );
};

export default MyTours;
