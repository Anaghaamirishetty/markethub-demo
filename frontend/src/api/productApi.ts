import API from "./index";

export const scrapeProduct = async (url: string) => {
  const response = await API.post("/scrape/amazon", { url });
  return response.data;
};
