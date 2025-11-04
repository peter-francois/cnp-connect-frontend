import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Route, Routes } from "react-router";
import ConnectedLayout from "./layouts/ConnectedLayout";
import DisconnectedLayout from "./layouts/DisconnectedLayout";
import AlerCreatetPage from "./pages/alert/AlertCreatePage";
import ResetPasswordPage from "./pages/auth/ResetPasswordPage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";
import SigninPage from "./pages/auth/SigninPage";
import UsersListPage from "./pages/user/UsersListPage";
import UserDetailsPage from "./pages/user/UserDetailsPage";
import UserCreatePage from "./pages/user/UserCreatePage";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<DisconnectedLayout />}>
          <Route index element={<SigninPage />} />
          <Route path="nouveau-mot-de-passe" element={<ResetPasswordPage />} />
          <Route path="reinitialisation-mot-passe" element={<ForgotPasswordPage />} />
        </Route>
        <Route element={<ConnectedLayout />}>
          <Route path="/utilisateurs" element={<UsersListPage />} />
          <Route path="/utilisateurs/:id" element={<UserDetailsPage />} />
          <Route path="/nouvelle-alert" element={<AlerCreatetPage />} />
          <Route path="/nouvel-utilisateur" element={<UserCreatePage />} />
        </Route>
      </Routes>
      <ReactQueryDevtools />
    </>
  );
};

export default App;
