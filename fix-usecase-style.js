import { readFileSync, writeFileSync } from 'fs';

const files = [
  'src/pages/tools/compound-interest-retirement.astro',
  'src/pages/tools/bmi-calculator.astro',
  'src/pages/tools/word-counter.astro',
  'src/pages/tools/colour-palette-css-generator.astro',
  'src/pages/tools/jwt-debugger.astro',
  'src/pages/tools/css-flexbox-grid-sandbox.astro',
  'src/pages/tools/json-to-typescript.astro',
  'src/pages/tools/ev-novated-lease-calculator.astro',
  'src/pages/tools/phev-novated-lease-calculator.astro',
  'src/pages/tools/percentage-calculator.astro',
  'src/pages/tools/git-command-flow-builder.astro',
  'src/pages/tools/kids-savings-compound-interest-visualizer.astro',
];

// Pattern A: plain <p> use-cases in how-to-use (need full conversion)
const pUseCases = [
  {
    file: 'src/pages/tools/compound-interest-retirement.astro',
    old: `    <h3 class="font-display seo-h3" >Real-World Applications &amp; Use Cases</h3>
    <p class="text-secondary seo-p-sm" >
      <strong>Early-career professionals planning savings targets:</strong> A 25-year-old earning $80,000 annually can model how saving $1,500 per month at a 7% real return affects their FIRE timeline. The tool immediately reveals whether their current savings rate is sufficient or whether adjustments to contribution amounts or retirement expense assumptions are needed.
    </p>
    <p class="text-secondary seo-p-sm" >
      <strong>Couples evaluating dual-income retirement strategies:</strong> Partners can combine their individual portfolios and contributions into a single model, adjusting the monthly expense figure to reflect shared living costs. Running scenarios with different return assumptions (conservative 5% vs. moderate 7%) provides a range of possible FIRE dates for informed planning discussions.
    </p>
    <p class="text-secondary seo-p-none" >
      <strong>Financial educators and FIRE community workshops:</strong> The transparent formulas and real-time chart make this tool suitable for classroom or workshop demonstrations. Because all calculations occur client-side with no external dependencies, presenters can use it offline and verify every output against the displayed mathematical model.
    </p>`,
    new: `    <h3 style="font-size:1rem; font-weight:600; margin:1rem 0 0.5rem">Real-World Applications and Use Cases</h3>
    <div style="display:flex; flex-direction:column; gap:0.625rem; margin-bottom:0.75rem">
      {[
        ['Early-career professionals planning savings targets', 'A 25-year-old earning $80,000 annually can model how saving $1,500 per month at a 7% real return affects their FIRE timeline. The tool immediately reveals whether their current savings rate is sufficient or whether adjustments to contribution amounts or retirement expense assumptions are needed.'],
        ['Couples evaluating dual-income retirement strategies', 'Partners can combine their individual portfolios and contributions into a single model, adjusting the monthly expense figure to reflect shared living costs. Running scenarios with different return assumptions (conservative 5% vs. moderate 7%) provides a range of possible FIRE dates for informed planning discussions.'],
        ['Financial educators and FIRE community workshops', 'The transparent formulas and real-time chart make this tool suitable for classroom or workshop demonstrations. Because all calculations occur client-side with no external dependencies, presenters can use it offline and verify every output against the displayed mathematical model.'],
      ].map(([title, desc]) => (
        <div class="border-theme surface-2 seo-card-sm" >
          <strong style="color:var(--text-primary); font-size:0.875rem">{title}</strong>
          <p style="font-size:0.85rem; line-height:1.65; margin:0.35rem 0 0">{desc}</p>
        </div>
      ))}
    </div>`,
  },
  {
    file: 'src/pages/tools/bmi-calculator.astro',
    old: `    <h3 class="font-display seo-h3" >Real-World Applications &amp; Use Cases</h3>
    <p class="text-secondary seo-p-sm" >
      <strong>Clinical triage and health screenings:</strong> General practitioners and practice nurses routinely calculate BMI as a first-step screening metric during routine health assessments. This tool replicates the exact computation used in clinical settings, enabling patients to understand their own readings before or after a consultation. The instant result and clear category labelling remove ambiguity when interpreting a BMI figure against WHO thresholds.
    </p>
    <p class="text-secondary seo-p-sm" >
      <strong>Fitness tracking and goal-setting:</strong> Personal trainers and individuals following a structured fitness programme use BMI as a baseline reference point. When paired with body composition measurements (such as waist circumference or body fat percentage), BMI provides a quick longitudinal indicator of weight management progress. This calculator's instant feedback loop makes it suitable for repeated use during training cycles.
    </p>
    <p class="text-secondary seo-p-none" >
      <strong>Insurance and occupational health assessments:</strong> Many life insurance providers and occupational health programmes reference BMI categories when assessing risk profiles. Understanding your BMI category before completing a health declaration form helps you provide accurate information. The metric and imperial toggle ensures compatibility with measurement systems used across different countries and industries.
    </p>`,
    new: `    <h3 style="font-size:1rem; font-weight:600; margin:1rem 0 0.5rem">Real-World Applications and Use Cases</h3>
    <div style="display:flex; flex-direction:column; gap:0.625rem; margin-bottom:0.75rem">
      {[
        ['Clinical triage and health screenings', 'General practitioners and practice nurses routinely calculate BMI as a first-step screening metric during routine health assessments. This tool replicates the exact computation used in clinical settings, enabling patients to understand their own readings before or after a consultation. The instant result and clear category labelling remove ambiguity when interpreting a BMI figure against WHO thresholds.'],
        ['Fitness tracking and goal-setting', 'Personal trainers and individuals following a structured fitness programme use BMI as a baseline reference point. When paired with body composition measurements (such as waist circumference or body fat percentage), BMI provides a quick longitudinal indicator of weight management progress. This calculator\'s instant feedback loop makes it suitable for repeated use during training cycles.'],
        ['Insurance and occupational health assessments', 'Many life insurance providers and occupational health programmes reference BMI categories when assessing risk profiles. Understanding your BMI category before completing a health declaration form helps you provide accurate information. The metric and imperial toggle ensures compatibility with measurement systems used across different countries and industries.'],
      ].map(([title, desc]) => (
        <div class="border-theme surface-2 seo-card-sm" >
          <strong style="color:var(--text-primary); font-size:0.875rem">{title}</strong>
          <p style="font-size:0.85rem; line-height:1.65; margin:0.35rem 0 0">{desc}</p>
        </div>
      ))}
    </div>`,
  },
  {
    file: 'src/pages/tools/word-counter.astro',
    old: `    <h3 class="font-display seo-h3" >Real-World Applications &amp; Use Cases</h3>
    <p class="text-secondary seo-p-sm" >
      <strong>SEO and content marketing:</strong> Digital marketers and SEO professionals must write page titles, meta descriptions, and social media posts within strict character limits. Google typically displays the first 50–60 characters of a title tag in search results, and truncation beyond that reduces click-through rates. This tool provides instant feedback against those thresholds, allowing writers to craft concise, search-optimised copy without guessing whether their text will be truncated.
    </p>
    <p class="text-secondary seo-p-sm" >
      <strong>Academic and professional writing:</strong> Students, researchers, and professionals frequently work within word count constraints — essays, journal abstracts, grant proposals, and RFP responses all impose limits. The reading time estimate (based on a 200 wpm baseline) helps authors gauge whether their document is appropriately scoped for the intended audience. The sentence and paragraph counts provide structural insight that is useful for editing and readability analysis.
    </p>
    <p class="text-secondary seo-p-none" >
      <strong>Social media management and UX copywriting:</strong> Social media managers juggling multiple platforms need to ensure each post fits within the target platform's limits. SMS marketers must stay within the 160-character GSM limit to avoid splitting messages into multiple segments. UX writers crafting microcopy, error messages, and button labels benefit from the no-spaces character count, which reflects how most UI character counters display remaining length.
    </p>`,
    new: `    <h3 style="font-size:1rem; font-weight:600; margin:1rem 0 0.5rem">Real-World Applications and Use Cases</h3>
    <div style="display:flex; flex-direction:column; gap:0.625rem; margin-bottom:0.75rem">
      {[
        ['SEO and content marketing', 'Digital marketers and SEO professionals must write page titles, meta descriptions, and social media posts within strict character limits. Google typically displays the first 50–60 characters of a title tag in search results, and truncation beyond that reduces click-through rates. This tool provides instant feedback against those thresholds, allowing writers to craft concise, search-optimised copy without guessing whether their text will be truncated.'],
        ['Academic and professional writing', 'Students, researchers, and professionals frequently work within word count constraints — essays, journal abstracts, grant proposals, and RFP responses all impose limits. The reading time estimate (based on a 200 wpm baseline) helps authors gauge whether their document is appropriately scoped for the intended audience. The sentence and paragraph counts provide structural insight that is useful for editing and readability analysis.'],
        ['Social media management and UX copywriting', 'Social media managers juggling multiple platforms need to ensure each post fits within the target platform\'s limits. SMS marketers must stay within the 160-character GSM limit to avoid splitting messages into multiple segments. UX writers crafting microcopy, error messages, and button labels benefit from the no-spaces character count, which reflects how most UI character counters display remaining length.'],
      ].map(([title, desc]) => (
        <div class="border-theme surface-2 seo-card-sm" >
          <strong style="color:var(--text-primary); font-size:0.875rem">{title}</strong>
          <p style="font-size:0.85rem; line-height:1.65; margin:0.35rem 0 0">{desc}</p>
        </div>
      ))}
    </div>`,
  },
  {
    file: 'src/pages/tools/colour-palette-css-generator.astro',
    old: `    <h3 class="font-display seo-h3" >Real-World Applications &amp; Use Cases</h3>
    <p class="text-secondary seo-p-sm" >
      <strong>Front-end development and CSS authoring:</strong> Developers frequently receive brand colours as HEX codes from designers but need the RGB equivalent for CSS functions like <code>rgba()</code>, gradients, or dynamic colour manipulation with JavaScript. This tool eliminates manual base-16 arithmetic by converting instantly and providing copy-ready strings for direct insertion into stylesheets, including CSS custom properties and linear gradients.
    </p>
    <p class="text-secondary seo-p-sm" >
      <strong>Tailwind CSS integration:</strong> When migrating a design system to Tailwind CSS, developers need to find the closest utility class for brand colours that may not align exactly with Tailwind's predefined palette. The tool uses CIELAB colour space Delta-E distance calculations to identify the five most visually similar Tailwind classes, ranked by perceptual similarity, enabling rapid palette alignment without manual visual comparison.
    </p>
    <p class="text-secondary seo-p-none" >
      <strong>Design system auditing and accessibility:</strong> Teams standardising a design system often inherit colour palettes in mixed formats — some assets use HEX, others use RGB, and component libraries may require HSL for CSS custom properties. This converter enables rapid format normalisation across an entire palette, while the opacity slider and gradient generator support creating accessible colour combinations with proper contrast ratios.
    </p>`,
    new: `    <h3 style="font-size:1rem; font-weight:600; margin:1rem 0 0.5rem">Real-World Applications and Use Cases</h3>
    <div style="display:flex; flex-direction:column; gap:0.625rem; margin-bottom:0.75rem">
      {[
        ['Front-end development and CSS authoring', 'Developers frequently receive brand colours as HEX codes from designers but need the RGB equivalent for CSS functions like rgba(), gradients, or dynamic colour manipulation with JavaScript. This tool eliminates manual base-16 arithmetic by converting instantly and providing copy-ready strings for direct insertion into stylesheets, including CSS custom properties and linear gradients.'],
        ['Tailwind CSS integration', 'When migrating a design system to Tailwind CSS, developers need to find the closest utility class for brand colours that may not align exactly with Tailwind\'s predefined palette. The tool uses CIELAB colour space Delta-E distance calculations to identify the five most visually similar Tailwind classes, ranked by perceptual similarity, enabling rapid palette alignment without manual visual comparison.'],
        ['Design system auditing and accessibility', 'Teams standardising a design system often inherit colour palettes in mixed formats — some assets use HEX, others use RGB, and component libraries may require HSL for CSS custom properties. This converter enables rapid format normalisation across an entire palette, while the opacity slider and gradient generator support creating accessible colour combinations with proper contrast ratios.'],
      ].map(([title, desc]) => (
        <div class="border-theme surface-2 seo-card-sm" >
          <strong style="color:var(--text-primary); font-size:0.875rem">{title}</strong>
          <p style="font-size:0.85rem; line-height:1.65; margin:0.35rem 0 0">{desc}</p>
        </div>
      ))}
    </div>`,
  },
  {
    file: 'src/pages/tools/jwt-debugger.astro',
    old: `    <h3 class="font-display seo-h3" >Real-World Applications &amp; Use Cases</h3>
    <p class="text-secondary seo-p-sm" >
      <strong>API authentication debugging:</strong> When integrating with third-party APIs that use Bearer token authentication (OAuth 2.0, OpenID Connect), developers frequently encounter 401 Unauthorized errors caused by malformed tokens, expired <code>exp</code> claims, or mismatched <code>iss</code> fields. Pasting the token into this debugger instantly reveals the payload contents, allowing you to verify claims without contacting the identity provider's introspection endpoint.
    </p>
    <p class="text-secondary seo-p-sm" >
      <strong>Security auditing and penetration testing:</strong> Security engineers reviewing JWT implementations need to verify that tokens do not contain sensitive data in the payload (JWTs are Base64url-encoded, not encrypted). This tool enables rapid inspection of token contents to confirm whether PII, session identifiers, or privilege escalation claims are exposed in the clear — a critical step in OWASP Top 10 assessments.
    </p>
    <p class="text-secondary seo-p-none" >
      <strong>Educational and training contexts:</strong> Students learning about modern authentication protocols benefit from visualising the internal structure of JWTs. This debugger demystifies the three-segment format, demonstrates how Base64url encoding preserves URL safety, and illustrates the relationship between header algorithm declarations (<code>alg</code>) and the corresponding signature verification requirements.
    </p>`,
    new: `    <h3 style="font-size:1rem; font-weight:600; margin:1rem 0 0.5rem">Real-World Applications and Use Cases</h3>
    <div style="display:flex; flex-direction:column; gap:0.625rem; margin-bottom:0.75rem">
      {[
        ['API authentication debugging', 'When integrating with third-party APIs that use Bearer token authentication (OAuth 2.0, OpenID Connect), developers frequently encounter 401 Unauthorized errors caused by malformed tokens, expired exp claims, or mismatched iss fields. Pasting the token into this debugger instantly reveals the payload contents, allowing you to verify claims without contacting the identity provider\'s introspection endpoint.'],
        ['Security auditing and penetration testing', 'Security engineers reviewing JWT implementations need to verify that tokens do not contain sensitive data in the payload (JWTs are Base64url-encoded, not encrypted). This tool enables rapid inspection of token contents to confirm whether PII, session identifiers, or privilege escalation claims are exposed in the clear — a critical step in OWASP Top 10 assessments.'],
        ['Educational and training contexts', 'Students learning about modern authentication protocols benefit from visualising the internal structure of JWTs. This debugger demystifies the three-segment format, demonstrates how Base64url encoding preserves URL safety, and illustrates the relationship between header algorithm declarations (alg) and the corresponding signature verification requirements.'],
      ].map(([title, desc]) => (
        <div class="border-theme surface-2 seo-card-sm" >
          <strong style="color:var(--text-primary); font-size:0.875rem">{title}</strong>
          <p style="font-size:0.85rem; line-height:1.65; margin:0.35rem 0 0">{desc}</p>
        </div>
      ))}
    </div>`,
  },
  {
    file: 'src/pages/tools/css-flexbox-grid-sandbox.astro',
    old: `    <h3 class="font-display seo-h3" >Real-World Applications &amp; Use Cases</h3>
    <p class="text-secondary seo-p-sm" >
      <strong>Rapid prototyping and layout iteration:</strong> Front-end developers frequently need to test multiple layout configurations before committing to a design. Instead of manually writing CSS, toggling between browser devtools, and refreshing, this sandbox provides a single界面 for experimenting with property combinations. The live preview updates on every input change, eliminating the compile-refresh cycle and reducing the time to reach a working layout from minutes to seconds.
    </p>
    <p class="text-secondary seo-p-sm" >
      <strong>Teaching and learning CSS layout:</strong> CSS layout is notoriously difficult to learn from documentation alone because the interaction between properties (e.g., how <code>flex-wrap</code> affects <code>align-content</code>) is not intuitive. This sandbox renders numbered boxes inside a container, making it immediately visible how each property change affects item positioning, sizing, and alignment. Instructors can use it in classroom demos, and students can experiment independently without setting up a development environment.
    </p>
    <p class="text-secondary seo-p-none" >
      <strong>Responsive design debugging:</strong> When building responsive layouts, developers need to understand how <code>fr</code> units, <code>minmax()</code>, and <code>auto-fill</code>/<code>auto-fit</code> interact with container dimensions. The Grid mode accepts any valid CSS value in the <code>grid-template-columns</code> and <code>grid-template-rows</code> fields, allowing developers to test complex track definitions (e.g., <code>repeat(auto-fill, minmax(200px, 1fr))</code>) and immediately see how items reflow — without writing a single line of code.
    </p>`,
    new: `    <h3 style="font-size:1rem; font-weight:600; margin:1rem 0 0.5rem">Real-World Applications and Use Cases</h3>
    <div style="display:flex; flex-direction:column; gap:0.625rem; margin-bottom:0.75rem">
      {[
        ['Rapid prototyping and layout iteration', 'Front-end developers frequently need to test multiple layout configurations before committing to a design. Instead of manually writing CSS, toggling between browser devtools, and refreshing, this sandbox provides a single interface for experimenting with property combinations. The live preview updates on every input change, eliminating the compile-refresh cycle and reducing the time to reach a working layout from minutes to seconds.'],
        ['Teaching and learning CSS layout', 'CSS layout is notoriously difficult to learn from documentation alone because the interaction between properties (e.g., how flex-wrap affects align-content) is not intuitive. This sandbox renders numbered boxes inside a container, making it immediately visible how each property change affects item positioning, sizing, and alignment. Instructors can use it in classroom demos, and students can experiment independently without setting up a development environment.'],
        ['Responsive design debugging', 'When building responsive layouts, developers need to understand how fr units, minmax(), and auto-fill/auto-fit interact with container dimensions. The Grid mode accepts any valid CSS value in the grid-template-columns and grid-template-rows fields, allowing developers to test complex track definitions and immediately see how items reflow — without writing a single line of code.'],
      ].map(([title, desc]) => (
        <div class="border-theme surface-2 seo-card-sm" >
          <strong style="color:var(--text-primary); font-size:0.875rem">{title}</strong>
          <p style="font-size:0.85rem; line-height:1.65; margin:0.35rem 0 0">{desc}</p>
        </div>
      ))}
    </div>`,
  },
  {
    file: 'src/pages/tools/json-to-typescript.astro',
    old: `    <h3 class="font-display seo-h3" >Real-World Applications &amp; Use Cases</h3>
    <p class="text-secondary seo-p-sm" >
      <strong>API response typing:</strong> When consuming REST or GraphQL APIs, developers receive JSON payloads that must be typed in the application. Instead of manually writing interfaces for each endpoint — which is error-prone and tedious — paste a sample response into this generator to produce a complete, ready-to-use TypeScript interface. This is particularly valuable when working with large API surfaces (e.g., Stripe, Twilio, or internal microservices) where dozens of response types need definitions.
    </p>
    <p class="text-secondary seo-p-sm" >
      <strong>Configuration file validation:</strong> Projects that load configuration from JSON or YAML files benefit from both TypeScript types and Zod schemas. The interface mode provides compile-time safety when accessing config properties, while the Zod mode adds runtime validation that catches malformed config at application startup. This dual approach is standard practice in production Node.js applications.
    </p>
    <p class="text-secondary seo-p-none" >
      <strong>Test fixture generation:</strong> When writing integration tests, developers often need typed mock data that matches API contracts. Generating a TypeScript interface from a real API response ensures test fixtures are type-safe and will compile against the actual data shape. The Zod mode is equally useful for creating test schemas that validate mock data matches expected structures.
    </p>`,
    new: `    <h3 style="font-size:1rem; font-weight:600; margin:1rem 0 0.5rem">Real-World Applications and Use Cases</h3>
    <div style="display:flex; flex-direction:column; gap:0.625rem; margin-bottom:0.75rem">
      {[
        ['API response typing', 'When consuming REST or GraphQL APIs, developers receive JSON payloads that must be typed in the application. Instead of manually writing interfaces for each endpoint — which is error-prone and tedious — paste a sample response into this generator to produce a complete, ready-to-use TypeScript interface. This is particularly valuable when working with large API surfaces (e.g., Stripe, Twilio, or internal microservices) where dozens of response types need definitions.'],
        ['Configuration file validation', 'Projects that load configuration from JSON or YAML files benefit from both TypeScript types and Zod schemas. The interface mode provides compile-time safety when accessing config properties, while the Zod mode adds runtime validation that catches malformed config at application startup. This dual approach is standard practice in production Node.js applications.'],
        ['Test fixture generation', 'When writing integration tests, developers often need typed mock data that matches API contracts. Generating a TypeScript interface from a real API response ensures test fixtures are type-safe and will compile against the actual data shape. The Zod mode is equally useful for creating test schemas that validate mock data matches expected structures.'],
      ].map(([title, desc]) => (
        <div class="border-theme surface-2 seo-card-sm" >
          <strong style="color:var(--text-primary); font-size:0.875rem">{title}</strong>
          <p style="font-size:0.85rem; line-height:1.65; margin:0.35rem 0 0">{desc}</p>
        </div>
      ))}
    </div>`,
  },
  {
    file: 'src/pages/tools/ev-novated-lease-calculator.astro',
    old: `    <h3 class="font-display text-primary seo-h3" >Real-World Applications &amp; Use Cases</h3>
    <p class="text-secondary seo-p-sm" >
      <strong>Employee salary packaging decision:</strong> A salaried employee considering a $65,000 BEV needs to understand whether novated leasing saves money compared to buying with cash or a personal car loan. This calculator provides a side-by-side comparison showing the net cost of each option over the lease term, accounting for pre-tax deductions, marginal tax rates, FBT treatment, LCT, and opportunity cost — enabling an informed, data-driven decision rather than relying on provider sales pitches.
    </p>
    <p class="text-secondary seo-p-sm" >
      <strong>Fleet manager policy evaluation:</strong> HR and fleet managers evaluating whether to offer novated EV leases as an employee benefit need to understand the tax implications at different salary levels. The calculator's marginal tax rate engine (0%–45% brackets) and dynamic FBT detection allow fleet managers to model scenarios across employee cohorts — from junior staff at $60,000 to executives at $200,000+ — and quantify the organisation's FBT exposure.
    </p>
    <p class="text-secondary seo-p-none" >
      <strong>Financial adviser client modelling:</strong> Tax agents and financial planners advising clients on EV acquisition strategies can use this tool to demonstrate the impact of LCT thresholds, the ATO's proposed $120,000 ZEV-only threshold (not yet legislated), and the interplay between novated lease deductions and reportable fringe benefits on income-tested government benefits.
    </p>`,
    new: `    <h3 style="font-size:1rem; font-weight:600; margin:1rem 0 0.5rem">Real-World Applications and Use Cases</h3>
    <div style="display:flex; flex-direction:column; gap:0.625rem; margin-bottom:0.75rem">
      {[
        ['Employee salary packaging decision', 'A salaried employee considering a $65,000 BEV needs to understand whether novated leasing saves money compared to buying with cash or a personal car loan. This calculator provides a side-by-side comparison showing the net cost of each option over the lease term, accounting for pre-tax deductions, marginal tax rates, FBT treatment, LCT, and opportunity cost — enabling an informed, data-driven decision rather than relying on provider sales pitches.'],
        ['Fleet manager policy evaluation', 'HR and fleet managers evaluating whether to offer novated EV leases as an employee benefit need to understand the tax implications at different salary levels. The calculator\'s marginal tax rate engine (0%–45% brackets) and dynamic FBT detection allow fleet managers to model scenarios across employee cohorts — from junior staff at $60,000 to executives at $200,000+ — and quantify the organisation\'s FBT exposure.'],
        ['Financial adviser client modelling', 'Tax agents and financial planners advising clients on EV acquisition strategies can use this tool to demonstrate the impact of LCT thresholds, the ATO\'s proposed $120,000 ZEV-only threshold (not yet legislated), and the interplay between novated lease deductions and reportable fringe benefits on income-tested government benefits.'],
      ].map(([title, desc]) => (
        <div class="border-theme surface-2 seo-card-sm" >
          <strong style="color:var(--text-primary); font-size:0.875rem">{title}</strong>
          <p style="font-size:0.85rem; line-height:1.65; margin:0.35rem 0 0">{desc}</p>
        </div>
      ))}
    </div>`,
  },
  {
    file: 'src/pages/tools/phev-novated-lease-calculator.astro',
    old: `    <h3 class="font-display text-primary seo-h3" >Real-World Applications &amp; Use Cases</h3>
    <p class="text-secondary seo-p-sm" >
      <strong>PHEV vs BEV acquisition decision:</strong> An employee choosing between a PHEV and a BEV novated lease needs to understand the FBT cost difference. A BEV under the LCT threshold qualifies for 0% FBT; a PHEV (post-1 April 2025) always pays ~37.7% FBT on the taxable value. This calculator quantifies that gap precisely, enabling a side-by-side comparison of total lease costs — including running cost differences from the PHEV's dual-fuel system — to determine whether the PHEV's lower upfront price offsets its higher FBT burden.
    </p>
    <p class="text-secondary seo-p-sm" >
      <strong>PHEV running cost modelling:</strong> PHEVs have two fuel sources with different cost profiles. A PHEV with 60km electric range charged 5 times per week covers ~15,600km/year on electricity alone — leaving the remainder for petrol. The dual-fuel estimator accurately splits these costs using your actual charging habits, electricity rates, and petrol price, producing a realistic annual running cost that a simple "km × cost/km" estimate would miss.
    </p>
    <p class="text-secondary seo-p-none" >
      <strong>Pre-April 2025 grandfathered lease review:</strong> PHEV novated leases entered into before 1 April 2025 remain grandfathered under the old FBT exemption rules for the life of that lease. Employees with existing PHEV leases can use this calculator to model the true cost of their current arrangement and compare it against renewing with a BEV (which would qualify for the new FBT exemption) at lease expiry.
    </p>`,
    new: `    <h3 style="font-size:1rem; font-weight:600; margin:1rem 0 0.5rem">Real-World Applications and Use Cases</h3>
    <div style="display:flex; flex-direction:column; gap:0.625rem; margin-bottom:0.75rem">
      {[
        ['PHEV vs BEV acquisition decision', 'An employee choosing between a PHEV and a BEV novated lease needs to understand the FBT cost difference. A BEV under the LCT threshold qualifies for 0% FBT; a PHEV (post-1 April 2025) always pays ~37.7% FBT on the taxable value. This calculator quantifies that gap precisely, enabling a side-by-side comparison of total lease costs — including running cost differences from the PHEV\'s dual-fuel system — to determine whether the PHEV\'s lower upfront price offsets its higher FBT burden.'],
        ['PHEV running cost modelling', 'PHEVs have two fuel sources with different cost profiles. A PHEV with 60km electric range charged 5 times per week covers ~15,600km/year on electricity alone — leaving the remainder for petrol. The dual-fuel estimator accurately splits these costs using your actual charging habits, electricity rates, and petrol price, producing a realistic annual running cost that a simple "km × cost/km" estimate would miss.'],
        ['Pre-April 2025 grandfathered lease review', 'PHEV novated leases entered into before 1 April 2025 remain grandfathered under the old FBT exemption rules for the life of that lease. Employees with existing PHEV leases can use this calculator to model the true cost of their current arrangement and compare it against renewing with a BEV (which would qualify for the new FBT exemption) at lease expiry.'],
      ].map(([title, desc]) => (
        <div class="border-theme surface-2 seo-card-sm" >
          <strong style="color:var(--text-primary); font-size:0.875rem">{title}</strong>
          <p style="font-size:0.85rem; line-height:1.65; margin:0.35rem 0 0">{desc}</p>
        </div>
      ))}
    </div>`,
  },
];

