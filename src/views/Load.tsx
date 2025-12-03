type LoadProps = {
  onFinished: () => void
}
import TypeText from "../components/TypeText";

export default function Load({ onFinished }: LoadProps) {
  return (
    <div className="load">
      <h1>
        <TypeText text="sudo loadPortfolio.exe" onComplete={onFinished}/>
      </h1>
    </div>
  );
}

