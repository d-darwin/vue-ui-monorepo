// TODO: descr
export default function (rawString?: string): string | undefined {
  if (!rawString) { return; }

  const [name, value] = rawString.split(':');
  if (name && name === "max-width" && value) {
    return value;
  }
}
