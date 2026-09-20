// ============================================================================
// plan_content.js — Content for the IWCYES & IWSS Implementation Plan
// Exports buildFrontMatter() and buildBody() functions that take a builders
// object and return arrays of docx-js elements.
// ============================================================================

// ──────────────────────────────────────────────────────────────────────────
// FRONT MATTER (TOC)
// ──────────────────────────────────────────────────────────────────────────
function buildFrontMatter(b) {
  const { Paragraph, TextRun, TableOfContents, PageBreak, AlignmentType } = b;
  return [
    // TOC title — NOT a Heading style (prevents self-indexing)
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 480, after: 360 },
      children: [new TextRun({
        text: "Table of Contents",
        bold: true, size: 32,
        font: { eastAsia: "SimHei", ascii: "Times New Roman" },
        color: b.P.primary,
      })],
    }),
    // TOC field
    new TableOfContents("Table of Contents", {
      hyperlink: true,
      headingStyleRange: "1-3",
    }),
    // Refresh hint
    new Paragraph({
      spacing: { before: 200 },
      children: [new TextRun({
        text: "Note: This Table of Contents is generated via field codes. To ensure page number accuracy after editing, please right-click the TOC and select \"Update Field.\"",
        italics: true, size: 18, color: "888888",
      })],
    }),
    // PageBreak to separate TOC from body
    new Paragraph({ children: [new PageBreak()] }),
  ];
}

