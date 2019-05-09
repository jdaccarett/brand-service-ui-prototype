import React, { Component } from "react";

import { Mutation } from "react-apollo";

import { DELETE_GROUP } from "../../globalMutations";
import { GET_USERS } from "../../globlaQueries";

import { DeleteButton } from "../styles";

class DeleteGroupForm extends Component {
  render() {
    const { node } = this.props;

    return (
      <Mutation mutation={DELETE_GROUP}>
        {(deleteGroup, { data }) => (
          <DeleteButton
            onClick={() =>
              deleteGroup({
                variables: {
                  group: node.uri
                },
                refetchQueries: [{ query: GET_USERS }]
              })
            }
          >
            Delete Group
          </DeleteButton>
        )}
      </Mutation>
    );
  }
}

export default DeleteGroupForm;
