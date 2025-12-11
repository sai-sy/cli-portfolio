import { useCallback, useMemo, useState, type JSX } from "react";
import type { TypeTextProps } from "./TypeText";
import TypeText from "./TypeText";

export type SaiElement = {
  component: keyof JSX.IntrinsicElements;
  attrs?: VAttrs;
  typeProps?: Partial<TypeTextProps>;
  childrenProps?: Partial<TypeTextProps>;
  children?: SaiNode[];
  key?: string;
  onComplete?: () => void;
};

export type SaiString = {
  content?: string;
  key?: string;
};

export function isSaiString(node: SaiNode) /*: node is SaiString */ {
  return typeof node === "object" && node !== null && "content" in node;
}

export type VAttrValue = string | number | boolean | ((ev: Event) => void);

export type VAttrs = Record<string, VAttrValue>;

export type SaiNode = SaiElement | string;

export function SaiDOMRender(node: SaiNode) {
  /*
  if (isSaiString(node)) {
    return node;
  }
  */
  if (typeof node == "string") {
    return node;
  }
  const [current, setCurrent] = useState(0);
  const safeChildNodes = useMemo(
    () =>
      node.children?.map((child, index) => {
        if (typeof child == "string") {
          return node;
        }
        return {
          ...child,
          key: `${child.key}-${index}-${"component" in child ? child.component : "str"}`,
        };
      }) ?? [],
    [node.children],
  );

  const handleLineComplete = useCallback(
    (index: number) => {
      if (index === safeChildNodes.length - 1) {
        node.onComplete?.();
      } else {
        setCurrent((prev) => Math.min(prev + 1, safeChildNodes.length - 1));
      }
    },
    [node.onComplete, safeChildNodes.length],
  );
  const Root = node.component;
  return (
    <Root key={node.key} className={`${node.attrs?.className ?? ""} domout`}>
      {safeChildNodes.map((child, index) => {
        if (index < current) {
          if (typeof child == "string") {
            return <TypeText text={child} {...node.typeProps} />;
          }
          return SaiDOMRender({
            component: child.component,
            attrs: child.attrs,
            typeProps: {
              ...child.typeProps,
              animate: false,
              showCursor: false,
            },
          });
        }
        if (index > current) return null;

        const isActive = index === current;
        const mergedTypeProps = {
          ...node.typeProps,
          ...child.typeProps,
          ...node.childrenProps,
        };
        const statefulTypeProps = { ...mergedTypeProps };
        statefulTypeProps.animate =
          mergedTypeProps.animate == false
            ? false
            : node.typeProps?.animate
              ? isActive
              : false;
        statefulTypeProps.fileDir = child.typeProps?.fileDir
          ? child.typeProps?.fileDir
          : false;
        statefulTypeProps.showCursor =
          typeof mergedTypeProps.showCursor === "boolean"
            ? mergedTypeProps.showCursor && isActive
            : isActive;

        if (typeof child == "string") {
          return (
            <TypeText
              text={child}
              {...statefulTypeProps}
              onComplete={() => handleLineComplete(index)}
            />
          );
        }
        return SaiDOMRender({
            component: child.component,
            attrs: child.attrs,
            typeProps: {
              ...statefulTypeProps,
            },
          })
      })}
    </Root>
  );
}