// Percentage calculator: use-cases in how-it-works (wrong slot) — move to how-to-use
const percentageOld = `    <h3 class="font-display seo-h3-sm" >Real-World Applications</h3>
    <p class="text-secondary seo-p-sm" >
      <strong>Retail and invoicing.</strong> Apply a 15% discount to a line-item total, or calculate 8% sales tax on an invoice subtotal. The "What is X% of Y?" mode returns the exact amount to deduct or add, eliminating manual multiplication errors on receipts and purchase orders.
    </p>
    <p class="text-secondary seo-p-sm" >
      <strong>Academic grading.</strong> A student scored 42 out of 60 on an exam. The "X is what % of Y?" mode returns 70%, which maps directly to a letter grade. Teachers and students use this to convert raw scores to percentages without a spreadsheet.
    </p>
    <p class="text-secondary seo-p-none" >
      <strong>Business metrics.</strong> Monthly active users grew from 8,200 to 11,500. The "% Change" mode returns +40.24%, giving product managers an instant growth figure for stakeholder reports. This avoids the common mistake of dividing by the new value instead of the original.
    </p>`;

const percentageNew = `    <h3 style="font-size:1rem; font-weight:600; margin:1rem 0 0.5rem">Real-World Applications and Use Cases</h3>
    <div style="display:flex; flex-direction:column; gap:0.625rem; margin-bottom:0.75rem">
      {[
        ['Retail and invoicing', 'Apply a 15% discount to a line-item total, or calculate 8% sales tax on an invoice subtotal. The "What is X% of Y?" mode returns the exact amount to deduct or add, eliminating manual multiplication errors on receipts and purchase orders.'],
        ['Academic grading', 'A student scored 42 out of 60 on an exam. The "X is what % of Y?" mode returns 70%, which maps directly to a letter grade. Teachers and students use this to convert raw scores to percentages without a spreadsheet.'],
        ['Business metrics', 'Monthly active users grew from 8,200 to 11,500. The "% Change" mode returns +40.24%, giving product managers an instant growth figure for stakeholder reports. This avoids the common mistake of dividing by the new value instead of the original.'],
      ].map(([title, desc]) => (
        <div class="border-theme surface-2 seo-card-sm" >
          <strong style="color:var(--text-primary); font-size:0.875rem">{title}</strong>
          <p style="font-size:0.85rem; line-height:1.65; margin:0.35rem 0 0">{desc}</p>
        </div>
      ))}
    </div>`;

