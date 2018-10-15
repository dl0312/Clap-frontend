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

// export const Loading = styled.div`
//   .lds-ripple {
//     display: inline-block;
//     position: relative;
//     width: 64px;
//     height: 64px;
//   }
//   .lds-ripple div {
//     position: absolute;
//     border: 4px solid #fff;
//     opacity: 1;
//     border-radius: 50%;
//     animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
//   }
//   .lds-ripple div:nth-child(2) {
//     animation-delay: -0.5s;
//   }
//   @keyframes lds-ripple {
//     0% {
//       top: 28px;
//       left: 28px;
//       width: 0;
//       height: 0;
//       opacity: 1;
//     }
//     100% {
//       top: -1px;
//       left: -1px;
//       width: 58px;
//       height: 58px;
//       opacity: 0;
//     }
//   }
// `
;
