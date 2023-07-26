import axios from "axios";
import Cookies from "js-cookie";
import { NEXT_PUBLIC_BASE_URL } from "config";

const baseURL = `${NEXT_PUBLIC_BASE_URL}/api/v1`;

const apiLocal = axios.create({ baseURL });
apiLocal.interceptors.request.use(async (config) => {
  const token = Cookies.get("jwt");
  const headers = { ...config.headers };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return { ...config, headers };
});

export default apiLocal;
