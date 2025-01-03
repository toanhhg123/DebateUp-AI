"use client";

import apiClient from "@/config/axios";
import { useAuth } from "@/provider/auth";
import { Button, Card, Input, Typography } from "@material-tailwind/react";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const LoginPage = () => {
  const { isLogin, setAuth } = useAuth();
  const router = useRouter();

  const { mutate, status } = useMutation({
    mutationFn: (body) => {
      return apiClient.post("/auth/login", body);
    },
    onSuccess: (data) => {
      console.log(data);

      setAuth({
        accessToken: data.data.accessToken,
        refreshToken: data.data.refreshToken,
        user: { userId: data.data.userId },
      });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const body = Object.fromEntries(data);
    mutate(body);
  };

  useEffect(() => {
    if (isLogin) {
      router.push("/");
    }
  }, [isLogin, router]);

  return (
    <div className="max-w-screen-lg m-auto flex justify-center my-20">
      <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray">
          Đăng nhập
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Chào mừng bạn đến với DebateUp
        </Typography>
        <form
          className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
          onSubmit={handleSubmit}
        >
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Email
            </Typography>
            <Input
              size="lg"
              name="email"
              type="email"
              required
              placeholder="name@mail.com"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none hidden",
              }}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Mật khẩu
            </Typography>
            <Input
              name="password"
              required
              type="password"
              size="lg"
              placeholder="********"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none hidden",
              }}
            />
          </div>

          <Button
            className="mt-6"
            fullWidth
            type="submit"
            loading={status === "pending"}
          >
            Đăng nhập
          </Button>
          <Typography color="gray" className="mt-4 text-center font-normal">
            Chưa có tài khoản?{" "}
            <Link href="/register" className="font-medium text-gray-900">
              Đăng kí
            </Link>
          </Typography>
        </form>
      </Card>
    </div>
  );
};

export default LoginPage;
