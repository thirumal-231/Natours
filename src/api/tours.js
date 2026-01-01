import api from "./axios";

export const getAllTours = async (page = 1, limit = 6) => {
  const res = await api.get(`/api/v1/tours?page=${page}&limit=${limit}`);
  return res.data;
};

export const getTour = async (slug) => {
  const res = await api.get(`/api/v1/tours/slug/${slug}`);
  return res.data.data.tour;
};
