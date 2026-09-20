// ============================================================================
// Implementation Plan — IWCYES & IWSS Project (Ethiopia)
// Generates a Word document using docx-js with R4 cover + FG-1 palette
// ============================================================================

const {
  Document, Packer, Paragraph, TextRun, Header, Footer, PageNumber,
  AlignmentType, HeadingLevel, NumberFormat, SectionType, PageBreak,
  Table, TableRow, TableCell, TableLayoutType, WidthType,
  BorderStyle, ShadingType, TableOfContents, LevelFormat,
} = require("docx");
const fs = require("fs");

// ----------------------------------------------------------------------------
// PALETTE — FG-1 Forest Mint (agriculture / sustainability)
// ----------------------------------------------------------------------------
const P = {
  bg: "0C1F1A",
  primary: "0C1F1A",
  body: "1A2A28",
  secondary: "5B6B5D",
  accent: "2A7A65",
  surface: "EDF5F2",
  cover: {
    titleColor: "FFFFFF",
    subtitleColor: "B0B8C0",
    metaColor: "90989F",
    footerColor: "687078",
  },
  table: {
    headerBg: "2A7A65",
    headerText: "FFFFFF",
    accentLine: "2A7A65",
    innerLine: "C5D8D0",
    surface: "EDF5F2",
  },
};

// ----------------------------------------------------------------------------
// BORDERS
// ----------------------------------------------------------------------------
const NB = { style: BorderStyle.NONE, size: 0, color: "FFFFFF" };
const noBorders = { top: NB, bottom: NB, left: NB, right: NB };
const allNoBorders = {
  top: NB, bottom: NB, left: NB, right: NB,
  insideHorizontal: NB, insideVertical: NB,
};

// ----------------------------------------------------------------------------
// HELPERS
// ----------------------------------------------------------------------------
function safeText(v, placeholder) {
  if (v === undefined || v === null || v === "" || String(v) === "NaN" || String(v) === "undefined") {
    return placeholder || "【Please fill in】";
  }
  return String(v);
}

function emptyPara() {
  return new Paragraph({ children: [] });
}

// ---- Title layout helpers (from design-system.md) ----
function splitTitleLines(title, charsPerLine) {
  if (title.length <= charsPerLine) return [title];
  const breakAfter = new Set([
    ...'，。、；：！？',
    ...'的与和及之在于为',
    ...'-_—–·/',
    ...' \t',
  ]);
  const lines = [];
  let remaining = title;
  while (remaining.length > charsPerLine) {
    let breakAt = -1;
    for (let i = charsPerLine; i >= Math.floor(charsPerLine * 0.6); i--) {
      if (i < remaining.length && breakAfter.has(remaining[i - 1])) { breakAt = i; break; }
    }
    if (breakAt === -1) {
      const limit = Math.min(remaining.length, Math.ceil(charsPerLine * 1.3));
      for (let i = charsPerLine + 1; i < limit; i++) {
        if (breakAfter.has(remaining[i - 1])) { breakAt = i; break; }
      }
    }
    if (breakAt === -1) {
      breakAt = charsPerLine;
      const prevChar = remaining[breakAt - 1];
      const nextChar = remaining[breakAt];
      if (prevChar && nextChar &&
          !breakAfter.has(prevChar) && !breakAfter.has(nextChar) &&
          /[\u4e00-\u9fff]/.test(prevChar) && /[\u4e00-\u9fff]/.test(nextChar)) {
        breakAt = breakAt - 1;
      }
    }
    lines.push(remaining.slice(0, breakAt).trim());
    remaining = remaining.slice(breakAt).trim();
  }
  if (remaining) lines.push(remaining);
  if (lines.length > 1 && lines[lines.length - 1].length <= 2) {
    const last = lines.pop();
    lines[lines.length - 1] += last;
  }
  return lines;
}

function calcTitleLayout(title, maxWidthTwips, preferredPt = 40, minPt = 24) {
  const charWidth = (pt) => pt * 20;
  const charsPerLine = (pt) => Math.floor(maxWidthTwips / charWidth(pt));
  let titlePt = preferredPt;
  let lines;
  while (titlePt >= minPt) {
    const cpl = charsPerLine(titlePt);
    if (cpl < 2) { titlePt -= 2; continue; }
    lines = splitTitleLines(title, cpl);
    if (lines.length <= 3) break;
    titlePt -= 2;
  }
  if (!lines || lines.length > 3) {
    const cpl = charsPerLine(minPt);
    lines = splitTitleLines(title, cpl);
    titlePt = minPt;
  }
  return { titlePt, titleLines: lines };
}

