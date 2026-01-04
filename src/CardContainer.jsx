import Card from "./Card";
import { getAllTours } from "./api/tours";
import { useQuery } from "@tanstack/react-query";

function CardContainer() {
  const {
    data: tours,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["tours"],
    queryFn: getAllTours,
  });

  if (isLoading) return <p>Loading tours...</p>;
  if (error) return <p>Failed to load tours</p>;

  return (
    <>
      <div className="card-container">
        {tours.map((tour) => (
          <Card data={tour} />
        ))}
      </div>
    </>
  );
}

export default CardContainer;
