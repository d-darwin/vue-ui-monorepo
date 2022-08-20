import { Story } from "@storybook/vue3";
import DButton from "@darwin-studio/vue-ui/src/components/atoms/d-button";
// TODO: use vue-ui-codegen/config.json to define path
import { COLOR_SCHEME } from "@darwin-studio/vue-ui-codegen/dist/constants/color-scheme";
import { PADDING } from "@darwin-studio/vue-ui-codegen/dist/constants/padding";
import { ROUNDING } from "@darwin-studio/vue-ui-codegen/dist/constants/rounding";
import { SIZE } from "@darwin-studio/vue-ui-codegen/dist/constants/size";
import { TRANSITION } from "@darwin-studio/vue-ui-codegen/dist/constants/transition";

export default {
  title: "atoms/DButton",
  component: DButton,
  argTypes: {
    colorScheme: {
      control: { type: "select" },
      options: Object.values(COLOR_SCHEME),
    },
    padding: {
      control: { type: "select" },
      options: Object.values(PADDING),
    },
    rounding: {
      control: { type: "select" },
      options: Object.values(ROUNDING),
    },
    size: {
      control: { type: "select" },
      options: Object.values(SIZE),
    },
    transition: {
      control: { type: "select" },
      options: Object.values(TRANSITION),
    },
    onClick: {
      action: "clicked",
    },
  },
  args: {
    label: "Some text content",
    href: "",
    disabled: false,
    preventDefault: true,
    colorScheme: COLOR_SCHEME.PRIMARY, // TODO: don't hardcode values
    padding: PADDING.DEFAULT, // TODO: don't hardcode values
    rounding: ROUNDING.MEDIUM, // TODO: don't hardcode values
    size: SIZE.MEDIUM, // TODO: don't hardcode values
    transition: TRANSITION.SLOW, // TODO: don't hardcode values
    whenClick: () => {
      console.log("clicked");
    },
  },
};

const Template: Story = (args) => ({
  components: { DButton },
  setup() {
    return { args };
  },
  template: `<DButton v-bind="args" />`,
});
export const Default = Template.bind({});

const imageBase64 =
  "data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAAUA\n" +
  "    AAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO\n" +
  "        9TXL0Y4OHwAAAABJRU5ErkJggg==";
const SlotTemplate: Story = (args) => ({
  components: { DButton },
  setup() {
    return { args };
  },
  template: `
    <DButton v-bind="args">
      <img height="12" width="12" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAApgAAAKYB3X3/OAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAANCSURBVEiJtZZPbBtFFMZ/M7ubXdtdb1xSFyeilBapySVU8h8OoFaooFSqiihIVIpQBKci6KEg9Q6H9kovIHoCIVQJJCKE1ENFjnAgcaSGC6rEnxBwA04Tx43t2FnvDAfjkNibxgHxnWb2e/u992bee7tCa00YFsffekFY+nUzFtjW0LrvjRXrCDIAaPLlW0nHL0SsZtVoaF98mLrx3pdhOqLtYPHChahZcYYO7KvPFxvRl5XPp1sN3adWiD1ZAqD6XYK1b/dvE5IWryTt2udLFedwc1+9kLp+vbbpoDh+6TklxBeAi9TL0taeWpdmZzQDry0AcO+jQ12RyohqqoYoo8RDwJrU+qXkjWtfi8Xxt58BdQuwQs9qC/afLwCw8tnQbqYAPsgxE1S6F3EAIXux2oQFKm0ihMsOF71dHYx+f3NND68ghCu1YIoePPQN1pGRABkJ6Bus96CutRZMydTl+TvuiRW1m3n0eDl0vRPcEysqdXn+jsQPsrHMquGeXEaY4Yk4wxWcY5V/9scqOMOVUFthatyTy8QyqwZ+kDURKoMWxNKr2EeqVKcTNOajqKoBgOE28U4tdQl5p5bwCw7BWquaZSzAPlwjlithJtp3pTImSqQRrb2Z8PHGigD4RZuNX6JYj6wj7O4TFLbCO/Mn/m8R+h6rYSUb3ekokRY6f/YukArN979jcW+V/S8g0eT/N3VN3kTqWbQ428m9/8k0P/1aIhF36PccEl6EhOcAUCrXKZXXWS3XKd2vc/TRBG9O5ELC17MmWubD2nKhUKZa26Ba2+D3P+4/MNCFwg59oWVeYhkzgN/JDR8deKBoD7Y+ljEjGZ0sosXVTvbc6RHirr2reNy1OXd6pJsQ+gqjk8VWFYmHrwBzW/n+uMPFiRwHB2I7ih8ciHFxIkd/3Omk5tCDV1t+2nNu5sxxpDFNx+huNhVT3/zMDz8usXC3ddaHBj1GHj/As08fwTS7Kt1HBTmyN29vdwAw+/wbwLVOJ3uAD1wi/dUH7Qei66PfyuRj4Ik9is+hglfbkbfR3cnZm7chlUWLdwmprtCohX4HUtlOcQjLYCu+fzGJH2QRKvP3UNz8bWk1qMxjGTOMThZ3kvgLI5AzFfo379UAAAAASUVORK5CYII=" />
    </DButton>
  `,
});
export const SlotDefault = SlotTemplate.bind({});
SlotDefault.args = {
  padding: PADDING.EQUAL,
};
