import React, { Component } from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { Formik, Form, ErrorMessage } from "formik";
import { GET_RESOURCES } from "../../globlaQueries";

import {
  FormField,
  FieldLabel,
  FormFieldContainer,
  SubmitButton
} from "../../UserForms/styles";

const ADD_NEW_RESOURCE = gql`
  mutation UpsertResource(
    $uri: String!
    $name: String
    $resource: String!
    $kind: String
    $partner: String
    $advertiser: String
  ) {
    upsertResource(
      resourceInput: {
        uri: $uri
        name: $name
        kind: $kind
        partner: $partner
        advertiser: $advertiser
      }
      resource: $resource
    ) {
      ok
    }
  }
`;

class AddNewResourceForm extends Component {
  render() {
    const { node } = this.props;
    const name = node && node.name ? node.name : "";

    return (
      <Mutation mutation={ADD_NEW_RESOURCE}>
        {(upsertResource, { data }) => (
          <Formik
            enableReinitialize
            initialValues={{
              name: "",
              partner: "",
              kind: "",
              advertiser: ""
            }}
            onSubmit={values => {
              upsertResource({
                variables: {
                  uri: values.name,
                  name: values.name,
                  partner: values.partner,
                  kind: values.kind,
                  advertiser: values.advertiser,
                  resource: node.uri
                },
                refetchQueries: [{ query: GET_RESOURCES }]
              });
            }}
          >
            {({ isSubmitting, values }) => (
              <Form>
                <h4>Add New Resource to {name}:</h4>
                <FormFieldContainer width="100%">
                  <FieldLabel active={values.name.length}>name :</FieldLabel>
                  <FormField type="text" name="name" />
                  <ErrorMessage name="name" component="div" />
                </FormFieldContainer>

                <FormFieldContainer width="100%">
                  <FieldLabel active={values.partner.length}>
                    partner :
                  </FieldLabel>
                  <FormField type="text" name="partner" />
                  <ErrorMessage name="partner" component="div" />
                </FormFieldContainer>

                <FormFieldContainer width="100%">
                  <FieldLabel active={values.kind.length}>kind :</FieldLabel>
                  <FormField type="text" name="kind" />
                  <ErrorMessage name="kind" component="div" />
                </FormFieldContainer>

                <FormFieldContainer width="100%">
                  <FieldLabel active={values.advertiser.length}>
                    advertiser :
                  </FieldLabel>
                  <FormField type="text" name="advertiser" />
                  <ErrorMessage name="advertiser" component="div" />
                </FormFieldContainer>

                <SubmitButton type="submit">Save</SubmitButton>
              </Form>
            )}
          </Formik>
        )}
      </Mutation>
    );
  }
}

export default AddNewResourceForm;
