import React from "react";
import {
  Navbar as NextUINavbar,
  NavbarBrand,
  NavbarContent,
} from "@nextui-org/react";
import Link from "next/link";
import { SearchBar } from "../Searchbar/Searchbar";

export default function Navbar() {
  return (
    <NextUINavbar
      className="dark:dark light:light dark:bg-gray-900"
      position="static"
      height={"4rem"}
      maxWidth={"full"}
      isBordered
    >
      <NavbarBrand>
        <Link href="/" className="text-2xl dark:text-white light:text-blac">
          EG
        </Link>
      </NavbarBrand>
      <NavbarContent justify="end">
        <SearchBar />
      </NavbarContent>
    </NextUINavbar>
  );
}
