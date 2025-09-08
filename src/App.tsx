import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import DisconnectedLayout from "./layouts/DisconnectedLayout";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const App = () => {
  return (
    <>
    <Routes>
      <Route path="/" element={<DisconnectedLayout />}>
        <Route index element={<Home />} />
      </Route>
    </Routes>
    < ReactQueryDevtools />
    </>
  );
};

export default App;
