import { useContext, useState, type FormEvent } from "react";
import { CwdContext } from "../context/CwdContext";

type LineInProps = {
  onSubmit?: (value: string) => void;
};

export default function LineIn({ onSubmit = () => {} }: LineInProps) {
  const { cwd, setCwd: _unused } = useContext(CwdContext)!;
  const [value, setValue] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(value);
    setValue("");
  };

  return (
    <form className="lineout linein" onSubmit={handleSubmit}>
      <span className="fileDir">{cwd}</span>${" "}
      <input
        className="linein__input"
        type="text"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        autoFocus
      />
    </form>
  );
}
