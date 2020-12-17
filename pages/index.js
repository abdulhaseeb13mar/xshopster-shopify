import React, { useEffect, useState } from "react";
import { Page, Layout, Toast, Button, Frame } from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import IceCreamPicker from "../components/IceCreamPicker";
import PriceCalculator from "../components/priceCalculator";
import gql from "graphql-tag";
import { useApolloClient } from "react-apollo";

function Index(props) {
  useEffect(() => {
    fetchFlavors();
  }, []);

  const [flavors, setFlavors] = useState([]);
  const [currentBundle, setCurrentBundle] = useState(4);
  const [activeToast, setActiveToast] = useState({
    state: false,
    msg: "",
    error: false,
  });
  const [bundleList, setBundleList] = useState([{}, {}, {}, {}]);
  const client = useApolloClient();

  const fetchFlavors = async () => {
    const data = await client.query({ query: GET_PRODUCTS });
    const arr = [];
    data.data.products.edges.map((Data, index) => {
      arr.push({
        id: Data.node.id,
        title: Data.node.title,
        description: Data.node.descriptionHtml,
        color: Data.node.options[0].name,
        photo: imagesArr[index],
        added: 0,
      });
    });
    console.log(arr);
    setFlavors(arr);
  };

  const updateBundle = async (bundle) => {
    let diff = bundle - bundleList.length;
    const arr = [...bundleList];
    if (diff > 0) {
      for (let i = 0; i < diff; i++) {
        arr.push({});
      }
      setBundleList(arr);
      setCurrentBundle(bundle);
    }
    if (diff < 0) {
      let positiveDiff = -diff;
      const filteredArr = arr.filter(
        (item, index) =>
          positiveDiff < arr.length - 1 - index ||
          positiveDiff == arr.length - 1 - index
      );
      await setBundleList(filteredArr);
      await setCurrentBundle(bundle);
      const resetedFlavors = resetFlavorsAdded();
      const updatedFlavors = updateFlavorsAdded(resetedFlavors, filteredArr);
      setFlavors(updatedFlavors);
    }
  };

  const updateFlavorsAdded = (resetedFlavors, filteredArr) => {
    for (let i = 0; i < resetedFlavors.length; i++) {
      for (let j = 0; j < filteredArr.length; j++) {
        if (filteredArr[j].id === resetedFlavors[i].id) {
          resetedFlavors[i].added++;
        }
      }
    }
    return resetedFlavors;
  };

  const resetFlavorsAdded = () => {
    const arr = [...flavors];
    arr.forEach((flavor) => {
      flavor.added = 0;
    });
    return arr;
  };

  const AddFlavor = (flavor) => {
    const arr = [...bundleList];
    const emptyIndex = arr.findIndex((obj) => Object.keys(obj).length === 0);
    if (emptyIndex === -1) {
      console.log(bundleList.length, currentBundle);
      toggleActive("Bundle is full!", true);
      return;
    }
    flavor.added = flavor.added + 1;
    const flavArr = [...flavors];
    arr[emptyIndex] = flavor;
    console.log(arr);
    setBundleList(arr);
    setFlavors(flavArr);
    toggleActive("Item Added", false);
  };

  const MinusFlavor = (flavor) => {
    flavor.added = flavor.added - 1;
    const arr = [...bundleList];
    const flavArr = [...flavors];
    const FirstOfThatFlavor = arr.findIndex((item) => item.id === flavor.id);
    console.log(FirstOfThatFlavor);
    arr[FirstOfThatFlavor] = "changed";
    const filteredArr = arr.filter((item) => item !== "changed");
    filteredArr.push({});
    console.log(filteredArr);
    setBundleList(filteredArr);
    setFlavors(flavArr);
    toggleActive("Item Removed", false);
  };

  const toggleActive = (msg, err) =>
    setActiveToast({
      state: !activeToast.state,
      msg: msg ? msg : "",
      error: err,
    });

  return (
    <Frame>
      <Page fullWidth>
        <TitleBar
          title="Sample App"
          primaryAction={{
            content: "Select products",
          }}
        />
        <Layout>
          <Layout.Section>
            <IceCreamPicker
              flavors={flavors}
              AddFlavor={AddFlavor}
              MinusFlavor={MinusFlavor}
              bundleList={bundleList}
            />
          </Layout.Section>
          <Layout.Section secondary>
            <PriceCalculator
              currentBundle={currentBundle}
              bundleList={bundleList}
              setCurrentBundle={updateBundle}
            />
          </Layout.Section>
        </Layout>
        {activeToast.state && (
          <Toast
            content={activeToast.msg}
            onDismiss={() => toggleActive("", false)}
            duration={2000}
            error={activeToast.error}
          />
        )}
      </Page>
    </Frame>
  );
}

