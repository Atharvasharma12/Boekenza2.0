import styled from "styled-components";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";


const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  position: relative;
  overflow: hidden;
`;


const Arrow = styled.div`
  width: 50px;
  height: 50px;
  background-color: #fff7f7;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto;
  cursor: pointer;
  left: ${(props) => props.direction === "left" && "10px"};
  right: ${(props) => props.direction === "right" && "10px"};
  `;


  const Slider = () => {  

return (
    <Container>
     <Arrow direction="left">
      <IoIosArrowBack/>
     </Arrow>
     <Arrow direction="right">
     <IoIosArrowForward/>
     </Arrow>
    </Container>
)
  }

export default Slider;