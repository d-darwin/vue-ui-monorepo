import prepareCssClassName from "@darwin-studio/ui-codegen/src/utils/prepareCssClassName";
import codegenConfig from "@darwin-studio/ui-codegen/config.json";
import transitionStyles from "@darwin-studio/ui-codegen/dist/styles/transition.css?module"; // TODO: shorter path, default export ??? TODO: make it module ???

// TODO: arg types
const getCommonClass = (tokenKey: string, tokenVariant: string) => {
  const classPrefix = codegenConfig.TOKENS[tokenKey]?.CSS_CLASS_PREFIX;
  if (!classPrefix || !tokenVariant) {
    return null;
  }

  const className = prepareCssClassName(classPrefix, tokenVariant);
  if (!className) {
    return null;
  }

  return transitionStyles[className];
};

export default getCommonClass;
