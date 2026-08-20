import { Check, Copy, RotateCcw } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export function OutputPanel({
  value,
  onChange,
  onRegenerate,
  emptyHint,
}: {
  value: string;
  onChange: (v: string) => void;
  onRegenerate: () => void;
  emptyHint: string;
}) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  return (
    <section className="rounded-2xl border border-border bg-card p-5 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4">
        <div>
          <h2 className="text-sm font-semibold text-foreground">Lorry's draft</h2>
          <p className="text-xs text-muted-foreground">Fully editable before you use it.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={onRegenerate} disabled={!value}>
            <RotateCcw className="mr-2 h-3.5 w-3.5" /> Regenerate
          </Button>
          <Button variant="secondary" size="sm" onClick={copy} disabled={!value}>
            {copied ? (
              <Check className="mr-2 h-3.5 w-3.5" />
            ) : (
              <Copy className="mr-2 h-3.5 w-3.5" />
            )}
            {copied ? "Copied" : "Copy"}
          </Button>
        </div>
      </div>
      {value ? (
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="min-h-[320px] resize-y bg-background font-mono text-[13px] leading-relaxed"
        />
      ) : (
        <div className="flex min-h-[220px] items-center justify-center rounded-xl border border-dashed border-border text-sm text-muted-foreground">
          {emptyHint}
        </div>
      )}
    </section>
  );
}
