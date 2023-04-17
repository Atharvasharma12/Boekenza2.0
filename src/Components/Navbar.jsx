import React, { useState } from "react";
import styled from "styled-components";
import { BiSearchAlt2 } from "react-icons/bi";
import { Link } from "react-router-dom";
import "./Navbar.css";
import LoginPage from "./LoginPage";
import Home from "./Home";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const Container = styled.div`
  height: 60px;
  position: relative;
  margin-bottom: 100px;
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;

const Input = styled.input`
  border: none;
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
`;

const Navbar = () => {
  const { name } = useSelector((state) => state.custom);
  const [isUser, setIsUSer] = useState(false);
  const dispatch = useDispatch();

  const handelSearch = (e) => {
    dispatch({
      type: "setSearchProduct",
      payload: e.target.value,
    });
    // console.log(e.target.value);
  };

  //for logout it willll empty isUser
  const handelLogOut = () => {
    setIsUSer(false);
    dispatch({
      type: "setUerData",
      payload: { name: "profile" },
    });
    dispatch({
      type: "isUser",
      payload: isUser,
    });
  };

  const [searchItem, setSearchItem] = useState("");

  return (
    <>
      <Container>
        <Wrapper>
          <Left>
            <SearchContainer>
              <Input placeholder="Search" onChange={(e) => handelSearch(e)} />
              <BiSearchAlt2 style={{ color: "gray", fontSize: 16 }} />
            </SearchContainer>
          </Left>
          <Center>
            <Link to="/" element={Home}>
              <Logo>BOEKENZA</Logo>
            </Link>
          </Center>
          <Right>
            <Link to="/LoginPage" element={LoginPage}>
              <div class="scene">
                <div class="cube">
                  <span class="side top">Sign in</span>
                  <span class="side front">Start Selling</span>
                </div>
              </div>
            </Link>

            <div class="scene">
              <div class="cube">
                <span class="side top" onClick={handelLogOut}>
                  Logout
                </span>
                <span class="side front">{name}</span>
              </div>
            </div>

           
          </Right>
        </Wrapper>
      </Container>
    </>
  );
};

export default Navbar;
