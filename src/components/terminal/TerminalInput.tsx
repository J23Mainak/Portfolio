import React, { useState, useEffect, useRef } from "react";

interface TerminalInputProps {
  input: string;
  setInput: (input: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  inputRef: React.RefObject<HTMLInputElement>;
  commandHistory: string[];
}

export const TerminalInput: React.FC<TerminalInputProps> = ({
  input,
  setInput,
  handleSubmit,
  inputRef,
  commandHistory
}) => {
  const [historyIndex, setHistoryIndex] = useState(-1);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      } else {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-2">
      <div className="flex items-center">
        <span className="text-terminal-green mr-2">$</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent border-none outline-none text-terminal-green font-mono"
          placeholder="Type a command..."
          autoFocus
        />
      </div>
    </form>
  );
};
