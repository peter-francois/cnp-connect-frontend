import { Route, Routes } from "react-router";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import DisconnectedLayout from "./layouts/DisconnectedLayout";
import ChangePassword from "./pages/ChangePassword";
import ResetPassword from "./pages/ResetPassword";
import Users from "./pages/Users";
import ConnectionPage from "./pages/Connection";
import ConnectedLayout from "./layouts/ConnectedLayout";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<DisconnectedLayout />}>
          <Route index element={<ConnectionPage />} />
          <Route path="nouveau-mot-de-passe" element={<ChangePassword />} />
          <Route path="reinitialisation-mot-passe" element={<ResetPassword />} />
        </Route>
        <Route element={<ConnectedLayout />}>
          <Route path="/utilisateurs" element={<Users />} />
        </Route>
      </Routes>
      <ReactQueryDevtools />
    </>
  );
};

export default App;
