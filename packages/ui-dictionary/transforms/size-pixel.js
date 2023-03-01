module.exports = {
  name: "size/pixel",
  type: "value",
  matcher: function (token) {
    return ['size'].includes(token.path?.[0]);
  },
  transformer: function (token) {
    return `${token.value}px`;
  },
};
