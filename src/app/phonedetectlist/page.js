"use client";

import { Input, Option, Select, Typography } from "@material-tailwind/react";

import { BsArrowCounterclockwise } from "react-icons/bs";
import { useLanguage } from "../../../context/LanguageProvider";
import { useEffect, useState } from "react";
import { phoneDetectList } from "../api/service";
import { getSimplifiedDateTime } from "../helper";
import { useAlert } from "../../../context/alertContext";
import { useRouter } from "next/navigation";
import TableLoading from "../components/tableLoading";
import TableNoData from "../components/tableNoData";
import TablePagination from "../components/tablePagination";
import { getUserList } from "../api/user";

export default function Home() {
  const [detectList, setDetectList] = useState(null);
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [searchDate, setSearchDate] = useState(new Date());
  const [searchUser, setSearchUser] = useState(null);
  const [userList, setUserList] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { t } = useLanguage();
  const { showAlert } = useAlert();
  const router = useRouter();

  const fetchDetectList = async () => {
    try {
      setIsLoading(true);
      const result = await phoneDetectList({
        pageIndex,
        pageSize,
        searchDate,
        searchUser,
      });
      if (result && result.data) {
        setDetectList(result.data);
        setTotalCount(result.total);
      } else {
        showAlert("出了点问题。");
        router.push("/login");
      }
    } catch (error) {
      showAlert("Something went wrong. Try agin");
      router.push("/login");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUserList = async () => {
    setIsLoading(true);
    try {
      const result = await getUserList();
      if (result.data) setUserList(result.data);
      else {
        showAlert("Can't get user list");
        router.push("/login");
      }
    } catch (error) {
      showAlert("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserList();
  }, []);

  useEffect(() => {
    fetchDetectList();
  }, [pageIndex, pageSize, searchDate, searchUser]);

  if (!t) return <p className="text-white">Loading translations...</p>;
  const TABLE_HEAD = [
    t("username"),
    t("taskName"),
    t("fileName"),
    t("screeningTime"),
    t("screeningNumber"),
    t("activatedNumber"),
    t("unregistedNumber"),
  ];
  return (
    <div className="w-full h-full bg-white">
      <div className="w-full flex justify-between items-center p-4">
        <Typography variant="h6">{t("statusDetectionList")}</Typography>
        <button
          className="flex items-center gap-2"
          onClick={() => fetchDetectList()}
        >
          <BsArrowCounterclockwise strokeWidth={1.5} />
          <Typography variant="h6">{t("reload")}</Typography>
        </button>
      </div>
      <hr />
      <div className="w-full mt-4 p-4 flex flex-col gap-12">
        <div className="flex flex-col items-center gap-4 md:flex-row">
          <div className="w-full md:w-72">
            {userList && (
              <Select
                type="date"
                label="Select User"
                onChange={(e) => setSearchUser(e)}
              >
                {/* <Option value={null}>ALL</Option> */}
                {userList.map((user, index) => (
                  <Option key={index} value={user._id}>
                    {user.realname}
                  </Option>
                ))}
              </Select>
            )}
          </div>
          <div className="w-full md:w-72">
            <Input
              type="date"
              label="Select Date"
              value={searchDate?.toISOString().split("T")[0]}
              onChange={(e) => setSearchDate(new Date(e.target.value))}
            />
          </div>
        </div>
        <div className="overflow-x-auto max-h-[400px] overflow-y-auto">
          <table className="w-full table-auto min-w-max text-left ">
            <thead>
              <tr>
                {TABLE_HEAD.map((head, index) => (
                  <th key={index} className="bg-blue-gray-50/50 p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="flex items-center justify-between font-bold"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <TableLoading isLoading={isLoading} colSpan={TABLE_HEAD.length} />
              {detectList && detectList.length !== 0
                ? detectList.map((row, index) => {
                    return (
                      <tr key={index}>
                        <td>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal p-4"
                          >
                            {row.username}
                          </Typography>
                        </td>
                        <td>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal p-4"
                          >
                            {row.taskname}
                          </Typography>
                        </td>
                        <td>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal p-4"
                          >
                            {row.fileurl ?? "处理中..."}
                          </Typography>
                        </td>
                        <td>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal p-4"
                          >
                            {getSimplifiedDateTime(row.createdAt)}
                          </Typography>
                        </td>
                        <td>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal p-4"
                          >
                            {row.entirenumber}
                          </Typography>
                        </td>
                        <td>
                          <Typography
                            variant="small"
                            color="red"
                            className="font-bold p-4"
                          >
                            {row.activenumber != null
                              ? row.activenumber
                              : "处理中..."}
                          </Typography>
                        </td>
                        <td>
                          <Typography
                            variant="small"
                            color="red"
                            className="font-bold p-4"
                          >
                            {row.unregisternumber != null
                              ? row.unregisternumber
                              : "处理中..."}
                          </Typography>
                        </td>
                      </tr>
                    );
                  })
                : !isLoading && <TableNoData colSpan={TABLE_HEAD.length} />}
            </tbody>
          </table>
        </div>
        <TablePagination
          pageIndex={pageIndex}
          pageSize={pageSize}
          totalCount={totalCount}
          setPageIndex={setPageIndex}
        />
      </div>
    </div>
  );
}
