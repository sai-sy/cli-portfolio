import LineOutList, { type LineOut } from "../components/LineOutList";
import type { ViewName } from "../viewRegistry";

type OldProps = {
  transitionIn?: boolean;
  onComplete?: (name: ViewName) => void;
};

const lineouts: LineOut[] = [
  { key: "title", content: "Saihaan Syed", component: "h1" },
  {
    key: "desc",
    content:
      "I build this page using Vite, React, Typescript, TSX and am hosting it on Railway. My goal is eventually make this my portfolio site that can be used like a command line while still being visually appealing and usable by a normal user",
    component: "p",
  },
  {
    key: "nav-ls",
    content: "ls",
    component: "p",
    typeProps: {
      fileDir: "~",
    },
  },
  {
    key: "nav",
    content: "projects        experience        contact",
    component: "nav",
  },
  {
    key: "third",
    content: "cat projects",
    component: "p",
    typeProps: {
      fileDir: "~",
    },
  },
  {
    key: "fourth",
    content:
      "blah blah example long text paragraph blah blah example long text paragraph blah blah example long text paragraph blah blah example long text paragraph blah blah example long text paragraph blah blah example long text paragraph blah blah example long text paragraph blah blah example long text paragraph blah blah example long text paragraph blah blah example long text paragraph blah blah example long text paragraph blah blah example long text paragraph blah blah example long text paragraph blah blah example long text paragraph blah blah example long text paragraph blah blah example long text paragraph blah blah example long text paragraph blah blah example long text paragraph blah blah example long text paragraph blah blah example long text paragraph blah blah example long text paragraph blah blah example long text paragraph blah blah example long text paragraph blah blah example long text paragraph blah blah example long text paragraph  blah blah example long text paragraph",
    component: "p",
  },
];

export default function Old({
  transitionIn = true,
  onComplete = () => {},
}: OldProps) {
  return (
    <div className="old container">
      <LineOutList
        lines={lineouts}
        animate={transitionIn}
        typeDefaults={{ speed: 0 }}
        onComplete={() => onComplete("old")}
      />
    </div>
  );
}
