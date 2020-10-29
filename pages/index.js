import { Page, Layout, EmptyState } from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
// import { ResourcePicker } from "@shopify/app-bridge-react";

class Index extends React.Component {
  state = { open: false };

  handleSelection = (resources) => {
    const idFromResources = resources.selection.map((product) => {
      return product.id;
    });
    this.setState({ open: false });
    console.log(idFromResources);
  };
  render() {
    return (
      <Page>
        <TitleBar
          title="Sample App"
          primaryAction={{
            content: "Select products",
          }}
        />
        <Layout>
          <EmptyState
            heading="Discount your products temporarily"
            action={{
              content: "Select Products",
              onAction: () => console.log("clicked"),
            }}
            secondaryAction={{
              content: "Learn more",
              url: "https://help.shopify.com",
            }}
            image="https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg"
          >
            <p>Track and receive your incoming inventory from suppliers.</p>
          </EmptyState>
        </Layout>
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
