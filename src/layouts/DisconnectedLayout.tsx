import { Outlet } from "react-router";

const DisconnectedLayout = () => {
  return (
    <main className="container flex flex-col items-center justify-evenly min-h-screen h-full mx-auto px-5">
      <Outlet />
    </main>
  );
};

export default DisconnectedLayout;
