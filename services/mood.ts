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
export const getBabyList = async (params: any) => {
  //   if (params.localSearch === "") {
  const response = await axiosClient
    .get(`/api/v1/bebe/babycenter2/baby`)
    .catch((error) => {
      throw new error({
        name: "Baby",
        status: 502,
        code: "cannot_get_Baby",
        message: "cannot GET Baby data",
        debugMessage: `[advice] Error in getBabyList. ${error}`,
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
 * @returns Baby informations
 */
export const getBabyById = async (
  id: string | undefined,
  ...params: any
) => {
  console.log("ididididididid", id);

  const response = await axiosClient
    .get(`/api/v1/bebe/babycenter2/baby/${id}`)
    .catch((error) => {
      throw new error({
        name: "Baby",
        status: 502,
        code: "cannot_get_Baby",
        message: "cannot GET Baby data",
        debugMessage: `[Baby] Error in getBabyById. ${error}`,
        error,
      });
    });

  return response?.data;
};
