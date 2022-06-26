module.exports = {
  name: "motion/transition",
  type: "value",
  matcher: function (token) {
    return token.type === "custom-transition" && token.value !== 0;
  },
  transformer: function (token) {
    const easingCubicBezier = token.value.easingFunction;

    // TODO: how to pass 'all' from figma ???
    return `all ${token.value.duration}s ${getEasingFunction(
      easingCubicBezier
    )}`;
  },
};

const EASING_LIST = {
  // CUSTOM_CUBIC_BEZIER: {}, // TODO: what about custom ???
  LINEAR: {
    type: "linear",
    easingCubicBezier: {
      x1: 0,
      y1: 0,
      x2: 1,
      y2: 1,
    },
  },
  EASE_IN: {
    type: "ease-in",
    easingCubicBezier: {
      x1: 0.41999998688697815,
      y1: 0,
      x2: 1,
      y2: 1,
    },
  },
  EASE_OUT: {
    type: "ease-out",
    easingCubicBezier: {
      x1: 0,
      y1: 0,
      x2: 0.5799999833106995,
      y2: 1,
    },
  },
  EASE_IN_AND_OUT: {
    type: "ease-in-out",
    easingCubicBezier: {
      x1: 0.41999998688697815,
      y1: 0,
      x2: 0.5799999833106995,
      y2: 1,
    },
  },
  EASE_IN_BACK: {
    type: "ease-in", // figma's "ease-in-back"
    easingCubicBezier: {
      x1: 0.30000001192092896,
      y1: -0.05000000074505806,
      x2: 0.699999988079071,
      y2: -0.5,
    },
  },
  EASE_OUT_BACK: {
    type: "ease-out", // figma's "ease-out-back"
    easingCubicBezier: {
      x1: 0.44999998807907104,
      y1: 1.4500000476837158,
      x2: 0.800000011920929,
      y2: 1,
    },
  },
  EASE_IN_AND_OUT_BACK: {
    type: "ease-in-out", // figma's "ease-in-out-back"
    easingCubicBezier: {
      x1: 0.699999988079071,
      y1: -0.4000000059604645,
      x2: 0.4000000059604645,
      y2: 1.399999976158142,
    },
  },
};

function isPlanObjectsEqual(obj1, obj2) {
  for (let p in obj1) {
    // eslint-disable-next-line no-prototype-builtins
    if (obj1?.hasOwnProperty(p)) {
      if (obj1[p] !== obj2[p]) {
        return false;
      }
    }
  }
  for (let p in obj2) {
    // eslint-disable-next-line no-prototype-builtins
    if (obj2?.hasOwnProperty(p)) {
      if (obj1[p] !== obj2[p]) {
        return false;
      }
    }
  }
  return true;
}

function getEasingFunction(easingCubicBezier) {
  let easingFunction = "linear";

  Object.keys(EASING_LIST).some((easingKey) => {
    if (
      isPlanObjectsEqual(
        EASING_LIST[easingKey].easingCubicBezier,
        easingCubicBezier
      )
    ) {
      easingFunction = EASING_LIST[easingKey].type;
      return true;
    }

    return false;
  });

  return easingFunction;
}
