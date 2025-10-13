import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Route, Routes } from "react-router";
import ConnectedLayout from "./layouts/ConnectedLayout";
import DisconnectedLayout from "./layouts/DisconnectedLayout";
import NewAlertPage from "./pages/alert/NewAlertPage";
import ChangePasswordPage from "./pages/auth/ChangePasswordPage";
import ResetPasswordPage from "./pages/auth/ResetPasswordPage";
import SigninPage from "./pages/auth/SigninPage";
import UsersPage from "./pages/user/UsersPage";
import UserDetailsPage from "./pages/user/UserDetailsPage";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<DisconnectedLayout />}>
          <Route index element={<SigninPage />} />
          <Route path="nouveau-mot-de-passe" element={<ChangePasswordPage />} />
          <Route path="reinitialisation-mot-passe" element={<ResetPasswordPage />} />
        </Route>
        <Route element={<ConnectedLayout />}>
          <Route path="/utilisateurs" element={<UsersPage />} />
          <Route path="/utilisateurs/:id" element={<UserDetailsPage />} />
          <Route path="/nouvelle-alert" element={<NewAlertPage />} />
        </Route>
      </Routes>
      <ReactQueryDevtools />
    </>
  );
};

export default App;
