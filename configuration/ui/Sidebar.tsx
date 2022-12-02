import Link from "next/link";

export type ItemType = {
    label: string;
    url: string;
};

const SidebarItem = ({ item }: { item: ItemType }) => (
    <li>
        <Link className="normal-case font-bold" href={item.url}>
            {item.label}
        </Link>
    </li>
);

const sidebarItems = [
    {
        label: "Notifications",
        url: "/components/notifications",
    },
    {
        label: "Friends",
        url: "/components/friends",
    },
];

const Sidebar = () => (
    <nav className="sidebar">
        <div className="sidebar-start">
            <h1>
                <Link
                    className="normal-case text-xl btn btn-ghost rounded-none text-primary"
                    href="/"
                >
                    Sidebar
                </Link>
            </h1>
        </div>
        <div className="sidebar-end">
            <ul className="menu menu-horizontal">
                {sidebarItems.map((item) => (
                    <SidebarItem item={item} key={item.url} />
                ))}
            </ul>
        </div>
    </nav>
);

export default Sidebar;