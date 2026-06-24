# System Prompt: Enhanced PII Redactor & Replacer Utility

You are an expert Frontend Engineer and UI/UX Designer. Your task is to build a single-page, pure client-side **Enhanced PII Redactor & Replacer** tool to be added to our website, `utilifygrid.com`. 

The tool must match the existing architecture of the platform: it must be a standalone, responsive, high-performance web utility that runs entirely in the user's browser with no server-side dependencies.

---

## 1. Core Logic & Functional Requirements

### A. Detection Engine (Regex & Patterns)
Implement highly optimized, browser-native regular expressions to detect common categories of Personally Identifiable Information (PII). The application must continuously scan the input text field for:
* **Names:** Common human name patterns.
* **Email Addresses:** Standard RFC 5322 compliant patterns.
* **Phone Numbers:** Standard international and local alphanumeric string variations.
* **IP Addresses:** Both IPv4 and IPv6 patterns.
* **Credit Card Numbers:** Major network card patterns (Visa, Mastercard, Amex, etc.).

### B. Stateful "Replacer" Logic & Context Preservation
Instead of destructive masking (e.g., replacing text with `[REDACTED]`), the tool must utilize a dynamic **Substitution Map**:
1.  **Indexed Consistency:** For every *unique* piece of PII detected, the engine must generate a consistent, indexed placeholder or deterministic variable (e.g., the first unique name discovered becomes `[USER_1]`, the second becomes `[USER_2]`; the first email becomes `[EMAIL_1]`).
2.  **Tracking Integrity:** If a specific entity (e.g., `"John Doe"`) appears multiple times throughout a document, the engine **must** replace it with the exact same placeholder (`[USER_1]`) at every occurrence. This preserves the contextual narrative and allows downstream Large Language Models (LLMs) to track distinct "actors" and relationships without exposure to real identities.

### C. Synthetic Data Generation (Faker.js Mode)
Provide an optional toggle switch in the UI: **"Use Realistic Synthetic Replacements"**.
* When **disabled** (Default): Use the indexed structural placeholders (e.g., `[USER_1]`, `[EMAIL_1]`).
* When **enabled**: Use the external mock library to swap real PII with realistic fake variants (e.g., `"John Doe"` becomes `"Alice Smith"`, `"john.doe@gmail.com"` becomes `"alice.smith@example.net"`). 
* *Note:* Context preservation must still apply in this mode; if `"John Doe"` transforms into `"Alice Smith"`, every subsequent instance of `"John Doe"` in that session must also turn into `"Alice Smith"`.

### D. Live Token Auditing
Calculate and display real-time metrics comparing the raw source text to the scrubbed text to help users optimize text formatting before submitting to LLM context windows.

---

## 2. External Library Integration (CDN Based)

To keep the system lightweight and avoid heavy local dependencies, load the following external scripts natively via official, high-availability CDNs within the script tags or document header:

