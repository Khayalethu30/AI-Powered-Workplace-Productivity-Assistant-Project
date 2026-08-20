import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Send, Sparkles } from "lucide-react";
import { AppShell, PageHeader, AiDisclaimer } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { chatReply } from "@/lib/lorry";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/chat")({
  head: () => ({
    meta: [
      { title: "Chat with Lorry — AI Workplace Assistant" },
      {
        name: "description",
        content:
          "Ask Lorry to draft emails, summaries, plans, and briefs in a focused workplace chat interface.",
      },
      { property: "og:title", content: "Chat with Lorry" },
      {
        property: "og:description",
        content: "A focused chat assistant for everyday workplace drafting.",
      },
    ],
  }),
  component: Chat,
});

type Message = { role: "user" | "lorry"; text: string };

const suggestions = [
  "Summarize this week's standups",
  "Plan a product launch in 3 weeks",
  "Draft a follow-up email to a client",
];

function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "lorry",
      text: "Hi, I'm Lorry. Tell me what you're working on and I'll draft it — summaries, plans, briefs, or emails.",
    },
  ]);
  const [input, setInput] = useState("");

  const send = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    setMessages((m) => [
      ...m,
      { role: "user", text: trimmed },
      { role: "lorry", text: chatReply(trimmed) },
    ]);
    setInput("");
  };

  return (
    <AppShell>
      <PageHeader
        title="Chat with Lorry"
        description="A focused assistant for everyday drafting. Every reply is editable and copyable."
      />

      <section className="mt-8 flex flex-col rounded-2xl border border-border bg-card shadow-sm">
        <div className="flex-1 space-y-4 p-5">
          {messages.map((m, i) => (
            <div
              key={i}
              className={cn("flex gap-3", m.role === "user" && "flex-row-reverse")}
            >
              {m.role === "lorry" && (
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Sparkles className="h-3.5 w-3.5" />
                </span>
              )}
              <div
                className={cn(
                  "max-w-[75%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm leading-relaxed",
                  m.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-foreground",
                )}
              >
                {m.text}
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-border p-4">
          <div className="mb-3 flex flex-wrap gap-2">
            {suggestions.map((s) => (
              <button
                key={s}
                onClick={() => send(s)}
                className="rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                {s}
              </button>
            ))}
          </div>
          <div className="flex items-end gap-2">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  send(input);
                }
              }}
              placeholder="Ask Lorry to draft something…"
              className="min-h-[56px] resize-none bg-background"
            />
            <Button onClick={() => send(input)} aria-label="Send message">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      <AiDisclaimer />
    </AppShell>
  );
}
