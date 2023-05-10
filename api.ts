import axios from "axios";
const storeId = "53642";
const apiKey = "wgLNjnE8zLZwPQXFeC7mPcEkdh3ripk5WvemgBFQp2yXzFjvRx";
axios.defaults.baseURL = "https://app.orderdesk.me/api/v2";

export const getHourlyOrders = async () => {
  let allOrders: any[] = [];
  const date = new Date();
  const search_start_date = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    date.getHours(),
    0,
    0
  );
  const search_end_date = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    date.getHours(),
    59,
    59
  );
  let initialTaken = 0;
  const getAllOrders = async (offset = 0, limit = 500) => {
    initialTaken += limit;
    try {
      const { data } = await axios.get("/orders", {
        headers: {
          "ORDERDESK-STORE-ID": storeId,
          "ORDERDESK-API-KEY": apiKey,
          "Content-Type": "application/json",
        },
        params: {
          search_start_date,
          search_end_date,
          limit,
          offset,
        },
      });

      const orders = data.orders;
      allOrders.push(...orders);
      const nextPage = data.total_records > initialTaken;
      const newLimit = offset + limit;
      if (nextPage) {
        await getAllOrders(newLimit, limit);
      }
    } catch (error) {
      console.error("Error retrieving orders:", error);
    }
  };
  await getAllOrders(0, 1);
  return allOrders;
};
