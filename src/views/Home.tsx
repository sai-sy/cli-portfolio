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
          key: "nav-ls",
          component: "p",
          typeProps: { fileDir: "~" },
          children: ["ls"],
        },
        {
          key: "nav",
          component: "nav",
          children: [
            {
              key: "nav-projects-a",
              component: "a",
              attrs: {"className": "directory"},
              typeProps: { fileDir: false},
              children: ["projects"],
            },
            {
              key: "nav-about-a",
              component: "a",
              typeProps: { fileDir: false },
              children: ["about"],
            },
            {
              key: "nav-experience-a",
              component: "a",
              attrs: {className: "directory"},
              typeProps: { fileDir: false},
              children: ["experience"],
            },
            {
              key: "nav-contact-a",
              component: "a",
              typeProps: { fileDir: false },
              children: ["contact"],
            },
          ],
        },
        {
          key: "third",
          component: "p",
          typeProps: { fileDir: "~" },
          children: ["cat about"],
        },
        {
          key: "desc",
          component: "p",
          typeProps: { animate: false },
          children: [
            "I build this page using Vite, React, Typescript, TSX and am hosting it on Railway. My goal is eventually make this my portfolio site that can be used like a command line while still being visually appealing and usable by a normal user",
          ],
        },
      ],
    }),
    [onComplete, transitionIn],
  );

  return <SaiDOMRender node={nodes} />;
}
