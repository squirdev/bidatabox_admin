import axiosApi from "../../../utils/axios";

export const getActivityLogList = async ({
  pageIndex,
  pageSize,
  searchDate,
  searchUser,
}) => {
  try {
    const response = await axiosApi.post("/admin/log/getActivityLogList", {
      pageIndex,
      pageSize,
      searchDate,
      searchUser,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log("errror", error);
    return null;
  }
};
