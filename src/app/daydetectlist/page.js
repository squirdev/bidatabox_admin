"use client";

import {
  Button,
  IconButton,
  Input,
  Option,
  Select,
  Spinner,
  Tooltip,
  Typography,
} from "@material-tailwind/react";
import { useSelector } from "react-redux";

import { BsArrowCounterclockwise, BsDownload } from "react-icons/bs";
import { AiFillDelete } from "react-icons/ai";
import { useLanguage } from "../../../context/LanguageProvider";
import { useEffect, useState } from "react";
import { socialDeleteRow, socialDetectList } from "../api/service";
import { getSimplifiedDateTime } from "../helper";
import Link from "next/link";
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
  const [searchType, setSearchType] = useState("TG");
  const [userList, setUserList] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { isAuth } = useSelector((state) => state.auth);
  const { t } = useLanguage();
  const { showAlert } = useAlert();
  const router = useRouter();

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

  const fetchDetectList = async () => {
    setIsLoading(true);
    const result = await socialDetectList({
      pageIndex: pageIndex,
      pageSize: pageSize,
      searchUser: searchUser,
      searchDate: searchDate,
      searchType: searchType,
    });
    if (result && result.data) {
      setDetectList(result.data);
      setTotalCount(result.total);
    } else {
      showAlert("出了点问题。");
      // router.push("/login");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchDetectList();
  }, [pageIndex, pageSize, searchDate, searchUser, searchType]);

  if (!t) return <p className="text-white">Loading translations...</p>;
  const TABLE_HEAD = [
    t("username"),
    t("taskName"),
    t("screeningTime"),
    t("where"),
    t("type"),
    t("screeningNumber"),
    t("validNumber"),
    t("activatedNumber"),
    t("unknownNumber"),
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
          <div className="w-full md:w-72">
            <Select
              type="date"
              label="Select Detect Type(TG or WS)"
              onChange={(e) => setSearchType(e)}
            >
              <Option value="TG">Telegram</Option>
              <Option value="WS">Whatsapp</Option>
            </Select>
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
              {detectList && detectList.length !== 0 ? (
                detectList.map((row, index) => {
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
                          {getSimplifiedDateTime(row.createdAt)}
                        </Typography>
                      </td>
                      <td>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal p-4"
                        >
                          {row.activeday}
                        </Typography>
                      </td>
                      <td>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal p-4"
                        >
                          {row.type}
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
                      <td className="flex justify-center">
                        <Typography
                          variant="small"
                          color="red"
                          className="font-bold py-3"
                        >
                          {row.validnumber != null
                            ? row.validnumber
                            : "处理中..."}
                        </Typography>
                      </td>
                      <td>
                        <Typography
                          variant="small"
                          color="red"
                          className="font-bold p-4"
                        >
                          {row.activatednumber != null
                            ? row.activatednumber
                            : "处理中..."}
                        </Typography>
                      </td>
                      <td>
                        <Typography
                          variant="small"
                          color="red"
                          className="font-bold p-4"
                        >
                          {row.unknownnumber != null
                            ? row.unknownnumber
                            : "处理中..."}
                        </Typography>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <TableNoData colSpan={TABLE_HEAD.length} />
              )}
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
