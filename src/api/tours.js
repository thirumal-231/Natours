import api from "./axios";

export const getAllTours = async () => {
  const res = await api.get("/api/v1/tours");
  return res.data.data.docs;
};

export const getTour = async (slug) => {
  const res = await api.get(`/api/v1/tours/slug/${slug}`);
  return res.data.data.tour;
};
