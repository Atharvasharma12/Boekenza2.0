import { Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import LoginPage from "./Components/LoginPage";
import RegisterPage from "./Components/RegisterPage";
import UploadProduct from "./Components/UploadProduct";
import ProductList from "./Components/ProductList";
import Navbar from "./Components/Navbar";
import Announcement from "./Components/Announcement";
import Slider from "./Components/Slider";
import Categories from "./Components/Categories";
import Products from "./Components/Products";
import Contact from "./Components/Contact";
import Footer from "./Components/Footer";


function App() {
  return (
    <>
      {/* 
    the order of displaying component was depend on the order of calling them
     */}
      <Announcement />
      <Navbar />

      {/* if we call all the components below in thhis app component then throughout the website they will remain open in 
    all the other components like if we open login page then also these all will remain open so insted of this
    call all the below components in home page components 👍
*/}
      <Slider/>
      <Categories />
      <Products />
      <Contact />
      <Footer />
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
