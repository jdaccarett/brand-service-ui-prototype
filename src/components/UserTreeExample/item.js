import React, { Component } from "react";
import styled from "styled-components";
import { DragSource } from "react-dnd";

const itemsource = {
  beginDrag(props, monitor, component) {
    // Return the data describing the dragged item
    const item = { id: props.itemProps.node.uri };
    return item;
  },

  endDrag(props, monitor, component) {
    if (!monitor.didDrop()) {
      return;
    }
    // You may also read the drop result from the drop target
    // that handled the drop, if it returned an object from
    // its drop() method.
    const { groupUri } = monitor.getDropResult();
    const draggedNodeUri = props.itemProps.node.uri;
    return props.handleDrop(draggedNodeUri, groupUri);
  }
};

const Contaier = styled.div`
  display: flex;
  align-items: center;
`;

const Wrapper = styled.div`
  margin-left: auto;
`;

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    conenctDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  };
}

class Item extends Component {
  render() {
    const { isDragging, connectDragSource, name, itemProps } = this.props;
    const { style, node } = itemProps;
    const iconType = node.children ? "fa fa-users" : "fa fa-user";

    const iconClass = `fa fa-${iconType}`;
    const iconStyle = { marginRight: "5px" };

    const opacity = isDragging ? 0 : 1;

    return connectDragSource(
      <div style={{ ...style.base, opacity: opacity }}>
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

export default DragSource("item", itemsource, collect)(Item);
