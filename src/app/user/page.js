"use client";

import { useEffect, useState } from "react";

import { BsArrowCounterclockwise } from "react-icons/bs";
import { Button, Switch, Typography } from "@material-tailwind/react";
import { AiOutlineUserAdd } from "react-icons/ai";

import { useLanguage } from "../../../context/LanguageProvider";
import AddNewUserModal from "../components/modal/addNewUser";
import { getUserList, updateUserActive } from "../api/user";
import { getSimplifiedDateTime } from "../helper";
import OperateButtonGroup from "./operateGroup";
import UpdateUserModal from "../components/modal/updateUser";
import ChargeUserModal from "../components/modal/chargeUser";
import { useAlert } from "../../../context/alertContext";
import { useRouter } from "next/navigation";
import TableLoading from "../components/tableLoading";
import TableNoData from "../components/tableNoData";

const TABLE_HEAD = [
  "编号",
  "用户名",
  "密码",
  "真实姓名",
  "剩余余额",
  "积极的",
  "创建时间",
  "操作",
];

export default function Home() {
  const [addNewUserModalShow, setAddNewUserModalShow] = useState(false);
  const [updateUserModalShow, setUpdateUserModalShow] = useState(false);
  const [chargeUserModalShow, setChargeUserModalShow] = useState(false);
  const [updateUserData, setUpdateUserData] = useState(null);
  const [chargeUserData, setChargeUserData] = useState(null);
  const [userList, setUserList] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useLanguage();
  const { showAlert } = useAlert();
  const router = useRouter();

  const fetchUserList = async () => {
    setIsLoading(true);
    try {
      const result = await getUserList();
      if (result.data) setUserList(result.data);
      else {
        showAlert("无法获取用户列表");
        router.push("/login");
      }
    } catch (error) {
      showAlert("出了点问题。");
      router.push("/login");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateUser = (index) => {
    setUpdateUserData(userList[index]);
    setUpdateUserModalShow(true);
  };

  const handleChargeUser = (index) => {
    setChargeUserData(userList[index]);
    setChargeUserModalShow(true);
  };

  const handleChangeActiveUser = async (index) => {
    setUserList((list) =>
      list.map((user, i) =>
        i === index ? { ...user, isActive: !user.isActive } : user
      )
    );
    const userId = userList[index]._id;
    const newStatus = !userList[index].isActive;
    const result = await updateUserActive(userId, newStatus);
    if (result) {
      showAlert("User updated successfully", "success");
    } else {
      showAlert("Something went wrong. Try again");
      setUserList((list) =>
        list.map((user, i) =>
          i === index ? { ...user, isActive: !user.isActive } : user
        )
      );
    }
  };

  useEffect(() => {
    fetchUserList();
  }, []);

  if (!t) return <p className="text-white">Loading translations...</p>;
  return (
    <div className="w-full h-full bg-white">
      <AddNewUserModal
        open={addNewUserModalShow}
        setOpen={setAddNewUserModalShow}
      />
      <UpdateUserModal
        open={updateUserModalShow}
        userData={updateUserData}
        setOpen={setUpdateUserModalShow}
      />
      <ChargeUserModal
        open={chargeUserModalShow}
        userData={chargeUserData}
        setOpen={setChargeUserModalShow}
      />
      <div className="w-full flex justify-between items-center p-4">
        <Typography variant="h6">用户管理</Typography>
        <button
          className="flex items-center gap-2"
          onClick={() => fetchUserList()}
        >
          <BsArrowCounterclockwise strokeWidth={1.5} />
          <Typography variant="h6">重新加载</Typography>
        </button>
      </div>
      <hr />
      <div className="w-full mt-4 p-4 flex flex-col gap-8">
        <div className="w-full flex justify-end">
          <Button
            onClick={() => setAddNewUserModalShow(true)}
            color="green"
            className="flex items-center gap-2"
          >
            <AiOutlineUserAdd className="w-5 h-5" />
            添加新用户
          </Button>
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
            {userList && userList.length != 0 ? (
              userList.map((row, index) => {
                return (
                  <tr key={index} className="hover:bg-gray-100">
                    <td>
                      <Typography variant="small" className="text-center">
                        {index + 1}
                      </Typography>
                    </td>
                    <td>
                      <Typography variant="small">{row.username}</Typography>
                    </td>
                    <td>
                      <Typography variant="small">{row.password}</Typography>
                    </td>
                    <td>
                      <Typography variant="small">{row.realname}</Typography>
                    </td>
                    <td>
                      <Typography variant="small">
                        {row.balance?.toFixed(2)}
                      </Typography>
                    </td>
                    <td>
                      <Switch
                        color="green"
                        checked={row.isActive}
                        onChange={() => handleChangeActiveUser(index)}
                      />
                    </td>
                    <td>
                      <Typography variant="small">
                        {getSimplifiedDateTime(row.createdAt)}
                      </Typography>
                    </td>
                    <td>
                      <OperateButtonGroup
                        index={index}
                        handleUpdate={handleUpdateUser}
                        handleCharge={handleChargeUser}
                      />
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
    </div>
  );
}
