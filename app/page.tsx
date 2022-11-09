import Home from "./Home";

const getData = async () => {
  const res = await fetch("http://localhost:3000/api/hello", {
    cache: "no-store",
  });

  return res.json() as Promise<{ name: string }>;
};

const Page = async () => {
  const user = await getData();

  return <Home user={user} />;
};

export default Page;
