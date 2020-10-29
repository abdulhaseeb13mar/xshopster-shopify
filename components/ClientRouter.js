import { withRouter } from "next/router";
import { ClientRouter as AppBridgeClientRouter } from "@shopify/app-bridge-react";

function ClientRouter(props) {
  return <AppBridgeClientRouter history={props.router} />;
}

export default withRouter(ClientRouter);
