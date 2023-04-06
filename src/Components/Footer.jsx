  import { SiLinkedin } from "react-icons/si";
  import styled from "styled-components";
  import { GrMail,GrInstagram } from "react-icons/gr";
  import { IoLocationSharp } from "react-icons/io5";
  import { BsFillTelephoneFill } from "react-icons/bs";
  import { AiOutlineMail } from "react-icons/ai";

  const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
  `;
  
  const Left = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 20px;
  `;
  
  const Logo = styled.h1``;
  
  const Desc = styled.p`
    margin: 20px 0px;
  `;
  
  const SocialContainer = styled.div`
    display: flex;
  `;
  
  const SocialIcon = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    color: white;
    background-color: #${(props) => props.color};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 20px;
  `;
  
  const Center = styled.div`
    flex: 1;
    padding: 20px;
  `;
  
  const Title = styled.h3`
    margin-bottom: 30px;
  `;
  
  const List = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
  `;
  
  const ListItem = styled.li`
    width: 50%;
    margin-bottom: 10px;
  `;
  
  const Right = styled.div`
    flex: 1;
    padding: 20px;
  `;
  
  const ContactItem = styled.div`
    margin-bottom: 20px;
    display: flex;
    align-items: center;
  `;
  
  const Payment = styled.img`
      width: 50%;
  `;
  
  const Footer = () => {
    return (
      <Container>
        <Left>
          <Logo>BOEKENZA.</Logo>
          <Desc>
          We believe in reducing waste and providing our customers with affordable options that are both sustainable and functional.By purchasing pre-loved stationary items from our store, you're not only saving money but also contributing to a more sustainable future. Join us in our mission
          </Desc>
          <SocialContainer>
            <SocialIcon color="3B5999">
              <SiLinkedin />
            </SocialIcon>
            <SocialIcon color="E4405F">
              <GrInstagram />
            </SocialIcon>
            <SocialIcon color="E60023">
              <GrMail />
            </SocialIcon>
          </SocialContainer>
        </Left>
        <Center>
          <Title>Useful Links</Title>
          <List>
            <ListItem>Home</ListItem>
            <ListItem>Cart</ListItem>
            <ListItem>Man Fashion</ListItem>
            <ListItem>Woman Fashion</ListItem>
            <ListItem>Accessories</ListItem>
            <ListItem>My Account</ListItem>
            <ListItem>Order Tracking</ListItem>
            <ListItem>Wishlist</ListItem>
            <ListItem>Wishlist</ListItem>
            <ListItem>Terms</ListItem>
          </List>
        </Center>
        <Right>
          <Title>Contact</Title>
          <ContactItem>
            <IoLocationSharp style={{marginRight:"10px"}}/> AITR , Indore (M.P.)
          </ContactItem>
          <ContactItem>
            <BsFillTelephoneFill style={{marginRight:"10px"}}/> +1 234 56 78
          </ContactItem>
          <ContactItem>
            <AiOutlineMail style={{marginRight:"10px"}} /> boekenza273644@gmail.com
          </ContactItem>
          <Payment src="https://i.ibb.co/Qfvn4z6/payment.png" />
        </Right>
      </Container>
    );
  };
  
  export default Footer;