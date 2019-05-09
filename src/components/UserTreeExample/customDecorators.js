import React from "react";
import styled from "styled-components";
import Header from "./Header";
const Contaier = styled.div`
  display: flex;
  align-items: center;
`;

const Wrapper = styled.div`
  margin-left: auto;
`;

export const CustomHeader = props => {
  return <Header headerProps={props} />;
};
