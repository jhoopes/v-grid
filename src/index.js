import Grid from './Grid.vue';
import IsRow from './mixins/is_row';

export default {

    install(Vue, options) {


        Vue.component(Grid.name, Grid);

    }

}

export { Grid, IsRow}