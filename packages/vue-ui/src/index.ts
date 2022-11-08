import { App } from "vue";

import * as components from "./components";

const DSLibrary = {
  install(app: App) {
    // Auto import all components
    for (const componentKey in components) {
      app.use((components as never)[componentKey]);
    }
  },
};

export default DSLibrary;

// export all components as vue plugin
export * from "./components";
