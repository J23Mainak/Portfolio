import React from "react";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  User,
  Code,
  Terminal as TerminalIcon,
  Mail,
  Github,
  Linkedin,
  ExternalLink,
  Briefcase,
  HelpCircle,
  Award,
  Phone,
} from "lucide-react";
import type { Command } from "./CommandList";
import photo from "./Photo.jpg";

// Define the types for command outputs
export type CommandOutput = JSX.Element | string;

// About command output
export const AboutOutput = (): JSX.Element => (
  <div className="space-y-3">
    <div className="flex items-center gap-2 text-xl font-bold text-terminal-purple">
      <User size={20} />
      <h2>About Me</h2>
    </div>
    <Separator className="bg-gray-700" />

    <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
      <div className="relative w-32 h-32">
        <img
          src={photo}
          alt="Mainak Jana"
          className="rounded-full w-full h-full object-cover border-4 border-terminal-cyan shadow-lg hover:border-terminal-purple transition-colors duration-300"
        />
        <div className="absolute inset-0 rounded-full border-4 border-terminal-purple opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      <div className="space-y-3 flex-1">
        <p className="text-terminal-foreground">
          👋 Hey there! I'm <span className="font-bold">Mainak</span>, a
          Computer Science and Engineering undergraduate at Birla Institute of
          Technology, Mesra (CGPA 9.16). I enjoy building end-to-end systems
          that combine deep learning, LLMs, and scalable web applications.
        </p>
        <p className="text-terminal-foreground">
          My work spans research on computer vision tasks for medical diagnosis,
          building full-stack products, and doing
          competitive programming on Codeforces and CodeChef. When I’m not
          experimenting with new architectures or RAG pipelines, you’ll likely
          find me solving algorithmic problems or refining one of my side
          projects.
        </p>
      </div>
    </div>
  </div>
);

