// utils/sslcommerz.js
import axios from "axios";

export const sslcommerzInit = async (data) => {
  const url = data.is_live
    ? "https://securepay.sslcommerz.com/gwprocess/v4/api.php"
    : "https://sandbox.sslcommerz.com/gwprocess/v4/api.php";

  const response = await axios.post(url, data);
  return response.data;
};
