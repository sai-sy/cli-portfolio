import { useState } from "react";
import "./App.css";
import { views, type ViewName } from "./viewRegistry";

export default function App() {
  const [view, setView] = useState<ViewName>("load");
  const CurrentView = views[view].component;

  return (
    <main>
        <CurrentView onComplete={setView} />
    </main>
  );
}