// ----------------------------------------------------------------------------
// COVER — R4 Top Color Block with FG-1 palette
// ----------------------------------------------------------------------------
function buildCoverR4(config) {
  const padL = 1200, padR = 800;
  const availableWidth = 11906 - padL - padR;
  const { titlePt, titleLines } = calcTitleLayout(config.title, availableWidth, 40, 26);
  const titleSize = titlePt * 2;

  const titleBlockHeight = titleLines.length * (titlePt * 23 + 200);
  const englishLabelH = config.englishLabel ? (9 * 23 + 500) : 0;
  const subtitleH = config.subtitle ? (12 * 23 + 200) : 0;
  const upperContentH = englishLabelH + titleBlockHeight + subtitleH;
  const UPPER_MIN = 7500;
  const UPPER_H = Math.max(UPPER_MIN, upperContentH + 1500 + 800);
  const DIVIDER_H = 60;

  const contentEstimate =
    (config.englishLabel ? (9 * 23 + 500) : 0) +
    titleLines.length * (titlePt * 23 + 200) +
    (config.subtitle ? (12 * 23 + 200) : 0);
  const spacerIntrinsic = 280;
  const topSpacing = Math.max(UPPER_H - contentEstimate - spacerIntrinsic - 800, 400);

  const upperBlock = new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    layout: TableLayoutType.FIXED,
    borders: allNoBorders,
    rows: [new TableRow({
      height: { value: UPPER_H, rule: "exact" },
      children: [new TableCell({
        shading: { type: ShadingType.CLEAR, fill: P.bg }, borders: noBorders,
        verticalAlign: "top",
        margins: { left: padL, right: padR },
        children: [
          new Paragraph({ spacing: { before: topSpacing } }),
          config.englishLabel ? new Paragraph({
            spacing: { after: 500, line: Math.ceil(9 * 23), lineRule: "atLeast" },
            children: [new TextRun({
              text: config.englishLabel.split("").join(" "),
              size: 18, color: P.accent, font: { ascii: "Calibri" }, characterSpacing: 60,
            })],
          }) : null,
          ...titleLines.map((line, i) => new Paragraph({
            spacing: { after: i < titleLines.length - 1 ? 100 : 200,
                       line: Math.ceil(titlePt * 23), lineRule: "atLeast" },
            children: [new TextRun({
              text: line, size: titleSize, bold: true,
              color: P.cover.titleColor, font: { eastAsia: "SimHei", ascii: "Arial" },
            })],
          })),
          config.subtitle ? new Paragraph({
            spacing: { after: 100, line: Math.ceil(12 * 23), lineRule: "atLeast" },
            children: [new TextRun({
              text: config.subtitle, size: 24, color: P.cover.subtitleColor,
              font: { eastAsia: "Microsoft YaHei", ascii: "Arial" },
            })],
          }) : null,
        ].filter(Boolean),
      })],
    })],
  });

  const divider = new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: allNoBorders,
    rows: [new TableRow({
      height: { value: DIVIDER_H, rule: "exact" },
      children: [new TableCell({
        borders: noBorders,
        shading: { type: ShadingType.CLEAR, fill: P.accent },
        children: [emptyPara()],
      })],
    })],
  });

  const lowerContent = [
    new Paragraph({ spacing: { before: 800 } }),
    ...(config.metaLines || []).map(line => new Paragraph({
      indent: { left: padL }, spacing: { after: 100 },
      children: [new TextRun({
        text: line, size: 28, color: "303030",
        font: { eastAsia: "Microsoft YaHei", ascii: "Arial" },
      })],
    })),
    new Paragraph({ spacing: { before: 2000 } }),
    new Paragraph({
      indent: { left: padL },
      children: [
        new TextRun({ text: config.footerLeft || "", size: 22, color: "909090" }),
        new TextRun({ text: "          " }),
        new TextRun({ text: config.footerRight || "", size: 22, color: "909090" }),
      ],
    }),
  ];

  return [new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    layout: TableLayoutType.FIXED,
    borders: allNoBorders,
    rows: [new TableRow({
      height: { value: 16838, rule: "exact" },
      children: [new TableCell({
        shading: { type: ShadingType.CLEAR, fill: "FFFFFF" }, borders: noBorders,
        verticalAlign: "top",
        children: [upperBlock, divider, ...lowerContent],
      })],
    })],
  })];
}

// ----------------------------------------------------------------------------
// BODY COMPONENT BUILDERS
// ----------------------------------------------------------------------------
const FONT_HEADING = { ascii: "Times New Roman", eastAsia: "SimHei" };
const FONT_BODY = { ascii: "Times New Roman", eastAsia: "SimSun" };

function h1(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 360, after: 180, line: 360, lineRule: "atLeast" },
    children: [new TextRun({ text, bold: true, size: 32, color: P.primary, font: FONT_HEADING })],
  });
}

