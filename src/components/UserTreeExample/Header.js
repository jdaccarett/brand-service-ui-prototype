import React, { Component } from "react";
import Item from "./item";
import Group from "./group";
import { Mutation, Query } from "react-apollo";
import * as updateNodes from "../../helperFuncs/updateNodes";
import { GET_USERS } from "../globlaQueries";
import rename from "deep-rename-keys";

import gql from "graphql-tag";

const MOVE_USER = gql`
  mutation MoveUser($source: String!, $destination: String!, $user: String!) {
    moveUser(source: $source, destination: $destination, user: $user) {
      ok
    }
  }
`;

class Header extends Component {
  render() {
    const props = this.props.headerProps;

    return (
      <Query query={GET_USERS}>
        {({ loading, error, data }) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;

          const usersFormatedData = rename(
            {
              name: "users",
              toggled: true,
              children: data.getUsers
            },
            key => (key === "users" ? "children" : key)
          );

          return (
            <Mutation mutation={MOVE_USER}>
              {moveUser => (
                <>
                  {props.node.children ? (
                    <Group key={props.node.uri} itemProps={props} />
                  ) : (
                    <Item
                      key={props.node.uri}
                      itemProps={props}
                      handleDrop={(nodeUri, groupUri) => {
                        const group = updateNodes.findNodesGroupName(
                          usersFormatedData,
                          nodeUri
                        );

                        moveUser({
                          variables: {
                            source: group,
                            destination: groupUri,
                            user: nodeUri
                          },
                          refetchQueries: [{ query: GET_USERS }]
                        });
                      }}
                    />
                  )}
                </>
              )}
            </Mutation>
          );
        }}
      </Query>
    );
  }
}

export default Header;
