// The One-Line Exit — make.fun entry (program/v1).
// Writes one funny single-line resignation letter to /output/entry.txt.
// The line is assembled from parts so the program is deterministic and
// checkable: an opening, a job, a surprise, and a deadpan closing clause.
// Node 22 runs this TypeScript file directly (node main.ts).

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

// --- The line, in parts -----------------------------------------------

// Opening: reads like the first words of a real resignation letter.
const opening = "I am resigning as the zoo's penguin keeper";

// Surprise: the turn the reader does not expect — the animals organised.
const surprise = "the penguins have unionised";

// Closing: the deadpan surrender that makes the joke land twice.
const closing = "and frankly, they have a point";

// --- Assembly ----------------------------------------------------------

// Join the parts into exactly one line. The colon after the job sets up
// the surprise; the comma before the closing keeps the sentence rolling
// to its final words, where the punchline lives.
function assembleLine(): string {
  const firstHalf = `${opening}: ${surprise}`;
  return `${firstHalf}, ${closing}.`;
}

// --- Gate validation ---------------------------------------------------
// The sealed scorer requires UTF-8 text of 1-140 characters, not only
// whitespace, in exactly one line. Fail loudly here rather than writing
// a bad entry file.
function validateLine(line: string): void {
  if (line.length < 1 || line.length > 140) {
    throw new Error(`line must be 1-140 characters, got ${line.length}`);
  }
  if (line.trim().length === 0) {
    throw new Error("line must not be only whitespace");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("line must be exactly one line");
  }
}

// --- Output ------------------------------------------------------------

function main(): void {
  const line = assembleLine();
  validateLine(line);

  // The grader reads /output/entry.txt (absolute path in the sandbox).
  // Write with no trailing newline: the file is the line.
  const outPath = "/output/entry.txt";
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, line, "utf8");

  console.log(`wrote ${line.length} characters to ${outPath}`);
}

main();
