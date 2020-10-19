import Grid from "./components/Grid.vue";
import IsRow from "./mixins/is_row";
import IsGridView from "./mixins/is_grid_view";

export default {
  install(Vue) {
    Vue.component(Grid.name, Grid);
  }
};

export { Grid, IsRow, IsGridView };
