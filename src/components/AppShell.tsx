import { Link, useRouterState } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import {
  LayoutDashboard,
  FileText,
  ListChecks,
  Search,
  MessageSquare,
  Menu,
  X,
  Sparkles,
  ShieldAlert,
} from "lucide-react";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/meeting-notes", label: "Meeting Notes", icon: FileText },
  { to: "/task-planner", label: "Task Planner", icon: ListChecks },
  { to: "/research", label: "Research", icon: Search },
  { to: "/chat", label: "Chat with Lorry", icon: MessageSquare },
] as const;

export function AiDisclaimer() {
  return (
    <div className="mt-10 flex items-start gap-3 rounded-xl border border-border bg-secondary/60 p-4 text-xs leading-relaxed text-muted-foreground">
      <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-accent-foreground" />
      <p>
        <span className="font-semibold text-foreground">Responsible AI:</span> Lorry
        generates drafts that can be incomplete or inaccurate. Review and edit every
        output before sharing it, and never paste confidential data you are not
        permitted to process.
      </p>
    </div>
  );
}

export function PageHeader({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4 border-b border-border pb-6">
      <div>
        <h1 className="text-2xl font-semibold text-foreground sm:text-3xl">{title}</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">{description}</p>
      </div>
      {action}
    </div>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="min-h-screen bg-background">
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 border-r border-sidebar-border bg-sidebar transition-transform lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-16 items-center gap-2 px-5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Sparkles className="h-4 w-4" />
          </span>
          <span className="font-display text-sm font-semibold leading-tight text-sidebar-foreground">
            AI Workplace
            <span className="block text-xs font-normal text-muted-foreground">
              Productivity Assistant
            </span>
          </span>
        </div>
        <nav className="space-y-1 px-3 py-4">
          {nav.map((item) => {
            const active = pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                  active
                    ? "bg-sidebar-accent font-medium text-sidebar-accent-foreground"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="absolute bottom-0 w-full border-t border-sidebar-border p-4">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-xs font-semibold text-foreground">
              KM
            </span>
            <div className="text-xs">
              <p className="font-medium text-foreground">Khayalethu M.</p>
              <p className="text-muted-foreground">Workspace member</p>
            </div>
          </div>
        </div>
      </aside>

      {open && (
        <button
          aria-label="Close navigation"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-30 bg-foreground/20 lg:hidden"
        />
      )}

      <div className="lg:pl-64">
        <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-border bg-background/85 px-4 backdrop-blur sm:px-8 lg:hidden">
          <button
            aria-label="Toggle navigation"
            onClick={() => setOpen((v) => !v)}
            className="rounded-lg border border-border p-2 text-foreground"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
          <span className="text-sm font-medium text-foreground">AI Workplace</span>
        </header>
        <main className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-8 sm:py-10">
          {children}
        </main>
      </div>
    </div>
  );
}
