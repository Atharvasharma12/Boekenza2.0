import styled from "styled-components";

const Container = styled.div`
  height: 60vh;
  background-color: #fcf5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const Title = styled.h1`
  font-size: 70px;
  margin-bottom: 20px;
  @media (max-width: 600px) {
    font-size: 30px;
  }
`;

const Desc = styled.div`
  font-size: 24px;
  font-weight: 300;
  margin-bottom: 20px;
  @media (max-width: 600px) {
    font-size: 1.4em;
  }
`;




const Contact = () => {
  return (
    <Container>
      
      <Title>Contact Us</Title>
      <Desc>Mail us at boekenza@gmail.com.</Desc>
    </Container>
  );
};

export default Contact;