// Experience command output
export const ExperienceOutput = (): JSX.Element => (
  <div className="space-y-3">
    <div className="flex items-center gap-2 text-xl font-bold text-terminal-purple">
      <Briefcase size={20} />
      <h2>Experience</h2>
    </div>
    <Separator className="bg-gray-700" />

    <div className="space-y-4">
      <div className="mb-4">
        <div className="text-terminal-pink">
          Birla Institute of Technology, Mesra - Undergraduate Researcher
        </div>
        <div className="text-terminal-foreground">May 2025 - July 2025</div>
        <ul className="list-disc list-inside text-terminal-foreground mt-2 space-y-1">
          <li>
            Designed AttentioNet, a channel-attention CNN with depthwise
            separable convolutions and a SqueezeNet-inspired architecture,
            reducing model parameters by 11× compared to pretrained baselines.
          </li>
          <li>
            Applied channel attention to retinal features and spatial attention
            to key regions in fundus images, achieving 89.12% accuracy and
            0.9224 QWK on APTOS, outperforming baselines by 12%.
          </li>
          <li>
            Developed a hybrid classical–quantum CNN (CQ-CNN) variant to retain
            similar accuracy with ultra-low parameters, using Bayesian
            hyperparameter tuning and model fusion for robust performance.
          </li>
          <li>
            Enhanced retinal vessel visibility using CLAHE and Ben Graham
            preprocessing, reducing evaluation time by approximately 50%.
          </li>
        </ul>
      </div>
      {[
        {
          title: "Team Lead, e-Yantra Robotics Club",
          company: "Birla Institute of Technology, Mesra",
          period: "2023 - Present",
          achievements: [
            "Lead robotics initiatives under the e-Yantra (IIT Bombay) ecosystem, mentoring peers on embedded systems and algorithms.",
            "Participated in multiple national-level robotics competitions, focusing on rapid prototyping and problem solving.",
            "Coordinated team efforts across hardware, software, and control systems to deliver end-to-end robotics solutions.",
            "Balanced club responsibilities with a strong academic record, maintaining a 9.12 CGPA in Computer Science and Engineering.",
          ],
        },
      ].map((job, index) => (
        <div
          key={index}
          className="border border-gray-700 rounded-md p-3 hover:bg-gray-800/50 transition-colors"
        >
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-1">
            <h3 className="text-terminal-cyan font-bold">{job.title}</h3>
            <span className="text-terminal-pink text-sm">{job.period}</span>
          </div>
          <p className="text-terminal-yellow mt-1">{job.company}</p>
          <ul className="mt-3 space-y-2 list-disc list-inside text-sm">
            {job.achievements.map((achievement, idx) => (
              <li key={idx} className="text-terminal-foreground">
                {achievement}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </div>
);

// Projects command output
export const ProjectsOutput = (): JSX.Element => (
  <div className="space-y-3">
    <div className="flex items-center gap-2 text-xl font-bold text-terminal-purple">
      <TerminalIcon size={20} />
      <h2>Projects</h2>
    </div>
    <Separator className="bg-gray-700" />

    <div className="space-y-4">
      {[
        {
          title: "EyeCare: AI-Powered Health Assistant",
          description:
            "A full-stack platform for retinal disease screening with an integrated AI assistant and dashboards for users and admins.",
          features: [
            "Integrated the AttentioNet CNN model to generate health reports from retinal fundus images with efficient, deployment-friendly inference.",
            "Built dedicated User and Admin dashboards for tracking reports, monitoring uploads, and managing system activity.",
            "Implemented a Nearby Doctor feature using the Google Maps API to help users quickly locate ophthalmologists and clinics.",
            "Developed a real-time RAG chatbot powered by Gemini-Pro-2.5 with a FastAPI backend, delivering timestamped, source-linked responses and reminder notifications.",
            "Created a metadata-aware ingestion and scraping pipeline for PDFs and web sources with semantic chunking and Qdrant-based vector search, supporting follow-up questions, web-search fallback, and shareable chats.",
          ],
          tech: "React, Tailwind CSS, FastAPI, Qdrant, TensorFlow/PyTorch, Google Maps API, Gemini-Pro-2.5",
          link: "https://github.com/J23Mainak/EyeCare",
        },
        {
          title: "InterviewAI: Online Interview Preparation Tool",
          description:
            "A SaaS-style platform for simulated online interviews with AI-driven feedback on user responses.",
          features: [
            "Built a responsive web application using Next.js and TypeScript to deliver smooth interview flows across devices.",
            "Integrated the Google Gemini API to generate personalized interview questions and real-time evaluation of responses.",
            "Implemented secure user authentication and account management with Clerk, improving user engagement and retention.",
            "Designed real-time response analysis and feedback to help users identify strengths, weaknesses, and areas for improvement.",
          ],
          tech: "Next.js, TypeScript, Clerk, Google Gemini API, React Query, Tailwind CSS",
          link: "https://github.com/J23Mainak/InterviewAI",
        },
      ].map((project, index) => (
        <div
          key={index}
          className="border border-gray-700 rounded-md p-3 hover:bg-gray-800/50 transition-colors"
        >
          <div className="flex justify-between items-start">
            <h3 className="text-terminal-cyan font-bold">{project.title}</h3>
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-terminal-green hover:text-terminal-yellow flex items-center gap-1"
            >
              <ExternalLink size={16} />
              <span>View</span>
            </a>
          </div>
          <p className="mt-1 text-sm text-terminal-foreground">
            {project.description}
          </p>
          <ul className="mt-2 space-y-1 list-disc list-inside text-sm">
            {project.features.map((feature, idx) => (
              <li key={idx} className="text-terminal-foreground">
                {feature}
              </li>
            ))}
          </ul>
          <p className="mt-2 text-xs text-terminal-pink">{project.tech}</p>
        </div>
      ))}
    </div>
  </div>
);

// Skills command output
export const SkillsOutput = (): JSX.Element => (
  <div className="space-y-3">
    <div className="flex items-center gap-2 text-xl font-bold text-terminal-purple">
      <Code size={20} />
      <h2>Skills</h2>
    </div>
    <Separator className="bg-gray-700" />

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <h3 className="text-terminal-pink font-bold">Languages</h3>
        <ul className="list-disc list-inside space-y-1 pl-2">
          <li>C</li>
          <li>C++</li>
          <li>Python</li>
          <li>Java</li>
          <li>Bash</li>
          <li>JavaScript / TypeScript</li>
        </ul>
      </div>

      <div className="space-y-2">
        <h3 className="text-terminal-pink font-bold">Frameworks & Libraries</h3>
        <ul className="list-disc list-inside space-y-1 pl-2">
          <li>ReactJS & Next.js</li>
          <li>Tailwind CSS</li>
          <li>Node.js & ExpressJS</li>
          <li>Redux</li>
          <li>TensorFlow & PyTorch</li>
          <li>FastAPI</li>
          <li>LangChain & LangGraph</li>
        </ul>
      </div>

      <div className="space-y-2">
        <h3 className="text-terminal-pink font-bold">Tools & Platforms</h3>
        <ul className="list-disc list-inside space-y-1 pl-2">
          <li>Git & GitHub</li>
          <li>Qdrant DB</li>
          <li>Google Gemini API</li>
          <li>Clerk (Auth)</li>
          <li>Linux & Bash tooling</li>
        </ul>
      </div>

      <div className="space-y-2">
        <h3 className="text-terminal-pink font-bold">Databases</h3>
        <ul className="list-disc list-inside space-y-1 pl-2">
          <li>MongoDB</li>
          <li>MySQL</li>
          <li>Qdrant (Vector DB)</li>
        </ul>
      </div>
    </div>
  </div>
);

// Achievements command output
export const AchievementsOutput = (): JSX.Element => (
  <div className="space-y-3">
    <div className="flex items-center gap-2 text-xl font-bold text-terminal-purple">
      <Award size={20} />
      <h2>Achievements</h2>
    </div>
    <Separator className="bg-gray-700" />

    <div className="space-y-3">
      <div className="border border-gray-700 rounded-md p-3 hover:bg-gray-800/50 transition-colors">
        <p className="text-terminal-cyan font-bold">Scholastic Excellence</p>
        <p className="text-sm mt-1">
          Recognized as a top performer in the 1st year across all branches,
          leading to a branch change to Computer Science and Engineering, while
          maintaining a CGPA of 9.12.
        </p>
        <a
          href="#"
          target="_blank"
          rel="noopener noreferrer"
          className="text-terminal-green hover:text-terminal-yellow flex items-center gap-1 mt-2 text-sm"
        >
          <ExternalLink size={14} />
          <span>View Transcript</span>
        </a>
      </div>

      <div className="border border-gray-700 rounded-md p-3 hover:bg-gray-800/50 transition-colors">
        <p className="text-terminal-cyan font-bold">
          National-level ML & Tech Competitions
        </p>
        <p className="text-sm mt-1">
          Secured a Top 100 position nationally in the Amazon ML Challenge 2025
          and was selected as a finalist in the prestigious IET Scholarship
          Hackathon among 75,000+ participants. Also achieved a semi-finalist
          position in Flipkart GRID 7.0 among 200,000+ participants across
          India.
        </p>
      </div>

      <div className="border border-gray-700 rounded-md p-3 hover:bg-gray-800/50 transition-colors">
        <p className="text-terminal-cyan font-bold">
          Competitive Programming & Leadership
        </p>
        <p className="text-sm mt-1">
          Actively engage in competitive programming with a CodeChef rating of
          2137 and a Codeforces rating of 1759 (Expert). Serve as Team Lead at
          the e-Yantra (IIT Bombay) club and participate in multiple robotics
          competitions, while also competing in online typing contests with an
          average speed of 90 WPM.
        </p>
        <a
          href="https://www.codechef.com/users/bright_glee_22"
          target="_blank"
          rel="noopener noreferrer"
          className="text-terminal-green hover:text-terminal-yellow flex items-center gap-1 mt-2 text-sm"
        >
          <ExternalLink size={14} />
          <span>View Activities</span>
        </a>
      </div>

      <div className="border border-gray-700 rounded-md p-3 hover:bg-gray-800/50 transition-colors">
        <p className="text-terminal-cyan font-bold">Education</p>
        <p className="text-sm mt-1">Birla Institute of Technology, Mesra</p>
        <p className="text-sm text-terminal-yellow">
          Bachelor of Technology in Computer Science and Engineering
          (Departmental rank- 3)
        </p>
        <p className="text-sm text-terminal-pink">2022 - 2026</p>
      </div>
    </div>
  </div>
);

// Contact command output
export const ContactOutput = (): JSX.Element => (
  <div className="space-y-3">
    <div className="flex items-center gap-2 text-xl font-bold text-terminal-purple">
      <Mail size={20} />
      <h2>Contact</h2>
    </div>
    <Separator className="bg-gray-700" />

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <a
        href="mailto:mainak006jana004@gmail.com"
        className="flex items-center gap-2 text-terminal-cyan hover:text-terminal-yellow transition-colors"
      >
        <Mail size={18} />
        <span>mainak006jana004@gmail.com</span>
      </a>

      <a
        href="https://github.com/J23Mainak"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 text-terminal-cyan hover:text-terminal-yellow transition-colors"
      >
        <Github size={18} />
        <span>github.com</span>
      </a>

      <a
        href="https://www.linkedin.com/in/mainak-jana49"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 text-terminal-cyan hover:text-terminal-yellow transition-colors"
      >
        <Linkedin size={18} />
        <span>linkedin.com</span>
      </a>

      <a
        href="tel:+919876543210"
        className="flex items-center gap-2 text-terminal-cyan hover:text-terminal-yellow transition-colors"
      >
        <Phone size={18} />
        <span>+91 98765 43210</span>
      </a>
    </div>
  </div>
);

// Help command output
export const HelpOutput = ({
  commands,
}: {
  commands: Record<string, Command>;
}) => {
  return (
    <div className="text-terminal-green">
      <p>Available commands:</p>
      <div className="mt-2 space-y-1">
        {Object.values(commands).map((cmd) => (
          <div key={cmd.name} className="flex items-start space-x-4">
            <span className="text-terminal-pink font-mono">{cmd.name}</span>
            <span className="text-terminal-green">- {cmd.description}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Welcome message
export const WelcomeOutput = () => {
  return (
    <div className="space-y-2">
      <div className="typing-animation matrix-text">
        <span className="matrix-glow">Welcome to The Matrix</span>
      </div>
      <p className="matrix-text mt-4">
        I am <span className="matrix-glow">Morpheus</span>, and I welcome you to
        the digital realm.
      </p>
      <p className="matrix-text">
        I am here to tell you about{" "}
        <span className="matrix-glow">Mainak Jana</span>, a Computer Science and
        Engineering student with a strong focus on AI/ML, full-stack
        development, and competitive programming at Birla Institute of
        Technology, Mesra.
      </p>
      <div className="mt-4 space-y-1">
        <p className="matrix-text">Available commands:</p>
        <p className="matrix-text">
          • Type <span className="matrix-glow">'help'</span> to see all commands
        </p>
        <p className="matrix-text">
          • Type <span className="matrix-glow">'about'</span> to learn about
          Mainak
        </p>
        <p className="matrix-text">
          • Type <span className="matrix-glow">'askAI'</span> followed by your
          question to interact with me
        </p>
      </div>
      <p className="matrix-text mt-4">
        <span className="matrix-glow">[System Ready]</span> What would you like
        to know?
      </p>
    </div>
  );
};

// Hint output for when terminal is cleared
export const HintOutput = (): JSX.Element => (
  <div className="text-terminal-yellow">
    <span className="flex items-center gap-1">
      <HelpCircle size={14} />
      <span>
        Hint: Type <span className="text-terminal-green font-bold">help</span>{" "}
        to see available commands.
      </span>
    </span>
  </div>
);

// Sudo command output
export const SudoOutput = (): JSX.Element => (
  <div className="text-terminal-pink font-bold">
    Nice try! But this terminal doesn't grant admin privileges 😉
  </div>
);

// Command not found output
export const CommandNotFoundOutput = (command: string): string =>
  `Command not found: ${command}. Type 'help' to see available commands.`;
