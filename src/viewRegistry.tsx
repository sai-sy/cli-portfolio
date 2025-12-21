// src/viewRegistry.ts
import type { ComponentType } from "react";
import Home from "./views/Home";
import Load from "./views/Load";
//import Test from "./views/Test";
import Old from "./views/Old";

export type ViewName = "home" | "load" | /*"test" |*/ "old";

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
  /*test: {
    component: Test,
  },*/
  old: {
    component: Old,
  },
};
