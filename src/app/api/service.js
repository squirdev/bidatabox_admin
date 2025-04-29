import axiosApi from "../../../utils/axios";

export const uploadRequest = async ({ taskName, countryCode, file }) => {
  try {
    const formData = new FormData();
    formData.append("file", file); // assuming selectedFile is a File object
    formData.append("taskName", taskName);
    formData.append("countryCode", countryCode);
    const response = await axiosApi.post("/service/phoneUpload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    return null;
  }
};

export const uploadSocialRequest = async ({
  file,
  social,
  taskName,
  activeDay,
  countryCode,
}) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("social", social);
    formData.append("taskName", taskName);
    formData.append("activeDay", activeDay);
    formData.append("countryCode", countryCode);
    const response = await axiosApi.post("/service/socialUpload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    return null;
  }
};

export const phoneDetectList = async ({
  pageIndex,
  pageSize,
  searchDate,
  searchUser,
}) => {
  if (pageIndex == null || pageSize == null) return null;
  try {
    const response = await axiosApi.post("/admin/service/phone-detect-list", {
      pageIndex,
      pageSize,
      searchDate,
      searchUser,
    });
    console.log("Response", response);
    return response.data;
  } catch (error) {
    console.log("ERROR:", error);
    return null;
  }
};

export const socialDetectList = async ({
  pageIndex,
  pageSize,
  searchUser,
  searchDate,
  searchType,
}) => {
  if (pageIndex == null || pageSize == null) return null;
  try {
    const response = await axiosApi.post("/admin/service/social-detect-list", {
      pageIndex,
      pageSize,
      searchUser,
      searchDate,
      searchType,
    });
    console.log("Response", response);
    return response.data;
  } catch (error) {
    console.log("ERROR:", error);
    return null;
  }
};

export const chageLogList = async ({
  pageIndex,
  pageSize,
  searchDate,
  searchUser,
}) => {
  if (pageIndex == null || pageSize == null) return null;
  try {
    const response = await axiosApi.post("/admin/service/charge-log-list", {
      pageIndex,
      pageSize,
      searchDate,
      searchUser,
    });
    console.log("Response", response);
    return response.data;
  } catch (error) {
    console.log("ERROR:", error);
    return null;
  }
};

export const phoneDeleteRow = async ({ id }) => {
  if (!id) return null;
  try {
    const response = await axiosApi.post("/service/phone-delete-row", {
      id,
    });
    console.log("REsponse", response);
    return response.data;
  } catch (error) {
    console.log("ERROR:", error);
    return null;
  }
};

export const socialDeleteRow = async ({ id }) => {
  if (!id) return null;
  try {
    const response = await axiosApi.post("/service/social-delete-row", {
      id,
    });
    console.log("REsponse", response);
    return response.data;
  } catch (error) {
    console.log("ERROR:", error);
    return null;
  }
};

export const getRemainBalance = async () => {
  try {
    const response = await axiosApi.get("/admin/service/get-balance");
    console.log("Response", response);
    return response.data;
  } catch (error) {
    console.log("ERROR:", error);
    return null;
  }
};
