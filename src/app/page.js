"use client";

import { useEffect, useState } from "react";

import { BsArrowCounterclockwise } from "react-icons/bs";
import { Typography, Input, Option, Select } from "@material-tailwind/react";

import { useLanguage } from "../../context/LanguageProvider";
import { getUserList } from "./api/user";
import { getSimplifiedDateTime } from "./helper";
import { useAlert } from "../../context/alertContext";
import { useRouter } from "next/navigation";
import TableLoading from "./components/tableLoading";
import TableNoData from "./components/tableNoData";
import { getActivityLogList } from "./api/activitylog";
import { getRemainBalance } from "./api/service";
import TablePagination from "./components/tablePagination";

const TABLE_HEAD = [
  "编号",
  "用户名",
  "整数",
  "活动类型",
  "每10000个价格",
  "用户消费金额",
  "福利金额",
  "时间",
];

export default function Home() {
  const [userList, setUserList] = useState(null);
  const [activityLogList, setActivityLogList] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [searchDate, setSearchDate] = useState(new Date());
  const [searchUser, setSearchUser] = useState(null);
  const [totalCount, setTotalCount] = useState(0);
  const [balance, setBalance] = useState(0);
  const { t } = useLanguage();
  const { showAlert } = useAlert();
  const router = useRouter();

  const fetchUserList = async () => {
    try {
      setIsLoading(true);
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

  const fetchRemainBalance = async () => {
    try {
      const result = await getRemainBalance();
      console.log("REMAIN BALANCE", result);
      if (result.DATA) setBalance(result.DATA?.balance1);
      else {
        showAlert("Can't get Remain Balance");
        router.push("/login");
      }
    } catch (error) {
      showAlert("Something went wrong.");
    }
  };

  const fetchActivityLogList = async () => {
    try {
      setIsLoading(true);
      const result = await getActivityLogList({
        pageIndex,
        pageSize,
        searchDate,
        searchUser,
      });
      if (result.data && result.success) {
        setActivityLogList(result.data);
        setTotalCount(result.total);
      } else {
        showAlert("unable to get activity logs");
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
    fetchActivityLogList();
  }, [pageIndex, pageSize, searchUser, searchDate]);

  useEffect(() => {
    fetchUserList();
    fetchRemainBalance();
  }, []);

  if (!t) return <p className="text-white">Loading translations...</p>;
  return (
    <div className="w-full h-full bg-white">
      <div className="w-full flex justify-between items-center p-4">
        <Typography variant="h6">仪表板</Typography>
        <div className="flex gap-4">
          <button
            className="flex items-center gap-2"
            onClick={() => fetchActivityLogList()}
          >
            <BsArrowCounterclockwise strokeWidth={1.5} />
            <Typography variant="h6">重新加载</Typography>
          </button>
        </div>
      </div>
      <hr />
      <div className="w-full mt-4 p-4 flex flex-col gap-8">
        <div className="flex justify-between items-center gap-4 md:flex-row">
          <div className="flex gap-4 justify-between">
            <div className="w-full md:w-72">
              {userList && (
                <Select
                  type="date"
                  label="选择用户"
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
                label="选择日期"
                value={searchDate?.toISOString().split("T")[0]}
                onChange={(e) => setSearchDate(new Date(e.target.value))}
              />
            </div>
          </div>
          <div className="flex gap-2 items-end">
            <Typography variant="h5">剩余余额:</Typography>
            <Typography variant="h4" color="red">
              {balance}
            </Typography>
          </div>
        </div>
        <table className="w-full min-w-max table-auto text-left shadow-md">
          <thead>
            <tr>
              {TABLE_HEAD.map((head, index) => (
                <th key={index} className="bg-blue-gray-50/50 p-4">
                  <Typography
                    variant="small"
                    className="flex items-center justify-between  font-bold"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <TableLoading isLoading={isLoading} colSpan={TABLE_HEAD.length} />
            {activityLogList && activityLogList.length != 0
              ? activityLogList.map((row, index) => {
                  return (
                    <tr key={index} className="hover:bg-gray-100">
                      <td>
                        <Typography variant="small" className="p-4">
                          {index + 1}
                        </Typography>
                      </td>
                      <td>
                        <Typography variant="small">{row.username}</Typography>
                      </td>
                      <td>
                        <Typography variant="small">
                          {row.entirenumber}
                        </Typography>
                      </td>
                      <td>
                        <Typography variant="small">{row.type}</Typography>
                      </td>
                      <td>
                        <Typography variant="small">{row.perprice}</Typography>
                      </td>
                      <td>
                        <Typography variant="small">{row.consume}</Typography>
                      </td>
                      <td>
                        <Typography variant="small">{row.benefit}</Typography>
                      </td>
                      <td>
                        <Typography variant="small">
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
  );
}
