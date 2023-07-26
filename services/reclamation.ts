import axios from "axios";
import api from "./api";
import axiosClient from "../config/axiosConfig";

let realm: any = null;

if (typeof window !== "undefined") {
  realm = localStorage.getItem("realm");
}
const postsBaseURL = `post/${realm}/posts`;
/**
 *
 * @param params
 * @returns
 */
export const getAppointmentList = async (params: any) => {
  //   if (params.localSearch === "") {
  const response = await axiosClient
    .get(`/api/v1/bebe/tunisdb/appointment`)
    .catch((error) => {
      throw new error({
        name: "Appointment",
        status: 502,
        code: "cannot_get_Appointment",
        message: "cannot GET Appointment data",
        debugMessage: `[advice] Error in getAppointmentList. ${error}`,
        error,
      });
    });

  return {
    rowsLength: response.data.result.data.length,
    data: response.data.result.data,
  };

  //   response = await api
  //     .get(`${postsBaseURL}/q?search=${params.localSearch}`)
  //     .catch(() => {
  //       throw new Error("Posts Error in getPosts");
  //     });

  //   const dataList = { list: response.data.tweets };

  //   return {
  //     rowsLength: response?.data.countDocument,

  //     ...dataList,
  //   };
  // };

  // export const searchPosts = async (params: any) => {
  //   const response = await api
  //     .get(`${postsBaseURL}/q?search${params.search}`)
  //     .catch(() => {
  //       throw new Error("Posts Error in getPosts");
  //     });

  //   return {
  //     rowsLength: response?.data.countDocument,
  //     ...response?.data,
  //   };
};
/**
 *
 * @param id
 * @param params
 * @returns Pregnancy informations
 */
export const getAppointmentById = async (
  id: string | undefined,
  ...params: any
) => {
  console.log("ididididididid", id);

  const response = await axiosClient
    .get(`/api/v1/bebe/tunisdb/appointment/${id}`)
    .catch((error) => {
      throw new error({
        name: "Appointment",
        status: 502,
        code: "cannot_get_Appointment",
        message: "cannot GET Appointment data",
        debugMessage: `[Appointment] Error in getAppointmentById. ${error}`,
        error,
      });
    });

  return response?.data;
};
