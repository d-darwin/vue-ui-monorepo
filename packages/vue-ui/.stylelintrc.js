module.exports = {
  plugins: ["stylelint-order"],
  rules: {
    indentation: [2, { severity: "error" }],
    "max-empty-lines": 1,
    "function-max-empty-lines": 0,
    "declaration-empty-line-before": "never",
    "rule-empty-line-before": [
      "always",
      {
        except: ["first-nested", "after-single-line-comment"],
      },
    ],
    "no-duplicate-selectors": [true, { severity: "error" }],
    "block-no-empty": [false, { severity: "error" }],
    "selector-type-no-unknown": [true, { severity: "error" }],
    "value-no-vendor-prefix": [true, { severity: "error" }],
    "property-no-vendor-prefix": [true, { severity: "error" }],
    "no-empty-source": [true, { severity: "error" }],
    "declaration-block-no-duplicate-properties": [true, { severity: "error" }],
    "order/properties-order": [
      [
        "composes",
        "content",
        /* Positioning */
        "position",
        "top",
        "right",
        "bottom",
        "left",
        "z-index",
        /* Box Model */
        "display",
        "float",
        "width",
        "height",
        "margin",
        "padding",
        /* Typography */
        "color",
        "font",
        "line-height",
        "text-align",
        /* Visual */
        "background-color",
        "border",
        "border-radius",
        "opacity",
        /* Animation */
        "transition",
        /* Misc */
        "user-select",
      ],
      { severity: "error" },
    ],
    "font-family-no-missing-generic-family-keyword": [
      true,
      { severity: "error" },
    ],
    "function-linear-gradient-no-nonstandard-direction": [
      true,
      { severity: "error" },
    ],
    "value-keyword-case": [
      "lower",
      { severity: "error", ignoreProperties: "composes" },
    ],
    "at-rule-no-unknown": [true, { ignoreAtRules: ["include", "extend"] }],
    "selector-class-pattern": [/^[a-z][a-zA-Z]*[0-9]?$/, { severity: "error" }],
    "property-no-unknown": [
      true,
      { severity: "error", ignoreProperties: ["composes"] },
    ],
    "no-descending-specificity": [true, { severity: "error" }],
    "max-nesting-depth": [0, { severity: "error" }],
  },
};
