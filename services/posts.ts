import axiosClient from "../config/axiosConfig";

let realm: any = null;

if (typeof window !== "undefined") {
  realm = localStorage.getItem("realm");
}
/**
 *
 *
 * @returns list of advices and the length of the array
 */
export const getPosts = async () => {
  //   if (params.localSearch === "") {
  const response = await axiosClient
    .get(`/api/v1/bebe/tunisdb/advice`)
    .catch(
      (
        error: new (arg0: {
          name: string;
          status: number;
          code: string;
          message: string;
          debugMessage: string;
          error: any;
        }) => any
      ) => {
        throw new error({
          name: "advice",
          status: 502,
          code: "cannot_get_advice",
          message: "cannot GET advice data",
          debugMessage: `[advice] Error in getPosts. ${error}`,
          error,
        });
      }
    );

  return {
    rowsLength: response.data.result.data.length,
    data: response.data.result.data,
  };
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

/**
 *
 * @param data
 * @returns
 */
export const getPostsById = async (id: string | undefined, ...params: any) => {
  const response = await axiosClient
    .get(`/api/v1/bebe/tunisdb/advice/${id}`)
    .catch(
      (
        error: new (arg0: {
          name: string;
          status: number;
          code: string;
          message: string;
          debugMessage: string;
          error: any;
        }) => any
      ) => {
        throw new error({
          name: "advice",
          status: 502,
          code: "cannot_get_advice",
          message: "cannot GET advice data",
          debugMessage: `[advice] Error in getPostsById. ${error}`,
          error,
        });
      }
    );
  return response?.data;
};
/**
 *
 * @param id
 * @returns data of the deleted advice
 */
export const deleteAdviceById = async (id: string | undefined) => {
  const response = await axiosClient
    .delete(`/api/v1/bebe/tunisdb/advice/${id}`)
    .catch(
      (
        error: new (arg0: {
          name: string;
          status: number;
          code: string;
          message: string;
          debugMessage: string;
          error: any;
        }) => any
      ) => {
        throw new error({
          name: "advice",
          status: 502,
          code: "cannot_get_advice",
          message: "cannot GET advice data",
          debugMessage: `[advice] Error in getPostsById. ${error}`,
          error,
        });
      }
    );

  return response;
};
/**
 *
 * @param data
 * @returns data of the updated advice
 */
export const updateAdvice = async (data: any) => {
  const response = await axiosClient
    .put(`/api/v1/bebe/tunisdb/advice/${data.id}`, {
      title: data.title,
      description: data.description,
      category: data.category,
      type: data.type,
      week: data.week,
      user_id: 1,
    })
    .catch((error: any) => {
      throw new Error({
        name: "advice",
        status: 502,
        code: "cannot_add_advice",
        message: "cannot PUT advice data",
        debugMessage: `[course] Error in  updateAdvice.${error}`,
        error,
      });
    });

  return response;
};
/**
 *
 * @param data : advice informations
 * @returns data of the created Advice
 */
export const CreateAdvice = async (data: any) => {
  console.log("payload", data);
  const result = await axiosClient
    .post("/api/v1/bebe/tunisdb/advice", data)
    .catch((error: any) => {
      throw new Error({
        name: "advice",
        status: 502,
        code: "cannot_add_advice",
        message: "cannot POST advice data",
        debugMessage: `[course] Error in  CreateAdvice.${error}`,
        error,
      });
    });

  return result;
};
/**
 *
 * @param data : advice informations
 * @returns data of the created Advice
 */
export const CreateDocument = async (data: any) => {
  try {
    console.log("payload", data);
    const result = await axiosClient.post(
      "/api/v1/bebe/tunisdb/advice",
      data
    );
    return result.data;
  } catch (error) {
    throw new Error({
      name: "advice",
      status: 502,
      code: "cannot_add_advice",
      message: "cannot POST advice data",
      debugMessage: `[course] Error in  CreateAdvice.${error}`,
      error,
    });
  }
};
