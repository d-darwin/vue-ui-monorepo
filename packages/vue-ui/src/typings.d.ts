declare module "@/*";

declare module "*.css?module" {
  interface IClassNames {
    [className: string]: string;
  }
  const classNames: IClassNames;
  export = classNames;
}

declare module "@darwin-studio/button-ee";

declare module "*.json";
