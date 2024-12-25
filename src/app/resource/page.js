"use client";

import { BookCard } from "@/components";
import apiClient from "@/config/axios";
import { useAuth } from "@/provider/auth";
import { Spinner, Typography } from "@material-tailwind/react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ResourcePage = () => {
  const { isLogin } = useAuth();
  const router = useRouter();
  const [categoryId, setCategoryId] = useState();
  const [type, setType] = useState();

  const { data: categoryData } = useQuery({
    queryKey: ["categories"],
    queryFn: () => {
      return apiClient.get("/categories");
    },
  });

  const { data: resourceData, isFetching } = useQuery({
    queryKey: ["resources", type, categoryId],
    queryFn: () => {
      return apiClient.get("/resource", { params: { type, categoryId } });
    },
  });

  const categories = categoryData?.data || [];
  const resources = resourceData?.data || [];

  console.log(type);

  useEffect(() => {
    if (isLogin === false) {
      router.push("/login");
    }
  }, [isLogin, router]);

  return (
    <section className="container mx-auto pt-20">
      <div className=" mx-auto mb-20 text-center">
        <Typography variant="h1" color="blue-gray" className="mb-2">
          Danh sách tài nguyên
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
          <label
            htmlFor="countries"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Danh mục
          </label>
          <select
            id="countries"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={(e) => setCategoryId(e.target.value || undefined)}
          >
            <option value={""}>Tất cả</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="max-w-xs ">
          <label
            htmlFor="countries"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Loại
          </label>
          <select
            onChange={(e) => setType(e.target.value || undefined)}
            id="countries"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="">Tất cả</option>
            <option value="VIDEO">VIDEO</option>
            <option value="ARTICLE">ARTICLE</option>
            <option value="BOOK">BOOK</option>
          </select>
        </div>
      </div>
      {isFetching && (
        <div className="flex justify-center my-10">
          <Spinner />
        </div>
      )}
      <div className="container mx-auto grid grid-cols-1 items-start gap-x-6 gap-y-20 md:grid-cols-2 xl:grid-cols-3">
        {resources.map((props) => (
          <BookCard
            key={props.id}
            type={props.type}
            desc={props.description}
            title={props.title}
            url={props.url}
          />
        ))}
      </div>
    </section>
  );
};

export default ResourcePage;
