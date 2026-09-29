# Kiaan Marketplace — User Flows

**Version:** 1.1  
**Date:** 2026-09-28  
**Status:** Authoritative Source of Truth — Approved Working Baseline  
**Product:** Kiaan Marketplace  
**Owner:** Kiaan Technology Pvt Ltd  

---

## Contents

1. [Flow 1: Visitor Discovery & Search (Implemented)](#1-visitor-discovery--search-implemented)
2. [Flow 2: Live Demo & Video Evaluation (Implemented)](#2-live-demo--video-evaluation-implemented)
3. [Flow 3: Customization Inquiry & Quote Request (Frontend Implemented)](#3-customization-inquiry--quote-request-frontend-implemented)
4. [Flow 4: Software Purchase & Order Fulfillment (Planned)](#4-software-purchase--order-fulfillment-planned)
5. [Flow 5: Customer Portal & Asset Access (Planned)](#5-customer-portal--asset-access-planned)
6. [Flow 6: Central License Lifecycle & Domain Validation (Planned)](#6-central-license-lifecycle--domain-validation-planned)
7. [Flow 7: Internal Product Operations & Catalog Updates (Operational)](#7-internal-product-operations--catalog-updates-operational)
8. [Flow 8: Shared Edge Cases & System Exception States](#8-shared-edge-cases--system-exception-states)

---

## 1. Visitor Discovery & Search (Implemented)

**Implementation Status:** `ALREADY IMPLEMENTED & VERIFIED` in React 19 frontend.  
**Primary Actor:** Business visitor / Enterprise buyer  
**Trigger:** Visitor lands on `https://marketplace.kiaantechnology.com/` (or root route `/`).  
**Success Outcome:** Visitor finds an appropriate Kiaan software product and navigates to its dedicated detail view (`#product/:slug`).

```mermaid
flowchart TD
    A["Visitor Lands on Marketplace (/)"] --> B["Hero Section & Value Proposition"]
    B --> C{"Discovery Method"}
    
    C -->|"Keyword Search"| D["Instant Search Bar (Ctrl+K)"]
    C -->|"Category Filter"| E["Category Navigation Pills"]
    C -->|"Industry Selection"| F["Industry Solutions Grid"]
    C -->|"Curated Spotlight"| G["Flagship Spotlight Card"]
    
    D --> H["Filtered Catalog Grid"]
    E --> H
    F --> H
    G --> I["Product Detail View (#product/:slug)"]
    
    H -->|"Click 'View Details'"| I
    H -->|"Click 'Live Demo'"| J{"Demo Configured?"}
    
    J -->|"Yes"| K["Open External Demo (New Tab)"]
    J -->|"No"| L["Show 'Demo Coming Soon' Badge"]
```

### Flow Notes:
- Search queries filter title, category, and feature tags instantly without page reload.
- The URL hash syncs automatically to `#product/:slug` when viewing details, enabling browser back/forward buttons and direct bookmarking.
- No matching results display a helpful empty state with a "Reset Filters" action.

---

## 2. Live Demo & Video Evaluation (Implemented)

**Implementation Status:** `ALREADY IMPLEMENTED & VERIFIED` in React 19 frontend.  
**Primary Actor:** Prospective buyer / Software evaluator  
**Trigger:** User clicks "Launch Live Demo" or "Watch Demo Video" from catalog card or detail page.  
**Success Outcome:** User evaluates the real software externally without security risks or fake redirects.

```mermaid
flowchart TD
    A["User on Product Detail Page"] --> B{"Evaluate Demo Action"}
    
    B -->|"Click 'Launch Live Demo'"| C{"Is demoUrl configured in catalog?"}
    C -->|"Valid HTTPS URL"| D["Open external URL in new tab (target='_blank', rel='noopener noreferrer')"]
    C -->|"Empty / Pending"| E["Display 'Demo Coming Soon' state (CTA disabled)"]
    
    B -->|"Click 'Watch Demo Video'"| F{"Is demoVideoUrl configured?"}
    F -->|"Valid Video Link"| G["Open video walkthrough player in new tab"]
    F -->|"Empty"| H["Video action hidden"]
    
    B -->|"Inspect Screenshots"| I["Click thumbnail in media gallery"]
    I --> J["Switch primary showcase view / Open Lightbox"]
```

### Safety & Integrity Rules:
1. **No Localhost Links:** Demo links must point to production or staging domains, never `localhost`.
2. **Tab Isolation:** All external links must enforce `rel="noopener noreferrer"` to prevent reverse-tabnabbing vulnerabilities.
3. **Demo Credentials:** If demo credentials are provided in `src/data/products.js`, they must be intentionally approved public test accounts with safe role-based permissions.

---

## 3. Customization Inquiry & Quote Request (Frontend Implemented)

**Implementation Status:** `FRONTEND IMPLEMENTED` (Modal & client-side validation active; backend forwarding endpoint is `PLANNED`).  
**Primary Actor:** Corporate buyer requiring tailored software features or custom deployment.  
**Trigger:** User clicks "Request Custom Quote", "Request Customization", or "Contact" on any product page.

```mermaid
flowchart TD
    A["User clicks 'Request Custom Quote'"] --> B["Open CustomQuoteModal"]
    B --> C["Prefill Product/Service Title in Form Context"]
    C --> D["User enters Name, Email, Phone, Company, & Scope Requirements"]
    D --> E["User clicks 'Submit Request'"]
    
    E --> F{"Client-side Validation"}
    F -->|"Invalid Inputs"| G["Highlight required fields with accessible inline errors"]
    G --> D
    
    F -->|"Valid Inputs"| H["Dispatch Inquiry Payload to Submission Handler"]
    H --> I{"Backend Forwarding Endpoint Active?"}
    I -->|"Configured"| J["Forward to Kiaan CRM / Email Webhook"]
    I -->|"Mock/Fallback Mode"| K["Log payload locally and show confirmed success feedback"]
    
    J --> L["Display Success State with Estimated Response SLA (24 Hours)"]
    K --> L
    L --> M["User closes modal or returns to browsing"]
```

---

## 4. Software Purchase & Order Fulfillment (Planned)

**Implementation Status:** `PLANNED PLATFORM CAPABILITY` (Scheduled for Commerce Phase).  
**Primary Actor:** Customer purchasing a software license.  
**Prerequisite:** Backend API, payment gateway, and database must be deployed.

```mermaid
flowchart TD
    A["Customer on Product Page"] --> B["Select License Tier (Single-Domain / Source-Code)"]
    B --> C["Click 'Purchase License'"]
    C --> D["Enter Billing & GST Details"]
    D --> E["Initialize Checkout Session with Payment Gateway (Razorpay/Stripe)"]
    E --> F["Customer completes payment on secure gateway interface"]
    
    F --> G["Gateway redirects customer to Marketplace return URL"]
    G --> H["Frontend enters 'Verifying Payment' loading state"]
    
    F -->|"Simultaneous Webhook"| I["Payment Gateway fires signed webhook to Backend"]
    I --> J["Backend verifies cryptographic webhook signature"]
    J --> K{"Signature & Amount Valid?"}
    
    K -->|"No"| L["Flag security alert & keep order in pending audit state"]
    K -->|"Yes"| M["Mark order status as 'PAID' in database"]
    M --> N["Generate Entitlement & Cryptographic License Key"]
    M --> O["Generate Tax/GST Invoice PDF"]
    M --> P["Send Confirmation Email with Login Credentials"]
    
    H --> Q{"Backend confirms payment status?"}
    Q -->|"Confirmed"| R["Display Order Confirmation & Instant Access to Portal"]
    Q -->|"Pending"| S["Display 'Processing' notice with order reference"]
```

### Critical Security Rule:
- **Server Authority Only:** Customer order fulfillment, license issuance, and download links **must never** be triggered by the browser redirect alone. Entitlements are created strictly upon receipt of verified server-to-server webhooks.

---

## 5. Customer Portal & Asset Access (Planned)

**Implementation Status:** `PLANNED PLATFORM CAPABILITY`.  
**Primary Actor:** Authenticated customer who holds one or more purchased software licenses.

```mermaid
flowchart TD
    A["Customer Visits /portal/login"] --> B["Authenticate via Email + Password / 2FA"]
    B --> C["Customer Portal Dashboard"]
    
    C --> D["Section: 'My Software'"]
    C --> E["Section: 'Licenses & Domains'"]
    C --> F["Section: 'Invoices & Orders'"]
    C --> G["Section: 'Support Tickets'"]
    
    D --> H["Click 'Download Release Package'"]
    H --> I["Backend validates active customer entitlement"]
    I --> J["Generate short-lived signed S3/R2 presigned URL (15-min expiry)"]
    J --> K["Browser begins secure download of ZIP archive"]
    
    E --> L["Manage Bound Domain (e.g. 'erp.mycompany.com')"]
    L --> M{"Domain Change Requested?"}
    M -->|"Within Policy Limit"| N["Update bound domain & issue updated license token"]
    M -->|"Limit Exceeded"| O["Route request to Kiaan Admin for manual approval"]
```

---

## 6. Central License Lifecycle & Domain Validation (Planned)

**Implementation Status:** `PLANNED PLATFORM CAPABILITY`.  
**Primary Actor:** Deployed software instance on customer infrastructure.

```mermaid
flowchart TD
    A["Software Deployed on Customer Server"] --> B["Admin inputs License Key in software settings"]
    B --> C["Software calls Kiaan Central Licensing API (/api/v1/license/activate)"]
    C --> D["Kiaan Licensing Server validates License Key against DB"]
    
    D --> E{"License Valid & Domain Matches?"}
    E -->|"No"| F["Return Activation Error (Revoked / Domain Mismatch)"]
    E -->|"Yes"| G["Issue Cryptographically Signed License Token (Ed25519/RSA)"]
    
    G --> H["Software stores token locally and unlocks features"]
    
    H --> I["Periodic Heartbeat Validation (e.g. Every 7 Days)"]
    I --> J{"Can reach Kiaan Licensing Server?"}
    
    J -->|"Yes"| K{"License Still Active?"}
    K -->|"Yes"| L["Renew token and continue operation"]
    K -->|"Revoked/Refunded"| M["Lock administrative functions gracefully"]
    
    J -->|"No (Offline / Network Down)"| N{"Within Approved Offline Grace Period?"}
    N -->|"Yes (e.g. < 14 Days)"| O["Log warning & continue full operation"]
    N -->|"No (Grace Period Expired)"| P["Show 'Offline Validation Required' notice"]
```

---

## 7. Internal Product Operations & Catalog Updates (Operational)

**Implementation Status:** `CONFIRMED OPERATIONAL WORKFLOW`.  
**Primary Actor:** Authorized Kiaan product engineer / operations lead.  
**Rule:** The public marketplace does **not** contain an admin management dashboard. Catalog changes follow the structured source-control workflow below.

```mermaid
flowchart TD
    A["New Software Ready for Showcase"] --> B["Open src/data/products.js in repository"]
    B --> C["Add product object conforming to standard schema:"]
    C --> D["- Verified Name & URL slug\n- Category & Industry fit\n- Plain-English overview\n- Valid live demo URL (or '' if pending)\n- Real screenshots & features\n- 'Contact for Pricing' note"]
    D --> E["Run local preview & tests ('npm run build')"]
    E --> F{"Build passes cleanly?"}
    F -->|"No"| G["Fix lint or data errors"]
    G --> E
    F -->|"Yes"| H["Submit PR / Commit to Main Branch"]
    H --> I["CI/CD automatically deploys updated public showcase"]
```

---

## 8. Shared Edge Cases & System Exception States

| Scenario | Encountered In | Expected System Behavior |
| :--- | :--- | :--- |
| **No Demo URL Configured** | Catalog Card & Detail Page | Show neutral `Demo Coming Soon` badge; disable demo action; do not link to broken URLs or localhost. |
| **Demo URL is External** | Detail Page / Card | Must open in a new browser tab with `target="_blank"` and `rel="noopener noreferrer"`. |
| **Pricing Not Approved** | Catalog Card & Detail Page | Display `Contact for Pricing` and explanatory licensing note; zero invented numerical prices. |
| **Search Yields No Results** | Catalog Grid | Display an empty state graphic, inform the user no matching products were found, and provide a 1-click `Reset Filters` button. |
| **Custom Quote Submitted Offline** | Inquiry Modal | If client is offline, intercept submit action, alert the user to check their connection, and retain all typed form data. |
| **Invalid Product Hash in URL** | App Hash Listener | If `#product/unknown-slug` is visited, fallback gracefully to the first featured product or return to `/` with a clean warning. |
| **Simulated Payment Redirect** | Payment Checkout *(Planned)* | Browser redirect without signed backend webhook verification must display `Payment Pending Authoritative Verification`. |
| **License Server Offline** | Software Client *(Planned)* | Grant full software access during the approved offline grace window without interrupting client operations. |

