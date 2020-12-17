import React, { useEffect, useState } from "react";
import { Button } from "@shopify/polaris";
import "./components.css";

function priceCalculator(props) {
  useEffect(() => {
    checkBundleLeft();
  }, [props.bundleList]);
  const bundle4_price = "49.00";
  const bundle6_price = "75.00";
  const bundle18_price = "216.00";
  const [bundleLeft, setBundleLeft] = useState(0);

  const checkBundleLeft = () => {
    let tempBundleLeft = 0;
    props.bundleList.forEach((item) => {
      !item.id && tempBundleLeft++;
    });
    setBundleLeft(tempBundleLeft);
  };

  const renderBundle = () => {
    console.log("price calculator bundlelist:", props.bundleList);
    return props.bundleList.map((item, index) => {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            key={item.id}
            className="PC-item"
            style={{
              backgroundImage: `url(${item.photo})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          ></div>
          <div style={{ color: "black" }}>item {index + 1}</div>
        </div>
      );
    });
  };
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
                style={{
                  border: props.currentBundle === 4 && "2px solid white",
                }}
                onClick={() => props.setCurrentBundle(4)}
              >
                4
              </div>
              <div
                className="PC-options"
                style={{
                  border: props.currentBundle === 6 && "2px solid white",
                }}
                onClick={() => props.setCurrentBundle(6)}
              >
                6
              </div>
              <div
                className="PC-options"
                style={{
                  border: props.currentBundle === 18 && "2px solid white",
                }}
                onClick={() => props.setCurrentBundle(18)}
              >
                18
              </div>
            </div>
            <div className="PC-Price">
              $
              {props.currentBundle === 4
                ? bundle4_price
                : props.currentBundle === 6
                ? bundle6_price
                : props.currentBundle === 18
                ? bundle18_price
                : "00.00"}
            </div>
          </div>
        </div>
        <div className="PC-items-div">{renderBundle()}</div>
      </div>
      <Button
        fullWidth
        disabled={bundleLeft === 0 ? false : true}
        id="Confirm-Flavor-Button"
      >
        {bundleLeft === 0
          ? "Add to Cart"
          : `Select ${bundleLeft !== 0 && bundleLeft} more Flavours Please`}
      </Button>
    </>
  );
}

export default priceCalculator;
