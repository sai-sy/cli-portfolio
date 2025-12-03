import { useCallback, useMemo, useState } from "react"
import Load from "./views/Load"
import Home from "./views/Home"
import "./App.css"

type ViewKey = "load" | "home"

type ViewAnimation = {
  enter?: string
  exit?: string
  enabled?: boolean
}

type ViewSlot = { key: ViewKey; status: "enter" | "active" | "exit" , animation: ViewAnimation}

type ViewConfig = {
  key: ViewKey
  element: ReactNode
  animation?: ViewAnimation
}


export default function App() {
  const [slots, setSlots] = useState<ViewSlot[]>([{ key: "load", status: "active", animation: {enter: `${key}`.enter}}])

  const requestView = useCallback((next: ViewKey) => {
    setSlots((current) => {
      const exiting = current.map((slot) =>
        slot.status === "active" ? { ...slot, status: "exit" } : slot
      )
      return [...exiting, { key: next, status: "enter" }]
    })
  }, [])

  const viewMap = useMemo<Record<ViewKey, JSX.Element>>(
    () => ({
      load: <Load onFinished={() => requestView("home")} />,
      home: <Home />,
    }),
    [requestView]
  )

  const handleAnimationEnd = (slot: ViewSlot) => {
    setSlots((current) =>
      current.flatMap((existing) => {
        if (existing.key !== slot.key || existing.status !== slot.status) return [existing]
        if (slot.status === "enter") return [{ ...existing, status: "active" }]
        if (slot.status === "exit") return []
        return [existing]
      })
    )
  }

  return (
    <main className="view-stack">
      {slots.map((slot) => (
        <section
          key={`${slot.key}-${slot.status}`}
          className="view-panel"
          data-state={slot.status}
          onAnimationEnd={() => handleAnimationEnd(slot)}
        >
          {viewMap[slot.key]}
        </section>
      ))}
    </main>
  )
}
