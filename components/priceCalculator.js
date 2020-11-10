import React, { useState } from "react";
import { Button } from "@shopify/polaris";
import "./components.css";

function priceCalculator(props) {
  const [bundle, setBundle] = useState(0);
  const bundle4_price = "49.00";
  const bundle6_price = "75.00";
  const bundle18_price = "216.00";
  return (
    <>
      {" "}
      <div className="PC-main-div">
        <div className="PC-calculation-div">
          <div className="PC-calculation-heading">
            Choose Your own <br />
            Boozy Ice Cream
          </div>
          <div className="PC-calculation-heading2">
            <h5>HOW MANY PINTS?</h5>
          </div>
          <div className="PC-calculation-options-div">
            <div className="PC-options-div">
              <div
                className="PC-options"
                style={{ border: bundle === 4 && "2px solid white" }}
                onClick={() => setBundle(4)}
              >
                4
              </div>
              <div
                className="PC-options"
                style={{ border: bundle === 6 && "2px solid white" }}
                onClick={() => setBundle(6)}
              >
                6
              </div>
              <div
                className="PC-options"
                style={{ border: bundle === 18 && "2px solid white" }}
                onClick={() => setBundle(18)}
              >
                18
              </div>
            </div>
            <div className="PC-Price">
              $
              {bundle === 4
                ? bundle4_price
                : bundle === 6
                ? bundle6_price
                : bundle === 18
                ? bundle18_price
                : "00.00"}
            </div>
          </div>
        </div>
        <div className="PC-items-div">
          <div className="PC-item">item 1</div>
          <div className="PC-item">item 2</div>
          <div className="PC-item">item 3</div>
        </div>
      </div>
      <Button fullWidth>Select Flavours Please</Button>
    </>
  );
}

export default priceCalculator;
