import { Story } from "@storybook/vue3";
import DGrid from "@darwin-studio/vue-ui/src/components/containers/d-grid";
import styles from "./d-grid.css";

export default {
  title: "containers/DGrid",
  component: DGrid,
  argTypes: {},
  args: {
    // TODO: use constants for breakpoint names
    colSpan: {
      xs: 4,
      sm: 3,
      md: 4,
      lg: 4,
      xl: 4,
    },
    rowGap: "8px",
    tag: "div",
  },
};

const SlotTemplate: Story = (args) => ({
  components: { DGrid },
  setup() {
    return { args, styles };
  },
  template: `
    <DGrid v-bind="args">
      <div :class="styles.item">cell 1</div>
      <div :class="styles.item">cell 2</div>
      <div :class="styles.item">cell 3</div>
      <div :class="styles.item">cell 4</div>
      <div :class="styles.item">cell 5</div>
      <div :class="styles.item">cell 6</div>
      <div :class="styles.item">cell 7</div>
      <div :class="styles.item">cell 8</div>
      <div :class="styles.item">cell 9</div>
      <div :class="styles.item">cell 10</div>
      <div :class="styles.item">cell 11</div>
      <div :class="styles.item">cell 12</div>
      <div :class="styles.item">cell 13</div>
      <div :class="styles.item">cell 14</div>
      <div :class="styles.item">cell 15</div>
      <div :class="styles.item">cell 16</div>
      <div :class="styles.item">cell 17</div>
      <div :class="styles.item">cell 18</div>
      <div :class="styles.item">cell 19</div>
      <div :class="styles.item">cell 20</div>
    </DGrid>`,
});
export const SlotDefault = SlotTemplate.bind({});
