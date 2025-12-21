// src/viewRegistry.ts
import type { ComponentType } from "react";
import Home from "./views/Home";
import Load from "./views/Load";
import Test from "./views/Test";

export type ViewName = "home" | "load" | "test";

type ViewEntry = {
  component: ComponentType<{ onComplete?: (...args: any[]) => void }>;
};

export const views: Record<ViewName, ViewEntry> = {
  home: {
    component: Home,
  },
  load: {
    component: Load,
  },
  test: {
    component: Test,
  },
};
