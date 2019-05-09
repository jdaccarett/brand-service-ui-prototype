import React, { Component } from "react";
import PropTypes from "prop-types";
import { ApolloConsumer } from "react-apollo";

import AddNewResourceForm from "./AddNewResourceForm";
import UpdateResourceForm from "./UpdateResourceForm";
import MoveResourceForm from "./MoveResourceForm";
import DeleteResourceForm from "./DeleteResourceForm";

class ResourceForms extends Component {
  render() {
    const { node, data } = this.props;
    return node ? (
      <>
        <AddNewResourceForm node={node} data={data} />
        <UpdateResourceForm node={node} data={data} />
        <ApolloConsumer>
          {client => <MoveResourceForm node={node} client={client} />}
        </ApolloConsumer>
        {node && !node.children ? <DeleteResourceForm node={node} /> : null}
      </>
    ) : null;
  }
}

ResourceForms.propTypes = {
  node: PropTypes.object
};

export default ResourceForms;
