import Link from "next/link";

export type ItemType = {
  label: string;
  url: string;
};

const NavbarItem = ({ item }: { item: ItemType }) => (
  <li>
    <Link className="font-bold" href={item.url}>
      {item.label}
    </Link>
  </li>
);

export default NavbarItem;
