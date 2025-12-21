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
      childrenProps: { speed: 20 },
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
          typeProps: { animate: false },
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
              attrs: {className: "directory"},
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
            {
              key: "nav-contact-a",
              component: "a",
              typeProps: { fileDir: false },
              children: ["README.md"],
            },
          ],
        },
        {
          key: "third",
          component: "p",
          typeProps: { fileDir: "~" },
          children: ["cat README.md"],
        },
        {
          key: "desc",
          component: "p",
          typeProps: { animate: false },
          children: [
            "# Sai's CLI Portfolio. I built a virtual dom to manage the line rendering, so you can navigate as you would any site, or you can pass standard file navigation bash commands if you're a no-mouse full efficiency type of person! (coming-soon)",
          ],
        },
      ],
    }),
    [onComplete, transitionIn],
  );

  return <SaiDOMRender node={nodes} />;
}
