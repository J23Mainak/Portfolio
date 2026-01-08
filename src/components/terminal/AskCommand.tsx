import React, { useState, useEffect } from "react";

// Rate limiter implementation
class RateLimiter {
  private timestamps: number[] = [];
  private readonly maxRequests: number;
  private readonly timeWindow: number;

  constructor(maxRequests: number, timeWindow: number) {
    this.maxRequests = maxRequests;
    this.timeWindow = timeWindow;
  }

  canMakeRequest(): boolean {
    const now = Date.now();
    // Remove timestamps older than the time window
    this.timestamps = this.timestamps.filter(
      (timestamp) => now - timestamp < this.timeWindow
    );

    if (this.timestamps.length >= this.maxRequests) {
      return false;
    }

    this.timestamps.push(now);
    return true;
  }
}

// Create a rate limiter instance (10 requests per minute)
const rateLimiter = new RateLimiter(10, 60 * 1000);

interface AskCommandProps {
  onResponseReceived?: () => void;
  prompt?: string;
}

export const AskCommand = ({ onResponseReceived, prompt }: AskCommandProps) => {
  const [response, setResponse] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [userQuestion, setUserQuestion] = useState<string>("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && userQuestion.trim()) {
      if (!rateLimiter.canMakeRequest()) {
        setError(
          "Rate limit exceeded. Please wait a moment before trying again."
        );
        return;
      }
      setIsLoading(true);
      setError("");
      setResponse("");
      fetchResponse(userQuestion.trim());
    }
  };

  const fetchResponse = async (question: string) => {
    try {
      const response = await fetch(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
          },
          body: JSON.stringify({
            model: "llama-3.3-70b-versatile",
            messages: [
              {
                role: "system",
                content:
                  prompt ||
                  `I am Morpheus, a guide in the digital realm. I communicate in a style inspired by The Matrix - mysterious yet professional, with occasional references to the digital world.

              Here are the key details about Mainak that I'm programmed to share:
              
              [CORE DATA]
              - Current Status: B.Tech Computer Science student at BIT Mesra (2022-2026)
              - CGPA: 9.16
              - Location: Ranchi, India
              
              [TECHNICAL MATRIX]
              - Programming: C, C++, Python (Proficient), Java, Bash (Familiar)
              - Frontend: HTML, CSS, JavaScript, Tailwind CSS, ReactJS, Redux
              - Backend: NodeJS, ExpressJS, FastAPI, MongoDB, MySQL, Qdrant DB
              - AI/ML: TensorFlow, PyTorch, LangChain, LangGraph
              
              [NOTABLE PROJECTS]
              - EyeCare: AI-Powered Health Assistant (ReactJS, FastAPI, Qdrant, Gemini-Pro-2.5)
              - InterviewAI: Online Interview Preparation Tool (Next.js, TypeScript, Gemini API)
              
              [RESEARCH]
              - AttentioNet: Channel Attention-Based Tactics for Medical Diagnosis (IEEE Research Paper)
              
              [ACHIEVEMENTS]
              - Top 100 in Amazon ML Challenge 2025
              - IET Scholarship Hackathon Finalist (among 75,000+ participants)
              - Flipkart GRID 7.0 Semi-Finalist (among 200,000+ participants)
              - CodeChef Rating: 2137 | Codeforces Rating: 1759 (Expert)
              - Team Lead at e-Yantra (IIT Bombay) club
              
              [EXTRACURRICULAR]
              - Active competitive programmer
              - Touch-typing speed of 90 WPM

              I maintain a mysterious yet professional tone, similar to Morpheus from The Matrix. 
              I focus on highlighting Mainak's skills and achievements in a way that resonates with technical recruiters 
              and hiring managers. When answering questions, I provide accurate, concise information while maintaining 
              the digital realm theme.`,
              },
              {
                role: "user",
                content: question,
              },
            ],
            temperature: 0.7,
            max_tokens: 500,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error?.message || `HTTP error! status: ${response.status}`
        );
      }

      if (!data.choices || !data.choices[0]?.message?.content) {
        throw new Error("Invalid response format from AI service");
      }

      setResponse(data.choices[0].message.content);
      onResponseReceived?.();
    } catch (err) {
      console.error("Error details:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Error connecting to AI service. Please try again later."
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="text-terminal-green">
        <p>Thinking...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-terminal-red">
        <p>{error}</p>
      </div>
    );
  }

  if (response) {
    return (
      <div className="text-terminal-green">
        <p>{response}</p>
      </div>
    );
  }

  return (
    <div className="text-terminal-green">
      <p>Please enter your question:</p>
      <div className="mt-2">
        <input
          type="text"
          value={userQuestion}
          onChange={(e) => setUserQuestion(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full bg-transparent border-none outline-none text-terminal-green font-mono"
          placeholder="Type your question here and press Enter..."
          autoFocus
        />
      </div>
    </div>
  );
};
