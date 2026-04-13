# Aushadham Web

Aushadham Web is a Next.js healthcare application with dedicated workflows for doctors and patients.
It includes doctor operations (appointments, case sheets, communication, profile/settings) and a patient dashboard (appointments, reports, medications, payments).

## Doctor Role

Doctors can:

- Complete onboarding and profile setup.
- Access a doctor dashboard with patient and booking insights.
- Manage appointments and open detailed patient views.
- Maintain patient case sheets with:
  - Present illness
  - Diagnosis
  - Symptoms
  - Medication plan
  - Lab tests
  - Notes
  - Personalized plan recommendation toggle
- View patient medications and lab reports.
- Use in-app communication flows (messages/chat screens).
- Access calendar, notifications, profile, and settings pages.
- Share patient invite links.

## Patient Role

Patients can:

- Complete phone verification and profile setup.
- Complete health profile setup.
- Use the patient dashboard to:
  - View upcoming appointments
  - Cancel appointments
  - Reschedule appointments using available slots
  - Start new appointments
- Make payments using available methods in the UI flow.
- View health profile summary, latest reports, and medication schedule.

## Key Features

- Multi-role UX: doctor-side and patient-side dashboards.
- Case-sheet workflow for clinical documentation.
- Appointment lifecycle support: view, cancel, reschedule.
- Mocked API/data layer for frontend-first development.
- Modern component architecture with reusable UI primitives.

## Tech Stack

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS 4
- Radix UI primitives
- Lucide React icons

## Project Structure

- app/(app): Doctor-facing authenticated routes (dashboard, appointments, profile, settings, etc.)
- app/patient-dashboard: Patient dashboard flow
- app/patient-profile-setup and app/patient-verification: Patient onboarding flow
- components: Reusable UI and feature components
- lib: Utilities and mock API/data helpers

## Getting Started

### Prerequisites

- Node.js 18.18+ (Node 20+ recommended)
- npm

### Run Locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Available Scripts

```bash
npm run dev    # start development server
npm run build  # production build
npm run start  # run production server
npm run lint   # run lint checks
```

## API and Backend Status

This repository currently includes frontend-focused implementations and mock data integrations.
The OpenAPI route indicates auth endpoints are not yet wired in this frontend-only build, and custom endpoints are added as modules are implemented.

## Contributing

1. Create a feature branch.
2. Make focused, scoped changes.
3. Open a PR with a clear description of UI, behavior, and dependency updates.
