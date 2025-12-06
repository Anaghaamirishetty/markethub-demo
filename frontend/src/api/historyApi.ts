import API from "./index";

// Get price history for any product
export const getPriceHistory = async (productId: string) => {
  const res = await API.get(`/prices/${productId}`);
  return res.data;
};
