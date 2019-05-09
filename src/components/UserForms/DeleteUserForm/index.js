import React, { Component } from "react";
import { Mutation } from "react-apollo";

import { DELETE_USER } from "../../globalMutations";
import { GET_USERS } from "../../globlaQueries";

import { DeleteButton } from "../styles";

class DeleteUserForm extends Component {
  render() {
    const { node } = this.props;

    return (
      <Mutation mutation={DELETE_USER}>
        {(deleteUser, { data }) => (
          <DeleteButton
            onClick={() =>
              deleteUser({
                variables: {
                  user: node.uri
                },
                refetchQueries: [{ query: GET_USERS }]
              })
            }
          >
            Delete User
          </DeleteButton>
        )}
      </Mutation>
    );
  }
}

export default DeleteUserForm;
