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
- **Admin Dashboard**: Provides interfaces for school sign-up, profile registration, need posting, and managing schools and needs. Includes visual analytics.
- **PWA Capabilities**: Designed as a Progressive Web App for offline access and installability, including an offline banner and fallback pages.
- **Interactive Educational Content**:
    - **3D Solar System**: Uses `@react-three/fiber` for an interactive 3D solar system with bilingual facts. Includes WebGL detection and lazy loading.
    - **Mathematics: The Language of Logic**: Interactive mental math trainer, balance scale for algebra, interactive right triangle for trigonometry, and derivative/integral visualizations for calculus.
    - **Fossil Fuels: Ancient Energy** (`/fossil-fuels`): bilingual industrial-themed module under the Science → Geology & Earth Science group of the navbar. Dark stone-900 background with amber crude-oil highlights and blue flames. Four sections: (1) **Formation & scarcity** — 4-stage SVG burial animation (living sea → buried under sediment → cooked into oil/gas → drilled), Play/Pause/Reset, plus a live ticking **global reserve countdown** to Jan 1 2073 (years/days/hours/min/sec). Numbers are educationally accurate: 100 M barrels/day = ~660 M L/hour (1 barrel = 159 L), and the consumption-vs-formation comparison uses the widely-cited Dukes 2003 figure ("1 year of burning ≈ 1,000,000 years of natural formation"). (2) **Fractional distillation** — vertical SVG tower with crude-oil inlet, blue propane-flame furnace, and 6 fractions tapped off at increasing height/temperature with bilingual carbon-range + temperature labels: Refinery gases (C₁–C₄, ~25°C), Gasoline (C₅–C₁₀), Kerosene/Jet fuel, Diesel, Lubricating oil, Bitumen (C₃₀⁺, ~400°C). (3) **4-stroke engine** — interactive cylinder SVG with valves, spark plug, piston, connecting rod, and crankshaft that rotates 90° per stroke. Auto-cycles Intake → Compression → Power → Exhaust at user-controlled RPM (10–120 strokes/min slider); each stroke pill is also clickable. Includes the simplified octane combustion equation (`2 C₈H₁₈ + 25 O₂ → 16 CO₂ + 18 H₂O + energy`) and a CO₂/climate-change closing note. (4) **Price breakdown** — stacked horizontal bar + 4 cards summing to 100%: Crude oil (55%, OPEC+ supply/demand), Refining (18%), Shipping & distribution (12%, Cambodia imports nearly all refined fuel via Sihanoukville), Taxes & station markup (15%). All technical terms bilingual EN/Khmer. All animations wrapped in `prefers-reduced-motion: reduce`. SVG charts have `role="img"` + bilingual `<title>/<desc>`. **JSX-attribute trap reminder**: Khmer strings containing curly quotes that originally used `\"` were switched to `{"…"}` expressions to avoid literal-backslash rendering.
    - **The Art of Learning** (`/art-of-learning`): bilingual "Special Lesson" under Study Center → Exam Prep area. Calm sage/cream aesthetic. Four sections: (1) **Learning styles** — Visual/Auditory/Kinesthetic info cards with tinted "Try" tip chips; (2) **How to learn** — Active Recall toggle (re-read 12% rose vs self-test 80% emerald retention bar, Karpicke & Roediger 2008 footnote), **Spaced Repetition** with an SVG forgetting-curve chart (rose decay r(t)=100·e^(−t/1.5) always shown; toggle reveals four piecewise emerald segments 0→1, 1→3, 3→7, 7→14 with S=1.5/3/6/12 and circular ↻ markers — segments are properly piecewise so they don't overlap; chart has bilingual `<title>/<desc>` for screen readers), and the **Feynman 4-step technique**; (3) **Neurodiversity** — Dyslexia (ពិបាកអាន, violet) / ADHD (បញ្ហាការផ្ដោតអារម្មណ៍, amber) / Dyscalculia (ពិបាកលេខ, sky), each with a "what it might feel like" CSS-animated mini-demo (jumping/mirrored/blurred letters wrapped in `prefers-reduced-motion: reduce`), common-signs list, and an emerald "strength chip" naming the often-paired strength. ADHD card has an extra interactive focus-meter (20% mind-wanders ↔ 100% hyperfocus). Followed by the reassuring banner: "**This doesn't mean you aren't smart** — it just means your brain needs a different strategy." (4) **Civilization timeline** — vertical 6-step timeline with a decorative gradient line as a `<ol>` sibling so list semantics stay clean (only `<li>` children): hunter-gatherers → writing → schools → industrial → internet → space/AI; followed by the **Great Equalizer** card with three promise chips. Closing Benjamin Franklin quote.
    - **Music Theory & The Art of Sound**: Features an instrument gallery, functional harmony, chord builder, voice leading, polyrhythm generator, metric modulation, and profiles of great masters. Uses Web Audio API.
    - **Aviation: How We Fly**: Covers Bernoulli's Principle, Wright Brothers history, the four forces of flight, and global aviation facts.
    - **The Science of Magnets**: Explores three types of magnetism, an atomic spin simulator, and a magnetic field visualizer.
    - **Global Cities & Landmarks**: Features top populated metro areas, an iconic landmarks carousel, and city statistics.
    - **Sexual Health & Pathogen Protection**: Privacy-first content with pathogen profiles, truth vs. myth debunking, and care path guidance. Includes a quick exit button.
    - **HVAC: Managing Our Environment**: Explains the refrigeration cycle, how heaters work (resistive vs. heat pump), and the science of ventilation.
    - **The Quantum Limit: Max Planck's Discovery**: Simulators for Planck's constant (energy packets), Planck length (smallest pixel), and Planck time (quickest moment).
    - **Weather & Atmospheric Science**: Interactive tools for the greenhouse effect, wind/pressure/weather fronts, storm lab (lightning, thunder, sprites), and extreme weather.
    - **Cameras & Cinematography: The Science of Light**: Simulators for lens physics, the exposure triangle game, and the art of framing.
    - **Oceanography: The Blue Frontier**: Explores vertical ocean zones, the ocean conveyor belt, marine biology/chemistry, and Cambodian coastal ecosystems.
    - **Solar Power: Harvesting the Sun**: PV-cell animation, solar home interactive, and CO₂ comparison chart.
    - **The Sun: Our Local Star**: Cross-section anatomy, life cycle timeline, solar yardstick, and tilt/seasons simulator.
    - **World History Timeline**: Interactive, bilingual timeline with artifact zoom nodes and a 3D History Globe.
    - **IoT & 5G Module**: Smart Farm Simulator, 5G Reflex Test, and common IoT device explanations.
    - **Cybersecurity Shield**: Spot the Scam Simulator, Password Strength Forge, and Digital Footprint Visualizer.

### Technical Implementations
- **Authentication**: Cookie-based sessions using `express-session`, `bcryptjs` for password hashing, and custom `AuthContext`. Includes a secure "Forgot Password" flow.
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