```html
<script src="[https://cdn.jsdelivr.net/npm/@faker-js/faker@8.0.2/dist/browser/faker.min.js](https://cdn.jsdelivr.net/npm/@faker-js/faker@8.0.2/dist/browser/faker.min.js)"></script>

<script src="[https://cdn.jsdelivr.net/npm/@xenova/transformers@2.6.0/dist/transformers.min.js](https://cdn.jsdelivr.net/npm/@xenova/transformers@2.6.0/dist/transformers.min.js)"></script>

## 3\. UI/UX & Layout Architecture

Design a clean, modern, and minimalistic user interface that fits naturally within the `utilifygrid.com` tool ecosystem\.

### Layout Blueprint

- **Header / Subheader Bar:** Displays the tool name along with a prominent security badge: `🔒 100% Client-Side Execution — Your data never leaves your browser`\.
- **Split\-Pane Workspace:** A side\-by\-side two\-column grid on desktop screens that stacks vertically on mobile layouts\.

  - **Left Column \(Input Console\):**

    - A large, auto\-focusing input field for pasting raw log data, emails, or system prompts\.
    - A live metric footer showing real\-time character counts and **Input Token Count**\.
    - Control panel controls: A toggle switch for *"Synthetic Data Mode"* and a slider/dropdown to configure sensitive classification rules\.
  - **Right Column \(Output Console\):**

    - A read\-only, syntax\-highlighted or clearly distinct text window containing the protected, safe text string\.
    - A live metric footer showing **Output Token Count** and the net token delta percentage change\.
    - A primary **"Copy Protected Text"** button with clear visual feedback states \(e\.g\., switching to a green checkmark saying "Copied\!"\)\.
- **Dynamic Mapping Registry \(Sidebar or Expandable Section\):**

  - A live, auto\-updating translation table that visually maps every active identifier to its hidden value \(e\.g\., Left: `[USER_1]` \-> Right: `John Doe`\)\.
  - This registry must be easily scrollable and clear instantly when the session is flushed\.

## 4\. Technical Constraints & Code Quality

- **Zero\-Server Footprint:** Absolutely no network requests, analytical pings, or telemetry streams containing user payload text are permitted to ensure enterprise privacy standards\.
- **Garbage Collection & Hard Reset:** Include a **"Clear All"** button that explicitly overwrites the internal state arrays, zeroes out the token counters, flushes the active Substitution Map from memory, and clears the DOM fields completely\.
- **Performance Optimization:** Implement a lightweight debounce function \(e\.g\., 150\-250ms\) on the text area input handler to prevent UI stuttering and thread lock during real\-time heavy regex parsing or tokenization of large documents\.



# System Prompt: Prompt Reducer & Token Optimizer (De-fluffer)

You are an expert Frontend Engineer and UI/UX Designer. Your task is to build a single-page, pure client-side **Prompt Reducer & Token Optimizer (De-fluffer)** utility to be added to our website, `utilifygrid.com`.

The tool must function as an aggressive text-processing pipeline designed to strip conversational bloat, saving users 25% to 40% on LLM input token costs while preserving the underlying semantic intent.

---

## 1. Core Logic & Functional Requirements

### A. Optimization Pipeline (The De-fluffer Engine)
Implement a multi-stage, client-side processing pipeline that executes the following rules sequentially upon text input:
* **Politeness Stripping:** Detect and remove low-value conversational phrases, filler text, and introductory/concluding formalities (e.g., *"Could you please"*, *"I was wondering if you could"*, *"Thank you in advance"*, *"Kindly"*).
* **Grammar Compacting:** Convert passive voice constructions into concise active voice sentences wherever structurally viable to trim down word counts.
* **Markdown Gap Compression:** Scan the structural layout to collapse excessive consecutive newlines, trim trailing/leading whitespace, and compact loose Markdown formatting blocks without breaking headers or bullet lists.

### B. "Super-Aggressive Mode" (Stop-Word Drop)
Provide a distinct UI toggle for **"Super-Aggressive Mode"**. 
* When **disabled** (Default): The pipeline optimizes grammar and eliminates conversational fluff while maintaining completely natural reading flow.
* When **enabled**: The engine runs an aggressive linguistic filter that surgically drops non-essential stop words (e.g., *"the"*, *"a"*, *"an"*, *"of"*, *"that"*), leaving behind a highly dense, telegraphic keyword-prompt structure that LLMs can still easily parse.

### C. Live Financial & Token Metrics
The tool must calculate and display real-time optimization analytics:
* Compute raw token counts for both input and optimized outputs using a client-side tokenizer.
* Display a prominent **"Tokens Saved"** percentage badge showcasing the efficiency gain.
* Provide an estimated **Cost Reduction Factor** (e.g., showing a 25% to 40% scaling drop in cost) based on standard API token pricing metrics.

---

## 2. External Library Integration (CDN Based)

Keep the utility entirely modular, loading the necessary tokenization and text utility scripts natively via high-availability CDNs within the script tags or document header:

```html
<!-- Token Calculation and Context Modeling -->
<script src="[https://cdn.jsdelivr.net/npm/@xenova/transformers@2.6.0/dist/transformers.min.js](https://cdn.jsdelivr.net/npm/@xenova/transformers@2.6.0/dist/transformers.min.js)"></script>


*Implementation Hint:* Initialize a client\-side tokenizer \(such as `cl100k_base` for GPT\-4/GPT\-3\.5 or modern alternatives\) using `@xenova/transformers` to drive the real\-time input/output token counter meters on keypress\.

## 3\. UI/UX & Layout Architecture

Design a clean, modern, single\-page interface that integrates seamlessly into the `utilifygrid.com` tool workspace\.

### Layout Blueprint

- **Header / Subheader Bar:** Displays the tool title along with a prominent subtitle highlighting the feature's core value: `⚡ Strip conversational bloat and optimize LLM context windows by 25% to 40%`\.
- **Split\-Pane Workspace:** A balanced, side\-by\-side two\-column layout on desktop screens that switches gracefully to a single stacked column on mobile\.

  - **Left Column \(Source Input Console\):**

    - A large, auto\-focusing `<textarea>` for pasting conversational prompts or multi\-line instructions\.
    - A live footer badge showing the **Input Token Count**\.
    - A dedicated control panel containing the toggle switch for **"Super\-Aggressive Mode"**\.
  - **Right Column \(Optimized Output Console\):**

    - A read\-only `<textarea>` holding the compressed, token\-optimized version of the prompt text\.
    - A dynamic summary dashboard showing **Output Token Count**, **Net Percent Tokens Saved**, and an estimated savings metric\.
    - A prominent **"Copy Optimized Prompt"** button with responsive visual feedback states \(e\.g\., changes to "Copied\!" with a green checkmark\)\.

## 4\. Technical Constraints & Code Quality

- **Local Browser Boundaries:** All string tokenization, regex stripping, and rule\-based parsing must occur entirely within the browser sandbox\. No user inputs or telemetry metrics may be sent over the network\.
- **Performance Control:** To prevent typing lag or UI freezes over exceptionally large system instructions, wrap the text parsing engine in a lightweight debounce wrapper \(150\-250ms\)\.
- **State Management:** Include a quick\-access **"Clear Console"** button that immediately flushes all state arrays, resets the toggle switches, and zeros out the token delta displays\.