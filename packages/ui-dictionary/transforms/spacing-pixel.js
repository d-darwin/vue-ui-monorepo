module.exports = {
  name: "spacing/pixel",
  type: "value",
  matcher: function (token) {
    return token.type === "custom-spacing";
  },
  transformer: function ({ value }) {
    const isEqualForEachCorner = [value.right, value.bottom, value.right].every(
      (v) => v === value.top
    );

    if (isEqualForEachCorner) {
      return `${value.top}${value.top ? "px" : ""}`;
    }

    // TODO: top\bottom left\right equal notation

    return `${value.top}px ${value.right}px ${value.bottom}px ${value.left}px`;
  },
};