function h2(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 280, after: 140, line: 312 },
    children: [new TextRun({ text, bold: true, size: 28, color: P.primary, font: FONT_HEADING })],
  });
}

function h3(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_3,
    spacing: { before: 220, after: 100, line: 312 },
    children: [new TextRun({ text, bold: true, size: 26, color: P.primary, font: FONT_HEADING })],
  });
}

function body(text, opts = {}) {
  return new Paragraph({
    alignment: AlignmentType.JUSTIFIED,
    indent: { firstLine: 480 },
    spacing: { line: 312, after: 100 },
    children: [new TextRun({
      text: safeText(text, ""),
      size: 24, color: P.body, font: FONT_BODY,
    })],
    ...opts,
  });
}

function bodyNoIndent(text) {
  return new Paragraph({
    alignment: AlignmentType.JUSTIFIED,
    spacing: { line: 312, after: 100 },
    children: [new TextRun({ text: safeText(text, ""), size: 24, color: P.body, font: FONT_BODY })],
  });
}

function bullet(text) {
  return new Paragraph({
    bullet: { level: 0 },
    spacing: { line: 312, after: 80 },
    children: [new TextRun({ text: safeText(text, ""), size: 24, color: P.body, font: FONT_BODY })],
  });
}

function bulletBold(label, rest) {
  return new Paragraph({
    bullet: { level: 0 },
    spacing: { line: 312, after: 80 },
    children: [
      new TextRun({ text: label, size: 24, bold: true, color: P.primary, font: FONT_BODY }),
      new TextRun({ text: rest, size: 24, color: P.body, font: FONT_BODY }),
    ],
  });
}

function tableCaption(text) {
  return new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 120, after: 120, line: 312 },
    keepNext: true,
    children: [new TextRun({ text, italics: true, size: 21, color: P.secondary, font: FONT_BODY })],
  });
}

function makeTableCell(text, opts = {}) {
  const { isHeader = false, align = AlignmentType.LEFT, bold = false } = opts;
  return new TableCell({
    margins: { top: 100, bottom: 100, left: 120, right: 120 },
    shading: isHeader
      ? { type: ShadingType.CLEAR, fill: P.table.headerBg }
      : (opts.altRow ? { type: ShadingType.CLEAR, fill: P.table.surface } : undefined),
    children: [new Paragraph({
      alignment: align,
      spacing: { line: 280 },
      children: [new TextRun({
        text: safeText(text, ""),
        size: 21,
        bold: isHeader || bold,
        color: isHeader ? P.table.headerText : P.body,
        font: isHeader ? FONT_HEADING : FONT_BODY,
      })],
    })],
  });
}

function makeTable(headers, rows, colWidths = null) {
  const colCount = headers.length;
  const widths = colWidths || Array(colCount).fill(Math.floor(100 / colCount));

  const headerRow = new TableRow({
    tableHeader: true,
    cantSplit: true,
    children: headers.map(h => makeTableCell(h, { isHeader: true, align: AlignmentType.CENTER })),
  });

  const dataRows = rows.map((row, idx) => new TableRow({
    cantSplit: true,
    children: row.map(cell => makeTableCell(cell, { altRow: idx % 2 === 1 })),
  }));

  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    layout: TableLayoutType.FIXED,
    columnWidths: widths.map(w => Math.round(w * 11906 / 100 * 0.85)),
    borders: {
      top:    { style: BorderStyle.SINGLE, size: 6, color: P.accent },
      bottom: { style: BorderStyle.SINGLE, size: 6, color: P.accent },
      left:   { style: BorderStyle.SINGLE, size: 4, color: P.table.innerLine },
      right:  { style: BorderStyle.SINGLE, size: 4, color: P.table.innerLine },
      insideHorizontal: { style: BorderStyle.SINGLE, size: 2, color: P.table.innerLine },
      insideVertical:   { style: BorderStyle.SINGLE, size: 2, color: P.table.innerLine },
    },
    rows: [headerRow, ...dataRows],
  });
}

// ----------------------------------------------------------------------------
// FOOTER builder — page numbers only (no "Page X of Y")
// ----------------------------------------------------------------------------
function pageFooter() {
  return new Footer({
    children: [new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [new TextRun({
        children: [PageNumber.CURRENT],
        size: 18, color: "808080", font: { ascii: "Times New Roman" },
      })],
    })],
  });
}

function headerBar(text) {
  return new Header({
    children: [new Paragraph({
      alignment: AlignmentType.RIGHT,
      children: [new TextRun({
        text, size: 18, color: "808080", font: { ascii: "Times New Roman" },
      })],
    })],
  });
}

