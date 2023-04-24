"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";

export type ItemType =
  | {
      label: string;
      url: string;
    }
  | {
      label: string;
      buttonType: "signout";
    };

export type MenuItems = readonly ItemType[];

const NavbarItem = ({ item }: { item: ItemType }) => {
  if ("buttonType" in item) {
    return (
      <li>
        <button
          type="button"
          className="font-bold"
          onClick={() => void signOut({ callbackUrl: "/" })}
        >
          {item.label}
        </button>
      </li>
    );
  }
  return (
    <li>
      <Link className="font-bold" href={item.url}>
        {item.label}
      </Link>
    </li>
  );
};

export default NavbarItem;
