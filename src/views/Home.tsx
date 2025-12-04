import LineOutList, { type LineOut } from "../components/LineOutList";
import type { ViewName } from "../viewRegistry";

type HomeProps = {
  transitionIn?: boolean;
  onComplete?: (name: ViewName) => void;
};

const lineouts: LineOut[] = [
  { key: "title", content: "Saihaan Syed", component: "h1" },
  {
    key: "subtitle",
    content:
      "I build this page using Vite, React, Typescript, TSX and am hosting it on Railway. My goal is eventually make this my portfolio site that can be used like a command line while still being visually appealing and usable by a normal user",
    component: "p",
  },
  {
    key: "third",
    content: "BLAH BL AH",
    component: "h2",
  },
];

export default function Home({
  transitionIn = true,
  onComplete = () => {},
}: HomeProps) {
  return (
    <div className="home container">
      <LineOutList
        lines={lineouts}
        animate={transitionIn}
        typeDefaults={{speed: 0}}
        onComplete={() => onComplete("home")}
      />
    </div>
  );
}
