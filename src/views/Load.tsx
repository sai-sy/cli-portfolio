import TypeText from "../components/TypeText";
import type { ViewName } from "../viewRegistry";
import { useContext } from "react";
import { CwdContext } from "../context/CwdContext";

type LoadProps = {
  transitionIn?: boolean;
  onComplete?: (name: ViewName) => void;
};

export function enter() {}
export function exit() {}
export default function Load({
  transitionIn = true,
  onComplete = () => {},
}: LoadProps) {
  const { cwd, setCwd } = useContext(CwdContext)!;
  return (
    <div className="load center">
      <h2>
        <TypeText
          text="sudo loadPortfolio.exe"
          animate={transitionIn}
          delay={600}
          fileDir={true}
          onComplete={() => {
            setTimeout(() => {
              setCwd(cwd + "~");
              onComplete("home");
            }, 175);
          }}
        />
      </h2>
    </div>
  );
}
