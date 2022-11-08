declare module "*.tsx" {
  import type { DefineComponent } from "tsx";
  const component: DefineComponent<any, any, any>;
  export default component;
}
