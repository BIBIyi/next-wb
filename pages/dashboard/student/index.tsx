import React from "react";
import styled from "styled-components";
export const Button = styled.button`
  background: palevioletred;
  border-radius: 3px;
  border: none;
  color: white;
`;
export default function index() {
  return (
    <>
      <Button>purple.</Button>
    </>
  );
}
