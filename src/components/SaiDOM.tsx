import { type JSX } from "react";
import type { TypeTextProps } from "./TypeText";
import TypeText from "./TypeText";

export type SaiElement = {
  component: keyof JSX.IntrinsicElements;
  attrs?: VAttrs;
  typeProps?: Partial<TypeTextProps>;
  childrenProps?: Partial<TypeTextProps>;
  children?: SaiNode[];
};

export type VAttrValue = string | number | boolean | ((ev: Event) => void);

export type VAttrs = Record<string, VAttrValue>;

export type SaiNode = SaiElement | string;

export function SaiDOMWrite(node: SaiNode) {
  const [current, setCurrent] = useState(0);
  if (typeof node === "string") {
    return node;
  }
  node.children?.forEach((child: SaiNode, index: number) => {
    if (typeof child === "string") {
      return <TypeText text={child} {...node.typeProps} />;
    }
    if (index > current) {
      return null;
    }
    const mergedProps = {
      ...node.typeProps,
      ...child.typeProps,
      ...node.childrenProps,
    };
    let animate: boolean;
    if (index < current) {
      animate = false;
    }
    if (index == current) {
      animate = mergedProps.animate == false ? false : true;
    }
    const mergedChild = (child.typeProps = mergedProps);
    return SaiDOMWrite(child);
  });
}
