import React, { Component } from "react";
import style from "../../styles";
import { FoldersCont, FolderTitle } from "../MoveFolders/styles";
import { findGroupsUserBelongsTo } from "../../helperFuncs/updateNodes";

class UserFolders extends Component {
  render() {
    const { node, data } = this.props;
    const uri = node && node.uri ? node.uri : "";

    const iconType = "folder";
    const iconClass = `fa fa-${iconType}`;
    const iconStyle = { marginRight: "5px" };

    const folders = findGroupsUserBelongsTo(data, uri);

    return node && !node.children ? (
      <div>
        <br />
        <p>
          <FolderTitle>{node.name} </FolderTitle>Belongs in the following
          folders
        </p>
        {folders.map(folder => (
          <FoldersCont style={style.base} key={folder}>
            <div style={style.title}>
              <i className={iconClass} style={iconStyle} />
              {folder}
            </div>
          </FoldersCont>
        ))}
      </div>
    ) : null;
  }
}

export default UserFolders;