// Git command flow builder: already flex-column cards but in how-it-works (wrong slot), also missing border-theme
const gitOld = `    <h3 class="font-display" style="font-size:1rem; font-weight:600; margin:1rem 0 0.5rem">Real-World Applications and Use Cases</h3>
    <div style="display:flex; flex-direction:column; gap:0.625rem; margin-bottom:0.75rem">
      {[
        ['Recovering from a mistaken commit on a shared branch', 'A developer accidentally pushes a commit with sensitive data or a broken build to a shared feature branch. The tool walks them through the exact sequence: reset locally, amend or remove the offending commit, then force-push with --force-with-lease — without needing to remember the flag differences between --soft, --mixed, and --hard.'],
        ['Cleaning up feature branch history before code review', 'Before opening a pull request, a developer needs to squash six WIP commits into a clean two-commit sequence. The Squash Commits scenario generates the interactive rebase command with the correct HEAD~n reference, and the inline instructions explain how to mark commits for squashing in the editor.'],
        ['Migrating a team workflow from merge commits to rebase', 'A team lead wants to adopt a linear history strategy. The tool provides the pull --rebase configuration, the rebase-onto-main workflow, and the safe force-push command — all in one place — so the team can transition without hunting through multiple Git documentation pages.'],
      ].map(([title, desc]) => (
        <div class="surface-2 seo-card-sm" style="background:var(--bg-surface); border:1px solid var(--border)">
          <strong style="color:var(--text-primary); font-size:0.875rem">{title}</strong>
          <p class="text-secondary" style="font-size:0.85rem; line-height:1.65; margin:0.35rem 0 0">{desc}</p>
        </div>
      ))}
    </div>`;

