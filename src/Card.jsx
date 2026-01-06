import { useNavigate } from "react-router-dom";
function Card({ data }) {
  const navigate = useNavigate();

  return (
    <>
      <div className="card">
        <div className="card__header">
          <div className="card__picture">
            <div className="card__picture-overlay">&nbsp;</div>
            <img
              className="card__picture-img"
              src={data.imageCover}
              alt={data.name}
            />
          </div>
          <div className="heading-tertirary">
            <span>{data.name}</span>
          </div>
        </div>
        <div className="card__details">
          <h4 className="card__sub-heading">
            {data.difficulty} {data.duration}-day tour
          </h4>
          <p className="card__text">{data.summary}</p>
          <div className="card__data">
            <svg className="card__icon">
              <use href="./img/icons.svg#icon-map-pin"></use>
            </svg>
            <span>{data.startLocation.description}</span>
          </div>
          <div className="card__data">
            <svg className="card__icon">
              <use href="./img/icons.svg#icon-calendar"></use>
            </svg>
            <span>
              {new Date(data.startDates[0]).toLocaleDateString("en-US", {
                month: "short",
                year: "numeric",
              })}
            </span>
          </div>
          <div className="card__data">
            <svg className="card__icon">
              <use href="./img/icons.svg#icon-flag"></use>
            </svg>
            <span>{data.locations.length} stops</span>
          </div>
          <div className="card__data">
            <svg className="card__icon">
              <use href="./img/icons.svg#icon-user"></use>
            </svg>
            <span>{data.maxGroupSize} people</span>
          </div>
        </div>
        <div className="card__footer">
          <p>
            <span className="card__footer-value">${data.price} </span>
            <span className="card__footer-text">per person</span>
          </p>
          <p className="card__ratings">
            <span className="card__footer-value">{data.ratingsAverage} ★ </span>
            <span className="card__footer-text">
              rating ({data.ratingsQuantity})
            </span>
          </p>
          <button
            className="btn btn--green"
            onClick={() => navigate(`/tour/${data.slug}`)}
          >
            Details
          </button>
        </div>
      </div>
    </>
  );
}
export default Card;
