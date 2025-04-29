import axiosApi from "../../../utils/axios";

export const signIn = async (username, password) => {
  if (!username || !password) return false;
  try {
    const response = await axiosApi.post("/admin/auth/signin", {
      username: username,
      password: password,
    });
    console.log("Response", response);
    return response.data;
  } catch (error) {
    console.log("ERROR:", error);
    return null;
  }
};
