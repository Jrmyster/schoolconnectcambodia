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
- **School Profiles**: Features photo banners, bilingual names, and badges for province, district, and student count.
- **Admin Dashboard**: Provides interfaces for school sign-up, profile registration, need posting, and managing schools and needs. Includes visual analytics (pie/bar charts).
- **PWA Capabilities**: Designed as a Progressive Web App for offline access and installability, crucial for areas with unreliable internet. Includes an offline banner and fallback pages.
- **Interactive Educational Content**:
    - **3D Solar System**: Uses `@react-three/fiber` for an interactive 3D solar system with planets, orbits, and click-activated bilingual facts. Includes WebGL detection and lazy loading for performance.
    - **The Sun: Our Local Star** (`/space`, `src/components/space/TheSunModule.tsx`): four-tool deep dive on our nearest star — clickable cross-section anatomy (Core / Radiative / Convective / Photosphere + Sunspots and Solar Flares with bilingual temperature/effect callouts), a horizontal Life Cycle timeline (Birth at 4.6 Bya → middle-aged Yellow Dwarf → Red Giant in ~5 Bya → White Dwarf), the Solar Yardstick distance scale (Mercury/Venus/Earth/Mars in millions of km with light-travel time, plus the basketball-and-grain-of-sand analogy), and a 23.5° Tilt & Seasons orbit simulator with autoplay and a Cambodia-context callout explaining why our location near the equator gives us monsoon-driven Wet/Dry seasons instead of four solar seasons.
    - **World History Timeline**: An interactive, bilingual timeline with clickable "artifact" zoom nodes that reveal historical insights. Features sticky cross-fading background gradients and a "Time Machine" quick-jump UI. Includes an embedded 3D History Globe with a time slider and region pins.
    - **IoT & 5G Module**: Features a Smart Farm Simulator demonstrating sensor logic, a 5G Reflex Test mini-game showcasing latency differences, and cards for everyday IoT devices.
    - **Cybersecurity Shield** (`/safety`, `src/components/safety/CybersecurityShield.tsx`): three security-themed interactive tools — a Spot the Scam Simulator (iPhone-style Messenger mockup with 5 clickable red flags hidden in a fake "Facebook-Security-Team" phishing message → "Scam Blocked!" badge when all are found), a live Password Strength Forge (4-segment meter Weak→Unbreakable, real-time checklist for length/number/symbol/no-name, side-by-side `Password123` vs `BlueCowEatsRice!` passphrase explainer), and a Digital Footprint Visualizer (SVG diagram with central photo + 5 destination nodes — friends' phones, search engines, screenshots, data brokers, cloud servers — animated with `offset-path` packets and a "Once it is on the internet, you can never truly delete it" warning). Dark slate theme with neon emerald (safe) and red (danger) accents; timer ref cleanup on unmount.

### Technical Implementations
- **Authentication**: Cookie-based sessions using `express-session`, `bcryptjs` for password hashing, and a custom `AuthContext` for state management. Includes a secure "Forgot Password" flow with UUID tokens.
- **Photo Upload**: Supports both camera capture and file uploads.
- **API Routes**: Standard RESTful endpoints for schools, needs, authentication, and password management.
- **Database**: PostgreSQL with Drizzle ORM.
- **Validation**: Zod for schema validation across API requests and responses.
- **API Codegen**: Orval generates React Query hooks and Zod schemas from an OpenAPI spec.

### System Design Choices
- **Monorepo Structure**: Organized into `artifacts` (deployable apps), `lib` (shared libraries), and `scripts`.
- **TypeScript Configuration**: Uses composite projects with `tsconfig.base.json` for shared settings and project references for efficient type checking across packages.
- **Build System**: `esbuild` for production bundles, `tsc` for type checking.
- **State Management**: `Zustand` for language toggling.
- **Error Handling**: `WebGLErrorBoundary` and `detectWebGL()` for robust handling of 3D rendering environments.

## External Dependencies
- **Mapping**: Leaflet
- **Authentication**: `bcryptjs`, `express-session`
- **Database**: PostgreSQL, Drizzle ORM, Drizzle Kit
- **Validation**: Zod, `drizzle-zod`
- **API Definition & Generation**: OpenAPI, Orval
- **Frontend Frameworks**: React, React Query
- **3D Graphics**: `@react-three/fiber`, `@react-three/drei`, `three`
- **UI Components**: Radix Dialog
- **Animation**: `framer-motion` (for `useReducedMotion`)
- **Utility Libraries**: `pnpm` (package manager)