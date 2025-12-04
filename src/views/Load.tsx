import TypeText from "../components/TypeText";
import type { ViewName } from "../viewRegistry";

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
  return (
    <div className="load center">
      <h2>
        <TypeText
          text="sudo loadPortfolio.exe"
          animate={transitionIn}
          delay={600}
          fileDir={null}
          onComplete={() => {
            setTimeout(() => {
              onComplete("home");
            }, 175);
          }}
        />
      </h2>
    </div>
  );
}
