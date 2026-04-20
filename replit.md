# Chouy Sala (ជួយសាលា / Help School)

## Overview
Chouy Sala is a full-stack web application designed to connect rural Cambodian high schools with potential donors and NGOs. Its primary purpose is to facilitate funding and resource acquisition for schools in need, promoting transparency and community involvement. The platform aims to bridge the resource gap for Cambodian schools, enabling better educational opportunities and fostering sustainable development in rural areas.

## User Preferences
The user prefers clear and concise communication. They value detailed explanations for complex features and architectural decisions. The user is open to iterative development but wishes to be consulted before any major changes are implemented. They prefer that the AI prioritizes performance optimizations, especially for mobile and low-bandwidth environments, and ensures robust error handling and graceful fallbacks. The user wants the AI to strictly adhere to the defined architectural patterns and technology stack.

## System Architecture
The application is a pnpm monorepo using TypeScript, built on Node.js 24.

### UI/UX Decisions
- **Language Toggle**: Supports English and Khmer.
- **Interactive Map**: Utilizes Leaflet for displaying school needs by province.
- **School Profiles**: Features photo banners, bilingual names, and badges for location and student count.
- **Admin Dashboard**: Provides interfaces for school sign-up, profile registration, need posting, and managing schools and needs, including visual analytics.
- **PWA Capabilities**: Designed as a Progressive Web App for offline access and installability.
- **Interactive Educational Content**: A wide range of modules covering subjects like a 3D Solar System, Mathematics (mental math, algebra, trigonometry, calculus), Fossil Fuels (formation, distillation, 4-stroke engine, price breakdown), The Art of Learning (styles, active recall, spaced repetition, Feynman technique, neurodiversity, civilization timeline), Physics of the Bicycle (balance, forces, balance lab simulation), Robotics (Sense → Think → Act loop, Build-a-Bot, build guide), Video Games (game loop, CPU vs GPU, rendering pipeline), The Spelling Forge (offline ~700-word dictionary spell-checker with Levenshtein "Did you mean?" suggestions + homophone fill-in-the-blank mini-game on a notepad-style cream/blue-rule background), Music Theory, Aviation, Magnets, Global Cities, Sexual Health, HVAC, Quantum Physics, Weather, Cameras & Cinematography, Oceanography, Solar Power, The Sun, World History, IoT & 5G, and Cybersecurity. These modules incorporate interactive elements, simulations, and bilingual content with accessibility features.

### Technical Implementations
- **Authentication**: Cookie-based sessions with `express-session`, `bcryptjs` for password hashing, and custom `AuthContext`. Includes a secure "Forgot Password" flow.
- **Photo Upload**: Supports both camera capture and file uploads.
- **API Routes**: Standard RESTful endpoints for schools, needs, authentication, and password management.
- **Database**: PostgreSQL with Drizzle ORM.
- **Validation**: Zod for schema validation.
- **API Codegen**: Orval generates React Query hooks and Zod schemas from an OpenAPI spec.

### System Design Choices
- **Monorepo Structure**: Organized into `artifacts`, `lib`, and `scripts`.
- **TypeScript Configuration**: Uses composite projects with `tsconfig.base.json` and project references.
- **Build System**: `esbuild` for production bundles, `tsc` for type checking.
- **State Management**: `Zustand` for language toggling.
- **Error Handling**: `WebGLErrorBoundary` and `detectWebGL()` for 3D rendering.

## External Dependencies
- **Mapping**: Leaflet
- **Authentication**: `bcryptjs`, `express-session`
- **Database**: PostgreSQL, Drizzle ORM, Drizzle Kit
- **Validation**: Zod, `drizzle-zod`
- **API Definition & Generation**: OpenAPI, Orval
- **Frontend Frameworks**: React, React Query
- **3D Graphics**: `@react-three/fiber`, `@react-three/drei`, `three`
- **UI Components**: Radix Dialog
- **Animation**: `framer-motion`
- **Utility Libraries**: `pnpm`