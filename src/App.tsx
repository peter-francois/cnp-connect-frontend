import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import DisconnectedLayout from "./layouts/DisconnectedLayout";
import ChangePassword from "./pages/ChangePassword";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<DisconnectedLayout />}>
        <Route index element={<Home />} />
        <Route path="reset-password" element={<ChangePassword />} />
      </Route>
    </Routes>
  );
};

export default App;
