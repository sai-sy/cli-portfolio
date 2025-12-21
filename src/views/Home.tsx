import { useMemo } from "react";
import { SaiDOMRender, type SaiElement } from "../components/SaiDOM";
import type { ViewName } from "../viewRegistry";

type HomeProps = {
  transitionIn?: boolean;
  onComplete?: (name: ViewName) => void;
};

export default function Home({
  transitionIn = true,
  onComplete = () => {},
}: HomeProps) {
  const nodes = useMemo<SaiElement>(
    () => ({
      component: "div",
      key: "home-root",
      attrs: { className: "home container" },
      typeProps: { animate: transitionIn, speed: 0, showCursor: true },
      childrenProps: { speed: 0 },
      onComplete: () => onComplete("home"),
      children: [
        { key: "title", component: "h1", children: ["Saihaan Syed"] },
        {
          key: "desc",
          component: "p",
          children: [
            "I build this page using Vite, React, Typescript, TSX and am hosting it on Railway. My goal is eventually make this my portfolio site that can be used like a command line while still being visually appealing and usable by a normal user",
          ],
        },
        {
          key: "nav-ls",
          component: "p",
          typeProps: { fileDir: "~" },
          children: ["ls"],
        },
        {
          key: "nav",
          component: "nav",
          children: ["projects        experience        contact"],
        },
        {
          key: "third",
          component: "p",
          typeProps: { fileDir: "~" },
          children: ["cat projects"],
        },
        {
          key: "fourth",
          component: "p",
          children: [
            "blah blah example long text paragraph blah blah example long text paragraph blah blah example long text paragraph blah blah example long text paragraph blah blah example long text paragraph blah blah example long text paragraph blah blah example long text paragraph blah blah example long text paragraph blah blah example long text paragraph blah blah example long text paragraph blah blah example long text paragraph blah blah example long text paragraph blah blah example long text paragraph blah blah example long text paragraph blah blah example long text paragraph blah blah example long text paragraph blah blah example long text paragraph blah blah example long text paragraph blah blah example long text paragraph blah blah example long text paragraph blah blah example long text paragraph blah blah example long text paragraph blah blah example long text paragraph blah blah example long text paragraph blah blah example long text paragraph  blah blah example long text paragraph",
          ],
        },
      ],
    }),
    [onComplete, transitionIn],
  );

  return <SaiDOMRender node={nodes}/>;
}
