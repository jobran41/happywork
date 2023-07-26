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
export const getVaccinationList = async (params: any) => {
  //   if (params.localSearch === "") {
  const response = await axiosClient
    .get(`/api/v1/bebe/tunisdb/vaccination`)
    .catch((error) => {
      throw new error({
        name: "vaccination",
        status: 502,
        code: "cannot_get_vaccination",
        message: "cannot GET vaccination data",
        debugMessage: `[vaccination] Error in getVaccinationList. ${error}`,
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
 * @returns vaccination informations
 */
export const getVaccinationById = async (
  id: string | undefined,
  ...params: any
) => {

  const response = await axiosClient
    .get(`/api/v1/bebe/tunisdb/vaccination/${id}`)
    .catch((error) => {
      throw new error({
        name: "vaccination",
        status: 502,
        code: "cannot_get_vaccination",
        message: "cannot GET vaccination data",
        debugMessage: `[Pregnancy] Error in getVaccinationById. ${error}`,
        error,
      });
    });

  return response?.data;
};
