import { useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { toast } from "sonner";

const SEEN_KEY = "nkm_csw_2026_seen";
const CAMPAIGN_END = new Date("2026-10-10T00:00:00");

function ServiceWeekCard({ onNavigate }: { onNavigate: () => void }) {
  return (
    <div className="pointer-events-auto w-[min(340px,calc(100vw-2rem))] overflow-hidden rounded-sm border border-brass/30 bg-ink-2 shadow-2xl">
      <div className="h-[3px] bg-brass" />
      <div className="p-4">
        <span className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-brass">
          Customer Service Week &middot; Oct 5&ndash;9
        </span>
        <p className="mt-2 text-[13.5px] leading-relaxed text-paper-text/85">
          You&rsquo;re the reason we show up. See how we&rsquo;re marking the week &mdash; and how
          to reach us any day of it.
        </p>
        <Link
          to="/customer-service-week"
          onClick={onNavigate}
          className="mt-3 inline-flex font-mono text-[11px] uppercase tracking-wide text-brass transition-colors hover:text-paper-text"
        >
          Take a look &rarr;
        </Link>
      </div>
    </div>
  );
}

export function ServiceWeekToast() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (new Date() >= CAMPAIGN_END) return;
    try {
      if (sessionStorage.getItem(SEEN_KEY)) return;
      sessionStorage.setItem(SEEN_KEY, "1");
    } catch {
      // storage unavailable — still show the notice
    }
    const timer = setTimeout(() => {
      toast.custom((id) => <ServiceWeekCard onNavigate={() => toast.dismiss(id)} />, {
        duration: 14000,
        closeButton: true,
      });
    }, 1100);
    return () => clearTimeout(timer);
  }, []);

  return null;
}
