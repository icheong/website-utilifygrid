# SEO Content Expansion Prompt — v3

## Context

Google AdSense has flagged our tool pages as "Low Value Content." Previous expansion attempts (v1, v2) increased word count to 800+ but still got flagged because the content followed a repetitive template: every tool opened with the same "runs entirely in your browser using vanilla JavaScript — no data is transmitted to any server" boilerplate. Google's Helpful Content system penalises this pattern.

## Root Cause

The existing content fails because:
1. **Identical opening paragraphs** across all tools — the first sentences discuss "client-side architecture" and "zero server latency" instead of answering the user's task.
2. **Developer jargon in user-facing copy** — phrases like "100% client-side architecture", "vanilla JavaScript", and "IEEE 754 double-precision" mean nothing to someone trying to calculate BMI or convert currency.
3. **Templated structure** — every tool has the exact same 3-card intro, the same "Deep-Dive" heading, the same privacy paragraph. Google's classifier recognises this pattern.
4. **No genuine first-hand experience** — the content describes what the tool does but never explains why a real person would use it, what problems it solves, or what alternatives exist.

## Instructions

You are rewriting the SEO content for a tool on utilifygrid.com. The tool is a free, browser-based utility. The site has 133 tools across 11 categories.

### What to read first

1. Read the current tool file at `src/pages/tools/[TOOL-SLUG].astro`
2. Identify the three SEO content slots: `slot="how-to-use"`, `slot="how-it-works"`, `slot="faq"`
3. Read the tool's `shortDescription` and `category` from `src/data/tools.json`

### What to modify

ONLY the content inside the three `slot` divs. Do NOT touch the tool UI, JavaScript, `<style>`, or any HTML outside the slots.

---

## Slot 1: `how-to-use` — Target 250-350 words

### Structure

**Opening paragraph (3-4 sentences):**
- Start with the user's problem, not the tool's technology. What situation brings someone to this page?
- Name one specific, concrete use case (e.g., "A freelance translator receiving a 12,000-word document needs a quick character count for quoting" — not "This tool helps users count words").
- Explain what the tool outputs and how quickly.
- Do NOT mention "browser", "JavaScript", "client-side", "server", "privacy", or "architecture" in this paragraph.

**Use-case cards (3-4 cards, 3-4 sentences each):**
- Each card describes a different person in a different situation using the tool for a specific purpose.
- Include concrete numbers, realistic scenarios, and measurable outcomes.
- Vary the card titles — do not use generic labels like "Real-World Applications". Use descriptive titles like "Freelance copywriters quoting by word count" or "Students checking essay length requirements".

### Rules for this slot
- Lead with user value. Every sentence should answer "why should I care?"
- Use second person ("you") naturally, not excessively.
- Reference the tool's actual features by name (e.g., "the reading time estimate", "the export button").
- No implementation details. No mentions of how the tool is built.

---

## Slot 2: `how-it-works` — Target 300-450 words

### Structure

**Opening paragraph (2-3 sentences):**
- Explain what happens when the user interacts with the tool, from the user's perspective.
- One sentence on the underlying technology, written in plain language (e.g., "The calculation uses the standard BMI formula from WHO guidelines" — not "The tool employs IEEE 754 double-precision arithmetic via the Canvas API").
- One sentence on privacy — ONE sentence maximum, and only if it's genuinely relevant (health data, financial data). Do NOT mention privacy for non-sensitive tools like word counters or colour pickers.

**Technical deep-dive (2-4 h3 subsections):**
- Each h3 explains one technical concept, algorithm, or design decision.
- Include at least one worked example with actual numbers (e.g., "For a $500,000 mortgage at 6.5% over 30 years, the monthly payment is $3,160. Of that, $2,708 goes to interest in month one, leaving $452 for principal.").
- Reference real standards, specifications, or published research where applicable (WHO BMI thresholds, ISO 4217 currency codes, RFC 4648 for Base64, etc.).
- Mention at least one edge case the tool handles and how.
- Do NOT use "Deep-Dive" as a heading. Use descriptive headings that tell the reader what they'll learn (e.g., "How the amortization schedule is calculated", "Why the formula uses absolute value").

### Rules for this slot
- Write like a subject-matter expert explaining to an intelligent non-specialist.
- Include at least one specific number, measurement, or data point per subsection.
- If the tool has a known limitation (e.g., BMI doesn't distinguish muscle from fat), state it honestly.
- Avoid the phrase "client-side architecture" entirely.

---

## Slot 3: `faq` — Target 400-600 words

### Structure

**Keep all existing FAQ items.** Expand each answer to 3-4 sentences with specific detail, concrete examples, or numerical context.

**Add 2-3 new FAQ items** that address:
- A comparison with alternatives (e.g., "How is this different from Excel's built-in function?" or "Why not just use a search engine?")
- A specific edge case or troubleshooting scenario
- A "why" question that reveals domain expertise (e.g., "Why does BMI use kilograms and metres instead of pounds and feet?")

### Template for FAQ items
```html
<div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question" class="surface-2 border-theme seo-faq-card">
  <h3 itemprop="name" class="seo-faq-q">[Question written as a real person would ask it]</h3>
  <div itemprop="acceptedAnswer" itemscope itemtype="https://schema.org/Answer">
    <p itemprop="text" class="seo-faq-a">[3-4 sentence answer with specific detail, numbers, or examples]</p>
  </div>
</div>
```

### Rules for this slot
- Questions should sound like actual search queries, not formal headings.
- Answers should include at least one specific detail (a number, a name, a standard, a comparison).
- Do NOT repeat the client-side privacy claim in FAQ answers. If a question asks about privacy, answer briefly and move on — do not restate the full boilerplate.
- For YMYL tools (finance, health), include a professional disclaimer at the bottom.

---

## Tone & Style Rules

### DO
- Write like a knowledgeable professional who has used this tool and similar tools extensively.
- Use specific numbers, names, dates, and standards (e.g., "the 1998 Trinity Study", "ISO 4217", "WHO BMI thresholds").
- Vary sentence structure. Mix short and long sentences.
- Include honest limitations and trade-offs where they exist.
- Use concrete examples with realistic values (not "e.g., 100" but "e.g., a $450,000 home loan at 6.2%").

### DO NOT
- Use any of these phrases: "runs entirely in your browser", "vanilla JavaScript", "client-side architecture", "zero server latency", "zero data retention", "no data is transmitted to any server", "100% client-side", "Deep-Dive", "Modern Technical Context".
- Start any paragraph with "This tool..." or "The tool..."
- Use exclamation marks.
- Write more than one sentence about privacy/technology per slot.
- Use the same opening structure as other tool pages. Each tool's opening should be unique.
- Repeat the same information across slots (e.g., don't explain the formula in both how-it-works and an FAQ answer).

### Voice
- First person plural occasionally ("We use the standard formula") or second person ("You'll see..."), but mostly第三人称 expository.
- Confident but not marketing-y. Think: a well-written technical blog post, not a landing page.

---

## Verification

After editing, run `npx astro build` to verify no compilation errors. The build must complete with 150 pages and zero errors.

## Post-Edit

Update `seoclean-tooltracing.MD`: check off the tool in the Completed section.
