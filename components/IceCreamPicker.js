import React, { Component } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import IceCreamCard from "./IcecreamCard";
import "./components.css";

class IceCreamPicker extends Component {
  render() {
    return (
      <div className="IcePicker-main-wrapper">
        <Query query={GET_PRODUCTS}>
          {({ data, loading, error }) => {
            if (loading) return <div>Loading…</div>;
            if (error) return <div>{error.message}</div>;
            console.log(data);
            return data.products.edges.map((prd) => {
              return (
                <IceCreamCard
                  key={prd.node.id}
                  title={prd.node.title}
                  description={prd.node.descriptionHtml}
                  color={prd.node.options[0].name}
                />
              );
            });
          }}
        </Query>
      </div>
    );
  }
}

export default IceCreamPicker;

const GET_PRODUCTS = gql`
  query {
    products(first: 20) {
      edges {
        node {
          id
          title
          productType
          descriptionHtml
          options {
            id
            name
          }
        }
      }
    }
  }
`;
