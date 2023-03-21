import { Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import LoginPage from "./Components/LoginPage";
import RegisterPage from "./Components/RegisterPage";
import UploadProduct from "./Components/UploadProduct";
import ProductList from "./Components/ProductList";
import Navbar from "./Components/Navbar";
import Announcement from "./Components/Announcement";
import Slider from "./Components/Slider";

function App() {
  return (
    <>
      <Navbar/>
      <Announcement/>
      <Slider/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/LoginPage" element={<LoginPage />} />
        <Route path="LoginPage/RegisterPage" element={<RegisterPage />} />
        <Route path="/LoginPage/UploadProduct" element={<UploadProduct />} />
        <Route path="/ProductList" element={<ProductList />} />
      </Routes>
    </>
  );
}

export default App;
