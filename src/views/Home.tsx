import TypeText from "../components/TypeText";

type HomeProps = {
  onFinished?: () => void
}

export function enter(){};
export function exit(){};

export default function Home({onFinished = () => {}}: HomeProps) {
  return (
    <div className="home-screen">
      <h1>Saihaan Syed</h1>
      <TypeText text="building delightful terminal-esque experiences" delay={300} speed={40} onComplete={onFinished}/>
    </div>
  )
}
