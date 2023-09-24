import React from "react";
import { BrowserRouter, Route, Link, Routes } from "react-router-dom";
import { logox } from "./assets";
import { CreatePost, Home } from "./pages";
const App = () => {
  return (
    <BrowserRouter>
      <header className="w-full flex justify-between items-center h-[100px] bg-slate-800 sm:px-8 px-4 py-4 border-b border-slate-800">
        <Link to="/">
          <img src={logox} alt="logo" className="w-28 objecr-contain" />
        </Link>

        <Link
          to="/create-post"
          className="font-inter font medium bg-[#6469ff] text-white px-4 py-2 rounded-md"
        >
          Create
        </Link>
      </header>
      <main className="sm:p-8 px-4 py-8 w-full bg-slate-800 min-h-[calc(100vh-73px)]">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/create-post" element={<CreatePost />}></Route>
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;
