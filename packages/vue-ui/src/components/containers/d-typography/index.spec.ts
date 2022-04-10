import { shallowMount } from "@vue/test-utils";
import DTypography from "@/components/containers/d-typography";

describe("DTypography", () => {
  it("Renders props.content when passed", () => {
    const content = "Some text";
    const wrapper = shallowMount(DTypography, {
      props: { content },
    });
    expect(wrapper.text()).toMatch(content);
  });
});
