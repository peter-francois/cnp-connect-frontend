import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import DisconnectedLayout from "./layouts/DisconnectedLayout";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<DisconnectedLayout />}>
        <Route index element={<Home />} />
      </Route>
    </Routes>
  );
};

export default App;
