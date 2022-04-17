module.exports = {
  name: "radius/pixel",
  type: "value",
  matcher: function (token) {
    return token.type === "custom-radius";
  },
  transformer: function ({ value, name }) {
    const isEqualForEachCorner = [
      value.topRight,
      value.bottomLeft,
      value.bottomRight,
    ].every((v) => v === value.topLeft);

    if (isEqualForEachCorner) {
      if (!value.topLeft || value.topLeft === 0) {
        return "0";
      }
      // TODO: use const for name
      if (name === "radius-full" || value.topLeft >= 999) {
        return "10vmin";
      }
      return `${value.topLeft}px`;
    }

    // TODO: top\bottom left\right equal notation

    return `${value.topLeft}px ${value.topRight}px ${value.bottomLeft}px ${value.bottomRight}px`;
  },
};
