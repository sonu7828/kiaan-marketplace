# Kiaan Marketplace — Project Rules for AI & Developers

**Version:** 1.1  
**Date:** 2026-09-28  
**Status:** Authoritative Working Rules  
**Product:** Kiaan Marketplace  
**Owner:** Kiaan Technology Pvt Ltd  
**Repository:** Single-vendor showcase storefront (`d:\KIAAN\Kiaan MarketPlace`)

---

## Contents

1. [Project Identity & Core Mission](#1-project-identity--core-mission)
2. [Source of Truth Hierarchy](#2-source-of-truth-hierarchy)
3. [Scope & Change Control Rules](#3-scope--change-control-rules)
4. [Coding Standards & Conventions](#4-coding-standards--conventions)
5. [UI/UX & Design Token Rules](#5-uiux--design-token-rules)
6. [Data Integrity & Claims Constraints](#6-data-integrity--claims-constraints)
7. [Security & Isolation Rules](#7-security--isolation-rules)
8. [Required Implementation Workflow](#8-required-implementation-workflow)
9. [Completion Report Requirements](#9-completion-report-requirements)

---

## 1. Project Identity & Core Mission

- **Product Name:** Kiaan Marketplace
- **Company:** Kiaan Technology Pvt Ltd
- **Business Model:** Strictly **Single-Vendor** Software Marketplace
- **Primary Mission:** Showcase Kiaan's proprietary business software products, enable visitors to evaluate real live demos safely, review functional capabilities in plain English, and request custom quotes.
- **Public Entry Rule:** The default route (`/`) must always serve the public showcase homepage. Under no circumstances may an administrative console or demo-management dashboard be rendered on the public website.

---

## 2. Source of Truth Hierarchy

Before initiating any development or documentation task, consult the documentation in this strict order:
1. `PRD.md` — Authoritative requirements, scope matrix, and acceptance criteria.
2. `USER_FLOW.md` — Validated user journeys, interaction diagrams, and exception states.
3. `ARCHITECTURE.md` — Component hierarchy, data contracts, and technology stack.
4. `PROJECT_RULES.md` — This file (developer constraints, coding standards, and change rules).
5. Active Codebase — Inspect existing files (`src/data/products.js`, `src/App.jsx`, `src/index.css`) to verify actual implementation evidence.

> [!IMPORTANT]
> If verified code or a new explicit instruction from the project owner conflicts with existing documentation, update the relevant documentation immediately to reflect reality rather than silently guessing or making assumptions.

---

## 3. Scope & Change Control Rules

1. **Strictly Single-Vendor:** Never introduce multi-vendor features, seller onboarding forms, merchant commission logic, or third-party store dashboards.
2. **No Public Admin Dashboard:** Do not create or mount an Admin Console on the public website. Public visitors must never see management controls or demo CRUD forms.
3. **Canonical Catalog Store:** All software products and their live demo links must reside centrally in `src/data/products.js`. Do not create secondary or hardcoded product lists.
4. **Preserve Tech Stack:** Maintain the existing React 19 + Vite 8 setup. Do not migrate frameworks (e.g. Next.js, Remix) or switch styling frameworks without explicit written authorization.
5. **No Unrelated Refactoring:** Focus exclusively on the approved task scope. Do not rewrite working components, rewrite CSS utility classes, or rearrange unrelated files.
6. **No Unrequested Files:** Do not generate extra documentation files, temporary folders, or image assets unless explicitly requested.

---

## 4. Coding Standards & Conventions

1. **Component Design:** Keep React components modular, reusable, and cleanly separated between presentation and data access.
2. **Data Access via Service:** Consume product data via `src/services/productService.js` rather than importing raw arrays across multiple components.
3. **Clean URL & Hash Handling:** Respect the hash-based routing conventions established in `src/App.jsx` (`#product/:slug`). Ensure all product slugs are lower-case and URL-safe.
4. **Zero Bundled Secrets:** Never place API keys, private tokens, or database passwords in frontend code.
5. **Linting & Type Safety:** Ensure code passes `npm run build` and `oxlint` cleanly with zero breaking errors.
6. **No Phantom Claims:** Do not claim tests or builds passed without having actually executed them in the environment.

---

## 5. UI/UX & Design Token Rules

1. **Approved Design Direction:** Follow the **Warm Authority** design language:
   - Page Background: Warm off-white (`#F8F7F4` / `var(--bg-canvas)`)
   - Surface Cards: Pure white (`#FFFFFF` / `var(--bg-surface)`)
   - Primary Typography: Deep charcoal (`#1A1A1A` / `var(--text-primary)`)
   - Accent & Brand Highlights: Gold / Amber (`#D4A017` / `#B8860B` / `var(--accent-gold)`)
   - Border Radius: Moderate (`6px` / `var(--radius-md)`)
   - Footer: Deep charcoal (`#111111`)
2. **Plain Business English:** Write for business owners, corporate executives, and operations managers. Explain customer benefits first. Avoid unexplained engineering jargon.
3. **Dedicated Tech Specs:** Isolate technical details (databases, server environments, containerization) into a clearly labeled "Technical Information" tab or section.
4. **Responsive Integrity:** Test and ensure layout perfection from 320px (mobile) to 1920px (desktop). Zero horizontal scrolling, clipped labels, or overlapping interactive buttons.

---

## 6. Data Integrity & Claims Constraints

1. **No Invented Products or Prices:** Never invent fake product names, prices, discounts, or currencies.
2. **Unapproved Pricing Rule:** If commercial pricing is unapproved or customized, display:
   ```
   "Contact for Pricing"
   ```
3. **No Fake Demo Links:** Never hardcode `localhost` links, placeholder URLs, or mock environments.
4. **Demo Unavailable Rule:** When a product does not yet have a hosted live demo URL, the UI must honestly display:
   ```
   "Demo Coming Soon"
   ```
   The demo action button must be disabled or replaced with this notice.
5. **No Fabricated Social Proof:** Never display fake user counts, fabricated uptime percentages (e.g. "99.999% SLA"), or non-existent client testimonials.

---

## 7. Security & Isolation Rules

1. **Safe External Navigation:** All external demo and media links must open in a new tab with strict isolation attributes:
   ```jsx
   <a href={product.demoUrl} target="_blank" rel="noopener noreferrer">
   ```
2. **Demo Access Credentials:** If credentials are provided for demo evaluation, they must be intentionally approved public sandbox credentials with read-only or self-resetting privileges.
3. **Server-Side Authority (Planned Features):**
   - Software licensing validity and token signing belong exclusively to the backend server.
   - Payment success must be verified via server-to-server webhook signatures, never by the client redirect URL alone.
   - File downloads must use authenticated, short-lived presigned URLs.

---

## 8. Required Implementation Workflow

Every feature or bugfix task must follow this 7-step sequence:
1. **Review Documentation:** Read `PRD.md`, `USER_FLOW.md`, `ARCHITECTURE.md`, and `PROJECT_RULES.md`.
2. **Inspect Existing Code:** Inspect the relevant components, data files, and routes before modifying anything.
3. **Formulate Plan:** Outline the exact changes and verify alignment with the single-vendor public showcase scope.
4. **Execute Scoped Changes:** Implement only the approved files without touching unrelated code.
5. **Verify Build Health:** Run `npm run build` to ensure bundle compilation succeeds with code 0.
6. **Verify Visual & Functional Quality:** Validate responsiveness, external demo behavior, and console output.
7. **Synchronize Documentation:** Update the four core documentation files if requirements, architecture, or flows were updated.

---

## 9. Completion Report Requirements

Every task completion report must explicitly include:
- **Files Created or Updated:** Full list of affected files with brief rationale.
- **Existing Implementation Findings:** Summary of verified code structures and architecture.
- **Code vs. Documentation Conflicts Resolved:** Clarification of any discrepancies identified and corrected.
- **Pending Decisions Requiring User Input:** Concrete questions requiring stakeholder decisions.
- **Confirmation of Source Code Preservation:** Explicit statement confirming application source code was preserved as required.

