import React, { Component } from "react";
import { Query } from "react-apollo";

import { Treebeard, decorators } from "react-treebeard";
import styles from "../../../styles";
import { Mutation } from "react-apollo";
import { FoldersCont, FolderTitle } from "../../MoveFolders/styles";
import style from "../../../styles";
import gql from "graphql-tag";
import { GET_RESOURCES } from "../../globlaQueries";
import { CustomHeader } from "../../ResourceTreeExample/customDecorators";
import rename from "deep-rename-keys";
import { reshapeResource } from "../../../helperFuncs/updateNodes";

const MOVE_RESOURCE = gql`
  mutation MoveResource(
    $destination: String!
    $resource: String!
    $source: String!
  ) {
    moveResource(
      destination: $destination
      resource: $resource
      source: $source
    ) {
      ok
    }
  }
`;

class MoveResourceForm extends Component {
  state = {};

  onToggle = (node, toggled) => {
    const { cursor } = this.state;

    if (cursor) {
      cursor.active = false;
    }

    node.active = true;

    this.setState({ cursor: node });

    let destination = node.uri;
    let resource = this.props.node.uri;
    let source = this.props.node.parent;

    this.props.client.mutate({
      mutation: MOVE_RESOURCE,
      variables: { destination, resource, source },
      refetchQueries: [{ query: GET_RESOURCES }]
    });
  };

  render() {
    // custom decorators
    decorators.Header = CustomHeader;

    return (
      <Query query={GET_RESOURCES}>
        {({ loading, error, data }) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;

          let { reshapedResources } = reshapeResource(
            rename(
              {
                data: data.getResources
              },
              key => (key === "descendants" ? "children" : key)
            ).data
          );

          const resourceformatedData = {
            uri: "Root",
            name: "Root",
            partner: null,
            kind: null,
            advertiser: null,
            toggled: true,
            children: reshapedResources.children
          };

          return (
            <div>
              <br />
              <p>
                Move
                <FolderTitle> {this.props.node.name}</FolderTitle> to any of the
                following folders
              </p>
              <Treebeard
                styles={styles}
                data={resourceformatedData}
                onToggle={this.onToggle}
              />
            </div>
          );
        }}
      </Query>
    );
  }
}

export default MoveResourceForm;
