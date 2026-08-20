import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Wand2 } from "lucide-react";
import { AppShell, PageHeader, AiDisclaimer } from "@/components/AppShell";
import { OutputPanel } from "@/components/OutputPanel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { draftTaskPlan } from "@/lib/lorry";

export const Route = createFileRoute("/task-planner")({
  head: () => ({
    meta: [
      { title: "AI Task Planner — AI Workplace Assistant" },
      {
        name: "description",
        content:
          "Turn a goal, deadline, and weekly capacity into a phased task plan with checkpoints you can edit.",
      },
      { property: "og:title", content: "AI Task Planner" },
      {
        property: "og:description",
        content: "Break any goal into phases, checkpoints, and risks with Lorry.",
      },
    ],
  }),
  component: TaskPlanner,
});

function TaskPlanner() {
  const [goal, setGoal] = useState("");
  const [deadline, setDeadline] = useState("");
  const [hours, setHours] = useState("");
  const [constraints, setConstraints] = useState("");
  const [output, setOutput] = useState("");

  const generate = () => setOutput(draftTaskPlan({ goal, deadline, hours, constraints }));

  return (
    <AppShell>
      <PageHeader
        title="AI Task Planner"
        description="Describe the outcome you need. Lorry proposes phases, checkpoints, and risks — then you make it yours."
      />

      <div className="mt-8 grid gap-6 lg:grid-cols-5">
        <section className="space-y-4 rounded-2xl border border-border bg-card p-5 shadow-sm lg:col-span-2">
          <div className="space-y-2">
            <Label htmlFor="goal">Goal</Label>
            <Input
              id="goal"
              placeholder="Launch the onboarding revamp"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="deadline">Target date</Label>
              <Input
                id="deadline"
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="hours">Hours / week</Label>
              <Input
                id="hours"
                type="number"
                min={1}
                placeholder="8"
                value={hours}
                onChange={(e) => setHours(e.target.value)}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="constraints">Constraints & dependencies</Label>
            <Textarea
              id="constraints"
              placeholder="Waiting on legal review, design freeze on the 12th..."
              value={constraints}
              onChange={(e) => setConstraints(e.target.value)}
              className="min-h-[140px]"
            />
          </div>
          <Button className="w-full" onClick={generate}>
            <Wand2 className="mr-2 h-4 w-4" /> Build my plan
          </Button>
        </section>

        <div className="lg:col-span-3">
          <OutputPanel
            value={output}
            onChange={setOutput}
            onRegenerate={generate}
            emptyHint="Your phased plan will appear here."
          />
        </div>
      </div>

      <AiDisclaimer />
    </AppShell>
  );
}
