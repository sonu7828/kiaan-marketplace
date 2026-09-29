# Kiaan Marketplace — Product Requirements Document (PRD)

**Version:** 1.1  
**Date:** 2026-09-28  
**Status:** Authoritative Source of Truth — Approved Working Baseline  
**Product:** Kiaan Marketplace  
**Owner:** Kiaan Technology Pvt Ltd  
**Repository:** Single-vendor showcase storefront (`d:\KIAAN\Kiaan MarketPlace`)

---

## Contents

1. [Executive Summary & Product Overview](#1-executive-summary--product-overview)
2. [Vision, Goals & Core Principles](#2-vision-goals--core-principles)
3. [Users and Roles](#3-users-and-roles)
4. [Status Matrix: Confirmed vs. Implemented vs. Planned vs. Pending](#4-status-matrix)
5. [Detailed Functional Requirements (FR)](#5-detailed-functional-requirements-fr)
6. [Catalog & Data Requirements](#6-catalog--data-requirements)
7. [Non-Functional & Quality Requirements](#7-non-functional--quality-requirements)
8. [Explicitly Out of Scope](#8-explicitly-out-of-scope)
9. [Pending Decisions Requiring Stakeholder Input](#9-pending-decisions-requiring-stakeholder-input)
10. [Acceptance Criteria](#10-acceptance-criteria)

---

## 1. Executive Summary & Product Overview

Kiaan Marketplace is a **single-vendor software marketplace and public showcase platform** owned and operated exclusively by **Kiaan Technology Pvt Ltd**.

### Key Business Purpose
- **Public Showcase:** Present Kiaan's proprietary business software products (ERPs, CRMs, HRMS, WMS, POS, AI automation engines) to prospective corporate buyers.
- **Evaluation Journey:** Enable visitors to understand product capabilities in plain business English, view verified screenshots/media, and launch live interactive demos hosted on external environments.
- **Inquiry & Customization:** Provide a clear path for enterprise buyers to request software customizations, private walkthroughs, and commercial quotes.
- **Future Platform Blueprint:** Serve as the public discovery layer for upcoming customer portal accounts, verified digital order fulfillment, secure binary distribution, and server-side license token management.

### Critical Operating Constraints
- **Strictly Single-Vendor:** The marketplace exclusively features software developed and supported by Kiaan Technology. There is **no multi-vendor onboarding, seller dashboard, or third-party commission model**.
- **No Public Admin Dashboard:** Public visitors must never see administrative, demo management, or CRUD controls. Catalog maintenance is conducted through internal engineering workflows via `src/data/products.js`.
- **Honest Claims & Demos:** Demos must open only real, verified external URLs in new tabs. If a demo environment is unavailable, the UI must honestly state **"Demo Coming Soon"** without mock links or localhost redirects. Pricing without confirmed commercial approval must state **"Contact for Pricing"**.

---

## 2. Vision, Goals & Core Principles

### Core Objectives
1. **Frictionless Product Discovery:** Enable business leaders to find relevant solutions within 2 clicks using category navigation, industry filters, or keyword search.
2. **Transparent Evaluation:** Provide immediate clarity on software features, modules, deployment options, and live demo availability.
3. **Enterprise Credibility:** Eliminate developer jargon, fake metric counters, unverified uptime claims, and placeholder pricing.
4. **Maintainable Catalog:** Centralize all product metadata in a single, structured source of truth (`src/data/products.js`) to allow rapid updates without touching layout code.

### Core Principles
- **Clarity over Complexity:** Plain language explaining business benefits first, with technical hosting requirements neatly isolated in a dedicated technical specifications tab.
- **Integrity over Hype:** Zero fabricated customer counts, star ratings, or security claims.

---

## 3. Users and Roles

| Role | Environment | Key Needs & Responsibilities |
| :--- | :--- | :--- |
| **Visitor / Prospective Buyer** | Public Website (`/`) | Discover software products, browse categories/industries, evaluate live demos/walkthroughs, review module lists, and submit customization or quote inquiries. |
| **Verified Customer** | Customer Portal *(Planned)* | Log in to view purchased software licenses, access downloadable release packages, request domain activations/transfers, review invoices, and open support tickets. |
| **Kiaan Operations / Administrator** | Internal Workspace | Maintain product descriptions, update demo links, configure approved pricing, and manage incoming quote inquiries via internal tools/version control. |
| **License Client / Deployed Software** | Remote Customer Servers *(Planned)* | Validate cryptographic license tokens periodically against the Kiaan licensing service with an approved offline grace policy. |

---

## 4. Status Matrix

To maintain total architectural clarity, all features and capabilities are categorized into one of four distinct states:

```
[CONFIRMED REQUIREMENT] ──► [ALREADY IMPLEMENTED] ──► Verified in React 19 Frontend
                        └──► [PLANNED FUNCTIONALITY] ──► Scheduled for Backend/Platform Phase
                        └──► [PENDING DECISION]      ──► Requires Stakeholder Confirmation
```

### 4.1 Confirmed Requirements
- Single-vendor software marketplace for Kiaan Technology Pvt Ltd.
- Public root route (`/`) serves the customer-facing showcase homepage.
- Product detail pages display plain-English summaries, features, modules, screenshots, and technical specs.
- Missing demo URLs display a disabled "Demo Coming Soon" badge; valid HTTP(S) links launch externally in a new tab with `rel="noopener noreferrer"`.
- Product pricing displays "Contact for Pricing" unless explicitly confirmed.
- Responsive design supporting viewports from 320px to 1920px.
- Centralized product catalog managed via `src/data/products.js`.

### 4.2 Already Implemented Functionality (Verified in Code)
- **FR-01:** Default public homepage at `/` with hero banner, category navigation, catalog search, featured products, industry solutions, and FAQ.
- **FR-02:** Real-time catalog filtering by category pills, search query, and industry tags in `FeaturedSoftware.jsx`.
- **FR-03:** Hash-based routing to dedicated Product Detail Pages (`#product/:slug`) with multi-tab interface (Overview, Features, Modules, Technical Specs).
- **FR-04:** External demo launching with validation: opens external URL safely or displays "Demo Coming Soon" fallback.
- **FR-05:** Screenshot gallery with active preview switching and optional demo video button.
- **FR-06:** Pricing displays "Contact for Pricing" and unapproved licensing notes; zero invented prices.
- **FR-07:** Interactive Custom Quote & Customization Modal (`CustomQuoteModal.jsx`) prefilled with product or service title.
- **FR-08:** Complete removal of Admin Console from public routes, navigation, and header.

### 4.3 Planned Functionality (Next Phases)
- **PL-01:** Customer account authentication (registration, login, password recovery, session handling).
- **PL-02:** Backend payment gateway integration (Razorpay / Stripe) with server-side webhook signature verification.
- **PL-03:** Automated order generation, tax/GST invoicing, and customer payment receipts.
- **PL-04:** Customer Portal dashboard for managing purchased software, active licenses, and support requests.
- **PL-05:** Secure software binary distribution via authenticated, time-limited presigned URLs (AWS S3 / Cloudflare R2).
- **PL-06:** Centralized licensing authority issuing signed cryptographic tokens with domain binding and offline validation policy.
- **PL-07:** Backend persistence layer (Node.js/Express API connected to MySQL database).
- **PL-08:** Server-side inquiry forwarding to company email or CRM webhook (e.g. HubSpot, Zoho, or Slack).

### 4.4 Pending Decisions (Awaiting Stakeholder Input)
- See [Section 9: Pending Decisions Requiring Stakeholder Input](#9-pending-decisions-requiring-stakeholder-input).

---

## 5. Detailed Functional Requirements (FR)

| ID | Feature / Requirement | Scope | Status | Implementation Evidence |
| :--- | :--- | :--- | :--- | :--- |
| **FR-01** | **Public Homepage Entry**<br>Root route `/` loads public showcase with search, categories, and catalog. | Public Web | **Implemented & Verified** | `src/App.jsx` defaults `currentView` to `'home'`; `AdminPanel` removed from routes. |
| **FR-02** | **Catalog Search & Filtering**<br>Instant keyword search and category filtering across all products. | Public Web | **Implemented & Verified** | `src/components/FeaturedSoftware.jsx` filters `products` state in real time. |
| **FR-03** | **Product Detail Routing**<br>Direct access via `#product/:slug` with full specs, media, and tabs. | Public Web | **Implemented & Verified** | `src/components/ProductDetailPage.jsx` synchronized via window hash listener. |
| **FR-04** | **Safe External Demo Launch**<br>Valid URL opens in new tab; empty URL shows "Demo Coming Soon". | Public Web | **Implemented & Verified** | Verified in `FeaturedSoftware.jsx` (lines 150-162) and `ProductDetailPage.jsx` (lines 369-385). |
| **FR-05** | **Media & Screenshot Gallery**<br>Cover images, screenshot carousel/thumbnails, and video button. | Public Web | **Implemented & Verified** | `ProductDetailPage.jsx` renders `screenshots` array and conditional `demoVideoUrl`. |
| **FR-06** | **Transparent Pricing State**<br>Shows "Contact for Pricing" when unapproved; no fake figures. | Public Web | **Implemented & Verified** | `src/data/products.js` has `isApproved: false` and `priceDisplay: 'Contact for Pricing'`. |
| **FR-07** | **Customization Inquiry Modal**<br>Modal form for custom quotes prefilled with product title. | Public Web | **Implemented in Frontend** | `src/components/CustomQuoteModal.jsx` handles validation and modal feedback. |
| **FR-08** | **Catalog Data Service**<br>Centralized data querying and slug-based lookup. | Data Layer | **Implemented & Verified** | `src/services/productService.js` wraps `src/data/products.js`. |
| **FR-09** | **Customer Authentication**<br>User signup, login, session tokens, and RBAC. | Platform | **Planned** | Backend API & auth service to be implemented. |
| **FR-10** | **Payment & Order Verification**<br>Server-verified payment webhooks; no client-side trust. | Platform | **Planned** | Payment gateway provider and webhook endpoints to be implemented. |
| **FR-11** | **Secure Release Downloads**<br>Private release storage with authorized time-bound links. | Platform | **Planned** | Object storage (S3/R2) and signed URL generator to be implemented. |
| **FR-12** | **Central Licensing Engine**<br>Cryptographic token generation, domain activation & grace checks. | Platform | **Planned** | Server-side license manager to be implemented. |
| **FR-13** | **Administrative Audit Trail**<br>Immutable logs for license re-keys, domain transfers, and refunds. | Platform | **Planned** | Server-side audit logging to be implemented. |

---

## 6. Catalog & Data Requirements

### 6.1 Canonical Catalog Location
The canonical catalog resides in:
```
src/data/products.js
```
All product records must conform to the following schema:
- `id` *(String, unique)*: e.g. `'kiaan-erp-enterprise'`
- `slug` *(String, unique, URL-safe)*: e.g. `'kiaan-erp-enterprise'`
- `name` *(String)*: Approved product title
- `category` *(String)*: Display category name
- `categoryId` *(String)*: Category identifier (`'erp'`, `'crm'`, `'hrms'`, `'inventory'`, `'pos'`, `'automation'`)
- `shortDesc` *(String)*: 1-2 sentence plain-language summary for catalog cards
- `fullDesc` *(String)*: Multi-paragraph detailed software overview
- `demoUrl` *(String)*: Real external HTTPS URL, or `''` if pending
- `demoVideoUrl` *(String)*: Video link (YouTube/Vimeo/MP4), or `''` if none
- `screenshots` *(Array of `{ url, caption }`)*: Real interface imagery
- `features` *(Array of Strings)*: Bulleted list of verified business capabilities
- `modules` *(Array of Strings)*: List of core functional modules
- `whoShouldUse` *(String)*: Target enterprise profile and industry fit
- `techStack` *(String)*: Plain-English hosting and technology requirements
- `pricing` *(Object)*: `{ isApproved: Boolean, priceDisplay: String, pricingNote: String }`
- `customizationAvailable` *(Boolean)*: `true` if Kiaan provides custom adaptation
- `isFlagship` *(Boolean)*: Highlights product in spotlight banner
- `isFeatured` *(Boolean)*: Displays product in featured catalog section

---

## 7. Non-Functional & Quality Requirements

1. **Performance:** Production build bundle must remain under 500 KB gzip; initial load under 1.5s on broadband.
2. **Responsiveness:** Flawless layout without horizontal overflow from 320px (mobile) to 1920px (ultrawide desktop).
3. **Security:**
   - Zero private signing keys, database credentials, or payment secrets in frontend code or client bundles.
   - All external links must enforce `target="_blank"` and `rel="noopener noreferrer"`.
   - Form inputs must be sanitized on client and validated strictly on backend once connected.
4. **Code Quality:**
   - Strict TypeScript/JavaScript validity; zero build warnings in `vite build`.
   - Maintain centralized styling tokens in `src/index.css`.
   - Components must be modular, reusable, and free of circular imports.

---

## 8. Explicitly Out of Scope

To prevent scope creep, the following items are strictly **OUT OF SCOPE** unless explicitly approved in writing:
- Multi-vendor seller onboarding, vendor commissions, or seller management.
- Public-facing admin consoles or product editing controls on the public website.
- Mocking or faking demo environments (e.g. pointing demo links to localhost or non-existent URLs).
- Fabricating fake prices, discounts, fake customer reviews, or unverified uptime/security guarantees.
- Migrating from React + Vite to other frameworks (e.g. Next.js, Remix, Angular).
- Replacing the approved Warm Authority design tokens with unapproved third-party UI libraries.

---

## 9. Pending Decisions Requiring Stakeholder Input

The following business and infrastructure decisions are currently pending and require confirmation before Phase 2 implementation:

1. **Canonical Product Roster:** Confirmation of the final 6–10 software products and their official release names for the initial launch.
2. **Real Demo Environments:** Active HTTPS URLs for hosted live demos and demo video links.
3. **Commercial Pricing Model:** Approved pricing figures, billing cadence (one-time perpetual vs. annual support), and currency (INR / USD).
4. **Payment Gateway Provider:** Selection of payment processor (Razorpay, Stripe, Cashfree, or Lemon Squeezy).
5. **Inquiry Channel Destination:** Target email address or webhook endpoint for inquiries submitted through `CustomQuoteModal.jsx`.
6. **Backend Infrastructure:** Deployment host (AWS, DigitalOcean, VPS) and Node.js/MySQL runtime environment.
7. **Licensing Policy:** Domain activation limit per license, offline validation grace period (e.g., 7 days vs. 30 days), and re-key rules.
8. **Digital Asset Storage:** Cloud storage provider for downloadable software release zip packages (AWS S3 or Cloudflare R2).

---

## 10. Acceptance Criteria

- [x] Public URL `/` loads the marketplace homepage without admin controls.
- [x] Product catalog items can be searched, filtered, and navigated smoothly.
- [x] Product detail pages (`#product/:slug`) render complete descriptions, features, modules, and screenshots.
- [x] Products with valid demo URLs launch in an external tab safely.
- [x] Products lacking demo URLs clearly show "Demo Coming Soon" without broken links.
- [x] Unapproved pricing explicitly states "Contact for Pricing".
- [x] Production build passes cleanly (`npm run build` exits 0).
- [ ] Backend API, authentication, payment verification, and licensing engine implemented (Scheduled for Phase 2).

