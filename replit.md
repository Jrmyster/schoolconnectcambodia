# Chouy Sala (ជួយសាលា / Help School)

## Overview
Chouy Sala is a full-stack web application designed to connect rural Cambodian high schools with potential donors and NGOs. Its primary purpose is to facilitate funding and resource acquisition for schools in need, promoting transparency and community involvement. The platform aims to bridge the resource gap for Cambodian schools, enabling better educational opportunities and fostering sustainable development in rural areas.

## User Preferences
The user prefers clear and concise communication. They value detailed explanations for complex features and architectural decisions. The user is open to iterative development but wishes to be consulted before any major changes are implemented. They prefer that the AI prioritizes performance optimizations, especially for mobile and low-bandwidth environments, and ensures robust error handling and graceful fallbacks. The user wants the AI to strictly adhere to the defined architectural patterns and technology stack.

## System Architecture
The application is a pnpm monorepo using TypeScript, built on Node.js 24.

### UI/UX Decisions
- **Language Support**: Supports English and Khmer.
- **Interactive Map**: Displays school needs by province.
- **School Profiles**: Detailed profiles with bilingual information.
- **Admin Dashboard**: Comprehensive interface for managing schools, needs, and users, including analytics.
- **PWA Capabilities**: Designed for offline access and installability.
- **Interactive Educational Content**: A wide range of modules (e.g., 3D Solar System, Mathematics, World History, Chemistry tools, Habitat Sorter, Math Magic) with interactive elements, simulations, and bilingual content focusing on accessibility.
- **Global Atlas / World Directory**: Offline-first bilingual reference of 50 countries with search, filters, and accessible modals.
- **World Timeline / History & Progress**: Offline-first vertical timeline of historical milestones with filtering and interactive features.

### Technical Implementations
- **Authentication**: Cookie-based sessions with password hashing, secure "Forgot Password" flow, and admin authorization.
- **Mobile Menu Accessibility**: Implements ARIA attributes and keyboard navigation.
- **Performance**: Uses `React.lazy()` for code splitting and dynamic imports for heavy modules.
- **Accessibility**: Ensures pinch-to-zoom is enabled and dark-mode contrast meets WCAG AA standards.
- **SEO**: `robots.txt` configured to control search engine indexing.
- **Global Search**: Powered by `fuse.js` for fuzzy, typo-tolerant, Unicode-safe searching across English and Khmer content, with auto-discovery of search metadata.
- **Photo Upload**: Supports camera capture and file uploads.
- **API Routes**: Standard RESTful endpoints.
- **Database**: PostgreSQL with Drizzle ORM.
- **Validation**: Zod for schema validation.
- **API Codegen**: Orval generates React Query hooks and Zod schemas from an OpenAPI spec.

### System Design Choices
- **Monorepo Structure**: Organized into `artifacts`, `lib`, and `scripts`.
- **TypeScript Configuration**: Uses composite projects and project references.
- **Build System**: `esbuild` for production, `tsc` for type checking.
- **State Management**: `Zustand` for language toggling.
- **Error Handling**: Specific error boundaries and detection for 3D rendering.

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
- **Search**: `fuse.js`