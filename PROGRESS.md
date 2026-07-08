# Project Progress

## 2026-07-08
- Replaced the third-party ProKerala API dependency with a local computation engine for Panchang, Hora, and Chaughadiya calculations.
- Integrated `astronomy-engine` (MIT License) for sub-arcsecond accuracy astronomical calculations (Sun/Moon positions, Sunrise/Sunset).
- Implemented exact Vedic astrology rules including Chitrapaksha (Lahiri) Ayanamsa using IAU 2006 precession polynomial to prevent long-term drift.
- Created `tithi`, `nakshatra`, `yoga`, `karana`, `timings`, `hora`, and `chaughadiya` modules to calculate all elements natively.
- Added binary search routines to determine exact transition timings for Tithis, Nakshatras, Yogas, and Karanas.
- Added feature flag `PANCHANG_SOURCE=local` in the API routes (`/api/panchang` and `/api/hora`) to enable gradual rollout and allow side-by-side comparison with the existing ProKerala endpoint.
- Updated the prefetch cron job (`/api/cron/prefetch`) to directly compute and cache local data to MongoDB (collections `panchang_local` and `hora_local`), removing the overhead of internal HTTP calls.
- Validated the logic with unit tests and created a manual `compare-prokerala.ts` script for exact field-by-field verification.
- **Bugfix**: Resolved an issue where selecting a date from the frontend calendar would crash because `astronomy-engine` was mistakenly anchoring searches to the previous day's UTC midnight, returning a sunset earlier than sunrise. Corrected to anchor searches strictly from local timezone midnight.
- **Content Update**: Added the prenominal title "Acharya" to all mentions of "Soumitra Roy Chowdhury" throughout the entire codebase, ensuring consistency across all pages, components, and data files.
