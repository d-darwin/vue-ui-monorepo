import { Story } from "@storybook/vue3";
import DGrid from "@darwin-studio/vue-ui/src/components/containers/d-grid";
import { TRANSITION } from "@darwin-studio/ui-codegen/dist/constants/transition";
import { BREAKPOINTS } from "@darwin-studio/ui-codegen/dist/constants/breakpoints";
import styles from "./d-grid.module.css";

export default {
  title: "containers/DGrid",
  component: DGrid,
  argTypes: {
    transition: {
      control: { type: "select" },
      options: Object.values(TRANSITION),
    },
  },
  args: {
    colSpan: Object.fromEntries(
      Object.values(BREAKPOINTS).map((bp) => [bp, 2])
    ),
    rowGap: "8px",
    tag: "div",
    transition: TRANSITION.SLOW, // TODO: don't hardcode values
  },
};

const Template: Story = (args) => ({
  components: { DGrid },
  setup() {
    return { args, styles };
  },
  computed: {
    content() {
      return [
        <div class={styles.item}>cell 1</div>,
        <div class={styles.item}>cell 2</div>,
        <div class={styles.item}>cell 3</div>,
        <div class={styles.item}>cell 4</div>,
        <div class={styles.item}>cell 5</div>,
        <div class={styles.item}>cell 6</div>,
        <div class={styles.item}>cell 7</div>,
        <div class={styles.item}>cell 8</div>,
        <div class={styles.item}>cell 9</div>,
        <div class={styles.item}>cell 10</div>,
        <div class={styles.item}>cell 11</div>,
        <div class={styles.item}>cell 12</div>,
        <div class={styles.item}>cell 13</div>,
        <div class={styles.item}>cell 14</div>,
        <div class={styles.item}>cell 15</div>,
        <div class={styles.item}>cell 16</div>,
        <div class={styles.item}>cell 17</div>,
        <div class={styles.item}>cell 18</div>,
        <div class={styles.item}>cell 19</div>,
        <div class={styles.item}>cell 20</div>,
      ];
    },
  },
  template: `<DGrid v-bind="args" :content="content" />`,
});
export const Default = Template.bind({});

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
