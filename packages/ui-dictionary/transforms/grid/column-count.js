module.exports = {
  name: "grid/column-count",
  type: 'value',
  matcher: function (token) {
    return token.type === "custom-grid" && (
      token.value?.pattern === 'columns' || token.original?.value?.pattern === 'columns'
    );
  },
  transformer: token =>
    `${token.value?.count || token.original?.value?.count};
  --${token.name}-column-gap: ${token.value?.gutterSize || token.original?.value?.gutterSize}px;
  --${token.name}-column-offset: ${token.value?.offset || token.original?.value?.offset}px`,
};
