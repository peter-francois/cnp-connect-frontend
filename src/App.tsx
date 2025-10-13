import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Route, Routes } from "react-router";
import ConnectedLayout from "./layouts/ConnectedLayout";
import DisconnectedLayout from "./layouts/DisconnectedLayout";
import AlerCreatetPage from "./pages/alert/AlertCreatePage";
import ChangePasswordPage from "./pages/auth/ChangePasswordPage";
import ResetPasswordPage from "./pages/auth/ResetPasswordPage";
import SigninPage from "./pages/auth/SigninPage";
import UsersListPage from "./pages/user/UsersListPage";
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
          <Route path="/utilisateurs" element={<UsersListPage />} />
          <Route path="/utilisateurs/:id" element={<UserDetailsPage />} />
          <Route path="/nouvelle-alert" element={<AlerCreatetPage />} />
        </Route>
      </Routes>
      <ReactQueryDevtools />
    </>
  );
};

export default App;
