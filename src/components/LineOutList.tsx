import { useCallback, useMemo, useState, type JSX } from "react";
import TypeText from "./TypeText";

export type LineOut = {
  component: keyof JSX.IntrinsicElements;
  content?: string;
  key?: string;
  className?: string;
  typeProps?: {
    speed?: number;
    delay?: number;
    showCursor?: boolean;
  };
};

export type LineOutListProps = {
  lines: LineOut[];
  animate?: boolean;
  enforceUniformTypeProps?: boolean;
  onComplete?: () => void;
  typeDefaults?: Partial<Parameters<typeof TypeText>[0]>;
};

export default function LineOutList({
  lines,
  animate = true,
  typeDefaults = { speed: 50, delay: 0, showCursor: true },
  enforceUniformTypeProps = false,
  onComplete,
}: LineOutListProps) {
  const [current, setCurrent] = useState(0);

  const safeLines = useMemo(
    () =>
      lines.map((line, index) => ({
        ...line,
        key: line.key ?? `line-${index}`,
      })),
    [lines],
  );

  const handleLineComplete = useCallback(
    (index: number) => {
      if (index === safeLines.length - 1) {
        onComplete?.();
      } else {
        setCurrent((prev) => Math.min(prev + 1, safeLines.length - 1));
      }
    },
    [onComplete, safeLines.length],
  );

  return (
    <>
      {safeLines.map((line, index) => {
        if (index < current) {
          const Tag  = line.component;
          return (
            <Tag key={line.key} className={line.className}>
            {line.content}
            </Tag>
          )
        }
        if (index > current) return null;

        const Tag = line.component;
        const isActive = index === current;
        const mergedTypeProps =
          enforceUniformTypeProps || !line.typeProps
            ? { ...typeDefaults }
            : { ...typeDefaults, ...line.typeProps };

        return (
          <Tag key={line.key} className={line.className}>
            <TypeText
              {...mergedTypeProps}
              text={line.content ?? ""}
              animate={animate ? isActive : false}
              showCursor={
                typeof mergedTypeProps.showCursor === "boolean"
                  ? mergedTypeProps.showCursor && isActive
                  : isActive
              }
              onComplete={() => handleLineComplete(index)}
            />
          </Tag>
        );
      })}
    </>
  );
}
