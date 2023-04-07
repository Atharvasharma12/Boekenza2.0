import styled from "styled-components";
import { Link } from "react-router-dom";
import Products from "./Products";

const Container = styled.div`
  flex: 1;
  margin: 3px;
  height: 70vh;
  position: relative;

  @media (max-width: 600px) {
    height: 20vh;
    font-size: 0.8em;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(40%);
`;

const Info = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media (max-width: 600px) {
    font-size: 0.8em;
  }
`;

const Title = styled.h1`
  color: white;
  margin-bottom: 20px;

  @media (max-width: 600px) {
    font-size: 2em;
  }
`;

const Button = styled.button`
  border: none;
  padding: 10px;
  background-color: white;
  color: gray;
  cursor: pointer;
  font-weight: 600;
  @media (max-width: 600px) {
  }
`;

const CategoryItem = ({ item }) => {
  return (
    <Container>
      <Image src={item.img} />
      <Info>
        <Link to="/Products" element={Products}>
        <Title>{item.title}</Title>
        <Button>SHOP NOW</Button>
        </Link>
        
      </Info>
    </Container>
  );
};

export default CategoryItem;