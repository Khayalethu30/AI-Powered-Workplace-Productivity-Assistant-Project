/**
 * Local, deterministic draft generation used by the UI while no AI backend is
 * connected. Keeps the interaction model (structured prompt in, editable draft
 * out) identical to the eventual model-backed version.
 */

export type MeetingInput = {
  title: string;
  attendees: string;
  tone: string;
  notes: string;
};

export function draftMeetingSummary(input: MeetingInput) {
  const lines = input.notes
    .split(/\n|\.\s/)
    .map((l) => l.trim())
    .filter((l) => l.length > 3);
  const bullets = lines.slice(0, 6);
  const actions = lines.filter((l) => /will|should|need|todo|action|follow/i.test(l));

  return [
    `# ${input.title || "Meeting summary"}`,
    input.attendees ? `**Attendees:** ${input.attendees}` : "",
    `**Tone:** ${input.tone}`,
    "",
    "## Key points",
    ...(bullets.length ? bullets.map((b) => `- ${b}`) : ["- No notes captured yet."]),
    "",
    "## Decisions",
    "- (Confirm with the room — Lorry inferred these from the notes.)",
    "",
    "## Action items",
    ...(actions.length
      ? actions.map((a, i) => `${i + 1}. ${a} — owner: TBD, due: TBD`)
      : ["1. Assign owners for the points above."]),
  ]
    .filter(Boolean)
    .join("\n");
}

export type PlanInput = {
  goal: string;
  deadline: string;
  hours: string;
  constraints: string;
};

export function draftTaskPlan(input: PlanInput) {
  const goal = input.goal || "your goal";
  const phases = [
    ["Clarify", "Write the success criteria and list unknowns to resolve first."],
    ["Prepare", "Gather inputs, stakeholders, and any approvals needed."],
    ["Execute", "Break the core work into 90-minute focus blocks."],
    ["Review", "Collect feedback, tighten the output, and confirm sign-off."],
  ];
  return [
    `# Plan: ${goal}`,
    input.deadline ? `**Target date:** ${input.deadline}` : "",
    input.hours ? `**Weekly capacity:** ${input.hours} hours` : "",
    input.constraints ? `**Constraints:** ${input.constraints}` : "",
    "",
    ...phases.flatMap(([name, detail], i) => [
      `## Phase ${i + 1} — ${name}`,
      `- [ ] ${detail}`,
      `- [ ] Checkpoint: note what changed and what is blocked.`,
      "",
    ]),
    "## Risks",
    "- Scope creep: re-confirm the definition of done at each checkpoint.",
  ]
    .filter(Boolean)
    .join("\n");
}

export type ResearchInput = {
  topic: string;
  audience: string;
  depth: string;
  questions: string;
};

export function draftResearch(input: ResearchInput) {
  const topic = input.topic || "the topic";
  return [
    `# Research brief: ${topic}`,
    `**Audience:** ${input.audience || "internal team"} · **Depth:** ${input.depth}`,
    "",
    "## What we know",
    `- Working definition of ${topic} and why it matters now.`,
    "- Current approaches and who is using them.",
    "",
    "## Open questions",
    ...(input.questions
      ? input.questions
          .split("\n")
          .filter(Boolean)
          .map((q) => `- ${q.trim()}`)
      : ["- What outcome would make this worth pursuing?"]),
    "",
    "## Suggested sources to verify",
    "- Primary vendor documentation",
    "- One independent analyst or academic source",
    "- An internal stakeholder interview",
    "",
    "_Lorry did not browse the web for this draft — verify every claim before use._",
  ].join("\n");
}

export function chatReply(message: string) {
  const m = message.toLowerCase();
  if (m.includes("summar")) {
    return "Paste the notes and I'll return key points, decisions, and action items. The Meeting Notes tool keeps the structure tighter if you have a full transcript.";
  }
  if (m.includes("plan") || m.includes("deadline")) {
    return "Tell me the goal, the deadline, and your weekly capacity, and I'll break it into phases with checkpoints you can edit.";
  }
  if (m.includes("email") || m.includes("write")) {
    return "Give me the audience, the outcome you want, and the tone — I'll draft it, and you can edit before sending.";
  }
  return `Here's how I'd approach that: clarify the outcome, list what you already have, then take the smallest next step. Ask me to draft anything concrete — "${message.slice(0, 48)}" can become a summary, a plan, or a brief.`;
}
