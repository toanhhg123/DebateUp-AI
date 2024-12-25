"use client";

import apiClient from "@/config/axios";
import {
  Avatar,
  Button,
  Input,
  Spinner,
  Typography,
} from "@material-tailwind/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import React from "react";
import { toast } from "sonner";

const Page = ({ params }) => {
  const { id } = React.use(params);

  const { data, isLoading } = useQuery({
    queryKey: ["forum-item", id],
    queryFn: () => apiClient.get(`/forum/post/${id}`),
  });

  const {
    data: dataComment,
    isLoading: isLoadingComment,
    refetch: refetchComment,
  } = useQuery({
    queryKey: ["forum-item", "comment", id],
    queryFn: () => apiClient.get(`/forum/comment/${id}`),
  });

  const { mutate, status: statusComment } = useMutation({
    mutationFn: (body) => {
      return apiClient.post("/forum/comment", body);
    },
    onSuccess: (data) => {
      toast.success("Tạo bình luận thành công");
      refetchComment();
    },
    onError: (e) => toast.error(e.message),
  });

  const post = data?.data;
  const comments = dataComment?.data;

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const body = Object.fromEntries(data);

    mutate({
      ...body,
      forumId: Number(id),
    });
  };

  if (isLoading || !post)
    return (
      <div className="flex justify-center my-10">
        <Spinner />
      </div>
    );

  return (
    <section className="container mx-auto pt-20">
      <div className=" mx-auto mb-20 text-center">
        <Typography variant="h5" color="blue-gray" className="mb-2">
          {post.title}
        </Typography>

        <Typography
          variant="lead"
          className="mx-auto w-full px-4 !text-gray-500 lg:w-9/12"
        >
          {post.content}
        </Typography>
      </div>

      {comments?.map((comment) => (
        <article
          key={comment.id}
          className="p-6 mb-3 text-base flex gap-2 bg-white border-t border-gray-200 dark:border-gray-700 dark:bg-gray-900"
        >
          <Avatar
            src={
              comment?.user?.avatarUrl ||
              "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=2980&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
            size="sm"
          />
          <div>
            <footer className="flex items-center mb-2">
              <div className="flex items-center">
                <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
                  {comment?.user?.name}
                </p>
              </div>
            </footer>
            <p className="text-gray-500 dark:text-gray-400">
              {comment?.comment}
            </p>
          </div>
        </article>
      ))}

      <form
        className="relative flex w-full max-w-3xl m-auto"
        onSubmit={handleSubmit}
      >
        <Input
          size="lg"
          type="text"
          name="comment"
          label="Hãy viết bình luận vào đây"
          className="pr-20"
          containerProps={{
            className: "min-w-0",
          }}
        />
        <Button
          type="submit"
          loading={statusComment === "pending"}
          size="sm"
          className="!absolute right-1 top-1.5 rounded"
        >
          Bình luận
        </Button>
      </form>
      {isLoadingComment && (
        <div className="flex justify-center my-10">
          <Spinner />
        </div>
      )}
    </section>
  );
};

export default Page;
