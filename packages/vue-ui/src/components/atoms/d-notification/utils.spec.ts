import { prepareSize } from "./utils";

describe("prepareSize", () => {
  it("Should return the same string if the argument is string", () => {
    const string = "33%";
    expect(prepareSize(string)).toBe(string);
  });

  it("Should return string suffixed by 'px' if the argument is number", () => {
    const number = 120;
    expect(prepareSize(number)).toBe(number + "px");
  });
});
