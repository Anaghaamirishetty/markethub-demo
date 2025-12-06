import API from "./index";

// Get summary analysis for product
export const getPriceSummary = async (productId: string) => {
  const res = await API.get(`/summary/${productId}`);
  return res.data;
};
