"use client";

import { Input, Option, Select, Typography } from "@material-tailwind/react";

import { BsArrowCounterclockwise } from "react-icons/bs";
import { useLanguage } from "../../../context/LanguageProvider";
import { useEffect, useState } from "react";
import { chageLogList, phoneDetectList } from "../api/service";
import { getSimplifiedDateTime } from "../helper";
import { useAlert } from "../../../context/alertContext";
import { useRouter } from "next/navigation";
import TableLoading from "../components/tableLoading";
import TableNoData from "../components/tableNoData";
import TablePagination from "../components/tablePagination";
import { getUserList } from "../api/user";

export default function Home() {
  const [chargeLogList, setChargeLogList] = useState(null);
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

  const fetchChargeLogList = async () => {
    setIsLoading(true);
    const result = await chageLogList({
      pageIndex,
      pageSize,
      searchDate,
      searchUser,
    });
    if (result && result.data) {
      setChargeLogList(result.data);
      setTotalCount(result.total);
    } else {
      showAlert("出了点问题。");
      router.push("/login");
    }
    setIsLoading(false);
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
      router.push("/login");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserList();
  }, []);

  useEffect(() => {
    fetchChargeLogList();
  }, [pageIndex, pageSize, searchDate, searchUser]);

  if (!t) return <p className="text-white">Loading translations...</p>;
  const TABLE_HEAD = ["No", "User Name", "Amount", "Charge Date"];
  return (
    <div className="w-full h-full bg-white">
      <div className="w-full flex justify-between items-center p-4">
        <Typography variant="h6">User Charge Logs</Typography>
        <button
          className="flex items-center gap-2"
          onClick={() => fetchChargeLogList()}
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
              {chargeLogList && chargeLogList.length !== 0
                ? chargeLogList.map((row, index) => {
                    return (
                      <tr key={index}>
                        <td>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal p-4"
                          >
                            {index + 1}
                          </Typography>
                        </td>
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
                            {row.amount}
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
