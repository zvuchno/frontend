declare module "*.scss" {
  const content: { [className: string]: string };
  export default content;
}

declare module "*.css" {
  const content: { [className: string]: string };
  export default content;
}

declare module "*.svg" {
  import type { ComponentType, SVGProps } from "react";

  const SvgComponent: ComponentType<SVGProps<SVGSVGElement>>;
  export default SvgComponent;
}
