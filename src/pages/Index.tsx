import React, { useState, useEffect } from "react";
import Terminal from "@/components/Terminal";
import ParticlesBackground from "@/components/ParticlesBackground";
import { Toaster } from "@/components/ui/toaster";
import { GithubIcon, LinkedinIcon, Code } from "lucide-react";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for a smoother entry experience
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <ParticlesBackground/>

      {isLoading ? (
        <div className="text-center">
          <div className="text-terminal-green text-2xl font-bold animate-pulse mb-4">
            Loading Terminal...
          </div>
          <div className="inline-block w-8 h-8 border-4 border-terminal-cyan border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="container max-w-4xl mx-auto px-4 py-7 space-y-6">
          <header className="text-center mb-8 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-2 text-terminal-green">
              <span className="text-terminal-foreground">Developer</span>{" "}
              Terminal
            </h1>
            <p className="text-terminal-cyan">
              Type commands to navigate my portfolio
            </p>
          </header>

          <div className="animate-float">
            <Terminal />
          </div>

          <footer className="py-4 text-center text-sm text-gray-400">
            <div className="flex justify-center space-x-6 mb-4">
              <a
                href="https://github.com/J23Mainak/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-terminal-purple transition-colors"
              >
                <GithubIcon size={24} />
              </a>
              <a
                href="https://www.linkedin.com/in/mainak-jana49/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-terminal-purple transition-colors"
              >
                <LinkedinIcon size={24} />
              </a>
              <a
                href="https://www.codechef.com/users/bright_glee_22/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-terminal-purple transition-colors"
              >
                <Code size={24} />
              </a>
            </div>
            <p>© 2025 Mainak Jana's Portfolio. All rights reserved.</p>
          </footer>
        </div>
      )}

      <Toaster />
    </div>
  );
};

export default Index;
