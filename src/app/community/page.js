"use client";

import apiClient from "@/config/axios";
import { useAuth } from "@/provider/auth";
import { Button, Spinner } from "@material-tailwind/react";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const Page = () => {
  const { isLogin } = useAuth();
  const router = useRouter();

  const [chats, setChats] = useState([
    {
      name: "DebateUp AI",
      message: "Xin chào tôi có thể giúp gì được cho bạn",
    },
  ]);

  const { mutate, status } = useMutation({
    mutationFn: (content) => {
      return apiClient.post("/practice/debate", { content });
    },
    onSuccess: (data) => {
      setChats([...chats, { name: "DebateUp AI", message: data.data }]);
    },
    onError: (e) => toast.error(e.message),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const message = e.target.message.value;
    setChats([...chats, { name: "You", message }]);
    mutate(message);
    e.target.reset();
  };

  useEffect(() => {
    if (isLogin === false) {
      router.push("/login");
    }
  }, [isLogin, router]);

  return (
    <div className="container my-20 mx-auto">
      <div className=" flex flex-col">
        <div className="bg-gray-200 flex-1 overflow-y-scroll">
          {chats.map((chat, index) =>
            chat.name === "DebateUp AI" ? (
              <div className="px-4 py-2" key={index.toLocaleString()}>
                <div className="flex items-center mb-2">
                  <Image
                    className="w-8 h-8 rounded-full mr-2"
                    src="https://images.unsplash.com/photo-1659018966820-de07c94e0d01?q=80&w=2998&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    width={50}
                    height={50}
                    alt="User Avatar"
                  />
                  <div className="font-medium">{chat.name}</div>
                </div>
                <div className="bg-white rounded-lg p-2 shadow mb-2 max-w-sm">
                  {chat.message}
                </div>
              </div>
            ) : (
              <div
                className="flex items-center justify-end my-4"
                key={index.toLocaleString()}
              >
                <div className="bg-blue-500 text-white rounded-lg p-2 shadow mr-2 max-w-sm">
                  {chat.message}
                </div>
                <Image
                  className="w-8 h-8 rounded-full"
                  src="https://picsum.photos/50/50"
                  width={50}
                  height={50}
                  alt="User Avatar"
                />
              </div>
            )
          )}
          <div className="p-4">{status === "pending" && <Spinner />}</div>
        </div>
        <div className=" px-4 py-2">
          <form className="flex items-center" onSubmit={handleSubmit}>
            <input
              className="w-full border rounded-full py-2 px-4 mr-2"
              type="text"
              placeholder="Type your message..."
              name="message"
            />
            <Button
              disabled={status === "pending"}
              type="submit"
              size="lg"
              className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-full"
            >
              Gửi
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;
