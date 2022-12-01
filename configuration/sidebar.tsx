import Link from "next/link";
import Layout from "../app/layout";

const Sidebar = ({ children }: { children: React.ReactNode }) => {
    return (

        <Layout>
            <div className="min-h-screen flex flex-col">
                <header className="bg-purple-200 sticky top-0 h-14 flex justify-center items-cen">
                    Next.js sidebar menu
                </header>
                <div className="flex flex-col md:flex-row flex-1">
                    <aside className="bg-fuchsia-100 w-full md:w-60"/>
                    <main className="flex-1">{children}</main>
                </div>
            </div>
        </Layout>
    )

}
