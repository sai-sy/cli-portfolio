import { useMemo } from "react";
import { SaiDOMRender, type SaiElement } from "../components/SaiDOM";
import type { ViewName } from "../viewRegistry";
import LineIn from "../components/LineIn";

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
        {
          key: "title",
          component: "h1",
          children: ["Saihaan Syed (under construction)"],
        },
        {
          key: "nav-ls",
          component: "p",
          typeProps: { fileDir: "~" },
          children: ["ls && cat socials"],
        },
        {
          key: "nav",
          component: "nav",
          typeProps: { animate: false },
          children: [
            {
              key: "nav-projects-a",
              component: "a",
              attrs: { className: "directory" },
              typeProps: { fileDir: false },
              children: [
                {
                  key: "nav-projects-a-h2",
                  component: "h2",
                  children: ["projects"],
                },
              ],
            },
            {
              key: "nav-about-a",
              component: "a",
              attrs: { className: "directory" },
              typeProps: { fileDir: false },
              children: [
                {
                  key: "nav-about-a-h2",
                  component: "h2",
                  children: ["about"],
                },
              ],
            },
            {
              key: "nav-experience-a",
              component: "a",
              attrs: { className: "directory" },
              typeProps: { fileDir: false },
              children: [
                {
                  key: "nav-experience-a-h2",
                  component: "h2",
                  children: ["experience"],
                },
              ],
            },
            {
              key: "nav-readme-a",
              component: "a",
              typeProps: { fileDir: false },
              children: [
                {
                  key: "nav-readme-a-h2",
                  component: "h2",
                  children: ["README.md"],
                },
              ],
            },
            {
              key: "nav-contact-a",
              component: "a",
              typeProps: { fileDir: false },
              children: [
                {
                  key: "nav-about-a-h2",
                  component: "h2",
                  children: ["contact"],
                },
              ],
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
            "# Sai's CLI Portfolio under construction! Please check out https://github.com/sai-sy and https://github.com/chester-hill-solutions for my work. I built a virtual dom to manage the line rendering, so you can navigate as you would any site, or you can pass standard file navigation bash commands if you're a no-mouse full efficiency type of person! (coming-soon)",
          ],
        },
      ],
    }),
    [onComplete, transitionIn],
  );

  return (
    <>
      <SaiDOMRender node={nodes} />
      <LineIn />
    </>
  );
}