// Kids savings: custom inline divs (need seo-card-sm class)
const kidsOld = `    <h3 class="font-display" style="font-size:1rem; font-weight:700; margin:1.25rem 0 0.5rem">Real-world applications</h3>
    <div style="display:flex; flex-direction:column; gap:0.75rem">
      <div style="background:var(--bg-surface-2); border:1px solid var(--border); border-radius:0.75rem; padding:1rem 1.15rem">
        <div style="font-size:0.82rem; font-weight:700; color:var(--text-primary); margin-bottom:0.25rem">Teaching delayed gratification</div>
        <p class="text-secondary" style="font-size:0.85rem; line-height:1.65; margin:0">Kids who can see a savings goal being reached month by month learn patience and discipline. Set a goal for a gaming console or bicycle and watch the progress bar fill up — far more motivating than a piggy bank.</p>
      </div>
      <div style="background:var(--bg-surface-2); border:1px solid var(--border); border-radius:0.75rem; padding:1rem 1.15rem">
        <div style="font-size:0.82rem; font-weight:700; color:var(--text-primary); margin-bottom:0.25rem">Planning for education expenses</div>
        <p class="text-secondary" style="font-size:0.85rem; line-height:1.65; margin:0">Starting small contributions early can build a meaningful fund by the time a child reaches secondary school or university age. Even $20 per month from birth grows substantially over 18 years.</p>
      </div>
      <div style="background:var(--bg-surface-2); border:1px solid var(--border); border-radius:0.75rem; padding:1rem 1.15rem">
        <div style="font-size:0.82rem; font-weight:700; color:var(--text-primary); margin-bottom:0.25rem">Comparing savings strategies</div>
        <p class="text-secondary" style="font-size:0.85rem; line-height:1.65; margin:0">Run side-by-side scenarios to show how doubling pocket money or adding birthday bonuses accelerates the timeline. The visual difference between contributing $10 versus $30 per month makes the impact tangible.</p>
      </div>
    </div>`;

