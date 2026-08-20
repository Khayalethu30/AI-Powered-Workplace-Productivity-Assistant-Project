import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Wand2 } from "lucide-react";
import { AppShell, PageHeader, AiDisclaimer } from "@/components/AppShell";
import { OutputPanel } from "@/components/OutputPanel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { draftResearch } from "@/lib/lorry";

export const Route = createFileRoute("/research")({
  head: () => ({
    meta: [
      { title: "AI Research Assistant — AI Workplace Assistant" },
      {
        name: "description",
        content:
          "Generate structured research briefs with open questions and sources to verify, tailored to your audience.",
      },
      { property: "og:title", content: "AI Research Assistant" },
      {
        property: "og:description",
        content: "Structured research briefs with open questions and sources to verify.",
      },
    ],
  }),
  component: Research,
});

function Research() {
  const [topic, setTopic] = useState("");
  const [audience, setAudience] = useState("");
  const [depth, setDepth] = useState("Overview");
  const [questions, setQuestions] = useState("");
  const [output, setOutput] = useState("");

  const generate = () => setOutput(draftResearch({ topic, audience, depth, questions }));

  return (
    <AppShell>
      <PageHeader
        title="AI Research Assistant"
        description="Frame a topic and Lorry drafts a brief: what we know, open questions, and the sources worth checking."
      />

      <div className="mt-8 grid gap-6 lg:grid-cols-5">
        <section className="space-y-4 rounded-2xl border border-border bg-card p-5 shadow-sm lg:col-span-2">
          <div className="space-y-2">
            <Label htmlFor="topic">Topic</Label>
            <Input
              id="topic"
              placeholder="Vendor options for e-signatures"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="audience">Audience</Label>
            <Input
              id="audience"
              placeholder="Exec sponsor, finance"
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Depth</Label>
            <Select value={depth} onValueChange={setDepth}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Overview">Overview</SelectItem>
                <SelectItem value="Comparison">Comparison</SelectItem>
                <SelectItem value="Deep dive">Deep dive</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="questions">Questions to answer</Label>
            <Textarea
              id="questions"
              placeholder="One question per line"
              value={questions}
              onChange={(e) => setQuestions(e.target.value)}
              className="min-h-[140px]"
            />
          </div>
          <Button className="w-full" onClick={generate}>
            <Wand2 className="mr-2 h-4 w-4" /> Draft research brief
          </Button>
        </section>

        <div className="lg:col-span-3">
          <OutputPanel
            value={output}
            onChange={setOutput}
            onRegenerate={generate}
            emptyHint="Your research brief will appear here."
          />
        </div>
      </div>

      <AiDisclaimer />
    </AppShell>
  );
}
