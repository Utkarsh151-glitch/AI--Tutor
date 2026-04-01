import { SSTConfig } from "sst";
import { Api } from "sst/constructs";

export default {
  config(_input) {
    return { name: "devoploy-aws-app", region: "us-east-1" };
  },
  stacks(app) {
    app.stack(function Site({ stack }) {
      const api = new Api(stack, "api", {
        routes: { "ANY /{proxy+}": "src/server.js" },
      });
      stack.addOutputs({ ApiEndpoint: api.url });
    });
  }
} satisfies SSTConfig;
