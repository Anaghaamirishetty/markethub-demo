import API from "./index";

// Create price alert
export const createAlert = async (data: {
  productId: string;
  targetPrice: number;
  email?: string;
}) => {
  const res = await API.post("/alerts", data);
  return res.data;
};

// Get all alerts for logged-in user
export const getAlerts = async () => {
  const res = await API.get("/alerts");
  return res.data;
};
