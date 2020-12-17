import React, { useEffect, useState } from "react";
import IceCreamCard from "./IcecreamCard";
import "./components.css";

const IceCreamPicker = (props) => {
  return (
    <div className="IcePicker-main-wrapper">
      {props.flavors.length > 0 &&
        props.flavors.map((SingleFlavor) => {
          return (
            <IceCreamCard
              key={SingleFlavor.id}
              title={SingleFlavor.title}
              description={SingleFlavor.description}
              color={SingleFlavor.color}
              added={SingleFlavor.added}
              AddFlavor={() => props.AddFlavor(SingleFlavor)}
              MinusFlavor={() => props.MinusFlavor(SingleFlavor)}
            />
          );
        })}
    </div>
  );
};

export default React.memo(IceCreamPicker);

{
  /* <Query query={GET_PRODUCTS}>
        {({ data, loading, error }) => {
          if (loading) return <div>Loading…</div>;
          if (error) return <div>{error.message}</div>;
          console.log(data);
          const hac = data.products.edges.map((prd) => {
            return (
              <IceCreamCard
                key={prd.node.id}
                title={prd.node.title}
                description={prd.node.descriptionHtml}
                color={prd.node.options[0].name}
              />
            );
          });
          this.props.updateFlavour();
          return hac;
        }}
      </Query> */
}
