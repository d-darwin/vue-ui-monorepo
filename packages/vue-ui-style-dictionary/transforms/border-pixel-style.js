module.exports = {
  name: "border/pixel/style",
  type: "value",
  matcher: function (token) {
    return token.type === "custom-stroke";
  },
  transformer: function ({ value }) {
    if (!value.weight) {
      return "none";
    }

    // TODO: dotted, dashed details ???

    const isDashed = value.dashPattern?.length && value.dashPattern[0] > 0;

    return `${value.weight}px ${isDashed ? "dashed" : "solid"}`;
  },
};
