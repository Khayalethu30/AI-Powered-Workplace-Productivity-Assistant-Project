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
import { draftMeetingSummary } from "@/lib/lorry";

export const Route = createFileRoute("/meeting-notes")({
  head: () => ({
    meta: [
      { title: "Meeting Notes Summarizer — AI Workplace Assistant" },
      {
        name: "description",
        content:
          "Turn raw meeting notes into key points, decisions, and action items with Lorry, then edit the draft before sharing.",
      },
      { property: "og:title", content: "Meeting Notes Summarizer" },
      {
        property: "og:description",
        content: "Summarize meetings into decisions and action items you can edit.",
      },
    ],
  }),
  component: MeetingNotes,
});

function MeetingNotes() {
  const [title, setTitle] = useState("");
  const [attendees, setAttendees] = useState("");
  const [tone, setTone] = useState("Neutral / professional");
  const [notes, setNotes] = useState("");
  const [output, setOutput] = useState("");

  const generate = () => setOutput(draftMeetingSummary({ title, attendees, tone, notes }));

  return (
    <AppShell>
      <PageHeader
        title="Meeting Notes Summarizer"
        description="Paste raw notes or a transcript. Lorry returns a structured summary with decisions and owners you can edit."
      />

      <div className="mt-8 grid gap-6 lg:grid-cols-5">
        <section className="space-y-4 rounded-2xl border border-border bg-card p-5 shadow-sm lg:col-span-2">
          <div className="space-y-2">
            <Label htmlFor="title">Meeting title</Label>
            <Input
              id="title"
              placeholder="Q3 roadmap review"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="attendees">Attendees</Label>
            <Input
              id="attendees"
              placeholder="Ayanda, Sipho, Product team"
              value={attendees}
              onChange={(e) => setAttendees(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Summary tone</Label>
            <Select value={tone} onValueChange={setTone}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Neutral / professional">Neutral / professional</SelectItem>
                <SelectItem value="Concise executive">Concise executive</SelectItem>
                <SelectItem value="Detailed and technical">Detailed and technical</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="notes">Raw notes</Label>
            <Textarea
              id="notes"
              placeholder="One thought per line works best..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="min-h-[180px]"
            />
          </div>
          <Button className="w-full" onClick={generate}>
            <Wand2 className="mr-2 h-4 w-4" /> Summarize with Lorry
          </Button>
        </section>

        <div className="lg:col-span-3">
          <OutputPanel
            value={output}
            onChange={setOutput}
            onRegenerate={generate}
            emptyHint="Your summary will appear here."
          />
        </div>
      </div>

      <AiDisclaimer />
    </AppShell>
  );
}
