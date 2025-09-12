import { Route, Routes } from "react-router";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Home from "./pages/Home";
import DisconnectedLayout from "./layouts/DisconnectedLayout";
import ChangePassword from "./pages/ChangePassword";
import ResetPassword from "./pages/ResetPassword";
import Users from "./pages/Users";

const App = () => {
  return (
    <>
    <Routes>
      <Route path="/" element={<DisconnectedLayout />}>
        <Route index element={<Home />} />
        <Route path="nouveau-mot-de-passe" element={<ChangePassword />} />
        <Route path="reinitialisation-mot-passe" element={<ResetPassword />} />
      </Route>
      <Route path="/utilisateurs" element={<Users />} />
    </Routes>
    < ReactQueryDevtools />
    </>
  );
};

export default App;
