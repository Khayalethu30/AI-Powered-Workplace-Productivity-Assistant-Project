import { createFileRoute, Link } from "@tanstack/react-router";
import { FileText, ListChecks, Search, MessageSquare, ArrowRight } from "lucide-react";
import { AppShell, PageHeader, AiDisclaimer } from "@/components/AppShell";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AI Workplace Productivity Assistant" },
      {
        name: "description",
        content:
          "Summarize meetings, plan tasks, research topics, and chat with Lorry — one workspace for everyday AI drafting.",
      },
      { property: "og:title", content: "AI Workplace Productivity Assistant" },
      {
        property: "og:description",
        content: "Meeting summaries, task plans, research briefs, and Lorry — your AI assistant.",
      },
    ],
  }),
  component: Index,
});

const tools = [
  {
    to: "/meeting-notes",
    label: "Meeting Notes Summarizer",
    detail: "Notes or transcripts become key points, decisions, and owners.",
    icon: FileText,
  },
  {
    to: "/task-planner",
    label: "AI Task Planner",
    detail: "A goal and a deadline become phases with checkpoints.",
    icon: ListChecks,
  },
  {
    to: "/research",
    label: "AI Research Assistant",
    detail: "A topic becomes a brief with open questions and sources.",
    icon: Search,
  },
  {
    to: "/chat",
    label: "Chat with Lorry",
    detail: "Ask for anything — emails, outlines, rewrites, next steps.",
    icon: MessageSquare,
  },
] as const;

const stats = [
  { label: "Drafts this week", value: "24" },
  { label: "Hours saved", value: "6.5" },
  { label: "Action items tracked", value: "38" },
];

function Index() {
  return (
    <AppShell>
      <PageHeader
        title="Good morning, Khayalethu"
        description="Lorry is ready. Pick a tool below — every output is a draft you can edit before it leaves your desk."
      />

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl border border-border bg-card p-5 shadow-sm">
            <p className="text-2xl font-semibold text-foreground">{s.value}</p>
            <p className="mt-1 text-xs text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      <h2 className="mt-10 text-sm font-semibold text-foreground">Assistants</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {tools.map((t) => (
          <Link
            key={t.to}
            to={t.to}
            className="group rounded-2xl border border-border bg-card p-5 shadow-sm transition-colors hover:border-primary/40"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground">
              <t.icon className="h-4 w-4" />
            </span>
            <h3 className="mt-4 text-base font-semibold text-foreground">{t.label}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{t.detail}</p>
            <span className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-primary">
              Open
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </span>
          </Link>
        ))}
      </div>

      <AiDisclaimer />
    </AppShell>
  );
}
