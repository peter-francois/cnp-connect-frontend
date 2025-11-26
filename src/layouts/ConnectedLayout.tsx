import { Outlet } from "react-router";
import Header from "../components/header/Header";

const ConnectedLayout = () => {
  return (
    <div className="relative h-screen">
      <Header />
      <main className="h-screen container flex flex-col items-stretch justify-evenly mx-auto px-5 md:px-10 lg:px-30 pt-20 xl:px-40 pb-5">
        <Outlet />
      </main>
    </div>
  );
};

export default ConnectedLayout;
