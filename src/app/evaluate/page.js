"use client";

import { useAuth } from "@/provider/auth";
import { Button, Textarea, Typography } from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const ResourcePage = () => {
  const { isLogin } = useAuth();
  const router = useRouter();

  console.log(isLogin);

  useEffect(() => {
    if (isLogin === false) {
      router.push("/login");
    }
  }, [isLogin, router]);

  return (
    <section className="container mx-auto pt-20">
      <div className=" mx-auto mb-20 text-center">
        <Typography variant="h1" color="blue-gray" className="mb-2">
          Hãy thử kiểm tra kết quả của bạn
        </Typography>
        <Typography
          variant="lead"
          className="mx-auto w-full px-4 !text-gray-500 lg:w-9/12"
        >
          Hãy nhập đầy đủ thông tin bên đươi ô tìm kiếm và nhờ AI kiểm tra thử
          trình độ hiện tại của bản thân
        </Typography>
      </div>

      <div className="relative max-w-screen-xl mx-auto">
        <Textarea placeholder="Đoạn biểu mẫu của bạn" rows={8} />
        <div className="flex w-full justify-end py-1.5">
          <div className="flex gap-2">
            <Button size="lg" className="rounded-md">
              Đánh giá
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResourcePage;
