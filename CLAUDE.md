# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run lint` - Run ESLint linting
- `npm run preview` - Preview production build locally

## Architecture

This is a React TypeScript portfolio website built with Vite and styled with Tailwind CSS.

### Key Technologies
- **React 18** with TypeScript for component development
- **Vite** as build tool and dev server
- **Tailwind CSS** for styling with dark theme (gray-900/800 palette)
- **Lucide React** for icons
- **ESLint** with TypeScript rules for code quality

### Project Structure
- `src/App.tsx` - Main portfolio component with hero, projects, skills, and contact sections
- `src/components/ProjectCard.tsx` - Reusable card component for displaying projects
- `src/components/SkillBadge.tsx` - Skill level display component with color coding (green=Advanced, blue=Intermediate, yellow=Beginner)

### Component Patterns
- All components use TypeScript interfaces for props
- Functional components with React.FC typing
- Tailwind classes for styling with hover effects and transitions
- External links use `target="_blank"` with `rel="noopener noreferrer"`

### Styling Conventions
- Dark theme using gray-900/800/700 backgrounds with blue-400 accents
- Responsive design with mobile-first approach (md:, lg: breakpoints)
- Consistent spacing using Tailwind's spacing scale
- Card components use `rounded-xl` with `shadow-lg` and hover effects