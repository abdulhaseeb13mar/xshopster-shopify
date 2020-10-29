import React, { Component } from "react";
import {
  Button,
  Card,
  Form,
  FormLayout,
  Layout,
  Page,
  Stack,
  SettingToggle,
  TextStyle,
  TextField,
} from "@shopify/polaris";

class AnnotatedLayout extends Component {
  state = {
    discount: "10%",
    enabled: false,
  };

  handleSubmit = () => {
    this.setState({ discount: this.state.discount });
    console.log("submission", this.state);
  };

  handleChange = (field) => {
    return (value) => this.setState({ [field]: value });
  };

  handleToggle = () => {
    this.setState(({ enabled }) => {
      return { enabled: !enabled };
    });
  };

  render() {
    const contentStatus = this.state.enabled ? "Disable" : "Enable";
    const textStatus = this.state.enabled ? "enabled" : "disabled";

    return (
      <Page>
        <Layout>
          <Layout.AnnotatedSection
            title="Default discount"
            description="Add a product to Sample App, it will automatically be discounted."
          >
            <Card sectioned>
              <Form onSubmit={this.handleSubmit}>
                <FormLayout>
                  <TextField
                    value={this.state.discount}
                    onChange={this.handleChange("discount")}
                    label="Discount percentage"
                    type="discount"
                  />
                  <Stack distribution="trailing">
                    <Button primary submit>
                      {" "}
                      Save
                    </Button>
                  </Stack>
                </FormLayout>
              </Form>
            </Card>
          </Layout.AnnotatedSection>
          <Layout.AnnotatedSection
            title="Price updates"
            description="Temporarily disable all Sample App price update"
          >
            <SettingToggle
              action={{ content: contentStatus, onAction: this.handleToggle }}
              enabled={this.state.enabled}
            >
              This Setting is{" "}
              <TextStyle variation="strong">{textStatus}</TextStyle>
            </SettingToggle>
          </Layout.AnnotatedSection>
        </Layout>
      </Page>
    );
  }
}

export default AnnotatedLayout;
