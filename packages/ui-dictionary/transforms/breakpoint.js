module.exports = {
  name: "breakpoint/pixel",
  type: "value",
  matcher: function (token) {
    return token.path?.[0] === 'breakpoints';
  },
  transformer: function (token) {
    return `${token.value}px`;
  },
};
