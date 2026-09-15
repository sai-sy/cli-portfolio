import { useContext, useState } from "react";
import CliInput from "../components/CliInput";
import Scrollback, { type ScrollbackEntry } from "../components/Scrollback";
import { CwdContext } from "../context/CwdContext";

export default function Terminal() {
  const [scrollbackEntries, setScrollbackEntries] = useState<ScrollbackEntry[]>(
    [],
  );
  const { cwd } = useContext(CwdContext)!;

  return (
    <>
      <Scrollback entries={scrollbackEntries} />
      <CliInput
        onSubmit={(value) => {
          setScrollbackEntries((scrollbackEntries) => [
            ...scrollbackEntries,
            {
              id: crypto.randomUUID(),
              type: "prompt",
              cwd,
              value,
            },
          ]);
        }}
      />
    </>
  );
}
