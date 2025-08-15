import React, { useState } from "react";
import "./App.css";
import Login from "./components/Login";
import Register from "./components/Register";

type Page = "login" | "register";

function App() {
  const [currentPage, setCurrentPage] = useState<Page>("login");

  const handlePageChange = (page: Page) => {
    setCurrentPage(page);
  };

  return (
    <>
      {currentPage === "login" ? (
        <Login onPageChange={() => handlePageChange("register")} />
      ) : (
        <Register onPageChange={() => handlePageChange("login")} />
      )}
    </>
  );
}

export default App;
