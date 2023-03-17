import React from "react";
import { Link } from "react-router-dom";
import LoginPage from "./LoginPage";

function Home() {
  return (
    <>
      <h1>home page</h1>

      <Link to="/LoginPage" element={LoginPage}>
        <button>Login</button>
      </Link>
      <Link to="/ProductList">
        <button>Product list</button>
      </Link>
    </>
  );
}

export default Home;
