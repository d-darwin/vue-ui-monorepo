module.exports = {
  name: "grid/column-count-name",
  type: "name",
  matcher: function (token) {
    return token.type === "custom-grid" && (
      token.value?.pattern === 'columns' || token.original?.value?.pattern === 'columns'
    );
  },
  transformer: token => `${token?.name}-column-count`,
};
