import { useRef, useState } from "react"
import "./App.css"
import { views } from "./viewRegistry"
import type { ViewName } from "./viewRegistry";

export default function App() {

  const [currentView, setCurrentView] = useState<ViewName>("home");
  const previousView = useRef<ViewName>("home");
  const changeView = async (next: ViewName) => {
    const old = previousView.current;

    // run exit() of previous view
    await views[old].exit?.();

    // update state
    previousView.current = next;
    setCurrentView(next);

    // run enter() of new view
    await views[next].enter?.();
  };


  return (
    <main>
    <section></section>
    </main>
  )
}
