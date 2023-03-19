import React from "react";
import { Link } from "react-router-dom";
import LoginPage from "./LoginPage";
import { BiSearchAlt2 } from "react-icons/bi";

function Home() {
  //comment is added extended

  return (
    <>
      <h1>Boekenza</h1>
      <BiSearchAlt2 />
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
