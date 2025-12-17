import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Route, Routes } from "react-router";
import ConnectedLayout from "./layouts/ConnectedLayout";
import DisconnectedLayout from "./layouts/DisconnectedLayout";
import AlertCreatePage from "./pages/alert/AlertCreatePage";
import ResetPasswordPage from "./pages/auth/ResetPasswordPage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";
import SigninPage from "./pages/auth/SigninPage";
import UsersListPage from "./pages/user/UsersListPage";
import UserDetailsPage from "./pages/user/UserDetailsPage";
import UserCreatePage from "./pages/user/UserCreatePage";
import { appLinks, menuLinks } from "./utils/links";
import ProtectedRoute from "./guards/ProtectedRoute.guard";
import SupervisorRoute from "./guards/SupervisorRoute.guard";
import ErrorPage from "./pages/ErrorPage";
import ChatWebSocket from "./pages/conversation/ConversationDetailsPage";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<DisconnectedLayout />}>
          <Route index element={<SigninPage />} />
          <Route path={`${appLinks.items.resetPassword.path}/:token`} element={<ResetPasswordPage />} />
          <Route path={appLinks.items.forgotPassword.path} element={<ForgotPasswordPage />} />
          <Route path="/chat" element={<ChatWebSocket />} />
          <Route path="/page-erreur" element={<ErrorPage />} />
        </Route>

        <Route element={<ConnectedLayout />}>
          <Route element={<ProtectedRoute />}>
            <Route path={menuLinks.items.users.path} element={<UsersListPage />} />
            <Route path={`${menuLinks.items.users.path}/:id`} element={<UserDetailsPage />} />
            <Route path={menuLinks.items.newAlert.path} element={<AlertCreatePage />} />
            <Route element={<SupervisorRoute />}>
              <Route path={menuLinks.items.newUser.path} element={<UserCreatePage />} />
            </Route>
          </Route>
        </Route>
      </Routes>
      <ReactQueryDevtools />
    </>
  );
};

export default App;
