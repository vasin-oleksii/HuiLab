import { createRoot } from "react-dom/client";

import Home from "./pages/home/Home.tsx";
import { BrowserRouter, Route, Routes } from "react-router";
import Header from "./components/header/Header.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Header />

    <Routes>
      <Route index element={<Home />}></Route>
      <Route>
        <Route path="login" element={<h1>{"<Login />"}</h1>} />
        <Route path="register" element={<h1>{"<Register />"}</h1>} />
      </Route>
    </Routes>
  </BrowserRouter>
);
