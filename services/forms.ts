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
export const getPregancyList = async (params: any) => {
  //   if (params.localSearch === "") {
  const response = await axiosClient
    .get(`/api/v1/bebe/babycenter2/pregnacy`)
    .catch((error) => {
      throw new error({
        name: "advice",
        status: 502,
        code: "cannot_get_advice",
        message: "cannot GET advice data",
        debugMessage: `[advice] Error in getPosts. ${error}`,
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
export const getPregnancyById = async (
  id: string | undefined,
  ...params: any
) => {
  console.log("ididididididid", id);

  const response = await axiosClient
    .get(`/api/v1/bebe/babycenter2/pregnacy/${id}`)
    .catch((error) => {
      throw new error({
        name: "Pregnancy",
        status: 502,
        code: "cannot_get_Pregnancy",
        message: "cannot GET Pregnancy data",
        debugMessage: `[Pregnancy] Error in getPregnancyById. ${error}`,
        error,
      });
    });

  return response?.data;
};

export const deletePostById = async (
  id: string | undefined,
  ...params: any
) => {
  console.log("wass", id);
  const response = await axios
    .delete(`https://key.zone4food.com/api/v1/bebe/babycenter2/pregnacy/${id}`)
    .catch(() => {
      throw new Error("Posts Error in deletePostById");
    });

  console.log(response, "response");
  // const response = await api
  //   .get(`${postsBaseURL}/p/${id}`, { params })
  //   .catch(() => {
  //     throw new Error("Messages By Id Error in getPostsById");
  //   });
  // return response?.data?.list;
};
/**
 *
 * @param data : Pregancy informations
 */
export const createPregnacy = async (data: any) => {
  const result = await axiosClient
    .post("/api/v1/bebe/babycenter2/pregnacy", data)
    .catch((error) => {
      throw new error({
        name: "Pregnacy",
        status: 502,
        code: "cannot_add_Pregnacy ",
        message: "cannot POST Pregnacy  data",
        debugMessage: `[Pregnacy] Error in createPregnacy.${error}`,
        error,
      });
    });

  return result;
};
/**
 * 
 * @param data 
 * @returns data of updated pregancy
 */
export const updatePregancy = async (data: any) => {
  console.log("datadatadatadata", data);
  const result = await axiosClient
    .put(`/api/v1/bebe/babycenter2/pregnacy/${data.id}`, {
      start_date: data.start_date,
      due_date: data.due_date,
    })
    .catch(() => {
      throw new Error("updatePost Error in updatePost");
    });

  return result;
};
