import prepareHtmlSize from "./prepare-html-size";

describe("prepareElementSize", () => {
  it("Should return the same string if the argument is string", () => {
    const string = "33%";
    expect(prepareHtmlSize(string)).toBe(string);
  });

  it("Should return string suffixed by 'px' if the argument is number", () => {
    const number = 120;
    expect(prepareHtmlSize(number)).toBe(number + "px");
  });
});
