import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { DeleteButton } from "../../UserForms/styles";
import { GET_RESOURCES } from "../../globlaQueries";

const DELETE_RESOURCE = gql`
  mutation DeleteResource($group: String!) {
    deleteResource(group: $group) {
      ok
    }
  }
`;

class DeleteResourceForm extends Component {
  render() {
    const { node } = this.props;

    return (
      <Mutation mutation={DELETE_RESOURCE}>
        {(deleteResource, { data }) => (
          <DeleteButton
            onClick={() =>
              deleteResource({
                variables: {
                  group: node.uri
                },
                refetchQueries: [{ query: GET_RESOURCES }]
              })
            }
          >
            Delete Resource
          </DeleteButton>
        )}
      </Mutation>
    );
  }
}

export default DeleteResourceForm;
