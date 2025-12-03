import { useEffect, useState } from "react";

type TypeTextProps = {
  text: string;
  className?: string;
  speed?: number;
  showCursor?: boolean;
  delay?: number;
  onComplete: () => void;
};

function TypeText({
  text,
  className,
  speed = 50,
  showCursor = true,
  delay = 1500,
  onComplete,
}: TypeTextProps) {
  const [typed, setTyped] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  useEffect(() => {
    setTyped("");
    setIsTyping(false);
    let timer: ReturnType<typeof setInterval> | null = null
    const timeout = setTimeout(() => {
      setIsTyping(true);
      let index = 0;
      timer = setInterval(() => {
        index += 1;
        setTyped(text.slice(0, index));
        if (index === text.length) {
          clearInterval(timer!);
          setIsTyping(false);
          onComplete();
        }
      }, speed);
    }, delay);
    return () => {
      clearTimeout(timeout);
      if (timer) clearInterval(timer);
    }
  }, [text, speed, delay, onComplete]);
  return (
    <>
      <span className={className}>
        {typed}
        {showCursor && (
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
