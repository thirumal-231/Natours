import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Mapbox from "./Mapbox";
import api from "./api/axios";

function Tour() {
  const { slug } = useParams();
  const [tour, setTour] = useState(null);

  useEffect(() => {
    api
      .get(`/api/v1/tours/slug/${slug}`, {
        withCredentials: true,
      })
      .then((res) => {
        const foundTour = res.data.data.tour;
        console.log(foundTour);
        setTour(foundTour);
      })
      .catch((err) => console.log(err));
  }, [slug]);

  if (!tour) {
    return (
      <section className="section-header">
        <h2 style={{ textAlign: "center" }}>Loading tour details...</h2>
      </section>
    );
  }

  return (
    <>
      {/* HEADER SECTION */}
      <section className="section-header">
        <div className="header__hero">
          <div className="header__hero-overlay">&nbsp;</div>
          <img
            className="header__hero-img"
            src={`/img/tours/${tour.imageCover}`}
            alt={tour.name}
          />
        </div>

        <div className="heading-box">
          <h1 className="heading-primary">
            <span>{tour.name} tour</span>
          </h1>

          <div className="heading-box__group">
            <div className="heading-box__detail">
              <svg className="heading-box__icon">
                <use href="/img/icons.svg#icon-clock"></use>
              </svg>
              <span className="heading-box__text">{tour.duration} days</span>
            </div>

            <div className="heading-box__detail">
              <svg className="heading-box__icon">
                <use href="/img/icons.svg#icon-map-pin"></use>
              </svg>
              <span className="heading-box__text">
                {/* {tour.startLocation.description} */}
              </span>
            </div>
          </div>
        </div>
      </section>
      {/* DESCRIPTION SECTION */}
      <section className="section-description">
        <div className="overview-box">
          <div>
            <div className="overview-box__group">
              <h2 className="heading-secondary ma-bt-lg">Quick facts</h2>

              <div className="overview-box__detail">
                <svg className="overview-box__icon">
                  <use href="/img/icons.svg#icon-calendar"></use>
                </svg>
                <span className="overview-box__label">Next date</span>
                <span className="overview-box__text">
                  {new Date(tour.startDates[0]).toLocaleDateString("en-US", {
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </div>

              <div className="overview-box__detail">
                <svg className="overview-box__icon">
                  <use href="/img/icons.svg#icon-trending-up"></use>
                </svg>
                <span className="overview-box__label">Difficulty</span>
                <span className="overview-box__text">{tour.difficulty}</span>
              </div>

              <div className="overview-box__detail">
                <svg className="overview-box__icon">
                  <use href="/img/icons.svg#icon-user"></use>
                </svg>
                <span className="overview-box__label">Participants</span>
                <span className="overview-box__text">
                  {tour.maxGroupSize} people
                </span>
              </div>

              <div className="overview-box__detail">
                <svg className="overview-box__icon">
                  <use href="/img/icons.svg#icon-star"></use>
                </svg>
                <span className="overview-box__label">Rating</span>
                <span className="overview-box__text">
                  {tour.ratingsAverage}/5
                </span>
              </div>
            </div>

            <div className="overview-box__group">
              <h2 className="heading-secondary ma-bt-lg">Your tour guides</h2>

              {tour.guides?.map((guide) => (
                <div className="overview-box__detail" key={guide._id}>
                  <img
                    className="overview-box__img"
                    src={`/img/users/${guide.photo}`}
                    alt={guide.name}
                  />
                  <span className="overview-box__label">
                    {guide.role === "lead-guide" ? "Lead guide" : "Guide"}
                  </span>
                  <span className="overview-box__text">{guide.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="description-box">
          <h2 className="heading-secondary ma-bt-lg">
            About the {tour.name} tour
          </h2>
          <p className="description__text">{tour.description}</p>
        </div>
      </section>

      {/* PICTURES SECTION */}
      <section
        className="section-pictures"
        style={{
          padding: "5rem 0",
          background: "linear-gradient(to right bottom, #7dd56f, #28b487)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            flexWrap: "wrap",
          }}
        >
          <div style={{ flex: "1 1 30%", maxWidth: "30%" }}>
            <img
              src={`/img/tours/${tour.images[0]}`}
              alt={`${tour.name} 1`}
              style={{
                width: "100%",
                height: "auto",
                borderRadius: "8px",
                objectFit: "cover",
              }}
            />
          </div>
          <div style={{ flex: "1 1 30%", maxWidth: "30%" }}>
            <img
              src={`/img/tours/${tour.images[1]}`}
              alt={`${tour.name} 2`}
              style={{
                width: "100%",
                height: "auto",
                borderRadius: "8px",
                objectFit: "cover",
              }}
            />
          </div>
          <div style={{ flex: "1 1 30%", maxWidth: "30%" }}>
            <img
              src={`/img/tours/${tour.images[2]}`}
              alt={`${tour.name} 3`}
              style={{
                width: "100%",
                height: "auto",
                borderRadius: "8px",
                objectFit: "cover",
              }}
            />
          </div>
        </div>
      </section>

      <Mapbox locations={tour.locations} />

      {/* REVIEWS SECTION */}
      <section className="section-reviews">
        <div className="reviews">
          {/* Review 1 */}
          <div className="reviews__card">
            <div className="reviews__avatar">
              <img
                className="reviews__avatar-img"
                src="/img/users/user-2.jpg"
                alt="Lourdes Browning"
              />
              <h6 className="reviews__user">Lourdes Browning</h6>
            </div>
            <p className="reviews__text">
              Cras mollis nisi parturient mi nec aliquet suspendisse sagittis
              eros condimentum scelerisque taciti mattis praesent feugiat eu
              nascetur a tincidunt
            </p>
            <div className="reviews__rating">
              {[1, 2, 3, 4, 5].map((i) => (
                <svg key={i} className="reviews__star reviews__star--active">
                  <use href="/img/icons.svg#icon-star"></use>
                </svg>
              ))}
            </div>
          </div>

          {/* Review 2 */}
          <div className="reviews__card">
            <div className="reviews__avatar">
              <img
                className="reviews__avatar-img"
                src="/img/users/user-3.jpg"
                alt="Sophie Louise Hart"
              />
              <h6 className="reviews__user">Sophie Louise Hart</h6>
            </div>
            <p className="reviews__text">
              Pulvinar taciti etiam aenean lacinia natoque interdum fringilla
              suspendisse nam sapien urna!
            </p>
            <div className="reviews__rating">
              {[1, 2, 3, 4].map((i) => (
                <svg key={i} className="reviews__star reviews__star--active">
                  <use href="/img/icons.svg#icon-star"></use>
                </svg>
              ))}
              <svg className="reviews__star reviews__star--inactive">
                <use href="/img/icons.svg#icon-star"></use>
              </svg>
            </div>
          </div>

          {/* Review 3 */}
          <div className="reviews__card">
            <div className="reviews__avatar">
              <img
                className="reviews__avatar-img"
                src="/img/users/user-9.jpg"
                alt="Cristian Vega"
              />
              <h6 className="reviews__user">Cristian Vega</h6>
            </div>
            <p className="reviews__text">
              Sem feugiat sed lorem vel dignissim platea habitasse dolor
              suscipit ultricies dapibus
            </p>
            <div className="reviews__rating">
              {[1, 2, 3, 4, 5].map((i) => (
                <svg key={i} className="reviews__star reviews__star--active">
                  <use href="/img/icons.svg#icon-star"></use>
                </svg>
              ))}
            </div>
          </div>

          {/* Review 4 */}
          <div className="reviews__card">
            <div className="reviews__avatar">
              <img
                className="reviews__avatar-img"
                src="/img/users/user-14.jpg"
                alt="Laura Sarah Wilson"
              />
              <h6 className="reviews__user">Laura Sarah Wilson</h6>
            </div>
            <p className="reviews__text">
              Blandit varius nascetur est felis praesent lorem himenaeos pretium
              dapibus tellus bibendum consequat ac duis
            </p>
            <div className="reviews__rating">
              {[1, 2, 3, 4, 5].map((i) => (
                <svg key={i} className="reviews__star reviews__star--active">
                  <use href="/img/icons.svg#icon-star"></use>
                </svg>
              ))}
            </div>
          </div>

          {/* Review 5 */}
          <div className="reviews__card">
            <div className="reviews__avatar">
              <img
                className="reviews__avatar-img"
                src="/img/users/user-15.jpg"
                alt="Max Smith"
              />
              <h6 className="reviews__user">Max Smith</h6>
            </div>
            <p className="reviews__text">
              Tempor pellentesque eu placerat auctor enim nam suscipit tincidunt
              natoque ipsum est.
            </p>
            <div className="reviews__rating">
              {[1, 2, 3, 4, 5].map((i) => (
                <svg key={i} className="reviews__star reviews__star--active">
                  <use href="/img/icons.svg#icon-star"></use>
                </svg>
              ))}
            </div>
          </div>

          {/* Review 6 */}
          <div className="reviews__card">
            <div className="reviews__avatar">
              <img
                className="reviews__avatar-img"
                src="/img/users/user-19.jpg"
                alt="John Riley"
              />
              <h6 className="reviews__user">John Riley</h6>
            </div>
            <p className="reviews__text">
              Magna magnis tellus dui vivamus donec placerat vehicula erat
              turpis
            </p>
            <div className="reviews__rating">
              {[1, 2, 3, 4, 5].map((i) => (
                <svg key={i} className="reviews__star reviews__star--active">
                  <use href="/img/icons.svg#icon-star"></use>
                </svg>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="section-cta">
        <div className="cta">
          {/* Logo */}
          <div className="cta__img cta__img--logo">
            <img src="/img/logo-white.png" alt="Natours logo" />
          </div>

          {/* Background Images */}

          <img
            className="cta__img cta__img--1"
            src={`/img/tours/${tour.images[1]}`}
            alt={tour.name}
          />
          <img
            className="cta__img cta__img--2"
            src={`/img/tours/${tour.images[0]}`}
            alt={tour.name}
          />

          {/* Content */}
          <div className="cta__content">
            <h2 className="heading-secondary">What are you waiting for?</h2>
            <p className="cta__text">
              7 days. 1 adventure. Infinite memories. Make it yours today!
            </p>
            <a className="btn btn--green span-all-rows" href="/login">
              Log in to book tour
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

export default Tour;
