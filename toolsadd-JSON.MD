Act as a senior frontend engineer specializing in developer utilities. Design a clean, high-performance "JSON Prettifier" web utility for utilifygrid.
- Input: A raw, compressed, or poorly formatted JSON string.
- Controls: Indentation selector (2 spaces, 4 spaces, or Tabs), Toggle for "Sort keys alphabetically".
- Core Logic: Must use robust native parsing with clean error handling that catches unclosed brackets or invalid characters, highlighting the exact error line.
- UI Layout: Side-by-side view (Raw Text Area Input on the left, Syntax-Highlighted Code Block Output on the right) with a quick "Copy to Clipboard" button.

Act as a backend developer tools expert. Design a "JSON Path / JMESPath Query Evaluator" engine and UI for utilifygrid.
- Input: Two fields: A large JSON data payload text area, and a single-line text input field for the query string (supporting standard JSONPath syntax like `$.store.book[*].author`).
- Output: A live-updating, syntax-highlighted code block displaying only the filtered subset of data resulting from the query.
- UI Requirements: Include a small "Cheat Sheet" accordion below the input showing 3-4 common query syntax examples (e.g., filtering arrays, selecting specific keys).

Act as a UI/UX developer specializing in diffing tools. Design a "JSON Diff & Patch Visual Comparer" component for utilifygrid.
- Input: Two distinct text areas labeled "Original JSON (Source)" and "Modified JSON (Target)".
- Output: An interactive, unified or split-pane visual diff view that clearly highlights line-by-line changes: green highlights with a plus icon for additions, red highlights with a minus icon for deletions, and yellow for modifications.
- Extra Feature: Provide a secondary output tab containing an RFC 6902 compliant JSON Patch payload detailing the exact transformations required to get from Source to Target.

Act as a DevOps tooling specialist. Design a "JSON to YAML / TOML Bidirectional Converter" for utilifygrid.
- UI Layout: Two synchronous text panels. Panel A features a dropdown to switch between "YAML" and "TOML". Panel B is locked to "JSON".
- Core Behavior: Real-time, bidirectional conversion. Typing in the JSON panel instantly updates the YAML/TOML panel, and vice versa.
- Edge Case Requirements: Handle specific data-type translations carefully, such as preserving nested object structures, converting arrays cleanly, and managing null values gracefully.

Act as a web performance optimization engineer. Design a "JSON Minifier & Compact Formatter" for utilifygrid.
- Input: A beautifully indented or messy JSON string.
- Core Logic: Single-click execution that aggressively strips out all non-essential formatting characters—including line breaks, tabs, extra padding, and carriage returns—while strictly preserving string literals.
- Output: A single, continuous line of optimized JSON, paired with a metric showing the exact percentage of file size reduction achieved (e.g., "Payload size reduced by 34%").

Act as a robust parser developer. Design a "JSON Fixer & Automatic Repair Tool" utility for utilifygrid.
- Input: Malformed, corrupted, or non-strict JSON clipped from logs or messy terminal outputs.
- Core Repair Logic: The algorithm must automatically detect and repair common non-standard syntax mistakes, including:
  1. Swapping single quotes (`'`) for valid double quotes (`"`).
  2. Stripping illegal trailing commas from objects or arrays.
  3. Wrapping unquoted keys in double quotes.
  4. Automatically balancing missing closing brackets or braces.
- UI Requirement: Display a clean log detailing exactly what fixes were applied (e.g., "Fixed 2 trailing commas, wrapped 1 key in quotes").

Act as a data tools engineer. Design a "JSON to Excel / HTML Table Grid" transformer for utilifygrid.
- Input: A JSON payload consisting of a flat or nested array of objects.
- Output UI: A dynamic, interactive HTML data grid element that flattens objects using dot notation (e.g., `user.profile.name`) for column headers.
- Features: Enable client-side column sorting, global text filtering, and include a clear secondary action button titled "Export to Excel (.xlsx)" that downloads a true spreadsheet file.

Act as a software test tools developer. Design a dual-mode "JSON String Escaper / Unescaper" for utilifygrid.
- Mode A (Escape): Converts raw, valid JSON into a single-line string literal with escaped characters (e.g., converting double quotes to `\"`), making it ready to copy directly into code test fixtures (Java, C#, C++ strings).
- Mode B (Unescape): Takes an escaped string literal block from source code and un-escapes it back into raw, human-readable, formatted JSON.
- UI Requirements: Simple toggle switch between "Escape Mode" and "Unescape Mode" directly above the main text panels.

Act as a low-level systems and database engineer. Design a binary protocol utility titled "BSON / MessagePack to JSON Decoder" for utilifygrid.
- Input: A file-upload dropzone or a raw hexadecimal string field representing serialized BSON (MongoDB format) or MessagePack binary payloads.
- Processing: Parse the binary structure on the client side and convert it into a standard JavaScript object model.
- Output: Display the output as a fully readable, syntax-highlighted, standard JSON document ready for inspection or download.

Act as a data visualization engineer. Design an interactive "JSON Graph / Tree Visualizer" component for utilifygrid.
- Input: A deeply nested, complex JSON payload.
- Output Canvas: An interactive SVG or Canvas rendering area that transforms the hierarchical tree structure into an expandable mind-map layout.
- Interactive Features: Nodes representing JSON keys should be collapsible/expandable via click. Hovering over a key node should smoothly reveal its corresponding data type (String, Number, Array, Boolean) and raw value.

Act as an API testing tools engineer. Design a "Mock JSON Generator" utility for utilifygrid.
- Input: A standard JSON Schema definition object (`draft-07` or newer).
- Controls: An array size parameter field (integer selector default to 5) to control how many sample records are created.
- Generation Engine: Parse the schema's specified properties, types, constraints, and formats, then generate realistic dummy mock data (using mock patterns for names, emails, timestamps, and numbers) that completely satisfies the structural schema rules.
- Output: A fully populated, valid JSON mock payload file.