// Apply fixes
let fixed = 0;

for (const { file, old, new: replacement } of pUseCases) {
  let content = readFileSync(file, 'utf8');
  if (content.includes(old)) {
    content = content.replace(old, replacement);
    writeFileSync(file, content, 'utf8');
    console.log(`Fixed: ${file}`);
    fixed++;
  } else {
    console.log(`SKIP (not found): ${file}`);
  }
}

// Percentage calculator — remove from how-it-works, add to how-to-use
{
  let content = readFileSync('src/pages/tools/percentage-calculator.astro', 'utf8');
  if (content.includes(percentageOld)) {
    content = content.replace(percentageOld, '');
    // Find the closing </div> of how-to-use slot and insert before it
    const howToUseEnd = content.indexOf('</div>\n\n  <div slot="how-it-works">');
    if (howToUseEnd > -1) {
      content = content.slice(0, howToUseEnd) + '\n    ' + percentageNew + '\n  ' + content.slice(howToUseEnd);
    }
    writeFileSync('src/pages/tools/percentage-calculator.astro', content, 'utf8');
    console.log('Fixed: percentage-calculator.astro');
    fixed++;
  } else {
    console.log('SKIP (not found): percentage-calculator.astro');
  }
}

// Git command flow builder — move from how-it-works to how-to-use, fix card class
{
  let content = readFileSync('src/pages/tools/git-command-flow-builder.astro', 'utf8');
  if (content.includes(gitOld)) {
    content = content.replace(gitOld, '');
    // Find the closing </div> of how-to-use slot and insert before it
    const howToUseEnd = content.indexOf('</div>\n\n  <div slot="how-it-works">');
    if (howToUseEnd > -1) {
      const gitNew = `    <h3 style="font-size:1rem; font-weight:600; margin:1rem 0 0.5rem">Real-World Applications and Use Cases</h3>
    <div style="display:flex; flex-direction:column; gap:0.625rem; margin-bottom:0.75rem">
      {[
        ['Recovering from a mistaken commit on a shared branch', 'A developer accidentally pushes a commit with sensitive data or a broken build to a shared feature branch. The tool walks them through the exact sequence: reset locally, amend or remove the offending commit, then force-push with --force-with-lease — without needing to remember the flag differences between --soft, --mixed, and --hard.'],
        ['Cleaning up feature branch history before code review', 'Before opening a pull request, a developer needs to squash six WIP commits into a clean two-commit sequence. The Squash Commits scenario generates the interactive rebase command with the correct HEAD~n reference, and the inline instructions explain how to mark commits for squashing in the editor.'],
        ['Migrating a team workflow from merge commits to rebase', 'A team lead wants to adopt a linear history strategy. The tool provides the pull --rebase configuration, the rebase-onto-main workflow, and the safe force-push command — all in one place — so the team can transition without hunting through multiple Git documentation pages.'],
      ].map(([title, desc]) => (
        <div class="border-theme surface-2 seo-card-sm" >
          <strong style="color:var(--text-primary); font-size:0.875rem">{title}</strong>
          <p style="font-size:0.85rem; line-height:1.65; margin:0.35rem 0 0">{desc}</p>
        </div>
      ))}
    </div>`;
      content = content.slice(0, howToUseEnd) + '\n    ' + gitNew + '\n  ' + content.slice(howToUseEnd);
    }
    writeFileSync('src/pages/tools/git-command-flow-builder.astro', content, 'utf8');
    console.log('Fixed: git-command-flow-builder.astro');
    fixed++;
  } else {
    console.log('SKIP (not found): git-command-flow-builder.astro');
  }
}

