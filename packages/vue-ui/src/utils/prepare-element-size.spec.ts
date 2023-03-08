import prepareElementSize from "./prepare-element-size";

describe("prepareElementSize", () => {
  it("Should return the same string if the argument is string", () => {
    const string = "33%";
    expect(prepareElementSize(string)).toBe(string);
  });

  it("Should return string suffixed by 'px' if the argument is number", () => {
    const number = 120;
    expect(prepareElementSize(number)).toBe(number + "px");
  });
});
