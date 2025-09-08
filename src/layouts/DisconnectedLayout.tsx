import { Outlet } from "react-router";

const DisconnectedLayout = () => {
  return (
    <main className="container flex flex-col items-center justify-evenly min-h-screen h-full mx-auto">
      <Outlet />
    </main>
  );
};

export default DisconnectedLayout;
