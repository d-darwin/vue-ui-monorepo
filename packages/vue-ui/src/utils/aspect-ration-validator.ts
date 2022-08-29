// TODO: description
import config from "@darwin-studio/vue-ui/src/components/containers/d-aspect-ratio/config";

const aspectRationValidator = (val: string | number): boolean => {
  if (!isNaN(Number(val))) {
    return Boolean(val);
  }

  const stringVal = String(val);
  return config.separatorList.some((separator) => {
    const [width, height] = stringVal.split(separator);
    return !!(parseInt(width?.trim()) && parseInt(height?.trim()));
  });
};

export default aspectRationValidator;
