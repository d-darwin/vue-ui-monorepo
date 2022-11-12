import { shallowMount } from "@vue/test-utils";
import DRadio from "@/components/atoms/d-radio";
import {
  baseClassCase,
  inputAttrsCase,
  inputClassCase,
  inputValueCase,
  minControlWidthCase,
} from "@/utils/test-case-factories";
import config from "@/components/atoms/d-radio/config";

describe("DRadio", () => {
  const name = "some name";
  const value = "some value";
  const wrapper = shallowMount(DRadio, { props: { name, value } });

  baseClassCase(wrapper, config.className);

  it("Should render input element with radio type, name and value", () => {
    const inputEl = wrapper.find("input");
    expect(inputEl.exists()).toBeTruthy();
    expect(inputEl.attributes().name).toBe(name);
    expect(inputEl.attributes().value).toBe(value);
  });

  inputValueCase(wrapper);

  inputClassCase(wrapper);

  inputAttrsCase(wrapper);

  minControlWidthCase(wrapper);

  // TODO: type and other radio specific
});
