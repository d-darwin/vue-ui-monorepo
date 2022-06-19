const notDefault = (value, defaultValue) =>
  value !== defaultValue ? value : "";

const fontFamily = ({ fontFamily }, exact) =>
  exact ? fontFamily : `"${fontFamily}"`;

module.exports = {
  name: "font/string",
  type: "value",
  matcher: function (token) {
    return token.type === "custom-fontStyle";
  },
  transformer: function ({ value: font, description: exactFamilies }) {
    font = {...font, fontFamily: exactFamilies || font.fontFamily}

    // font: font-style font-variant font-weight font-size/line-height font-family;
    return `${notDefault(font.fontStretch, "normal")} ${notDefault(
      font.fontStyle,
      "normal"
    )} ${font.fontWeight} ${font.fontSize}px/${font.lineHeight}px ${fontFamily(
      font,
      { exact: Boolean(exactFamilies) }
    )}`.trim();
  },
};
