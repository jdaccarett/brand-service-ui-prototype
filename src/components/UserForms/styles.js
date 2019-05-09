import styled from "styled-components";
import { Field } from "formik";

export const FormField = styled(Field)`
  color: black;
  font-weight: 400;
  border-radius: 5px;
  padding: 5px;
  border: none;
  margin-top: 10px;
`;

export const FieldLabel = styled.span`
  font-weight: 500;
  text-transform: capitalize;
`;

export const FormFieldContainer = styled.label`
  display: flex;
  flex-direction: ${props =>
    props.flexDirection ? props.flexDirection : "column"};
  align-items: ${props => (props.alignItems ? props.alignItems : "inherit")};
  position: relative;
  width: ${props => (props.width ? props.width : "100%")};
`;

export const SubmitButton = styled.button`
  color: black;
  margin: 20px 0px;
  outline: none;
  background-color: cadetblue;
  border: none;
  padding: 5px 20px;
  border-radius: 5px;
`;

export const AddUserButton = styled.button`
  color: black;
  margin: 20px 0px;
  outline: none;
  background-color: coral;
  border: none;
  padding: 5px 20px;
  border-radius: 5px;
`;

export const DeleteButton = styled.button`
  color: black;
  margin: 20px 0px;
  outline: none;
  background-color: red;
  border: none;
  padding: 5px 20px;
  border-radius: 5px;
`;