// Kids savings — replace custom divs with seo-card-sm
{
  let content = readFileSync('src/pages/tools/kids-savings-compound-interest-visualizer.astro', 'utf8');
  if (content.includes(kidsOld)) {
    const kidsNew = `    <h3 style="font-size:1rem; font-weight:600; margin:1rem 0 0.5rem">Real-World Applications and Use Cases</h3>
    <div style="display:flex; flex-direction:column; gap:0.625rem; margin-bottom:0.75rem">
      {[
        ['Teaching delayed gratification', 'Kids who can see a savings goal being reached month by month learn patience and discipline. Set a goal for a gaming console or bicycle and watch the progress bar fill up — far more motivating than a piggy bank.'],
        ['Planning for education expenses', 'Starting small contributions early can build a meaningful fund by the time a child reaches secondary school or university age. Even $20 per month from birth grows substantially over 18 years.'],
        ['Comparing savings strategies', 'Run side-by-side scenarios to show how doubling pocket money or adding birthday bonuses accelerates the timeline. The visual difference between contributing $10 versus $30 per month makes the impact tangible.'],
      ].map(([title, desc]) => (
        <div class="border-theme surface-2 seo-card-sm" >
          <strong style="color:var(--text-primary); font-size:0.875rem">{title}</strong>
          <p style="font-size:0.85rem; line-height:1.65; margin:0.35rem 0 0">{desc}</p>
        </div>
      ))}
    </div>`;
    content = content.replace(kidsOld, kidsNew);
    writeFileSync('src/pages/tools/kids-savings-compound-interest-visualizer.astro', content, 'utf8');
    console.log('Fixed: kids-savings-compound-interest-visualizer.astro');
    fixed++;
  } else {
    console.log('SKIP (not found): kids-savings-compound-interest-visualizer.astro');
  }
}

console.log(`\nTotal fixed: ${fixed}`);