// ──────────────────────────────────────────────────────────────────────────
// BODY
// ──────────────────────────────────────────────────────────────────────────
function buildBody(b) {
  const { h1, h2, h3, body, bodyNoIndent, bullet, bulletBold, tableCaption, makeTable, Paragraph, TextRun, PageBreak, AlignmentType } = b;

  const out = [];

  // ───── Executive Summary ─────
  out.push(h1("Executive Summary"));
  out.push(body(
    "Ethiopia's agricultural sector accounts for approximately 46 percent of national GDP, 83 percent of commodity exports, and 80 percent of total employment, making it the single most important lever for poverty reduction, food security, and rural prosperity. Yet productivity remains predominantly subsistence-oriented, constrained by recurrent drought, widespread land degradation, low adoption of improved technologies, and a weak in-situ data infrastructure that limits evidence-based decision-making. In response, the Government of Ethiopia has prioritized the modernization of agriculture through digital tools, climate-smart practices, and precision farming. This project operationalizes that priority by developing a remote sensing-enabled decision-support ecosystem tailored to irrigated wheat farming, a strategic sub-sector for import substitution and nutritional security."
  ));
  out.push(body(
    "The project will be implemented across three pilot agricultural research institutes — Bishoftu (Debre Zeit), Asella, and Ambo — selected for their agro-ecological representativeness and existing institutional capacity. Over a 12-month implementation horizon, the project will deliver four integrated outputs: (i) a comprehensive spatial database of irrigated wheat farmlands built from field-collected shapefiles and satellite imagery; (ii) the Irrigated Wheat Crop Yield Estimation System (IWCYES), which fuses vegetation indices from Sentinel-2 and UAV sensors with soil NPK data to forecast yield at the plot level; (iii) information products in the form of maps and statistics covering small, medium, and large-scale irrigated wheat farms; and (iv) the Irrigation Water Scheduling Service (IWSS), a spatially explicit tool that delivers precise irrigation recommendations based on real-time soil moisture, humidity, crop stage, and weather data streamed from NPK sensors to Firebase."
  ));
  out.push(body(
    "The system architecture layers IoT sensing (NPK devices), cloud ingestion (Firebase), spatial data infrastructure (PostGIS / GeoServer), remote sensing (Sentinel-2 + UAV multispectral), artificial intelligence (attention-based ML models for yield and disease detection), and a state-of-the-art decision-support dashboard featuring map overlays and attention heatmaps. The total estimated budget envelope falls in the range of USD 480,000 – 620,000, with personnel absorbing approximately 60 percent of costs and equipment, software, field operations, capacity building, and contingency making up the balance. The project is expected to achieve yield prediction accuracy of R-squared greater than 0.80, irrigation water savings of at least 20 percent on pilot plots, and a clear handover pathway to the partner research institutes for sustained operation and national scale-up."
  ));

  // ───── 1. Project Background and Rationale ─────
  out.push(h1("1. Project Background and Rationale"));
  out.push(body(
    "Agriculture is the structural backbone of the Ethiopian economy and the leading sector in terms of rural livelihood opportunities. It employs between 65 and 85 percent of the active population, generates roughly 46 percent of gross domestic product, accounts for 83 percent of merchandise exports, and remains the principal source of food, raw material, and income for close to 120 million citizens. The country also hosts the largest cattle population on the African continent, underpinning a mixed crop-livestock farming system that is integral to household nutrition and national food balance. Despite this prominence, production and productivity from both crop farming and animal husbandry remain largely of subsistence character, and the agricultural sector's contribution to commodity exports is concentrated in a narrow set of primary commodities with limited value addition."
  ));
  out.push(body(
    "Ethiopia has made measurable agricultural progress in recent decades, yet the sector continues to confront a constellation of structural challenges. Poverty, food insecurity, water stress, and inadequate nutrition persist across large parts of the rural landscape. Land degradation, recurrent drought, low fertilizer use efficiency, and the limited diffusion of improved technology and digital tools further constrain productivity growth. These challenges are particularly acute in rain-fed and partially irrigated cereal systems, where smallholder decisions are still made on the basis of intuition and inherited practice rather than timely, location-specific data. The Government of Ethiopia has therefore prioritized the modernization and transformation of agriculture, with explicit emphasis on managing crops and animals sustainably, protecting land, water, and biodiversity, and boosting crop and livestock output through innovation."
  ));
  out.push(body(
    "Remote sensing — encompassing satellite, unmanned aerial vehicle (UAV), and proximal sensing platforms — has emerged as a cornerstone of digital, climate-smart, and precision agriculture. The unprecedented availability of free and open satellite imagery (notably Sentinel-2 at 10-meter resolution every five days), combined with low-cost UAV platforms and affordable in-situ soil sensors, has positioned the remote sensing community to deliver operational products and services at scale. New capabilities in data science, machine learning, and artificial intelligence further enable the integration of heterogeneous data streams into actionable, end-user-oriented workflows. However, persistent bottlenecks remain: insufficient in-situ data for model training, limited timely processing capacity, a shortage of skilled remote sensing professionals, and under-developed research infrastructure."
  ));
  out.push(body(
    "Irrigated wheat has been selected as the strategic entry point for this project because of its central role in Ethiopia's wheat self-sufficiency agenda, its responsiveness to irrigation scheduling, and its amenability to remote sensing-based monitoring. Integrating remote sensing technologies into irrigated wheat farming systems enhances decision-making, improves resource management, and ultimately leads to increased productivity and sustainability. The resulting services support farmers and decision-makers in making data-driven, evidence-informed decisions that align with environmental conservation and economic viability — directly addressing Ethiopia's food security, poverty reduction, and climate resilience objectives."
  ));

  // ───── 2. Project Objectives and Scope ─────
  out.push(h1("2. Project Objectives and Scope"));

  out.push(h2("2.1 General Objective"));
  out.push(body(
    "The general objective of the project is to develop remote sensing-enabled tools, services, and a decision-support system for irrigated wheat farming systems in Ethiopia, so as to enhance the efficiency, sustainability, and profitability of wheat irrigated farming systems. The project seeks to demonstrate that operational remote sensing products, combined with in-situ IoT sensing and modern machine learning, can be packaged into decision-support services that are usable by agricultural research institutes, extension agents, and progressive farmers, and that such services deliver measurable improvements in yield, water productivity, and disease management."
  ));

  out.push(h2("2.2 Specific Objectives"));
  out.push(bullet("To construct a comprehensive spatial database of irrigated wheat farmlands across the three pilot sites, integrating field-collected shapefiles, satellite imagery, and ancillary geographic layers into a unified PostGIS-backed system."));
  out.push(bullet("To develop the Irrigated Wheat Crop Yield Estimation System (IWCYES), fusing vegetation indices (NDVI, EVI, NDRE, GNDVI, NDMI, LAI) derived from Sentinel-2 and UAV imagery with soil NPK properties and weather data to predict wheat yield at the plot level with an R-squared exceeding 0.80."));
  out.push(bullet("To design and deploy the Irrigation Water Scheduling Service (IWSS), a spatially explicit tool that ingests real-time soil moisture, humidity, and NPK data from IoT sensors published to Firebase, and generates irrigation recommendations calibrated to crop development stage and weather forecast."));
  out.push(bullet("To implement a UAV-based wheat disease early detection module using multispectral imagery and convolutional neural network classifiers, providing pre-symptomatic stress alerts and severity maps to research institute staff."));
  out.push(bullet("To deliver a state-of-the-art decision-support dashboard with map overlays, real-time sensor feeds, attention heatmaps from the underlying ML models, and information products (maps and statistics) covering small, medium, and large-scale irrigated wheat farmlands."));
  out.push(bullet("To strengthen the institutional and human capacity of the three partner research institutes to operate, maintain, and extend the system beyond the project's lifetime."));

  out.push(h2("2.3 Geographic Scope"));
  out.push(body(
    "The project will be implemented across three pilot agricultural research institutes, selected to capture the agro-ecological diversity of Ethiopia's irrigated wheat belt and to leverage existing institutional capacity. Each site serves as both an instrumented pilot and a node for replication. The geographic coordinates and institutional anchors of the three pilot sites are summarized below."
  ));
  out.push(tableCaption("Table 2.1 — Pilot study areas and approximate spatial location"));
  out.push(makeTable(
    ["Pilot Site", "Region / Zone", "Approx. Latitude", "Approx. Longitude", "Host Institution"],
    [
      ["Bishoftu", "Oromia (East Shewa)", "8.75° N", "39.00° E", "Debre Zeit Agricultural Research Center"],
      ["Asella", "Oromia (Arsi)", "7.96° N", "39.17° E", "Asella / Kulumsa Agricultural Research Center"],
      ["Ambo", "Oromia (West Shewa)", "8.98° N", "37.79° E", "Ambo Agricultural Research Center"],
    ],
    [14, 22, 14, 16, 34]
  ));
  out.push(body(
    "All three sites fall within Oromia Regional State and span an elevation range of approximately 1,800 to 2,400 meters above sea level, capturing the highland wheat belt that produces the bulk of Ethiopia's irrigated wheat. A uniform spatial reference system (UTM Zone 37N on the WGS84 datum) will be adopted for cross-site data integration, with administrative boundaries, soil maps, digital elevation models, hydrology, climate zones, and irrigation infrastructure compiled as common overlay layers."
  ));

  out.push(h2("2.4 Thematic Scope"));
  out.push(body(
    "The project is bounded by four thematic deliverables: (i) a spatial database subsystem; (ii) the IWCYES yield estimation subsystem; (iii) information products comprising maps and statistics at small, medium, and large scales; and (iv) the IWSS irrigation scheduling subsystem. These are complemented by horizontal activities covering UAV disease detection, dashboard development, capacity building, and project management. Each thematic area is decomposed into work packages in Section 4."
  ));

  out.push(h2("2.5 Out of Scope"));
  out.push(body(
    "The following items are explicitly excluded from the current phase: (a) national-scale rollout beyond the three pilot institutes; (b) deployment on rain-fed wheat (the project targets irrigated systems only); (c) financial subsidy disbursement to farmers; (d) commercialization and revenue operations; (e) certification of organic or other specialty wheat schemes. These items will be considered in a subsequent scale-up phase informed by the present pilot's results."
  ));

  // ───── 3. Technical Approach and Methodology ─────
  out.push(h1("3. Technical Approach and Methodology"));

  out.push(h2("3.1 System Architecture Overview"));
  out.push(body(
    "The IWCYES-IWSS ecosystem is structured as a four-layer architecture designed for modularity, scalability, and cross-engine compatibility. The IoT sensing layer comprises NPK soil sensors, soil moisture and humidity probes, and UAV platforms that generate high-frequency in-situ and aerial observations. The spatial data layer consolidates field-collected shapefiles, satellite imagery (Sentinel-2 and Landsat), UAV orthomosaics, soil maps, digital elevation models, and ancillary geographic layers within a PostGIS-backed database exposed via GeoServer. The AI/ML layer hosts the yield regression models, disease detection convolutional neural networks, and attention-based attribution modules. The application and dashboard layer delivers the user-facing interfaces, including the IWSS recommendation engine and the state-of-the-art decision-support dashboard with map overlays and attention heatmaps."
  ));
  out.push(body(
    "Data flows are unidirectional from sensors and imagery through the spatial data and AI layers to the dashboard, with feedback loops from end-user interactions captured for model retraining. Real-time sensor streams are pushed to Firebase Realtime Database, with daily snapshots archived in PostGIS for historical analysis and ML training. Satellite imagery is acquired via the Copernicus Data Space Ecosystem and processed through a Google Earth Engine pipeline for cloud-filtered, atmospherically corrected composites. UAV flights are scheduled per crop phenological stage to maximize information density at critical decision points."
  ));

  out.push(h2("3.2 Spatial Database Construction"));
  out.push(body(
    "The spatial database is the foundational layer upon which all subsequent services depend. Field teams at each of the three pilot sites will collect plot boundary shapefiles using handheld GNSS receivers, with attribute data capturing plot identifier, owner or manager, irrigation type (surface, sprinkler, drip), wheat variety, planting date, and prior crop. The shapefiles will be ingested into PostGIS following a standardized schema, with topological cleaning to remove overlaps and gaps, projection transformation to UTM Zone 37N, and registration in an Area of Interest (AOI) registry. Each plot will receive a unique identifier used as the join key across sensor, satellite, UAV, and yield observation datasets."
  ));
  out.push(body(
    "Satellite imagery footprints (Sentinel-2 tiles) will be clipped per AOI and stored as Cloud Optimized GeoTIFFs (COG) to enable efficient partial reads. Soil maps from the Ethiopian Agricultural Transformation Agency, digital elevation models from SRTM and ASTER, hydrological networks, and irrigation infrastructure will be incorporated as ancillary layers. All layers will be exposed via GeoServer Web Map Services (WMS) and Web Feature Services (WFS) for consumption by the dashboard and analytical pipelines."
  ));

  out.push(h2("3.3 UAV Imagery for Wheat Disease Early Detection"));
  out.push(body(
    "UAV flights will be conducted using a multispectral platform (e.g., DJI P4 Multispectral or equivalent) carrying RGB plus Near-Infrared and Red-Edge bands. Flights will be executed at 50 to 100 meters above ground level, with a ground sampling distance of approximately 2 to 5 centimeters per pixel. Acquisition timing will be aligned with the four key wheat phenological stages — tillering, stem elongation, booting, and flowering — to maximize the diagnostic value of canopy reflectance. Raw imagery will be processed into orthomosaics using OpenDroneMap or Pix4D, with reflectance calibration tiles ensuring radiometric consistency across flights."
  ));
  out.push(body(
    "Disease detection targets include yellow rust (Puccinia striiformis), stem rust (Puccinia graminis), leaf rust (Puccinia triticina), Septoria blotch, powdery mildew, loose smut, and Fusarium head blight. The detection pipeline combines two complementary approaches: (i) a pre-symptomatic stress indicator leveraging Red-Edge and chlorophyll indices to flag anomalous canopy patches before visible lesions appear, and (ii) a convolutional neural network classifier (EfficientNet or U-Net architecture) trained on annotated RGB and multispectral imagery to detect and segment lesion-level symptoms. Outputs include per-plot disease incidence maps, severity percentages, and push notifications to the dashboard."
  ));

  out.push(h2("3.4 Vegetation Index Fusion for Yield Estimation"));
  out.push(body(
    "Yield estimation in IWCYES is grounded in the integration of multiple vegetation indices with soil properties, weather variables, and management information. Indices are computed from both Sentinel-2 (10-meter resolution, 5-day revisit) and UAV multispectral orthomosaics (sub-meter resolution, scheduled per stage). The fusion approach combines indices sensitive to canopy vigor, chlorophyll content, water stress, and leaf area, thereby capturing distinct physiological dimensions of crop performance. The indices used, their formulas, and their primary diagnostic purposes are summarized in Table 3.1."
  ));
  out.push(tableCaption("Table 3.1 — Vegetation indices computed for IWCYES yield estimation"));
  out.push(makeTable(
    ["Index", "Formula (NIR=Near-Infrared, R=Red, G=Green, RE=Red-Edge)", "Primary Diagnostic Purpose"],
    [
      ["NDVI", "(NIR − R) / (NIR + R)", "Canopy vigor and biomass"],
      ["EVI", "2.5 × (NIR − R) / (NIR + 6R − 7.5B + 1)", "Biomass in high-coverage canopy"],
      ["NDRE", "(NIR − RE) / (NIR + RE)", "Chlorophyll and nitrogen status"],
      ["GNDVI", "(NIR − G) / (NIR + G)", "Chlorophyll content"],
      ["NDMI", "(NIR − SWIR1) / (NIR + SWIR1)", "Canopy water stress"],
      ["LAI", "Inverted from NDVI / RTM (PROSAIL)", "Leaf area for light interception"],
      ["SAVI", "1.5 × (NIR − R) / (NIR + R + 0.5)", "Soil-adjusted vigor (early stage)"],
      ["VARI", "(G − R) / (G + R − B)", "Greenness from UAV RGB"],
    ],
    [14, 46, 40]
  ));
  out.push(body(
    "Feature vectors for the yield regression model are constructed by combining the time series of vegetation indices (aggregated to plot-level statistics: mean, standard deviation, min, max, and selected quantiles) with soil properties (Nitrogen, Phosphorus, Potassium, organic matter, pH, moisture, and humidity from NPK sensors), weather variables (temperature, rainfall, reference evapotranspiration), and management attributes (planting date, irrigation events, fertilization events). The model outputs predicted wheat yield in tonnes per hectare with a confidence interval, and the attention mechanism assigns interpretable weights to each input feature, visualized as heatmaps on the dashboard."
  ));

  out.push(h2("3.5 Irrigation Water Scheduling Service (IWSS)"));
  out.push(body(
    "IWSS delivers precise, site-specific irrigation recommendations by combining real-time soil moisture and humidity data from NPK sensors with crop evapotranspiration (ETc) estimates derived from weather data and crop coefficients. The scheduling logic follows a soil-water-balance approach: the available soil water depletion is computed daily from sensor readings, ETc, and effective rainfall; when depletion exceeds a management-allowed threshold (typically 50 percent for wheat at vegetative stage, 40 percent at flowering), the system triggers an irrigation recommendation specifying the timing and volume required to refill the root zone to field capacity."
  ));
  out.push(body(
    "Sensor observations are pushed at 15-minute intervals from NPK devices to Firebase Realtime Database, where a cloud function evaluates the scheduling rule per plot and writes recommendations back to a Firebase Firestore collection consumed by the dashboard. Weather forecasts are integrated from the Ethiopian Meteorological Institute and the European Centre for Medium-Range Weather Forecasts (ECMWF) open data, with a 7-day horizon used to anticipate rainfall that may postpone or reduce irrigation. Recommendations are presented as color-coded alerts (no irrigation needed / monitor / irrigate now) with the underlying data accessible via drill-down map overlays."
  ));

  out.push(h2("3.6 AI/ML Models with Attention Mechanism"));
  out.push(body(
    "The yield estimation model is implemented as a dual-branch neural network. A temporal attention branch ingests the time series of vegetation indices per plot and learns to attend to the phenological windows most predictive of final yield. A tabular branch ingests soil, weather, and management features through a gradient-boosted decision tree (XGBoost) layer. The two branches are concatenated through a fusion layer that produces both the yield prediction and an attention attribution vector used to explain the model's decision to end users. Spatial attention is further applied across plots to identify clusters of similar performance, supporting site-specific management interventions. For disease detection, the CNN classifier incorporates spatial attention modules that highlight the canopy regions most diagnostic of each disease class, with the activation maps exported as overlays on the dashboard."
  ));

  // ───── 4. Work Package Breakdown ─────
  out.push(h1("4. Work Package Breakdown"));
  out.push(body(
    "The project is decomposed into six work packages (WPs) covering management, spatial infrastructure, the two production subsystems (IWCYES and IWSS), the UAV disease module, and the decision-support dashboard. Each work package has defined objectives, key activities, deliverables, a designated lead, and a duration that aligns with the overall 12-month timeline. The breakdown ensures clear accountability, parallel execution where dependencies allow, and traceable handover between technical and field teams. Table 4.1 summarizes the six work packages."
  ));
  out.push(tableCaption("Table 4.1 — Work package summary"));
  out.push(makeTable(
    ["WP", "Title", "Lead", "Duration", "Key Deliverables"],
    [
      ["WP1", "Project Management & Coordination", "Project Coordinator", "M1–M12", "Inception report, quarterly reports, final report, M&E framework, risk register"],
      ["WP2", "Spatial Database & GIS Infrastructure", "GIS Lead", "M1–M9", "Plot shapefile registry, PostGIS schema, GeoServer WMS/WFS, AOI registry for 3 sites"],
      ["WP3", "IWCYS Yield Estimation System", "ML / Data Science Lead", "M3–M11", "Vegetation index pipeline, yield regression model, attention attribution, accuracy report"],
      ["WP4", "IWSS Irrigation Water Scheduling", "IoT / Backend Lead", "M3–M11", "NPK sensor deployment, Firebase ingestion pipeline, ETc engine, recommendation API"],
      ["WP5", "UAV Disease Early Detection", "UAV / Remote Sensing Lead", "M4–M11", "Flight plans, orthomosaic pipeline, CNN classifier, severity maps per site"],
      ["WP6", "Decision-Support Dashboard", "Frontend Lead", "M5–M12", "Map overlay engine, real-time Firebase binding, attention heatmap visualization, mobile-responsive UI"],
    ],
    [6, 26, 18, 12, 38]
  ));

  out.push(h2("4.1 WP1 — Project Management and Coordination"));
  out.push(body(
    "WP1 provides the day-to-day management backbone for the project. Key activities include establishment of the project steering committee with representation from each partner research institute and the Ministry of Agriculture; recruitment and contracting of technical staff; quarterly progress reporting against milestones; maintenance of the risk register; coordination of cross-site field campaigns; and stewardship of the M&E framework. Deliverables include the inception report (Month 1), quarterly progress reports (Months 3, 6, 9), and the consolidated final report (Month 12)."
  ));

  out.push(h2("4.2 WP2 — Spatial Database and GIS Infrastructure"));
  out.push(body(
    "WP2 delivers the spatial foundation for all subsequent work. Activities include field collection of plot boundary shapefiles using handheld GNSS at each of the three pilot sites; design and deployment of the PostGIS schema with consistent attribute conventions; ingestion of satellite imagery footprints (Sentinel-2, Landsat) per AOI; integration of soil maps, DEM, hydrology, and irrigation infrastructure layers; deployment of GeoServer WMS/WFS endpoints; and QA of topological consistency. Deliverables include the AOI registry, the spatial database instance, and the GeoServer endpoints with documentation."
  ));

  out.push(h2("4.3 WP3 — IWCYS Yield Estimation System"));
  out.push(body(
    "WP3 produces the operational yield estimation capability. Activities include development of the satellite and UAV vegetation index computation pipeline; harmonization of satellite and UAV index time series to plot-level statistics; construction of the training dataset combining indices, soil NPK, weather, and management features with field-measured yield ground truth; design and training of the dual-branch attention-based model; evaluation of model accuracy against a held-out test set per site; and deployment of the inference pipeline integrated with the dashboard. The key acceptance criterion is an R-squared greater than 0.80 against independent ground truth yield data."
  ));

  out.push(h2("4.4 WP4 — IWSS Irrigation Water Scheduling"));
  out.push(body(
    "WP4 builds the real-time irrigation scheduling service. Activities include procurement and field deployment of NPK soil sensors across instrumented plots per site; establishment of the Firebase Realtime Database project and authentication flow; development of the cloud function that evaluates the soil-water-balance rule per plot at 15-minute intervals; integration of weather forecast feeds from the Ethiopian Meteorological Institute and ECMWF; and exposure of irrigation recommendations via a REST API consumed by the dashboard. Deliverables include the deployed sensor network, the Firebase pipeline, the ETc engine, and the recommendation API."
  ));

  out.push(h2("4.5 WP5 — UAV Disease Early Detection"));
  out.push(body(
    "WP5 implements the UAV-based disease early detection capability. Activities include procurement of the UAV platform and multispectral sensor; pilot certification and flight authorization with the Ethiopian Civil Aviation Authority; execution of phenologically-timed flights at each site per crop season; orthomosaic generation via OpenDroneMap with reflectance calibration; annotation of training imagery with disease class labels; training and evaluation of the CNN classifier; and deployment of the inference pipeline producing per-plot disease incidence and severity maps."
  ));

  out.push(h2("4.6 WP6 — Decision-Support Dashboard"));
  out.push(body(
    "WP6 delivers the user-facing dashboard that consolidates all subsystem outputs. Activities include UX research with research institute staff and decision-makers to define information needs; design and implementation of the map overlay engine (Leaflet/MapLibre with WMS layers from GeoServer); real-time binding of Firebase sensor feeds with auto-refresh; implementation of attention heatmaps as overlay layers; KPI tiles for at-a-glance monitoring; mobile-responsive design; and user acceptance testing with each pilot site's staff. Deliverables include the deployed dashboard accessible via browser, user documentation, and a training package."
  ));

  // ───── 5. Implementation Timeline and Milestones ─────
  out.push(h1("5. Implementation Timeline and Milestones"));
  out.push(body(
    "The project is implemented over a 12-month horizon divided into four quarters. The first quarter focuses on mobilization, recruitment, sensor and UAV procurement, and the foundational spatial database. The second quarter concentrates on model and pipeline development with first integration tests. The third quarter executes full deployment, integration, and field validation. The fourth quarter finalizes the dashboard, completes capacity building, performs external review, and hands over to partner institutes. Table 5.1 presents the Gantt-style schedule, where filled cells indicate active execution periods for each work package."
  ));
  out.push(tableCaption("Table 5.1 — Quarterly implementation schedule (● = active period)"));
  out.push(makeTable(
    ["Work Package", "Q1 (M1–M3)", "Q2 (M4–M6)", "Q3 (M7–M9)", "Q4 (M10–M12)"],
    [
      ["WP1 — Project Management", "●", "●", "●", "●"],
      ["WP2 — Spatial Database & GIS", "●", "●", "●", ""],
      ["WP3 — IWCYS Yield Estimation", "", "●", "●", "●"],
      ["WP4 — IWSS Irrigation Scheduling", "●", "●", "●", "●"],
      ["WP5 — UAV Disease Detection", "", "●", "●", "●"],
      ["WP6 — Decision-Support Dashboard", "", "", "●", "●"],
    ],
    [34, 16, 16, 16, 18]
  ));
  out.push(h2("5.1 Quarter 1 (Months 1–3) — Mobilization"));
  out.push(body(
    "Quarter 1 prioritizes project inception, staff recruitment, MOU signing with the three research institutes, procurement of NPK sensors and the UAV platform, Firebase project setup, Copernicus and Earth Engine access provisioning, and field shapefile collection at the three pilot sites. By end of Q1, the PostGIS schema is deployed, the first AOI shapefile batch is ingested, and initial Sentinel-2 imagery is being processed. Key milestone: signed MOUs and operational spatial database instance with first AOI registered."
  ));
  out.push(h2("5.2 Quarter 2 (Months 4–6) — Pipeline Development"));
  out.push(body(
    "Quarter 2 develops the core analytical pipelines. The vegetation index computation pipeline is operational; the soil-water-balance rule for IWSS is deployed with first NPK sensors going live at Bishoftu; UAV flight plans are approved and the first phenological flights are executed at one site; the yield regression model architecture is finalized and first training runs begin on synthetic and ground-truth data. Key milestone: IWSS recommendation API serving live data from Bishoftu."
  ));
  out.push(h2("5.3 Quarter 3 (Months 7–9) — Full Deployment"));
  out.push(body(
    "Quarter 3 extends deployment across all three sites. All NPK sensors are live; UAV flights executed at Asella and Ambo; yield model achieves target R-squared on validation set; disease CNN classifier trained and evaluated; dashboard MVP deployed with map overlay and real-time Firebase binding. Key milestone: end-to-end integration of IWSS and IWCYS accessible via the dashboard for all three pilot sites."
  ));
  out.push(h2("5.4 Quarter 4 (Months 10–12) — Finalization and Handover"));
  out.push(body(
    "Quarter 4 finalizes the system, completes external performance review, delivers capacity building training to research institute staff, produces the final information products (maps and statistics at small, medium, and large scales), and formally hands over operational responsibility to the partner institutes. Key milestone: signed handover certificate and published scale-up business case for national rollout."
  ));

  // ───── 6. Team Structure and Roles ─────
  out.push(h1("6. Team Structure and Roles"));
  out.push(body(
    "The project is delivered by a multidisciplinary team combining remote sensing specialists, software engineers, agronomists, and field coordinators. The Principal Investigator (PI) reports to the steering committee and is supported by a Co-PI who oversees day-to-day operations. Three site-based field coordinators serve as the operational interface with the partner research institutes. Table 6.1 summarizes the key roles, primary responsibilities, and approximate time allocation as a percentage of full-time equivalent."
  ));
  out.push(tableCaption("Table 6.1 — Project team structure and role allocation"));
  out.push(makeTable(
    ["Role", "Primary Responsibilities", "% FTE"],
    [
      ["Principal Investigator (PI)", "Strategic direction, steering committee liaison, external reporting, scientific oversight", "30%"],
      ["Co-PI / Project Coordinator", "Day-to-day coordination, planning, risk management, WP1 lead", "100%"],
      ["GIS Specialist (WP2 Lead)", "Shapefile collection, PostGIS schema, GeoServer, AOI registry, spatial QA", "100%"],
      ["ML / Data Science Lead (WP3)", "Vegetation index pipeline, yield regression, attention model, model evaluation", "100%"],
      ["IoT / Backend Engineer (WP4)", "NPK sensor deployment, Firebase pipeline, cloud functions, recommendation API", "100%"],
      ["UAV / Remote Sensing Lead (WP5)", "UAV operations, flight planning, orthomosaic pipeline, CNN training for disease", "80%"],
      ["Frontend / Dashboard Developer (WP6)", "Dashboard UX, map overlays, Firebase real-time binding, attention heatmap visualization", "100%"],
      ["Field Coordinator — Bishoftu", "Site liaison, sensor field maintenance, GNSS surveys, UAV ground crew", "60%"],
      ["Field Coordinator — Asella", "Site liaison, sensor field maintenance, GNSS surveys, UAV ground crew", "60%"],
      ["Field Coordinator — Ambo", "Site liaison, sensor field maintenance, GNSS surveys, UAV ground crew", "60%"],
      ["Agronomist", "Crop stage monitoring, yield ground truth, irrigation advice validation", "50%"],
      ["M&E Officer", "KPI tracking, logframe maintenance, quarterly reporting, sustainability metrics", "40%"],
    ],
    [26, 56, 18]
  ));
  out.push(body(
    "The team operates through a matrix structure: technical leads own their work package deliverables, while site-based field coordinators own multi-WP execution at their respective AOI. Weekly virtual stand-ups, monthly site visits by the PI or Co-PI, and quarterly steering committee meetings ensure alignment. Capacity building is built in: each technical lead is paired with a counterpart from the partner research institutes who shadows development and gradually assumes operational responsibility."
  ));

  // ───── 7. Technology Stack ─────
  out.push(h1("7. Technology Stack"));
  out.push(body(
    "The technology stack is selected to balance openness, cost, sustainability, and the institutional capacity of the partner research institutes. Open-source and free-tier cloud components are prioritized to minimize license dependencies and to ensure the system can be operated by the institutes with modest ongoing costs. Table 7.1 summarizes the stack by layer; the paragraphs that follow explain the rationale for each layer's selection."
  ));
  out.push(tableCaption("Table 7.1 — Technology stack by layer"));
  out.push(makeTable(
    ["Layer", "Component", "Choice / Tool", "Rationale"],
    [
      ["IoT Sensing", "Soil NPK + moisture + humidity sensor", "NPK devices (e.g., Soil Optics / NPK-specific probes) with ESP32-based data logger", "Affordable, locally serviceable, Firebase-ready"],
      ["IoT Sensing", "UAV platform", "DJI P4 Multispectral (or equivalent)", "Multispectral bands at sub-meter GSD"],
      ["Cloud Ingestion", "Real-time data store", "Firebase Realtime Database + Firestore", "Free tier sufficient, push-based, dashboard-friendly"],
      ["Spatial Database", "Vector + raster store", "PostgreSQL 15 + PostGIS 3", "Open-source, proven, supports COG and WMS"],
      ["Spatial Database", "Map / feature server", "GeoServer 2.x", "Standard WMS/WFS, integrates with Leaflet/MapLibre"],
      ["Spatial Database", "Desktop GIS / processing", "QGIS 3.x with GDAL/OGR", "Open-source, training capacity exists locally"],
      ["Remote Sensing", "Satellite imagery", "Sentinel-2 (Copernicus), Landsat 8/9 (USGS)", "Free, 10m / 30m resolution, 5-day revisit"],
      ["Remote Sensing", "Cloud processing", "Google Earth Engine (commercial / academic)", "Scalable, pre-integrated data catalogs"],
      ["Remote Sensing", "UAV photogrammetry", "OpenDroneMap (WebODM)", "Open-source, multispectral-capable"],
      ["AI / ML", "Core framework", "Python 3.11 + PyTorch 2.x", "State-of-the-art, attention-native"],
      ["AI / ML", "Tabular models", "XGBoost + scikit-learn", "Strong baseline, interpretable"],
      ["Backend", "Application server", "FastAPI (Python) + Node.js for dashboard BFF", "Async, lightweight, Firebase SDK"],
      ["Backend", "API layer", "REST + GraphQL (optional)", "Standard, dashboard-friendly"],
      ["Frontend", "Web framework", "Next.js + React + Tailwind CSS", "Component ecosystem, SSR, mobile-responsive"],
      ["Frontend", "Map library", "MapLibre GL JS + Leaflet (legacy layers)", "Open-source, vector tiles, WMS"],
      ["Frontend", "Charts / data viz", "Recharts + D3.js", "Real-time and attention heatmaps"],
      ["DevOps", "Containerization", "Docker + Docker Compose", "Reproducible deployments"],
      ["DevOps", "CI / CD", "GitHub Actions", "Free for open-source, integrated"],
      ["DevOps", "Reverse proxy", "Nginx", "Standard, performant"],
      ["DevOps", "Hosting", "On-prem at EIAR + AWS Free Tier for Firebase sync", "Hybrid: control + elasticity"],
    ],
    [16, 22, 30, 32]
  ));
  out.push(body(
    "The IoT sensing layer pairs affordable NPK devices with ESP32-based loggers to push observations directly to Firebase, avoiding the cost and complexity of a custom IoT gateway. The Firebase free tier covers the projected sensor volume (approximately 60 sensors across three sites at 15-minute intervals) for the pilot phase; a paid tier will be budgeted for the scale-up phase. The multispectral UAV platform selection prioritizes ease of operation, parts availability in Ethiopia, and integration with OpenDroneMap for open-source photogrammetry."
  ));
  out.push(body(
    "The spatial database layer uses PostGIS as the production store and GeoServer for standardized OGC services. This combination is well-understood by Ethiopian agricultural research institutes, has an extensive training ecosystem, and avoids vendor lock-in. QGIS serves as the desktop GIS for field teams, complemented by GDAL/OGR command-line tools for batch processing. For remote sensing, Sentinel-2 imagery is acquired via the Copernicus Data Space Ecosystem, with Google Earth Engine used for cloud-filtered, atmospherically corrected composites and large-scale index computation."
  ));
  out.push(body(
    "The AI/ML layer is anchored on Python 3.11 and PyTorch 2.x, with XGBoost and scikit-learn for tabular baselines. The dual-branch yield model is implemented in PyTorch with a custom attention module; the disease detection CNN leverages EfficientNet or U-Net architectures pretrained on PlantVillage and fine-tuned on locally collected imagery. The backend uses FastAPI for the inference pipeline and a Node.js backend-for-frontend for the dashboard, both communicating with Firebase through the official SDK. The frontend uses Next.js + React + Tailwind for a mobile-responsive single-page application, with MapLibre GL JS for vector tiles and Leaflet as a fallback for legacy WMS layers. Recharts and D3.js deliver the real-time and attention heatmap visualizations."
  ));
  out.push(body(
    "DevOps practices include Docker-based containerization for all server components, GitHub Actions for CI/CD with automated tests, Nginx as reverse proxy, and a hybrid hosting model combining on-premise servers at the Ethiopian Institute of Agricultural Research (EIAR) for sensitive spatial data and AWS Free Tier resources for Firebase synchronization. All infrastructure-as-code artifacts are version-controlled."
  ));

  // ───── 8. Budget and Resource Requirements ─────
  out.push(h1("8. Budget and Resource Requirements"));
  out.push(body(
    "The total project budget is estimated in the range of USD 480,000 to USD 620,000 over the 12-month implementation period. Personnel absorbs the largest share at approximately 60 percent of the total, reflecting the labor-intensive nature of field data collection, model development, and capacity building. Equipment and infrastructure account for approximately 15 percent, covering the UAV platform, NPK sensors, GNSS receivers, and on-prem server. Cloud and software costs are intentionally minimized through use of free tiers and open-source components. Field operations and travel absorb approximately 10 percent, supporting quarterly site visits and field campaigns. Capacity building receives 5 percent, and a 5 percent contingency covers unforeseen costs. Table 8.1 presents the itemized budget."
  ));
  out.push(tableCaption("Table 8.1 — Itemized budget summary (USD, indicative)"));
  out.push(makeTable(
    ["Category", "Sub-item", "Indicative (USD)", "% of Total"],
    [
      ["Personnel (60%)", "PI (30% FTE × 12 mo)", "36,000", "6%"],
      ["", "Co-PI / Project Coordinator (100% × 12 mo)", "60,000", "10%"],
      ["", "GIS Specialist (100% × 9 mo)", "40,500", "7%"],
      ["", "ML / Data Science Lead (100% × 9 mo)", "45,000", "7%"],
      ["", "IoT / Backend Engineer (100% × 9 mo)", "40,500", "7%"],
      ["", "UAV / RS Lead (80% × 8 mo)", "32,000", "5%"],
      ["", "Frontend Developer (100% × 8 mo)", "36,000", "6%"],
      ["", "3 Field Coordinators (60% × 12 mo each)", "65,000", "11%"],
      ["", "Agronomist (50% × 9 mo) + M&E Officer (40% × 12 mo)", "31,000", "5%"],
      ["Equipment (15%)", "UAV platform + multispectral payload", "18,000", "3%"],
      ["", "60 NPK soil sensor kits + ESP32 loggers", "30,000", "5%"],
      ["", "GNSS receivers (3 × handheld)", "9,000", "2%"],
      ["", "On-prem server (PostGIS / GeoServer)", "12,000", "2%"],
      ["", "Workstations + accessories", "18,000", "3%"],
      ["Software / Cloud (5%)", "Firebase paid tier (Year 1 reserve)", "6,000", "1%"],
      ["", "Google Earth Engine commercial (small project)", "9,000", "2%"],
      ["", "AWS hosting + storage", "12,000", "2%"],
      ["Field Ops (10%)", "Quarterly site visits × 3 sites", "30,000", "5%"],
      ["", "Field campaigns (ground truth yield, GNSS)", "18,000", "3%"],
      ["", "Sensor installation & maintenance", "12,000", "2%"],
      ["Capacity Building (5%)", "Training workshops × 3 sites", "18,000", "3%"],
      ["", "Documentation + training materials", "6,000", "1%"],
      ["", "Travel for trainers", "6,000", "1%"],
      ["Contingency (5%)", "Unforeseen costs (5% of base)", "29,000", "5%"],
      ["", "Subtotal (Indicative)", "≈ USD 480,000 – 620,000", "100%"],
    ],
    [22, 38, 22, 18]
  ));
  out.push(body(
    "The budget envelope reflects a conservative pilot-scale deployment. Major cost drivers are field coordinator salaries (multiple sites), the ML and backend engineering roles, and the UAV plus multispectral sensor equipment. The scale-up phase will see personnel costs per additional site decline significantly because the platform and pipeline development are non-recurring, while equipment and field operations scale linearly with the number of sites. A separate scale-up business case will be developed in Quarter 4."
  ));

  // ───── 9. Risk Analysis and Mitigation ─────
  out.push(h1("9. Risk Analysis and Mitigation"));
  out.push(body(
    "Risk management is an ongoing activity led by the Project Coordinator under WP1. The risk register is reviewed monthly and updated quarterly. Risks are scored on a 1–5 likelihood × 1–5 impact matrix; only risks with a score of 9 or above trigger active mitigation reporting to the steering committee. Table 9.1 summarizes the ten most material risks identified for the project, with mitigation measures and designated owners."
  ));
  out.push(tableCaption("Table 9.1 — Risk register (top 10 risks)"));
  out.push(makeTable(
    ["ID", "Risk Description", "Category", "Lk", "Imp", "Mitigation", "Owner"],
    [
      ["R1", "In-situ data scarcity for model training limits IWCYS accuracy", "Technical", "4", "4", "Augment ground truth with expert-annotated yield data; transfer learning from regional models; multi-year retention plan", "ML Lead"],
      ["R2", "NPK sensor hardware failure during field deployment", "Technical", "3", "3", "Procure 20% spare units; daily heartbeat monitoring; field maintenance schedule; vendor SLA", "IoT Engineer"],
      ["R3", "Limited Internet connectivity at Asella / Ambo sites disrupts Firebase sync", "External", "4", "3", "Local caching on ESP32; offline-first design; weekly sync window; consider LoRaWAN fallback", "IoT Engineer"],
      ["R4", "UAV flight authorization delays with ECAA", "External", "3", "4", "Initiate authorization Month 1; engage EIAR as institutional sponsor; pre-cleared flight windows", "UAV Lead"],
      ["R5", "Adverse weather (rainy season) disrupts UAV flight windows", "External", "4", "3", "Plan flights in dry-season windows; multispectral imagery backlog from Sentinel-2 as fallback", "UAV Lead"],
      ["R6", "Key technical staff turnover mid-project", "Operational", "3", "4", "Counterpart pairing with institute staff from Month 1; pair programming; comprehensive documentation", "Project Coord."],
      ["R7", "Firebase free-tier limits exceeded by sensor volume", "Technical", "2", "3", "Monitor usage monthly; budgeted paid-tier reserve; data archival to PostGIS reduces Firestore load", "IoT Engineer"],
      ["R8", "Model performance varies significantly across sites (transferability)", "Technical", "3", "4", "Per-site fine-tuning; per-site accuracy reporting; transparent confidence intervals", "ML Lead"],
      ["R9", "Scope creep with additional indicators or pilot sites", "Operational", "3", "3", "Strict change-control via steering committee; scope additions deferred to scale-up phase", "Project Coord."],
      ["R10", "Funding disbursement delays from sponsors", "Financial", "2", "4", "Front-load procurement in Q1; vendor payment plans; contingency line in budget", "PI"],
    ],
    [5, 30, 13, 5, 5, 35, 7]
  ));
  out.push(body(
    "Risks R1, R3, R5, and R8 are flagged as priority concerns requiring monthly active monitoring. The combination of in-situ data scarcity and model transferability across heterogeneous agro-ecologies is the most significant technical risk; the mitigation strategy combines transfer learning, per-site fine-tuning, and transparent per-site accuracy reporting rather than relying on a single national model. Internet connectivity at remote sites (R3) is addressed through an offline-first sensor design with periodic sync, reducing the system's dependence on continuous connectivity."
  ));

  // ───── 10. M&E and Sustainability ─────
  out.push(h1("10. Monitoring, Evaluation, and Sustainability"));
  out.push(body(
    "The Monitoring and Evaluation (M&E) framework tracks the project against three tiers of indicators: output KPIs (activities completed and products delivered), outcome KPIs (intermediate results such as model accuracy and water savings), and impact KPIs (longer-term changes in farmer adoption and yield improvement). The M&E Officer maintains a living logframe updated quarterly. Table 10.1 summarizes the indicator framework."
  ));
  out.push(tableCaption("Table 10.1 — M&E indicator framework"));
  out.push(makeTable(
    ["Tier", "Indicator", "Target (12 mo)", "Measurement Method"],
    [
      ["Output", "Plots digitized in spatial database", "≥ 600 plots across 3 sites", "PostGIS query count"],
      ["Output", "NPK sensors deployed and active", "≥ 60 sensors", "Firebase heartbeat"],
      ["Output", "UAV flights executed per season", "≥ 4 flights per site per season", "Flight log"],
      ["Output", "Dashboard active users (research institute staff)", "≥ 15", "Analytics login events"],
      ["Outcome", "IWCYS yield prediction R² on held-out set", "≥ 0.80 per site", "Independent ground truth"],
      ["Outcome", "IWSS irrigation water saving vs. baseline", "≥ 20% on instrumented plots", "Water-use records"],
      ["Outcome", "Disease detection precision (CNN)", "≥ 0.85 on validation set", "Annotated test imagery"],
      ["Outcome", "Dashboard decision-support response time", "≤ 2 seconds for map refresh", "Synthetic monitoring"],
      ["Impact", "Yield improvement on pilot plots", "≥ 10% over baseline (3-yr horizon)", "Post-project survey"],
      ["Impact", "Adoption of IWSS recommendations by farmers", "≥ 40% compliance (3-yr horizon)", "Field officer survey"],
      ["Impact", "Scale-up to additional sites", "≥ 3 new sites (Year 2)", "Steering committee review"],
    ],
    [10, 36, 26, 28]
  ));
  out.push(h2("10.1 Sustainability Plan"));
  out.push(body(
    "Sustainability is built into the project design rather than appended as an afterthought. Three pillars underpin sustainability. Institutional sustainability is ensured through counterpart pairing from Month 1: every technical lead is paired with a designated staff member from a partner research institute who shadows development, participates in code reviews, and gradually assumes operational responsibility. By project close, the partner institutes own the deployed system and have trained personnel to operate it. Financial sustainability is supported by the deliberate selection of free-tier and open-source components, minimizing recurring license costs; the projected Year-2 operating cost is approximately USD 35,000, primarily for Firebase paid tier, AWS hosting, sensor maintenance, and a part-time system administrator — well within the operational budget of EIAR. Technical sustainability is reinforced by comprehensive documentation, training materials, and a two-day handover workshop at each site. A scale-up business case is produced in Quarter 4 to inform national rollout under a follow-on project."
  ));

  // ───── 11. Expected Outcomes and Deliverables ─────
  out.push(h1("11. Expected Outcomes and Deliverables"));
  out.push(body(
    "The project delivers four primary outputs that together constitute an operational decision-support ecosystem for irrigated wheat farming in Ethiopia. Each deliverable is described below with its target users and acceptance criteria."
  ));
  out.push(h2("11.1 Comprehensive Spatial Database of Irrigated Wheat Farmlands"));
  out.push(body(
    "A unified PostGIS-backed spatial database consolidating plot boundaries for at least 600 irrigated wheat plots across the three pilot sites, with attribute data on irrigation type, wheat variety, planting date, and prior crop, and integrated ancillary layers (satellite imagery, soil maps, DEM, hydrology, irrigation infrastructure). Target users: research institute staff, extension agents, Ministry of Agriculture planning units. Acceptance criteria: 95% of plots topologically valid, GeoServer WMS/WFS endpoints operational, AOI registry complete and documented."
  ));
  out.push(h2("11.2 Irrigated Wheat Crop Yield Estimation System (IWCYS)"));
  out.push(body(
    "An operational yield estimation system fusing vegetation indices (NDVI, EVI, NDRE, GNDVI, NDMI, LAI) with soil NPK properties and weather data through a dual-branch attention-based model, producing per-plot yield predictions in tonnes per hectare with confidence intervals and attention-based feature attribution. Target users: research institute agronomists, extension agents, MoA policy units. Acceptance criteria: R-squared greater than 0.80 on independent ground truth per site, inference API response time under 2 seconds, attention heatmaps rendered on dashboard."
  ));
  out.push(h2("11.3 Information Products — Maps and Statistics"));
  out.push(body(
    "A portfolio of information products in map and statistical form covering small, medium, and large-scale irrigable irrigated wheat farmlands, including yield forecast maps, soil moisture maps, disease incidence maps, and irrigation recommendation maps, accompanied by summary statistics (mean, distribution, anomaly counts) at AOI, site, and cross-site scales. Target users: decision-makers at research institutes and MoA. Acceptance criteria: products generated at least quarterly with documented methodology, downloadable in PDF and GeoTIFF formats."
  ));
  out.push(h2("11.4 Irrigation Water Scheduling Service (IWSS)"));
  out.push(body(
    "A spatially explicit irrigation scheduling tool that ingests real-time soil moisture, humidity, and NPK data from IoT sensors published to Firebase, combines them with crop evapotranspiration and weather forecasts, and delivers easy-to-understand irrigation recommendations (timing and volume) calibrated to crop development stage. Target users: research institute field staff, extension agents, progressive farmers. Acceptance criteria: recommendations pushed to dashboard within 15 minutes of sensor reading, demonstrated 20% water savings on instrumented plots relative to baseline practice."
  ));

  // ───── 12. Conclusion and Next Steps ─────
  out.push(h1("12. Conclusion and Next Steps"));
  out.push(body(
    "This implementation plan sets out a coherent, deliverable, and sustainable program to operationalize Ethiopia's commitment to modernizing irrigated wheat farming through remote sensing, IoT sensing, and modern artificial intelligence. By concentrating on three pilot agricultural research institutes — Bishoftu, Asella, and Ambo — the project demonstrates end-to-end capability within institutional settings that can absorb and extend the system, while producing the spatial database, yield estimation system, irrigation scheduling service, and decision-support dashboard that constitute the four core deliverables. The 12-month timeline, six work packages, indicative budget envelope of USD 480,000 – 620,000, and comprehensive risk and M&E frameworks collectively de-risk execution while preserving the agility to respond to field realities."
  ));
  out.push(body(
    "The project's value proposition extends beyond its immediate outputs. By pairing every technical lead with a counterpart from a partner research institute, by selecting open-source and free-tier technology components, and by documenting the system thoroughly, the project establishes a sustainable operational foundation that the Ethiopian Institute of Agricultural Research and the Ministry of Agriculture can extend without recurring external dependencies. The attention mechanism built into the yield and disease models not only improves prediction accuracy but also produces interpretable heatmaps that bridge the gap between black-box AI and decision-maker trust — a critical adoption factor in agricultural contexts."
  ));
  out.push(h2("12.1 Immediate Next Steps (Pre-Inception)"));
  out.push(bullet("Secure formal sign-off of this implementation plan by the Ministry of Agriculture and the three partner research institutes (target: 2 weeks from plan approval)."));
  out.push(bullet("Initiate procurement of NPK soil sensors (60 units), the UAV platform with multispectral payload, and 3 handheld GNSS receivers (target: orders placed within 4 weeks)."));
  out.push(bullet("Recruit the Co-PI / Project Coordinator, GIS Specialist, and Field Coordinators (target: signed contracts within 6 weeks)."));
  out.push(bullet("Set up the Firebase project and provision Copernicus Data Space Ecosystem and Google Earth Engine access (target: within 3 weeks)."));
  out.push(bullet("Initiate UAV flight authorization with the Ethiopian Civil Aviation Authority through EIAR sponsorship (target: application filed within 4 weeks)."));
  out.push(bullet("Schedule the project inception meeting with the steering committee and partner institute directors (target: within 8 weeks)."));
  out.push(h2("12.2 Longer-Term Vision"));
  out.push(body(
    "Beyond the pilot, the project positions Ethiopia to scale the IWCYS-IWSS ecosystem to additional irrigated wheat zones in Oromia, Amhara, SNNPR, and Tigray, and to extend the same architecture to other priority crops such as teff, maize, and barley. The scale-up business case to be produced in Quarter 4 will quantify the marginal cost per additional site, the projected aggregate impact on national wheat production and import substitution, and the institutional arrangements required for sustained national ownership. The vision is of an Ethiopian agricultural decision-support ecosystem that is locally built, institutionally anchored, technologically current, and responsive to the data-driven modernization agenda set by the Government of Ethiopia."
  ));

  return out;
}

module.exports = { buildFrontMatter, buildBody };
