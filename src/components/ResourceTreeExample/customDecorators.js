import React from "react";
import styled from "styled-components";

const Contaier = styled.div`
  display: flex;
  align-items: center;
`;

const Wrapper = styled.div`
  margin-left: auto;
`;

export const CustomHeader = ({ style, node }) => {
  const iconType = node.children ? "fa fa-files-o fa-lg" : "fa fa-file-o ";

  const iconClass = `fa fa-${iconType}`;
  const iconStyle = { marginRight: "5px" };
  return (
    <div style={style.base}>
      <Contaier>
        <div style={style.title}>
          <i className={iconClass} style={iconStyle} />
          {node.name}
        </div>
      </Contaier>
    </div>
  );
};
