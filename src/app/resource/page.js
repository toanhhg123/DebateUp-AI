"use client";

import { BookCard } from "@/components";
import apiClient from "@/config/axios";
import { Typography } from "@material-tailwind/react";
import { useQuery } from "@tanstack/react-query";

const BOOKS = [
  {
    img: "/image/books/RectangleBig1.svg",
    category: "Natasha Wing",
    title: "The Night Before Kindergarten",
    desc: "A heartwarming and humorous picture book that eases the jitters of starting kindergarten.",
    price: "$99",
    offPrice: "$79",
  },
  {
    img: "/image/books/RectangleBig6.svg",
    category: "James Patterson",
    title: "Middle School: The Worst Years of My Life",
    desc: "A funny and relatable novel about the challenges of navigating middle school.",
    price: "$99",
    offPrice: "$79",
  },
  {
    img: "/image/books/RectangleBig2.svg",
    category: "Helen W. Colby",
    title: "College Student: A Comprehensive Checklist",
    desc: "A practical guidebook that helps college students prepare for the transition to university.",
    price: "$99",
    offPrice: "$79",
  },
  {
    img: "/image/books/RectangleBig3.svg",
    category: "Walter Pauk",
    title: "How to Study in College",
    desc: "A valuable resource for high school seniors and college freshmen, offering effective study strategies.",
    price: "$99",
    offPrice: "$79",
  },
  {
    img: "/image/books/RectangleBig4.svg",
    category: "William Strunk Jr.",
    title: "The Elements of Style",
    desc: "A classic reference book on grammar and writing skills, essential for high school and college students.",
    price: "$99",
    offPrice: "$79",
  },
  {
    img: "/image/books/RectangleBig5.svg",
    category: "William Strunk Jr.",
    title: "The Elements of Style",
    desc: "A classic reference book on grammar and writing skills, essential for high school and college students.",
    price: "$99",
    offPrice: "$79",
  },
];

const BOOKS_TABS = [
  "history",
  "law",
  "math",
  "economy",
  "business",
  "communication",
];

const ResourcePage = () => {
  const { data: categoryData } = useQuery({
    queryKey: ["categories"],
    queryFn: () => {
      return apiClient.get("/categories");
    },
  });

  const { data: resourceData } = useQuery({
    queryKey: ["resources"],
    queryFn: () => {
      return apiClient.get("/resource");
    },
  });

  const categories = categoryData?.data || [];
  const resources = resourceData?.data || [];

  console.log({ categories, resources });

  return (
    <section className="container mx-auto pt-20">
      <div className=" mx-auto mb-20 text-center">
        <Typography
          variant="paragraph"
          color="blue-gray"
          className="mb-3 font-bold uppercase"
        >
          up to 40% OFF
        </Typography>
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
          >
            <option>Lọc theo loại doanh mục</option>
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
            id="countries"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option>Lọc loại tài nguyên</option>
            <option value="VIDEO">VIDEO</option>
            <option value="ARTICLE">ARTICLE</option>
            <option value="BOOK">BOOK</option>
          </select>
        </div>
      </div>
      <div className="container mx-auto grid grid-cols-1 items-start gap-x-6 gap-y-20 md:grid-cols-2 xl:grid-cols-3">
        {resources.map((props, key) => (
          <BookCard
            key={props.id}
            type={props.type}
            desc={props.description}
            title={props.title}
          />
        ))}
      </div>
    </section>
  );
};

export default ResourcePage;
