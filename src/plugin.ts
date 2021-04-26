import Grid from "./components/Grid.vue";

import { App } from "vue";

export default {
  install(app: App) {
    app.component("v-grid", Grid);
  }
};

export { Grid };
