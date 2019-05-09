import React from "react";

import { Treebeard, decorators } from "react-treebeard";
import styles from "../../styles";
import * as filters from "../../helperFuncs/filter";

import { CustomHeader } from "./customDecorators";
import ResourceForms from "../ResourceForms";

class ResourceTreeExample extends React.Component {
  state = {
    data: this.props.data,
    unfiltered: this.props.data,
    resourceData: this.props.data
  };

  componentDidUpdate(prevProps, prevState) {
    if (JSON.stringify(this.props.data) !== JSON.stringify(prevProps.data)) {
      this.setState({
        data: this.props.data,
        cursor: null
      });
    }
  }
  onToggle = (node, toggled) => {
    const { cursor } = this.state;

    if (cursor) {
      cursor.active = false;
    }

    node.active = true;
    if (node.children) {
      node.toggled = toggled;
    }
    this.setState({ cursor: node });
  };

  onFilterMouseUp = e => {
    const filter = e.target.value.trim();
    if (!filter) {
      return this.setState({ data: this.props.data });
    }
    var filtered = filters.filterTree(this.props.data, filter);
    filtered = filters.expandFilteredNodes(filtered, filter);
    this.setState({ data: filtered });
  };

  render() {
    const { data, cursor } = this.state;

    // custom decorators
    decorators.Header = CustomHeader;

    return (
      <div>
        <h3 style={{ paddingLeft: 20 }}>Resource Management</h3>
        <div style={styles.searchBox}>
          <div className="input-group">
            <span className="input-group-addon">
              <i className="fa fa-search" />
            </span>
            <input
              className="form-control"
              onKeyUp={this.onFilterMouseUp}
              placeholder="Search resource tree..."
              type="text"
            />
          </div>
        </div>
        <div style={styles.component}>
          <Treebeard
            styles={styles}
            data={data}
            decorators={decorators}
            onToggle={this.onToggle}
          />
        </div>
        <div style={styles.component}>
          <ResourceForms node={cursor} />
        </div>
      </div>
    );
  }
}

export default ResourceTreeExample;
