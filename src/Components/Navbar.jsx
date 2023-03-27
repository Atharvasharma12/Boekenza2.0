import React from "react";
import styled from "styled-components";
import {BiSearchAlt2 } from "react-icons/bi";
import {BsCart3} from "react-icons/bs";
import { Link } from "react-router-dom";
import LoginPage from "./LoginPage";
import Home from "./Home";

const Container = styled.div`
  height: 60px;
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
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
  return (
    <Container>
      <Wrapper>
        <Left>
          <SearchContainer>
            <Input placeholder="Search" />
            <BiSearchAlt2 style={{ color: "gray", fontSize: 16 }} />
          </SearchContainer>
        </Left>
        <Center>
          <Link to="/" element={Home}>
            <Logo>BOEKENZA.</Logo>
          </Link>
        </Center>
        <Right>
          <Link to="/LoginPage" element={LoginPage}>
            <MenuItem>SIGN IN</MenuItem>
          </Link>
          <MenuItem>
            <BsCart3 style={{ fontSize: 20 }} />
          </MenuItem>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;