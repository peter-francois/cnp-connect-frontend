import { Outlet } from "react-router";
import Header from "../components/header/Header";

const ConnectedLayout = () => {
  return (
    <>
      <Header />
      <main className="container flex flex-col items-stretch justify-evenly h-full mx-auto px-5 md:px-10 lg:px-30 xl:px-40 pt-20 pb-5">
        <Outlet />
      </main>
    </>
  );
};

export default ConnectedLayout;
