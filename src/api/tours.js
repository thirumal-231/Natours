import api from "./axios";

export const getAllTours = async () => {
  const res = await api.get("/api/v1/tours");
  return res.data.data.docs;
};

export const getTour = async (slug) => {
  const res = await api.get(`/api/v1/tours/slug/${slug}`);
  return res.data.data.tour;
};

export const getAllBookedTours = async () => {
  const res = await api.get(`/api/v1/bookings/my-tours`, {
    withCredentials: true,
  });
  return res.data.data.tours;
};
