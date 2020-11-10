import React, { useState } from "react";

function IcecreamCard(props) {
  const [count, setCount] = useState(0);

  const addCount = () => {
    const newCount = count + 1;
    setCount(newCount);
  };

  const minusCount = () => {
    if (count === 0) return;
    const newCount = count - 1;
    setCount(newCount);
  };
  return (
    <div className="IcePicker-card-div" key={props.key}>
      <div className="IcePicker-card-heading">{props.title}</div>
      <div className="IcePicker-card-description">{props.description}</div>
      <div className="IcePicker-card-controller">
        <div className="IcePicker-less-Btn" onClick={minusCount}>
          <p className="IcePicker-less-minus">-</p>
        </div>
        <div
          className="IcePicker-Insert-Btn"
          style={{ backgroundColor: props.color }}
        >
          <p className="IcePicker-Insert-plus">{count === 0 ? "+" : count}</p>
        </div>
        <div className="IcePicker-Add-Btn" onClick={addCount}>
          <p className="IcePicker-Add-plus">+</p>
        </div>
      </div>
    </div>
  );
}

export default IcecreamCard;
