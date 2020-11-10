import { Page, Layout, EmptyState } from "@shopify/polaris";
import { TitleBar, ResourcePicker } from "@shopify/app-bridge-react";
import store from "store-js";
import ResourceListWithProducts from "../components/ResourceList";
import IceCreamPicker from "../components/IceCreamPicker";
import PriceCalculator from "../components/priceCalculator";

class Index extends React.Component {
  state = { open: false };

  handleSelection = (resources) => {
    const idFromResources = resources.selection.map((product) => {
      return product.id;
    });
    this.setState({ open: false });
    store.set("ids", idFromResources);
  };
  render() {
    const emptyState = !store.get("ids");
    return (
      <Page fullWidth>
        <TitleBar
          title="Sample App"
          primaryAction={{
            content: "Select products",
          }}
        />
        <ResourcePicker
          resourceType="Product"
          open={this.state.open}
          onCancel={() => this.setState({ open: false })}
          onSelection={(resources) => this.handleSelection(resources)}
        />
        {emptyState ? (
          <Layout>
            <Layout.Section>
              <IceCreamPicker />
            </Layout.Section>
            <Layout.Section secondary>
              <PriceCalculator />
            </Layout.Section>
          </Layout>
        ) : (
          <ResourceListWithProducts />
        )}
      </Page>
    );
  }
}

export default Index;

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
