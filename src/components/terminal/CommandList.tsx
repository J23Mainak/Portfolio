import {
  AboutOutput,
  ExperienceOutput,
  ProjectsOutput,
  SkillsOutput,
  ContactOutput,
  HelpOutput,
  SudoOutput,
  AchievementsOutput,
} from "./CommandOutput";
import { AskCommand } from "./AskCommand";

// Define the command type
export type Command = {
  name: string;
  description: string;
  action: (onResponseReceived?: () => void) => JSX.Element | string;
};

// Create and export the commands list
export const createCommandsList = (
  onResponseReceived?: () => void
): Record<string, Command> => {
  // This creates a circular reference, will be resolved in the terminal component
  const commands: Record<string, Command> = {
    about: {
      name: "about",
      description: "Learn more about me",
      action: () => <AboutOutput />,
    },
    experience: {
      name: "experience",
      description: "View my work experience",
      action: () => <ExperienceOutput />,
    },
    projects: {
      name: "projects",
      description: "Explore my projects",
      action: () => <ProjectsOutput />,
    },
    skills: {
      name: "skills",
      description: "View my technical skills",
      action: () => <SkillsOutput />,
    },
    achievements: {
      name: "achievements",
      description: "See my achievements",
      action: () => <AchievementsOutput />,
    },
    contact: {
      name: "contact",
      description: "Get my contact information",
      action: () => <ContactOutput />,
    },
    sudo: {
      name: "sudo",
      description: "Try to get root access",
      action: () => <SudoOutput />,
    },
    help: {
      name: "help",
      description: "Show all available commands",
      action: () => <HelpOutput commands={commands} />,
    },
    askai: {
      name: "askai",
      description: "Ask me anything about Mainak's experience and skills",
      action: () => {
        const prompt = `You are an AI assistant with access to Mainak Jana's professional information.
        You have knowledge of his academic background, research, and projects and should use that information to produce accurate, concise, and helpful answers.

        Key context you may use:
        - Name: Mainak Jana
        - Education: B.Tech (Computer Science & Engineering) at Birla Institute of Technology, Mesra (CGPA: 9.12)
        - Research: AttentioNet — a channel-attention CNN for retinal disease detection (high parameter efficiency and strong APTOS performance)
        - Projects: EyeCare (end-to-end AI platform with RAG chatbot, FastAPI backend, Qdrant for vector search) and InterviewAI (Next.js/TypeScript interview simulator using Google Gemini API and Clerk auth)
        - Roles: Undergraduate Researcher (BIT Mesra), Team Lead at e-Yantra robotics club, experience building full-stack products and ML systems
        - Skills & tools: React / Next.js, TypeScript, Node.js, FastAPI, TensorFlow, PyTorch, LangChain, LangGraph, Qdrant, Google Gemini API, Clerk (auth), Docker, AWS, MongoDB, MySQL, Redis, Kafka, Git
        - Other signals: strong competitive programming background (CodeChef/Codeforces), national-level hackathon placements and ML challenge results

        Guidelines for responses:
        1. Keep answers concise and focused:
          - Use 2–3 sentences for most queries.
          - Provide slightly longer, stepwise answers only when requested.
        2. For professional / technical questions:
          - Give direct, factual answers.
          - Focus on relevant skills, architecture, trade-offs, and measurable outcomes.
          - Maintain a professional, clear tone.
        3. For product or interview practice:
          - Prefer actionable steps, example commands, architecture bullet points, and short code/snippet ideas when helpful.
        4. For casual or playful queries:
          - You may adopt a light Matrix-themed persona (Morpheus) if the user explicitly asks for it, but default to professional responses.
        5. If information is missing, say you don't have it and offer reasonable next steps.

        Remember: Keep responses concise but informative. Use the context above to ground answers about Mainak's experience, projects, and technical capabilities.`;
        return (
          <AskCommand onResponseReceived={onResponseReceived} prompt={prompt} />
        );
      },
    },
    clear: {
      name: "clear",
      description: "Clear the terminal",
      action: () => null,
    },
  };

  return commands;
};
