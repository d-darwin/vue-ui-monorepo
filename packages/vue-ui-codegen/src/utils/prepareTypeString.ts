export default function(typeName: string, constantName: string) {
  return `export type ${typeName} = (typeof ${constantName})[keyof typeof ${constantName}];`;
}
