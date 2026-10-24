# PROJECT HISTORY — SSGI-Project (IWCYES & IWSS)

> **Purpose**: This document captures the complete history of the SSGI-Project from inception through the current state, serving as institutional memory for future contributors, partner research institutes, and the Ethiopian Ministry of Agriculture. It is updated whenever a significant milestone is reached.

**Last Updated**: September 2026
**Current Version**: v0.1.0 — Dashboard Prototype
**Repository**: https://github.com/DivergenTechnology/SSGI-Project
**Active Branch**: `main`

---

## Table of Contents

1. [Project Genesis](#1-project-genesis)
2. [Objectives and Scope](#2-objectives-and-scope)
3. [Pilot Study Areas](#3-pilot-study-areas)
4. [Technical Architecture](#4-technical-architecture)
5. [Implementation Plan Document](#5-implementation-plan-document)
6. [Feasibility Analysis](#6-feasibility-analysis)
7. [Dashboard Prototype — v0.1.0](#7-dashboard-prototype--v010)
8. [Technology Stack](#8-technology-stack)
9. [Mock Data Layer](#9-mock-data-layer)
10. [Repository State](#10-repository-state)
11. [Open Items and Pending Integrations](#11-open-items-and-pending-integrations)
12. [Security and Operational Notes](#12-security-and-operational-notes)
13. [Change Log](#13-change-log)

---

## 1. Project Genesis

The SSGI-Project was conceived in response to Ethiopia's strategic commitment to modernize its agricultural sector through remote sensing, IoT, and artificial intelligence. The original project background established the following context:

### National Context
- Agriculture accounts for **46% of Ethiopia's GDP**, **83% of commodity exports**, and **80% of employment**
- The country hosts the largest cattle population on the African continent
- Roughly **80% of the population lives in rural areas** and depends on farming for livelihood
- Production remains predominantly **subsistence-oriented** with low technology adoption

### Structural Challenges
- Persistent **poverty, food insecurity, water stress, and inadequate nutrition**
- **Land degradation** and **recurrent drought**
- **Low diffusion of improved technology** and digital tools
- **Shortage of skilled remote sensing professionals** and under-developed research infrastructure

### Strategic Pivot
The Government of Ethiopia prioritized the modernization and transformation of agriculture through:
- Digital agriculture
- Climate-smart practices
- Precision farming
- Managing crops, animals, and protecting land, water, plant, and animal biodiversity

The remote sensing community is uniquely positioned to deliver operational products leveraging:
- Free and open satellite imagery (Sentinel-2 at 10 m resolution every 5 days)
- Low-cost UAV platforms with multispectral sensors
- Affordable in-situ soil sensors
- Modern data science, machine learning, and artificial intelligence

### Project Entry Point: Irrigated Wheat
Irrigated wheat was selected as the strategic entry point because of:
- Its central role in Ethiopia's wheat self-sufficiency agenda
- Its responsiveness to irrigation scheduling
- Its amenability to remote sensing-based monitoring
- Its alignment with food security, poverty reduction, and climate resilience objectives

---

## 2. Objectives and Scope

### General Objective
Develop remote sensing-enabled tools, services, and a decision-support system for irrigated wheat farming systems in Ethiopia, to enhance the **efficiency, sustainability, and profitability** of wheat irrigated farming systems.

### Four Core Deliverables

1. **Comprehensive Spatial Database** of irrigated wheat farmlands of Ethiopia
2. **Irrigated Wheat Crop Yield Estimation System (IWCYES)**
3. **Information products** in the form of maps and statistics for small, medium, and large-scale irrigable irrigated wheat farmlands
4. **Irrigation Water Scheduling Service (IWSS)** — a spatially explicit tool providing easy-to-understand irrigation recommendations based on real, scientific data about soil, crop type, development stage, and automatically updated weather conditions

### Geographic Scope
Three pilot agricultural research institutes in Ethiopia's highland wheat belt.

### Thematic Scope (Exclusions)
The current phase explicitly excludes:
- National-scale rollout beyond the three pilot institutes
- Deployment on rain-fed wheat (irrigated systems only)
- Financial subsidy disbursement to farmers
- Commercialization and revenue operations
- Certification of organic or specialty wheat schemes

---

## 3. Pilot Study Areas

Three pilot agricultural research institutes were selected to capture agro-ecological diversity and leverage existing institutional capacity:

| Pilot Site | Region | Latitude | Longitude | Elevation (m) | Host Institution |
|---|---|---|---|---|---|
| **Bishoftu** (Debre Zeit) | Oromia — East Shewa | 8.7547° N | 39.0000° E | 1,860 | Debre Zeit Agricultural Research Center |
| **Asella** | Oromia — Arsi | 7.9577° N | 39.1667° E | 2,430 | Asella / Kulumsa Agricultural Research Center |
| **Ambo** | Oromia — West Shewa | 8.9847° N | 37.7833° E | 2,100 | Ambo Agricultural Research Center |

All three sites fall within **Oromia Regional State** and span an elevation range of approximately 1,800 to 2,400 meters above sea level, capturing the highland wheat belt that produces the bulk of Ethiopia's irrigated wheat.

### Spatial Reference System
- **UTM Zone 37N** on the **WGS84 datum** for cross-site data integration
- Common overlay layers: administrative boundaries, soil maps, DEM, hydrology, climate zones, irrigation infrastructure

---

## 4. Technical Architecture

The IWCYES-IWSS ecosystem follows a **four-layer architecture** designed for modularity, scalability, and cross-engine compatibility:

### Layer 1 — IoT Sensing
- NPK soil sensors (Nitrogen / Phosphorus / Potassium)
- Soil moisture and humidity probes
- UAV platforms (multispectral RGB + NIR + Red-Edge)
- ESP32-based data loggers pushing observations to Firebase

### Layer 2 — Spatial Data Infrastructure
- Field-collected shapefiles per AOI → PostGIS
- Satellite imagery (Sentinel-2, Landsat 8/9) as Cloud Optimized GeoTIFFs
- Ancillary layers: soil maps, DEM, hydrology, irrigation infrastructure
- GeoServer WMS / WFS endpoints for OGC-compliant access

### Layer 3 — AI/ML
- **Yield regression**: Dual-branch model with temporal attention (PyTorch Transformer) + tabular branch (XGBoost)
- **Disease detection**: CNN classifier (EfficientNet / U-Net) on UAV multispectral imagery
- **Attention attribution**: Interpretable heatmaps bridging black-box AI and decision-maker trust

### Layer 4 — Application & Dashboard
- Next.js 16 web application with map overlays (MapLibre GL)
- Real-time Firebase binding with auto-refresh
- Attention heatmaps as overlay layers
- KPI tiles for at-a-glance monitoring
- Mobile-responsive design

### Data Flow
Sensors and imagery → Spatial data layer → AI/ML layer → Dashboard, with feedback loops from end-user interactions captured for model retraining.

---

## 5. Implementation Plan Document

A comprehensive implementation plan was generated as a downloadable Word document covering the following 12 sections:

1. Project Background and Rationale
2. Project Objectives and Scope
3. Technical Approach and Methodology (with vegetation index formulas)
4. Work Package Breakdown (WP1–WP6)
5. Implementation Timeline and Milestones (12-month Gantt)
6. Team Structure and Roles
7. Technology Stack
8. Budget and Resource Requirements (USD 480K–620K)
9. Risk Analysis and Mitigation (10-risk register)
10. Monitoring, Evaluation, and Sustainability
11. Expected Outcomes and Deliverables
12. Conclusion and Next Steps

**Key parameters captured**:
- 12-month timeline divided into 4 quarterly milestones
- 6 work packages: WP1 (Management), WP2 (Spatial DB), WP3 (IWCYES), WP4 (IWSS), WP5 (UAV Disease), WP6 (Dashboard)
- 12-person team with PI, Co-PI, technical leads, 3 site coordinators, agronomist, M&E officer
- 20-row technology stack table covering IoT, cloud, spatial, ML, backend, frontend, DevOps
- 25-row itemized budget
- M&E framework with output, outcome, and impact KPIs

---

## 6. Feasibility Analysis

A critical feasibility assessment was performed against the original plan. The conclusion was **Conditional GO** — the project is fundamentally feasible, but the following adjustments were recommended:

### Strong Implementation Possibility
1. Institutional anchor is real (EIAR-affiliated research centers with existing wheat mandate)
2. Tech stack is mature (PostGIS, Firebase, Sentinel-2, PyTorch, MapLibre — all production-grade)
3. Pilot scale is manageable (3 sites, ~60 sensors, ~600 plots)
4. Free-tier + open-source approach is the correct sustainability play
5. Budget envelope (USD 480K–620K) is realistic

### Critical Limitations Identified
1. **R² ≥ 0.80 target is unrealistic for Year 1** — published studies achieve 0.55–0.75 with Sentinel-2; needs ≥2 seasons
2. **In-situ data scarcity** — 60 sensors = 20/site = ~10% coverage; ML transferability gaps
3. **Firebase free tier exceeded in ~6–9 months** — needs paid tier from Month 1
4. **UAV authorization takes 3–6 months** via ECAA, not the assumed 1–2 months
5. **CNN disease detection needs 5,000+ locally annotated images** — PlantVillage transfer is poor
6. **Attention mechanism is technical overreach for Year 1** — Random Forest baseline preferred
7. **Internet + power at Asella & Ambo is genuinely problematic** — solar+battery missing from budget
8. **Single growing season = single yield data point per plot** — insufficient for ML
9. **Counterpart pairing assumes counterpart capacity** — needs pre-project training bootcamp
10. **Budget is 10–15% under-realistic** — realistic envelope USD 580–720K

### Recommended Adjustments (10 items)
1. Extend timeline to **18 months** (cover 2 growing seasons)
2. Raise budget to **USD 600–720K**
3. Scale sensors to **100+ units** with solar+battery
4. Lower Year-1 R² target to **0.65**, raise Year-2 to 0.80
5. Budget **Firebase Blaze plan from Month 1**
6. Start with **Random Forest baseline**, defer attention to Year 2
7. Add **2-week counterpart bootcamp** before kickoff
8. Add **data governance workstream** under WP1
9. Add **Sentinel-1 SAR** as rainy-season fallback
10. Add **MLflow + monitoring** in WP3

### Decision
The project stakeholder elected to **proceed with the original plan** (without the 10 adjustments) for the dashboard prototype phase. The feasibility analysis remains on record for review during scale-up planning.

---

## 7. Dashboard Prototype — v0.1.0

A complete Next.js 16 dashboard prototype was built to demonstrate the decision-support ecosystem. All 7 sections are browser-verified and functional.

### Sections Implemented

| Section | Key Features |
|---|---|
| **Overview** | Aggregated KPIs (60 plots, 100+ sensors, avg predicted yield, water saving %); 7-day trend line chart; site comparison bar chart; 8-subsystem status grid |
| **Map View** | MapLibre GL map with plot circles colored by growth stage (6 stages); sensor markers colored by status (online/warning/offline); click-to-view plot details panel |
| **Yield Estimation** | KPI strip (predictions, model R²=0.78, confidence interval, attention features); aggregate attention attribution horizontal bar chart; yield distribution histogram; 50-row plot-level predictions table |
| **Irrigation Scheduling** | KPI strip (irrigate-now count, water saved %, forecast rain, avg soil moisture); status distribution pie chart; top-10 water-savers bar chart; urgency-sorted real-time recommendations table |
| **Disease Detection** | KPI strip (active alerts, severe cases, CNN precision, high severity count); disease distribution bar chart; severity pie chart; alerts table with detection method (UAV multispectral / CNN classifier) |
| **Sensor Feed** | KPI strip (online/warning/offline sensors, avg battery); click-to-chart sensor time-series (24 readings at 15-min intervals); full sensor inventory table |
| **Attention Heatmap** | Plot × feature attention matrix (color-coded heatmap); aggregate feature attribution bar chart; plot-comparison radar chart (top 3 plots across 8 features) |

### Component Inventory
- 7 section components (one per dashboard section)
- 1 KPI card reusable component
- 1 sidebar navigation component
- Main page orchestrator with section state and site selector state

### Design System
- **Color palette**: FG-1 Forest Mint (deep emerald `#0C1F1A` primary, mint `#2A7A65` accent, surface `#EDF5F2`)
- **Typography**: System font stack via Tailwind (Geist Sans for body, monospace for IDs)
- **Layout**: Sticky header (site selector + live data status), left sidebar nav (desktop) / horizontal scroll tabs (mobile), main content area with footer

---

## 8. Technology Stack

| Layer | Component | Choice | Status |
|---|---|---|---|
| Framework | Web framework | Next.js 16.1.3 (App Router + Turbopack) | ✅ Active |
| Language | TypeScript | 5.x | ✅ Active |
| Styling | CSS framework | Tailwind CSS 4 | ✅ Active |
| UI components | Component library | shadcn/ui (New York style) + Lucide icons | ✅ Active |
| Maps | Vector tiles | MapLibre GL JS 6.10 | ✅ Active |
| Charts | Data visualization | Recharts 2.15 (line, bar, pie, radar) | ✅ Active |
| State | Client state | React `useState` (per-section scope) | ✅ Active |
| State | Server state | TanStack Query 5.82 | 🟡 Available, unused |
| Auth | Authentication | NextAuth.js v4 | 🟡 Available, unused |
| Database | ORM | Prisma 6.11 (SQLite client) | 🟡 Available, unused |
| Real-time | WebSocket | Socket.io (mini-service pattern) | 🟡 Available, unused |

### Pending Live Integrations (mock data only in v0.1.0)

| Integration | Component | Status |
|---|---|---|
| Firebase Realtime Database | IoT sensor streams | 🔴 Mock |
| PostGIS / GeoServer | Spatial layers, AOI shapefiles | 🔴 Synthetic coordinates |
| Sentinel-2 via Copernicus DSE | Satellite imagery | 🔴 Not wired |
| Google Earth Engine | Cloud processing pipeline | 🔴 Not wired |
| IWCYS inference API | PyTorch attention yield model | 🔴 Mock predictions |
| IWSS scheduling API | Soil-water-balance engine | 🔴 Mock recommendations |
| CNN disease classifier | Disease detection model | 🔴 Mock alerts |

---

## 9. Mock Data Layer

The mock data layer at `src/lib/mock/` simulates a realistic pilot deployment:

### Sites (`sites.ts`)
3 sites with realistic coordinates, elevation, host institution names, plot counts, sensor counts, and total hectares.

### Plots (`plots.ts`)
60 plots distributed across the 3 sites (20 Bishoftu + 22 Asella + 18 Ambo), each with:
- Unique ID and plot code (e.g., `BIS-001`, `ASE-005`, `AMB-012`)
- Area in hectares (5–20 ha)
- Irrigation type (sprinkler / drip / surface)
- Wheat variety (Kubsa, Danda'a, Ogolcho, Fentale-1, Mada-Walabu)
- Planting date (June 2026 Meher season)
- Growth stage (tillering, stem elongation, booting, flowering, grain filling)
- Geographic coordinates perturbed around the site center

### Sensors (`sensors.ts`)
100+ IoT sensors (soil moisture, NPK, humidity, temperature) with:
- Online / warning / offline status
- Battery level (0–100%)
- Last reading value and unit
- Last updated timestamp

### Yield Predictions (`yield-predictions.ts`)
60 yield predictions with:
- Predicted yield in tonnes/hectare (2.8–5.8 t/ha range)
- 95% confidence intervals
- Model accuracy per plot
- Top 7 attention features per prediction (NDVI, NDRE, soil moisture, etc.)

### Irrigation Recommendations (`irrigation-recommendations.ts`)
60 irrigation recommendations with:
- Status (irrigate-now / monitor / no-irrigation / irrigating)
- Urgency (low / medium / high / critical)
- Soil moisture percentage
- Crop evapotranspiration (ETc) in mm
- 7-day rainfall forecast
- Recommended irrigation volume in liters
- Recommended timing
- Water saving percentage vs. baseline

### Disease Alerts (`disease-alerts.ts`)
20 disease alerts with:
- Disease type (yellow/stem/leaf rust, Septoria blotch, powdery mildew, loose smut, Fusarium head blight)
- Severity (none / low / medium / high / severe)
- Incidence percentage
- Detection method (UAV multispectral / CNN classifier)
- Confidence score
- Detection notes per disease

### Sensor Readings (`sensor-readings.ts`)
Time-series data with 24 readings per sensor at 15-minute intervals.

---

## 10. Repository State

- **Repository**: https://github.com/DivergenTechnology/SSGI-Project
- **Active Branch**: `main`
- **Total Files on Remote**: 99
- **Total Commits on Remote**: 4 (initial commit + dashboard v0.1 + README + this history)

### Repository Hygiene
- `.gitignore` excludes all internal artifacts:
  - `/scripts/` (docx generation scripts)
  - `/download/` (deliverable output directory)
  - `/skills/` (skill files)
  - `/tool-results/` (tool execution logs)
  - `/upload/` (user uploads)
  - `/tests/`, `/mini-services/`, `/.zscripts/`
  - `*.db`, `*.log`, `agent-ctx/`, `worklog.md`
- No secrets, tokens, or credentials are committed to the repository
- README.md documents project structure and developer setup instructions

### Commits Log
1. `02d7b6a` — Initial commit (project scaffold)
2. `88b9a2b` — feat(dashboard): IWCYES-IWSS dashboard prototype v0.1 (89 files, 11,528 insertions)
3. `1843859` — docs: add README with project overview and structure
4. *(this update)* — docs: add PROJECT_HISTORY with full project record

---

## 11. Open Items and Pending Integrations

### Immediate (Pre-Inception Phase)
- [ ] Secure formal sign-off of the implementation plan by MoA and partner research institutes
- [ ] Initiate procurement of 60 NPK soil sensors, UAV platform (DJI P4 Multispectral), 3 GNSS receivers
- [ ] Recruit Co-PI, GIS Specialist, and 3 Field Coordinators
- [ ] Set up Firebase project and provision Copernicus Data Space Ecosystem + Google Earth Engine access
- [ ] Initiate UAV flight authorization with Ethiopian Civil Aviation Authority (3–6 month lead time)
- [ ] Schedule project inception meeting with steering committee

### Technical Integration (Dashboard Roadmap)
- [ ] Wire Firebase RTDB to replace mock sensor feed (live IoT streams)
- [ ] Wire PostGIS / GeoServer for real AOI shapefiles (replace synthetic coordinates)
- [ ] Implement IWCYS inference API (PyTorch attention model as Python sidecar)
- [ ] Implement IWSS scheduling API (soil-water-balance engine)
- [ ] Replace mock disease alerts with CNN classifier inference service
- [ ] Add NextAuth.js authentication for per-institute role-based access
- [ ] Add user management for research institute staff
- [ ] Add Sentinel-2 satellite imagery as base map layer
- [ ] Add attention heatmap overlays on the map view

### Capacity Building
- [ ] 2-week ML/GIS bootcamp for counterpart staff from partner institutes (BEFORE project kickoff)
- [ ] Comprehensive documentation package for handover
- [ ] Two-day handover workshop at each pilot site

---

## 12. Security and Operational Notes

### GitHub Personal Access Token
A GitHub PAT was shared in plaintext chat during the initial dashboard push. **This token must be rotated immediately** at https://github.com/settings/tokens. The credential file at `~/.git-credentials` (600 permissions) will need to be updated with the new token before any subsequent push to the repository.

### Data Governance
- Plot boundary, soil chemistry, and yield data collection requires **informed consent protocols** under Ethiopia's evolving Personal Data Protection Proclamation (2024)
- A data governance workstream should be added to WP1 (currently missing from the original plan)
- Data sovereignty considerations apply when using Firebase (US-hosted) for Ethiopian agricultural data

### Sustainability
- Year-2 operating cost projected at USD 35K in original plan — **realistic estimate is USD 60–80K** accounting for sensor replacement cycles, model retraining, security patching
- Counterpart pairing model assumes counterpart capacity that may not exist — pre-project bootcamp required

---

## 13. Change Log

| Date | Version | Change | Author |
|---|---|---|---|
| Sep 2026 | v0.1.0 | Initial dashboard prototype built and pushed to GitHub; 7 sections, 60 plots of mock data, MapLibre + Recharts integration | IWCYES-IWSS Project Team |
| Sep 2026 | v0.1.0 | Implementation Plan Word document generated (26 pages, 12 sections, 9 tables) | IWCYES-IWSS Project Team |
| Sep 2026 | v0.1.0 | Feasibility analysis performed; 14 critical limitations identified; 10 recommended adjustments proposed (deferred by stakeholder) | IWCYES-IWSS Project Team |
| Sep 2026 | v0.1.0 | PROJECT_HISTORY.md added to repository as institutional memory | IWCYES-IWSS Project Team |

---

## How to Update This Document

When making changes to the project, append a new row to the **Change Log** table above with:
- Date (month + year)
- Version (semantic versioning: `vMAJOR.MINOR.PATCH`)
- Brief change description (1–2 sentences)
- Author / team name

For major milestones (new dashboard section, new live integration, completed work package, etc.), also update the relevant section above (e.g., Section 7 for dashboard additions, Section 8 for technology stack changes, Section 11 for completed items moving from "pending" to "done").

This document is the single source of truth for the project's history. Do not duplicate it elsewhere.
