// src/nodes/CreateNode.jsx
import BaseNode from './BaseNode.jsx';

export const CreateNode = ({
  label,
  inputs = [],
  outputs = [],
  width,
  render,
}) => {
  return function Node({ id, data }) {
    return (
      <BaseNode
        id={id}
        label={label}
        inputs={inputs.map((i) => ({ id: `${id}-${i}` }))}
        outputs={outputs.map((o) => ({ id: `${id}-${o}` }))}
        width={width}
      >
        {render?.({ id, data })}
      </BaseNode>
    );
  };
};
