import API from "./index";

// Add product to tracklist
export const addToTracklist = async (data: {
  productId: string;
  title: string;
  url: string;
  price: number;
}) => {
  const res = await API.post("/tracklist", data);
  return res.data;
};

// Get user's tracklist
export const getTracklist = async () => {
  const res = await API.get("/tracklist");
  return res.data;
};

// Remove a product from tracklist
export const removeFromTracklist = async (productId: string) => {
  const res = await API.delete(`/tracklist/${productId}`);
  return res.data;
};
