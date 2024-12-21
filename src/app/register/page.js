"use client";

import apiClient from "@/config/axios";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";

const RegisterPage = () => {
  const { mutate, status } = useMutation({
    mutationFn: (body) => {
      return apiClient.post("/auth/signup", body);
    },
    onSuccess: (data) => {},
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const body = Object.fromEntries(data);
    mutate(body);
  };

  return (
    <div className="max-w-screen-lg m-auto flex justify-center my-20">
      <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray">
          Đăng kí
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
              Họ Tên
            </Typography>
            <Input
              size="lg"
              name="name"
              required
              placeholder="name"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none hidden",
              }}
            />

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
          <Checkbox
            label={
              <Typography
                variant="small"
                color="gray"
                className="flex items-center font-normal"
              >
                Tôi đồng ý {""}
                <a
                  href="/#"
                  className="font-medium transition-colors hover:text-gray-900"
                >
                  &nbsp;Chính sách sử dụng
                </a>
              </Typography>
            }
            containerProps={{ className: "-ml-2.5" }}
          />
          <Button
            className="mt-6"
            fullWidth
            type="submit"
            loading={status === "pending"}
          >
            Đăng kí
          </Button>
          <Typography color="gray" className="mt-4 text-center font-normal">
            Đã có tài khoản?{" "}
            <Link href="/login" className="font-medium text-gray-900">
              Đăng nhập
            </Link>
          </Typography>
        </form>
      </Card>
    </div>
  );
};

export default RegisterPage;
