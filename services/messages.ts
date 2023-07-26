import api from "./api";

const messagesBaseURL = "message";

export const getMessages = async (params: any) => {
  const response = await api
    .get(`${messagesBaseURL}/all`, { params })
    .catch(() => {
      throw new Error("Messages Error in getMessages");
    });

  return {
    content: response?.data.userMessages,
    rowsLength: response?.data.count,
  };
};
export default getMessages;

export const getMessagesById = async (
  sender: string | undefined,
  receiver: string | undefined,
  ...params: any
) => {
  const response = await api
    .get(`${messagesBaseURL}/${sender}`, {
      params,
    })
    .catch(() => {
      throw new Error("Messages By Id Error in getMessagesById");
    });

  const data = response?.data.userMessages
    .filter((e: any) => e.users[0] === sender && e.users[1] === receiver)[0]
    // eslint-disable-next-line no-underscore-dangle
    .messages.map((e: any) => ({ ...e, id: e?._id }));

  return {
    content: data,
    rowsLength: data.length,
  };
};
