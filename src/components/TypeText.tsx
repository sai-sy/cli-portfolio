import { useEffect, useState } from "react"

type TypeTextProps = {
  text: string
  className?: string
  speed?: number
  showCursor?: boolean
  delay?: number
}

function TypeText({ text, className, speed = 50, showCursor = true, delay = 1500 }: TypeTextProps) {
  const [typed, setTyped] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  useEffect(() => {
    setTyped('');
    setIsTyping(false);
    const timeout = setTimeout(() => {
      setIsTyping(true)
      let index = 0;
      const timer = setInterval(() => {
        index += 1;
        setTyped(text.slice(0, index))
        if (index === text.length) {
          clearInterval(timer);
          setIsTyping(false);
        }
      }, speed);
      return () => clearInterval(timer);
    }, delay)
    return () => clearTimeout(timeout)
  }, [text, speed, delay])
  return (
    <>
      <p className={className}>
      {typed}{showCursor && <span className={`cursor ${isTyping ? "cursor--static" : "cursor--blink"}`}>▌
        </span>}
      </p >

    </>
  )
}

export default TypeText
