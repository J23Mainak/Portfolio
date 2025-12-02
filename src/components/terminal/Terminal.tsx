import React, { useState, useEffect, useRef } from "react";
import TerminalHeader from "./TerminalHeader";
import { TerminalInput } from "./TerminalInput";
import TerminalHistory from "./TerminalHistory";
import { createCommandsList } from "./CommandList";
import { WelcomeOutput, HintOutput, CommandNotFoundOutput } from "./CommandOutput";
import type { TerminalHistoryItem } from "./TerminalHistory";

const Terminal: React.FC = () => {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<TerminalHistoryItem[]>([]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [isTypingAnimation, setIsTypingAnimation] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  };

  // Create commands list with scroll callback
  const commands = createCommandsList(scrollToBottom);

  // Initial welcome message with typing animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setHistory([
        {
          command: "welcome",
          output: WelcomeOutput()
        },
      ]);
      setIsTypingAnimation(false);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Auto scroll to bottom whenever history changes
  useEffect(() => {
    scrollToBottom();
  }, [history]);

  // Focus input when clicking anywhere in terminal
  useEffect(() => {
    const handleClick = () => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    };

    const terminal = terminalRef.current;
    if (terminal) {
      terminal.addEventListener("click", handleClick);
    }

    return () => {
      if (terminal) {
        terminal.removeEventListener("click", handleClick);
      }
    };
  }, []);

  const executeCommand = (cmdString: string) => {
    const cmdTrimmed = cmdString.trim().toLowerCase();
    
    if (cmdTrimmed === "") {
      return;
    }

    // Add command to history
    setCommandHistory(prev => [...prev, cmdTrimmed]);

    if (cmdTrimmed === "clear") {
      setHistory([{
        command: "hint",
        output: HintOutput()
      }]);
      return;
    }

    const [cmd, ...args] = cmdTrimmed.split(" ");
    const command = commands[cmd];
    
    let output;
    if (command) {
      output = command.action();
    } else {
      output = CommandNotFoundOutput(cmd);
    }

    setHistory((prev) => [
      ...prev,
      {
        command: cmdTrimmed,
        output,
      },
    ]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeCommand(input);
    setInput("");
  };

  return (
    <div className="w-full max-w-4xl mx-auto rounded-md overflow-hidden border border-gray-700 shadow-lg">
      {/* Terminal header */}
      <TerminalHeader />
      
      {/* Terminal body */}
      <div 
        ref={terminalRef}
        className="bg-terminal-background p-4 h-[70vh] overflow-y-auto scroll-smooth"
        style={{ height: "70vh" }}
      >
        {/* Matrix-style loader */}
        {isTypingAnimation && (
          <div className="matrix-loader text-terminal-pink">
            <div className="matrix-rain"></div>
          </div>
        )}
        
        {/* Command history */}
        <TerminalHistory history={history} />
        
        {/* Input form */}
        <TerminalInput
          input={input}
          setInput={setInput}
          handleSubmit={handleSubmit}
          inputRef={inputRef}
          commandHistory={commandHistory}
        />
      </div>
    </div>
  );
};

export default Terminal;
