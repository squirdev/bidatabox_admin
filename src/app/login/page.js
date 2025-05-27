"use client";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { useLanguage } from "../../../context/LanguageProvider";
import { useState } from "react";
import { useAlert } from "../../../context/alertContext";
import { signIn } from "../api/auth";
import { useDispatch } from "react-redux";
import { login } from "../../../redux/authSlice";
import { useRouter } from "next/navigation";

export default function Home() {
  const { showAlert } = useAlert();
  const router = useRouter();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      showAlert("请输入所有详细信息");
      return;
    }
    setIsLoading(true);
    const result = await signIn(username, password);
    if (result) {
      showAlert("登录成功", "success");
      dispatch(login({ token: result.token, user: result.user }));
      router.push("/");
    } else {
      showAlert("帐户无效。请重试");
    }
    setIsLoading(false);
  };

  return (
    <div className="w-full h-full flex justify-center items-center">
      <Card
        color="transparent"
        shadow={true}
        className="p-6 shadow-xl shadow-gray-400"
      >
        <Typography variant="h4" color="blue-gray">
          管理员仪表板
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          请输入您的账号和密码以继续
        </Typography>
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              帐户
            </Typography>
            <Input
              value={username}
              placeholder={"帐户"}
              onChange={(e) => setUserName(e.target.value)}
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              密码
            </Typography>
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="密码"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>
          <Button
            loading={isLoading}
            type="submit"
            color="red"
            onClick={handleSubmit}
            className="mt-6 flex justify-center"
            fullWidth
          >
            登录
          </Button>
        </form>
      </Card>
    </div>
  );
}
