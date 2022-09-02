declare module "*.css" {
  interface IClassNames {
    [className: string]: string;
  }
  const classNames: IClassNames;
  export = classNames;
}

declare module "*.json";

declare namespace NodeJS {
  interface Process {
    browser: boolean;
  }
}
