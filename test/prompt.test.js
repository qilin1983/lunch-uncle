import { test } from "node:test";
import assert from "node:assert/strict";
import { buildSystemPrompt } from "../src/prompt.js";

test("buildSystemPrompt starts the same every time so it can be cached", () => {
  const a = buildSystemPrompt(new Date("2026-09-25T04:00:00Z"));
  const b = buildSystemPrompt(new Date("2026-09-26T05:30:00Z"));
  assert.ok(a.startsWith("You are Lunch Uncle"), a.slice(0, 40));
  assert.equal(a.split("\n\nIt is now")[0], b.split("\n\nIt is now")[0]);
});

test("buildSystemPrompt gives the time in Singapore", () => {
  const prompt = buildSystemPrompt(new Date("2026-09-25T04:00:00Z"));
  assert.match(prompt, /12:00\s?pm/i);
  assert.match(prompt, /in Singapore\.$/);
});
