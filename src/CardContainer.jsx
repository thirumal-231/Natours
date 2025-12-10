import { useEffect, useState } from "react";
import Card from "./Card";
import axios from "axios";

function CardContainer() {
  const [tourData, setTourData] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:3003/api/v1/tours")
      .then((res) => {
        setTourData(res.data.data.docs);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <div className="card-container">
        {tourData.length > 0 ? (
          tourData.map((tour) => <Card data={tour} />)
        ) : (
          <p>Loading tours</p>
        )}
      </div>
    </>
  );
}

export default CardContainer;
