import styled from "styled-components";

export const BodyContainer = styled.div`
  padding-top: 2px;
`;

export const NavBar = styled.div`
  padding: 0 20px;
  height: 35px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 600;
  font-size: 12px;
  color: rgb(81, 97, 103);
  background-color: rgb(234, 234, 234);
`;

export const BodyColumn = styled.ul`
  height: 0px;
  padding: 0 20px;
`;

export const Item = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
  font-weight: 600;
  color: #8f9699;
`;

export const Button = styled.button`
  background-color: white;
  color: black;
  border: 0.5px solid rgba(0, 0, 0, 0.2);
  padding: 10px 20px;
  margin: 5px;
  cursor: pointer;
`;
