export type ScrollbackEntry = {
  id: string;
  type: "prompt" | "output";
  cwd?: string;
  value: string;
};

type ScrollbackProps = {
  entries: ScrollbackEntry[];
};

export default function Scrollback({ entries }: ScrollbackProps) {
  return (
    <div className="scrollback">
      {entries.map((entry) => (
        <div className="scrollback_entry_line lineout" key={entry.id}>
          <p>
            {entry.cwd ? (
              <>
                <span className="fileDir">{entry.cwd}</span>
                <span className="linein__prompt">$</span>
                {entry.value}
              </>
            ) : (
              entry.value
            )}
          </p>
        </div>
      ))}
    </div>
  );
}