// ============================================================================
// CONTENT — pulled in from content modules
// ============================================================================
const contentSections = require("./plan_content.js");

// ============================================================================
// DOCUMENT ASSEMBLY
// ============================================================================
const pageSize = { width: 11906, height: 16838 };
const pageMargin = { top: 1440, bottom: 1440, left: 1701, right: 1417 };

const coverConfig = {
  title: "Implementation Plan",
  subtitle: "Remote Sensing-Enabled Decision Support System for Irrigated Wheat Farming in Ethiopia (IWCYES & IWSS)",
  englishLabel: "ETHIOPIAN AGRICULTURE",
  metaLines: [
    "Project: Irrigated Wheat Crop Yield Estimation System (IWCYES)",
    "Sub-project: Irrigation Water Scheduling Service (IWSS)",
    "Pilot Sites: Bishoftu, Asella, Ambo Agricultural Research Institutes",
    "Document Version: 1.0 (Final Draft)",
    "Date: September 2026",
    "Prepared for: Ethiopian Ministry of Agriculture & Pilot Research Institutes",
    "Prepared by: IWCYES-IWSS Project Team",
  ],
  footerLeft: "Confidential — For Internal Use",
  footerRight: "Ethiopia 2026",
};

const doc = new Document({
  creator: "IWCYES-IWSS Project Team",
  title: "Implementation Plan — IWCYES & IWSS",
  description: "Remote sensing-enabled decision support system for irrigated wheat farming in Ethiopia",
  styles: {
    default: {
      document: {
        run: { font: FONT_BODY, size: 24, color: P.body },
        paragraph: { spacing: { line: 312 } },
      },
    },
    paragraphStyles: [
      {
        id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal",
        quickFormat: true,
        run: { font: FONT_HEADING, size: 32, bold: true, color: P.primary },
        paragraph: { spacing: { before: 360, after: 180, line: 360, lineRule: "atLeast" }, outlineLevel: 0 },
      },
      {
        id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal",
        quickFormat: true,
        run: { font: FONT_HEADING, size: 28, bold: true, color: P.primary },
        paragraph: { spacing: { before: 280, after: 140, line: 312 }, outlineLevel: 1 },
      },
      {
        id: "Heading3", name: "Heading 3", basedOn: "Normal", next: "Normal",
        quickFormat: true,
        run: { font: FONT_HEADING, size: 26, bold: true, color: P.primary },
        paragraph: { spacing: { before: 220, after: 100, line: 312 }, outlineLevel: 2 },
      },
    ],
  },
  sections: [
    // ── Section 1: Cover — no header/footer, no page number ──
    {
      properties: {
        page: {
          size: pageSize,
          margin: { top: 0, bottom: 0, left: 0, right: 0 },
        },
      },
      children: buildCoverR4(coverConfig),
    },
    // ── Section 2: Front matter (TOC) — Roman numerals starting at I ──
    {
      properties: {
        type: SectionType.NEXT_PAGE,
        page: {
          size: pageSize,
          margin: pageMargin,
          pageNumbers: { start: 1, formatType: NumberFormat.UPPER_ROMAN },
        },
      },
      headers: { default: headerBar("IWCYES & IWSS Implementation Plan") },
      footers: { default: pageFooter() },
      children: contentSections.buildFrontMatter({ h1, h2, h3, body, bodyNoIndent, bullet, bulletBold, tableCaption, makeTable, P, AlignmentType, Paragraph, TextRun, TableOfContents, PageBreak }),
    },
    // ── Section 3: Body — Arabic numerals starting at 1 ──
    {
      properties: {
        type: SectionType.NEXT_PAGE,
        page: {
          size: pageSize,
          margin: pageMargin,
          pageNumbers: { start: 1, formatType: NumberFormat.DECIMAL },
        },
      },
      headers: { default: headerBar("IWCYES & IWSS Implementation Plan") },
      footers: { default: pageFooter() },
      children: contentSections.buildBody({ h1, h2, h3, body, bodyNoIndent, bullet, bulletBold, tableCaption, makeTable, P, AlignmentType, Paragraph, TextRun, TableOfContents, PageBreak }),
    },
  ],
});

// ----------------------------------------------------------------------------
// WRITE OUTPUT
// ----------------------------------------------------------------------------
const outputPath = "/home/z/my-project/download/IWCYES_IWSS_Implementation_Plan.docx";
Packer.toBuffer(doc).then(buf => {
  fs.writeFileSync(outputPath, buf);
  console.log("✓ Document generated:", outputPath);
  console.log("  Size:", (buf.length / 1024).toFixed(1), "KB");
}).catch(err => {
  console.error("✗ Generation failed:", err);
  process.exit(1);
});
