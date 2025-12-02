
import React from "react";

export type TerminalHistoryItem = {
  command: string;
  output: JSX.Element | string;
};

interface TerminalHistoryProps {
  history: TerminalHistoryItem[];
}

const TerminalHistory: React.FC<TerminalHistoryProps> = ({ history }) => {
  return (
    <>
      {history.map((item, index) => (
        <div key={index} className="my-2">
          {item.command !== "hint" && (
            <div className="terminal-prompt text-terminal-foreground">
              {item.command}
            </div>
          )}
          <div className={`${item.command !== "hint" ? "pl-5 mt-1" : ""}`}>{item.output}</div>
        </div>
      ))}
    </>
  );
};

export default TerminalHistory;
