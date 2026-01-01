import { useState } from "react";
import Card from "./Card";
import { getAllTours } from "./api/tours";
import { useQuery, keepPreviousData } from "@tanstack/react-query";

function CardContainer() {
  const [page, setPage] = useState(1);
  const limit = 6;

  const {
    data,
    isLoading,
    error,
    isPlaceholderData,
  } = useQuery({
    queryKey: ["tours", page],
    queryFn: () => getAllTours(page, limit),
    placeholderData: keepPreviousData,
  });


  const tours = data?.data?.docs || [];
  const totalResults = data?.results || 0; 
  
  if (isLoading) return <p className="loader">Loading tours...</p>;
  if (error) return <p className="error">Failed to load tours</p>;

  return (
    <>
      <div className="card-container">
        {tours.map((tour) => (
          <Card key={tour._id} data={tour} />
        ))}
      </div>
      
      <div className="pagination">
        {page > 1 && (
          <button
            className="pagination__link"
            onClick={() => setPage((old) => Math.max(old - 1, 1))}
          >
           <svg className="pagination__icon">
             <use href="/img/icons.svg#icon-arrow-left"></use>
           </svg>
          </button>
        )}

        {[...Array(2)].map((_, i) => {
           const p = i + 1;
           return (
            <button
             key={p}
             className={`pagination__link ${page === p ? 'pagination__link--active' : ''}`}
             onClick={() => setPage(p)}
            >
              {p}
            </button>
           );
        })}
        
        { tours.length === limit && (
          <button
            className="pagination__link"
            onClick={() => {
              if (!isPlaceholderData) {
                setPage((old) => old + 1);
              }
            }}
            disabled={isPlaceholderData}
          >
            <svg className="pagination__icon">
              <use href="/img/icons.svg#icon-arrow-right"></use>
            </svg>
          </button>
        )}
      </div>
    </>
  );
}

export default CardContainer;
