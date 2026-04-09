import loginPage from '../assets/loginpage.webp';
import aihrPage from '../assets/aihrpage.webp';
import dashboardPage from '../assets/dashboardpage.webp';
import coursePage from '../assets/coursepage.webp';
import quizzesPage from '../assets/quizzespage.webp';
import reportsPage from '../assets/reportspage.webp';

export const blogData = [
  {
    id: 1,
    type: 'Case Study',
    title: 'Designing AI Powered Next-Gen LMS App',
    date: 'December 15, 2025',
    description: 'A modern learning management system that uses AI to personalize content based on user pace, knowledge level, and learning behavior.',
    tags: ['UI/UX', 'Figma', 'EdTech', 'AI'],
    modalDetails: {
      dateRange: 'December 15, 2025',
      role: 'UI Team Lead',
      duration: '8-10 weeks',
      intro: 'The goal was to design a next-generation Learning Management System (LMS) that moves beyond static content delivery and introduces AI-driven personalization based on user pace, knowledge level, and learning behavior.\n\nExisting LMS platforms are largely generic, offering the same structure and content to all users, regardless of individual differences. This creates inefficiencies in learning and reduces engagement.',
      tools: ['Figma', 'FigJam', 'React', 'Antigravity'],
      sections: [
        {
          title: 'Problem',
          content: 'Most LMS platforms follow a one-size-fits-all model:\n\n• Same course structure for all users\n• No adaptation to individual learning pace\n• Minimal use of AI for personalization\n• Lack of unified platforms for both students and corporate learners\n\nThis results in users either feeling overwhelmed or under-challenged, leading to poor learning outcomes.'
        },
        {
          title: 'Research',
          content: '• Conducted internal discussions and exploratory research on existing LMS platforms\n• Analyzed user behavior patterns and common usability gaps\n• Identified key issues:\n  - Lack of personalization\n  - Cluttered dashboards\n  - Inefficient progress tracking\n\nDefined primary user groups:\n• Students / Learners\n• Instructors\n• Admins\n• Corporate Employees (for enterprise use cases)'
        },
        {
          title: 'Design Process',
          content: 'Started with brainstorming layout ideas and feature structure.\nCreated initial paper sketches and translated them into FigJam flows.\n\nDefined:\n• Layout structure\n• Component patterns\n• Typography and color system\n\nFocused on building a consistent and scalable UI system with reusable components.'
        },
        {
          title: 'Solution',
          content: 'Designed an AI-powered LMS that:\n• Personalizes learning paths based on user performance\n• Generates a dynamic dashboard tailored to each user\n\nIntegrates:\n• Progress tracking\n• Assignments, quizzes, and projects\n• AI tutor for doubt resolution\n• AI-based evaluation and certification\n\nCreated a structured user flow:\nSignup → Course Selection → AI Evaluation → Personalized Dashboard → Learning → Assessment → Certification → Continuous Learning'
        },
        {
          title: 'Development',
          content: '• Converted Figma designs into a React-based frontend\n• Used Antigravity to accelerate UI generation\n• Built features incrementally to maintain design accuracy'
        },
        {
          title: 'Challenges',
          content: '• Understanding Antigravity’s prompt-based workflow\n• Writing precise prompts for accurate UI output\n• Maintaining consistency between design and generated code'
        },
        {
          title: 'Learnings',
          content: '• Designing a complete product from scratch in Figma\n• Building scalable UI systems\n• Improving prompt engineering for AI-assisted development\n• Bridging design and frontend implementation'
        },
        {
          title: 'Outcome',
          content: '• Fully designed LMS platform with end-to-end user flow\n• Functional frontend built in React\n• A scalable concept for AI-driven personalized learning',
          images: [loginPage, aihrPage, dashboardPage, coursePage, quizzesPage, reportsPage]
        }
      ]
    }
  }
];
