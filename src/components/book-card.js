import React from "react";
import Image from "next/image";

import {
  Typography,
  Card,
  CardBody,
  CardHeader,
} from "@material-tailwind/react";

const IMAGE_TYPE = {
  ARTICLE:
    "https://images.unsplash.com/photo-1585241936939-be4099591252?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  VIDEO:
    "https://images.unsplash.com/photo-1611162616475-46b635cb6868?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  BOOK: "https://images.unsplash.com/photo-1517673132405-a56a62b18caf?q=80&w=2076&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
};

export function BookCard({ type, title, desc }) {
  return (
    <Card color="transparent" shadow={false}>
      <CardHeader color="gray" floated={false} className="mx-0 mt-0 mb-6">
        <Image
          width={768}
          height={768}
          src={IMAGE_TYPE[type] || IMAGE_TYPE.BOOK}
          alt={title}
          className="h-full w-full scale-[1.1] object-cover object-center"
        />
      </CardHeader>
      <CardBody className="p-0">
        <Typography color="blue" className="mb-2 text-xs !font-semibold">
          {type}
        </Typography>
        <a href="#/">
          <Typography
            variant="h5"
            color="blue-gray"
            className="mb-3 font-bold normal-case xl:w-64"
          >
            {title}
          </Typography>
        </a>
        <Typography className="mb-4 font-normal !text-gray-500">
          {desc}
        </Typography>
      </CardBody>
    </Card>
  );
}
export default BookCard;
