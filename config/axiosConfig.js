import * as axios from "axios";
import { NEXT_PUBLIC_BASE_URL } from "./index";


const axiosClient = axios.create();

axiosClient.defaults.baseURL =NEXT_PUBLIC_BASE_URL;

export default axiosClient;
