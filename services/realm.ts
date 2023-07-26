/* eslint-disable no-restricted-syntax */
import { NEXT_PUBLIC_KEYCLOAK_REALM } from "config";
import { handleErrorThrow } from "shared/utils/shareFunction";
import api from "./api";

const realmBaseURL = `auth/${NEXT_PUBLIC_KEYCLOAK_REALM}`;

export const getRealm = async () => {
  const getCurrentRealm =
    typeof window !== "undefined" && window.localStorage.getItem("realm");
  const response = await api
    .get(`${`auth/${getCurrentRealm}` || realmBaseURL}`)
    .catch(() => {
      throw new Error("Realm Error in getRealm");
    });

  return response?.data;
};

export default getRealm;

export const updateRealm = async (payload: any) => {
  const response = await api.put(`${realmBaseURL}`, payload).catch((error) => {
    handleErrorThrow(error);
  });

  return response?.data;
};

export const createRealm = async (body: any) => {
  const response = await api.post(`${realmBaseURL}`, { ...body }).catch(() => {
    throw new Error("Realm Error in getRealm");
  });

  return response?.data;
};

export const uploadMedia = async (media: any) => {
  const body = new FormData();
  body.append("imageFile", media);
  const response = await api.post(`/post/medias`, body, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  if (response?.status !== 200) {
    throw new Error("[post] error in uploadMedia");
  }

  return response.data;
};
