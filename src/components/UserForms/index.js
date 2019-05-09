import React, { Component } from "react";
import PropTypes from "prop-types";

import AddNewGroupForm from "./AddNewGroupForm";
import AddNewUserForm from "./AddNewUserForm";
import UpdateGroupForm from "./UpdateGroupForm";
import UpdateUserForm from "./UpdateUserForm";
import DeleteUserForm from "./DeleteUserForm";
import DeleteGroupForm from "./DeleteGroupForm";

class UserForm extends Component {
  render() {
    const { node, data } = this.props;
    const label = node && node.label ? node.label : "";

    return (
      <>
        <AddNewGroupForm node={node} />
        {label === "Group" ? (
          <UpdateGroupForm node={node} />
        ) : (
          <UpdateUserForm node={node} data={data} />
        )}
        {node && node.label !== "Group" && node.name !== "users" ? (
          <DeleteUserForm node={node} />
        ) : null}
        {node &&
        node.label === "Group" &&
        node.name !== "users" &&
        node.children.length === 0 ? (
          <DeleteGroupForm node={node} />
        ) : null}

        <AddNewUserForm node={node} data={data} />
      </>
    );
  }
}

UserForm.propTypes = {
  node: PropTypes.object
};

export default UserForm;
