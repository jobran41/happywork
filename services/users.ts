/* eslint-disable no-restricted-syntax */
import { NEXT_PUBLIC_KEYCLOAK_REALM } from "config";
import { merchantType } from "shared/models";
import { handleErrorThrow } from "shared/utils/shareFunction";
import api from "./api";

const usersBaseURL = `auth/${NEXT_PUBLIC_KEYCLOAK_REALM}/user`;

export const getUsers = async (params: any) => {
  const response = await api
    .get(`${usersBaseURL}?search=${params.localSearch}`, { params })
    .catch(() => {
      throw new Error("User Error in getUsers");
    });
  console.log("responseresponse", response.data);
  return {
    content: response?.data,
    rowsLength: response?.data.count,
  };
};
export default getUsers;

export const getUserById = async (id: string | undefined) => {
  const response = await api.get(`${usersBaseURL}/${id}`).catch(() => {
    throw new Error("User By Id Error in getUserById");
  });

  return response?.data;
};
export const createUser = async (payload: merchantType) => {
  const response = await api.post(`${usersBaseURL}`, payload).catch((error) => {
    handleErrorThrow(error);
  });

  return response?.data;
};
export const updateUser = async (payload: merchantType) => {
  console.log("userId2", payload);

  const response = await api
    .put(`${usersBaseURL}/${payload.id}`, { enabled: payload.enabled })
    .catch((error) => {
      handleErrorThrow(error);
    });

  return response?.data;
};
