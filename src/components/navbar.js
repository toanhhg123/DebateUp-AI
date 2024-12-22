"use client";

import React from "react";
import {
  Navbar as MTNavbar,
  Collapse,
  Button,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import {
  RectangleStackIcon,
  XMarkIcon,
  Bars3Icon,
  HomeIcon,
  PresentationChartBarIcon,
  PencilSquareIcon,
  UserGroupIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import { useAuth } from "@/provider/auth";

const NAV_MENU = [
  {
    name: "Trang chủ",
    icon: HomeIcon,
    href: "/",
  },
  {
    name: "Tài Nguyên",
    icon: RectangleStackIcon,
    href: "/resource",
  },
  {
    name: "(AI)Đối Thoại",
    icon: PresentationChartBarIcon,
    href: "/community",
  },
  {
    name: "(AI)Chấm Bài",
    icon: PencilSquareIcon,
    href: "/evaluate",
  },
  {
    name: "Diễn đàn",
    icon: UserGroupIcon,
    href: "/forum",
  },
];

function NavItem({ children, href }) {
  return (
    <li>
      <Link href={href}>
        <Typography
          variant="paragraph"
          color="gray"
          className="flex items-center gap-2 font-medium text-gray-900"
        >
          {children}
        </Typography>
      </Link>
    </li>
  );
}

export function Navbar() {
  const [open, setOpen] = React.useState(false);
  const { isLogin, logout } = useAuth();

  function handleOpen() {
    setOpen((cur) => !cur);
  }

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpen(false)
    );
  }, []);

  return (
    <MTNavbar shadow={false} fullWidth className="border-0 sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between">
        <Typography color="blue-gray" className="text-lg font-bold">
          DebateUp
        </Typography>
        <ul className="ml-10 hidden items-center gap-8 lg:flex">
          {NAV_MENU.map(({ name, icon: Icon, href }) => (
            <NavItem name={name} key={name} href={href}>
              <Icon className="h-5 w-5" />
              {name}
            </NavItem>
          ))}
        </ul>
        <div className="hidden items-center gap-2 lg:flex">
          {isLogin ? (
            <Button variant="text" onClick={logout}>
              Logout
            </Button>
          ) : (
            <Link href={"/login"}>
              <Button color="gray">Login</Button>
            </Link>
          )}
        </div>
        <IconButton
          variant="text"
          color="gray"
          onClick={handleOpen}
          className="ml-auto inline-block lg:hidden"
        >
          {open ? (
            <XMarkIcon strokeWidth={2} className="h-6 w-6" />
          ) : (
            <Bars3Icon strokeWidth={2} className="h-6 w-6" />
          )}
        </IconButton>
      </div>
      <Collapse open={open}>
        <div className="container mx-auto mt-3 border-t border-gray-200 px-2 pt-4">
          <ul className="flex flex-col gap-4">
            {NAV_MENU.map(({ name, icon: Icon, href }) => (
              <NavItem key={name} href={href}>
                <Icon className="h-5 w-5" />
                {name}
              </NavItem>
            ))}
          </ul>
          <div className="mt-6 mb-4 flex items-center gap-2">
            {isLogin ? (
              <Button variant="text" onClick={logout}>
                Logout
              </Button>
            ) : (
              <Link href={"/login"}>
                <Button color="gray">Login</Button>
              </Link>
            )}
          </div>
        </div>
      </Collapse>
    </MTNavbar>
  );
}

export default Navbar;