export default React.memo(Index);

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

// return (
//       <Page
//         fullWidth
//         title="Product Selector"
//         primaryAction={{
//           content: "Select Product",
//           onAction: () => this.setState({ open: true }),
//         }}
//       >
//         <ResourcePicker
//           resourceType="Product"
//           open={this.state.open}
//           onCancel={() => this.setState({ open: false })}
//           onSelection={(resources) => this.handleSelection(resources)}
//         />
//       </Page>
//     );

const imagesArr = [
  "https://cdn.shopify.com/s/files/1/0365/3546/8172/files/Tipsy-Scoop-Blue-Chair-Coquito_2-5.jpg?v=1604365208",
  "https://cdn.shopify.com/s/files/1/0365/3546/8172/files/TipsyScoopPints-1.jpg?v=1588789000",
  "https://cdn.shopify.com/s/files/1/0365/3546/8172/files/TipsyScoopPints-4_92cbf38b-d5e4-4b1f-860c-80fe188ce343.jpg?v=1588789026",
  "https://cdn.shopify.com/s/files/1/0365/3546/8172/files/TipsyScoopPints-10_035e36ea-9abe-4d46-81f0-a710059aaab0.jpg?v=1588789047",
  "https://cdn.shopify.com/s/files/1/0365/3546/8172/files/045309AB-7A08-49F4-A767-B3F460DBED2A_1_201_a.jpeg?v=1603031306",
  "https://cdn.shopify.com/s/files/1/0365/3546/8172/files/Screen_Shot_2020-09-14_at_3.39.03_PM.png?v=1600112418",
  "https://cdn.shopify.com/s/files/1/0365/3546/8172/files/Screen_Shot_2020-09-14_at_3.38.53_PM.png?v=1600112489",
  "https://cdn.shopify.com/s/files/1/0365/3546/8172/files/Screen_Shot_2020-09-14_at_6.06.43_PM.png?v=1600121331",
  "https://cdn.shopify.com/s/files/1/0365/3546/8172/files/Bananas_Foster.jpg?v=1607787421",
  "https://cdn.shopify.com/s/files/1/0365/3546/8172/files/Tipsy-Scoop-Blue-Chair-Coquito_2-5.jpg?v=1604365208",
  "https://cdn.shopify.com/s/files/1/0365/3546/8172/files/TipsyScoopPints-1.jpg?v=1588789000",
  "https://cdn.shopify.com/s/files/1/0365/3546/8172/files/TipsyScoopPints-4_92cbf38b-d5e4-4b1f-860c-80fe188ce343.jpg?v=1588789026",
  "https://cdn.shopify.com/s/files/1/0365/3546/8172/files/TipsyScoopPints-10_035e36ea-9abe-4d46-81f0-a710059aaab0.jpg?v=1588789047",
  "https://cdn.shopify.com/s/files/1/0365/3546/8172/files/045309AB-7A08-49F4-A767-B3F460DBED2A_1_201_a.jpeg?v=1603031306",
  "https://cdn.shopify.com/s/files/1/0365/3546/8172/files/Screen_Shot_2020-09-14_at_3.39.03_PM.png?v=1600112418",
];
