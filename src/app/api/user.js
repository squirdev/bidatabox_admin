import axiosApi from "../../../utils/axios";

export const createUser = async (
  userName,
  password,
  realName,
  tgCost,
  wsCost,
  phoneStatusCost
) => {
  try {
    await axiosApi.post("/admin/user/createUser", {
      username: userName,
      password: password,
      realname: realName,
      tgCost: tgCost,
      wsCost: wsCost,
      phoneCost: phoneStatusCost,
    });
    return true;
  } catch (error) {
    return false;
  }
};

export const updateUser = async (
  userId,
  userName,
  password,
  realName,
  tgCost,
  wsCost,
  phoneStatusCost
) => {
  try {
    await axiosApi.post("/admin/user/updateUser", {
      id: userId,
      username: userName,
      password: password,
      realname: realName,
      tgCost: tgCost,
      wsCost: wsCost,
      phoneCost: phoneStatusCost,
    });
    return true;
  } catch (error) {
    return false;
  }
};

export const chargeUser = async (userId, username, amount) => {
  try {
    await axiosApi.post("/admin/user/chargeUser", {
      id: userId,
      amount: amount,
      username: username,
    });
    return true;
  } catch (error) {
    return false;
  }
};

export const updateUserActive = async (userId, newStatus) => {
  try {
    await axiosApi.post("/admin/user/updateUserActive", {
      id: userId,
      status: newStatus,
    });
    return true;
  } catch (error) {
    return false;
  }
};

export const getUserList = async () => {
  try {
    const response = await axiosApi.get("/admin/user/getUserList");
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log("errror", error);
    return null;
  }
};
