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
    <nav className="sidebar"><div className="flex h-screen w-64 flex-col justify-between bg-zinc-900 text-zinc-300"/>
        <div className="p-4">
            
            <div className="mb-4">
                <div className="flex w-full items-center justify-between">
                    <a className="flex w-full cursor-pointer items-center">
                        <span className="ml-3 font-bold">Notifications</span>
                    </a>
                </div>
            </div>
            
            <div className="mb-4">
                <div className="flex w-full items-center justify-between">
                    <a className="flex w-full cursor-pointer items-center">
                        <span className="ml-3 font-bold">Friends</span>
                    </a>
                </div>
            </div>
        </div>
    </nav>

);

export default Sidebar;