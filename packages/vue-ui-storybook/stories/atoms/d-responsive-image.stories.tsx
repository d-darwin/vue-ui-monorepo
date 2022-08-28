import { Story } from "@storybook/vue3";
import DResponsiveImage from "@darwin-studio/vue-ui/src/components/atoms/d-responsive-image";
import {
  OBJECT_FIT,
  LOADING,
} from "@darwin-studio/vue-ui/src/components/atoms/d-responsive-image/constants";
import { FONT } from "@darwin-studio/vue-ui-codegen/dist/constants/font"; // TODO: shorter path, default export ???
import styles from "./d-responsive-image.css";

export default {
  title: "atoms/DResponsiveImage",
  component: DResponsiveImage,
  argTypes: {
    objectFit: {
      control: { type: "select" },
      options: Object.values(OBJECT_FIT),
    },
    captionFont: {
      control: { type: "select" },
      options: Object.values(FONT),
    },
    loading: {
      control: { type: "select" },
      options: Object.values(LOADING),
    },
    onLoad: { action: "load" },
    onError: { action: "error" },
  },
  args: {
    source: "https://www.linkpicture.com/q/Screenshot-2022-01-31-114450.png", // TODO: different types -> different stories
    aspectRatio: "3:2",
    objectFit: OBJECT_FIT.COVER, // TODO: flexible default value
    caption: "Some caption",
    captionFont: FONT.TINY, // TODO: flexible default value
    imageClass: "someImgClass",
    captionClass: "someCaptionClass",
    loading: LOADING.LAZY, // TODO: flexible default value
    whenLoad: () => {
      console.log("load");
    },
    whenError: () => {
      console.log("error");
    },
  },
};

const Template: Story = (args) => ({
  components: { DResponsiveImage },
  setup() {
    return { args, styles };
  },
  template: `<DResponsiveImage v-bind="args" :class="styles.dResponsiveImage" />`,
});
export const Default = Template.bind({});

const CaptionSlotTemplate: Story = (args) => ({
  components: { DResponsiveImage },
  setup() {
    return { args, styles };
  },
  template: `
    <DResponsiveImage v-bind="args" :class="styles.dResponsiveImage">
      <template v-slot:caption><b>Caption slot</b></template>
    </DResponsiveImage>
  `,
});
export const SlotCaption = CaptionSlotTemplate.bind({});

export const WithImageType = Template.bind({});
WithImageType.args = {
  source: [
    {
      type: "image/png",
      src: "https://www.linkpicture.com/q/Screenshot-2022-01-31-114450.png", // TODO: local source
    },
  ],
};

export const WithPixelDensity = Template.bind({});
WithPixelDensity.args = {
  source: {
    srcset: [
      {
        density: "1x",
        src: "https://www.linkpicture.com/q/Screenshot-2022-01-31-114450.png", // TODO: local source
      },
      {
        density: "2x",
        src: "https://www.linkpicture.com/q/Screenshot-2022-01-31-114450.png",
      }, // TODO: use other image
    ],
  },
};

export const WithMediaQuery = Template.bind({});
WithMediaQuery.args = {
  source: [
    {
      min_width: 640,
      src: "https://www.linkpicture.com/q/Screenshot-2022-01-31-114450.png",
    },
    {
      max_width: 320,
      src: "https://www.linkpicture.com/q/Screenshot-2022-01-31-114450.png",
    }, // TODO: use other image
    {
      min_width: 320,
      max_width: 640,
      src: "https://www.linkpicture.com/q/Screenshot-2022-01-31-114450.png",
    }, // TODO: use other image
    {
      media: "(min-width: 640px) and (max-width: 1240px)",
      src: "https://www.linkpicture.com/q/Screenshot-2022-01-31-114450.png", // TODO: use other image
    },
  ],
};
