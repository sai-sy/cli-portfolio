import { useEffect, useState } from "react";
import { useContext } from "react";
import { CwdContext } from "../context/CwdContext";

export type TypeTextProps = {
  text: string | undefined;
  className?: string;
  speed?: number;
  showCursor?: boolean;
  delay?: number;
  animate?: boolean;
  fileDir?: boolean | string;
  onComplete?: () => void;
};

function TypeText({
  text,
  className: _notused,
  speed = 50,
  showCursor = true,
  delay = 0,
  animate = false,
  fileDir: _fileDir = false,
  onComplete = () => {},
}: TypeTextProps) {
  const [typed, setTyped] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [cursor, setCursor] = useState(showCursor);
  const { cwd: _cwd, setCwd: _unused } = useContext(CwdContext)!;

  if (!text) text = "";
  useEffect(() => {
    let index = 0;
    if (!animate) {
      setTyped(text);
      index = text.length;
      onComplete();
      return;
    }
    setTyped("");
    setIsTyping(false);
    let timer: ReturnType<typeof setInterval> | null = null;
    const timeout = setTimeout(() => {
      setIsTyping(true);
      //let index = 0;
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
      {typed}

      {/*{fileDir === true ? (
        <>
          <span className="fileDir">{cwd}</span>
          {"$ "}
        </>
      ) : typeof fileDir === "string" ? (
        <>
          <span className="fileDir">{fileDir}</span>
          {"$ "}
        </>
      ) : (
        ""
      )}*/}
      {!(typed.length === text.length) && showCursor && cursor && (
        <span
          className={`cursor ${isTyping ? "cursor--static" : "cursor--blink"}`}
        >
          ▌
        </span>
      )}
    </>
  );
}

export default TypeText;
