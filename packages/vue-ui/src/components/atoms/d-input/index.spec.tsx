import { shallowMount } from "@vue/test-utils";
import DInput from "@/components/atoms/d-input";
import config from "./config";
import { baseClassCase } from "@/utils/test-case-factories";

describe("DButton", () => {
  const wrapper = shallowMount(DInput);

  baseClassCase(wrapper, config.className);

  it("Input element's value attr should contain props.value", async () => {
    const value = "external value";
    await wrapper.setProps({ value });
    const inputEl = wrapper.find("input");
    expect(inputEl.element?.value).toBe(value);
  });

  // TODO: label

  it("Should render label element with props.label content if passed", async () => {
    /*const value = "external value";
    await wrapper.setProps({ value });
    const inputEl = wrapper.find("input");
    expect(inputEl.element?.value).toBe(value);*/
  });

  it("Should render label element with props.label content if passed", async () => {
    /*const value = "external value";
    await wrapper.setProps({ value });
    const inputEl = wrapper.find("input");
    expect(inputEl.element?.value).toBe(value);*/
  });

  it("Should render equal not null id attrs for the input and the label", () => {
    const inputEl = wrapper.find("input");
    const labelEl = wrapper.find("label");
    expect(inputEl.attributes()?.id).toBeTruthy();
    expect(inputEl.attributes()?.id).toBe(labelEl.attributes()?.id);
  });

  // TODO: id: passed / generated
  it("Should render passed props.id as input id attr", () => {
    console.log("TODO: test case");
  });
  it("Should render generated id input attr if props.id not passed", () => {
    console.log("TODO: test case");
  });

  // TODO: render only if there is props.label or props.id
  it("Shouldn't render id attr if there is no props.label or props.id", () => {
    console.log("TODO: test case");
  });

  // TODO: size
  it("Should contain size class", () => {
    console.log("TODO: test case");
  });

  // TODO: rounding
  it("Should contain rounding class", () => {
    console.log("TODO: test case");
  });

  // TODO: error (via Tooltip ???)
  it("Should render error string (array???)", () => {
    console.log("TODO: test case");
  });

  // TODO: events on*, when*
  it("Should should emit events", () => {
    console.log("TODO: test case");
  });
  it("Should should use passed callback", () => {
    console.log("TODO: test case");
  });

  // TODO: slots (before / after)
  it("Should should render before slot", () => {
    console.log("TODO: test case");
  });
  it("Should should render after slot", () => {
    console.log("TODO: test case");
  });
});
