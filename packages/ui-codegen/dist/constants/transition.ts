export const TRANSITION = {
  SLOW: "slow",
  AVERAGE: "average",
  FAST: "fast",
} as const;
export const TRANSITION_VALUE = {
  SLOW: {"transitionType":"scroll_animate","duration":0.6,"easingType":"cubicBezier","easingFunction":{"x1":0.41999998688697815,"x2":0.5799999833106995,"y1":0,"y2":1}},
  AVERAGE: {"transitionType":"scroll_animate","duration":0.3,"easingType":"cubicBezier","easingFunction":{"x1":0.41999998688697815,"x2":0.5799999833106995,"y1":0,"y2":1}},
  FAST: {"transitionType":"scroll_animate","duration":0.15,"easingType":"cubicBezier","easingFunction":{"x1":0.41999998688697815,"x2":0.5799999833106995,"y1":0,"y2":1}},
} as const;
