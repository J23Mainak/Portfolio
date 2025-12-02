
import React from "react";
import { Command } from "lucide-react";

const TerminalHeader: React.FC = () => {
  return (
    <div className="terminal-header">
      <div className="terminal-controls">
        <div className="control-btn control-close"></div>
        <div className="control-btn control-minimize"></div>
        <div className="control-btn control-maximize"></div>
      </div>
      <div className="text-sm text-gray-400 flex items-center gap-1">
        <Command size={14} />
        <span>portfolio-terminal</span>
      </div>
      <div className="w-[60px]"></div> {/* Spacer for alignment */}
    </div>
  );
};

export default TerminalHeader;
