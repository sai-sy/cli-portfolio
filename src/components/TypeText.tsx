import { useEffect, useState } from "react";

export type TypeTextProps = {
  text: string | undefined;
  className?: string;
  speed?: number;
  showCursor?: boolean;
  delay?: number;
  animate?: boolean;
  fileDir?: string | null;
  onComplete: () => void;
};

function TypeText({
  text,
  className,
  speed = 50,
  showCursor = true,
  delay = 0,
  animate = true,
  fileDir,
  onComplete,
}: TypeTextProps) {
  const [typed, setTyped] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [cursor, setCursor] = useState(showCursor);
  if (!text) text = "";
  useEffect(() => {
    if (!animate) {
      setTyped(text);
      onComplete();
      return;
    }
    setTyped("");
    setIsTyping(false);
    let timer: ReturnType<typeof setInterval> | null = null;
    const timeout = setTimeout(() => {
      setIsTyping(true);
      let index = 0;
      timer = setInterval(() => {
        index += 1;
        setTyped(text.slice(0, index));
        if (index === text.length) {
          clearInterval(timer!);
          setIsTyping(false);
          setCursor(false);
          onComplete();
        }
      }, speed);
    }, delay);
    return () => {
      clearTimeout(timeout);
      if (timer) clearInterval(timer);
    };
  }, [text, speed, delay, onComplete]);
  return (
    <>
      <span className={className}>
        {fileDir ? `${fileDir}$ ` : ``}
        {typed}
        {showCursor && cursor && (
          <span
            className={`cursor ${isTyping ? "cursor--static" : "cursor--blink"}`}
          >
            ▌
          </span>
        )}
      </span>
    </>
  );
}

export default TypeText;
