import { getTransitionDuration } from "@/components/molecules/d-accordion/utils";

describe("getTransitionDuration", () => {
  it("Should return 0 if props.transition is empty", () => {
    expect(getTransitionDuration()).toBe(0);
  });

  it("Should return 0 if props.transition contains unknown value", () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(getTransitionDuration("wired-value")).toBe(0);
  });
});
