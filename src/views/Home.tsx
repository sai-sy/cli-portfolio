import { useState } from "react";
import TypeText from "../components/TypeText";

type HomeProps = {
  transitionIn?: boolean;
  onComplete?: (...args: any[]) => void;
};

export default function Home({
  transitionIn = true,
  onComplete = () => {},
}: HomeProps) {
  const [showSecondLine, setShowSecondLine] = useState(false);
  //const [fileDir, setFileDir] = useState("~")
  return (
    <div className="home container">
    <p>~$ sudo loadPortfolio.exe</p>
      <h1>
        <TypeText
          text="Saihaan Syed"
          fileDir = {null}
          onComplete={() => setShowSecondLine(true)}
        />
      </h1>
      {showSecondLine && (
        <TypeText
          text="crafting CLI-inspired interactions IRL"
          delay={300}
          speed={40}
          fileDir = {null}
          onComplete={() => {}}
        />
      )}
    </div>
  );
}
