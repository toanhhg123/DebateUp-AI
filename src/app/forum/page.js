"use client";

import apiClient from "@/config/axios";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Dialog,
  Input,
  Spinner,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import Link from "next/link";
import React from "react";
import { toast } from "sonner";

const ForumPage = () => {
  const [open, setOpen] = React.useState(false);

  const [pagination] = React.useState({
    take: 99,
    skip: 0,
  });

  const handleOpen = () => setOpen((cur) => !cur);

  const {
    data: posts,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["forum", pagination],
    queryFn: () => apiClient.get("/forum/post", { params: pagination }),
    select: (data) => data.data || [],
  });

  const { mutate, status } = useMutation({
    mutationFn: (body) => {
      return apiClient.post("/forum/Post", body);
    },
    onSuccess: (data) => {
      toast.success("Bài viet thanh cong");
      handleOpen();
      refetch();
    },
    onError: (e) => toast.error(e.message),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const body = Object.fromEntries(new FormData(e.target));
    mutate(body);
  };

  return (
    <section className="container mx-auto pt-20">
      <div className=" mx-auto mb-20 text-center">
        <Typography variant="h1" color="blue-gray" className="mb-2">
          Điễn đàn trao đổi
        </Typography>
        <Typography
          variant="lead"
          className="mx-auto w-full px-4 !text-gray-500 lg:w-9/12"
        >
          Bao gồm cả video, sách, bài giải, với nhà xây dựng, dự án, thực tập,
          cơ sở, bài giải, với nhà xây dựng, dự án, thực tập, cơ sở
        </Typography>
      </div>
      <div className="flex gap-4 justify-end container my-10">
        <div className="max-w-xs ">
          <Button onClick={handleOpen}>Thêm mới</Button>

          <Dialog
            size="lg"
            open={open}
            handler={handleOpen}
            className="bg-transparent shadow-none"
          >
            <form onSubmit={handleSubmit}>
              <Card className="mx-auto w-full">
                <CardBody className="flex flex-col gap-4">
                  <Typography variant="h4" color="blue-gray">
                    Tạo câu hỏi thảo luận
                  </Typography>
                  <Typography
                    className="mb-3 font-normal"
                    variant="paragraph"
                    color="gray"
                  >
                    Vui lòng nhập tiêu để câu hỏi và nội dung
                  </Typography>
                  <Typography className="-mb-2" variant="h6">
                    Tiêu đề
                  </Typography>
                  <Input name="title" required label="Tiêu đề" size="lg" />
                  <Typography className="-mb-2" variant="h6">
                    Nôi dung
                  </Typography>
                  <Textarea name="content" required label="Nôi dung" />
                </CardBody>
                <CardFooter className="pt-0">
                  <Button
                    loading={status === "pending"}
                    variant="gradient"
                    type="submit"
                    fullWidth
                  >
                    Tạo mới
                  </Button>
                </CardFooter>
              </Card>
            </form>
          </Dialog>
        </div>
      </div>

      {posts?.map((post) => (
        <Card className="mt-6" key={post.id}>
          <CardBody>
            <Typography variant="h5" color="blue-gray" className="mb-2">
              {post.title}
            </Typography>
            <Typography>{post.content}</Typography>
          </CardBody>
          <CardFooter className="pt-0 flex justify-end">
            <Link href={`/forum/${post.id}`}>
              <Button>Xem thêm</Button>
            </Link>
          </CardFooter>
        </Card>
      ))}

      {isFetching && (
        <div className="flex justify-center my-4">
          <Spinner />
        </div>
      )}
    </section>
  );
};

export default ForumPage;
