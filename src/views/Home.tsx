import { useState } from "react";
import TypeText from "../components/TypeText";
import type { ViewName } from "../viewRegistry";

type HomeProps = {
  transitionIn?: boolean;
  onComplete?: (name: ViewName) => void;
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
          text="I build this page using Vite, React, Typescript, TSX and am hosting it on Railway. My goal is eventually make this my portfolio site that can be used like a command line while still being visually appealing and usable by a normal user" 
          delay={300}
          speed={20}
          animate={transitionIn}
          fileDir = {null}
          onComplete={() => {
            setTimeout(() => {
              onComplete("home");
            }, 175);}}
        />
      )}
    </div>
  );
}
