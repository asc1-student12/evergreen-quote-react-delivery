// RecentQuotes.tsx (provided - Day 3, REPLACES src/components/RecentQuotes.tsx)
// The list no longer arrives through props. This version fetches it from the
// data feed with the standard React pattern: useEffect to fetch on mount,
// three states (loading / error / success), and an AbortController to cancel
// the request if the component unmounts first. You drop it in; you don't
// modify it.
import { useEffect, useState } from "react";
import { formatCurrency } from "../premium";
import type { Quote } from "../types";

function RecentQuotes() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadQuotes() {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch("/quotes.json", { signal: controller.signal });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data: Quote[] = await res.json();
        setQuotes(data);
      } catch (err) {
        if (err instanceof Error && err.name !== "AbortError") {
          setError("Could not load recent quotes.");
        }
      } finally {
        setLoading(false);
      }
    }

    loadQuotes();
    return () => controller.abort(); // cleanup: cancel if unmounted
  }, []);

  return (
    <aside className="recent-quotes">
      <h2>Recent quotes</h2>
      {loading && <p className="loading">Loading recent quotes…</p>}
      {error && <p className="message">{error}</p>}
      {!loading && !error && (
        <ul className="recent-list">
          {quotes.map((quote) => (
            <li key={quote.id}>
              <span className="quote-type">{quote.type}</span> -{" "}
              <span className="quote-premium">
                {formatCurrency(quote.monthlyPremium)}/mo
              </span>
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
}

export default RecentQuotes;
