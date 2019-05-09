import React, { Component } from "react";
import PropTypes from "prop-types";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { Formik, Form, ErrorMessage } from "formik";
import { GET_USERS } from "../../globlaQueries";

import {
  FormField,
  FieldLabel,
  FormFieldContainer,
  AddUserButton
} from "../styles";

const CREATE_USER = gql`
  mutation CreateUser($name: String!, $group: String!, $uri: String!) {
    createUser(userInput: { name: $name, uri: $uri }, group: $group) {
      ok
    }
  }
`;

class AddNewUserForm extends Component {
  render() {
    const { node } = this.props;
    const name = node && node.name ? node.name : "";
    const label = node && node.label ? node.label : "";

    return (
      <>
        <Mutation mutation={CREATE_USER}>
          {(createUser, { data }) => (
            <Formik
              enableReinitialize
              initialValues={{
                name: "",
                label: ""
              }}
              onSubmit={values => {
                // Retrieves Noodes Group Name

                createUser({
                  variables: {
                    name: values.name,
                    group: node.uri,
                    uri: values.name
                  },
                  refetchQueries: [{ query: GET_USERS }]
                });

                values.name = "";
              }}
            >
              {({ isSubmitting, values }) => {
                return node && node.children && node.name !== "users" ? (
                  <Form>
                    <FormFieldContainer width="100%">
                      <FieldLabel active={values.name.length}>
                        Add New User To Group {node.name} :
                      </FieldLabel>
                      <FormField
                        placeholder={"Add New User"}
                        type="text"
                        name="name"
                      />
                      <ErrorMessage name="name" component="div" />
                    </FormFieldContainer>
                    <AddUserButton type="submit">
                      Add User
                      <i
                        className="fa fa-user-plus"
                        style={{ marginLeft: "5px" }}
                      />
                    </AddUserButton>
                  </Form>
                ) : null;
              }}
            </Formik>
          )}
        </Mutation>
      </>
    );
  }
}

AddNewUserForm.propTypes = {
  node: PropTypes.object
};

export default AddNewUserForm;
