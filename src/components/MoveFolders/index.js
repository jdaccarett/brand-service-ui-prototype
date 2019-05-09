import React, { Component } from "react";
import { Mutation } from "react-apollo";
import * as updateNodes from "../../helperFuncs/updateNodes";
import { UPDATE_USER } from "../globalMutations";
import { GET_USERS } from "../globlaQueries";
import { FoldersCont, FolderTitle, MoveFolderContainer } from "./styles";
import style from "../../styles";
import gql from "graphql-tag";

const MOVE_USER = gql`
  mutation MoveUser($source: String!, $destination: String!, $user: String!) {
    moveUser(source: $source, destination: $destination, user: $user) {
      ok
    }
  }
`;

class MoveFolders extends Component {
  state = {
    folders: []
  };

  componentDidMount() {
    this.parseObjectProperties(this.props.data, []);
  }

  parseObjectProperties = (obj, arr) => {
    for (let k in obj) {
      if (typeof obj[k] === "object" && obj[k] !== null) {
        k === "children" && obj.name !== "users"
          ? arr.push({ uri: obj.uri, name: obj.name })
          : null;
        this.parseObjectProperties(obj[k], arr);
      }
    }
    this.setState({
      folders: arr
    });
  };

  render() {
    const node = this.props.node ? this.props.node : "";
    const iconType = "folder";
    const iconClass = `fa fa-${iconType}`;
    const iconStyle = { marginRight: "5px" };
    const name = node && node.name ? node.name : "";
    const group = updateNodes.findNodesGroupName(this.props.data, node.uri);

    return node && !node.children ? (
      <>
        <Mutation mutation={MOVE_USER}>
          {moveUser => (
            <MoveFolderContainer>
              <p>
                Move user <FolderTitle>{name} </FolderTitle>to any folder below
              </p>
              {this.state.folders.map(val => {
                return (
                  <FoldersCont
                    style={style.base}
                    key={val.uri}
                    onClick={() => {
                      moveUser({
                        variables: {
                          source: group,
                          destination: val.uri,
                          user: node.uri
                        },
                        refetchQueries: [{ query: GET_USERS }]
                      });
                    }}
                  >
                    <div style={style.title}>
                      <i className={iconClass} style={iconStyle} />
                      {val.name}
                    </div>
                  </FoldersCont>
                );
              })}
            </MoveFolderContainer>
          )}
        </Mutation>
        <br />
        <Mutation mutation={UPDATE_USER}>
          {upsertUser => (
            <MoveFolderContainer>
              <p>
                Add <FolderTitle>{name} </FolderTitle>to any folder below
              </p>
              {this.state.folders.map(val => (
                <FoldersCont
                  style={style.base}
                  key={val.uri}
                  onClick={() => {
                    // Get group of selected Node
                    upsertUser({
                      variables: {
                        uri: node.uri,
                        notes: node.notes,
                        name: node.name,
                        group: val.name
                      },
                      refetchQueries: [{ query: GET_USERS }]
                    });
                  }}
                >
                  <div style={style.title}>
                    <i className={iconClass} style={iconStyle} />
                    {val.name}
                  </div>
                </FoldersCont>
              ))}
            </MoveFolderContainer>
          )}
        </Mutation>
      </>
    ) : null;
  }
}

export default MoveFolders;
