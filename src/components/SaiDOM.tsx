import { useCallback, useContext, useMemo, useState, type JSX } from "react";
import type { TypeTextProps } from "./TypeText";
import TypeText from "./TypeText";
import { CwdContext } from "../context/CwdContext";

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

type SaiDomRenderProps = { node: SaiNode };

export function SaiDOMRender({ node }: SaiDomRenderProps) {
  const { cwd, setCwd: _unused } = useContext(CwdContext)!;

  if (typeof node === "string") {
    return node;
  }
  const [current, setCurrent] = useState(0);
  const safeChildNodes = useMemo(
    () =>
      node.children?.map((child, index) =>
        typeof child === "string"
          ? child
          : {
              ...child,
              key: `${child?.key}-node-${index}-${child.component ?? "str"}`,
            },
      ) ?? [],
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
  let cName = `${node.attrs?.className ?? ""} domout ${node?.key}`;
  return (
    <Root key={node.key} className={cName}>
      {safeChildNodes.map((child, index) => {
        const isActive = index === current;

        if (index < current) {
          if (typeof child === "string") {
            return (
              <TypeText
                key={`${node.key ?? "text"}-${index}`}
                text={child}
                {...node.typeProps}
                {...node.childrenProps}
                animate={false}
                showCursor={false}
                onComplete={() => {}}
              />
            );
          }
          console.log("render", node.key);

          let childnode: SaiNode = {
            ...child,
            typeProps: {
              ...node.typeProps,
              ...child.typeProps,
              ...node.childrenProps,
              animate: false,
              showCursor: false,
            },
          };
          const showPrompt =
            node.key == "home-root" && (childnode.typeProps?.fileDir);

          return (
            <>
              {showPrompt && (
                <>
                  <span className={`fileDir ${childnode.key}`}>{cwd}</span>
                  {"$ "}
                </>
              )}<SaiDOMRender node={childnode} />
            </>
          );
        }
        if (index > current) return null;

        if (typeof child === "string") {
          const mergedTypeProps = {
            ...node.typeProps,
            ...node.childrenProps,
          };
          const statefulTypeProps = { ...mergedTypeProps };
          statefulTypeProps.animate =
            mergedTypeProps.animate === false
              ? false
              : node.typeProps?.animate
                ? isActive
                : false;
          statefulTypeProps.showCursor =
            typeof mergedTypeProps.showCursor === "boolean"
              ? mergedTypeProps.showCursor && isActive
              : isActive;

          return (
            <TypeText
              key={`${node.key ?? "text"}-${index}`}
              text={child}
              {...statefulTypeProps}
              onComplete={() => handleLineComplete(index)}
            />
          );
        }

        const mergedTypeProps = {
          ...node.typeProps,
          ...child.typeProps,
          ...node.childrenProps,
        };
        const statefulTypeProps = { ...mergedTypeProps };
        statefulTypeProps.animate =
          mergedTypeProps.animate === false
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

        return (
          <SaiDOMRender
            node={{
              ...child,
              typeProps: {
                ...statefulTypeProps,
              },
              onComplete: () => handleLineComplete(index),
            }}
          />
        );
      })}
    </Root>
  );
}
