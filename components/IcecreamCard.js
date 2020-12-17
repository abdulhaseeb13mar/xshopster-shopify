import React, { useState } from "react";

function IcecreamCard(props) {
  const [count, setCount] = useState(0);
  const [countControls, setCountControls] = useState(false);

  const addCount = () => {
    // setCount(newCount);
    props.AddFlavor();
  };

  const minusCount = () => {
    // if (count === 0) return;
    props.MinusFlavor();
    // setCount(newCount);
  };

  const startCount = () => {
    setCountControls(true);
    props.AddFlavor();
    // addCount();
  };
  return (
    <div className="IcePicker-card-div" key={props.key}>
      <div className="IcePicker-card-heading">{props.title}</div>
      <div className="IcePicker-card-description">{props.description}</div>
      <div className="IcePicker-card-controller">
        {countControls && props.added !== 0 && (
          <div className="IcePicker-less-Btn" onClick={minusCount}>
            <p className="IcePicker-less-minus">-</p>
          </div>
        )}

        <div
          className="IcePicker-Insert-Btn"
          style={{ backgroundColor: props.color }}
        >
          <p className="IcePicker-Insert-plus" onClick={startCount}>
            {props.added === 0 ? "+" : props.added}
          </p>
        </div>
        {countControls && props.added !== 0 && (
          <div className="IcePicker-Add-Btn" onClick={addCount}>
            <p className="IcePicker-Add-plus">+</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default React.memo(IcecreamCard);
