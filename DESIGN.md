Markdown

# UtilifyGrid System Architecture & Design Guidelines (`Design.MD`)

This document serves as the structural and aesthetic source of truth for generating functional web utilities for <https://utilifygrid.com.> Use these guidelines in system instructions or project contexts to maintain consistent visual paradigms, responsive behavior, and deterministic engineering logic across all modules.

---

## 1. Core Engineering & UI Philosophy

- **Grid-Unified Layouts:** Every utility behaves as a deterministic module designed to seat cleanly within an explicit CSS grid framework.
- **Zero-Friction Utility:** Eliminate unnecessary introductory text, steps, or multi-page wizard navigation. Provide immediate access to interactive mechanics.
- **Real-Time Reactive Updates:** Compute results instantly via event listeners (`onChange`, `onInput`) as the user interacts with fields. Avoid explicit execution buttons unless working with heavy backend dependencies or generation limits.

---

## 2. Global Token Specifications (Tailwind CSS)

All component blocks must evaluate clean semantic variables across light and dark responsive variants.

### Color Architecture Matrix

| Component / Layer | Light Mode Token | Dark Mode Token |
| :--- | :--- | :--- |
| **Canvas Background** | `bg-slate-50` | `bg-slate-900` |
| **Component Card Surface** | `bg-white` | `bg-slate-800` |
| **Borders & Dividers** | `border-slate-200` | `border-slate-700` |
| **Primary Action Interactive** | `bg-blue-600 hover:bg-blue-700` | `bg-blue-500 hover:bg-blue-600` |
| **Success State Accent** | `bg-emerald-600 hover:bg-emerald-700` | `bg-emerald-500 hover:bg-emerald-600` |
| **Primary Type / Typography** | `text-slate-900` | `text-slate-100` |
| **Secondary Type (Sub-labels)**| `text-slate-500` | `text-slate-400` |
| **Form Element Background** | `bg-slate-50` | `bg-slate-900/50` |

---

## 3. Typographic Scale & Class Implementation

Maintain strict uniform hierarchies for labeling and numbers:
- **Main Module Titles:** `text-2xl font-bold tracking-tight text-slate-900 dark:text-white`
- **Module Description Abstracts:** `text-sm text-slate-500 dark:text-slate-400 mt-1`
- **Form Block Field Labels:** `block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5`
- **Data Streams / Numeric Outputs:** `font-mono text-base tracking-wide`

---

## 4. UI Layout Specifications

### A. Modular Workspace Card (The Main Container)

Enclose standalone components within a single structural surface wrapper featuring explicit border parameters and crisp tracking drop-shadows:
```html
<div class="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
  <!-- Interactive Form Elements and Logic Sandbox -->
</div>
B. Standardized Form Field Elements
Inputs must scale fluidly to 100% width inside subgrid modules, including custom tracking ring offsets on absolute browser focus states:

HTML
<div>
  <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Input Label</label>
  <input
    type="text"
    class="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-900/50 dark:text-slate-100 dark:placeholder-slate-500 dark:focus:border-blue-500 dark:focus:bg-slate-900"
    placeholder="Value..."
  />
</div>
C. Responsive Utility Grid Layout
For parallel interaction blocks (e.g., source inputs adjacent to converted data targets), stack rows vertically on mobile viewports and layout horizontally into dual-column sets on viewport scales starting above sm: (640px):

HTML
<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
  <!-- Input Block Node A -->
  <div class="space-y-2">...</div>
  
  <!-- Output Block Node B -->
  <div class="space-y-2">...</div>
</div>

## 5. Required Functional Specifications
Every component block code output must implicitly include these execution structures:

Deterministic Copy-to-Clipboard Module: Outputs must exhibit inline actionable badge layouts incorporating a copy button. On click, mutate the component context state to toggle text to a green "Copied!" check-badge state for an absolute timeout window of 2000 milliseconds before structural restoration.

Global Form Reset/Purge Shorthand: String manipulations, string encryption engines, and multi-parameter converters require minimalist clear-all functionality to drop component parameters to foundational definitions instantly.

Floating-Point Precision Management: To bypass float-overflow errors in conversion ratios or physical calculation engines, round numeric operations through a .toFixed(6) truncation mask. Strip dangling, non-significant zeroes automatically using native string parsing patterns to render ultra-clean, mathematically exact presentation values.

## 6. Structural Integration Template
When compiling tool layers, organize file definitions using this code frame layout pattern:

JavaScript
import React, { useState, useEffect } from 'react';

export default function UtilifyToolComponent() {
  // 1. Reactive state definitions
  // 2. Compute / Evaluation pipeline methods

  return (
    <div class="w-full max-w-4xl mx-auto p-4 space-y-6">

      <div>
        <h2 class="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Tool Heading Title</h2>
        <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">Brief descriptive abstract guiding the core objective of this specific utility module instance.</p>
      </div>


      <div class="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
        <div class="space-y-4">

        </div>
      </div>
    </div>
  );
}