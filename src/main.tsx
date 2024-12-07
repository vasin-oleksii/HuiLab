import { createRoot } from "react-dom/client";

import Home from "./pages/home/Home.tsx";
import { BrowserRouter, Route, Routes } from "react-router";

import Login from "./pages/login/Login.tsx";
import SignUp from "./pages/signUp/SignUp.tsx";
import { Provider } from "react-redux";
import store from "./state/store.ts";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />}></Route>
        <Route>
          <Route path="login" element={<Login />} />
          <Route path="sign" element={<SignUp />} />
          <Route path="*" element={<h1>Error 404</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>
);
