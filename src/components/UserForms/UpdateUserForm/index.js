import React, { Component } from "react";

import { Mutation } from "react-apollo";
import { Formik, Form, ErrorMessage } from "formik";
import * as updateNodes from "../../../helperFuncs/updateNodes";

import { UPDATE_USER } from "../../globalMutations";
import { GET_USERS } from "../../globlaQueries";

import {
  FormField,
  FieldLabel,
  FormFieldContainer,
  SubmitButton
} from "../styles";

class UpdateUserForm extends Component {
  render() {
    const { node } = this.props;

    return (
      <Mutation mutation={UPDATE_USER}>
        {(upsertUser, { data }) => (
          <Formik
            enableReinitialize
            initialValues={{
              name: node && node.name ? node.name : "",
              notes: node && node.notes ? node.notes : ""
            }}
            onSubmit={values => {
              // Retrieves Noodes Group Name
              let group = updateNodes.findNodesGroupName(
                this.props.data,
                node.uri
              );
              upsertUser({
                variables: {
                  name: values.name,
                  group,
                  uri: node.uri,
                  notes: values.notes
                },
                refetchQueries: [{ query: GET_USERS }]
              });
            }}
          >
            {({ isSubmitting, values }) => {
              return node && node.uri && node.uri !== "users" ? (
                <Form>
                  <FormFieldContainer width="100%">
                    <FieldLabel active={values.name.length}>
                      Update {node.name} name :
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
              ) : null;
            }}
          </Formik>
        )}
      </Mutation>
    );
  }
}

export default UpdateUserForm;
