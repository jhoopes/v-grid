import { mount } from "@vue/test-utils";
import Grid from "@/components/Grid.vue";

describe("Grid.vue", () => {
    const wrapper = mount(Grid);
    it("expects grid type to be tableView by default", () => {
        expect(wrapper.props().gridType).toMatch("tableView");
    });
});
