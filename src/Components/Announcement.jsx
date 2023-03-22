import React from "react";
import styled from "styled-components";

const Container = styled.div`
  height: 30px;
  background-color: teal;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Announcement = () => {
  return (
    <Container>
      <h1>this is Announcement</h1>
    </Container>
  );
};

export default Announcement;