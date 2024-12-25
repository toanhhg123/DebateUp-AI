"use client";

import apiClient from "@/config/axios";
import { useAuth } from "@/provider/auth";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const ResourcePage = () => {
  const { isLogin } = useAuth();
  const router = useRouter();
  const [result, setResult] = useState("");

  const { mutate, status } = useMutation({
    mutationFn: (essay) => {
      return apiClient.post("/practice/evaluate", { essay });
    },
    onSuccess: (data) => {
      setResult(data.data);
    },
    onError: (e) => toast.error(e.message),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const essay = e.target.essay.value;
    mutate(essay);
    e.target.reset();
  };

  useEffect(() => {
    if (isLogin === false) {
      router.push("/login");
    }
  }, [isLogin, router]);

  return (
    <section className="container mx-auto pt-20">
      <Dialog open={!!result}>
        <DialogHeader>Xin chúc mừng !</DialogHeader>
        <DialogBody>
          Kết qủa của cuối cùng của bạn là:{" "}
          <Typography variant="h4" color="red">
            {result.feedback_score}
          </Typography>
          <Typography>{result.aiResponse}</Typography>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={() => setResult("")}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
        </DialogFooter>
      </Dialog>

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

      <form
        className="relative max-w-screen-xl mx-auto"
        onSubmit={handleSubmit}
      >
        <Textarea
          name="essay"
          required
          placeholder="Đoạn biểu mẫu của bạn"
          rows={8}
        />
        <div className="flex w-full justify-end py-1.5">
          <div className="flex gap-2">
            <Button
              loading={status === "pending"}
              type="submit"
              size="lg"
              className="rounded-md"
            >
              Đánh giá
            </Button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default ResourcePage;
