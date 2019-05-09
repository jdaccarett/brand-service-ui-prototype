import React, { Component } from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { Formik, Form, ErrorMessage } from "formik";
import { GET_USERS } from "../../globlaQueries";

import {
  FormField,
  FieldLabel,
  FormFieldContainer,
  SubmitButton
} from "../styles";

const UPDATE_GROUP = gql`
  mutation UpsertGroup($uri: String!, $name: String!, $notes: String!) {
    upsertGroup(groupInput: { uri: $uri, name: $name, notes: $notes }) {
      ok
    }
  }
`;

class AddNewGroupForm extends Component {
  render() {
    const { node } = this.props;
    return node && node.name === "users" ? (
      <Mutation mutation={UPDATE_GROUP}>
        {(upsertGroup, { data }) => (
          <Formik
            enableReinitialize
            initialValues={{
              name: "",
              notes: node && node.notes ? node.notes : ""
            }}
            onSubmit={values => {
              upsertGroup({
                variables: {
                  name: values.name,
                  uri: values.name,
                  notes: values.notes
                },
                refetchQueries: [{ query: GET_USERS }]
              });
            }}
          >
            {({ isSubmitting, values }) => (
              <Form>
                <FormFieldContainer width="100%">
                  <FieldLabel active={values.name.length}>
                    Add New Group:
                  </FieldLabel>
                  <FormField type="text" name="name" />
                  <ErrorMessage name="name" component="div" />
                </FormFieldContainer>
                <FormFieldContainer width="100%">
                  <FieldLabel active={values.notes.length}>
                    Update {node.name} notes :
                  </FieldLabel>
                  <FormField type="text" name="notes" component="textarea" />
                  <ErrorMessage name="notes" component="div" />
                </FormFieldContainer>
                <SubmitButton type="submit">Save</SubmitButton>
              </Form>
            )}
          </Formik>
        )}
      </Mutation>
    ) : null;
  }
}

export default AddNewGroupForm;
