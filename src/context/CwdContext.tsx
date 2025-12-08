import { createContext } from "react";
import { useState } from "react";

export const CwdContext = createContext<{
  cwd: string;
  setCwd: (value: string) => void;
} | null>(null);

export function CwdProvider({ children }: { children: React.ReactNode }) {
  const [cwd, setCwd] = useState("");
  return (
    <CwdContext.Provider value={{ cwd, setCwd }}>
      {children}
    </CwdContext.Provider>
  );
}
