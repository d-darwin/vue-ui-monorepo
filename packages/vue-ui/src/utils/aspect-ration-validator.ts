// TODO: description

const aspectRationValidator = (val: string | number): boolean => {
  if (!isNaN(Number(val))) {
    return Boolean(val);
  }

  const stringVal = String(val);
  let [width, height] = stringVal.split("/");
  if (parseInt(width?.trim()) && parseInt(height?.trim())) {
    return true;
  }

  [width, height] = stringVal.split(":");
  if (parseInt(width?.trim()) && parseInt(height?.trim())) {
    return true;
  }

  return false;
};

export default aspectRationValidator;
