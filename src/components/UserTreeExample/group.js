import React, { Component } from "react";
import styled from "styled-components";
import { DropTarget } from "react-dnd";

const Contaier = styled.div`
  display: flex;
  align-items: center;
`;

const Wrapper = styled.div`
  margin-left: auto;
`;

const groupTarget = {
  canDrop(props, monitor) {
    // You can disallow drop based on props or item
    const item = monitor.getItem();
    return item;
  },

  hover(props, monitor, component) {
    // This is fired very often and lets you perform side effects
    // in response to the hover. You can't handle enter and leave
    // here—if you need them, put monitor.isOver() into collect() so you
    // can just use componentDidUpdate() to handle enter/leave.

    const canDrop = monitor.canDrop();
  },

  drop(props, monitor, component) {
    if (monitor.didDrop()) {
      // If you want, you can check whether some nested
      // target already handled drop
      return;
    }

    // You can also do nothing and return a drop result,
    // which will be available as monitor.getDropResult()
    // in the drag source's endDrag() method

    return { groupUri: props.itemProps.node.uri };
  }
};

function collect(connect, monitor) {
  return {
    // Call this function inside render()
    // to let React DnD handle the drag events:
    connectDropTarget: connect.dropTarget(),
    // You can ask the monitor about the current drag state:
    hovered: monitor.isOver(),
    item: monitor.getItem()
  };
}

class Group extends Component {
  render() {
    // These props are injected by React DnD,
    // as defined by your `collect` function above:
    const { connectDropTarget, hovered, itemProps } = this.props;
    const { style, node } = itemProps;

    const iconType = node.children ? "fa fa-users" : "fa fa-user";

    const iconClass = `fa fa-${iconType}`;
    const iconStyle = { marginRight: "5px" };

    const backgroundColor = hovered ? "lightgreen" : "transparent";

    return connectDropTarget(
      <div style={{ ...style.base, background: backgroundColor }}>
        <Contaier>
          <div style={style.title}>
            <i className={iconClass} style={iconStyle} />
            {node.name}
          </div>
        </Contaier>
      </div>
    );
  }
}

export default DropTarget("item", groupTarget, collect)(Group);
